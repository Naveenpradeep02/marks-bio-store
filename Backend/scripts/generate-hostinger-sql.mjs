import fs from "fs";
import path from "path";
import { pool } from "../src/config/db.js";

const dependencyOrder = [
  "users",
  "brands",
  "categories",
  "store_settings",
  "seo_global_settings",
  "page_seo",
  "popups",
  "blogs",
  "events",
  "invoice_counters",
  "offers",
  "addresses",
  "products",
  "product_variants",
  "product_images",
  "product_daily_analytics",
  "inventory_logs",
  "customer_sessions",
  "orders",
  "order_items",
  "invoices",
  "analytics_events",
  "offer_customer_types",
  "offer_conditions",
  "offer_rewards",
  "offer_products",
  "offer_quantity_slabs",
  "offer_recommendations",
  "applied_offer_records",
];

function escapeValue(val) {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "number") return String(val);
  if (typeof val === "boolean") return val ? "1" : "0";
  if (typeof val === "object") {
    // If it's a Date or JSON
    if (val instanceof Date) {
      return `'${val.toISOString().slice(0, 19).replace("T", " ")}'`;
    }
    const jsonStr = JSON.stringify(val);
    return `'${jsonStr.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
  }
  // String
  const s = String(val)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n");
  return `'${s}'`;
}

async function generateHostingerSql() {
  console.log("Generating Hostinger phpMyAdmin optimized SQL dump...");
  const conn = await pool.getConnection();

  try {
    const lines = [];

    // Header
    lines.push("-- ========================================================================");
    lines.push("-- MARKS BIOTECH - PRODUCTION LIVE DATABASE EXPORT");
    lines.push("-- Tailored for Hostinger phpMyAdmin (u623630575_marksbiotechdb)");
    lines.push("-- Tables ordered in strict dependency order (Parent tables first, Children after)");
    lines.push("-- Eliminates errno 150 (Foreign key constraint is incorrectly formed)");
    lines.push("-- ========================================================================");
    lines.push("");
    lines.push("SET FOREIGN_KEY_CHECKS = 0;");
    lines.push("SET SQL_MODE = \"NO_AUTO_VALUE_ON_ZERO\";");
    lines.push("SET time_zone = \"+00:00\";");
    lines.push("START TRANSACTION;");
    lines.push("");
    lines.push("/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;");
    lines.push("/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;");
    lines.push("/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;");
    lines.push("/*!40101 SET NAMES utf8mb4 */;");
    lines.push("");

    for (const tableName of dependencyOrder) {
      lines.push("-- ------------------------------------------------------------------------");
      lines.push(`-- Table structure & data for table: \`${tableName}\``);
      lines.push("-- ------------------------------------------------------------------------");
      lines.push(`DROP TABLE IF EXISTS \`${tableName}\`;`);

      const [createRes] = await conn.query(`SHOW CREATE TABLE \`${tableName}\``);
      let createSql = createRes[0]["Create Table"];
      createSql = createSql.replace(/CREATE TABLE/, "CREATE TABLE IF NOT EXISTS");
      lines.push(`${createSql};`);
      lines.push("");

      const [rows] = await conn.query(`SELECT * FROM \`${tableName}\``);
      if (rows.length > 0) {
        lines.push(`-- Dumping ${rows.length} rows for \`${tableName}\``);
        const colNames = Object.keys(rows[0]).map((c) => `\`${c}\``).join(", ");
        
        // Chunk inserts to prevent massive single-line buffer overflow in phpMyAdmin
        const chunkSize = 25;
        for (let i = 0; i < rows.length; i += chunkSize) {
          const chunk = rows.slice(i, i + chunkSize);
          const valueRows = chunk.map((r) => {
            const vals = Object.values(r).map(escapeValue).join(", ");
            return `(${vals})`;
          });
          lines.push(`INSERT INTO \`${tableName}\` (${colNames}) VALUES`);
          lines.push(valueRows.join(",\n") + ";");
        }
        lines.push("");
      }
    }

    lines.push("-- ========================================================================");
    lines.push("-- FINAL COMMIT & RESTORE CONSTRAINTS");
    lines.push("-- ========================================================================");
    lines.push("SET FOREIGN_KEY_CHECKS = 1;");
    lines.push("COMMIT;");
    lines.push("");
    lines.push("/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;");
    lines.push("/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;");
    lines.push("/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;");

    const fullSql = lines.join("\n");

    const outPath1 = path.resolve("marksbiotech_live_fresh.sql");
    const outPath2 = path.resolve("Backend/marksbiotech_live_fresh.sql");

    fs.writeFileSync(outPath1, fullSql, "utf8");
    fs.writeFileSync(outPath2, fullSql, "utf8");

    console.log(`✓ Wrote ${fullSql.length} bytes to ${outPath1}`);
    console.log(`✓ Wrote ${fullSql.length} bytes to ${outPath2}`);
    console.log("=== DONE SUCCESSFULLY ===");
  } catch (err) {
    console.error("Failed:", err);
    throw err;
  } finally {
    conn.release();
    process.exit(0);
  }
}

generateHostingerSql();
