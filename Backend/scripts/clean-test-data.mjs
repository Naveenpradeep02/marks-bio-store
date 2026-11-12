import { pool } from "../src/config/db.js";

async function cleanTestData() {
  console.log("=== CLEANING TEST DATA FOR FRESH PRODUCTION LAUNCH ===");
  const conn = await pool.getConnection();

  try {
    await conn.query("SET FOREIGN_KEY_CHECKS = 0");

    // 1. Transactional and test data tables to truncate
    const tablesToClean = [
      "order_items",
      "invoices",
      "orders",
      "invoice_counters",
      "customer_sessions",
      "analytics_events",
      "product_daily_analytics",
      "inventory_logs",
      "applied_offer_records",
      "addresses",
    ];

    for (const t of tablesToClean) {
      await conn.query(`TRUNCATE TABLE \`${t}\``);
      console.log(`✓ Truncated table: ${t}`);
    }

    // 2. Clean users: keep only admin accounts
    const [delUsers] = await conn.query("DELETE FROM users WHERE role != 'admin'");
    console.log(`✓ Removed non-admin users: ${delUsers.affectedRows}`);

    // Verify remaining users
    const [admins] = await conn.query("SELECT id, name, email, role FROM users");
    console.log("✓ Remaining Admin Accounts for Live:", admins);

    // 3. Reset invoice counter to fresh sequence
    const currentYear = new Date().getFullYear();
    await conn.query(
      "INSERT INTO invoice_counters (year, value) VALUES (?, 0) ON DUPLICATE KEY UPDATE value = 0",
      [currentYear]
    );
    console.log(`✓ Initialized fresh invoice counter for year ${currentYear}`);

    await conn.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("=== TEST DATA CLEANED SUCCESSFULLY ===");
  } catch (err) {
    console.error("Failed to clean test data:", err);
    throw err;
  } finally {
    conn.release();
    process.exit(0);
  }
}

cleanTestData();
