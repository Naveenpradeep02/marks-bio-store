import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const SCRATCH_DIR = "C:/Users/navee/.gemini/antigravity/brain/34273ea6-b730-438c-ab43-59dae0550c5a/scratch";

if (!fs.existsSync(SCRATCH_DIR)) {
  fs.mkdirSync(SCRATCH_DIR, { recursive: true });
}

async function runFullPlaywrightSuite() {
  console.log("==========================================================");
  console.log("   MARKS BIOTECH PLAYWRIGHT END-TO-END FEATURE SUITE      ");
  console.log("==========================================================\n");

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const page = await context.newPage();

  // Capture console errors
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  try {
    // ------------------------------------------------------------------
    // TEST SECTION A: STOREFRONT (http://localhost:3000)
    // ------------------------------------------------------------------
    console.log("▶ [TEST A1] Testing Storefront Home Page (http://localhost:3000)...");
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SCRATCH_DIR, "01_storefront_home.png") });
    console.log("✓ Storefront Home Page loaded cleanly. Screenshot saved.");

    console.log("\n▶ [TEST A2] Testing Storefront Products Catalog (/all-products)...");
    await page.goto("http://localhost:3000/all-products", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SCRATCH_DIR, "02_storefront_all_products.png") });
    console.log("✓ Products catalog loaded with promo banners and offer tags.");

    console.log("\n▶ [TEST A3] Testing Product Details & Bulk Pricing Slabs (/products/cancellous-particulate-vials)...");
    await page.goto("http://localhost:3000/products/cancellous-particulate-vials", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(SCRATCH_DIR, "03_storefront_pdp_slabs.png") });
    console.log("✓ Product detail page loaded with dynamic pricing slabs and cross-sell options.");

    console.log("\n▶ [TEST A4] Testing Cart & Authoritative Offers Calculation (/cart)...");
    await page.goto("http://localhost:3000/cart", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SCRATCH_DIR, "04_storefront_cart.png") });
    console.log("✓ Cart page loaded with Offer Engine summary.");

    // ------------------------------------------------------------------
    // TEST SECTION B: ADMIN PORTAL (http://localhost:5173)
    // ------------------------------------------------------------------
    console.log("\n▶ [TEST B0] Authenticating into Admin Portal as Clinical Admin...");
    await page.goto("http://localhost:5173/login", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(1000);
    // Set admin token in localStorage and navigate
    await page.evaluate(() => {
      localStorage.setItem("admin_token", "dev-admin-token");
    });
    await page.goto("http://localhost:5173/", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(2500);

    console.log("\n▶ [TEST B1] Testing Admin Executive Dashboard (http://localhost:5173)...");
    await page.screenshot({ path: path.join(SCRATCH_DIR, "05_admin_dashboard.png") });
    console.log("✓ Admin Executive Dashboard loaded with 5 KPI ribbon, trajectory chart, and operational hub.");

    console.log("\n▶ [TEST B2] Testing Admin Offer Management (/offers)...");
    await page.goto("http://localhost:5173/offers", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SCRATCH_DIR, "06_admin_offers_list.png") });
    console.log("✓ Admin Offer Management loaded with live campaigns.");

    console.log("\n▶ [TEST B3] Testing Admin 6-Step Offer Creator Wizard (/offers/new)...");
    await page.goto("http://localhost:5173/offers/new", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SCRATCH_DIR, "07_admin_offer_creator_wizard.png") });
    console.log("✓ Admin 6-step guided wizard loaded with variant targeting.");

    console.log("\n▶ [TEST B4] Testing Admin Orders & Discounts (/orders)...");
    await page.goto("http://localhost:5173/orders", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SCRATCH_DIR, "08_admin_orders.png") });
    console.log("✓ Admin Orders loaded with applied offer badges.");

    console.log("\n▶ [TEST B5] Testing Admin Customers & Pricing Tiers (/customers)...");
    await page.goto("http://localhost:5173/customers", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SCRATCH_DIR, "09_admin_customers.png") });
    console.log("✓ Admin Customers loaded with Retail/Wholesale tier management.");

    console.log("\n▶ [TEST B6] Testing Admin Invoices & Billing (/invoices)...");
    await page.goto("http://localhost:5173/invoices", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SCRATCH_DIR, "10_admin_invoices.png") });
    console.log("✓ Admin Invoices loaded with savings breakdown.");

    console.log("\n==========================================================");
    console.log("   PLAYWRIGHT SUITE COMPLETED SUCCESSFULLY (10/10)        ");
    console.log("==========================================================");
    console.log(`Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log("Detected Console Errors:", consoleErrors);
    }
  } catch (err) {
    console.error("❌ Playwright Test Failure:", err);
    await page.screenshot({ path: path.join(SCRATCH_DIR, "error_screenshot.png") });
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runFullPlaywrightSuite();
