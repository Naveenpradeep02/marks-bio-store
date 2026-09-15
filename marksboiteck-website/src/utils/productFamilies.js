// A "product" from the API now carries its own real `variants` array
// (from the product_variants table) instead of being reconstructed by
// grouping sibling product rows together. These helpers adapt that shape
// for the catalog listing (AllProducts) and detail page (ProductDetail).

export function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Returns the purchasable options for a product: its real variant rows if
// it has any, or a single synthetic option built from the product's own
// price/sku/stock otherwise.
export function getVariantOptions(product) {
  if (!product) return [];
  if (Array.isArray(product.variants) && product.variants.length > 0) {
    return product.variants.map((v) => ({
      id: v.id,
      label: v.value,
      sku: v.sku || "",
      price: Number(v.price) || 0,
      stock: Number(v.stock) || 0,
    }));
  }
  return [
    {
      id: null,
      label: null,
      sku: product.sku || "",
      price: Number(product.price) || 0,
      stock: Number(product.stock) || 0,
    },
  ];
}

export function specSummary(product) {
  const specs = product.specifications;
  if (!specs || typeof specs !== "object") return product.name;
  const parts = Object.entries(specs)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`);
  return parts.length ? `${product.name} — ${parts.join(" • ")}` : product.name;
}

export function specBadges(product) {
  const specs = product.specifications;
  if (!specs || typeof specs !== "object") return [];
  return Object.entries(specs).filter(([, v]) => v);
}
