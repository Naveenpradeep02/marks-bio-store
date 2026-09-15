import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { toCamelCase, toCamelCaseAll } from "../utils/camelCase.js";
import { getRFMSegment } from "../utils/analytics.service.js";

/**
 * Admin: Upgraded Customer 360 List with 11 behavioral filters & metrics
 * GET /api/customers?filter=all&search=
 */
export const listCustomers = asyncHandler(async (req, res) => {
  const { filter = "all", search = "" } = req.query;

  // Retrieve customers with aggregated metrics from orders and analytics events
  const [customerRows] = await pool.query(
    `SELECT 
      u.id, u.name, u.email, u.phone, u.created_at,
      COUNT(DISTINCT CASE WHEN o.status != 'cancelled' THEN o.id END) AS total_orders,
      COALESCE(SUM(CASE WHEN o.status != 'cancelled' THEN o.total ELSE 0 END), 0) AS total_spend,
      COALESCE(AVG(CASE WHEN o.status != 'cancelled' THEN o.total END), 0) AS average_order_value,
      MAX(CASE WHEN o.status != 'cancelled' THEN o.created_at END) AS last_purchase_date,
      MAX(COALESCE(s.ended_at, ev.created_at, u.created_at)) AS last_active_date,
      DATEDIFF(NOW(), COALESCE(MAX(CASE WHEN o.status != 'cancelled' THEN o.created_at END), u.created_at)) AS recency_days,
      COUNT(DISTINCT s.session_id) AS total_sessions,
      COUNT(DISTINCT CASE WHEN ev.event_type = 'product_view' THEN ev.id END) AS product_views_count,
      COUNT(DISTINCT CASE WHEN ev.event_type = 'wishlist_add' THEN ev.product_id END) AS saved_products_count,
      COUNT(DISTINCT CASE WHEN ev.event_type = 'add_to_cart' THEN ev.id END) AS cart_adds_count,
      COUNT(DISTINCT CASE WHEN o.status = 'cancelled' THEN o.id END) AS cancelled_orders_count
     FROM users u
     LEFT JOIN orders o ON u.id = o.user_id
     LEFT JOIN customer_sessions s ON u.id = s.customer_id
     LEFT JOIN analytics_events ev ON u.id = ev.customer_id
     WHERE u.role = 'customer'
     GROUP BY u.id, u.name, u.email, u.phone, u.created_at
     ORDER BY u.created_at DESC`,
  );

  const totalCount = customerRows.length;
  if (totalCount === 0) {
    return res.json([]);
  }

  // Calculate RFM scoring for segment labeling
  const sortedByRecency = [...customerRows].sort(
    (a, b) => a.recency_days - b.recency_days,
  );
  const sortedByFreq = [...customerRows].sort(
    (a, b) => b.total_orders - a.total_orders,
  );
  const sortedByMonetary = [...customerRows].sort(
    (a, b) => b.total_spend - a.total_spend,
  );

  const enriched = customerRows.map((c) => {
    const rRank = sortedByRecency.findIndex((x) => x.id === c.id);
    const fRank = sortedByFreq.findIndex((x) => x.id === c.id);
    const mRank = sortedByMonetary.findIndex((x) => x.id === c.id);

    const rScore = 5 - Math.floor((rRank / totalCount) * 5);
    const fScore = 5 - Math.floor((fRank / totalCount) * 5);
    const mScore = 5 - Math.floor((mRank / totalCount) * 5);

    const rfmSegment = getRFMSegment(rScore, fScore, mScore);

    const totalOrders = Number(c.total_orders);
    const totalSpend = Number(c.total_spend);
    const aov = Number(c.average_order_value);
    const savedCount = Number(c.saved_products_count);
    const viewsCount = Number(c.product_views_count);
    const cartCount = Number(c.cart_adds_count);
    const cancelCount = Number(c.cancelled_orders_count);
    const daysSinceReg = Math.round(
      (Date.now() - new Date(c.created_at).getTime()) / 86400000,
    );
    const daysSinceActive = c.last_active_date
      ? Math.round(
          (Date.now() - new Date(c.last_active_date).getTime()) / 86400000,
        )
      : daysSinceReg;

    // Behavioral status classification
    let segmentLabel = rfmSegment;
    if (totalOrders === 0 && viewsCount > 5)
      segmentLabel = "High Engagement / No Purchase";
    else if (totalOrders === 0) segmentLabel = "Never Purchased";
    else if (totalOrders >= 2) segmentLabel = "Repeat Buyer";

    return {
      ...toCamelCase(c),
      totalOrders,
      totalSpend,
      averageOrderValue: aov,
      savedProductsCount: savedCount,
      productViewsCount: viewsCount,
      cartAddsCount: cartCount,
      cancelledOrdersCount: cancelCount,
      daysSinceRegistration: daysSinceReg,
      daysSinceActive,
      lastPurchaseDate: c.last_purchase_date || null,
      lastActiveDate: c.last_active_date || c.created_at,
      segment: segmentLabel,
      rfmScores: { r: rScore, f: fScore, m: mScore },
    };
  });

  // Apply Search Filter
  let filtered = enriched;
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.phone && c.phone.toLowerCase().includes(q)),
    );
  }

  // Apply Behavioral Filter
  if (filter === "new") {
    filtered = filtered.filter((c) => c.daysSinceRegistration <= 30);
  } else if (filter === "active") {
    filtered = filtered.filter((c) => c.daysSinceActive <= 30);
  } else if (filter === "inactive") {
    filtered = filtered.filter((c) => c.daysSinceActive > 60);
  } else if (filter === "high_value") {
    filtered = filtered.filter(
      (c) => c.totalSpend >= 25000 || c.rfmScores.m >= 4,
    );
  } else if (filter === "repeat") {
    filtered = filtered.filter((c) => c.totalOrders >= 2);
  } else if (filter === "never_purchased") {
    filtered = filtered.filter((c) => c.totalOrders === 0);
  } else if (filter === "cart_active") {
    filtered = filtered.filter((c) => c.cartAddsCount > 0);
  } else if (filter === "saved_active") {
    filtered = filtered.filter((c) => c.savedProductsCount > 0);
  } else if (filter === "recently_viewed") {
    filtered = filtered.filter(
      (c) => c.productViewsCount > 0 && c.daysSinceActive <= 14,
    );
  } else if (filter === "high_cancellation") {
    filtered = filtered.filter((c) => c.cancelledOrdersCount > 0);
  }

  res.json(filtered);
});

/**
 * Admin: Customer 360 Full Intelligence Profile
 * GET /api/customers/:id
 */
export const getCustomer = asyncHandler(async (req, res) => {
  const customerId = parseInt(req.params.id, 10);

  // 1. Customer user profile
  const [users] = await pool.execute("SELECT * FROM users WHERE id = ?", [
    customerId,
  ]);
  if (users.length === 0)
    return res.status(404).json({ error: "Customer not found" });
  const user = users[0];

  // 2. Addresses
  const [addresses] = await pool.execute(
    "SELECT * FROM addresses WHERE user_id = ?",
    [customerId],
  );

  // 3. Complete Orders with order items & invoice numbers
  const [orders] = await pool.execute(
    `SELECT 
      o.*, 
      i.invoice_number, i.status AS invoice_status, i.id AS invoice_id
     FROM orders o
     LEFT JOIN invoices i ON o.id = i.order_id
     WHERE o.user_id = ?
     ORDER BY o.created_at DESC`,
    [customerId],
  );

  const orderIds = orders.map((o) => o.id);
  let orderItemsMap = new Map();
  if (orderIds.length > 0) {
    const [items] = await pool.query(
      `SELECT oi.*, p.name AS product_name 
       FROM order_items oi
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id IN (${orderIds.map(() => "?").join(",")})`,
      orderIds,
    );
    items.forEach((item) => {
      const list = orderItemsMap.get(item.order_id) || [];
      list.push(item);
      orderItemsMap.set(item.order_id, list);
    });
  }

  const enrichedOrders = orders.map((o) => ({
    ...toCamelCase(o),
    subtotal: Number(o.subtotal),
    tax: Number(o.tax),
    total: Number(o.total),
    items: toCamelCaseAll(orderItemsMap.get(o.id) || []).map((it) => ({
      ...it,
      price: Number(it.price),
      lineTotal: Number(it.lineTotal),
      quantity: Number(it.quantity),
    })),
  }));

  // 4. Returns & Cancellations
  const cancelledOrders = enrichedOrders.filter(
    (o) => o.status === "cancelled",
  );
  const returnedOrders = []; // Future returns table mapping

  // 5. Viewing Behavior & Product Engagement
  const [productEngagementRows] = await pool.query(
    `SELECT 
      p.id, p.name, p.sku, p.price,
      COALESCE(img.image_path, '') AS image_url,
      COUNT(CASE WHEN ev.event_type = 'product_view' THEN 1 END) AS views,
      MIN(ev.created_at) AS first_viewed_at,
      MAX(ev.created_at) AS last_viewed_at,
      COALESCE(SUM(CASE WHEN ev.event_type = 'dwell_time' THEN CAST(JSON_UNQUOTE(JSON_EXTRACT(ev.event_metadata, '$.seconds')) AS UNSIGNED) ELSE 0 END), 0) AS total_dwell_seconds,
      COUNT(CASE WHEN ev.event_type = 'add_to_cart' THEN 1 END) AS cart_adds,
      COUNT(CASE WHEN ev.event_type = 'wishlist_add' THEN 1 END) AS saved_count,
      COALESCE(ord.purchased_units, 0) AS purchased_units
     FROM analytics_events ev
     JOIN products p ON ev.product_id = p.id
     LEFT JOIN (
       SELECT product_id, image_path FROM product_images WHERE sort_order = 0 OR id IN (SELECT MIN(id) FROM product_images GROUP BY product_id) GROUP BY product_id, image_path LIMIT 1000
     ) img ON p.id = img.product_id
     LEFT JOIN (
       SELECT oi.product_id, SUM(oi.quantity) AS purchased_units
       FROM order_items oi
       JOIN orders o ON oi.order_id = o.id
       WHERE o.user_id = ? AND o.status != 'cancelled'
       GROUP BY oi.product_id
     ) ord ON p.id = ord.product_id
     WHERE ev.customer_id = ? AND ev.product_id IS NOT NULL
     GROUP BY p.id, p.name, p.sku, p.price, img.image_path, ord.purchased_units
     ORDER BY last_viewed_at DESC`,
    [customerId, customerId],
  );

  const productEngagement = productEngagementRows.map((p) => {
    const views = Number(p.views);
    const dwell = Number(p.total_dwell_seconds);
    const avgDwell = views > 0 ? Math.round(dwell / views) : 0;
    return {
      id: p.id,
      name: p.name,
      sku: p.sku || "",
      price: Number(p.price),
      imageUrl: p.image_url,
      views,
      firstViewedAt: p.first_viewed_at,
      lastViewedAt: p.last_viewed_at,
      totalDwellSeconds: dwell,
      avgDwellSeconds: avgDwell,
      cartAdds: Number(p.cart_adds),
      saved: Number(p.saved_count) > 0,
      purchased: Number(p.purchased_units) > 0,
      purchasedUnits: Number(p.purchased_units),
    };
  });

  // 6. Saved / Wishlisted Products
  const savedProducts = productEngagement.filter(
    (p) => p.saved || p.cartAdds > 0,
  );

  // 7. Chronological Customer Activity Journey Timeline (Recent 50 events)
  const [timelineEvents] = await pool.query(
    `SELECT 
      ev.id, ev.event_type, ev.page_url, ev.referrer, ev.search_query, ev.created_at,
      ev.product_id, p.name AS product_name,
      ev.order_id, ev.event_metadata
     FROM analytics_events ev
     LEFT JOIN products p ON ev.product_id = p.id
     WHERE ev.customer_id = ?
     ORDER BY ev.created_at DESC
     LIMIT 50`,
    [customerId],
  );

  // 8. Search Behavior & Frequency
  const [searchHistory] = await pool.query(
    `SELECT 
      search_query,
      COUNT(*) AS count,
      MIN(created_at) AS first_searched_at,
      MAX(created_at) AS last_searched_at
     FROM analytics_events
     WHERE customer_id = ? AND search_query IS NOT NULL AND search_query != ''
     GROUP BY search_query
     ORDER BY count DESC
     LIMIT 15`,
    [customerId],
  );

  // 9. Session History & Device Context
  const [sessionRows] = await pool.query(
    `SELECT session_id, landing_page, exit_page, referrer, utm_source, utm_medium, utm_campaign, device_type, browser, operating_system, started_at, duration_seconds
     FROM customer_sessions
     WHERE customer_id = ?
     ORDER BY started_at DESC
     LIMIT 25`,
    [customerId],
  );

  // 10. Compute 12 Customer 360 KPIs
  const completedOrders = enrichedOrders.filter(
    (o) => o.status !== "cancelled",
  );
  const totalSpend = completedOrders.reduce((sum, o) => sum + o.total, 0);
  const aov =
    completedOrders.length > 0
      ? Math.round(totalSpend / completedOrders.length)
      : 0;
  const totalItemsPurchased = completedOrders.reduce(
    (sum, o) => sum + (o.items?.reduce((s, it) => s + it.quantity, 0) || 0),
    0,
  );
  const totalSessions = sessionRows.length;
  const totalTimeSpent = sessionRows.reduce(
    (sum, s) => sum + Number(s.duration_seconds || 0),
    0,
  );
  const totalProductViews = productEngagement.reduce(
    (sum, p) => sum + p.views,
    0,
  );
  const totalSearches = searchHistory.reduce(
    (sum, s) => sum + Number(s.count || 0),
    0,
  );

  // RFM Calculations
  const daysSinceLastOrder =
    completedOrders.length > 0
      ? Math.round(
          (Date.now() - new Date(completedOrders[0].createdAt).getTime()) /
            86400000,
        )
      : 999;
  const rScore =
    daysSinceLastOrder <= 30
      ? 5
      : daysSinceLastOrder <= 60
        ? 4
        : daysSinceLastOrder <= 120
          ? 3
          : daysSinceLastOrder <= 240
            ? 2
            : 1;
  const fScore =
    completedOrders.length >= 5
      ? 5
      : completedOrders.length >= 3
        ? 4
        : completedOrders.length >= 2
          ? 3
          : completedOrders.length === 1
            ? 2
            : 1;
  const mScore =
    totalSpend >= 50000
      ? 5
      : totalSpend >= 25000
        ? 4
        : totalSpend >= 10000
          ? 3
          : totalSpend > 0
            ? 2
            : 1;
  const rfmSegment = getRFMSegment(rScore, fScore, mScore);

  // 11. Category Affinity (Top viewed / purchased categories)
  const [categoryAffinity] = await pool.query(
    `SELECT 
      c.name AS category_name,
      COUNT(ev.id) AS interaction_count
     FROM analytics_events ev
     JOIN products p ON ev.product_id = p.id
     JOIN categories c ON p.category_id = c.id
     WHERE ev.customer_id = ?
     GROUP BY c.name
     ORDER BY interaction_count DESC
     LIMIT 5`,
    [customerId],
  );

  // 12. Rule-Based Customer Marketing Signals
  const marketingSignals = [];
  if (productEngagement.length > 0 && completedOrders.length === 0) {
    marketingSignals.push({
      signal: "High Engagement Without Purchase",
      description: `Customer explored ${productEngagement.length} products with ${totalProductViews} total views but has not placed an order.`,
      severity: "High Intent",
    });
  }
  const repeatedViews = productEngagement.filter(
    (p) => p.views >= 3 && !p.purchased,
  );
  if (repeatedViews.length > 0) {
    marketingSignals.push({
      signal: "Repeated Product Interest",
      description: `Repeatedly viewed ${repeatedViews[0].name} (${repeatedViews[0].views} times) without purchasing.`,
      severity: "High Intent",
      productId: repeatedViews[0].id,
    });
  }
  if (totalSpend >= 25000) {
    marketingSignals.push({
      signal: "High Lifetime Value Clinician",
      description: `Cumulative order spend of ₹${totalSpend.toLocaleString("en-IN")} across ${completedOrders.length} orders.`,
      severity: "VIP Account",
    });
  }
  if (daysSinceLastOrder > 60 && completedOrders.length >= 1) {
    marketingSignals.push({
      signal: "Inactive Re-order Opportunity",
      description: `Last ordered ${daysSinceLastOrder} days ago. Consider re-engagement outreach.`,
      severity: "Attention Needed",
    });
  }

  res.json({
    customer: toCamelCase(user),
    addresses: toCamelCaseAll(addresses),
    kpis: {
      totalOrders: completedOrders.length,
      totalSpend,
      averageOrderValue: aov,
      totalItemsPurchased,
      totalReturns: 0,
      totalCancellations: cancelledOrders.length,
      totalReviews: 0,
      savedProductsCount: savedProducts.length,
      productViewsCount: totalProductViews,
      searchCount: totalSearches,
      totalSessions,
      totalTimeSpentSeconds: totalTimeSpent,
    },
    rfm: {
      recencyScore: rScore,
      frequencyScore: fScore,
      monetaryScore: mScore,
      segment: rfmSegment,
      daysSinceLastPurchase:
        daysSinceLastOrder === 999 ? null : daysSinceLastOrder,
      lifetimeRevenue: totalSpend,
    },
    orders: enrichedOrders,
    cancellations: cancelledOrders,
    returns: returnedOrders,
    productEngagement,
    savedProducts,
    activityTimeline: toCamelCaseAll(timelineEvents),
    searchHistory: toCamelCaseAll(searchHistory).map((s) => ({
      ...s,
      count: Number(s.count),
    })),
    sessions: toCamelCaseAll(sessionRows).map((s) => ({
      ...s,
      durationSeconds: Number(s.durationSeconds),
    })),
    categoryAffinity: toCamelCaseAll(categoryAffinity).map((c) => ({
      ...c,
      interactionCount: Number(c.interactionCount),
    })),
    marketingSignals,
  });
});

/**
 * Customer (self): add address
 */
export const addAddress = asyncHandler(async (req, res) => {
  const {
    label = "Home",
    line1,
    line2 = "",
    city,
    state,
    pincode,
    phone = "",
  } = req.body;
  if (!line1 || !city || !state || !pincode) {
    return res
      .status(400)
      .json({ error: "line1, city, state and pincode are required" });
  }

  const [result] = await pool.execute(
    `INSERT INTO addresses (user_id, label, line1, line2, city, state, pincode, phone)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [req.user.id, label, line1, line2, city, state, pincode, phone],
  );

  const [addresses] = await pool.execute(
    "SELECT * FROM addresses WHERE user_id = ?",
    [req.user.id],
  );
  res
    .status(201)
    .json({ id: result.insertId, addresses: toCamelCaseAll(addresses) });
});
