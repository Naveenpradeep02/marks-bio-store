import PDFDocument from "pdfkit";

// Renders an invoice to a PDF and resolves with the resulting Buffer.
export function renderInvoicePdf(invoice) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(20).text("MarksBiotech", { continued: true }).fontSize(10);
    doc.moveDown(0.2).fontSize(10).text("Tax Invoice", { align: "right" });
    doc.moveDown();

    doc.fontSize(12).text(`Invoice #: ${invoice.invoiceNumber}`);
    doc.text(`Date: ${new Date(invoice.issuedAt).toLocaleDateString("en-IN")}`);
    doc.text(`Order #: ${invoice.orderId}`);
    doc.moveDown();

    doc.fontSize(12).text("Bill To:", { underline: true });
    doc.fontSize(10).text(invoice.customerName || invoice.customerEmail || "");
    if (invoice.billingAddress) {
      const a = invoice.billingAddress;
      doc.text([a.line1, a.line2, `${a.city}, ${a.state} - ${a.pincode}`].filter(Boolean).join(", "));
    }
    doc.moveDown();

    const tableTop = doc.y;
    doc.fontSize(10).font("Helvetica-Bold");
    doc.text("Item", 50, tableTop);
    doc.text("SKU", 220, tableTop);
    doc.text("Qty", 320, tableTop, { width: 40, align: "right" });
    doc.text("Price", 370, tableTop, { width: 70, align: "right" });
    doc.text("Total", 450, tableTop, { width: 90, align: "right" });
    doc.moveDown(0.5);
    doc.font("Helvetica");

    let y = doc.y;
    invoice.items.forEach((item) => {
      doc.text(item.name, 50, y, { width: 160 });
      doc.text(item.sku || "-", 220, y, { width: 90 });
      doc.text(String(item.quantity), 320, y, { width: 40, align: "right" });
      doc.text(`Rs. ${item.price.toFixed(2)}`, 370, y, { width: 70, align: "right" });
      doc.text(`Rs. ${item.lineTotal.toFixed(2)}`, 450, y, { width: 90, align: "right" });
      y += 20;
    });

    doc.moveTo(50, y + 5).lineTo(545, y + 5).stroke();
    y += 15;
    doc.text("Subtotal:", 350, y, { width: 90, align: "right" });
    doc.text(`Rs. ${invoice.subtotal.toFixed(2)}`, 450, y, { width: 90, align: "right" });
    y += 18;

    if (invoice.discountTotal > 0) {
      doc.fillColor("green");
      doc.text("Offers & Savings:", 330, y, { width: 110, align: "right" });
      doc.text(`-Rs. ${invoice.discountTotal.toFixed(2)}`, 450, y, { width: 90, align: "right" });
      doc.fillColor("black");
      y += 18;
    }

    doc.text("Tax (18% GST):", 350, y, { width: 90, align: "right" });
    doc.text(`Rs. ${invoice.tax.toFixed(2)}`, 450, y, { width: 90, align: "right" });
    y += 18;
    doc.font("Helvetica-Bold");
    doc.text("Total:", 350, y, { width: 90, align: "right" });
    doc.text(`Rs. ${invoice.total.toFixed(2)}`, 450, y, { width: 90, align: "right" });
    doc.font("Helvetica");

    doc.moveDown(3);
    doc.fontSize(9).fillColor("gray").text(
      `Status: ${invoice.status.toUpperCase()}`,
      { align: "left" }
    );

    doc.end();
  });
}
