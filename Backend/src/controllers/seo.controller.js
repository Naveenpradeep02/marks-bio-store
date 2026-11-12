import { pool } from "../config/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// GET /api/seo/pages - List all pages SEO
export async function listPagesSeo(req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM page_seo ORDER BY page_path ASC"
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// GET /api/seo/pages/:id - Single page SEO
export async function getPageSeo(req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM page_seo WHERE id = ?",
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Page SEO record not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

// POST /api/seo/pages - Add new page to SEO
export async function createPageSeo(req, res, next) {
  try {
    const {
      page_path,
      page_name,
      meta_title,
      meta_description,
      meta_keywords = "",
      canonical_url = "",
      robots_directive = "index, follow",
      og_title = "",
      og_description = "",
      og_image = "",
      twitter_title = "",
      twitter_description = "",
      twitter_image = "",
      twitter_card = "summary_large_image",
      custom_schema = null,
      schema_type = "WebPage",
      custom_head_tags = "",
    } = req.body;

    if (!page_path || !page_name) {
      return res.status(400).json({ error: "Page path and name are required" });
    }

    const [existing] = await pool.query(
      "SELECT id FROM page_seo WHERE page_path = ?",
      [page_path]
    );
    if (existing.length) {
      return res.status(409).json({ error: "A record for this page path already exists" });
    }

    const [result] = await pool.query(
      `INSERT INTO page_seo (
        page_path, page_name, meta_title, meta_description, meta_keywords,
        canonical_url, robots_directive, og_title, og_description, og_image,
        twitter_title, twitter_description, twitter_image, twitter_card,
        custom_schema, schema_type, custom_head_tags, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        page_path,
        page_name,
        meta_title || `${page_name} | Marks Biotech`,
        meta_description || "",
        meta_keywords,
        canonical_url,
        robots_directive,
        og_title || meta_title,
        og_description || meta_description,
        og_image,
        twitter_title || og_title || meta_title,
        twitter_description || og_description || meta_description,
        twitter_image || og_image,
        twitter_card,
        custom_schema ? JSON.stringify(custom_schema) : null,
        schema_type,
        custom_head_tags,
      ]
    );

    const [created] = await pool.query("SELECT * FROM page_seo WHERE id = ?", [result.insertId]);
    res.status(201).json(created[0]);
  } catch (err) {
    next(err);
  }
}

// PUT /api/seo/pages/:id - Update page SEO
export async function updatePageSeo(req, res, next) {
  try {
    const { id } = req.params;
    const {
      page_name,
      meta_title,
      meta_description,
      meta_keywords,
      canonical_url,
      robots_directive,
      og_title,
      og_description,
      og_image,
      twitter_title,
      twitter_description,
      twitter_image,
      twitter_card,
      custom_schema,
      schema_type,
      custom_head_tags,
    } = req.body;

    await pool.query(
      `UPDATE page_seo SET
        page_name = COALESCE(?, page_name),
        meta_title = COALESCE(?, meta_title),
        meta_description = COALESCE(?, meta_description),
        meta_keywords = COALESCE(?, meta_keywords),
        canonical_url = COALESCE(?, canonical_url),
        robots_directive = COALESCE(?, robots_directive),
        og_title = COALESCE(?, og_title),
        og_description = COALESCE(?, og_description),
        og_image = COALESCE(?, og_image),
        twitter_title = COALESCE(?, twitter_title),
        twitter_description = COALESCE(?, twitter_description),
        twitter_image = COALESCE(?, twitter_image),
        twitter_card = COALESCE(?, twitter_card),
        custom_schema = COALESCE(?, custom_schema),
        schema_type = COALESCE(?, schema_type),
        custom_head_tags = COALESCE(?, custom_head_tags),
        updated_at = NOW()
      WHERE id = ?`,
      [
        page_name,
        meta_title,
        meta_description,
        meta_keywords,
        canonical_url,
        robots_directive,
        og_title,
        og_description,
        og_image,
        twitter_title,
        twitter_description,
        twitter_image,
        twitter_card,
        custom_schema ? JSON.stringify(custom_schema) : undefined,
        schema_type,
        custom_head_tags,
        id,
      ]
    );

    const [updated] = await pool.query("SELECT * FROM page_seo WHERE id = ?", [id]);
    if (!updated.length) return res.status(404).json({ error: "Page SEO not found" });
    res.json(updated[0]);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/seo/pages/:id - Delete page SEO
export async function deletePageSeo(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM page_seo WHERE id = ?", [id]);
    res.json({ success: true, message: "Page SEO record deleted" });
  } catch (err) {
    next(err);
  }
}

// GET /api/seo/resolve - Public endpoint for website to get current route's SEO & global scripts
export async function resolveSeo(req, res, next) {
  try {
    let rawPath = req.query.path || "/";
    // Normalize path
    if (rawPath.length > 1 && rawPath.endsWith("/")) {
      rawPath = rawPath.slice(0, -1);
    }

    // 1. Fetch Global Settings
    const [globalRows] = await pool.query(
      "SELECT * FROM seo_global_settings LIMIT 1"
    );
    const globalSettings = globalRows.length ? globalRows[0] : {};

    // 2. Fetch Page SEO
    let [pageRows] = await pool.query(
      "SELECT * FROM page_seo WHERE page_path = ? LIMIT 1",
      [rawPath]
    );

    // If exact path not found, try pattern matching (e.g. /products/:slug or /blog/:slug)
    if (!pageRows.length) {
      if (rawPath.startsWith("/products/") || rawPath.startsWith("/store/")) {
        [pageRows] = await pool.query(
          "SELECT * FROM page_seo WHERE page_path = '/store' OR page_path = '/all-products' LIMIT 1"
        );
      } else if (rawPath.startsWith("/blog/")) {
        [pageRows] = await pool.query(
          "SELECT * FROM page_seo WHERE page_path = '/blog' LIMIT 1"
        );
      } else if (rawPath.startsWith("/events/")) {
        [pageRows] = await pool.query(
          "SELECT * FROM page_seo WHERE page_path = '/events' LIMIT 1"
        );
      }
    }

    const pageSeo = pageRows.length ? pageRows[0] : null;

    res.json({
      page: pageSeo,
      global: globalSettings,
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/seo/apply-to-all - Batch update all pages with selected properties
export async function applyToAll(req, res, next) {
  try {
    const {
      title_suffix,
      robots_directive,
      og_image,
      schema_template,
      custom_head_tags,
    } = req.body;

    let updates = [];
    let params = [];

    if (title_suffix) {
      // Append title suffix to meta_title if not already containing it
      await pool.query(
        "UPDATE page_seo SET meta_title = CONCAT(page_name, ' | ', ?), updated_at = NOW()",
        [title_suffix]
      );
    }

    if (robots_directive) {
      await pool.query(
        "UPDATE page_seo SET robots_directive = ?, updated_at = NOW()",
        [robots_directive]
      );
    }

    if (og_image) {
      await pool.query(
        "UPDATE page_seo SET og_image = ?, twitter_image = ?, updated_at = NOW()",
        [og_image, og_image]
      );
    }

    if (schema_template) {
      await pool.query(
        "UPDATE page_seo SET custom_schema = ?, updated_at = NOW()",
        [JSON.stringify(schema_template)]
      );
    }

    if (custom_head_tags !== undefined) {
      await pool.query(
        "UPDATE page_seo SET custom_head_tags = ?, updated_at = NOW()",
        [custom_head_tags]
      );
    }

    const [allPages] = await pool.query("SELECT * FROM page_seo ORDER BY page_path ASC");
    res.json({
      success: true,
      message: "SEO settings successfully applied to all pages!",
      pagesUpdated: allPages.length,
      pages: allPages,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/seo/global - Get global SEO, GTM, Meta Pixel
export async function getGlobalSeo(req, res, next) {
  try {
    let [rows] = await pool.query("SELECT * FROM seo_global_settings LIMIT 1");
    if (!rows.length) {
      await pool.query(`
        INSERT INTO seo_global_settings (
          id, global_site_name, global_title_template, global_meta_description,
          global_og_image, global_canonical_domain, global_robots,
          google_tag_manager_id, meta_pixel_id, google_analytics_id,
          popups_master_enabled, updated_at
        ) VALUES (
          1, 'Marks Biotech - Advanced Biomaterials & Digital Dentistry',
          '%title% | Marks Biotech', 'Marks Biotech specializes in premium dental biomaterials and digital surgical solutions.',
          '/assets/imgs/logo.webp', 'https://marksbiotech.com', 'index, follow',
          '', '', '', 1, NOW()
        )
      `);
      [rows] = await pool.query("SELECT * FROM seo_global_settings LIMIT 1");
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

// PUT /api/seo/global - Update global SEO, GTM, Meta Pixel
export async function updateGlobalSeo(req, res, next) {
  try {
    const {
      global_site_name,
      global_title_template,
      global_meta_description,
      global_og_image,
      global_canonical_domain,
      global_robots,
      google_tag_manager_id,
      meta_pixel_id,
      google_analytics_id,
      custom_header_scripts,
      custom_body_scripts,
      global_organization_schema,
      alt_tag_auto_fallback,
      popups_master_enabled,
    } = req.body;

    await pool.query(
      `UPDATE seo_global_settings SET
        global_site_name = COALESCE(?, global_site_name),
        global_title_template = COALESCE(?, global_title_template),
        global_meta_description = COALESCE(?, global_meta_description),
        global_og_image = COALESCE(?, global_og_image),
        global_canonical_domain = COALESCE(?, global_canonical_domain),
        global_robots = COALESCE(?, global_robots),
        google_tag_manager_id = COALESCE(?, google_tag_manager_id),
        meta_pixel_id = COALESCE(?, meta_pixel_id),
        google_analytics_id = COALESCE(?, google_analytics_id),
        custom_header_scripts = COALESCE(?, custom_header_scripts),
        custom_body_scripts = COALESCE(?, custom_body_scripts),
        global_organization_schema = ?,
        alt_tag_auto_fallback = COALESCE(?, alt_tag_auto_fallback),
        popups_master_enabled = COALESCE(?, popups_master_enabled),
        updated_at = NOW()
      WHERE id = 1`,
      [
        global_site_name,
        global_title_template,
        global_meta_description,
        global_og_image,
        global_canonical_domain,
        global_robots,
        google_tag_manager_id,
        meta_pixel_id,
        google_analytics_id,
        custom_header_scripts,
        custom_body_scripts,
        global_organization_schema ? JSON.stringify(global_organization_schema) : null,
        alt_tag_auto_fallback !== undefined ? (alt_tag_auto_fallback ? 1 : 0) : undefined,
        popups_master_enabled !== undefined ? (popups_master_enabled ? 1 : 0) : undefined,
      ]
    );

    const [rows] = await pool.query("SELECT * FROM seo_global_settings WHERE id = 1");
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

// GET /api/seo/audit-images - Scan website for missing alt tags
export async function auditImages(req, res, next) {
  try {
    const websiteSrcPath = path.resolve(__dirname, "../../../marksboiteck-website/src");
    const scannedImages = [];
    const missingAltAlerts = [];

    // Helper to scan a directory recursively
    function scanDir(dir) {
      if (!fs.existsSync(dir)) return;
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          scanDir(fullPath);
        } else if (file.endsWith(".jsx") || file.endsWith(".js") || file.endsWith(".html")) {
          const content = fs.readFileSync(fullPath, "utf-8");
          // Match complete <img ... /> or <img ...> tags respecting braces and strings
          let idx = 0;
          while ((idx = content.indexOf("<img", idx)) !== -1) {
            const nextChar = content[idx + 4];
            if (nextChar && !/[\s\n\r\t/>]/.test(nextChar)) {
              idx += 4;
              continue;
            }
            let endIdx = idx + 4;
            let inBraces = 0;
            let inQuote = null;
            while (endIdx < content.length) {
              const ch = content[endIdx];
              if (!inQuote) {
                if (ch === '"' || ch === "'" || ch === '`') {
                  inQuote = ch;
                } else if (ch === '{') {
                  inBraces++;
                } else if (ch === '}') {
                  if (inBraces > 0) inBraces--;
                } else if (ch === '>' && inBraces === 0) {
                  endIdx++;
                  break;
                }
              } else if (ch === inQuote) {
                if (content[endIdx - 1] !== '\\') {
                  inQuote = null;
                }
              }
              endIdx++;
            }
            const tag = content.slice(idx, endIdx);
            idx = endIdx;

            // Extract src
            const srcMatch = tag.match(/src\s*=\s*(?:\{([^}]+)\}|"([^"]*)"|'([^']*)')/i);
            const src = srcMatch ? (srcMatch[1] || srcMatch[2] || srcMatch[3]) : "dynamic-src";

            // Extract alt
            const altMatch = tag.match(/alt\s*=\s*(?:\{([^}]+)\}|"([^"]*)"|'([^']*)')/i);
            let altVal = null;
            if (altMatch) {
              altVal = (altMatch[1] || altMatch[2] || altMatch[3] || "").trim();
            }

            const hasAlt = Boolean(altVal && altVal !== '""' && altVal !== "''");
            const relativeFile = path.relative(path.resolve(__dirname, "../../.."), fullPath);

            const record = {
              file: relativeFile,
              src: src,
              alt: altVal || "",
              hasAlt: hasAlt,
              tagSnippet: tag.length > 90 ? tag.slice(0, 90).replace(/\s+/g, " ") + "..." : tag.replace(/\s+/g, " "),
            };

            scannedImages.push(record);
            if (!hasAlt) {
              missingAltAlerts.push(record);
            }
          }
        }
      }
    }

    scanDir(websiteSrcPath);

    // Also scan DB products & blogs
    const [products] = await pool.query(
      "SELECT id, name, sku FROM products LIMIT 50"
    );
    const [blogs] = await pool.query(
      "SELECT id, title, featured_image, featured_image_alt FROM blogs LIMIT 50"
    );

    const blogAltMissing = blogs
      .filter((b) => b.featured_image && (!b.featured_image_alt || b.featured_image_alt.trim() === ""))
      .map((b) => ({
        file: `Database: Blog #${b.id} (${b.title})`,
        src: b.featured_image,
        alt: "",
        hasAlt: false,
        tagSnippet: `<img src="${b.featured_image}" alt="" />`,
      }));

    const allMissing = [...missingAltAlerts, ...blogAltMissing];

    res.json({
      totalScanned: scannedImages.length + blogs.length,
      totalMissing: allMissing.length,
      score: scannedImages.length > 0
        ? Math.round(((scannedImages.length - missingAltAlerts.length) / scannedImages.length) * 100)
        : 100,
      missingAltAlerts: allMissing,
      scannedImages: scannedImages.slice(0, 100),
    });
  } catch (err) {
    next(err);
  }
}
