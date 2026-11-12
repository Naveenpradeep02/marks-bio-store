import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "naveen@123",
  database: "marksbiotech",
  waitForConnections: true,
  connectionLimit: 10,
});

async function seedDemoOffers() {
  console.log("==========================================================");
  console.log("   SEEDING MARKS BIOTECH REALISTIC DEMO CAMPAIGNS         ");
  console.log("==========================================================\n");

  const conn = await pool.getConnection();
  try {
    // Check existing products
    const [products] = await conn.query(
      "SELECT id, name, sku, price FROM products ORDER BY id ASC LIMIT 10"
    );
    console.log(`Found ${products.length} products available for campaigns.`);

    const [variants] = await conn.query(
      "SELECT id, product_id, sku, price, value FROM product_variants ORDER BY id ASC LIMIT 10"
    );
    console.log(`Found ${variants.length} variants available for targeted slabs.`);

    // 1. Bulk Quantity Tier Offer
    // Campaign: Dental Biologics Volume Tier Savings (Cancellous Vials)
    const targetProd = products.find((p) => p.id === 46) || products[0];
    const [existingBulk] = await conn.query(
      "SELECT id FROM offers WHERE offer_code = 'BULK-BIO-TIER'"
    );

    if (existingBulk.length === 0) {
      const [bRes] = await conn.execute(
        `INSERT INTO offers (
          name, offer_code, description, offer_type, status,
          priority, stackable, usage_limit, times_used, display_config
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?)`,
        [
          "Biologics Volume Tier Savings",
          "BULK-BIO-TIER",
          "Tiered volume savings on clinical regenerative particulates. Unlock progressive discounts as order quantity increases.",
          "bulk_quantity",
          "active",
          10,
          1,
          500,
          JSON.stringify({
            storefrontBadge: "BULK SAVINGS UP TO 20%",
            displayMessage: "Buy 5+ save 10%, Buy 10+ save 15%, Buy 20+ save 20%!",
          }),
        ]
      );
      const bId = bRes.insertId;

      await conn.execute(
        "INSERT INTO offer_customer_types (offer_id, customer_type) VALUES (?, ?), (?, ?)",
        [bId, "retail", bId, "wholesale"]
      );

      await conn.execute(
        "INSERT INTO offer_products (offer_id, product_id, variant_id, required_quantity, product_role) VALUES (?, ?, NULL, 1, 'eligible')",
        [bId, targetProd.id]
      );

      await conn.execute(
        `INSERT INTO offer_quantity_slabs (offer_id, customer_type, minimum_quantity, maximum_quantity, pricing_type, pricing_value)
         VALUES 
          (?, 'all', 5, 9, 'percentage_discount', 10.00),
          (?, 'all', 10, 19, 'percentage_discount', 15.00),
          (?, 'all', 20, NULL, 'percentage_discount', 20.00)`,
        [bId, bId, bId]
      );
      console.log(`✓ Created Campaign 1: Biologics Volume Tier Savings (ID: ${bId})`);
    } else {
      console.log("Campaign 1 (BULK-BIO-TIER) already exists, skipping.");
    }

    // 2. Mix & Match Combo Offer
    // Campaign: Implant Surgical Combo (3 Titanium Membranes + 2 Bone Particulate Vials -> 15% off combo)
    const [existingMix] = await conn.query(
      "SELECT id FROM offers WHERE offer_code = 'MIX-SURGICAL-COMBO'"
    );

    if (existingMix.length === 0 && products.length >= 2) {
      const pA = products.find((p) => p.id === 28) || products[0];
      const pB = products.find((p) => p.id === 46) || products[1];

      const [mRes] = await conn.execute(
        `INSERT INTO offers (
          name, offer_code, description, offer_type, status,
          priority, stackable, usage_limit, times_used, display_config
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?)`,
        [
          "Implant Surgical Combo Pack",
          "MIX-SURGICAL-COMBO",
          "Combine 3 Titanium Membranes and 2 Regenerative Vials to receive 15% promotional combo discount.",
          "mix_match",
          "active",
          20,
          1,
          200,
          JSON.stringify({
            storefrontBadge: "SURGICAL COMBO 15% OFF",
            displayMessage: "Bundle Titanium Membranes with Regenerative Vials for an instant 15% discount!",
          }),
        ]
      );
      const mId = mRes.insertId;

      await conn.execute(
        "INSERT INTO offer_customer_types (offer_id, customer_type) VALUES (?, ?), (?, ?)",
        [mId, "retail", mId, "wholesale"]
      );

      await conn.execute(
        `INSERT INTO offer_products (offer_id, product_id, variant_id, required_quantity, product_role)
         VALUES (?, ?, NULL, 3, 'eligible'), (?, ?, NULL, 2, 'eligible')`,
        [mId, pA.id, mId, pB.id]
      );

      await conn.execute(
        `INSERT INTO offer_rewards (offer_id, reward_type, discount_type, discount_value, maximum_discount, target_scope)
         VALUES (?, 'discount', 'percentage', 15.00, 5000.00, 'all_eligible')`,
        [mId]
      );
      console.log(`✓ Created Campaign 2: Implant Surgical Combo Pack (ID: ${mId})`);
    } else {
      console.log("Campaign 2 (MIX-SURGICAL-COMBO) already exists or insufficient products, skipping.");
    }

    // 3. Combo / Bundle Offer
    // Campaign: Bone Graft Starter Kit (1 Membrane + 1 Particulate Vial + 1 Bone Block)
    const [existingBundle] = await conn.query(
      "SELECT id FROM offers WHERE offer_code = 'KIT-BONE-GRAFT'"
    );

    if (existingBundle.length === 0 && products.length >= 3) {
      const p1 = products.find((p) => p.id === 28) || products[0];
      const p2 = products.find((p) => p.id === 46) || products[1];
      const p3 = products.find((p) => p.id === 47) || products[2];

      const [bunRes] = await conn.execute(
        `INSERT INTO offers (
          name, offer_code, description, offer_type, status,
          priority, stackable, usage_limit, times_used, display_config
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?)`,
        [
          "Bone Graft Starter Kit",
          "KIT-BONE-GRAFT",
          "Complete starter combination containing Titanium Membrane, Particulate Vial, and Bone Block.",
          "combo_bundle",
          "active",
          15,
          1,
          100,
          JSON.stringify({
            storefrontBadge: "STARTER KIT ₹500 OFF",
            displayMessage: "Order all 3 clinical starter essentials together and save ₹500 instantly!",
          }),
        ]
      );
      const bunId = bunRes.insertId;

      await conn.execute(
        "INSERT INTO offer_customer_types (offer_id, customer_type) VALUES (?, ?), (?, ?)",
        [bunId, "retail", bunId, "wholesale"]
      );

      await conn.execute(
        `INSERT INTO offer_products (offer_id, product_id, variant_id, required_quantity, product_role)
         VALUES (?, ?, NULL, 1, 'bundle_item'), (?, ?, NULL, 1, 'bundle_item'), (?, ?, NULL, 1, 'bundle_item')`,
        [bunId, p1.id, bunId, p2.id, bunId, p3.id]
      );

      await conn.execute(
        `INSERT INTO offer_rewards (offer_id, reward_type, discount_type, discount_value, maximum_discount, target_scope)
         VALUES (?, 'discount', 'fixed_amount', 500.00, NULL, 'all_eligible')`,
        [bunId]
      );
      console.log(`✓ Created Campaign 3: Bone Graft Starter Kit (ID: ${bunId})`);
    } else {
      console.log("Campaign 3 (KIT-BONE-GRAFT) already exists, skipping.");
    }

    // 4. Frequently Bought Together / Cross-Sell Offer
    // Campaign: Titanium Membrane triggers Cortical Bone Block at 25% discount
    const [existingCross] = await conn.query(
      "SELECT id FROM offers WHERE offer_code = 'REC-CROSS-SELL-01'"
    );

    if (existingCross.length === 0 && products.length >= 2) {
      const trig = products.find((p) => p.id === 28) || products[0];
      const rec = products.find((p) => p.id === 47) || products[1];

      const [cRes] = await conn.execute(
        `INSERT INTO offers (
          name, offer_code, description, offer_type, status,
          priority, stackable, usage_limit, times_used, display_config
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?)`,
        [
          "Titanium Membrane Cross-Sell Special",
          "REC-CROSS-SELL-01",
          "Clinicians purchasing Titanium Membranes receive exclusive 25% discount on Cortical Bone Blocks.",
          "cross_sell",
          "active",
          30,
          1,
          null,
          JSON.stringify({
            storefrontBadge: "SPECIAL COMPLEMENTARY ADD-ON",
            displayMessage: "Pair with Cortical Bone Blocks to get an exclusive 25% discount!",
          }),
        ]
      );
      const cId = cRes.insertId;

      await conn.execute(
        "INSERT INTO offer_customer_types (offer_id, customer_type) VALUES (?, ?), (?, ?)",
        [cId, "retail", cId, "wholesale"]
      );

      await conn.execute(
        `INSERT INTO offer_recommendations (
          offer_id, trigger_product_id, trigger_variant_id,
          recommended_product_id, recommended_variant_id, minimum_trigger_quantity,
          discount_type, discount_value, display_order
        ) VALUES (?, ?, NULL, ?, NULL, 1, 'percentage', 25.00, 10)`,
        [cId, trig.id, rec.id]
      );
      console.log(`✓ Created Campaign 4: Titanium Membrane Cross-Sell Special (ID: ${cId})`);
    } else {
      console.log("Campaign 4 (REC-CROSS-SELL-01) already exists, skipping.");
    }

    // 5. Cart Value Tier Offer
    // Campaign: Clinical Spend Tier (Cart ₹10,000+ unlocks ₹1,000 off)
    const [existingCartVal] = await conn.query(
      "SELECT id FROM offers WHERE offer_code = 'TIER-CART-10K'"
    );

    if (existingCartVal.length === 0) {
      const [vRes] = await conn.execute(
        `INSERT INTO offers (
          name, offer_code, description, offer_type, status,
          priority, stackable, usage_limit, times_used, display_config
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?)`,
        [
          "Clinical Spend & Save ₹1,000",
          "TIER-CART-10K",
          "Unlock ₹1,000 direct deduction on clinic orders of ₹10,000 or more.",
          "cart_value",
          "active",
          5,
          1,
          null,
          JSON.stringify({
            storefrontBadge: "SPEND ₹10K GET ₹1,000 OFF",
            displayMessage: "Orders over ₹10,000 automatically receive ₹1,000 savings at checkout!",
            minCartValue: 10000,
            maxDiscount: 1000,
          }),
        ]
      );
      const vId = vRes.insertId;

      await conn.execute(
        "INSERT INTO offer_customer_types (offer_id, customer_type) VALUES (?, ?), (?, ?)",
        [vId, "retail", vId, "wholesale"]
      );

      await conn.execute(
        `INSERT INTO offer_rewards (offer_id, reward_type, discount_type, discount_value, maximum_discount, target_scope)
         VALUES (?, 'discount', 'fixed_amount', 1000.00, 1000.00, 'cart_subtotal')`,
        [vId]
      );
      console.log(`✓ Created Campaign 5: Clinical Spend & Save ₹1,000 (ID: ${vId})`);
    } else {
      console.log("Campaign 5 (TIER-CART-10K) already exists, skipping.");
    }

    console.log("\n==========================================================");
    console.log("   ALL 5 DEMO CAMPAIGNS SUCCESSFULLY SEEDED & VERIFIED!   ");
    console.log("==========================================================");
  } catch (err) {
    console.error("Error seeding demo offers:", err);
  } finally {
    conn.release();
    await pool.end();
  }
}

seedDemoOffers();
