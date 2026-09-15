import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const TAX_RATE = 0.18; // GST, applied on subtotal

function serializeOrder(order, items) {
  return {
    id: order.id,
    orderNumber: order.order_number,
    customerId: order.user_id,
    customerEmail: order.customer_email,
    subtotal: Number(order.subtotal),
    tax: Number(order.tax),
    total: Number(order.total),
    status: order.status,
    shippingAddress: {
      line1: order.shipping_line1,
      line2: order.shipping_line2,
      city: order.shipping_city,
      state: order.shipping_state,
      pincode: order.shipping_pincode,
      phone: order.shipping_phone,
    },
    items: items || [],
    createdAt: order.created_at,
    updatedAt: order.updated_at,
  };
}

// Customer: place an order from their cart. Validates stock, decrements it,
// and snapshots product name/price at time of purchase, all in one transaction.
export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress = {} } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "items array is required" });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const lineItems = [];
    for (const item of items) {
      const requestedQty = Number(item.quantity) || 0;
      if (requestedQty <= 0) {
        throw Object.assign(new Error(`Invalid quantity for product ${item.productId}`), { status: 409 });
      }

      const [rows] = await conn.execute("SELECT * FROM products WHERE id = ? FOR UPDATE", [item.productId]);
      if (rows.length === 0) {
        throw Object.assign(new Error(`Product ${item.productId} not found`), { status: 409 });
      }
      const product = rows[0];

      let variant = null;
      if (item.variantId) {
        const [variantRows] = await conn.execute(
          "SELECT * FROM product_variants WHERE id = ? AND product_id = ? FOR UPDATE",
          [item.variantId, item.productId]
        );
        if (variantRows.length === 0) {
          throw Object.assign(new Error(`Variant ${item.variantId} not found for product ${item.productId}`), { status: 409 });
        }
        variant = variantRows[0];
      }

      const stock = variant ? variant.stock : product.stock;
      const price = variant ? variant.price : product.price;
      const sku = variant ? variant.sku : product.sku;
      if (stock < requestedQty) {
        throw Object.assign(new Error(`${product.name} does not have enough stock`), { status: 409 });
      }

      lineItems.push({
        productId: product.id,
        variantId: variant ? variant.id : null,
        name: variant ? `${product.name} — ${variant.value}` : product.name,
        sku: sku || "",
        price: Number(price),
        quantity: requestedQty,
        lineTotal: Number(price) * requestedQty,
      });
    }

    const subtotal = lineItems.reduce((sum, i) => sum + i.lineTotal, 0);
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;

    const [orderResult] = await conn.execute(
      `INSERT INTO orders
        (order_number, user_id, customer_email, subtotal, tax, total, status,
         shipping_line1, shipping_line2, shipping_city, shipping_state, shipping_pincode, shipping_phone)
       VALUES ('PENDING', ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        req.user.email,
        subtotal,
        tax,
        total,
        shippingAddress.line1 || "",
        shippingAddress.line2 || "",
        shippingAddress.city || "",
        shippingAddress.state || "",
        shippingAddress.pincode || "",
        shippingAddress.phone || "",
      ]
    );
    const orderId = orderResult.insertId;
    const orderNumber = `ORD-${String(orderId).padStart(6, "0")}`;
    await conn.execute("UPDATE orders SET order_number = ? WHERE id = ?", [orderNumber, orderId]);

    for (const item of lineItems) {
      await conn.execute(
        `INSERT INTO order_items (order_id, product_id, variant_id, name, sku, price, quantity, line_total)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [orderId, item.productId, item.variantId, item.name, item.sku, item.price, item.quantity, item.lineTotal]
      );
      if (item.variantId) {
        await conn.execute("UPDATE product_variants SET stock = stock - ? WHERE id = ?", [item.quantity, item.variantId]);
      } else {
        await conn.execute("UPDATE products SET stock = stock - ? WHERE id = ?", [item.quantity, item.productId]);
      }
      await conn.execute(
        `INSERT INTO inventory_logs (product_id, type, quantity, delta, reason, adjusted_by)
         VALUES (?, 'out', ?, ?, ?, ?)`,
        [item.productId, item.quantity, -item.quantity, `Sold via order ${orderNumber}`, req.user.id]
      );
    }

    await conn.commit();

    const [orderRow] = await conn.execute("SELECT * FROM orders WHERE id = ?", [orderId]);
    res.status(201).json(serializeOrder(orderRow[0], lineItems));
  } catch (err) {
    await conn.rollback();
    if (err.status) return res.status(err.status).json({ error: err.message });
    throw err;
  } finally {
    conn.release();
  }
});

async function itemsForOrders(orderIds) {
  if (orderIds.length === 0) return {};
  const [rows] = await pool.query("SELECT * FROM order_items WHERE order_id IN (?)", [orderIds]);
  const byOrder = {};
  for (const row of rows) {
    (byOrder[row.order_id] ||= []).push({
      productId: row.product_id,
      variantId: row.variant_id,
      name: row.name,
      sku: row.sku,
      price: Number(row.price),
      quantity: row.quantity,
      lineTotal: Number(row.line_total),
    });
  }
  return byOrder;
}

export const listMyOrders = asyncHandler(async (req, res) => {
  const [orders] = await pool.execute(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [req.user.id]
  );
  const itemsByOrder = await itemsForOrders(orders.map((o) => o.id));
  res.json(orders.map((o) => serializeOrder(o, itemsByOrder[o.id])));
});

export const listOrders = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const where = status ? "WHERE status = ?" : "";
  const params = status ? [status] : [];
  const [orders] = await pool.query(`SELECT * FROM orders ${where} ORDER BY created_at DESC`, params);
  const itemsByOrder = await itemsForOrders(orders.map((o) => o.id));
  res.json(orders.map((o) => serializeOrder(o, itemsByOrder[o.id])));
});

export const getOrder = asyncHandler(async (req, res) => {
  const [orders] = await pool.execute("SELECT * FROM orders WHERE id = ?", [req.params.id]);
  if (orders.length === 0) return res.status(404).json({ error: "Order not found" });

  const order = orders[0];
  if (req.user.role !== "admin" && order.user_id !== req.user.id) {
    return res.status(403).json({ error: "Not your order" });
  }

  const itemsByOrder = await itemsForOrders([order.id]);
  res.json(serializeOrder(order, itemsByOrder[order.id]));
});

const VALID_STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of ${VALID_STATUSES.join(", ")}` });
  }
  const [existing] = await pool.execute("SELECT id FROM orders WHERE id = ?", [req.params.id]);
  if (existing.length === 0) return res.status(404).json({ error: "Order not found" });

  await pool.execute("UPDATE orders SET status = ? WHERE id = ?", [status, req.params.id]);
  res.json({ id: req.params.id, status });
});
