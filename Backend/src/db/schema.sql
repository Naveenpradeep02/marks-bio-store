CREATE DATABASE IF NOT EXISTS marksbiotech CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE marksbiotech;

-- Users are created in Firebase Authentication; this table mirrors them by
-- firebase_uid and is the single source of truth for role and profile data.
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firebase_uid VARCHAR(128) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) DEFAULT '',
  phone VARCHAR(30) DEFAULT '',
  role ENUM('admin', 'customer') NOT NULL DEFAULT 'customer',
  customer_type ENUM('retail', 'wholesale') NOT NULL DEFAULT 'retail',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  label VARCHAR(50) DEFAULT 'Home',
  line1 VARCHAR(255) NOT NULL,
  line2 VARCHAR(255) DEFAULT '',
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  pincode VARCHAR(20) NOT NULL,
  phone VARCHAR(30) DEFAULT '',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS brands (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  logo_url VARCHAR(500) DEFAULT '',
  description TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- parent_id NULL = main category; parent_id set = sub-category of that main
-- category. Hierarchy is kept to 2 levels by the controller, not the DB.
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  parent_id INT NULL,
  description TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_categories_name_parent (name, parent_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand_id INT NULL,
  category_id INT NULL,
  slug VARCHAR(255) DEFAULT NULL,
  sku VARCHAR(100) DEFAULT '',
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  -- HTML from the Admin rich text editor (paragraphs, lists, tables)
  description TEXT,
  specifications JSON,
  stock INT NOT NULL DEFAULT 0,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  UNIQUE KEY uniq_products_slug (slug)
) ENGINE=InnoDB;

-- A product with no rows here is a single-variant product (use the
-- product's own price/sku/stock). 1+ rows means the customer picks a
-- variant (e.g. vial size) and that row's price/sku/stock apply instead.
CREATE TABLE IF NOT EXISTS product_variants (
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
) ENGINE=InnoDB;

-- Locally-uploaded product images (see Backend/uploads/products). image_path
-- is the public URL path, e.g. /uploads/products/169876-abc.jpg
CREATE TABLE IF NOT EXISTS product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  image_path VARCHAR(500) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS inventory_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  -- NULL means the adjustment applies to the product's own stock (no
  -- variants). Set when adjusting a specific variant's stock instead.
  variant_id INT NULL,
  type ENUM('in', 'out', 'adjustment') NOT NULL,
  quantity INT NOT NULL,
  delta INT NOT NULL,
  reason VARCHAR(255) DEFAULT '',
  adjusted_by INT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
  FOREIGN KEY (adjusted_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(30) NOT NULL UNIQUE,
  user_id INT NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
  shipping_line1 VARCHAR(255),
  shipping_line2 VARCHAR(255),
  shipping_city VARCHAR(100),
  shipping_state VARCHAR(100),
  shipping_pincode VARCHAR(20),
  shipping_phone VARCHAR(30),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  variant_id INT NULL,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100) DEFAULT '',
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  line_total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS invoices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_number VARCHAR(30) NOT NULL UNIQUE,
  order_id INT NOT NULL UNIQUE,
  user_id INT NOT NULL,
  customer_name VARCHAR(255) DEFAULT '',
  customer_email VARCHAR(255) NOT NULL,
  billing_line1 VARCHAR(255),
  billing_line2 VARCHAR(255),
  billing_city VARCHAR(100),
  billing_state VARCHAR(100),
  billing_pincode VARCHAR(20),
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('unpaid', 'paid', 'cancelled') NOT NULL DEFAULT 'unpaid',
  issued_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- Sequential per-year invoice numbering (INV-2026-00001). Row is locked with
-- SELECT ... FOR UPDATE inside a transaction to hand out unique numbers.
CREATE TABLE IF NOT EXISTS invoice_counters (
  year INT PRIMARY KEY,
  value INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

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

CREATE TABLE IF NOT EXISTS store_settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value VARCHAR(255) NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO store_settings (setting_key, setting_value)
VALUES ('stock_management', '0')
ON DUPLICATE KEY UPDATE setting_value = setting_value;

-- =========================================================================
-- ADVANCED OFFER MANAGEMENT ENGINE TABLES
-- =========================================================================

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

CREATE TABLE IF NOT EXISTS offer_customer_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  offer_id INT NOT NULL,
  customer_type ENUM('retail', 'wholesale') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (offer_id) REFERENCES offers(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_offer_cust_type (offer_id, customer_type)
) ENGINE=InnoDB;

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

