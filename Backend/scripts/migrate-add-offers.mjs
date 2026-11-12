import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function migrate() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "naveen@123",
    database: process.env.DB_NAME || "marksbiotech",
    multipleStatements: true,
  });

  console.log("Connected to MySQL. Running migrations...");

  try {
    // 1. Column alterations on existing tables (with IF NOT EXISTS helper checks)
    const [userCols] = await conn.execute(
      "SHOW COLUMNS FROM users LIKE 'customer_type'"
    );
    if (userCols.length === 0) {
      await conn.execute(
        "ALTER TABLE users ADD COLUMN customer_type ENUM('retail', 'wholesale') NOT NULL DEFAULT 'retail' AFTER role"
      );
      console.log("✓ Added customer_type to users");
    }

    const [orderCols] = await conn.execute(
      "SHOW COLUMNS FROM orders LIKE 'discount_total'"
    );
    if (orderCols.length === 0) {
      await conn.execute(
        "ALTER TABLE orders ADD COLUMN discount_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00 AFTER subtotal, ADD COLUMN applied_offers JSON DEFAULT NULL AFTER shipping_phone"
      );
      console.log("✓ Added discount_total and applied_offers to orders");
    }

    const [itemCols] = await conn.execute(
      "SHOW COLUMNS FROM order_items LIKE 'original_price'"
    );
    if (itemCols.length === 0) {
      await conn.execute(
        "ALTER TABLE order_items ADD COLUMN original_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00 AFTER price, ADD COLUMN discount DECIMAL(10, 2) NOT NULL DEFAULT 0.00 AFTER original_price, ADD COLUMN applied_offer_id INT NULL AFTER line_total"
      );
      console.log("✓ Added original_price, discount, applied_offer_id to order_items");
    }

    const [invCols] = await conn.execute(
      "SHOW COLUMNS FROM invoices LIKE 'discount_total'"
    );
    if (invCols.length === 0) {
      await conn.execute(
        "ALTER TABLE invoices ADD COLUMN discount_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00 AFTER subtotal"
      );
      console.log("✓ Added discount_total to invoices");
    }

    // 2. Create offers table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS offers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        offer_code VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        offer_type ENUM('bulk_quantity', 'mix_match', 'combo_bundle', 'cross_sell', 'cart_value') NOT NULL,
        status ENUM('draft', 'active', 'inactive', 'scheduled', 'expired') NOT NULL DEFAULT 'draft',
        start_at DATETIME NULL,
        end_at DATETIME NULL,
        priority INT NOT NULL DEFAULT 0,
        stackable BOOLEAN NOT NULL DEFAULT FALSE,
        usage_limit INT NULL DEFAULT NULL,
        times_used INT NOT NULL DEFAULT 0,
        display_config JSON DEFAULT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_offers_status (status),
        INDEX idx_offers_dates (start_at, end_at),
        INDEX idx_offers_type (offer_type)
      ) ENGINE=InnoDB;
    `);
    console.log("✓ Table created: offers");

    // 3. Create offer_products table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS offer_products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        offer_id INT NOT NULL,
        product_id INT NOT NULL,
        variant_id INT NULL,
        required_quantity INT NOT NULL DEFAULT 1,
        product_role ENUM('trigger', 'reward', 'bundle_item', 'eligible') NOT NULL DEFAULT 'eligible',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (offer_id) REFERENCES offers(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
        INDEX idx_op_offer (offer_id),
        INDEX idx_op_prod_variant (product_id, variant_id)
      ) ENGINE=InnoDB;
    `);
    console.log("✓ Table created: offer_products");

    // 4. Create offer_conditions table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS offer_conditions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        offer_id INT NOT NULL,
        condition_type ENUM('min_quantity', 'exact_quantity', 'min_cart_value', 'min_items_count') NOT NULL,
        minimum_value DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
        maximum_value DECIMAL(12, 2) NULL,
        operator ENUM('gte', 'eq', 'lte', 'between') NOT NULL DEFAULT 'gte',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (offer_id) REFERENCES offers(id) ON DELETE CASCADE,
        INDEX idx_oc_offer (offer_id)
      ) ENGINE=InnoDB;
    `);
    console.log("✓ Table created: offer_conditions");

    // 5. Create offer_rewards table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS offer_rewards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        offer_id INT NOT NULL,
        reward_type ENUM('discount', 'fixed_combo_price', 'special_unit_price', 'free_product') NOT NULL DEFAULT 'discount',
        discount_type ENUM('percentage', 'fixed_amount', 'override_price') NOT NULL DEFAULT 'percentage',
        discount_value DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        maximum_discount DECIMAL(10, 2) NULL,
        target_scope ENUM('all_eligible', 'specific_products', 'cheapest_item', 'cart_subtotal') NOT NULL DEFAULT 'all_eligible',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (offer_id) REFERENCES offers(id) ON DELETE CASCADE,
        INDEX idx_or_offer (offer_id)
      ) ENGINE=InnoDB;
    `);
    console.log("✓ Table created: offer_rewards");

    // 6. Create offer_quantity_slabs table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS offer_quantity_slabs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        offer_id INT NOT NULL,
        customer_type ENUM('retail', 'wholesale', 'all') NOT NULL DEFAULT 'all',
        minimum_quantity INT NOT NULL,
        maximum_quantity INT NULL,
        pricing_type ENUM('special_unit_price', 'percentage_discount', 'fixed_discount') NOT NULL DEFAULT 'special_unit_price',
        pricing_value DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (offer_id) REFERENCES offers(id) ON DELETE CASCADE,
        INDEX idx_oqs_offer (offer_id)
      ) ENGINE=InnoDB;
    `);
    console.log("✓ Table created: offer_quantity_slabs");

    // 7. Create offer_recommendations table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS offer_recommendations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        offer_id INT NOT NULL,
        trigger_product_id INT NOT NULL,
        trigger_variant_id INT NULL,
        recommended_product_id INT NOT NULL,
        recommended_variant_id INT NULL,
        minimum_trigger_quantity INT NOT NULL DEFAULT 1,
        discount_type ENUM('percentage', 'fixed_amount', 'special_price') NOT NULL DEFAULT 'percentage',
        discount_value DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        display_order INT NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (offer_id) REFERENCES offers(id) ON DELETE CASCADE,
        FOREIGN KEY (trigger_product_id) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY (trigger_variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
        FOREIGN KEY (recommended_product_id) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY (recommended_variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
        INDEX idx_orec_offer (offer_id),
        INDEX idx_orec_trigger (trigger_product_id, trigger_variant_id)
      ) ENGINE=InnoDB;
    `);
    console.log("✓ Table created: offer_recommendations");

    // 8. Create offer_customer_types table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS offer_customer_types (
        id INT AUTO_INCREMENT PRIMARY KEY,
        offer_id INT NOT NULL,
        customer_type ENUM('retail', 'wholesale') NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (offer_id) REFERENCES offers(id) ON DELETE CASCADE,
        UNIQUE KEY uniq_offer_cust_type (offer_id, customer_type)
      ) ENGINE=InnoDB;
    `);
    console.log("✓ Table created: offer_customer_types");

    // 9. Create applied_offer_records table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS applied_offer_records (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        offer_id INT NULL,
        offer_code VARCHAR(100) NOT NULL,
        offer_type VARCHAR(50) NOT NULL,
        discount_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        metadata_snapshot JSON DEFAULT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (offer_id) REFERENCES offers(id) ON DELETE SET NULL,
        INDEX idx_aor_order (order_id),
        INDEX idx_aor_offer (offer_id)
      ) ENGINE=InnoDB;
    `);
    console.log("✓ Table created: applied_offer_records");

    console.log("All migrations executed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
    throw err;
  } finally {
    await conn.end();
  }
}

migrate();
