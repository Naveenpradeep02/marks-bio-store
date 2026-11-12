import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as offerEngine from "../services/offerEngine.service.js";

function serializeOrder(order, items) {
  let appliedOffers = [];
  try {
    appliedOffers =
      typeof order.applied_offers === "string"
        ? JSON.parse(order.applied_offers)
        : order.applied_offers || [];
  } catch {
    appliedOffers = [];
  }

  return {
    id: order.id,
    orderNumber: order.order_number,
    customerId: order.user_id,
    customerEmail: order.customer_email,
    subtotal: Number(order.subtotal),
    discountTotal: Number(order.discount_total || 0),
    tax: Number(order.tax),
    total: Number(order.total),
    appliedOffers,
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
// applies authoritative offer calculations, and records applied offers in one transaction.
export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress = {} } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "items array is required" });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    let stockManagementEnabled = false;
    try {
      const [settingRows] = await conn.execute(
        "SELECT setting_value FROM store_settings WHERE setting_key = 'stock_management'"
      );
      stockManagementEnabled =
        settingRows.length > 0 && settingRows[0].setting_value === "1";
    } catch {
      stockManagementEnabled = false;
    }

    // 1. Verify stock availability with lock
    for (const item of items) {
      const requestedQty = Number(item.quantity) || 0;
      if (requestedQty <= 0) {
        throw Object.assign(
          new Error(`Invalid quantity for product ${item.productId}`),
          { status: 409 }
        );
      }

      const [rows] = await conn.execute(
        "SELECT * FROM products WHERE id = ? FOR UPDATE",
        [item.productId]
      );
      if (rows.length === 0) {
        throw Object.assign(
          new Error(`Product ${item.productId} not found`),
          { status: 409 }
        );
      }
      const product = rows[0];

      let variant = null;
      if (item.variantId) {
        const [variantRows] = await conn.execute(
          "SELECT * FROM product_variants WHERE id = ? AND product_id = ? FOR UPDATE",
          [item.variantId, item.productId]
        );
        if (variantRows.length === 0) {
          throw Object.assign(
            new Error(
              `Variant ${item.variantId} not found for product ${item.productId}`
            ),
            { status: 409 }
          );
        }
        variant = variantRows[0];
      }

      const stock = variant ? variant.stock : product.stock;
      if (stockManagementEnabled && stock < requestedQty) {
        throw Object.assign(
          new Error(`${product.name} does not have enough stock`),
          { status: 409 }
        );
      }
    }

    // 2. Authoritative Offer Engine evaluation
    const customerType = req.user.customerType || "retail";
    const calculation = await offerEngine.calculateCartOffers({
      items,
      customerType,
      pool: conn,
    });

    const subtotal = calculation.subtotal;
    const discountTotal = calculation.discountTotal;
    const tax = calculation.tax;
    const total = calculation.total;
    const appliedOffersJson = JSON.stringify(calculation.appliedOffers);

    // 3. Create Order
    const [orderResult] = await conn.execute(
      `INSERT INTO orders
        (order_number, user_id, customer_email, subtotal, discount_total, tax, total, applied_offers, status,
         shipping_line1, shipping_line2, shipping_city, shipping_state, shipping_pincode, shipping_phone)
       VALUES ('PENDING', ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        req.user.email,
        subtotal,
        discountTotal,
        tax,
        total,
        appliedOffersJson,
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
    await conn.execute("UPDATE orders SET order_number = ? WHERE id = ?", [
      orderNumber,
      orderId,
    ]);

    const serializedLineItems = [];

    // 4. Insert Order Items & adjust stock
    for (const item of calculation.items) {
      const appliedOfferId = item.appliedOffers?.[0]?.offerId || null;

      await conn.execute(
        `INSERT INTO order_items (
          order_id, product_id, variant_id, name, sku, original_price, price, discount, quantity, line_total, applied_offer_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.productId,
          item.variantId,
          item.name,
          item.sku,
          item.originalPrice,
          item.effectivePrice,
          item.lineDiscount,
          item.quantity,
          item.lineTotal,
          appliedOfferId,
        ]
      );

      serializedLineItems.push({
        productId: item.productId,
        variantId: item.variantId,
        name: item.name,
        sku: item.sku,
        originalPrice: item.originalPrice,
        price: item.effectivePrice,
        discount: item.lineDiscount,
        quantity: item.quantity,
        lineTotal: item.lineTotal,
        appliedOfferId,
      });

      if (stockManagementEnabled) {
        if (item.variantId) {
          await conn.execute(
            "UPDATE product_variants SET stock = GREATEST(0, stock - ?) WHERE id = ?",
            [item.quantity, item.variantId]
          );
        } else {
          await conn.execute(
            "UPDATE products SET stock = GREATEST(0, stock - ?) WHERE id = ?",
            [item.quantity, item.productId]
          );
        }
        await conn.execute(
          `INSERT INTO inventory_logs (product_id, type, quantity, delta, reason, adjusted_by)
           VALUES (?, 'out', ?, ?, ?, ?)`,
          [
            item.productId,
            item.quantity,
            -item.quantity,
            `Sold via order ${orderNumber}`,
            req.user.id,
          ]
        );
      }
    }

    // 5. Track Applied Offers & increment usage counters
    for (const appOffer of calculation.appliedOffers) {
      await conn.execute(
        `INSERT INTO applied_offer_records (offer_id, order_id, offer_code, offer_type, discount_amount)
         VALUES (?, ?, ?, ?, ?)`,
        [appOffer.id, orderId, appOffer.code, appOffer.offerType, appOffer.discountAmount]
      );

      await conn.execute(
        "UPDATE offers SET times_used = times_used + 1 WHERE id = ?",
        [appOffer.id]
      );
    }

    await conn.commit();

    const [orderRow] = await conn.execute("SELECT * FROM orders WHERE id = ?", [
      orderId,
    ]);
    res.status(201).json(serializeOrder(orderRow[0], serializedLineItems));
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
  const [rows] = await pool.query(
    "SELECT * FROM order_items WHERE order_id IN (?)",
    [orderIds]
  );
  const byOrder = {};
  for (const row of rows) {
    (byOrder[row.order_id] ||= []).push({
      id: row.id,
      productId: row.product_id,
      variantId: row.variant_id,
      name: row.name,
      sku: row.sku,
      originalPrice: Number(row.original_price || row.price),
      discount: Number(row.discount || 0),
      price: Number(row.price),
      quantity: row.quantity,
      lineTotal: Number(row.line_total),
      appliedOfferId: row.applied_offer_id,
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
  const [orders] = await pool.query(
    `SELECT * FROM orders ${where} ORDER BY created_at DESC`,
    params
  );
  const itemsByOrder = await itemsForOrders(orders.map((o) => o.id));
  res.json(orders.map((o) => serializeOrder(o, itemsByOrder[o.id])));
});

export const getOrder = asyncHandler(async (req, res) => {
  const [orders] = await pool.execute("SELECT * FROM orders WHERE id = ?", [
    req.params.id,
  ]);
  if (orders.length === 0)
    return res.status(404).json({ error: "Order not found" });

  const order = orders[0];
  if (req.user.role !== "admin" && order.user_id !== req.user.id) {
    return res.status(403).json({ error: "Not your order" });
  }

  const itemsByOrder = await itemsForOrders([order.id]);
  res.json(serializeOrder(order, itemsByOrder[order.id]));
});

const VALID_STATUSES = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: `status must be one of ${VALID_STATUSES.join(", ")}`,
    });
  }
  const [existing] = await pool.execute("SELECT id FROM orders WHERE id = ?", [
    req.params.id,
  ]);
  if (existing.length === 0)
    return res.status(404).json({ error: "Order not found" });

  await pool.execute("UPDATE orders SET status = ? WHERE id = ?", [
    status,
    req.params.id,
  ]);
  res.json({ id: req.params.id, status });
});
