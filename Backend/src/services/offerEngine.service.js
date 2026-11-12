import { pool as defaultPool } from "../config/db.js";

const TAX_RATE = 0.18; // 18% GST

/**
 * Fetch all currently active offers applicable to a customer type
 */
export async function getActiveOffers(pool = defaultPool, options = {}) {
  const { customerType = "retail", now = new Date() } = options;

  const [rawOffers] = await pool.query(
    `SELECT o.*
     FROM offers o
     WHERE (
       o.status = 'active'
       OR (o.status = 'scheduled' AND (o.start_at IS NULL OR o.start_at <= ?) AND (o.end_at IS NULL OR o.end_at >= ?))
     )
     AND (o.usage_limit IS NULL OR o.times_used < o.usage_limit)
     ORDER BY o.priority DESC, o.id ASC`,
    [now, now]
  );

  if (rawOffers.length === 0) return [];

  const offerIds = rawOffers.map((o) => o.id);

  // Fetch customer type eligibility
  const [custTypeRows] = await pool.query(
    "SELECT * FROM offer_customer_types WHERE offer_id IN (?)",
    [offerIds]
  );
  const custTypesByOffer = {};
  for (const row of custTypeRows) {
    (custTypesByOffer[row.offer_id] ||= []).push(row.customer_type);
  }

  // Filter offers by customer type: if configured, customerType must match; if empty, applies to all
  const filteredOffers = rawOffers.filter((o) => {
    const allowed = custTypesByOffer[o.id];
    if (!allowed || allowed.length === 0) return true;
    return allowed.includes(customerType);
  });

  if (filteredOffers.length === 0) return [];
  const filteredIds = filteredOffers.map((o) => o.id);

  // Batch load products, conditions, rewards, slabs, recommendations
  const [productRows] = await pool.query(
    `SELECT op.id, op.offer_id, op.product_id, op.variant_id,
            op.required_quantity AS min_quantity, op.product_role AS role,
            p.name AS product_name, p.price AS product_price, p.sku AS product_sku,
            pv.sku AS variant_sku, pv.price AS variant_price, pv.value AS variant_value
     FROM offer_products op
     LEFT JOIN products p ON op.product_id = p.id
     LEFT JOIN product_variants pv ON op.variant_id = pv.id
     WHERE op.offer_id IN (?)`,
    [filteredIds]
  );

  const [rewardRows] = await pool.query(
    `SELECT r.id, r.offer_id, r.reward_type, r.discount_type, r.discount_value,
            r.maximum_discount AS max_discount_amount, r.target_scope
     FROM offer_rewards r
     WHERE r.offer_id IN (?)`,
    [filteredIds]
  );

  const [slabRows] = await pool.query(
    `SELECT s.id, s.offer_id, s.customer_type,
            s.minimum_quantity AS min_quantity, s.maximum_quantity AS max_quantity,
            s.pricing_type AS discount_type, s.pricing_value AS discount_value
     FROM offer_quantity_slabs s
     WHERE s.offer_id IN (?) 
     ORDER BY s.minimum_quantity ASC`,
    [filteredIds]
  );

  const [recRows] = await pool.query(
    `SELECT r.id, r.offer_id, r.trigger_product_id, r.trigger_variant_id,
            r.recommended_product_id, r.recommended_variant_id,
            r.minimum_trigger_quantity AS min_trigger_quantity,
            r.discount_type, r.discount_value, r.display_order AS priority,
            p.name AS rec_product_name, p.price AS rec_product_price,
            (SELECT image_path FROM product_images WHERE product_id = p.id ORDER BY sort_order ASC LIMIT 1) AS rec_image_url,
            pv.value AS rec_variant_value, pv.price AS rec_variant_price
     FROM offer_recommendations r
     LEFT JOIN products p ON r.recommended_product_id = p.id
     LEFT JOIN product_variants pv ON r.recommended_variant_id = pv.id
     WHERE r.offer_id IN (?)
     ORDER BY r.display_order DESC, r.id ASC`,
    [filteredIds]
  );

  // Group by offer ID
  const productsByOffer = {};
  for (const r of productRows) (productsByOffer[r.offer_id] ||= []).push(r);

  const rewardsByOffer = {};
  for (const r of rewardRows) (rewardsByOffer[r.offer_id] ||= []).push(r);

  const slabsByOffer = {};
  for (const r of slabRows) {
    if (r.customer_type === "all" || r.customer_type === customerType) {
      (slabsByOffer[r.offer_id] ||= []).push(r);
    }
  }

  const recsByOffer = {};
  for (const r of recRows) (recsByOffer[r.offer_id] ||= []).push(r);

  return filteredOffers.map((o) => {
    let cfg = {};
    try {
      cfg = typeof o.display_config === "string" ? JSON.parse(o.display_config || "{}") : (o.display_config || {});
    } catch {
      cfg = {};
    }

    return {
      id: o.id,
      title: o.name,
      internal_code: o.offer_code,
      description: o.description,
      offer_type: o.offer_type,
      status: o.status,
      start_date: o.start_at,
      end_date: o.end_at,
      priority: o.priority,
      is_stackable: Boolean(o.stackable),
      usage_limit: o.usage_limit,
      usage_count: o.times_used,
      storefront_badge: cfg.storefrontBadge || cfg.badge || null,
      display_message: cfg.displayMessage || cfg.message || null,
      campaign_image: cfg.campaignImage || null,
      min_cart_value: cfg.minCartValue || null,
      max_discount: cfg.maxDiscount || null,
      customerTypes: custTypesByOffer[o.id] || ["retail", "wholesale"],
      products: productsByOffer[o.id] || [],
      rewards: rewardsByOffer[o.id] || [],
      slabs: slabsByOffer[o.id] || [],
      recommendations: recsByOffer[o.id] || [],
    };
  });
}

/**
 * Check if a cart item matches an offer target (handling parent product vs specific variant)
 */
function itemMatchesTarget(item, target) {
  if (Number(item.productId) !== Number(target.product_id || target.productId)) {
    return false;
  }
  // If target specifies a variant_id, the cart item must match that exact variant
  if (target.variant_id !== null && target.variant_id !== undefined) {
    return Number(item.variantId) === Number(target.variant_id);
  }
  // If target has NO variant_id, it applies to the parent product (all variants or single-SKU)
  return true;
}

/**
 * Authoritative Central Cart Offer Evaluation Engine
 */
export async function calculateCartOffers({
  items = [],
  customerType = "retail",
  pool = defaultPool,
}) {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      items: [],
      appliedOffers: [],
      eligibleOffers: [],
      recommendations: [],
      subtotal: 0,
      discountTotal: 0,
      tax: 0,
      total: 0,
    };
  }

  // 1. Resolve authentic prices and names from DB to prevent client tampering
  const productIds = [...new Set(items.map((i) => i.productId))];
  const variantIds = [...new Set(items.map((i) => i.variantId).filter(Boolean))];

  const [dbProducts] = await pool.query(
    "SELECT id, name, sku, price, category_id, stock FROM products WHERE id IN (?)",
    [productIds]
  );
  const productMap = new Map(dbProducts.map((p) => [p.id, p]));

  let variantMap = new Map();
  if (variantIds.length > 0) {
    const [dbVariants] = await pool.query(
      "SELECT id, product_id, sku, price, value, stock FROM product_variants WHERE id IN (?)",
      [variantIds]
    );
    variantMap = new Map(dbVariants.map((v) => [v.id, v]));
  }

  // Normalize cart items with verified prices
  const verifiedItems = items.map((rawItem, idx) => {
    const prod = productMap.get(Number(rawItem.productId));
    const variant = rawItem.variantId ? variantMap.get(Number(rawItem.variantId)) : null;

    const basePrice = variant ? Number(variant.price) : prod ? Number(prod.price) : Number(rawItem.price) || 0;
    const name = variant ? `${prod?.name || "Product"} — ${variant.value}` : prod?.name || "Product";
    const sku = variant ? variant.sku : prod?.sku || "";
    const quantity = Math.max(1, Number(rawItem.quantity) || 1);

    return {
      index: idx,
      productId: Number(rawItem.productId),
      variantId: rawItem.variantId ? Number(rawItem.variantId) : null,
      categoryId: prod?.category_id || null,
      name,
      sku,
      quantity,
      originalPrice: basePrice,
      unitDiscount: 0,
      effectivePrice: basePrice,
      lineOriginalTotal: basePrice * quantity,
      lineDiscount: 0,
      lineTotal: basePrice * quantity,
      appliedOffers: [],
    };
  });

  const rawSubtotal = verifiedItems.reduce((acc, i) => acc + i.lineOriginalTotal, 0);

  // 2. Fetch all active applicable offers
  const activeOffers = await getActiveOffers(pool, { customerType });

  const appliedOffersList = [];
  const eligibleOffersUpsell = [];
  const crossSellRecommendations = [];

  for (const offer of activeOffers) {
    let offerApplied = false;
    let offerDiscountAmount = 0;

    switch (offer.offer_type) {
      // -------------------------------------------------------------
      // TYPE A: BULK QUANTITY OFFER
      // -------------------------------------------------------------
      case "bulk_quantity": {
        for (const item of verifiedItems) {
          const matchingSlabs = offer.slabs.filter((slab) => {
            if (slab.product_id && Number(slab.product_id) !== item.productId) return false;
            if (slab.variant_id !== null && slab.variant_id !== undefined) {
              if (Number(slab.variant_id) !== item.variantId) return false;
            }
            return true;
          });

          if (matchingSlabs.length === 0) continue;

          let qualifiedSlab = null;
          let nextSlab = null;

          for (let sIdx = 0; sIdx < matchingSlabs.length; sIdx++) {
            const s = matchingSlabs[sIdx];
            if (item.quantity >= s.min_quantity && (s.max_quantity === null || s.max_quantity === undefined || item.quantity <= s.max_quantity)) {
              qualifiedSlab = s;
            } else if (item.quantity < s.min_quantity && (!nextSlab || s.min_quantity < nextSlab.min_quantity)) {
              nextSlab = s;
            }
          }

          if (qualifiedSlab) {
            if (!offer.is_stackable && item.appliedOffers.length > 0) {
              continue;
            }

            let unitDiscount = 0;
            const pType = qualifiedSlab.discount_type;
            if (pType === "percentage" || pType === "percentage_discount") {
              unitDiscount = item.originalPrice * (Number(qualifiedSlab.discount_value) / 100);
            } else if (pType === "fixed_amount" || pType === "fixed_discount") {
              unitDiscount = Math.min(item.originalPrice, Number(qualifiedSlab.discount_value));
            } else if (pType === "special_unit_price" || pType === "special_price") {
              unitDiscount = Math.max(0, item.originalPrice - Number(qualifiedSlab.discount_value));
            }

            unitDiscount = Math.round(unitDiscount * 100) / 100;
            const lineDiscount = Math.round(unitDiscount * item.quantity * 100) / 100;

            if (lineDiscount > 0) {
              item.unitDiscount += unitDiscount;
              item.effectivePrice = Math.max(0, item.originalPrice - item.unitDiscount);
              item.lineDiscount += lineDiscount;
              item.lineTotal = Math.max(0, item.lineOriginalTotal - item.lineDiscount);
              item.appliedOffers.push({
                offerId: offer.id,
                title: offer.title,
                code: offer.internal_code,
                discount: lineDiscount,
              });

              offerApplied = true;
              offerDiscountAmount += lineDiscount;
            }
          }

          if (nextSlab) {
            const diff = nextSlab.min_quantity - item.quantity;
            eligibleOffersUpsell.push({
              offerId: offer.id,
              offerTitle: offer.title,
              offerType: "bulk_quantity",
              productId: item.productId,
              productName: item.name,
              unitsNeeded: diff,
              targetQuantity: nextSlab.min_quantity,
              message: `Add ${diff} more unit${diff > 1 ? "s" : ""} of "${item.name}" to unlock ${
                nextSlab.discount_type === "percentage"
                  ? `${nextSlab.discount_value}% OFF`
                  : `₹${nextSlab.discount_value} special pricing`
              }!`,
            });
          }
        }
        break;
      }

      // -------------------------------------------------------------
      // TYPE B: MIX & MATCH OFFER
      // -------------------------------------------------------------
      case "mix_match": {
        const conditions = offer.products.filter(
          (p) => p.role === "condition" || p.role === "eligible"
        );
        if (conditions.length === 0) break;

        let allConditionsMet = true;
        const missingConditions = [];

        for (const cond of conditions) {
          const matchingQty = verifiedItems
            .filter((item) => itemMatchesTarget(item, cond))
            .reduce((sum, item) => sum + item.quantity, 0);

          const requiredQty = cond.exact_quantity || cond.min_quantity || 1;
          if (matchingQty < requiredQty) {
            allConditionsMet = false;
            missingConditions.push({
              productId: cond.product_id,
              variantId: cond.variant_id,
              productName: cond.product_name,
              variantValue: cond.variant_value,
              required: requiredQty,
              current: matchingQty,
              needed: requiredQty - matchingQty,
            });
          }
        }

        if (allConditionsMet) {
          const rewards = offer.rewards.length > 0 ? offer.rewards : [{ reward_type: "percentage_discount", discount_value: 10 }];
          const rewardProducts = offer.products.filter((p) => p.role === "reward");

          for (const reward of rewards) {
            const discValue = Number(reward.discount_value) || 0;
            const maxCap = reward.max_discount_amount ? Number(reward.max_discount_amount) : offer.max_discount ? Number(offer.max_discount) : null;

            const eligibleItems = verifiedItems.filter((item) => {
              if (offer.is_stackable === false && item.appliedOffers.length > 0) return false;
              if (rewardProducts.length > 0) {
                return rewardProducts.some((rp) => itemMatchesTarget(item, rp));
              }
              return conditions.some((c) => itemMatchesTarget(item, c));
            });

            for (const item of eligibleItems) {
              let itemDisc = 0;
              if (reward.reward_type === "percentage_discount" || reward.discount_type === "percentage") {
                itemDisc = (item.effectivePrice * discValue) / 100;
              } else {
                itemDisc = Math.min(item.effectivePrice, discValue / item.quantity);
              }

              itemDisc = Math.round(itemDisc * 100) / 100;
              let lineDisc = Math.round(itemDisc * item.quantity * 100) / 100;

              if (maxCap && offerDiscountAmount + lineDisc > maxCap) {
                lineDisc = Math.max(0, maxCap - offerDiscountAmount);
              }

              if (lineDisc > 0) {
                item.unitDiscount += itemDisc;
                item.effectivePrice = Math.max(0, item.originalPrice - item.unitDiscount);
                item.lineDiscount += lineDisc;
                item.lineTotal = Math.max(0, item.lineOriginalTotal - item.lineDiscount);
                item.appliedOffers.push({
                  offerId: offer.id,
                  title: offer.title,
                  code: offer.internal_code,
                  discount: lineDisc,
                });

                offerApplied = true;
                offerDiscountAmount += lineDisc;
              }
            }
          }
        } else if (missingConditions.length > 0) {
          eligibleOffersUpsell.push({
            offerId: offer.id,
            offerTitle: offer.title,
            offerType: "mix_match",
            missing: missingConditions,
            message: `Mix & Match Combo: Add ${missingConditions
              .map((m) => `${m.needed} more ${m.productName || "unit"}${m.variantValue ? ` (${m.variantValue})` : ""}`)
              .join(" and ")} to unlock "${offer.title}"!`,
          });
        }
        break;
      }

      // -------------------------------------------------------------
      // TYPE C: COMBO / BUNDLE OFFER
      // -------------------------------------------------------------
      case "combo_bundle": {
        const bundleItems = offer.products.filter((p) => p.role === "bundle_item" || p.role === "condition");
        if (bundleItems.length === 0) break;

        let bundleMultiplier = Infinity;
        const missingBundleParts = [];

        for (const bi of bundleItems) {
          const reqQty = bi.min_quantity || bi.exact_quantity || 1;
          const matchingQty = verifiedItems
            .filter((item) => itemMatchesTarget(item, bi))
            .reduce((sum, item) => sum + item.quantity, 0);

          const possibleSets = Math.floor(matchingQty / reqQty);
          if (possibleSets < bundleMultiplier) bundleMultiplier = possibleSets;

          if (matchingQty < reqQty) {
            missingBundleParts.push({
              productName: bi.product_name,
              variantValue: bi.variant_value,
              needed: reqQty - matchingQty,
            });
          }
        }

        if (bundleMultiplier > 0 && bundleMultiplier !== Infinity) {
          const reward = offer.rewards[0] || {};
          const bundlePrice = reward.reward_type === "fixed_bundle_price" ? Number(reward.discount_value) : null;
          const bundlePercent = reward.reward_type === "percentage_discount" || reward.discount_type === "percentage" ? Number(reward.discount_value) : null;
          const bundleFixedDisc = reward.reward_type === "fixed_amount_discount" || reward.discount_type === "fixed_amount" ? Number(reward.discount_value) : null;

          let standardBundleTotal = 0;
          for (const bi of bundleItems) {
            const reqQty = bi.min_quantity || bi.exact_quantity || 1;
            const itemMatch = verifiedItems.find((item) => itemMatchesTarget(item, bi));
            const price = itemMatch ? itemMatch.originalPrice : Number(bi.product_price) || 0;
            standardBundleTotal += price * reqQty;
          }

          let discountPerBundle = 0;
          if (bundlePrice !== null) {
            discountPerBundle = Math.max(0, standardBundleTotal - bundlePrice);
          } else if (bundlePercent !== null) {
            discountPerBundle = (standardBundleTotal * bundlePercent) / 100;
          } else if (bundleFixedDisc !== null) {
            discountPerBundle = bundleFixedDisc;
          }

          const totalBundleDiscount = Math.round(discountPerBundle * bundleMultiplier * 100) / 100;

          if (totalBundleDiscount > 0) {
            for (const bi of bundleItems) {
              const itemMatch = verifiedItems.find((item) => itemMatchesTarget(item, bi));
              if (!itemMatch) continue;

              const proportion = standardBundleTotal > 0 ? (itemMatch.originalPrice / standardBundleTotal) : 0;
              const itemPortion = Math.round(totalBundleDiscount * proportion * 100) / 100;

              itemMatch.lineDiscount += itemPortion;
              itemMatch.lineTotal = Math.max(0, itemMatch.lineOriginalTotal - itemMatch.lineDiscount);
              itemMatch.appliedOffers.push({
                offerId: offer.id,
                title: offer.title,
                code: offer.internal_code,
                discount: itemPortion,
              });
            }

            offerApplied = true;
            offerDiscountAmount = totalBundleDiscount;
          }
        } else if (missingBundleParts.length > 0) {
          eligibleOffersUpsell.push({
            offerId: offer.id,
            offerTitle: offer.title,
            offerType: "combo_bundle",
            missing: missingBundleParts,
            message: `Complete the "${offer.title}" Bundle: Add ${missingBundleParts
              .map((m) => `${m.needed} more ${m.productName || "unit"}${m.variantValue ? ` (${m.variantValue})` : ""}`)
              .join(", ")} to save!`,
          });
        }
        break;
      }

      // -------------------------------------------------------------
      // TYPE D: FREQUENTLY BOUGHT TOGETHER / CROSS-SELL
      // -------------------------------------------------------------
      case "cross_sell": {
        for (const rec of offer.recommendations) {
          const triggerQty = verifiedItems
            .filter((item) => {
              if (Number(item.productId) !== Number(rec.trigger_product_id)) return false;
              if (rec.trigger_variant_id && Number(item.variantId) !== Number(rec.trigger_variant_id)) return false;
              return true;
            })
            .reduce((sum, item) => sum + item.quantity, 0);

          const minTriggerQty = rec.min_trigger_quantity || 1;

          if (triggerQty >= minTriggerQty) {
            const recCartItem = verifiedItems.find((item) => {
              if (Number(item.productId) !== Number(rec.recommended_product_id)) return false;
              if (rec.recommended_variant_id && Number(item.variantId) !== Number(rec.recommended_variant_id)) return false;
              return true;
            });

            if (recCartItem) {
              let unitDisc = 0;
              const discVal = Number(rec.discount_value) || 0;
              if (rec.discount_type === "percentage") {
                unitDisc = (recCartItem.originalPrice * discVal) / 100;
              } else if (rec.discount_type === "fixed_amount") {
                unitDisc = Math.min(recCartItem.originalPrice, discVal);
              } else if (rec.discount_type === "special_price") {
                unitDisc = Math.max(0, recCartItem.originalPrice - discVal);
              }

              unitDisc = Math.round(unitDisc * 100) / 100;
              const lineDisc = Math.round(unitDisc * recCartItem.quantity * 100) / 100;

              if (lineDisc > 0) {
                recCartItem.unitDiscount += unitDisc;
                recCartItem.effectivePrice = Math.max(0, recCartItem.originalPrice - recCartItem.unitDiscount);
                recCartItem.lineDiscount += lineDisc;
                recCartItem.lineTotal = Math.max(0, recCartItem.lineOriginalTotal - recCartItem.lineDiscount);
                recCartItem.appliedOffers.push({
                  offerId: offer.id,
                  title: offer.title,
                  code: offer.internal_code,
                  discount: lineDisc,
                });

                offerApplied = true;
                offerDiscountAmount += lineDisc;
              }
            } else {
              const basePrice = rec.rec_variant_price ? Number(rec.rec_variant_price) : Number(rec.rec_product_price) || 0;
              let discountedPrice = basePrice;
              const discVal = Number(rec.discount_value) || 0;

              if (rec.discount_type === "percentage") {
                discountedPrice = Math.max(0, basePrice - (basePrice * discVal) / 100);
              } else if (rec.discount_type === "fixed_amount") {
                discountedPrice = Math.max(0, basePrice - discVal);
              } else if (rec.discount_type === "special_price") {
                discountedPrice = discVal;
              }

              crossSellRecommendations.push({
                offerId: offer.id,
                recommendationId: rec.id,
                productId: rec.recommended_product_id,
                variantId: rec.recommended_variant_id,
                name: rec.rec_product_name,
                variantValue: rec.rec_variant_value || null,
                imageUrl: rec.rec_image_url || null,
                originalPrice: basePrice,
                discountedPrice: Math.round(discountedPrice * 100) / 100,
                discountType: rec.discount_type,
                discountValue: discVal,
                displayMessage: offer.display_message || "Frequently Bought Together",
                priority: rec.priority || 0,
              });
            }
          }
        }
        break;
      }

      // -------------------------------------------------------------
      // TYPE E: CART VALUE OFFERS
      // -------------------------------------------------------------
      case "cart_value": {
        const minCartVal = Number(offer.min_cart_value) || 0;
        const currentEligibleSubtotal = verifiedItems.reduce((acc, i) => acc + i.lineTotal, 0);

        if (currentEligibleSubtotal >= minCartVal) {
          const reward = offer.rewards[0] || {};
          const discVal = Number(reward.discount_value) || 0;
          let calculatedCartDisc = 0;

          if (reward.reward_type === "percentage_discount" || reward.discount_type === "percentage") {
            calculatedCartDisc = (currentEligibleSubtotal * discVal) / 100;
          } else {
            calculatedCartDisc = discVal;
          }

          if (offer.max_discount && calculatedCartDisc > Number(offer.max_discount)) {
            calculatedCartDisc = Number(offer.max_discount);
          }

          calculatedCartDisc = Math.round(calculatedCartDisc * 100) / 100;

          if (calculatedCartDisc > 0) {
            offerApplied = true;
            offerDiscountAmount = calculatedCartDisc;

            for (const item of verifiedItems) {
              const proportion = currentEligibleSubtotal > 0 ? (item.lineTotal / currentEligibleSubtotal) : 0;
              const portion = Math.round(calculatedCartDisc * proportion * 100) / 100;
              item.lineDiscount += portion;
              item.lineTotal = Math.max(0, item.lineOriginalTotal - item.lineDiscount);
              item.appliedOffers.push({
                offerId: offer.id,
                title: offer.title,
                code: offer.internal_code,
                discount: portion,
              });
            }
          }
        } else {
          const diff = Math.round((minCartVal - currentEligibleSubtotal) * 100) / 100;
          eligibleOffersUpsell.push({
            offerId: offer.id,
            offerTitle: offer.title,
            offerType: "cart_value",
            shortfall: diff,
            minCartValue: minCartVal,
            message: `Add ₹${diff.toLocaleString("en-IN")} more to your cart to unlock ${
              offer.storefront_badge || offer.title
            }!`,
          });
        }
        break;
      }
    }

    if (offerApplied && offerDiscountAmount > 0) {
      appliedOffersList.push({
        id: offer.id,
        title: offer.title,
        code: offer.internal_code,
        offerType: offer.offer_type,
        badge: offer.storefront_badge || null,
        discountAmount: Math.round(offerDiscountAmount * 100) / 100,
        message: offer.display_message || null,
      });
    }
  }

  // 3. Final summation
  const subtotal = Math.round(rawSubtotal * 100) / 100;
  const totalDiscount = Math.round(
    verifiedItems.reduce((acc, i) => acc + i.lineDiscount, 0) * 100
  ) / 100;
  const taxableSubtotal = Math.max(0, subtotal - totalDiscount);
  const tax = Math.round(taxableSubtotal * TAX_RATE * 100) / 100;
  const finalTotal = Math.round((taxableSubtotal + tax) * 100) / 100;

  // Deduplicate recommendations by productId and variantId
  const uniqueRecs = [];
  const recSeen = new Set();
  for (const r of crossSellRecommendations.sort((a, b) => b.priority - a.priority)) {
    const key = `${r.productId}_${r.variantId || "0"}`;
    if (!recSeen.has(key)) {
      recSeen.add(key);
      uniqueRecs.push(r);
    }
  }

  return {
    items: verifiedItems,
    appliedOffers: appliedOffersList,
    eligibleOffers: eligibleOffersUpsell,
    recommendations: uniqueRecs,
    subtotal,
    discountTotal: totalDiscount,
    tax,
    total: finalTotal,
  };
}

/**
 * Get active offers for a specific product & variant (for PDP display)
 */
export async function getProductOffers(productId, variantId = null, pool = defaultPool, customerType = "retail") {
  const activeOffers = await getActiveOffers(pool, { customerType });
  const pId = Number(productId);
  const vId = variantId ? Number(variantId) : null;

  const relevantOffers = [];
  const bulkSlabs = [];

  for (const offer of activeOffers) {
    if (offer.offer_type === "bulk_quantity") {
      const matchingProductTargets = offer.products.filter((p) => {
        if (Number(p.product_id) !== pId) return false;
        if (vId !== null && p.variant_id !== null && p.variant_id !== undefined) {
          return Number(p.variant_id) === vId;
        }
        return true;
      });

      if (offer.products.length === 0 || matchingProductTargets.length > 0) {
        const targetVariantId = matchingProductTargets[0]?.variant_id || null;
        bulkSlabs.push(
          ...offer.slabs.map((s) => ({
            offerId: offer.id,
            offerTitle: offer.title,
            badge: offer.storefront_badge,
            minQuantity: s.min_quantity,
            maxQuantity: s.max_quantity,
            discountType: s.discount_type,
            discountValue: Number(s.discount_value),
            customerType: s.customer_type,
            targetVariantId,
          }))
        );
      }
    } else if (offer.offer_type === "mix_match" || offer.offer_type === "combo_bundle") {
      const isIncluded = offer.products.some(
        (p) => Number(p.product_id) === pId && (!p.variant_id || Number(p.variant_id) === vId)
      );
      if (isIncluded) {
        relevantOffers.push({
          id: offer.id,
          title: offer.title,
          badge: offer.storefront_badge,
          offerType: offer.offer_type,
          description: offer.description,
          message: offer.display_message,
        });
      }
    }
  }

  return {
    bulkSlabs: bulkSlabs.sort((a, b) => a.minQuantity - b.minQuantity),
    comboOffers: relevantOffers,
  };
}

/**
 * Fetch cross-sell recommendations for a trigger product/variant
 */
export async function getProductRecommendations(productId, variantId = null, pool = defaultPool) {
  const pId = Number(productId);
  const vId = variantId ? Number(variantId) : null;

  const [rows] = await pool.query(
    `SELECT r.id, r.offer_id, r.trigger_product_id, r.trigger_variant_id,
            r.recommended_product_id, r.recommended_variant_id,
            r.minimum_trigger_quantity AS min_trigger_quantity,
            r.discount_type, r.discount_value, r.display_order AS priority,
            p.name AS rec_product_name, p.price AS rec_product_price,
            (SELECT image_path FROM product_images WHERE product_id = p.id ORDER BY sort_order ASC LIMIT 1) AS rec_image_url,
            p.sku AS rec_product_sku,
            pv.value AS rec_variant_value, pv.price AS rec_variant_price, pv.sku AS rec_variant_sku,
            o.display_config
     FROM offer_recommendations r
     JOIN offers o ON r.offer_id = o.id
     LEFT JOIN products p ON r.recommended_product_id = p.id
     LEFT JOIN product_variants pv ON r.recommended_variant_id = pv.id
     WHERE r.trigger_product_id = ?
       AND (r.trigger_variant_id IS NULL OR r.trigger_variant_id = ?)
       AND o.status = 'active'
     ORDER BY r.display_order DESC, r.id ASC`,
    [pId, vId]
  );

  return rows.map((r) => {
    let cfg = {};
    try {
      cfg = typeof r.display_config === "string" ? JSON.parse(r.display_config || "{}") : (r.display_config || {});
    } catch {
      cfg = {};
    }

    const basePrice = r.rec_variant_price ? Number(r.rec_variant_price) : Number(r.rec_product_price) || 0;
    const discVal = Number(r.discount_value) || 0;
    let specialPrice = basePrice;

    if (r.discount_type === "percentage") {
      specialPrice = Math.max(0, basePrice - (basePrice * discVal) / 100);
    } else if (r.discount_type === "fixed_amount") {
      specialPrice = Math.max(0, basePrice - discVal);
    } else if (r.discount_type === "special_price") {
      specialPrice = discVal;
    }

    return {
      recommendationId: r.id,
      offerId: r.offer_id,
      productId: r.recommended_product_id,
      variantId: r.recommended_variant_id,
      name: r.rec_product_name,
      variantValue: r.rec_variant_value,
      sku: r.rec_variant_sku || r.rec_product_sku,
      imageUrl: r.rec_image_url,
      originalPrice: basePrice,
      discountedPrice: Math.round(specialPrice * 100) / 100,
      discountType: r.discount_type,
      discountValue: discVal,
      minTriggerQuantity: r.min_trigger_quantity || 1,
      displayMessage: cfg.displayMessage || "Frequently Bought Together",
    };
  });
}
