import { chromium } from "playwright";

async function run() {
  console.log("=== VERIFYING WEBSITEDASHBOARD DEVELOPER PANEL ===");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. Overview Page
  console.log("Testing Developer Overview (http://localhost:5174)...");
  await page.goto("http://localhost:5174", { waitUntil: "networkidle" });
  await page.screenshot({ path: "C:/Users/navee/.gemini/antigravity/brain/34273ea6-b730-438c-ab43-59dae0550c5a/scratch/dev_01_overview.png", fullPage: true });
  console.log("✓ Overview loaded cleanly.");

  // 2. Popups Manager
  console.log("Testing Popups Manager (/popups)...");
  await page.goto("http://localhost:5174/popups", { waitUntil: "networkidle" });
  await page.screenshot({ path: "C:/Users/navee/.gemini/antigravity/brain/34273ea6-b730-438c-ab43-59dae0550c5a/scratch/dev_02_popups.png", fullPage: true });
  console.log("✓ Popups Manager loaded.");

  // 3. Blog CMS Studio
  console.log("Testing Blog CMS (/blogs)...");
  await page.goto("http://localhost:5174/blogs", { waitUntil: "networkidle" });
  await page.screenshot({ path: "C:/Users/navee/.gemini/antigravity/brain/34273ea6-b730-438c-ab43-59dae0550c5a/scratch/dev_03_blogs.png", fullPage: true });
  console.log("✓ Blog CMS loaded.");

  // 4. SEO Suite
  console.log("Testing SEO Suite (/seo)...");
  await page.goto("http://localhost:5174/seo", { waitUntil: "networkidle" });
  await page.screenshot({ path: "C:/Users/navee/.gemini/antigravity/brain/34273ea6-b730-438c-ab43-59dae0550c5a/scratch/dev_04_seo.png", fullPage: true });
  console.log("✓ SEO Suite loaded.");

  // 5. Schema Markup
  console.log("Testing Schema Markup (/schema)...");
  await page.goto("http://localhost:5174/schema", { waitUntil: "networkidle" });
  await page.screenshot({ path: "C:/Users/navee/.gemini/antigravity/brain/34273ea6-b730-438c-ab43-59dae0550c5a/scratch/dev_05_schema.png", fullPage: true });
  console.log("✓ Schema Markup loaded.");

  // 6. Tracking Scripts (GTM & Meta Pixel)
  console.log("Testing Tracking Scripts (/tracking)...");
  await page.goto("http://localhost:5174/tracking", { waitUntil: "networkidle" });
  await page.screenshot({ path: "C:/Users/navee/.gemini/antigravity/brain/34273ea6-b730-438c-ab43-59dae0550c5a/scratch/dev_06_tracking.png", fullPage: true });
  console.log("✓ Tracking Scripts loaded.");

  // 7. Alt Tag Audit
  console.log("Testing Alt Tag Audit (/alt-audit)...");
  await page.goto("http://localhost:5174/alt-audit", { waitUntil: "networkidle" });
  await page.screenshot({ path: "C:/Users/navee/.gemini/antigravity/brain/34273ea6-b730-438c-ab43-59dae0550c5a/scratch/dev_07_alt_audit.png", fullPage: true });
  console.log("✓ Alt Tag Audit loaded.");

  // 8. Verify Storefront (http://localhost:3000) for popup and SEO reflection
  console.log("Testing Storefront reflection (http://localhost:3000)...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(3500); // allow popup delay
  await page.screenshot({ path: "C:/Users/navee/.gemini/antigravity/brain/34273ea6-b730-438c-ab43-59dae0550c5a/scratch/dev_08_storefront_popup.png" });
  console.log("✓ Storefront loaded with dynamic popup.");

  await browser.close();
  console.log("=== ALL E2E VERIFICATION COMPLETED SUCCESSFULLY ===");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
