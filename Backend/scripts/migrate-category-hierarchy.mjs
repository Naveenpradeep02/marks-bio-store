// One-off migration for local databases created before the main/sub-category
// hierarchy and product_variants table existed. Safe to re-run.
//
// - Adds categories.parent_id (self-referencing, NULL = main category).
// - Adds products.category_id (FK to categories) and backfills it: each
//   distinct existing products.category string becomes a main category
//   (parent_id NULL) if one doesn't already exist with that name, and
//   matching products are pointed at it. Existing products.category/
//   type_name text columns are left in place (unused, safe to drop later
//   once you've confirmed everything reads from category_id).
// - Creates the product_variants table.
import "dotenv/config";
import { pool } from "../src/config/db.js";

async function columnExists(table, column) {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS count FROM information_schema.columns
     WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?`,
    [table, column]
  );
  return rows[0].count > 0;
}

async function tableExists(table) {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS count FROM information_schema.tables
     WHERE table_schema = DATABASE() AND table_name = ?`,
    [table]
  );
  return rows[0].count > 0;
}

async function indexExists(table, indexName) {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS count FROM information_schema.statistics
     WHERE table_schema = DATABASE() AND table_name = ? AND index_name = ?`,
    [table, indexName]
  );
  return rows[0].count > 0;
}

async function main() {
  if (!(await columnExists("categories", "parent_id"))) {
    await pool.query(
      "ALTER TABLE categories ADD COLUMN parent_id INT NULL AFTER name, ADD FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE CASCADE"
    );
    console.log("Added categories.parent_id");

    // The original schema had `name` as a single-column UNIQUE key, which
    // would block a sub-category from sharing a name with a main category.
    // Replace it with a (name, parent_id) composite unique key.
    if (await indexExists("categories", "name")) {
      await pool.query("ALTER TABLE categories DROP INDEX name");
      console.log("Dropped old single-column unique index on categories.name");
    }
    if (!(await indexExists("categories", "uniq_categories_name_parent"))) {
      await pool.query(
        "ALTER TABLE categories ADD UNIQUE KEY uniq_categories_name_parent (name, parent_id)"
      );
      console.log("Added uniq_categories_name_parent index");
    }
  } else {
    console.log("categories.parent_id already exists");
  }

  if (!(await columnExists("products", "category_id"))) {
    await pool.query(
      "ALTER TABLE products ADD COLUMN category_id INT NULL AFTER brand_id, ADD FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL"
    );
    console.log("Added products.category_id");

    if (await columnExists("products", "category")) {
      const [distinctCategories] = await pool.query(
        "SELECT DISTINCT category FROM products WHERE category IS NOT NULL AND category != ''"
      );
      for (const { category } of distinctCategories) {
        let [existing] = await pool.execute(
          "SELECT id FROM categories WHERE name = ? AND parent_id IS NULL",
          [category]
        );
        let categoryId;
        if (existing.length > 0) {
          categoryId = existing[0].id;
        } else {
          const [result] = await pool.execute(
            "INSERT INTO categories (name, parent_id) VALUES (?, NULL)",
            [category]
          );
          categoryId = result.insertId;
          console.log(`Created main category "${category}" (id ${categoryId})`);
        }
        await pool.execute(
          "UPDATE products SET category_id = ? WHERE category = ?",
          [categoryId, category]
        );
      }
      console.log("Backfilled products.category_id from products.category");
    }
  } else {
    console.log("products.category_id already exists");
  }

  if (!(await tableExists("product_variants"))) {
    await pool.query(`
      CREATE TABLE product_variants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        attribute_name VARCHAR(100) NOT NULL DEFAULT 'Size',
        value VARCHAR(150) NOT NULL,
        sku VARCHAR(100) DEFAULT '',
        price DECIMAL(10, 2) NOT NULL DEFAULT 0,
        stock INT NOT NULL DEFAULT 0,
        sort_order INT NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);
    console.log("Created product_variants table");
  } else {
    console.log("product_variants table already exists");
  }

  if (!(await columnExists("order_items", "variant_id"))) {
    await pool.query(
      "ALTER TABLE order_items ADD COLUMN variant_id INT NULL AFTER product_id, ADD FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE SET NULL"
    );
    console.log("Added order_items.variant_id");
  } else {
    console.log("order_items.variant_id already exists");
  }

  console.log("Migration complete.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
