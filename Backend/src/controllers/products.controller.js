import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { toCamelCase } from "../utils/camelCase.js";

const PRODUCT_SELECT = `
  SELECT p.*,
         c.name AS category_name, c.parent_id AS main_category_id,
         mc.name AS main_category_name
  FROM products p
  LEFT JOIN categories c ON c.id = p.category_id
  LEFT JOIN categories mc ON mc.id = c.parent_id
`;

async function attachImagesAndVariants(rows) {
  if (rows.length === 0) return [];
  const ids = rows.map((r) => r.id);
  const [images] = await pool.query(
    `SELECT product_id, image_path FROM product_images WHERE product_id IN (?) ORDER BY sort_order, id`,
    [ids]
  );
  const [variants] = await pool.query(
    `SELECT * FROM product_variants WHERE product_id IN (?) ORDER BY sort_order, id`,
    [ids]
  );
  const imagesByProduct = {};
  for (const img of images) {
    (imagesByProduct[img.product_id] ||= []).push(img.image_path);
  }
  const variantsByProduct = {};
  for (const v of variants) {
    (variantsByProduct[v.product_id] ||= []).push({
      ...toCamelCase(v),
      price: Number(v.price),
    });
  }
  return rows.map((r) => {
    const camel = toCamelCase(r);
    return {
      ...camel,
      price: Number(r.price),
      images: imagesByProduct[r.id] || [],
      variants: variantsByProduct[r.id] || [],
    };
  });
}

export const listProducts = asyncHandler(async (req, res) => {
  const { brandId, categoryId, mainCategoryId, search } = req.query;
  const conditions = [];
  const params = [];

  if (brandId) { conditions.push("p.brand_id = ?"); params.push(brandId); }
  if (categoryId) { conditions.push("p.category_id = ?"); params.push(categoryId); }
  if (mainCategoryId) { conditions.push("(c.parent_id = ? OR c.id = ?)"); params.push(mainCategoryId, mainCategoryId); }
  if (search) {
    conditions.push("(p.name LIKE ? OR p.sku LIKE ?)");
    params.push(`%${search}%`, `%${search}%`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const [rows] = await pool.query(`${PRODUCT_SELECT} ${where} ORDER BY p.created_at DESC`, params);
  res.json(await attachImagesAndVariants(rows));
});

export const getProduct = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute(`${PRODUCT_SELECT} WHERE p.id = ?`, [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Product not found" });
  const withDetails = await attachImagesAndVariants(rows);
  res.json(withDetails[0]);
});

async function replaceVariants(conn, productId, variants) {
  await conn.execute("DELETE FROM product_variants WHERE product_id = ?", [productId]);
  for (let i = 0; i < variants.length; i++) {
    const v = variants[i];
    if (!v || !v.value) continue;
    await conn.execute(
      `INSERT INTO product_variants (product_id, attribute_name, value, sku, price, stock, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [productId, v.attributeName || "Size", v.value, v.sku || "", Number(v.price) || 0, Number(v.stock) || 0, i]
    );
  }
}

export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brandId = null,
    categoryId = null,
    slug = null,
    sku = "",
    price = 0,
    images = [],
    description = "",
    specifications = {},
    stock = 0,
    status = "active",
    variants = [],
  } = req.body;

  if (!name) return res.status(400).json({ error: "name is required" });

  if (slug) {
    const [existingSlug] = await pool.execute("SELECT id FROM products WHERE slug = ?", [slug]);
    if (existingSlug.length > 0) {
      return res.status(409).json({ error: "That slug is already in use by another product." });
    }
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.execute(
      `INSERT INTO products (name, brand_id, category_id, slug, sku, price, description, specifications, stock, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, brandId || null, categoryId || null, slug || null, sku, Number(price) || 0, description, JSON.stringify(specifications), Number(stock) || 0, status]
    );
    const productId = result.insertId;

    for (let i = 0; i < images.length; i++) {
      await conn.execute(
        "INSERT INTO product_images (product_id, image_path, sort_order) VALUES (?, ?, ?)",
        [productId, images[i], i]
      );
    }

    if (Array.isArray(variants) && variants.length > 0) {
      await replaceVariants(conn, productId, variants);
    }

    if (Number(stock) > 0) {
      await conn.execute(
        `INSERT INTO inventory_logs (product_id, type, quantity, delta, reason, adjusted_by)
         VALUES (?, 'in', ?, ?, 'Initial stock on product creation', ?)`,
        [productId, Number(stock), Number(stock), req.user.id]
      );
    }

    await conn.commit();
    res.status(201).json({ id: productId });
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
});

const EDITABLE_FIELDS = {
  name: "name",
  brandId: "brand_id",
  categoryId: "category_id",
  slug: "slug",
  sku: "sku",
  price: "price",
  description: "description",
  status: "status",
};

export const updateProduct = asyncHandler(async (req, res) => {
  const [existing] = await pool.execute("SELECT id FROM products WHERE id = ?", [req.params.id]);
  if (existing.length === 0) return res.status(404).json({ error: "Product not found" });

  if (req.body.slug) {
    const [existingSlug] = await pool.execute(
      "SELECT id FROM products WHERE slug = ? AND id != ?",
      [req.body.slug, req.params.id]
    );
    if (existingSlug.length > 0) {
      return res.status(409).json({ error: "That slug is already in use by another product." });
    }
  }

  const fields = [];
  const values = [];
  for (const [bodyKey, column] of Object.entries(EDITABLE_FIELDS)) {
    if (req.body[bodyKey] !== undefined) {
      fields.push(`${column} = ?`);
      values.push(bodyKey === "price" ? Number(req.body[bodyKey]) || 0 : req.body[bodyKey]);
    }
  }
  if (req.body.specifications !== undefined) {
    fields.push("specifications = ?");
    values.push(JSON.stringify(req.body.specifications));
  }

  if (fields.length > 0) {
    values.push(req.params.id);
    await pool.execute(`UPDATE products SET ${fields.join(", ")} WHERE id = ?`, values);
  }

  if (Array.isArray(req.body.images)) {
    await pool.execute("DELETE FROM product_images WHERE product_id = ?", [req.params.id]);
    for (let i = 0; i < req.body.images.length; i++) {
      await pool.execute(
        "INSERT INTO product_images (product_id, image_path, sort_order) VALUES (?, ?, ?)",
        [req.params.id, req.body.images[i], i]
      );
    }
  }

  if (Array.isArray(req.body.variants)) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await replaceVariants(conn, req.params.id, req.body.variants);
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  const [rows] = await pool.execute(`${PRODUCT_SELECT} WHERE p.id = ?`, [req.params.id]);
  res.json((await attachImagesAndVariants(rows))[0]);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const [existing] = await pool.execute("SELECT id FROM products WHERE id = ?", [req.params.id]);
  if (existing.length === 0) return res.status(404).json({ error: "Product not found" });

  const [orderedBefore] = await pool.execute(
    "SELECT id FROM order_items WHERE product_id = ? LIMIT 1",
    [req.params.id]
  );
  if (orderedBefore.length > 0) {
    return res.status(409).json({
      error: "Cannot delete a product that has order history. Set it to Inactive instead.",
    });
  }

  await pool.execute("DELETE FROM products WHERE id = ?", [req.params.id]);
  res.status(204).send();
});
