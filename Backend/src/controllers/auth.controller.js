import { auth } from "../config/firebase.js";
import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { toCamelCase } from "../utils/camelCase.js";

// One-time bootstrap to promote a user to admin. Protected by a shared secret
// (BOOTSTRAP_ADMIN_SECRET) instead of requireAdmin, since no admin exists yet
// the first time this is called. Looks the user up by Firebase UID.
export const bootstrapAdmin = asyncHandler(async (req, res) => {
  const { uid, secret } = req.body;
  if (secret !== process.env.BOOTSTRAP_ADMIN_SECRET) {
    return res.status(403).json({ error: "Invalid bootstrap secret" });
  }
  if (!uid) return res.status(400).json({ error: "uid is required" });

  const decoded = await auth.getUser(uid).catch(() => null);
  if (!decoded) return res.status(404).json({ error: "No Firebase user with that uid" });

  const [existing] = await pool.execute("SELECT id FROM users WHERE firebase_uid = ?", [uid]);
  if (existing.length === 0) {
    await pool.execute(
      "INSERT INTO users (firebase_uid, email, role) VALUES (?, ?, 'admin')",
      [uid, decoded.email || ""]
    );
  } else {
    await pool.execute("UPDATE users SET role = 'admin' WHERE firebase_uid = ?", [uid]);
  }

  res.json({ message: "User promoted to admin." });
});

// Called by the frontend right after signup/login to create/update the
// user's profile row, keyed by Firebase Auth uid (requireAuth already
// lazily creates the row, so this just fills in name/phone).
export const syncProfile = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;

  const fields = [];
  const values = [];
  if (name !== undefined) { fields.push("name = ?"); values.push(name); }
  if (phone !== undefined) { fields.push("phone = ?"); values.push(phone); }

  if (fields.length > 0) {
    values.push(req.user.id);
    await pool.execute(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values);
  }

  const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [req.user.id]);
  res.json({ profile: toCamelCase(rows[0]) });
});

export const getMe = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [req.user.id]);
  res.json({ profile: rows[0] ? toCamelCase(rows[0]) : null, role: req.user.role });
});
