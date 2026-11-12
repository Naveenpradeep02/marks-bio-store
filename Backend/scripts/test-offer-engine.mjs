import mysql from "mysql2/promise";
import * as offerEngine from "../src/services/offerEngine.service.js";

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "naveen@123",
  database: "marksbiotech",
  waitForConnections: true,
  connectionLimit: 10,
});

async function runTestSuite() {
  console.log("==========================================================");
  console.log("   MARKS BIOTECH ADVANCED OFFER MANAGEMENT ENGINE TEST    ");
  console.log("==========================================================\n");

  let testOffersCreated = [];

  try {
    // 1. Fetch some existing products to test with
    const [products] = await pool.query(
      "SELECT id, name, price FROM products LIMIT 5"
    );
    if (products.length < 3) {
      throw new Error("Need at least 3 products in DB to run full test suite");
    }

    const p1 = products[0];
    const p2 = products[1];
    const p3 = products[2];

    console.log(`Using Products for Test:`);
    console.log(`• P1: ${p1.name} (ID: ${p1.id}, Price: ₹${p1.price})`);
    console.log(`• P2: ${p2.name} (ID: ${p2.id}, Price: ₹${p2.price})`);
    console.log(`• P3: ${p3.name} (ID: ${p3.id}, Price: ₹${p3.price})\n`);

    // -------------------------------------------------------------------------
    // TEST 1: BULK QUANTITY OFFER
    // -------------------------------------------------------------------------
    console.log("TEST 1: Creating Bulk Quantity Offer (10% off for 5-9 units, 20% off for 10+ units)...");
    const [bulkRes] = await pool.query(
      `INSERT INTO offers (name, offer_code, offer_type, status, priority, stackable, display_config)
       VALUES (?, ?, 'bulk_quantity', 'active', 10, 1, ?)`,
      [
        "Test Bulk Quantity Offer",
        `TEST-BULK-${Date.now()}`,
        JSON.stringify({ storefrontBadge: "BULK SAVINGS" }),
      ]
    );
    const bulkOfferId = bulkRes.insertId;
    testOffersCreated.push(bulkOfferId);

    // Add slabs: 5-9 units -> 10% off; 10+ units -> 20% off
    await pool.query(
      `INSERT INTO offer_quantity_slabs (offer_id, customer_type, minimum_quantity, maximum_quantity, pricing_type, pricing_value)
       VALUES (?, 'all', 5, 9, 'percentage_discount', 10),
              (?, 'all', 10, NULL, 'percentage_discount', 20)`,
      [bulkOfferId, bulkOfferId]
    );

    // Calculate cart with 6 units of P1 (should get 10% discount)
    const calcBulk1 = await offerEngine.calculateCartOffers({
      items: [{ productId: p1.id, quantity: 6 }],
      customerType: "retail",
      pool,
    });

    console.log("-> 6 units evaluated:");
    console.log("   Subtotal: ₹", calcBulk1.subtotal);
    console.log("   Discount: ₹", calcBulk1.discountTotal);
    console.log("   Applied Offers:", calcBulk1.appliedOffers.map((o) => o.title));

    const expectedBulkDisc1 = Math.round(p1.price * 6 * 0.1 * 100) / 100;
    if (calcBulk1.discountTotal === expectedBulkDisc1) {
      console.log(`✅ TEST 1A PASSED: 10% slab correctly applied (₹${calcBulk1.discountTotal})`);
    } else {
      throw new Error(`TEST 1A FAILED: expected ₹${expectedBulkDisc1}, got ₹${calcBulk1.discountTotal}`);
    }

    // Calculate cart with 12 units of P1 (should get 20% discount)
    const calcBulk2 = await offerEngine.calculateCartOffers({
      items: [{ productId: p1.id, quantity: 12 }],
      customerType: "retail",
      pool,
    });
    const expectedBulkDisc2 = Math.round(p1.price * 12 * 0.2 * 100) / 100;
    if (calcBulk2.discountTotal === expectedBulkDisc2) {
      console.log(`✅ TEST 1B PASSED: 20% slab correctly applied for 12 units (₹${calcBulk2.discountTotal})\n`);
    } else {
      throw new Error(`TEST 1B FAILED: expected ₹${expectedBulkDisc2}, got ₹${calcBulk2.discountTotal}`);
    }

    // -------------------------------------------------------------------------
    // TEST 2: MIX & MATCH OFFER
    // -------------------------------------------------------------------------
    console.log("TEST 2: Creating Mix & Match Offer (Buy 3 of P1 + 2 of P2 to get 15% off combo)...");
    const [mixRes] = await pool.query(
      `INSERT INTO offers (name, offer_code, offer_type, status, priority, stackable, display_config)
       VALUES (?, ?, 'mix_match', 'active', 20, 1, ?)`,
      [
        "Test Mix Match Combo",
        `TEST-MIX-${Date.now()}`,
        JSON.stringify({ storefrontBadge: "COMBO 15%" }),
      ]
    );
    const mixOfferId = mixRes.insertId;
    testOffersCreated.push(mixOfferId);

    // Conditions: 3 of P1, 2 of P2
    await pool.query(
      `INSERT INTO offer_products (offer_id, product_id, product_role, required_quantity)
       VALUES (?, ?, 'eligible', 3), (?, ?, 'eligible', 2)`,
      [mixOfferId, p1.id, mixOfferId, p2.id]
    );

    // Reward: 15% off
    await pool.query(
      `INSERT INTO offer_rewards (offer_id, reward_type, discount_type, discount_value)
       VALUES (?, 'discount', 'percentage', 15)`,
      [mixOfferId]
    );

    // Test with only 2 of P1 and 2 of P2 (Condition NOT satisfied - should show missing upsell)
    const calcMixIncomplete = await offerEngine.calculateCartOffers({
      items: [
        { productId: p1.id, quantity: 2 },
        { productId: p2.id, quantity: 2 },
      ],
      customerType: "retail",
      pool,
    });
    if (calcMixIncomplete.eligibleOffers.some((e) => e.offerId === mixOfferId)) {
      console.log(`✅ TEST 2A PASSED: Incomplete Mix & Match flagged missing condition:`);
      console.log(`   "${calcMixIncomplete.eligibleOffers[0].message}"`);
    } else {
      throw new Error("TEST 2A FAILED: Missing condition not flagged for incomplete combo");
    }

    // Test with 3 of P1 and 2 of P2 (Satisfied!)
    const calcMixComplete = await offerEngine.calculateCartOffers({
      items: [
        { productId: p1.id, quantity: 3 },
        { productId: p2.id, quantity: 2 },
      ],
      customerType: "retail",
      pool,
    });
    if (calcMixComplete.appliedOffers.some((a) => a.id === mixOfferId)) {
      console.log(`✅ TEST 2B PASSED: Full Mix & Match satisfied and applied discount of ₹${calcMixComplete.discountTotal}\n`);
    } else {
      throw new Error("TEST 2B FAILED: Mix & Match offer was not applied when satisfied");
    }

    // -------------------------------------------------------------------------
    // TEST 3: FREQUENTLY BOUGHT TOGETHER / CROSS-SELL
    // -------------------------------------------------------------------------
    console.log("TEST 3: Creating Frequently Bought Together (If P1 in cart, get P3 at 25% off)...");
    const [recOfferRes] = await pool.query(
      `INSERT INTO offers (name, offer_code, offer_type, status, priority, stackable, display_config)
       VALUES (?, ?, 'cross_sell', 'active', 30, 1, ?)`,
      [
        "Test Cross-Sell Offer",
        `TEST-REC-${Date.now()}`,
        JSON.stringify({ storefrontBadge: "CROSS-SELL", displayMessage: "Frequently Bought Together — Save 25%" }),
      ]
    );
    const recOfferId = recOfferRes.insertId;
    testOffersCreated.push(recOfferId);

    await pool.query(
      `INSERT INTO offer_recommendations (offer_id, trigger_product_id, recommended_product_id, minimum_trigger_quantity, discount_type, discount_value, display_order)
       VALUES (?, ?, ?, 1, 'percentage', 25, 10)`,
      [recOfferId, p1.id, p3.id]
    );

    // Cart with only trigger P1: should suggest P3 as recommendation
    const calcRecSuggest = await offerEngine.calculateCartOffers({
      items: [{ productId: p1.id, quantity: 1 }],
      customerType: "retail",
      pool,
    });
    if (calcRecSuggest.recommendations.some((r) => r.productId === p3.id)) {
      console.log(`✅ TEST 3A PASSED: Cross-Sell recommendation surfaced: ${calcRecSuggest.recommendations[0].name} (Offer Price: ₹${calcRecSuggest.recommendations[0].discountedPrice})`);
    } else {
      throw new Error("TEST 3A FAILED: Recommendation was not suggested for trigger product");
    }

    // Cart with both trigger P1 and recommended P3: should apply the 25% discount to P3!
    const calcRecApplied = await offerEngine.calculateCartOffers({
      items: [
        { productId: p1.id, quantity: 1 },
        { productId: p3.id, quantity: 1 },
      ],
      customerType: "retail",
      pool,
    });
    const p3Calc = calcRecApplied.items.find((i) => i.productId === p3.id);
    const expectedP3Disc = Math.round(p3.price * 0.25 * 100) / 100;
    if (p3Calc && p3Calc.lineDiscount === expectedP3Disc) {
      console.log(`✅ TEST 3B PASSED: 25% cross-sell discount applied to ${p3.name} (Discount: ₹${p3Calc.lineDiscount})\n`);
    } else {
      throw new Error(`TEST 3B FAILED: expected discount ₹${expectedP3Disc}, got ₹${p3Calc?.lineDiscount}`);
    }

    // -------------------------------------------------------------------------
    // TEST 4: CART VALUE OFFERS
    // -------------------------------------------------------------------------
    console.log("TEST 4: Creating Cart Value Tier Offer (Min ₹5,000 cart gets 10% off, max ₹1,000 cap)...");
    const [cvRes] = await pool.query(
      `INSERT INTO offers (name, offer_code, offer_type, status, priority, stackable, display_config)
       VALUES (?, ?, 'cart_value', 'active', 5, 1, ?)`,
      [
        "Test Cart Value Tier",
        `TEST-CV-${Date.now()}`,
        JSON.stringify({ minCartValue: 5000, maxDiscount: 1000, storefrontBadge: "CART VALUE" }),
      ]
    );
    const cvOfferId = cvRes.insertId;
    testOffersCreated.push(cvOfferId);

    await pool.query(
      `INSERT INTO offer_rewards (offer_id, reward_type, discount_type, discount_value)
       VALUES (?, 'discount', 'percentage', 10)`,
      [cvOfferId]
    );

    // Large quantity of P2 (₹450) to exceed ₹15,000 subtotal (discount would be > ₹1,500, but capped at ₹1,000)
    const largeQty = Math.ceil(15000 / p2.price);
    const calcCapped = await offerEngine.calculateCartOffers({
      items: [{ productId: p2.id, quantity: largeQty }],
      customerType: "retail",
      pool,
    });

    const cvApplied = calcCapped.appliedOffers.find((a) => a.id === cvOfferId);
    if (cvApplied && cvApplied.discountAmount <= 1000) {
      console.log(`✅ TEST 4 PASSED: Cart Value offer applied and capped at ₹${cvApplied.discountAmount} (Max cap: ₹1000)\n`);
    } else {
      throw new Error(`TEST 4 FAILED: Cart Value discount exceeded cap or was not applied`);
    }

    // -------------------------------------------------------------------------
    // TEST 5: RETAIL VS WHOLESALE SEGMENTATION
    // -------------------------------------------------------------------------
    console.log("TEST 5: Testing Customer Segmentation (Wholesale-only offer)...");
    const [wsRes] = await pool.query(
      `INSERT INTO offers (name, offer_code, offer_type, status, priority, stackable, display_config)
       VALUES (?, ?, 'cart_value', 'active', 50, 1, ?)`,
      [
        "Test Wholesale Exclusive",
        `TEST-WS-${Date.now()}`,
        JSON.stringify({ storefrontBadge: "WHOLESALE EXCLUSIVE" }),
      ]
    );
    const wsOfferId = wsRes.insertId;
    testOffersCreated.push(wsOfferId);

    // Restrict strictly to wholesale
    await pool.query(
      "INSERT INTO offer_customer_types (offer_id, customer_type) VALUES (?, 'wholesale')",
      [wsOfferId]
    );
    await pool.query(
      "INSERT INTO offer_rewards (offer_id, reward_type, discount_type, discount_value) VALUES (?, 'discount', 'percentage', 30)",
      [wsOfferId]
    );

    // When evaluated for retail: must NOT be applied
    const calcRetail = await offerEngine.calculateCartOffers({
      items: [{ productId: p1.id, quantity: 2 }],
      customerType: "retail",
      pool,
    });
    if (calcRetail.appliedOffers.some((a) => a.id === wsOfferId)) {
      throw new Error("TEST 5A FAILED: Wholesale offer was applied to Retail customer!");
    } else {
      console.log("✅ TEST 5A PASSED: Wholesale offer correctly blocked for Retail customer.");
    }

    // When evaluated for wholesale: MUST be applied
    const calcWholesale = await offerEngine.calculateCartOffers({
      items: [{ productId: p1.id, quantity: 2 }],
      customerType: "wholesale",
      pool,
    });
    if (calcWholesale.appliedOffers.some((a) => a.id === wsOfferId)) {
      console.log("✅ TEST 5B PASSED: Wholesale offer correctly applied to Wholesale customer profile.\n");
    } else {
      throw new Error("TEST 5B FAILED: Wholesale offer was not applied to Wholesale customer");
    }

    console.log("==========================================================");
    console.log("       ALL OFFER ENGINE VERIFICATION TESTS PASSED!        ");
    console.log("==========================================================");
  } catch (err) {
    console.error("❌ TEST SUITE FAILURE:", err);
    process.exitCode = 1;
  } finally {
    // Clean up test offers
    if (testOffersCreated.length > 0) {
      await pool.query("DELETE FROM offers WHERE id IN (?)", [testOffersCreated]);
      console.log(`Cleaned up ${testOffersCreated.length} temporary test offers.`);
    }
    await pool.end();
  }
}

runTestSuite();
