import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { toCamelCase, toCamelCaseAll } from "../utils/camelCase.js";

export const listCategories = asyncHandler(async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM categories ORDER BY parent_id IS NOT NULL, name");
  const flat = toCamelCaseAll(rows);

  if (req.query.tree !== "true") {
    return res.json(flat);
  }

  const mains = flat.filter((c) => c.parentId === null);
  const tree = mains.map((main) => ({
    ...main,
    subcategories: flat.filter((c) => c.parentId === main.id),
  }));
  res.json(tree);
});

export const getCategory = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM categories WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Category not found" });
  res.json(toCamelCase(rows[0]));
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description = "", parentId = null } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  if (parentId) {
    const [parent] = await pool.execute("SELECT id, parent_id FROM categories WHERE id = ?", [parentId]);
    if (parent.length === 0) return res.status(400).json({ error: "Parent category not found" });
    if (parent[0].parent_id !== null) {
      return res.status(400).json({ error: "A sub-category cannot itself have sub-categories" });
    }
  }

  const [existing] = await pool.execute(
    "SELECT id FROM categories WHERE name = ? AND parent_id <=> ?",
    [name, parentId || null]
  );
  if (existing.length > 0) {
    return res.status(409).json({ error: "A category with that name already exists at this level" });
  }

  const [result] = await pool.execute(
    "INSERT INTO categories (name, description, parent_id) VALUES (?, ?, ?)",
    [name, description, parentId || null]
  );
  res.status(201).json({ id: result.insertId });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { name, description, parentId } = req.body;
  const [existing] = await pool.execute("SELECT id, name, parent_id FROM categories WHERE id = ?", [req.params.id]);
  if (existing.length === 0) return res.status(404).json({ error: "Category not found" });

  if (parentId !== undefined && parentId) {
    if (Number(parentId) === Number(req.params.id)) {
      return res.status(400).json({ error: "A category cannot be its own parent" });
    }
    const [parent] = await pool.execute("SELECT id, parent_id FROM categories WHERE id = ?", [parentId]);
    if (parent.length === 0) return res.status(400).json({ error: "Parent category not found" });
    if (parent[0].parent_id !== null) {
      return res.status(400).json({ error: "A sub-category cannot itself have sub-categories" });
    }
    const [children] = await pool.execute("SELECT id FROM categories WHERE parent_id = ? LIMIT 1", [req.params.id]);
    if (children.length > 0) {
      return res.status(400).json({ error: "A main category with sub-categories cannot become a sub-category" });
    }
  }

  if (name !== undefined && name !== existing[0].name) {
    const effectiveParent = parentId !== undefined ? (parentId || null) : existing[0].parent_id;
    const [dupe] = await pool.execute(
      "SELECT id FROM categories WHERE name = ? AND parent_id <=> ? AND id != ?",
      [name, effectiveParent, req.params.id]
    );
    if (dupe.length > 0) {
      return res.status(409).json({ error: "A category with that name already exists at this level" });
    }
  }

  const fields = [];
  const values = [];
  if (name !== undefined) { fields.push("name = ?"); values.push(name); }
  if (description !== undefined) { fields.push("description = ?"); values.push(description); }
  if (parentId !== undefined) { fields.push("parent_id = ?"); values.push(parentId || null); }

  if (fields.length > 0) {
    values.push(req.params.id);
    await pool.execute(`UPDATE categories SET ${fields.join(", ")} WHERE id = ?`, values);
  }

  const [rows] = await pool.execute("SELECT * FROM categories WHERE id = ?", [req.params.id]);
  res.json(toCamelCase(rows[0]));
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const [existing] = await pool.execute("SELECT id FROM categories WHERE id = ?", [req.params.id]);
  if (existing.length === 0) return res.status(404).json({ error: "Category not found" });

  const [children] = await pool.execute("SELECT id FROM categories WHERE parent_id = ? LIMIT 1", [req.params.id]);
  if (children.length > 0) {
    return res.status(409).json({ error: "Cannot delete a main category that still has sub-categories" });
  }

  const [productsUsingCategory] = await pool.execute(
    "SELECT id FROM products WHERE category_id = ? LIMIT 1",
    [req.params.id]
  );
  if (productsUsingCategory.length > 0) {
    return res.status(409).json({ error: "Cannot delete a category that still has products" });
  }

  await pool.execute("DELETE FROM categories WHERE id = ?", [req.params.id]);
  res.status(204).send();
});
