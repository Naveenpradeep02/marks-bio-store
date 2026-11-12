import mysql from "mysql2/promise";
import * as offerEngine from "../src/services/offerEngine.service.js";
import { renderInvoicePdf } from "../src/utils/invoicePdf.js";

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "naveen@123",
  database: "marksbiotech",
  waitForConnections: true,
  connectionLimit: 10,
});

async function runCheckoutE2ETest() {
  console.log("==========================================================");
  console.log("   MARKS BIOTECH END-TO-END CHECKOUT & PDF INVOICE TEST   ");
  console.log("==========================================================\n");

  const conn = await pool.getConnection();
  try {
    // 1. Fetch available products
    const [products] = await conn.query("SELECT id, name, price, sku FROM products LIMIT 5");
    if (products.length < 2) throw new Error("At least 2 products needed in DB");

    const pA = products.find((p) => p.id === 28) || products[0];
    const pB = products.find((p) => p.id === 46) || products[1];

    console.log(`Testing with Cart Items:`);
    console.log(`- 5x ${pA.name} @ ₹${pA.price}`);
    console.log(`- 3x ${pB.name} @ ₹${pB.price}`);

    const cartItems = [
      { productId: pA.id, quantity: 5, price: pA.price },
      { productId: pB.id, quantity: 3, price: pB.price },
    ];

    // 2. Authoritative Cart Calculation
    const result = await offerEngine.calculateCartOffers({
      items: cartItems,
      customerType: "retail",
      pool,
    });

    console.log(`\nCalculation Result:`);
    console.log(`- Subtotal: ₹${result.subtotal}`);
    console.log(`- Discount Total: ₹${result.discountTotal}`);
    console.log(`- Tax (18% GST on Net): ₹${result.tax}`);
    console.log(`- Final Total: ₹${result.total}`);
    console.log(
      `- Applied Offers (${result.appliedOffers.length}):`,
      result.appliedOffers.map((o) => `${o.title} (-₹${o.discountAmount})`)
    );

    // 3. Test PDF Invoice Generation with Discounts & 18% GST
    console.log("\nGenerating invoice PDF buffer with applied offer savings...");
    const invoiceData = {
      invoiceNumber: "INV-TEST-99999",
      issuedAt: new Date().toISOString(),
      orderId: 99999,
      customerName: "Dr. Ananya Sharma",
      customerEmail: "ananya.sharma@apexdental.com",
      billingAddress: {
        line1: "Apex Dental Implant Clinic, MG Road",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560001",
      },
      items: result.items.map((i) => ({
        name: i.name,
        sku: i.sku || "N/A",
        quantity: i.quantity,
        price: i.originalPrice,
        lineTotal: i.lineTotal,
      })),
      subtotal: result.subtotal,
      discountTotal: result.discountTotal,
      tax: result.tax,
      total: result.total,
      status: "paid",
    };

    const pdfBuffer = await renderInvoicePdf(invoiceData);
    console.log(`✅ Invoice PDF generated successfully! Buffer length: ${pdfBuffer.length} bytes.`);

    console.log("\n==========================================================");
    console.log("   ALL CHECKOUT & INVOICING PIPELINE TESTS PASSED 100%!   ");
    console.log("==========================================================");
  } catch (err) {
    console.error("❌ Checkout test error:", err);
    process.exit(1);
  } finally {
    conn.release();
    await pool.end();
  }
}

runCheckoutE2ETest();
