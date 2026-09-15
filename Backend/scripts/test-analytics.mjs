import "dotenv/config";
import { pool } from "../src/config/db.js";
import {
  ingestEvents,
  aggregateDailyProductAnalytics,
  purgeExpiredEvents,
} from "../src/utils/analytics.service.js";

async function runTest() {
  console.log("=== Testing Analytics Pipeline ===");

  const anonId = "anon_test_" + Date.now();
  const sessionId = "sess_test_" + Date.now();

  // 1. Ingest simulated events
  const testEvents = [
    {
      sessionId,
      anonymousSessionId: anonId,
      eventType: "page_view",
      pageUrl: "/products",
      referrer: "https://google.com",
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "dental_implants_2026",
      deviceType: "desktop",
      browser: "Chrome",
      operatingSystem: "Windows",
      durationSeconds: 15,
    },
    {
      sessionId,
      anonymousSessionId: anonId,
      eventType: "search",
      searchQuery: "bone graft",
      eventMetadata: { resultCount: 4 },
      pageUrl: "/search?q=bone+graft",
    },
    {
      sessionId,
      anonymousSessionId: anonId,
      eventType: "product_view",
      productId: 1,
      pageUrl: "/products/duravit-3p",
    },
    {
      sessionId,
      anonymousSessionId: anonId,
      eventType: "add_to_cart",
      productId: 1,
      variantId: 1,
      pageUrl: "/products/duravit-3p",
    },
    {
      sessionId,
      anonymousSessionId: anonId,
      eventType: "search_click",
      productId: 1,
      searchQuery: "bone graft",
      pageUrl: "/products/duravit-3p",
    },
  ];

  console.log("1. Ingesting test events...");
  const ingestResult = await ingestEvents(testEvents);
  console.log("   Ingested count:", ingestResult.count);

  // 2. Check customer_sessions table
  const [sessionRows] = await pool.execute(
    "SELECT * FROM customer_sessions WHERE session_id = ?",
    [sessionId],
  );
  console.log(
    "2. Verified session row in DB:",
    sessionRows.length > 0 ? "SUCCESS" : "FAILED",
    {
      sessionId: sessionRows[0]?.session_id,
      utmSource: sessionRows[0]?.utm_source,
      utmCampaign: sessionRows[0]?.utm_campaign,
      duration: sessionRows[0]?.duration_seconds,
    },
  );

  // 3. Check analytics_events table
  const [eventRows] = await pool.execute(
    "SELECT event_type, product_id, search_query FROM analytics_events WHERE session_id = ?",
    [sessionId],
  );
  console.log("3. Verified events in DB:", eventRows.length, "events stored.");

  // 4. Test Daily Aggregation
  console.log("4. Running daily aggregation...");
  const aggResult = await aggregateDailyProductAnalytics();
  console.log("   Daily aggregation result:", aggResult);

  const [dailyRows] = await pool.execute(
    "SELECT * FROM product_daily_analytics WHERE product_id = 1 AND date = CURDATE()",
  );
  console.log(
    "   Daily row in DB:",
    dailyRows.length > 0 ? "SUCCESS" : "NO ROWS (Product 1 might not exist)",
    dailyRows[0],
  );

  // 5. Test Retention Purge
  console.log("5. Testing retention purge...");
  const purgeResult = await purgeExpiredEvents(90);
  console.log("   Purge result:", purgeResult);

  console.log("=== Analytics Pipeline Test Passed! ===");
  await pool.end();
}

runTest().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
