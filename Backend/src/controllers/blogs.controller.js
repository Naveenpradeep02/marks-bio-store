import { pool } from "../config/db.js";

// Helper to make URL slug
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

// GET /api/blogs - List blogs (status filter optional, default published for public)
export async function listBlogs(req, res, next) {
  try {
    const { status, category, search, limit = 50, offset = 0 } = req.query;

    let query = "SELECT * FROM blogs WHERE 1=1";
    const params = [];

    if (status && status !== "all") {
      query += " AND status = ?";
      params.push(status);
    } else if (!status) {
      // By default if called without status=all, show published
      query += " AND status = 'published'";
    }

    if (category) {
      query += " AND category = ?";
      params.push(category);
    }

    if (search) {
      query += " AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += " ORDER BY published_at DESC, id DESC LIMIT ? OFFSET ?";
    params.push(Number(limit), Number(offset));

    const [rows] = await pool.query(query, params);

    // Get total count
    let countQuery = "SELECT COUNT(*) as total FROM blogs WHERE 1=1";
    const countParams = [];
    if (status && status !== "all") {
      countQuery += " AND status = ?";
      countParams.push(status);
    } else if (!status) {
      countQuery += " AND status = 'published'";
    }
    if (category) {
      countQuery += " AND category = ?";
      countParams.push(category);
    }
    const [countResult] = await pool.query(countQuery, countParams);

    res.json({
      blogs: rows,
      total: countResult[0]?.total || rows.length,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/blogs/:identifier - Single blog by ID or Slug
export async function getBlog(req, res, next) {
  try {
    const { identifier } = req.params;
    const isNumeric = /^\d+$/.test(identifier);

    let query = isNumeric
      ? "SELECT * FROM blogs WHERE id = ?"
      : "SELECT * FROM blogs WHERE slug = ?";
    let [rows] = await pool.query(query, [identifier]);

    if (!rows.length && !isNumeric) {
      // Try searching by slug with hyphens or prefix
      [rows] = await pool.query("SELECT * FROM blogs WHERE slug LIKE ? LIMIT 1", [`%${identifier}%`]);
    }

    if (!rows.length) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Increment view count
    await pool.query("UPDATE blogs SET view_count = view_count + 1 WHERE id = ?", [rows[0].id]);

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

// POST /api/blogs - Create blog post
export async function createBlog(req, res, next) {
  try {
    const {
      title,
      slug,
      excerpt = "",
      content = "",
      featured_image = "",
      featured_image_alt = "",
      category = "Clinical Insights",
      tags = "",
      author_name = "Marks Biotech Clinical Team",
      author_title = "Regenerative Specialists",
      author_avatar = "/assets/imgs/logo.webp",
      read_time = "4 min read",
      status = "published",
      meta_title = "",
      meta_description = "",
      meta_keywords = "",
      og_image = "",
      schema_markup = null,
      published_at = null,
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Blog title is required" });
    }

    const finalSlug = slug ? slugify(slug) : slugify(title);
    const pubDate = published_at || (status === "published" ? new Date() : null);

    const [result] = await pool.query(
      `INSERT INTO blogs (
        title, slug, excerpt, content, featured_image, featured_image_alt,
        category, tags, author_name, author_title, author_avatar, read_time,
        status, meta_title, meta_description, meta_keywords, og_image,
        schema_markup, published_at, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        title,
        finalSlug,
        excerpt,
        content,
        featured_image,
        featured_image_alt || title,
        category,
        tags,
        author_name,
        author_title,
        author_avatar,
        read_time,
        status,
        meta_title || title,
        meta_description || excerpt,
        meta_keywords,
        og_image || featured_image,
        schema_markup ? JSON.stringify(schema_markup) : null,
        pubDate,
      ]
    );

    const [created] = await pool.query("SELECT * FROM blogs WHERE id = ?", [result.insertId]);
    res.status(201).json(created[0]);
  } catch (err) {
    next(err);
  }
}

// PUT /api/blogs/:id - Update blog post
export async function updateBlog(req, res, next) {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      featured_image_alt,
      category,
      tags,
      author_name,
      author_title,
      author_avatar,
      read_time,
      status,
      meta_title,
      meta_description,
      meta_keywords,
      og_image,
      schema_markup,
      blocks_json,
      published_at,
    } = req.body;

    const finalSlug = slug ? slugify(slug) : undefined;

    await pool.query(
      `UPDATE blogs SET
        title = COALESCE(?, title),
        slug = COALESCE(?, slug),
        excerpt = COALESCE(?, excerpt),
        content = COALESCE(?, content),
        blocks_json = COALESCE(?, blocks_json),
        featured_image = COALESCE(?, featured_image),
        featured_image_alt = COALESCE(?, featured_image_alt),
        category = COALESCE(?, category),
        tags = COALESCE(?, tags),
        author_name = COALESCE(?, author_name),
        author_title = COALESCE(?, author_title),
        author_avatar = COALESCE(?, author_avatar),
        read_time = COALESCE(?, read_time),
        status = COALESCE(?, status),
        meta_title = COALESCE(?, meta_title),
        meta_description = COALESCE(?, meta_description),
        meta_keywords = COALESCE(?, meta_keywords),
        og_image = COALESCE(?, og_image),
        schema_markup = COALESCE(?, schema_markup),
        published_at = COALESCE(?, published_at),
        updated_at = NOW()
      WHERE id = ?`,
      [
        title,
        finalSlug,
        excerpt,
        content,
        blocks_json !== undefined ? (typeof blocks_json === "string" ? blocks_json : JSON.stringify(blocks_json)) : null,
        featured_image,
        featured_image_alt,
        category,
        tags,
        author_name,
        author_title,
        author_avatar,
        read_time,
        status,
        meta_title,
        meta_description,
        meta_keywords,
        og_image,
        schema_markup ? JSON.stringify(schema_markup) : undefined,
        published_at,
        id,
      ]
    );

    const [updated] = await pool.query("SELECT * FROM blogs WHERE id = ?", [id]);
    if (!updated.length) return res.status(404).json({ error: "Blog post not found" });
    res.json(updated[0]);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/blogs/:id/status - Toggle blog post status
export async function toggleBlogStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["published", "draft", "archived"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    await pool.query(
      "UPDATE blogs SET status = ?, updated_at = NOW() WHERE id = ?",
      [status, id]
    );

    const [updated] = await pool.query("SELECT * FROM blogs WHERE id = ?", [id]);
    res.json(updated[0]);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/blogs/:id - Delete blog post
export async function deleteBlog(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM blogs WHERE id = ?", [id]);
    res.json({ success: true, message: "Blog post deleted" });
  } catch (err) {
    next(err);
  }
}
