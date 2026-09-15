// One-off migration for existing local databases created before slug/type_name
// were added to the products table. Safe to re-run (checks information_schema
// before adding each column/index).
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

async function indexExists(table, indexName) {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS count FROM information_schema.statistics
     WHERE table_schema = DATABASE() AND table_name = ? AND index_name = ?`,
    [table, indexName]
  );
  return rows[0].count > 0;
}

async function main() {
  if (!(await columnExists("products", "type_name"))) {
    await pool.query("ALTER TABLE products ADD COLUMN type_name VARCHAR(150) DEFAULT '' AFTER category");
    console.log("Added products.type_name");
  } else {
    console.log("products.type_name already exists");
  }

  if (!(await columnExists("products", "slug"))) {
    await pool.query("ALTER TABLE products ADD COLUMN slug VARCHAR(255) DEFAULT NULL AFTER type_name");
    console.log("Added products.slug");
  } else {
    console.log("products.slug already exists");
  }

  if (!(await indexExists("products", "uniq_products_slug"))) {
    await pool.query("ALTER TABLE products ADD UNIQUE KEY uniq_products_slug (slug)");
    console.log("Added unique index uniq_products_slug");
  } else {
    console.log("uniq_products_slug already exists");
  }

  console.log("Migration complete.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
