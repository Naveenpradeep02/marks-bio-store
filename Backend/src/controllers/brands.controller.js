import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { toCamelCase, toCamelCaseAll } from "../utils/camelCase.js";

export const listBrands = asyncHandler(async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM brands ORDER BY name");
  res.json(toCamelCaseAll(rows));
});

export const getBrand = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM brands WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Brand not found" });
  res.json(toCamelCase(rows[0]));
});

export const createBrand = asyncHandler(async (req, res) => {
  const { name, logoUrl = "", description = "" } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  const [result] = await pool.execute(
    "INSERT INTO brands (name, logo_url, description) VALUES (?, ?, ?)",
    [name, logoUrl, description]
  );
  res.status(201).json({ id: result.insertId });
});

export const updateBrand = asyncHandler(async (req, res) => {
  const { name, logoUrl, description } = req.body;
  const [existing] = await pool.execute("SELECT id FROM brands WHERE id = ?", [req.params.id]);
  if (existing.length === 0) return res.status(404).json({ error: "Brand not found" });

  const fields = [];
  const values = [];
  if (name !== undefined) { fields.push("name = ?"); values.push(name); }
  if (logoUrl !== undefined) { fields.push("logo_url = ?"); values.push(logoUrl); }
  if (description !== undefined) { fields.push("description = ?"); values.push(description); }

  if (fields.length > 0) {
    values.push(req.params.id);
    await pool.execute(`UPDATE brands SET ${fields.join(", ")} WHERE id = ?`, values);
  }

  const [rows] = await pool.execute("SELECT * FROM brands WHERE id = ?", [req.params.id]);
  res.json(toCamelCase(rows[0]));
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const [existing] = await pool.execute("SELECT id FROM brands WHERE id = ?", [req.params.id]);
  if (existing.length === 0) return res.status(404).json({ error: "Brand not found" });

  const [productsUsingBrand] = await pool.execute(
    "SELECT id FROM products WHERE brand_id = ? LIMIT 1",
    [req.params.id]
  );
  if (productsUsingBrand.length > 0) {
    return res.status(409).json({ error: "Cannot delete a brand that still has products" });
  }

  await pool.execute("DELETE FROM brands WHERE id = ?", [req.params.id]);
  res.status(204).send();
});
