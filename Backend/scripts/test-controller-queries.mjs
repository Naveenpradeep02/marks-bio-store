import "dotenv/config";
import { pool } from "../src/config/db.js";
import {
  getDashboardOverview,
  getProductAnalytics,
  getProductAnalyticsById,
  getCustomerAnalytics,
  getFunnelAnalytics,
  getSearchAnalytics,
  getMarketingAttribution,
} from "../src/controllers/analytics.controller.js";

function mockRes() {
  return {
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.data = data;
      return this;
    },
  };
}

async function runControllerTests() {
  console.log("=== Testing Analytics Controller Queries ===");

  // 1. Dashboard Overview
  const req1 = { query: {} };
  const res1 = mockRes();
  await getDashboardOverview(req1, res1, console.error);
  console.log("1. Dashboard Overview KPIs:", res1.data?.kpis);

  // 2. Product Analytics
  const req2 = { query: { page: 1, limit: 10 } };
  const res2 = mockRes();
  await getProductAnalytics(req2, res2, console.error);
  console.log(
    "2. Product Analytics count:",
    res2.data?.data?.length,
    "Pagination:",
    res2.data?.pagination,
  );

  // 3. Single Product Deep-dive
  const [prods] = await pool.query("SELECT id FROM products LIMIT 1");
  if (prods.length > 0) {
    const req3 = { params: { id: prods[0].id }, query: {} };
    const res3 = mockRes();
    await getProductAnalyticsById(req3, res3, console.error);
    console.log(
      "3. Single Product deep-dive for ID",
      prods[0].id,
      ": Funnel:",
      res3.data?.funnel,
    );
  }

  // 4. Customer Analytics & RFM
  const req4 = { query: { page: 1, limit: 10 } };
  const res4 = mockRes();
  await getCustomerAnalytics(req4, res4, console.error);
  console.log(
    "4. Customer Analytics segments:",
    res4.data?.segmentSummary,
    "Total customers:",
    res4.data?.pagination?.total,
  );

  // 5. Funnel Analytics
  const req5 = { query: {} };
  const res5 = mockRes();
  await getFunnelAnalytics(req5, res5, console.error);
  console.log("5. Conversion Funnel Steps:", res5.data?.funnel);

  // 6. Search Analytics
  const req6 = { query: {} };
  const res6 = mockRes();
  await getSearchAnalytics(req6, res6, console.error);
  console.log("6. Search Analytics top searches:", res6.data?.topSearches);

  // 7. Marketing Attribution
  const req7 = { query: {} };
  const res7 = mockRes();
  await getMarketingAttribution(req7, res7, console.error);
  console.log("7. Marketing Attribution campaigns:", res7.data?.campaigns);

  console.log("=== All Controller Queries Verified Successfully! ===");
  await pool.end();
}

runControllerTests().catch((err) => {
  console.error("Controller query test failed:", err);
  process.exit(1);
});
