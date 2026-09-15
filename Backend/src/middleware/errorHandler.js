export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  // Common MySQL constraint errors get a friendly message instead of the
  // raw SQL error text (which can expose table/column names to the client).
  if (err.code === "ER_ROW_IS_REFERENCED_2" || err.code === "ER_ROW_IS_REFERENCED") {
    return res.status(409).json({ error: "This record is still referenced by other data and can't be deleted." });
  }
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ error: "A record with that value already exists." });
  }

  res.status(500).json({ error: "Internal server error" });
}
