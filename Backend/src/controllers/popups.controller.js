import { pool } from "../config/db.js";

// GET /api/popups - List all popups for admin/developer dashboard
export async function listPopups(req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM popups ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// GET /api/popups/active - List active popups for storefront
export async function getActivePopups(req, res, next) {
  try {
    // Check if master popups switch is enabled
    const [globalSettings] = await pool.query(
      "SELECT popups_master_enabled FROM seo_global_settings LIMIT 1"
    );
    const masterEnabled = globalSettings.length ? Boolean(globalSettings[0].popups_master_enabled) : true;

    if (!masterEnabled) {
      return res.json({ masterEnabled: false, popups: [] });
    }

    const [rows] = await pool.query(
      "SELECT * FROM popups WHERE is_active = 1 ORDER BY id DESC"
    );
    res.json({ masterEnabled: true, popups: rows });
  } catch (err) {
    next(err);
  }
}

// GET /api/popups/:id - Single popup
export async function getPopup(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM popups WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Popup not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

// POST /api/popups - Create popup
export async function createPopup(req, res, next) {
  try {
    const {
      type = "event",
      name,
      title,
      subtitle = "",
      content = "",
      image_url = "",
      badge_text = "",
      button_text = "Learn More",
      button_link = "",
      secondary_button_text = "",
      secondary_button_link = "",
      product_id = null,
      event_date = "",
      event_location = "",
      delay_seconds = 3,
      show_frequency = "once_per_session",
      target_pages = "*",
      is_active = 1,
    } = req.body;

    if (!name || !title) {
      return res.status(400).json({ error: "Name and title are required" });
    }

    const [result] = await pool.query(
      `INSERT INTO popups (
        type, name, title, subtitle, content, image_url, badge_text,
        button_text, button_link, secondary_button_text, secondary_button_link,
        product_id, event_date, event_location, delay_seconds, show_frequency,
        target_pages, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        type, name, title, subtitle, content, image_url, badge_text,
        button_text, button_link, secondary_button_text, secondary_button_link,
        product_id || null, event_date, event_location, delay_seconds, show_frequency,
        target_pages, is_active ? 1 : 0,
      ]
    );

    const [created] = await pool.query("SELECT * FROM popups WHERE id = ?", [result.insertId]);
    res.status(201).json(created[0]);
  } catch (err) {
    next(err);
  }
}

// PUT /api/popups/:id - Update popup
export async function updatePopup(req, res, next) {
  try {
    const { id } = req.params;
    const {
      type,
      name,
      title,
      subtitle,
      content,
      image_url,
      badge_text,
      button_text,
      button_link,
      secondary_button_text,
      secondary_button_link,
      product_id,
      event_date,
      event_location,
      delay_seconds,
      show_frequency,
      target_pages,
      is_active,
    } = req.body;

    await pool.query(
      `UPDATE popups SET
        type = COALESCE(?, type),
        name = COALESCE(?, name),
        title = COALESCE(?, title),
        subtitle = COALESCE(?, subtitle),
        content = COALESCE(?, content),
        image_url = COALESCE(?, image_url),
        badge_text = COALESCE(?, badge_text),
        button_text = COALESCE(?, button_text),
        button_link = COALESCE(?, button_link),
        secondary_button_text = COALESCE(?, secondary_button_text),
        secondary_button_link = COALESCE(?, secondary_button_link),
        product_id = ?,
        event_date = COALESCE(?, event_date),
        event_location = COALESCE(?, event_location),
        delay_seconds = COALESCE(?, delay_seconds),
        show_frequency = COALESCE(?, show_frequency),
        target_pages = COALESCE(?, target_pages),
        is_active = COALESCE(?, is_active),
        updated_at = NOW()
      WHERE id = ?`,
      [
        type, name, title, subtitle, content, image_url, badge_text,
        button_text, button_link, secondary_button_text, secondary_button_link,
        product_id !== undefined ? (product_id || null) : undefined,
        event_date, event_location, delay_seconds, show_frequency,
        target_pages, is_active !== undefined ? (is_active ? 1 : 0) : undefined,
        id,
      ]
    );

    const [updated] = await pool.query("SELECT * FROM popups WHERE id = ?", [id]);
    if (!updated.length) return res.status(404).json({ error: "Popup not found" });
    res.json(updated[0]);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/popups/:id/status - Toggle popup status
export async function togglePopupStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    if (is_active !== undefined) {
      await pool.query("UPDATE popups SET is_active = ?, updated_at = NOW() WHERE id = ?", [
        is_active ? 1 : 0,
        id,
      ]);
    } else {
      await pool.query(
        "UPDATE popups SET is_active = IF(is_active = 1, 0, 1), updated_at = NOW() WHERE id = ?",
        [id]
      );
    }

    const [updated] = await pool.query("SELECT * FROM popups WHERE id = ?", [id]);
    res.json(updated[0]);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/popups/:id - Delete popup
export async function deletePopup(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM popups WHERE id = ?", [id]);
    res.json({ success: true, message: "Popup deleted" });
  } catch (err) {
    next(err);
  }
}

// POST /api/popups/master-toggle - Master ON/OFF for all popups
export async function toggleMasterPopups(req, res, next) {
  try {
    const { enabled } = req.body;
    let nextVal = enabled ? 1 : 0;
    if (enabled === undefined) {
      const [current] = await pool.query(
        "SELECT popups_master_enabled FROM seo_global_settings LIMIT 1"
      );
      nextVal = current.length && current[0].popups_master_enabled ? 0 : 1;
    }

    await pool.query(
      "UPDATE seo_global_settings SET popups_master_enabled = ?, updated_at = NOW() WHERE id = 1",
      [nextVal]
    );

    res.json({ success: true, popups_master_enabled: Boolean(nextVal) });
  } catch (err) {
    next(err);
  }
}
