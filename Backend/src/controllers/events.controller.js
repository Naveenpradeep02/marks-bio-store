import { pool } from "../config/db.js";

// Helper to slugify
function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

let tableInitialized = false;

// Ensure table exists & seed initial default events if table is empty
async function ensureEventsTable() {
  if (tableInitialized) return;

  const createQuery = `
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) DEFAULT '',
      year VARCHAR(10) NOT NULL DEFAULT '2026',
      type ENUM('workshop', 'conference', 'hands-on', 'symposium') NOT NULL DEFAULT 'workshop',
      status ENUM('upcoming', 'ongoing', 'completed') NOT NULL DEFAULT 'upcoming',
      date_string VARCHAR(150) NOT NULL DEFAULT '',
      location VARCHAR(255) NOT NULL DEFAULT '',
      image_url VARCHAR(500) DEFAULT '',
      banner_url VARCHAR(500) DEFAULT '',
      badge_text VARCHAR(100) DEFAULT '',
      description TEXT,
      speaker_name VARCHAR(150) DEFAULT '',
      speaker_title VARCHAR(150) DEFAULT '',
      registration_link VARCHAR(500) DEFAULT '',
      seats_total INT DEFAULT 50,
      seats_available INT DEFAULT 50,
      price VARCHAR(50) DEFAULT 'Free',
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      featured TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_events_year (year),
      INDEX idx_events_status (status),
      INDEX idx_events_type (type)
    ) ENGINE=InnoDB;
  `;

  try {
    await pool.query(createQuery);

    const [rows] = await pool.query("SELECT COUNT(*) as count FROM events");
    if (rows[0].count === 0) {
      const seedSql = `
        INSERT INTO events (
          title, slug, year, type, status, date_string, location, image_url, badge_text, description, speaker_name, speaker_title, registration_link, seats_total, seats_available, price, is_active, featured
        ) VALUES 
        (
          'Navident Advanced Surgical & Prosthetic Workshop',
          'navident-advanced-surgical-prosthetic-workshop',
          '2026',
          'workshop',
          'upcoming',
          'April 26-27, 2026',
          'ITC Grand Chola, Chennai',
          '/assets/event/11.webp',
          '🔥 Registration Open',
          'Comprehensive hands-on training with dynamic computer-assisted implantology and live navigation surgery guidance.',
          'Dr. Mani Krishnan',
          'Chief Clinical Specialist, Implantology',
          '/events/11',
          40,
          12,
          '₹15,000',
          1,
          1
        ),
        (
          'CLARONAV DENTAL - Dynamic Navigation Surgical Workshop',
          'claronav-dental-dynamic-navigation-workshop',
          '2026',
          'workshop',
          'upcoming',
          'May 16-17, 2026',
          'The Leela Palace, Bengaluru',
          '/assets/event/12.webp',
          'Limited Seats',
          'Live patient demonstration and photogrammetry workflow integration with hands-on typodont models.',
          'Dr. Rajesh Nair',
          'Oral & Maxillofacial Surgeon',
          '/events/9',
          30,
          8,
          '₹12,500',
          1,
          1
        ),
        (
          'IDS Cologne Germany - 2025 Global Dental Expo',
          'ids-cologne-germany-2025',
          '2025',
          'conference',
          'completed',
          'March 25-29, 2025',
          'Koelnmesse, Cologne, Germany',
          '/assets/event/23.webp',
          'Completed',
          'International dental show featuring cutting-edge bioceramics, synthetic grafts, and next-gen navigation.',
          'Marks Biotech Delegation',
          'International Clinical Team',
          '/events/22',
          500,
          0,
          'Free Entry',
          1,
          0
        ),
        (
          'Expodent Delhi 2025 National Dental Exhibition',
          'expodent-delhi-2025',
          '2025',
          'conference',
          'completed',
          'December 19-21, 2025',
          'Pragati Maidan, New Delhi',
          '/assets/event/25.webp',
          'Completed',
          'Demonstrating clinical biomaterials, osteoconductive membranes, and computer-guided surgery systems.',
          'Marks Biotech Technical Team',
          'Product Specialists',
          '/events/25',
          350,
          0,
          'Free',
          1,
          0
        ),
        (
          'Manipal College of Dental Sciences - Maxillofacial Department',
          'manipal-college-maxillofacial-navident',
          '2025',
          'workshop',
          'completed',
          'November 14, 2025',
          'MCODS, Mangalore',
          '/assets/event/24.webp',
          'Completed',
          'Academic surgical training with faculty and postgraduates on precision dynamic navigation placement.',
          'Dr. K. Srinivas',
          'Professor & HOD, Oral Surgery',
          '/events/24',
          50,
          0,
          'Institutional',
          1,
          0
        )
      `;
      await pool.query(seedSql);
    }

    tableInitialized = true;
  } catch (err) {
    console.error("Error setting up events table:", err.message);
  }
}

// GET /api/events - List events with filtering
export async function listEvents(req, res, next) {
  try {
    await ensureEventsTable();

    const { year, type, status, search, limit = 50, offset = 0 } = req.query;

    let query = "SELECT * FROM events WHERE 1=1";
    const params = [];

    if (year && year !== "all") {
      query += " AND year = ?";
      params.push(year);
    }

    if (type && type !== "all") {
      query += " AND type = ?";
      params.push(type);
    }

    if (status && status !== "all") {
      query += " AND status = ?";
      params.push(status);
    }

    if (search) {
      query += " AND (title LIKE ? OR location LIKE ? OR speaker_name LIKE ? OR description LIKE ?)";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += " ORDER BY year DESC, status ASC, id DESC LIMIT ? OFFSET ?";
    params.push(Number(limit), Number(offset));

    const [rows] = await pool.query(query, params);

    // Count
    let countQuery = "SELECT COUNT(*) as total FROM events WHERE 1=1";
    const countParams = [];
    if (year && year !== "all") {
      countQuery += " AND year = ?";
      countParams.push(year);
    }
    if (type && type !== "all") {
      countQuery += " AND type = ?";
      countParams.push(type);
    }
    if (status && status !== "all") {
      countQuery += " AND status = ?";
      countParams.push(status);
    }
    if (search) {
      countQuery += " AND (title LIKE ? OR location LIKE ? OR speaker_name LIKE ? OR description LIKE ?)";
      countParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }
    const [countResult] = await pool.query(countQuery, countParams);

    res.json({
      events: rows,
      total: countResult[0]?.total || 0,
      limit: Number(limit),
      offset: Number(offset),
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/events/stats - Summary counts
export async function getEventStats(req, res, next) {
  try {
    await ensureEventsTable();

    const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'upcoming' THEN 1 ELSE 0 END) as upcoming,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN year = '2026' THEN 1 ELSE 0 END) as count2026,
        SUM(CASE WHEN year = '2025' THEN 1 ELSE 0 END) as count2025,
        SUM(CASE WHEN type = 'workshop' THEN 1 ELSE 0 END) as workshops,
        SUM(CASE WHEN type = 'conference' THEN 1 ELSE 0 END) as conferences
      FROM events
    `);

    res.json(stats[0] || {});
  } catch (err) {
    next(err);
  }
}

// GET /api/events/:id - Get single event
export async function getEvent(req, res, next) {
  try {
    await ensureEventsTable();
    const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Event not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

// POST /api/events - Create new event
export async function createEvent(req, res, next) {
  try {
    await ensureEventsTable();

    const {
      title,
      slug,
      year = "2026",
      type = "workshop",
      status = "upcoming",
      date_string = "",
      location = "",
      image_url = "",
      banner_url = "",
      badge_text = "",
      description = "",
      speaker_name = "",
      speaker_title = "",
      registration_link = "",
      seats_total = 50,
      seats_available = 50,
      price = "Free",
      is_active = 1,
      featured = 0,
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Event title is required" });
    }

    const finalSlug = slug ? slugify(slug) : slugify(title);

    const [result] = await pool.query(
      `INSERT INTO events (
        title, slug, year, type, status, date_string, location, image_url,
        banner_url, badge_text, description, speaker_name, speaker_title,
        registration_link, seats_total, seats_available, price, is_active, featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        finalSlug,
        year,
        type,
        status,
        date_string,
        location,
        image_url,
        banner_url,
        badge_text,
        description,
        speaker_name,
        speaker_title,
        registration_link,
        Number(seats_total) || 0,
        Number(seats_available) || 0,
        price,
        is_active ? 1 : 0,
        featured ? 1 : 0,
      ]
    );

    const [created] = await pool.query("SELECT * FROM events WHERE id = ?", [result.insertId]);
    res.status(201).json(created[0]);
  } catch (err) {
    next(err);
  }
}

// PUT /api/events/:id - Update event
export async function updateEvent(req, res, next) {
  try {
    await ensureEventsTable();

    const { id } = req.params;
    const {
      title,
      slug,
      year,
      type,
      status,
      date_string,
      location,
      image_url,
      banner_url,
      badge_text,
      description,
      speaker_name,
      speaker_title,
      registration_link,
      seats_total,
      seats_available,
      price,
      blocks_json,
      is_active,
      featured,
    } = req.body;

    const [existing] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
    if (!existing.length) return res.status(404).json({ error: "Event not found" });

    const finalSlug = slug !== undefined ? slugify(slug) : existing[0].slug;

    await pool.query(
      `UPDATE events SET
        title = COALESCE(?, title),
        slug = ?,
        year = COALESCE(?, year),
        type = COALESCE(?, type),
        status = COALESCE(?, status),
        date_string = COALESCE(?, date_string),
        location = COALESCE(?, location),
        image_url = COALESCE(?, image_url),
        banner_url = COALESCE(?, banner_url),
        badge_text = COALESCE(?, badge_text),
        description = COALESCE(?, description),
        blocks_json = COALESCE(?, blocks_json),
        speaker_name = COALESCE(?, speaker_name),
        speaker_title = COALESCE(?, speaker_title),
        registration_link = COALESCE(?, registration_link),
        seats_total = COALESCE(?, seats_total),
        seats_available = COALESCE(?, seats_available),
        price = COALESCE(?, price),
        is_active = COALESCE(?, is_active),
        featured = COALESCE(?, featured),
        updated_at = NOW()
      WHERE id = ?`,
      [
        title,
        finalSlug,
        year,
        type,
        status,
        date_string,
        location,
        image_url,
        banner_url,
        badge_text,
        description,
        blocks_json !== undefined ? (typeof blocks_json === "string" ? blocks_json : JSON.stringify(blocks_json)) : null,
        speaker_name,
        speaker_title,
        registration_link,
        seats_total !== undefined ? Number(seats_total) : null,
        seats_available !== undefined ? Number(seats_available) : null,
        price,
        is_active !== undefined ? (is_active ? 1 : 0) : null,
        featured !== undefined ? (featured ? 1 : 0) : null,
        id,
      ]
    );

    const [updated] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
    res.json(updated[0]);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/events/:id/status - Quick status toggle
export async function toggleEventStatus(req, res, next) {
  try {
    await ensureEventsTable();

    const { id } = req.params;
    const { status, is_active } = req.body;

    if (status !== undefined) {
      await pool.query("UPDATE events SET status = ?, updated_at = NOW() WHERE id = ?", [status, id]);
    } else if (is_active !== undefined) {
      await pool.query("UPDATE events SET is_active = ?, updated_at = NOW() WHERE id = ?", [
        is_active ? 1 : 0,
        id,
      ]);
    } else {
      // Toggle between upcoming and completed by default
      await pool.query(
        "UPDATE events SET status = IF(status = 'upcoming', 'completed', 'upcoming'), updated_at = NOW() WHERE id = ?",
        [id]
      );
    }

    const [updated] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
    res.json(updated[0]);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/events/:id - Delete event
export async function deleteEvent(req, res, next) {
  try {
    await ensureEventsTable();

    const { id } = req.params;
    await pool.query("DELETE FROM events WHERE id = ?", [id]);
    res.json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    next(err);
  }
}
