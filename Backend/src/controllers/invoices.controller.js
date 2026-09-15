import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { renderInvoicePdf } from "../utils/invoicePdf.js";

async function nextInvoiceNumber(conn) {
  const year = new Date().getFullYear();

  await conn.execute(
    "INSERT INTO invoice_counters (year, value) VALUES (?, 0) ON DUPLICATE KEY UPDATE year = year",
    [year]
  );
  const [rows] = await conn.execute("SELECT value FROM invoice_counters WHERE year = ? FOR UPDATE", [year]);
  const next = rows[0].value + 1;
  await conn.execute("UPDATE invoice_counters SET value = ? WHERE year = ?", [next, year]);

  return `INV-${year}-${String(next).padStart(5, "0")}`;
}

function serializeInvoice(inv, items) {
  return {
    id: inv.id,
    invoiceNumber: inv.invoice_number,
    orderId: inv.order_id,
    customerId: inv.user_id,
    customerName: inv.customer_name,
    customerEmail: inv.customer_email,
    billingAddress: {
      line1: inv.billing_line1,
      line2: inv.billing_line2,
      city: inv.billing_city,
      state: inv.billing_state,
      pincode: inv.billing_pincode,
    },
    items: (items || []).map((i) => ({
      name: i.name,
      sku: i.sku,
      price: Number(i.price),
      quantity: i.quantity,
      lineTotal: Number(i.line_total),
    })),
    subtotal: Number(inv.subtotal),
    tax: Number(inv.tax),
    total: Number(inv.total),
    status: inv.status,
    issuedAt: inv.issued_at,
  };
}

// Admin: generate an invoice for an existing order (idempotent per order).
export const createInvoice = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) return res.status(400).json({ error: "orderId is required" });

  const [existing] = await pool.execute("SELECT * FROM invoices WHERE order_id = ?", [orderId]);
  if (existing.length > 0) {
    const [items] = await pool.execute("SELECT * FROM order_items WHERE order_id = ?", [orderId]);
    return res.status(200).json({ ...serializeInvoice(existing[0], items), alreadyExisted: true });
  }

  const [orders] = await pool.execute("SELECT * FROM orders WHERE id = ?", [orderId]);
  if (orders.length === 0) return res.status(404).json({ error: "Order not found" });
  const order = orders[0];

  const [users] = await pool.execute("SELECT name FROM users WHERE id = ?", [order.user_id]);
  const [items] = await pool.execute("SELECT * FROM order_items WHERE order_id = ?", [orderId]);

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const invoiceNumber = await nextInvoiceNumber(conn);
    const issuedAt = new Date();

    const [result] = await conn.execute(
      `INSERT INTO invoices
        (invoice_number, order_id, user_id, customer_name, customer_email,
         billing_line1, billing_line2, billing_city, billing_state, billing_pincode,
         subtotal, tax, total, status, issued_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'unpaid', ?)`,
      [
        invoiceNumber,
        orderId,
        order.user_id,
        users[0]?.name || "",
        order.customer_email,
        order.shipping_line1,
        order.shipping_line2,
        order.shipping_city,
        order.shipping_state,
        order.shipping_pincode,
        order.subtotal,
        order.tax,
        order.total,
        issuedAt,
      ]
    );

    await conn.commit();
    const [rows] = await pool.execute("SELECT * FROM invoices WHERE id = ?", [result.insertId]);
    res.status(201).json(serializeInvoice(rows[0], items));
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
});

export const listInvoices = asyncHandler(async (req, res) => {
  const where = req.user.role === "admin" ? "" : "WHERE user_id = ?";
  const params = req.user.role === "admin" ? [] : [req.user.id];
  const [rows] = await pool.query(`SELECT * FROM invoices ${where} ORDER BY created_at DESC`, params);
  res.json(rows.map((r) => serializeInvoice(r)));
});

async function loadInvoiceOr403(req, res) {
  const [rows] = await pool.execute("SELECT * FROM invoices WHERE id = ?", [req.params.id]);
  if (rows.length === 0) {
    res.status(404).json({ error: "Invoice not found" });
    return null;
  }
  if (req.user.role !== "admin" && rows[0].user_id !== req.user.id) {
    res.status(403).json({ error: "Not your invoice" });
    return null;
  }
  return rows[0];
}

export const getInvoice = asyncHandler(async (req, res) => {
  const invoice = await loadInvoiceOr403(req, res);
  if (!invoice) return;
  const [items] = await pool.execute("SELECT * FROM order_items WHERE order_id = ?", [invoice.order_id]);
  res.json(serializeInvoice(invoice, items));
});

export const updateInvoiceStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!["unpaid", "paid", "cancelled"].includes(status)) {
    return res.status(400).json({ error: "status must be unpaid, paid or cancelled" });
  }
  const [existing] = await pool.execute("SELECT id FROM invoices WHERE id = ?", [req.params.id]);
  if (existing.length === 0) return res.status(404).json({ error: "Invoice not found" });

  await pool.execute("UPDATE invoices SET status = ? WHERE id = ?", [status, req.params.id]);
  res.json({ id: req.params.id, status });
});

export const downloadInvoicePdf = asyncHandler(async (req, res) => {
  const invoice = await loadInvoiceOr403(req, res);
  if (!invoice) return;
  const [items] = await pool.execute("SELECT * FROM order_items WHERE order_id = ?", [invoice.order_id]);

  const pdfBuffer = await renderInvoicePdf(serializeInvoice(invoice, items));
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="${invoice.invoice_number}.pdf"`);
  res.send(pdfBuffer);
});
