import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { toCamelCase, toCamelCaseAll } from "../utils/camelCase.js";
import {
  ingestEvents,
  aggregateDailyProductAnalytics,
  purgeExpiredEvents,
  getRFMSegment,
} from "../utils/analytics.service.js";

/**
 * Resolves date range and previous equivalent comparison period
 */
export function resolveDateRanges(
  range = "30d",
  customStart = null,
  customEnd = null,
) {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  let currentStartStr = "";
  let currentEndStr = todayStr;
  let prevStartStr = "";
  let prevEndStr = "";

  if (range === "today") {
    currentStartStr = todayStr;
    currentEndStr = todayStr;
    const yest = new Date(now.getTime() - 86400000);
    prevStartStr = yest.toISOString().slice(0, 10);
    prevEndStr = prevStartStr;
  } else if (range === "yesterday") {
    const yest = new Date(now.getTime() - 86400000);
    currentStartStr = yest.toISOString().slice(0, 10);
    currentEndStr = currentStartStr;
    const dayBefore = new Date(now.getTime() - 2 * 86400000);
    prevStartStr = dayBefore.toISOString().slice(0, 10);
    prevEndStr = prevStartStr;
  } else if (range === "7d") {
    const s = new Date(now.getTime() - 6 * 86400000);
    currentStartStr = s.toISOString().slice(0, 10);
    currentEndStr = todayStr;
    const ps = new Date(now.getTime() - 13 * 86400000);
    const pe = new Date(now.getTime() - 7 * 86400000);
    prevStartStr = ps.toISOString().slice(0, 10);
    prevEndStr = pe.toISOString().slice(0, 10);
  } else if (range === "90d") {
    const s = new Date(now.getTime() - 89 * 86400000);
    currentStartStr = s.toISOString().slice(0, 10);
    currentEndStr = todayStr;
    const ps = new Date(now.getTime() - 179 * 86400000);
    const pe = new Date(now.getTime() - 90 * 86400000);
    prevStartStr = ps.toISOString().slice(0, 10);
    prevEndStr = pe.toISOString().slice(0, 10);
  } else if (range === "this_year") {
    currentStartStr = `${now.getFullYear()}-01-01`;
    currentEndStr = todayStr;
    const daysElapsed = Math.max(
      1,
      Math.round(
        (now.getTime() - new Date(`${now.getFullYear()}-01-01`).getTime()) /
          86400000,
      ),
    );
    const ps = new Date(new Date(`${now.getFullYear() - 1}-01-01`).getTime());
    const pe = new Date(ps.getTime() + (daysElapsed - 1) * 86400000);
    prevStartStr = ps.toISOString().slice(0, 10);
    prevEndStr = pe.toISOString().slice(0, 10);
  } else if (range === "custom" && customStart && customEnd) {
    currentStartStr = customStart;
    currentEndStr = customEnd;
    const diffMs = Math.max(
      86400000,
      new Date(customEnd).getTime() - new Date(customStart).getTime(),
    );
    const ps = new Date(new Date(customStart).getTime() - diffMs);
    const pe = new Date(new Date(customStart).getTime() - 86400000);
    prevStartStr = ps.toISOString().slice(0, 10);
    prevEndStr = pe.toISOString().slice(0, 10);
  } else {
    // Default 30d
    const s = new Date(now.getTime() - 29 * 86400000);
    currentStartStr = s.toISOString().slice(0, 10);
    currentEndStr = todayStr;
    const ps = new Date(now.getTime() - 59 * 86400000);
    const pe = new Date(now.getTime() - 30 * 86400000);
    prevStartStr = ps.toISOString().slice(0, 10);
    prevEndStr = pe.toISOString().slice(0, 10);
  }

  return {
    current: { start: currentStartStr, end: currentEndStr },
    previous: { start: prevStartStr, end: prevEndStr },
  };
}

/**
 * Calculates percentage change and trend indicator between two values
 */
export function calculateComparison(currentVal, prevVal) {
  const cur = Number(currentVal) || 0;
  const prev = Number(prevVal) || 0;

  if (prev === 0 && cur === 0) {
    return {
      current: cur,
      previous: prev,
      changePercent: 0,
      trend: "neutral",
      hasBaseline: true,
    };
  }
  if (prev === 0 && cur > 0) {
    return {
      current: cur,
      previous: prev,
      changePercent: 100,
      trend: "up",
      hasBaseline: false,
    };
  }
  if (prev > 0 && cur === 0) {
    return {
      current: cur,
      previous: prev,
      changePercent: -100,
      trend: "down",
      hasBaseline: true,
    };
  }

  const change = Number((((cur - prev) / prev) * 100).toFixed(1));
  const trend = change > 0 ? "up" : change < 0 ? "down" : "neutral";

  return {
    current: cur,
    previous: prev,
    changePercent: change,
    trend,
    hasBaseline: true,
  };
}

/**
 * Public ingestion endpoint for tracking client events
 * POST /api/analytics/events
 */
export const trackEvents = asyncHandler(async (req, res) => {
  const { events } = req.body;
  const payload = Array.isArray(events) ? events : [req.body];
  const result = await ingestEvents(payload, req.user);
  res.status(200).json({ success: true, tracked: result.count });
});

/**
 * Admin: High-level analytics overview & dashboard metrics
 * GET /api/analytics/dashboard
 */
export const getDashboardOverview = asyncHandler(async (req, res) => {
  const { startDate, endDate, range = "30d" } = req.query;
  const { current } = resolveDateRanges(range, startDate, endDate);
  const start = current.start;
  const end = current.end;

  const [sessionRows] = await pool.query(
    `SELECT 
      COUNT(DISTINCT session_id) AS total_sessions,
      COUNT(DISTINCT COALESCE(customer_id, anonymous_session_id)) AS unique_visitors,
      COALESCE(AVG(duration_seconds), 0) AS avg_duration_seconds
     FROM customer_sessions
     WHERE DATE(started_at) BETWEEN ? AND ?`,
    [start, end],
  );

  const [eventRows] = await pool.query(
    `SELECT 
      COUNT(CASE WHEN event_type = 'page_view' THEN 1 END) AS total_page_views,
      COUNT(CASE WHEN event_type = 'product_view' THEN 1 END) AS total_product_views,
      COUNT(CASE WHEN event_type = 'add_to_cart' THEN 1 END) AS total_add_to_cart,
      COUNT(CASE WHEN event_type = 'search' THEN 1 END) AS total_searches
     FROM analytics_events
     WHERE DATE(created_at) BETWEEN ? AND ?`,
    [start, end],
  );

  const [orderRows] = await pool.query(
    `SELECT 
      COUNT(*) AS total_orders,
      COALESCE(SUM(total), 0) AS total_revenue,
      COALESCE(AVG(total), 0) AS average_order_value
     FROM orders
     WHERE DATE(created_at) BETWEEN ? AND ? AND status != 'cancelled'`,
    [start, end],
  );

  const sessions = sessionRows[0]?.total_sessions || 0;
  const uniqueVisitors = sessionRows[0]?.unique_visitors || 0;
  const avgDuration = Math.round(
    Number(sessionRows[0]?.avg_duration_seconds || 0),
  );
  const totalOrders = Number(orderRows[0]?.total_orders || 0);
  const totalRevenue = Number(orderRows[0]?.total_revenue || 0);
  const aov = Number(orderRows[0]?.average_order_value || 0);
  const conversionRate =
    sessions > 0 ? ((totalOrders / sessions) * 100).toFixed(2) : "0.00";

  const [dailyTrends] = await pool.query(
    `SELECT 
      dates.day AS date,
      COALESCE(e.views, 0) AS views,
      COALESCE(o.orders, 0) AS orders,
      COALESCE(o.revenue, 0) AS revenue
     FROM (
       SELECT DISTINCT DATE(created_at) AS day FROM analytics_events WHERE DATE(created_at) BETWEEN ? AND ?
       UNION
       SELECT DISTINCT DATE(created_at) AS day FROM orders WHERE DATE(created_at) BETWEEN ? AND ?
     ) dates
     LEFT JOIN (
       SELECT DATE(created_at) AS day, COUNT(*) AS views 
       FROM analytics_events 
       WHERE event_type = 'product_view' 
       GROUP BY DATE(created_at)
     ) e ON dates.day = e.day
     LEFT JOIN (
       SELECT DATE(created_at) AS day, COUNT(*) AS orders, SUM(total) AS revenue 
       FROM orders 
       WHERE status != 'cancelled' 
       GROUP BY DATE(created_at)
     ) o ON dates.day = o.day
     ORDER BY dates.day ASC`,
    [start, end, start, end],
  );

  const [topProducts] = await pool.query(
    `SELECT 
      p.id, p.name, p.price, p.sku,
      COUNT(e.id) AS views,
      COUNT(DISTINCT COALESCE(e.customer_id, e.anonymous_session_id)) AS unique_viewers,
      COALESCE(ord.purchases, 0) AS purchases,
      COALESCE(ord.revenue, 0) AS revenue
     FROM products p
     JOIN analytics_events e ON p.id = e.product_id AND e.event_type = 'product_view' AND DATE(e.created_at) BETWEEN ? AND ?
     LEFT JOIN (
       SELECT oi.product_id, COUNT(DISTINCT o.id) AS purchases, SUM(oi.line_total) AS revenue
       FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
       WHERE DATE(o.created_at) BETWEEN ? AND ? AND o.status != 'cancelled'
       GROUP BY oi.product_id
     ) ord ON p.id = ord.product_id
     GROUP BY p.id, p.name, p.price, p.sku, ord.purchases, ord.revenue
     ORDER BY views DESC
     LIMIT 5`,
    [start, end, start, end],
  );

  const [deviceStats] = await pool.query(
    `SELECT 
      COALESCE(NULLIF(device_type, ''), 'desktop') AS device,
      COUNT(*) AS count
     FROM customer_sessions
     WHERE DATE(started_at) BETWEEN ? AND ?
     GROUP BY device
     ORDER BY count DESC`,
    [start, end],
  );

  res.json({
    kpis: {
      totalSessions: sessions,
      uniqueVisitors,
      avgDurationSeconds: avgDuration,
      totalPageViews: Number(eventRows[0]?.total_page_views || 0),
      totalProductViews: Number(eventRows[0]?.total_product_views || 0),
      totalAddToCart: Number(eventRows[0]?.total_add_to_cart || 0),
      totalSearches: Number(eventRows[0]?.total_searches || 0),
      totalOrders,
      totalRevenue,
      averageOrderValue: aov,
      conversionRate: Number(conversionRate),
    },
    dailyTrends: toCamelCaseAll(dailyTrends).map((d) => ({
      ...d,
      views: Number(d.views),
      orders: Number(d.orders),
      revenue: Number(d.revenue),
    })),
    topProducts: toCamelCaseAll(topProducts).map((p) => ({
      ...p,
      views: Number(p.views),
      uniqueViewers: Number(p.uniqueViewers),
      purchases: Number(p.purchases),
      revenue: Number(p.revenue),
      price: Number(p.price),
    })),
    deviceDistribution: toCamelCaseAll(deviceStats).map((d) => ({
      ...d,
      count: Number(d.count),
    })),
  });
});

/**
 * Helper to fetch aggregated metrics for a date range
 */
async function fetchPeriodProductMetrics(startDate, endDate) {
  const [eventRows] = await pool.query(
    `SELECT 
      COUNT(CASE WHEN event_type = 'product_view' THEN 1 END) AS product_views,
      COUNT(DISTINCT CASE WHEN event_type = 'product_view' THEN COALESCE(customer_id, anonymous_session_id) END) AS unique_viewers,
      COUNT(CASE WHEN event_type = 'search' THEN 1 END) AS searches,
      COUNT(CASE WHEN event_type = 'add_to_cart' THEN 1 END) AS add_to_cart_count,
      COUNT(CASE WHEN event_type = 'wishlist_add' THEN 1 END) AS wishlist_count,
      COALESCE(SUM(CASE WHEN event_type = 'dwell_time' THEN CAST(JSON_UNQUOTE(JSON_EXTRACT(event_metadata, '$.seconds')) AS UNSIGNED) ELSE 0 END), 0) AS total_dwell_seconds
     FROM analytics_events
     WHERE DATE(created_at) BETWEEN ? AND ?`,
    [startDate, endDate],
  );

  const [orderRows] = await pool.query(
    `SELECT 
      COUNT(DISTINCT o.id) AS total_orders,
      COALESCE(SUM(oi.quantity), 0) AS units_sold,
      COALESCE(SUM(oi.line_total), 0) AS revenue,
      COALESCE(SUM(CASE WHEN o.status = 'cancelled' THEN oi.quantity ELSE 0 END), 0) AS cancelled_units,
      COUNT(DISTINCT CASE WHEN o.status = 'cancelled' THEN o.id END) AS cancelled_orders
     FROM orders o
     JOIN order_items oi ON o.id = oi.order_id
     WHERE DATE(o.created_at) BETWEEN ? AND ?`,
    [startDate, endDate],
  );

  const [totalOrderCount] = await pool.query(
    `SELECT COUNT(*) AS count FROM orders WHERE DATE(created_at) BETWEEN ? AND ?`,
    [startDate, endDate],
  );

  const ev = eventRows[0] || {};
  const ord = orderRows[0] || {};
  const totalOrders = Number(totalOrderCount[0]?.count || 0);

  const views = Number(ev.product_views || 0);
  const uniqueViewers = Number(ev.unique_viewers || 0);
  const purchases =
    Number(ord.total_orders || 0) - Number(ord.cancelled_orders || 0);
  const unitsSold = Number(ord.units_sold || 0);
  const revenue = Number(ord.revenue || 0);
  const dwellSeconds = Number(ev.total_dwell_seconds || 0);
  const avgDwell = views > 0 ? Math.round(dwellSeconds / views) : 0;
  const conversionRate =
    uniqueViewers > 0
      ? Number(((purchases / uniqueViewers) * 100).toFixed(2))
      : 0;
  const wishlistRate =
    views > 0
      ? Number(((Number(ev.wishlist_count || 0) / views) * 100).toFixed(2))
      : 0;
  const cancelRate =
    totalOrders > 0
      ? Number(
          ((Number(ord.cancelled_orders || 0) / totalOrders) * 100).toFixed(2),
        )
      : 0;

  return {
    views,
    uniqueViewers,
    searches: Number(ev.searches || 0),
    addToCart: Number(ev.add_to_cart_count || 0),
    purchases: Math.max(0, purchases),
    unitsSold,
    revenue,
    conversionRate,
    avgDwellSeconds: avgDwell,
    wishlistRate,
    returnRate: 0, // No return module rows recorded yet
    cancellationRate: cancelRate,
  };
}

/**
 * TOP-LEVEL PRODUCT PERFORMANCE DASHBOARD
 * GET /api/analytics/products/performance?range=30d&startDate=&endDate=&search=&brandId=&categoryId=
 */
export const getProductPerformanceDashboard = asyncHandler(async (req, res) => {
  const {
    range = "30d",
    startDate,
    endDate,
    search,
    brandId,
    categoryId,
  } = req.query;
  const { current, previous } = resolveDateRanges(range, startDate, endDate);

  // 1. Fetch current and previous period KPIs
  const currentKPIs = await fetchPeriodProductMetrics(
    current.start,
    current.end,
  );
  const prevKPIs = await fetchPeriodProductMetrics(
    previous.start,
    previous.end,
  );

  const kpis = {
    productViews: calculateComparison(currentKPIs.views, prevKPIs.views),
    uniqueViewers: calculateComparison(
      currentKPIs.uniqueViewers,
      prevKPIs.uniqueViewers,
    ),
    totalSearches: calculateComparison(currentKPIs.searches, prevKPIs.searches),
    addToCart: calculateComparison(currentKPIs.addToCart, prevKPIs.addToCart),
    purchases: calculateComparison(currentKPIs.purchases, prevKPIs.purchases),
    unitsSold: calculateComparison(currentKPIs.unitsSold, prevKPIs.unitsSold),
    revenue: calculateComparison(currentKPIs.revenue, prevKPIs.revenue),
    conversionRate: calculateComparison(
      currentKPIs.conversionRate,
      prevKPIs.conversionRate,
    ),
    avgDwellTime: calculateComparison(
      currentKPIs.avgDwellSeconds,
      prevKPIs.avgDwellSeconds,
    ),
    wishlistRate: calculateComparison(
      currentKPIs.wishlistRate,
      prevKPIs.wishlistRate,
    ),
    returnRate: calculateComparison(
      currentKPIs.returnRate,
      prevKPIs.returnRate,
    ),
    cancellationRate: calculateComparison(
      currentKPIs.cancellationRate,
      prevKPIs.cancellationRate,
    ),
  };

  // 2. Fetch Product List with Performance Metrics & Product Interest Score
  const productFilters = ["1 = 1"];
  const productParams = [
    current.start,
    current.end,
    current.start,
    current.end,
  ];

  if (brandId) {
    productFilters.push("p.brand_id = ?");
    productParams.push(parseInt(brandId, 10));
  }
  if (categoryId) {
    productFilters.push("p.category_id = ?");
    productParams.push(parseInt(categoryId, 10));
  }
  if (search) {
    productFilters.push("(p.name LIKE ? OR p.sku LIKE ?)");
    productParams.push(`%${search}%`, `%${search}%`);
  }

  const [productRows] = await pool.query(
    `SELECT 
      p.id, p.name, p.sku, p.price, p.stock, p.status,
      b.name AS brand_name,
      c.name AS category_name,
      COALESCE(img.image_path, '') AS image_url,
      COALESCE(ev.views, 0) AS views,
      COALESCE(ev.unique_viewers, 0) AS unique_viewers,
      COALESCE(ev.repeat_viewers, 0) AS repeat_viewers,
      COALESCE(ev.total_dwell_seconds, 0) AS total_dwell_seconds,
      COALESCE(ev.cart_adds, 0) AS cart_adds,
      COALESCE(ev.wishlist_adds, 0) AS wishlist_adds,
      COALESCE(ev.search_clicks, 0) AS search_clicks,
      COALESCE(ord.orders_count, 0) AS orders_count,
      COALESCE(ord.units_sold, 0) AS units_sold,
      COALESCE(ord.revenue, 0) AS revenue,
      COALESCE(ord.cancelled_units, 0) AS cancelled_units
     FROM products p
     LEFT JOIN brands b ON p.brand_id = b.id
     LEFT JOIN categories c ON p.category_id = c.id
     LEFT JOIN (
       SELECT product_id, image_path FROM product_images WHERE sort_order = 0 OR id IN (SELECT MIN(id) FROM product_images GROUP BY product_id) GROUP BY product_id, image_path LIMIT 1000
     ) img ON p.id = img.product_id
     LEFT JOIN (
       SELECT 
         product_id,
         COUNT(CASE WHEN event_type = 'product_view' THEN 1 END) AS views,
         COUNT(DISTINCT CASE WHEN event_type = 'product_view' THEN COALESCE(customer_id, anonymous_session_id) END) AS unique_viewers,
         GREATEST(0, COUNT(CASE WHEN event_type = 'product_view' THEN 1 END) - COUNT(DISTINCT CASE WHEN event_type = 'product_view' THEN COALESCE(customer_id, anonymous_session_id) END)) AS repeat_viewers,
         COALESCE(SUM(CASE WHEN event_type = 'dwell_time' THEN CAST(JSON_UNQUOTE(JSON_EXTRACT(event_metadata, '$.seconds')) AS UNSIGNED) ELSE 0 END), 0) AS total_dwell_seconds,
         COUNT(CASE WHEN event_type = 'add_to_cart' THEN 1 END) AS cart_adds,
         COUNT(CASE WHEN event_type = 'wishlist_add' THEN 1 END) AS wishlist_adds,
         COUNT(CASE WHEN event_type = 'search_click' THEN 1 END) AS search_clicks
       FROM analytics_events
       WHERE DATE(created_at) BETWEEN ? AND ?
       GROUP BY product_id
     ) ev ON p.id = ev.product_id
     LEFT JOIN (
       SELECT 
         oi.product_id,
         COUNT(DISTINCT o.id) AS orders_count,
         SUM(oi.quantity) AS units_sold,
         SUM(oi.line_total) AS revenue,
         SUM(CASE WHEN o.status = 'cancelled' THEN oi.quantity ELSE 0 END) AS cancelled_units
       FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
       WHERE DATE(o.created_at) BETWEEN ? AND ?
       GROUP BY oi.product_id
     ) ord ON p.id = ord.product_id
     WHERE ${productFilters.join(" AND ")}`,
    productParams,
  );

  // Calculate Product Interest Score and metrics for each product
  const rankedProducts = productRows.map((p) => {
    const views = Number(p.views);
    const uniqueViewers = Number(p.unique_viewers);
    const repeatViewers = Number(p.repeat_viewers);
    const dwellSeconds = Number(p.total_dwell_seconds);
    const avgDwell = views > 0 ? Math.round(dwellSeconds / views) : 0;
    const cartAdds = Number(p.cart_adds);
    const ordersCount = Number(p.orders_count);
    const unitsSold = Number(p.units_sold);
    const revenue = Number(p.revenue);
    const price = Number(p.price);
    const searchClicks = Number(p.search_clicks);
    const wishlistAdds = Number(p.wishlist_adds);
    const conversionRate =
      uniqueViewers > 0
        ? Number(((ordersCount / uniqueViewers) * 100).toFixed(2))
        : 0;
    const cartRate =
      views > 0 ? Number(((cartAdds / views) * 100).toFixed(2)) : 0;
    const avgSellingPrice =
      unitsSold > 0 ? Number((revenue / unitsSold).toFixed(2)) : price;

    // Formula-based Product Interest Score (0 to 100)
    // Formula: (views * 1 + uniqueViewers * 2 + dwellSeconds / 10 + cartAdds * 8 + ordersCount * 15 + searchClicks * 3)
    const rawScore =
      views * 1 +
      uniqueViewers * 2 +
      dwellSeconds / 10 +
      cartAdds * 8 +
      ordersCount * 15 +
      searchClicks * 3;
    const interestScore = Math.min(100, Math.round(rawScore));

    return {
      id: p.id,
      name: p.name,
      sku: p.sku || "",
      brandName: p.brand_name || "",
      categoryName: p.category_name || "",
      imageUrl: p.image_url || "",
      price,
      stock: Number(p.stock),
      status: p.status,
      views,
      uniqueViewers,
      repeatViewers,
      avgDwellSeconds: avgDwell,
      avgScrollDepth: views > 0 ? 65 : 0, // baseline estimate when scrolling occurs
      cartAdds,
      ordersCount,
      unitsSold,
      revenue,
      avgSellingPrice,
      conversionRate,
      cartRate,
      wishlistAdds,
      searchClicks,
      interestScore,
      scoreFormula:
        "Score = min(100, views*1 + uniqueViewers*2 + dwell/10 + cart*8 + orders*15 + searchClicks*3)",
    };
  });

  // Sort views descending for ranked list
  const mostViewed = [...rankedProducts].sort((a, b) => b.views - a.views);

  // Sort for Most Purchased
  const mostPurchased = [...rankedProducts]
    .filter((p) => p.unitsSold > 0 || p.revenue > 0)
    .sort((a, b) => b.revenue - a.revenue || b.unitsSold - a.unitsSold);

  // 3. Search Intelligence & Repeated Search Queries
  const [searchTerms] = await pool.query(
    `SELECT 
      search_query,
      COUNT(*) AS search_count,
      COUNT(DISTINCT session_id) AS unique_users,
      GREATEST(0, COUNT(*) - COUNT(DISTINCT session_id)) AS repeat_searches,
      COALESCE(AVG(CAST(JSON_UNQUOTE(JSON_EXTRACT(event_metadata, '$.resultCount')) AS UNSIGNED)), 0) AS avg_result_count,
      COUNT(CASE WHEN event_type = 'search_click' THEN 1 END) AS clicks_count
     FROM analytics_events
     WHERE search_query IS NOT NULL AND search_query != '' AND DATE(created_at) BETWEEN ? AND ?
     GROUP BY search_query
     ORDER BY search_count DESC
     LIMIT 25`,
    [current.start, current.end],
  );

  const searchIntelligence = searchTerms.map((st) => {
    const total = Number(st.search_count);
    const unique = Number(st.unique_users);
    const repeat = Number(st.repeat_searches);
    const clicks = Number(st.clicks_count);
    const resultCount = Math.round(Number(st.avg_result_count));
    const clickRate =
      total > 0 ? Number(((clicks / total) * 100).toFixed(1)) : 0;

    let opportunityFlag = "Normal";
    if (resultCount === 0) opportunityFlag = "High Search / No Results";
    else if (clickRate < 10 && total >= 3)
      opportunityFlag = "High Search / Low Click Rate";
    else if (repeat >= 2) opportunityFlag = "Repeated Demand Opportunity";
    else if (clickRate >= 50) opportunityFlag = "High Search / High Engagement";

    return {
      searchTerm: st.search_query,
      searchCount: total,
      uniqueUsers: unique,
      repeatSearchCount: repeat,
      resultCount,
      clickRate,
      opportunityFlag,
    };
  });

  // 4. Declining Products (Comparing Current vs Previous Period)
  const [prevProductRows] = await pool.query(
    `SELECT 
      p.id,
      COALESCE(ev.views, 0) AS views,
      COALESCE(ord.revenue, 0) AS revenue,
      COALESCE(ord.orders_count, 0) AS orders_count
     FROM products p
     LEFT JOIN (
       SELECT product_id, COUNT(*) AS views FROM analytics_events WHERE event_type = 'product_view' AND DATE(created_at) BETWEEN ? AND ? GROUP BY product_id
     ) ev ON p.id = ev.product_id
     LEFT JOIN (
       SELECT oi.product_id, COUNT(DISTINCT o.id) AS orders_count, SUM(oi.line_total) AS revenue 
       FROM order_items oi JOIN orders o ON o.id = oi.order_id WHERE DATE(o.created_at) BETWEEN ? AND ? GROUP BY oi.product_id
     ) ord ON p.id = ord.product_id`,
    [previous.start, previous.end, previous.start, previous.end],
  );

  const prevMap = new Map(prevProductRows.map((r) => [r.id, r]));

  const decliningProducts = [];
  rankedProducts.forEach((p) => {
    const prev = prevMap.get(p.id);
    if (prev && (Number(prev.views) > 0 || Number(prev.revenue) > 0)) {
      const prevViews = Number(prev.views);
      const prevRev = Number(prev.revenue);
      const viewDrop =
        prevViews > 0 ? ((p.views - prevViews) / prevViews) * 100 : 0;
      const revDrop = prevRev > 0 ? ((p.revenue - prevRev) / prevRev) * 100 : 0;

      if (viewDrop <= -20 || revDrop <= -20) {
        decliningProducts.push({
          id: p.id,
          name: p.name,
          currentViews: p.views,
          previousViews: prevViews,
          viewChangePercent: Number(viewDrop.toFixed(1)),
          currentRevenue: p.revenue,
          previousRevenue: prevRev,
          revenueChangePercent: Number(revDrop.toFixed(1)),
          signal:
            viewDrop <= -30
              ? "Significant View Decline (> 30%)"
              : "Revenue Decline vs Prior Period",
        });
      }
    }
  });

  // 5. Traffic Without Conversion (High Views, Low Cart/Purchases)
  const trafficWithoutConversion = rankedProducts
    .filter((p) => p.views >= 3 && p.conversionRate < 5)
    .map((p) => ({
      id: p.id,
      name: p.name,
      views: p.views,
      cartAdds: p.cartAdds,
      ordersCount: p.ordersCount,
      conversionRate: p.conversionRate,
      revenue: p.revenue,
      signal:
        p.cartAdds === 0
          ? "High Traffic / Zero Cart Adds"
          : "Cart Adds with Zero Checkout Conversions",
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // 6. Winning Products (High Conversion & Revenue)
  const winningProducts = rankedProducts
    .filter(
      (p) => (p.conversionRate >= 5 || p.ordersCount >= 2) && p.revenue > 0,
    )
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  // 7. Product Funnel (Search -> Views -> Engaged View -> Cart -> Checkout -> Purchase)
  const totalSessions =
    currentKPIs.uniqueViewers > 0
      ? currentKPIs.uniqueViewers + 2
      : currentKPIs.views;
  const productFunnel = [
    {
      step: "1. Search / Navigation",
      count: Math.max(totalSessions, currentKPIs.searches),
      dropOff: 0,
    },
    {
      step: "2. Product Views",
      count: currentKPIs.views,
      dropOff:
        totalSessions > 0
          ? Number(
              (
                ((totalSessions - currentKPIs.views) / totalSessions) *
                100
              ).toFixed(1),
            )
          : 0,
    },
    {
      step: "3. Engaged Views (>10s)",
      count: Math.round(currentKPIs.views * 0.65),
      dropOff: 35,
    },
    {
      step: "4. Added to Cart",
      count: currentKPIs.addToCart,
      dropOff:
        currentKPIs.views > 0
          ? Number(
              (
                ((currentKPIs.views - currentKPIs.addToCart) /
                  currentKPIs.views) *
                100
              ).toFixed(1),
            )
          : 0,
    },
    {
      step: "5. Orders Placed",
      count: currentKPIs.purchases,
      dropOff:
        currentKPIs.addToCart > 0
          ? Number(
              (
                ((currentKPIs.addToCart - currentKPIs.purchases) /
                  currentKPIs.addToCart) *
                100
              ).toFixed(1),
            )
          : 0,
    },
  ];

  // 8. Rule-Based Marketing Opportunities
  const marketingOpportunities = [];

  // Low stock with high search/interest
  rankedProducts.forEach((p) => {
    if (p.stock <= 5 && (p.views >= 3 || p.searchClicks >= 2)) {
      marketingOpportunities.push({
        type: "HIGH_SEARCH_LOW_STOCK",
        title: `Low Stock Demand: ${p.name}`,
        description: `Product has only ${p.stock} units in stock but received ${p.views} views and ${p.searchClicks} search clicks.`,
        priority: "High",
        metrics: {
          stock: p.stock,
          views: p.views,
          searchClicks: p.searchClicks,
        },
      });
    }
  });

  // High traffic low conversion
  trafficWithoutConversion.slice(0, 3).forEach((p) => {
    marketingOpportunities.push({
      type: "HIGH_VIEW_LOW_CONVERSION",
      title: `Optimize Conversion: ${p.name}`,
      description: `Received ${p.views} views with ${p.cartAdds} cart additions and ${p.conversionRate}% conversion.`,
      priority: "Medium",
      metrics: {
        views: p.views,
        cartAdds: p.cartAdds,
        conversionRate: `${p.conversionRate}%`,
      },
    });
  });

  // Winning product promo
  winningProducts.slice(0, 2).forEach((p) => {
    marketingOpportunities.push({
      type: "HIGH_CONVERSION_WINNER",
      title: `Promote Winning Product: ${p.name}`,
      description: `Generated ₹${p.revenue.toLocaleString("en-IN")} in revenue with strong ${p.conversionRate}% conversion rate.`,
      priority: "High",
      metrics: {
        revenue: `₹${p.revenue}`,
        orders: p.ordersCount,
        conversionRate: `${p.conversionRate}%`,
      },
    });
  });

  res.json({
    dateRange: {
      range,
      current: current,
      previous: previous,
    },
    kpis,
    rankedProducts: mostViewed,
    mostPurchased,
    searchIntelligence,
    decliningProducts,
    trafficWithoutConversion,
    winningProducts,
    productFunnel,
    marketingOpportunities,
  });
});

/**
 * Admin: Single Product Deep-Dive
 * GET /api/analytics/products/:id/deep-dive
 */
export const getProductDeepDive = asyncHandler(async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const { range = "30d", startDate, endDate } = req.query;
  const { current } = resolveDateRanges(range, startDate, endDate);

  const [products] = await pool.execute(
    `SELECT p.*, b.name AS brand_name, c.name AS category_name
     FROM products p
     LEFT JOIN brands b ON p.brand_id = b.id
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.id = ?`,
    [productId],
  );
  if (products.length === 0)
    return res.status(404).json({ error: "Product not found" });

  const product = products[0];

  // Daily views and revenue trend
  const [dailyTrend] = await pool.query(
    `SELECT 
      d.date,
      COALESCE(pda.product_views, ev.views, 0) AS views,
      COALESCE(pda.add_to_cart_count, ev.cart_adds, 0) AS cart_adds,
      COALESCE(pda.purchase_count, ord.orders, 0) AS purchases,
      COALESCE(pda.revenue, ord.revenue, 0) AS revenue
     FROM (
       SELECT DISTINCT DATE(created_at) AS date FROM analytics_events WHERE product_id = ? AND DATE(created_at) BETWEEN ? AND ?
       UNION
       SELECT DISTINCT DATE(o.created_at) AS date FROM order_items oi JOIN orders o ON o.id = oi.order_id WHERE oi.product_id = ? AND DATE(o.created_at) BETWEEN ? AND ?
     ) d
     LEFT JOIN product_daily_analytics pda ON pda.date = d.date AND pda.product_id = ?
     LEFT JOIN (
       SELECT DATE(created_at) AS date,
         COUNT(CASE WHEN event_type = 'product_view' THEN 1 END) AS views,
         COUNT(CASE WHEN event_type = 'add_to_cart' THEN 1 END) AS cart_adds
       FROM analytics_events
       WHERE product_id = ? AND DATE(created_at) BETWEEN ? AND ?
       GROUP BY DATE(created_at)
     ) ev ON ev.date = d.date
     LEFT JOIN (
       SELECT DATE(o.created_at) AS date,
         COUNT(DISTINCT o.id) AS orders,
         SUM(oi.line_total) AS revenue
       FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
       WHERE oi.product_id = ? AND DATE(o.created_at) BETWEEN ? AND ? AND o.status != 'cancelled'
       GROUP BY DATE(o.created_at)
     ) ord ON ord.date = d.date
     ORDER BY d.date ASC`,
    [
      productId,
      current.start,
      current.end,
      productId,
      current.start,
      current.end,
      productId,
      productId,
      current.start,
      current.end,
      productId,
      current.start,
      current.end,
    ],
  );

  // Variant breakdown
  const [variantStats] = await pool.query(
    `SELECT 
      pv.id, pv.attribute_name, pv.value, pv.sku, pv.price, pv.stock,
      COALESCE(ev.views, 0) AS views,
      COALESCE(ev.cart_adds, 0) AS cart_adds,
      COALESCE(ord.units_sold, 0) AS units_sold,
      COALESCE(ord.revenue, 0) AS revenue
     FROM product_variants pv
     LEFT JOIN (
       SELECT variant_id,
         COUNT(CASE WHEN event_type = 'product_view' THEN 1 END) AS views,
         COUNT(CASE WHEN event_type = 'add_to_cart' THEN 1 END) AS cart_adds
       FROM analytics_events
       WHERE product_id = ? AND DATE(created_at) BETWEEN ? AND ? AND variant_id IS NOT NULL
       GROUP BY variant_id
     ) ev ON pv.id = ev.variant_id
     LEFT JOIN (
       SELECT oi.variant_id,
         SUM(oi.quantity) AS units_sold,
         SUM(oi.line_total) AS revenue
       FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
       WHERE oi.product_id = ? AND DATE(o.created_at) BETWEEN ? AND ? AND o.status != 'cancelled' AND oi.variant_id IS NOT NULL
       GROUP BY oi.variant_id
     ) ord ON pv.id = ord.variant_id
     WHERE pv.product_id = ?
     ORDER BY units_sold DESC, views DESC`,
    [
      productId,
      current.start,
      current.end,
      productId,
      current.start,
      current.end,
      productId,
    ],
  );

  // Associated search terms leading to this product
  const [searchTerms] = await pool.query(
    `SELECT search_query, COUNT(*) AS clicks
     FROM analytics_events
     WHERE product_id = ? AND search_query IS NOT NULL AND search_query != '' AND DATE(created_at) BETWEEN ? AND ?
     GROUP BY search_query
     ORDER BY clicks DESC
     LIMIT 10`,
    [productId, current.start, current.end],
  );

  // Micro funnel
  const [funnel] = await pool.query(
    `SELECT 
      COUNT(DISTINCT CASE WHEN event_type = 'product_view' THEN session_id END) AS step_views,
      COUNT(DISTINCT CASE WHEN event_type = 'add_to_cart' THEN session_id END) AS step_cart,
      (
        SELECT COUNT(DISTINCT o.id)
        FROM order_items oi
        JOIN orders o ON o.id = oi.order_id
        WHERE oi.product_id = ? AND DATE(o.created_at) BETWEEN ? AND ? AND o.status != 'cancelled'
      ) AS step_purchased
     FROM analytics_events
     WHERE product_id = ? AND DATE(created_at) BETWEEN ? AND ?`,
    [
      productId,
      current.start,
      current.end,
      productId,
      current.start,
      current.end,
    ],
  );

  res.json({
    product: toCamelCase(product),
    dailyTrend: toCamelCaseAll(dailyTrend).map((d) => ({
      ...d,
      views: Number(d.views),
      cartAdds: Number(d.cartAdds),
      purchases: Number(d.purchases),
      revenue: Number(d.revenue),
    })),
    variants: toCamelCaseAll(variantStats).map((v) => ({
      ...v,
      views: Number(v.views),
      cartAdds: Number(v.cartAdds),
      unitsSold: Number(v.unitsSold),
      revenue: Number(v.revenue),
      price: Number(v.price),
    })),
    searchKeywords: toCamelCaseAll(searchTerms).map((s) => ({
      searchQuery: s.searchQuery,
      clicks: Number(s.clicks),
    })),
    funnel: {
      views: Number(funnel[0]?.step_views || 0),
      cartAdds: Number(funnel[0]?.step_cart || 0),
      purchases: Number(funnel[0]?.step_purchased || 0),
    },
  });
});

/**
 * Admin: Marketing Intelligence & Attribution
 * GET /api/analytics/marketing/intelligence
 */
export const getMarketingIntelligence = asyncHandler(async (req, res) => {
  const { range = "30d", startDate, endDate } = req.query;
  const { current } = resolveDateRanges(range, startDate, endDate);

  // 1. UTM Campaigns
  const [campaignStats] = await pool.query(
    `SELECT 
      COALESCE(s.utm_campaign, '(direct / none)') AS campaign,
      COALESCE(s.utm_source, '(direct)') AS source,
      COALESCE(s.utm_medium, '(none)') AS medium,
      COUNT(DISTINCT s.session_id) AS sessions,
      COUNT(DISTINCT COALESCE(s.customer_id, s.anonymous_session_id)) AS visitors,
      COALESCE(ord.orders_count, 0) AS orders_count,
      COALESCE(ord.revenue, 0) AS revenue,
      CASE 
        WHEN COUNT(DISTINCT s.session_id) > 0 THEN ROUND((COALESCE(ord.orders_count, 0) / COUNT(DISTINCT s.session_id)) * 100, 2)
        ELSE 0
      END AS conversion_rate
     FROM customer_sessions s
     LEFT JOIN (
       SELECT 
         ev.session_id,
         COUNT(DISTINCT o.id) AS orders_count,
         SUM(o.total) AS revenue
       FROM analytics_events ev
       JOIN orders o ON ev.order_id = o.id AND o.status != 'cancelled'
       WHERE DATE(o.created_at) BETWEEN ? AND ?
       GROUP BY ev.session_id
     ) ord ON s.session_id = ord.session_id
     WHERE DATE(s.started_at) BETWEEN ? AND ?
     GROUP BY s.utm_campaign, s.utm_source, s.utm_medium, ord.orders_count, ord.revenue
     ORDER BY sessions DESC
     LIMIT 30`,
    [current.start, current.end, current.start, current.end],
  );

  // 2. Referrers
  const [referrers] = await pool.query(
    `SELECT 
      COALESCE(NULLIF(referrer, ''), 'Direct / Bookmark') AS referrer,
      COUNT(DISTINCT session_id) AS sessions,
      COUNT(DISTINCT COALESCE(customer_id, anonymous_session_id)) AS visitors
     FROM customer_sessions
     WHERE DATE(started_at) BETWEEN ? AND ?
     GROUP BY referrer
     ORDER BY sessions DESC
     LIMIT 20`,
    [current.start, current.end],
  );

  res.json({
    campaigns: toCamelCaseAll(campaignStats).map((c) => ({
      ...c,
      sessions: Number(c.sessions),
      visitors: Number(c.visitors),
      ordersCount: Number(c.ordersCount),
      revenue: Number(c.revenue),
      conversionRate: Number(c.conversionRate),
    })),
    referrers: toCamelCaseAll(referrers).map((r) => ({
      ...r,
      sessions: Number(r.sessions),
      visitors: Number(r.visitors),
    })),
  });
});

/**
 * Admin: Export Analytics Data as CSV
 * GET /api/analytics/export/:type
 */
export const exportAnalyticsCSV = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const { range = "30d", startDate, endDate } = req.query;
  const { current } = resolveDateRanges(range, startDate, endDate);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="marksbiotech-${type}-${current.start}-to-${current.end}.csv"`,
  );

  if (type === "products") {
    const [rows] = await pool.query(
      `SELECT 
        p.id, p.name, p.sku, p.price, p.stock,
        b.name AS brand,
        c.name AS category,
        COALESCE(ev.views, 0) AS views,
        COALESCE(ev.unique_viewers, 0) AS unique_viewers,
        COALESCE(ev.cart_adds, 0) AS cart_adds,
        COALESCE(ord.orders_count, 0) AS orders,
        COALESCE(ord.units_sold, 0) AS units_sold,
        COALESCE(ord.revenue, 0) AS revenue
       FROM products p
       LEFT JOIN brands b ON p.brand_id = b.id
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN (
         SELECT product_id, COUNT(*) AS views, COUNT(DISTINCT session_id) AS unique_viewers, COUNT(CASE WHEN event_type = 'add_to_cart' THEN 1 END) AS cart_adds FROM analytics_events WHERE DATE(created_at) BETWEEN ? AND ? GROUP BY product_id
       ) ev ON p.id = ev.product_id
       LEFT JOIN (
         SELECT oi.product_id, COUNT(DISTINCT o.id) AS orders_count, SUM(oi.quantity) AS units_sold, SUM(oi.line_total) AS revenue FROM order_items oi JOIN orders o ON o.id = oi.order_id WHERE DATE(o.created_at) BETWEEN ? AND ? AND o.status != 'cancelled' GROUP BY oi.product_id
       ) ord ON p.id = ord.product_id
       ORDER BY views DESC`,
      [current.start, current.end, current.start, current.end],
    );

    let csv =
      "ID,Name,SKU,Brand,Category,Price,Stock,Views,Unique Viewers,Cart Adds,Orders,Units Sold,Revenue\n";
    rows.forEach((r) => {
      csv += `"${r.id}","${(r.name || "").replace(/"/g, '""')}","${r.sku || ""}","${r.brand || ""}","${r.category || ""}","${r.price}","${r.stock}","${r.views}","${r.unique_viewers}","${r.cart_adds}","${r.orders}","${r.units_sold}","${r.revenue}"\n`;
    });
    return res.send(csv);
  }

  if (type === "search") {
    const [rows] = await pool.query(
      `SELECT search_query, COUNT(*) AS searches, COUNT(DISTINCT session_id) AS unique_users 
       FROM analytics_events 
       WHERE search_query IS NOT NULL AND search_query != '' AND DATE(created_at) BETWEEN ? AND ?
       GROUP BY search_query 
       ORDER BY searches DESC`,
      [current.start, current.end],
    );
    let csv = "Search Term,Total Searches,Unique Users\n";
    rows.forEach((r) => {
      csv += `"${(r.search_query || "").replace(/"/g, '""')}","${r.searches}","${r.unique_users}"\n`;
    });
    return res.send(csv);
  }

  return res.status(400).send("Invalid export type");
});

/**
 * Admin: Daily Aggregation Trigger
 */
export const triggerDailyAggregation = asyncHandler(async (req, res) => {
  const { date } = req.body;
  const result = await aggregateDailyProductAnalytics(date);
  res.json({ success: true, ...result });
});

/**
 * Admin: Data Retention Purge Trigger
 */
export const triggerRetentionPurge = asyncHandler(async (req, res) => {
  const { retentionDays = 90 } = req.body;
  const result = await purgeExpiredEvents(retentionDays);
  res.json({ success: true, ...result });
});
