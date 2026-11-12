import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { toCamelCaseAll } from "../utils/camelCase.js";

// Manual stock adjustment: type is "in" (restock), "out" (damage/sale outside
// the system), or "adjustment" (correction, quantity can be negative).
// When variantId is given, the adjustment applies to that variant's own
// stock (the figure checkout actually decrements for variant products)
// instead of the product's stock column.
export const adjustStock = asyncHandler(async (req, res) => {
  const { productId, variantId = null, type, quantity, reason = "" } = req.body;
  if (!productId || !type || quantity === undefined) {
    return res.status(400).json({ error: "productId, type and quantity are required" });
  }
  if (!["in", "out", "adjustment"].includes(type)) {
    return res.status(400).json({ error: "type must be 'in', 'out' or 'adjustment'" });
  }

  const qty = Number(quantity);
  const delta = type === "out" ? -Math.abs(qty) : qty;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const table = variantId ? "product_variants" : "products";
    const targetId = variantId || productId;

    let currentStock;
    if (variantId) {
      const [variantRows] = await conn.execute(
        "SELECT stock FROM product_variants WHERE id = ? AND product_id = ? FOR UPDATE",
        [variantId, productId]
      );
      if (variantRows.length === 0) {
        await conn.rollback();
        return res.status(404).json({ error: "Variant not found for this product" });
      }
      currentStock = variantRows[0].stock;
    } else {
      const [rows] = await conn.execute("SELECT stock FROM products WHERE id = ? FOR UPDATE", [productId]);
      if (rows.length === 0) {
        await conn.rollback();
        return res.status(404).json({ error: "Product not found" });
      }
      currentStock = rows[0].stock;
    }

    const newStock = currentStock + delta;
    if (newStock < 0) {
      await conn.rollback();
      return res.status(409).json({ error: "Adjustment would result in negative stock" });
    }

    await conn.execute(`UPDATE ${table} SET stock = ? WHERE ${idColumn} = ?`, [newStock, targetId]);
    const [logResult] = await conn.execute(
      `INSERT INTO inventory_logs (product_id, variant_id, type, quantity, delta, reason, adjusted_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [productId, variantId || null, type, qty, delta, reason, req.user.id]
    );

    await conn.commit();
    res.status(201).json({ id: logResult.insertId, productId, variantId: variantId || null, newStock });
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
});

export const listInventoryLogs = asyncHandler(async (req, res) => {
  const { productId } = req.query;
  const conditions = [];
  const params = [];
  if (productId) { conditions.push("l.product_id = ?"); params.push(productId); }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const [rows] = await pool.query(
    `SELECT l.*, p.name AS product_name, v.value AS variant_value
     FROM inventory_logs l
     JOIN products p ON p.id = l.product_id
     LEFT JOIN product_variants v ON v.id = l.variant_id
     ${where}
     ORDER BY l.created_at DESC
     LIMIT 200`,
    params
  );
  res.json(toCamelCaseAll(rows));
});

export const getStockSettings = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    "SELECT setting_value FROM store_settings WHERE setting_key = 'stock_management'"
  );
  const enabled = rows.length > 0 ? rows[0].setting_value === "1" : false;
  res.json({ stockManagementEnabled: enabled });
});

export const updateStockSettings = asyncHandler(async (req, res) => {
  const { enabled } = req.body;
  const val = enabled ? "1" : "0";
  await pool.execute(
    `INSERT INTO store_settings (setting_key, setting_value)
     VALUES ('stock_management', ?)
     ON DUPLICATE KEY UPDATE setting_value = ?`,
    [val, val]
  );
  res.json({ stockManagementEnabled: Boolean(enabled) });
});
