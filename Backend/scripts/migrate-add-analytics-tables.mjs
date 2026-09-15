import "dotenv/config";
import { pool } from "../src/config/db.js";

async function main() {
  console.log("Starting analytics tables migration...");

  // 1. customer_sessions table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS customer_sessions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      session_id VARCHAR(64) NOT NULL UNIQUE,
      anonymous_session_id VARCHAR(64) NOT NULL,
      customer_id INT NULL,
      landing_page VARCHAR(500) DEFAULT '',
      exit_page VARCHAR(500) DEFAULT '',
      referrer VARCHAR(500) DEFAULT '',
      utm_source VARCHAR(100) DEFAULT NULL,
      utm_medium VARCHAR(100) DEFAULT NULL,
      utm_campaign VARCHAR(100) DEFAULT NULL,
      utm_term VARCHAR(100) DEFAULT NULL,
      utm_content VARCHAR(100) DEFAULT NULL,
      device_type VARCHAR(50) DEFAULT 'desktop',
      browser VARCHAR(100) DEFAULT '',
      operating_system VARCHAR(100) DEFAULT '',
      country VARCHAR(100) DEFAULT '',
      started_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      ended_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      duration_seconds INT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_sessions_customer (customer_id),
      INDEX idx_sessions_anon (anonymous_session_id),
      INDEX idx_sessions_started (started_at),
      INDEX idx_sessions_utm (utm_source, utm_campaign)
    ) ENGINE=InnoDB;
  `);
  console.log("Created/verified table: customer_sessions");

  // 2. analytics_events table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS analytics_events (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      session_id VARCHAR(64) NOT NULL,
      anonymous_session_id VARCHAR(64) NOT NULL,
      customer_id INT NULL,
      event_type VARCHAR(64) NOT NULL,
      product_id INT NULL,
      variant_id INT NULL,
      category_id INT NULL,
      order_id INT NULL,
      page_url VARCHAR(500) DEFAULT '',
      referrer VARCHAR(500) DEFAULT '',
      search_query VARCHAR(255) DEFAULT NULL,
      event_metadata JSON NULL,
      device_type VARCHAR(50) DEFAULT 'desktop',
      browser VARCHAR(100) DEFAULT '',
      operating_system VARCHAR(100) DEFAULT '',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE SET NULL,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
      FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE SET NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
      INDEX idx_events_type_created (event_type, created_at),
      INDEX idx_events_product_created (product_id, created_at),
      INDEX idx_events_customer (customer_id),
      INDEX idx_events_session (session_id),
      INDEX idx_events_search (search_query, created_at)
    ) ENGINE=InnoDB;
  `);
  console.log("Created/verified table: analytics_events");

  // 3. product_daily_analytics table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS product_daily_analytics (
      id INT AUTO_INCREMENT PRIMARY KEY,
      date DATE NOT NULL,
      product_id INT NOT NULL,
      product_views INT NOT NULL DEFAULT 0,
      unique_viewers INT NOT NULL DEFAULT 0,
      add_to_cart_count INT NOT NULL DEFAULT 0,
      wishlist_count INT NOT NULL DEFAULT 0,
      purchase_count INT NOT NULL DEFAULT 0,
      units_sold INT NOT NULL DEFAULT 0,
      revenue DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
      cancelled_units INT NOT NULL DEFAULT 0,
      returned_units INT NOT NULL DEFAULT 0,
      search_appearances INT NOT NULL DEFAULT 0,
      search_clicks INT NOT NULL DEFAULT 0,
      total_dwell_seconds INT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      UNIQUE KEY uniq_prod_daily_date (date, product_id),
      INDEX idx_prod_daily_date (date)
    ) ENGINE=InnoDB;
  `);
  console.log("Created/verified table: product_daily_analytics");

  console.log("Analytics migration finished successfully.");
  await pool.end();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
