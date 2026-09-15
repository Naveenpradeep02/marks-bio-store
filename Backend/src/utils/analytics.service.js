import { pool } from "../config/db.js";

/**
 * Strips potentially sensitive keys (tokens, passwords, card numbers) from event metadata
 */
export function sanitizeMetadata(metadata) {
  if (!metadata || typeof metadata !== "object") return null;
  const sanitized = { ...metadata };
  const sensitiveKeys = [
    "password",
    "token",
    "auth",
    "secret",
    "card",
    "cardNumber",
    "cvv",
    "expiry",
    "cvc",
    "creditCard",
    "refreshToken",
    "accessToken",
  ];

  for (const key of Object.keys(sanitized)) {
    const lowerKey = key.toLowerCase();
    if (sensitiveKeys.some((s) => lowerKey.includes(s.toLowerCase()))) {
      delete sanitized[key];
    }
  }
  return sanitized;
}

/**
 * Upserts a customer session and handles anonymous-to-user linking
 */
export async function touchSession({
  sessionId,
  anonymousSessionId,
  customerId = null,
  landingPage = "",
  exitPage = "",
  referrer = "",
  utmSource = null,
  utmMedium = null,
  utmCampaign = null,
  utmTerm = null,
  utmContent = null,
  deviceType = "desktop",
  browser = "",
  operatingSystem = "",
  country = "",
  durationSeconds = 0,
}) {
  if (!sessionId) return null;

  // Insert or update session
  await pool.execute(
    `INSERT INTO customer_sessions (
      session_id, anonymous_session_id, customer_id,
      landing_page, exit_page, referrer,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      device_type, browser, operating_system, country,
      started_at, ended_at, duration_seconds
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)
    ON DUPLICATE KEY UPDATE
      customer_id = COALESCE(VALUES(customer_id), customer_id),
      exit_page = IF(VALUES(exit_page) != '', VALUES(exit_page), exit_page),
      ended_at = NOW(),
      duration_seconds = GREATEST(duration_seconds, VALUES(duration_seconds)),
      device_type = IF(VALUES(device_type) != '', VALUES(device_type), device_type),
      browser = IF(VALUES(browser) != '', VALUES(browser), browser),
      operating_system = IF(VALUES(operating_system) != '', VALUES(operating_system), operating_system),
      updated_at = NOW()`,
    [
      sessionId,
      anonymousSessionId || sessionId,
      customerId,
      landingPage || "",
      exitPage || landingPage || "",
      referrer || "",
      utmSource || null,
      utmMedium || null,
      utmCampaign || null,
      utmTerm || null,
      utmContent || null,
      deviceType || "desktop",
      browser || "",
      operatingSystem || "",
      country || "",
      Math.max(0, parseInt(durationSeconds, 10) || 0),
    ],
  );

  // If customer is authenticated, stitch past anonymous sessions and events
  if (customerId && anonymousSessionId) {
    await linkAnonymousToCustomer(anonymousSessionId, customerId);
  }
}

/**
 * Links past anonymous events and sessions to an authenticated customer ID
 */
export async function linkAnonymousToCustomer(anonymousSessionId, customerId) {
  if (!anonymousSessionId || !customerId) return;

  await pool.execute(
    `UPDATE customer_sessions 
     SET customer_id = ? 
     WHERE anonymous_session_id = ? AND customer_id IS NULL`,
    [customerId, anonymousSessionId],
  );

  await pool.execute(
    `UPDATE analytics_events 
     SET customer_id = ? 
     WHERE anonymous_session_id = ? AND customer_id IS NULL`,
    [customerId, anonymousSessionId],
  );
}

/**
 * Ingests a single or array of tracking events
 */
export async function ingestEvents(events, authUser = null) {
  const eventList = Array.isArray(events) ? events : [events];
  if (eventList.length === 0) return { count: 0 };

  for (const ev of eventList) {
    const sessionId = ev.sessionId || ev.session_id;
    const anonymousSessionId =
      ev.anonymousSessionId || ev.anonymous_session_id || sessionId;
    const customerId = authUser?.id || ev.customerId || ev.customer_id || null;
    const eventType = ev.eventType || ev.event_type || "page_view";
    const productId = ev.productId || ev.product_id || null;
    const variantId = ev.variantId || ev.variant_id || null;
    const categoryId = ev.categoryId || ev.category_id || null;
    const orderId = ev.orderId || ev.order_id || null;
    const pageUrl = ev.pageUrl || ev.page_url || "";
    const referrer = ev.referrer || "";
    const searchQuery = ev.searchQuery || ev.search_query || null;
    const rawMetadata =
      ev.eventMetadata || ev.event_metadata || ev.metadata || null;
    const metadata = sanitizeMetadata(rawMetadata);
    const deviceType = ev.deviceType || ev.device_type || "desktop";
    const browser = ev.browser || "";
    const operatingSystem = ev.operatingSystem || ev.operating_system || "";
    const country = ev.country || "";
    const durationSeconds = ev.durationSeconds || ev.duration_seconds || 0;

    if (sessionId) {
      await touchSession({
        sessionId,
        anonymousSessionId,
        customerId,
        landingPage: ev.landingPage || pageUrl,
        exitPage: pageUrl,
        referrer,
        utmSource: ev.utmSource || ev.utm_source,
        utmMedium: ev.utmMedium || ev.utm_medium,
        utmCampaign: ev.utmCampaign || ev.utm_campaign,
        utmTerm: ev.utmTerm || ev.utm_term,
        utmContent: ev.utmContent || ev.utm_content,
        deviceType,
        browser,
        operatingSystem,
        country,
        durationSeconds,
      });
    }

    // Verify foreign keys if provided to ensure DB integrity
    let validProductId = null;
    let validVariantId = null;
    let validCategoryId = null;
    let validOrderId = null;
    let validCustomerId = null;

    if (customerId) {
      const [u] = await pool.execute("SELECT id FROM users WHERE id = ?", [
        customerId,
      ]);
      if (u.length > 0) validCustomerId = customerId;
    }
    if (productId) {
      const [p] = await pool.execute("SELECT id FROM products WHERE id = ?", [
        productId,
      ]);
      if (p.length > 0) validProductId = productId;
    }
    if (variantId) {
      const [v] = await pool.execute(
        "SELECT id FROM product_variants WHERE id = ?",
        [variantId],
      );
      if (v.length > 0) validVariantId = variantId;
    }
    if (categoryId) {
      const [c] = await pool.execute("SELECT id FROM categories WHERE id = ?", [
        categoryId,
      ]);
      if (c.length > 0) validCategoryId = categoryId;
    }
    if (orderId) {
      const [o] = await pool.execute("SELECT id FROM orders WHERE id = ?", [
        orderId,
      ]);
      if (o.length > 0) validOrderId = orderId;
    }

    await pool.execute(
      `INSERT INTO analytics_events (
        session_id, anonymous_session_id, customer_id, event_type,
        product_id, variant_id, category_id, order_id,
        page_url, referrer, search_query, event_metadata,
        device_type, browser, operating_system, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        sessionId || "unknown_session",
        anonymousSessionId || "unknown_anon",
        validCustomerId,
        eventType,
        validProductId,
        validVariantId,
        validCategoryId,
        validOrderId,
        pageUrl,
        referrer,
        searchQuery,
        metadata ? JSON.stringify(metadata) : null,
        deviceType,
        browser,
        operatingSystem,
      ],
    );
  }

  return { count: eventList.length };
}

/**
 * Aggregates daily product metrics into product_daily_analytics for a given date (YYYY-MM-DD)
 */
export async function aggregateDailyProductAnalytics(dateStr = null) {
  // If no date provided, default to current UTC date or yesterday
  const targetDate = dateStr || new Date().toISOString().slice(0, 10);

  // 1. Fetch distinct products that had events or orders on targetDate
  const [activeProducts] = await pool.query(
    `SELECT DISTINCT id FROM products WHERE status = 'active'
     UNION
     SELECT DISTINCT product_id AS id FROM analytics_events WHERE DATE(created_at) = ? AND product_id IS NOT NULL
     UNION
     SELECT DISTINCT oi.product_id AS id FROM order_items oi 
     JOIN orders o ON o.id = oi.order_id 
     WHERE DATE(o.created_at) = ?`,
    [targetDate, targetDate],
  );

  for (const prod of activeProducts) {
    const productId = prod.id;
    if (!productId) continue;

    // A. Event metrics for this product
    const [eventAgg] = await pool.execute(
      `SELECT 
        COUNT(CASE WHEN event_type = 'product_view' THEN 1 END) AS product_views,
        COUNT(DISTINCT CASE WHEN event_type = 'product_view' THEN COALESCE(customer_id, anonymous_session_id) END) AS unique_viewers,
        COUNT(CASE WHEN event_type = 'add_to_cart' THEN 1 END) AS add_to_cart_count,
        COUNT(CASE WHEN event_type = 'wishlist_add' THEN 1 END) AS wishlist_count,
        COUNT(CASE WHEN event_type = 'search_appearance' THEN 1 END) AS search_appearances,
        COUNT(CASE WHEN event_type = 'search_click' THEN 1 END) AS search_clicks,
        COALESCE(SUM(CASE WHEN event_type = 'dwell_time' THEN CAST(JSON_UNQUOTE(JSON_EXTRACT(event_metadata, '$.seconds')) AS UNSIGNED) ELSE 0 END), 0) AS total_dwell_seconds
       FROM analytics_events
       WHERE product_id = ? AND DATE(created_at) = ?`,
      [productId, targetDate],
    );

    // B. Order and purchase metrics for this product
    const [orderAgg] = await pool.execute(
      `SELECT 
        COUNT(DISTINCT o.id) AS purchase_count,
        COALESCE(SUM(oi.quantity), 0) AS units_sold,
        COALESCE(SUM(oi.line_total), 0) AS revenue,
        COALESCE(SUM(CASE WHEN o.status = 'cancelled' THEN oi.quantity ELSE 0 END), 0) AS cancelled_units
       FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
       WHERE oi.product_id = ? AND DATE(o.created_at) = ? AND o.status != 'cancelled'`,
      [productId, targetDate],
    );

    const ev = eventAgg[0] || {};
    const ord = orderAgg[0] || {};

    await pool.execute(
      `INSERT INTO product_daily_analytics (
        date, product_id, product_views, unique_viewers,
        add_to_cart_count, wishlist_count, purchase_count,
        units_sold, revenue, cancelled_units, returned_units,
        search_appearances, search_clicks, total_dwell_seconds
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        product_views = VALUES(product_views),
        unique_viewers = VALUES(unique_viewers),
        add_to_cart_count = VALUES(add_to_cart_count),
        wishlist_count = VALUES(wishlist_count),
        purchase_count = VALUES(purchase_count),
        units_sold = VALUES(units_sold),
        revenue = VALUES(revenue),
        cancelled_units = VALUES(cancelled_units),
        search_appearances = VALUES(search_appearances),
        search_clicks = VALUES(search_clicks),
        total_dwell_seconds = VALUES(total_dwell_seconds),
        updated_at = NOW()`,
      [
        targetDate,
        productId,
        ev.product_views || 0,
        ev.unique_viewers || 0,
        ev.add_to_cart_count || 0,
        ev.wishlist_count || 0,
        ord.purchase_count || 0,
        ord.units_sold || 0,
        ord.revenue || 0,
        ord.cancelled_units || 0,
        ev.search_appearances || 0,
        ev.search_clicks || 0,
        ev.total_dwell_seconds || 0,
      ],
    );
  }

  return { targetDate, productsAggregated: activeProducts.length };
}

/**
 * Data retention policy: purges raw granular behavioral events older than retentionDays
 */
export async function purgeExpiredEvents(retentionDays = 90) {
  const days = Math.max(30, parseInt(retentionDays, 10) || 90);
  const [result] = await pool.execute(
    `DELETE FROM analytics_events 
     WHERE created_at < DATE_SUB(NOW(), INTERVAL ? DAY)`,
    [days],
  );
  return { deletedEvents: result.affectedRows, retentionDays: days };
}

/**
 * Calculates RFM Segment label based on R, F, M quintiles/scores (1 to 5)
 */
export function getRFMSegment(rScore, fScore, mScore) {
  const avgFM = (fScore + mScore) / 2;

  if (rScore >= 4 && avgFM >= 4) return "Champions";
  if (rScore >= 3 && avgFM >= 3) return "Loyal Customers";
  if (rScore >= 4 && avgFM <= 2) return "Promising / Recent";
  if (rScore === 3 && avgFM <= 2) return "Potential Loyalist";
  if (rScore <= 2 && avgFM >= 4) return "Can't Lose Them";
  if (rScore <= 2 && avgFM >= 2.5) return "At Risk";
  if (rScore <= 2 && avgFM < 2) return "Hibernating / Lost";
  return "Needs Attention";
}
