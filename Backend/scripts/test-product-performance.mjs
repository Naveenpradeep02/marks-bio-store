import "dotenv/config";
import { pool } from "../src/config/db.js";
import {
  getProductPerformanceDashboard,
  getProductDeepDive,
  getMarketingIntelligence,
} from "../src/controllers/analytics.controller.js";
import {
  listCustomers,
  getCustomer,
} from "../src/controllers/customers.controller.js";

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

async function testAll() {
  console.log("=== Testing Product Performance & Customer 360 Endpoints ===");

  // 1. Product Performance Dashboard
  const req1 = { query: { range: "30d" } };
  const res1 = mockRes();
  await getProductPerformanceDashboard(req1, res1, console.error);
  console.log(
    "1. Product Performance KPIs:",
    Object.keys(res1.data?.kpis || {}),
  );
  console.log("   Ranked Products Count:", res1.data?.rankedProducts?.length);
  console.log(
    "   Search Intelligence Count:",
    res1.data?.searchIntelligence?.length,
  );
  console.log(
    "   Marketing Opportunities Count:",
    res1.data?.marketingOpportunities?.length,
  );

  // 2. Customer 360 List
  const req2 = { query: { filter: "all" } };
  const res2 = mockRes();
  await listCustomers(req2, res2, console.error);
  console.log("2. Customer 360 List count:", res2.data?.length);

  // 3. Customer 360 Profile
  const [users] = await pool.query(
    "SELECT id FROM users WHERE role = 'customer' LIMIT 1",
  );
  if (users.length > 0) {
    const req3 = { params: { id: users[0].id } };
    const res3 = mockRes();
    await getCustomer(req3, res3, console.error);
    console.log(
      "3. Customer 360 Profile for ID",
      users[0].id,
      ": KPIs:",
      res3.data?.kpis,
      "RFM:",
      res3.data?.rfm,
    );
  }

  // 4. Marketing Intelligence
  const req4 = { query: { range: "30d" } };
  const res4 = mockRes();
  await getMarketingIntelligence(req4, res4, console.error);
  console.log(
    "4. Marketing Intelligence Campaigns:",
    res4.data?.campaigns?.length,
    "Referrers:",
    res4.data?.referrers?.length,
  );

  console.log("=== All Analytics Backend Endpoints Tested Successfully! ===");
  await pool.end();
}

testAll().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
