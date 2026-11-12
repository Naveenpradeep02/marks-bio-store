import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as offerEngine from "../services/offerEngine.service.js";

function normalizePricingType(t) {
  if (t === "percentage" || t === "percentage_discount") return "percentage_discount";
  if (t === "fixed_amount" || t === "fixed_discount") return "fixed_discount";
  return "special_unit_price";
}

function normalizeRewardType(t) {
  if (t === "fixed_bundle_price" || t === "fixed_combo_price") return "fixed_combo_price";
  if (t === "special_unit_price") return "special_unit_price";
  if (t === "free_product") return "free_product";
  return "discount";
}

function normalizeDiscountType(t) {
  if (t === "fixed_amount" || t === "fixed_discount") return "fixed_amount";
  if (t === "override_price" || t === "special_price" || t === "special_unit_price") return "override_price";
  return "percentage";
}

function normalizeRole(r) {
  if (r === "condition" || r === "eligible") return "eligible";
  if (r === "bundle_item") return "bundle_item";
  if (r === "reward") return "reward";
  if (r === "trigger") return "trigger";
  return "eligible";
}

// Helper to serialize an offer with all its nested entities
async function getFullOffer(offerId, conn = pool) {
  const [rows] = await conn.query("SELECT * FROM offers WHERE id = ?", [offerId]);
  if (rows.length === 0) return null;
  const o = rows[0];

  let cfg = {};
  try {
    cfg = typeof o.display_config === "string" ? JSON.parse(o.display_config || "{}") : (o.display_config || {});
  } catch {
    cfg = {};
  }

  const [products] = await conn.query(
    `SELECT op.id, op.offer_id, op.product_id, op.variant_id,
            op.required_quantity AS min_quantity, op.product_role AS role,
            p.name AS product_name, p.sku AS product_sku, p.price AS product_price,
            pv.value AS variant_value, pv.sku AS variant_sku, pv.price AS variant_price
     FROM offer_products op
     LEFT JOIN products p ON op.product_id = p.id
     LEFT JOIN product_variants pv ON op.variant_id = pv.id
     WHERE op.offer_id = ?`,
    [offerId]
  );

  const [rewards] = await conn.query(
    `SELECT r.id, r.offer_id, r.reward_type, r.discount_type, r.discount_value,
            r.maximum_discount AS max_discount_amount, r.target_scope
     FROM offer_rewards r
     WHERE r.offer_id = ?`,
    [offerId]
  );

  const [slabs] = await conn.query(
    `SELECT s.id, s.offer_id, s.customer_type,
            s.minimum_quantity AS min_quantity, s.maximum_quantity AS max_quantity,
            s.pricing_type AS discount_type, s.pricing_value AS discount_value
     FROM offer_quantity_slabs s
     WHERE s.offer_id = ?
     ORDER BY s.minimum_quantity ASC`,
    [offerId]
  );

  const [recommendations] = await conn.query(
    `SELECT rec.id, rec.offer_id, rec.trigger_product_id, rec.trigger_variant_id,
            rec.recommended_product_id, rec.recommended_variant_id,
            rec.minimum_trigger_quantity AS min_trigger_quantity,
            rec.discount_type, rec.discount_value, rec.display_order AS priority,
            tp.name AS trigger_product_name, tp.sku AS trigger_product_sku,
            rp.name AS recommended_product_name, rp.sku AS recommended_product_sku, rp.price AS recommended_product_price,
            (SELECT image_path FROM product_images WHERE product_id = rp.id ORDER BY sort_order ASC LIMIT 1) AS recommended_image_url,
            rv.value AS recommended_variant_value, rv.price AS recommended_variant_price
     FROM offer_recommendations rec
     LEFT JOIN products tp ON rec.trigger_product_id = tp.id
     LEFT JOIN products rp ON rec.recommended_product_id = rp.id
     LEFT JOIN product_variants rv ON rec.recommended_variant_id = rv.id
     WHERE rec.offer_id = ?
     ORDER BY rec.display_order DESC, rec.id ASC`,
    [offerId]
  );

  const [customerTypes] = await conn.query(
    "SELECT customer_type FROM offer_customer_types WHERE offer_id = ?",
    [offerId]
  );

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
    customerTypes: customerTypes.map((c) => c.customer_type),
    products,
    rewards,
    slabs,
    recommendations,
  };
}

// ----------------------------------------------------------------------
// ADMIN ENDPOINTS
// ----------------------------------------------------------------------

export const listOffers = asyncHandler(async (req, res) => {
  const { search, type, status, page = 1, limit = 50 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  const whereClauses = [];
  const params = [];

  if (search && search.trim()) {
    whereClauses.push("(name LIKE ? OR offer_code LIKE ?)");
    const q = `%${search.trim()}%`;
    params.push(q, q);
  }

  if (type) {
    whereClauses.push("offer_type = ?");
    params.push(type);
  }

  if (status) {
    whereClauses.push("status = ?");
    params.push(status);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  const [countRows] = await pool.query(
    `SELECT COUNT(*) AS total FROM offers ${whereSql}`,
    params
  );
  const total = countRows[0].total;

  const [rows] = await pool.query(
    `SELECT o.*,
            (SELECT COUNT(*) FROM offer_products WHERE offer_id = o.id) AS products_count,
            (SELECT COUNT(*) FROM offer_quantity_slabs WHERE offer_id = o.id) AS slabs_count,
            (SELECT COUNT(*) FROM offer_recommendations WHERE offer_id = o.id) AS recommendations_count
     FROM offers o
     ${whereSql}
     ORDER BY o.priority DESC, o.created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, Number(limit), offset]
  );

  const formattedOffers = rows.map((o) => {
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
      products_count: o.products_count,
      slabs_count: o.slabs_count,
      recommendations_count: o.recommendations_count,
      min_cart_value: cfg.minCartValue || null,
      max_discount: cfg.maxDiscount || null,
    };
  });

  res.json({
    offers: formattedOffers,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

export const getOfferById = asyncHandler(async (req, res) => {
  const offer = await getFullOffer(req.params.id);
  if (!offer) {
    return res.status(404).json({ error: "Offer not found" });
  }
  res.json(offer);
});

export const createOffer = asyncHandler(async (req, res) => {
  const {
    title,
    internalCode,
    description,
    offerType,
    campaignImage,
    status = "draft",
    startDate,
    endDate,
    priority = 0,
    isStackable = false,
    usageLimit = null,
    minCartValue = null,
    maxDiscount = null,
    storefrontBadge,
    displayMessage,
    customerTypes = ["retail", "wholesale"],
    products = [],
    rewards = [],
    slabs = [],
    recommendations = [],
  } = req.body;

  if (!title || !offerType) {
    return res.status(400).json({ error: "Title and offerType are required" });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const code = internalCode || `OFFER-${Date.now().toString(36).toUpperCase()}`;

    const displayConfig = JSON.stringify({
      storefrontBadge: storefrontBadge || null,
      displayMessage: displayMessage || null,
      campaignImage: campaignImage || null,
      minCartValue: minCartValue ? Number(minCartValue) : null,
      maxDiscount: maxDiscount ? Number(maxDiscount) : null,
    });

    const [result] = await conn.execute(
      `INSERT INTO offers (
        name, offer_code, description, offer_type,
        status, start_at, end_at, priority, stackable,
        usage_limit, times_used, display_config
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)`,
      [
        title,
        code,
        description || null,
        offerType,
        status,
        startDate ? new Date(startDate) : null,
        endDate ? new Date(endDate) : null,
        Number(priority) || 0,
        isStackable ? 1 : 0,
        usageLimit ? Number(usageLimit) : null,
        displayConfig,
      ]
    );

    const offerId = result.insertId;

    if (Array.isArray(customerTypes) && customerTypes.length > 0) {
      for (const ct of customerTypes) {
        await conn.execute(
          "INSERT INTO offer_customer_types (offer_id, customer_type) VALUES (?, ?)",
          [offerId, ct]
        );
      }
    }

    if (Array.isArray(products) && products.length > 0) {
      for (const p of products) {
        await conn.execute(
          `INSERT INTO offer_products (offer_id, product_id, variant_id, required_quantity, product_role)
           VALUES (?, ?, ?, ?, ?)`,
          [
            offerId,
            p.productId || p.product_id,
            p.variantId || p.variant_id || null,
            p.minQuantity || p.min_quantity || p.required_quantity || 1,
            normalizeRole(p.role || p.product_role),
          ]
        );
      }
    }

    if (Array.isArray(rewards) && rewards.length > 0) {
      for (const r of rewards) {
        await conn.execute(
          `INSERT INTO offer_rewards (offer_id, reward_type, discount_type, discount_value, maximum_discount, target_scope)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            offerId,
            normalizeRewardType(r.rewardType || r.reward_type),
            normalizeDiscountType(r.discountType || r.discount_type),
            r.discountValue || r.discount_value || 0,
            r.maxDiscountAmount || r.maximum_discount || null,
            r.targetScope || r.target_scope || "all_eligible",
          ]
        );
      }
    }

    if (Array.isArray(slabs) && slabs.length > 0) {
      for (const s of slabs) {
        await conn.execute(
          `INSERT INTO offer_quantity_slabs (offer_id, customer_type, minimum_quantity, maximum_quantity, pricing_type, pricing_value)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            offerId,
            s.customerType || s.customer_type || "all",
            s.minQuantity || s.min_quantity || s.minimum_quantity,
            s.maxQuantity !== undefined && s.maxQuantity !== "" ? Number(s.maxQuantity) : null,
            normalizePricingType(s.discountType || s.discount_type || s.pricing_type),
            s.discountValue || s.discount_value || s.pricing_value || 0,
          ]
        );
      }
    }

    if (Array.isArray(recommendations) && recommendations.length > 0) {
      for (const rec of recommendations) {
        await conn.execute(
          `INSERT INTO offer_recommendations (
            offer_id, trigger_product_id, trigger_variant_id,
            recommended_product_id, recommended_variant_id, minimum_trigger_quantity,
            discount_type, discount_value, display_order
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            offerId,
            rec.triggerProductId || rec.trigger_product_id,
            rec.triggerVariantId || rec.trigger_variant_id || null,
            rec.recommendedProductId || rec.recommended_product_id,
            rec.recommendedVariantId || rec.recommended_variant_id || null,
            rec.minTriggerQuantity || rec.minimum_trigger_quantity || 1,
            rec.discountType || rec.discount_type || "percentage",
            rec.discountValue || rec.discount_value || 0,
            rec.priority || rec.display_order || 0,
          ]
        );
      }
    }

    await conn.commit();
    const created = await getFullOffer(offerId);
    res.status(201).json(created);
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
});

export const updateOffer = asyncHandler(async (req, res) => {
  const offerId = req.params.id;
  const {
    title,
    internalCode,
    description,
    offerType,
    campaignImage,
    status,
    startDate,
    endDate,
    priority,
    isStackable,
    usageLimit,
    minCartValue,
    maxDiscount,
    storefrontBadge,
    displayMessage,
    customerTypes,
    products,
    rewards,
    slabs,
    recommendations,
  } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [existing] = await conn.execute("SELECT id FROM offers WHERE id = ?", [offerId]);
    if (existing.length === 0) {
      await conn.rollback();
      return res.status(404).json({ error: "Offer not found" });
    }

    const displayConfig = JSON.stringify({
      storefrontBadge: storefrontBadge || null,
      displayMessage: displayMessage || null,
      campaignImage: campaignImage || null,
      minCartValue: minCartValue ? Number(minCartValue) : null,
      maxDiscount: maxDiscount ? Number(maxDiscount) : null,
    });

    await conn.execute(
      `UPDATE offers SET
        name = ?, offer_code = ?, description = ?, offer_type = ?,
        status = ?, start_at = ?, end_at = ?, priority = ?, stackable = ?,
        usage_limit = ?, display_config = ?, updated_at = NOW()
       WHERE id = ?`,
      [
        title,
        internalCode,
        description || null,
        offerType,
        status,
        startDate ? new Date(startDate) : null,
        endDate ? new Date(endDate) : null,
        Number(priority) || 0,
        isStackable ? 1 : 0,
        usageLimit !== undefined && usageLimit !== "" && usageLimit !== null ? Number(usageLimit) : null,
        displayConfig,
        offerId,
      ]
    );

    await conn.execute("DELETE FROM offer_customer_types WHERE offer_id = ?", [offerId]);
    if (Array.isArray(customerTypes) && customerTypes.length > 0) {
      for (const ct of customerTypes) {
        await conn.execute(
          "INSERT INTO offer_customer_types (offer_id, customer_type) VALUES (?, ?)",
          [offerId, ct]
        );
      }
    }

    await conn.execute("DELETE FROM offer_products WHERE offer_id = ?", [offerId]);
    if (Array.isArray(products) && products.length > 0) {
      for (const p of products) {
        await conn.execute(
          `INSERT INTO offer_products (offer_id, product_id, variant_id, required_quantity, product_role)
           VALUES (?, ?, ?, ?, ?)`,
          [
            offerId,
            p.productId || p.product_id,
            p.variantId || p.variant_id || null,
            p.minQuantity || p.min_quantity || p.required_quantity || 1,
            normalizeRole(p.role || p.product_role),
          ]
        );
      }
    }

    await conn.execute("DELETE FROM offer_rewards WHERE offer_id = ?", [offerId]);
    if (Array.isArray(rewards) && rewards.length > 0) {
      for (const r of rewards) {
        await conn.execute(
          `INSERT INTO offer_rewards (offer_id, reward_type, discount_type, discount_value, maximum_discount, target_scope)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            offerId,
            normalizeRewardType(r.rewardType || r.reward_type),
            normalizeDiscountType(r.discountType || r.discount_type),
            r.discountValue || r.discount_value || 0,
            r.maxDiscountAmount || r.maximum_discount || null,
            r.targetScope || r.target_scope || "all_eligible",
          ]
        );
      }
    }

    await conn.execute("DELETE FROM offer_quantity_slabs WHERE offer_id = ?", [offerId]);
    if (Array.isArray(slabs) && slabs.length > 0) {
      for (const s of slabs) {
        await conn.execute(
          `INSERT INTO offer_quantity_slabs (offer_id, customer_type, minimum_quantity, maximum_quantity, pricing_type, pricing_value)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            offerId,
            s.customerType || s.customer_type || "all",
            s.minQuantity || s.min_quantity || s.minimum_quantity,
            s.maxQuantity !== undefined && s.maxQuantity !== "" ? Number(s.maxQuantity) : null,
            normalizePricingType(s.discountType || s.discount_type || s.pricing_type),
            s.discountValue || s.discount_value || s.pricing_value || 0,
          ]
        );
      }
    }

    await conn.execute("DELETE FROM offer_recommendations WHERE offer_id = ?", [offerId]);
    if (Array.isArray(recommendations) && recommendations.length > 0) {
      for (const rec of recommendations) {
        await conn.execute(
          `INSERT INTO offer_recommendations (
            offer_id, trigger_product_id, trigger_variant_id,
            recommended_product_id, recommended_variant_id, minimum_trigger_quantity,
            discount_type, discount_value, display_order
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            offerId,
            rec.triggerProductId || rec.trigger_product_id,
            rec.triggerVariantId || rec.trigger_variant_id || null,
            rec.recommendedProductId || rec.recommended_product_id,
            rec.recommendedVariantId || rec.recommended_variant_id || null,
            rec.minTriggerQuantity || rec.minimum_trigger_quantity || 1,
            rec.discountType || rec.discount_type || "percentage",
            rec.discountValue || rec.discount_value || 0,
            rec.priority || rec.display_order || 0,
          ]
        );
      }
    }

    await conn.commit();
    const updated = await getFullOffer(offerId);
    res.json(updated);
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
});

export const toggleOfferStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["active", "inactive", "draft", "scheduled"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  await pool.execute("UPDATE offers SET status = ?, updated_at = NOW() WHERE id = ?", [status, id]);
  res.json({ success: true, id, status });
});

export const duplicateOffer = asyncHandler(async (req, res) => {
  const sourceOffer = await getFullOffer(req.params.id);
  if (!sourceOffer) {
    return res.status(404).json({ error: "Source offer not found" });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const newCode = `COPY-${Date.now().toString(36).toUpperCase()}`;
    const newTitle = `${sourceOffer.title} (Copy)`;

    const displayConfig = JSON.stringify({
      storefrontBadge: sourceOffer.storefront_badge || null,
      displayMessage: sourceOffer.display_message || null,
      campaignImage: sourceOffer.campaign_image || null,
      minCartValue: sourceOffer.min_cart_value || null,
      maxDiscount: sourceOffer.max_discount || null,
    });

    const [result] = await conn.execute(
      `INSERT INTO offers (
        name, offer_code, description, offer_type,
        status, start_at, end_at, priority, stackable,
        usage_limit, times_used, display_config
      ) VALUES (?, ?, ?, ?, 'draft', ?, ?, ?, ?, ?, 0, ?)`,
      [
        newTitle,
        newCode,
        sourceOffer.description,
        sourceOffer.offer_type,
        sourceOffer.start_date,
        sourceOffer.end_date,
        sourceOffer.priority,
        sourceOffer.is_stackable ? 1 : 0,
        sourceOffer.usage_limit,
        displayConfig,
      ]
    );

    const newOfferId = result.insertId;

    for (const ct of sourceOffer.customerTypes) {
      await conn.execute("INSERT INTO offer_customer_types (offer_id, customer_type) VALUES (?, ?)", [newOfferId, ct]);
    }
    for (const p of sourceOffer.products) {
      await conn.execute(
        "INSERT INTO offer_products (offer_id, product_id, variant_id, required_quantity, product_role) VALUES (?, ?, ?, ?, ?)",
        [newOfferId, p.product_id, p.variant_id, p.min_quantity, p.role]
      );
    }
    for (const r of sourceOffer.rewards) {
      await conn.execute(
        "INSERT INTO offer_rewards (offer_id, reward_type, discount_type, discount_value, maximum_discount, target_scope) VALUES (?, ?, ?, ?, ?, ?)",
        [newOfferId, r.reward_type, r.discount_type, r.discount_value, r.max_discount_amount, r.target_scope]
      );
    }
    for (const s of sourceOffer.slabs) {
      await conn.execute(
        "INSERT INTO offer_quantity_slabs (offer_id, customer_type, minimum_quantity, maximum_quantity, pricing_type, pricing_value) VALUES (?, ?, ?, ?, ?, ?)",
        [newOfferId, s.customer_type, s.min_quantity, s.max_quantity, s.discount_type, s.discount_value]
      );
    }
    for (const rec of sourceOffer.recommendations) {
      await conn.execute(
        `INSERT INTO offer_recommendations (
          offer_id, trigger_product_id, trigger_variant_id,
          recommended_product_id, recommended_variant_id, minimum_trigger_quantity,
          discount_type, discount_value, display_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newOfferId,
          rec.trigger_product_id,
          rec.trigger_variant_id,
          rec.recommended_product_id,
          rec.recommended_variant_id,
          rec.min_trigger_quantity,
          rec.discount_type,
          rec.discount_value,
          rec.priority,
        ]
      );
    }

    await conn.commit();
    const created = await getFullOffer(newOfferId);
    res.status(201).json(created);
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
});

export const deleteOffer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await pool.execute("DELETE FROM offers WHERE id = ?", [id]);
  res.json({ success: true, message: "Offer deleted successfully" });
});

// ----------------------------------------------------------------------
// STOREFRONT ENDPOINTS
// ----------------------------------------------------------------------

export const calculateCart = asyncHandler(async (req, res) => {
  const { items = [] } = req.body;
  const customerType = req.user?.customerType || "retail";

  const result = await offerEngine.calculateCartOffers({
    items,
    customerType,
    pool,
    userId: req.user?.id || null,
  });

  res.json(result);
});

export const getProductOfferDetails = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { variantId } = req.query;
  const customerType = req.user?.customerType || "retail";

  const result = await offerEngine.getProductOffers(productId, variantId, pool, customerType);
  res.json(result);
});

export const getProductRecommendations = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { variantId } = req.query;

  const result = await offerEngine.getProductRecommendations(productId, variantId, pool);
  res.json(result);
});

export const listActiveStorefrontOffers = asyncHandler(async (req, res) => {
  const customerType = req.user?.customerType || "retail";
  const activeOffers = await offerEngine.getActiveOffers(pool, { customerType });

  const banners = activeOffers.map((o) => ({
    id: o.id,
    title: o.title,
    offerType: o.offer_type,
    badge: o.storefront_badge,
    message: o.display_message,
    description: o.description,
    campaignImage: o.campaign_image,
  }));

  res.json(banners);
});
