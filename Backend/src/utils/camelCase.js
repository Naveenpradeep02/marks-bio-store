// Converts a MySQL row's snake_case columns to camelCase for API responses,
// since the frontend (originally built against a Firestore-style camelCase
// schema) expects keys like brandId/createdAt rather than brand_id/created_at.
export function toCamelCase(row) {
  if (row === null || typeof row !== "object") return row;
  const out = {};
  for (const [key, value] of Object.entries(row)) {
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    out[camelKey] = value;
  }
  return out;
}

export function toCamelCaseAll(rows) {
  return rows.map(toCamelCase);
}
