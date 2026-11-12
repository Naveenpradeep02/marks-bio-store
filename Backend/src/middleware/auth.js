import { auth } from "../config/firebase.js";
import { pool } from "../config/db.js";

// Verifies the Firebase ID token (identity only), then looks up / lazily
// creates the matching row in MySQL `users`, which is the source of truth
// for role and profile data.
export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing bearer token" });
  }

  // Development admin bypass for local testing & headless automation
  if (token === "dev-admin-token") {
    req.user = {
      id: 1,
      uid: "dev-admin-uid",
      email: "mani.krishnan@marksbiotech.com",
      name: "Mani Krishnan",
      phone: "+91 9876543210",
      role: "admin",
      customerType: "retail",
    };
    return next();
  }

  try {
    const decoded = await auth.verifyIdToken(token);

    let [rows] = await pool.execute(
      "SELECT * FROM users WHERE firebase_uid = ?",
      [decoded.uid],
    );
    if (rows.length === 0) {
      await pool.execute(
        "INSERT INTO users (firebase_uid, email, role) VALUES (?, ?, 'customer')",
        [decoded.uid, decoded.email || ""],
      );
      [rows] = await pool.execute(
        "SELECT * FROM users WHERE firebase_uid = ?",
        [decoded.uid],
      );
    }

    req.user = {
      id: rows[0].id,
      uid: decoded.uid,
      email: rows[0].email,
      name: rows[0].name,
      phone: rows[0].phone,
      role: rows[0].role,
      customerType: rows[0].customer_type || "retail",
    };
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

// Optional auth for analytics/tracking: attaches req.user if valid token provided, but doesn't block if absent
export async function optionalAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return next();
  }

  if (token === "dev-admin-token") {
    req.user = {
      id: 1,
      uid: "dev-admin-uid",
      email: "mani.krishnan@marksbiotech.com",
      name: "Mani Krishnan",
      phone: "+91 9876543210",
      role: "admin",
      customerType: "retail",
    };
    return next();
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE firebase_uid = ?",
      [decoded.uid],
    );
    if (rows.length > 0) {
      req.user = {
        id: rows[0].id,
        uid: decoded.uid,
        email: rows[0].email,
        name: rows[0].name,
        phone: rows[0].phone,
        role: rows[0].role,
        customerType: rows[0].customer_type || "retail",
      };
    }
  } catch (err) {
    // Ignore invalid token for optional auth
  }
  next();
}
