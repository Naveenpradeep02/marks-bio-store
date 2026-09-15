import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api, uploadFile } from "../api";
import RichTextEditor from "../components/RichTextEditor";

const API_ORIGIN = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "");

const emptyForm = {
  name: "",
  brandId: "",
  mainCategoryId: "",
  categoryId: "",
  slug: "",
  sku: "",
  price: "",
  stock: "",
  description: "",
  imagePath: "",
  status: "active",
  attributes: [],
};

const emptyVariantRow = { value: "", sku: "", price: "", stock: "" };

function specsToAttributes(specifications) {
  if (!specifications || typeof specifications !== "object") return [];
  return Object.entries(specifications).map(([key, value]) => ({ key, value: String(value) }));
}

function attributesToSpecs(attributes) {
  const specs = {};
  for (const { key, value } of attributes) {
    const trimmedKey = key.trim();
    if (trimmedKey) specs[trimmedKey] = value.trim();
  }
  return specs;
}

export default function ProductForm() {
  const { id: editingId } = useParams();
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [categoryTree, setCategoryTree] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(!!editingId);
  const [uploading, setUploading] = useState(false);
  const [multiMode, setMultiMode] = useState(false);
  const [variantAttrName, setVariantAttrName] = useState("");
  const [variantRows, setVariantRows] = useState([{ ...emptyVariantRow }, { ...emptyVariantRow }]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get("/brands").then(setBrands).catch((err) => setError(err.message));
    api.get("/categories?tree=true").then(setCategoryTree).catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!editingId) return;
    setLoading(true);
    api
      .get(`/products/${editingId}`)
      .then((p) => {
        setForm({
          name: p.name,
          brandId: p.brandId || "",
          mainCategoryId: p.mainCategoryId ? String(p.mainCategoryId) : "",
          categoryId: p.categoryId ? String(p.categoryId) : "",
          slug: p.slug || "",
          sku: p.sku || "",
          price: p.price ?? "",
          stock: p.stock ?? "",
          description: p.description || "",
          imagePath: p.images?.[0] || "",
          status: p.status || "active",
          attributes: specsToAttributes(p.specifications),
        });
        if (p.variants && p.variants.length > 0) {
          setMultiMode(true);
          setVariantAttrName(p.variants[0].attributeName || "");
          setVariantRows(
            p.variants.map((v) => ({
              value: v.value || "",
              sku: v.sku || "",
              price: v.price ?? "",
              stock: v.stock ?? "",
            }))
          );
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [editingId]);

  const subcategories = categoryTree.find((c) => String(c.id) === form.mainCategoryId)?.subcategories || [];

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const result = await uploadFile("/uploads/product-image", file);
      setForm((f) => ({ ...f, imagePath: result.path }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const variants = multiMode
      ? variantRows
          .filter((r) => r.value.trim())
          .map((r) => ({
            attributeName: variantAttrName.trim() || "Size",
            value: r.value.trim(),
            sku: r.sku,
            price: Number(r.price) || 0,
            stock: Number(r.stock) || 0,
          }))
      : [];

    if (multiMode && variants.length < 2) {
      setError("Add at least 2 variants (with a value each) when using Product with Variants.");
      return;
    }

    const payload = {
      name: form.name,
      brandId: form.brandId || null,
      categoryId: form.categoryId || null,
      slug: form.slug || null,
      sku: form.sku,
      price: multiMode ? Number(variants[0]?.price) || 0 : Number(form.price) || 0,
      description: form.description,
      images: form.imagePath ? [form.imagePath] : [],
      status: form.status,
      specifications: attributesToSpecs(form.attributes),
      variants,
    };
    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        const stock = multiMode
          ? variants.reduce((sum, v) => sum + v.stock, 0)
          : Number(form.stock) || 0;
        await api.post("/products", { ...payload, stock });
      }
      navigate("/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function updateVariantRow(i, field, value) {
    const rows = [...variantRows];
    rows[i] = { ...rows[i], [field]: value };
    setVariantRows(rows);
  }

  if (loading) {
    return (
      <div>
        <h1>{editingId ? "Edit Product" : "Add Product"}</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header-row">
        <h1>{editingId ? "Edit Product" : "Add Product"}</h1>
        <Link to="/products" className="back-link">
          &larr; Back to Products
        </Link>
      </div>
      {error && <div className="error-banner">{error}</div>}

      <form className="card-form product-form" onSubmit={handleSubmit}>
        <div className="mode-switch" role="tablist" aria-label="Product type">
          <button
            type="button"
            role="tab"
            aria-selected={!multiMode}
            className={`mode-switch-btn${!multiMode ? " active" : ""}`}
            onClick={() => setMultiMode(false)}
          >
            <span className="mode-switch-title">Single Product</span>
            <span className="mode-switch-desc">One item, one price</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={multiMode}
            className={`mode-switch-btn${multiMode ? " active" : ""}`}
            onClick={() => setMultiMode(true)}
          >
            <span className="mode-switch-title">Product with Variants</span>
            <span className="mode-switch-desc">Same product, different sizes/prices</span>
          </button>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">Basic Details</h3>
          <div className="form-grid">
            <div className="field">
              <label>Product name</label>
              <input
                placeholder={multiMode ? "e.g. Bone Graft Kit" : "e.g. T-Barrier Titanium Membrane"}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label>Brand</label>
              <select
                value={form.brandId}
                onChange={(e) => setForm({ ...form, brandId: e.target.value })}
              >
                <option value="">No brand</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Main Category</label>
              <select
                value={form.mainCategoryId}
                onChange={(e) =>
                  setForm({ ...form, mainCategoryId: e.target.value, categoryId: "" })
                }
              >
                <option value="">No category</option>
                {categoryTree.map((main) => (
                  <option key={main.id} value={main.id}>
                    {main.name}
                  </option>
                ))}
              </select>
              <span className="field-hint">
                Manage the list under <Link to="/categories">Categories</Link>.
              </span>
            </div>
            <div className="field">
              <label>Sub-Category</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                disabled={!form.mainCategoryId}
              >
                <option value="">
                  {form.mainCategoryId ? "No sub-category" : "Pick a main category first"}
                </option>
                {subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
            {!multiMode && (
              <div className="field">
                <label>Slug</label>
                <input
                  placeholder="e.g. t-barrier-collagen-23x23mm"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
              </div>
            )}
            <div className="field">
              <label>Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="field">
              <label>Photo</label>
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleImageChange} />
              {uploading && <span className="field-hint">Uploading...</span>}
              {form.imagePath && (
                <img
                  src={`${API_ORIGIN}${form.imagePath}`}
                  alt="Preview"
                  style={{ height: 40, marginTop: 6, borderRadius: 4 }}
                />
              )}
            </div>
          </div>
        </div>

        {!multiMode && (
          <div className="form-section">
            <h3 className="form-section-title">Pricing &amp; Inventory</h3>
            <div className="form-grid">
              <div className="field">
                <label>SKU</label>
                <input
                  placeholder="e.g. TBT-24x29"
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Price (₹)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              {!editingId && (
                <div className="field">
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="form-section">
          <h3 className="form-section-title">Description</h3>
          <RichTextEditor
            key={editingId || "new"}
            value={form.description}
            onChange={(html) => setForm({ ...form, description: html })}
            placeholder="Describe the product - paragraphs, lists, tables..."
          />
        </div>

        {!multiMode && (
          <div className="form-section">
            <h3 className="form-section-title">Specifications</h3>
            <p className="form-section-desc">
              Optional. Add specs like Diameter or Material - they'll appear on the product page
              and become filters on the storefront.
            </p>
            {form.attributes.map((attr, i) => (
              <div className="attribute-row" key={i}>
                <input
                  placeholder="Attribute (e.g. Diameter)"
                  value={attr.key}
                  onChange={(e) => {
                    const attributes = [...form.attributes];
                    attributes[i] = { ...attributes[i], key: e.target.value };
                    setForm({ ...form, attributes });
                  }}
                />
                <input
                  placeholder="Value (e.g. 3.75mm)"
                  value={attr.value}
                  onChange={(e) => {
                    const attributes = [...form.attributes];
                    attributes[i] = { ...attributes[i], value: e.target.value };
                    setForm({ ...form, attributes });
                  }}
                />
                <button
                  type="button"
                  className="icon-remove-btn"
                  aria-label="Remove specification"
                  onClick={() =>
                    setForm({ ...form, attributes: form.attributes.filter((_, j) => j !== i) })
                  }
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-row-btn"
              onClick={() =>
                setForm({ ...form, attributes: [...form.attributes, { key: "", value: "" }] })
              }
            >
              + Add specification
            </button>
          </div>
        )}

        {multiMode && (
          <div className="form-section">
            <h3 className="form-section-title">Variants</h3>
            <p className="form-section-desc">
              What changes between them? e.g. <em>Size</em>, <em>Diameter</em>, <em>Length</em>
            </p>
            <input
              className="variant-attr-name-input"
              placeholder="e.g. Size"
              value={variantAttrName}
              onChange={(e) => setVariantAttrName(e.target.value)}
            />

            <div className="variant-rows-table">
              <div className="variant-rows-header">
                <span>{variantAttrName.trim() || "Value"}</span>
                <span>SKU</span>
                <span>Price (₹)</span>
                <span>Stock</span>
                <span></span>
              </div>
              {variantRows.map((row, i) => (
                <div className="variant-row-editor" key={i}>
                  <input
                    placeholder="e.g. 5mm"
                    value={row.value}
                    onChange={(e) => updateVariantRow(i, "value", e.target.value)}
                  />
                  <input
                    placeholder="SKU"
                    value={row.sku}
                    onChange={(e) => updateVariantRow(i, "sku", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="0"
                    value={row.price}
                    onChange={(e) => updateVariantRow(i, "price", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="0"
                    value={row.stock}
                    onChange={(e) => updateVariantRow(i, "stock", e.target.value)}
                  />
                  <button
                    type="button"
                    className="icon-remove-btn"
                    aria-label="Remove variant"
                    disabled={variantRows.length <= 2}
                    onClick={() => setVariantRows(variantRows.filter((_, j) => j !== i))}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="add-row-btn"
              onClick={() => setVariantRows([...variantRows, { ...emptyVariantRow }])}
            >
              + Add another variant
            </button>
          </div>
        )}

        <div className="form-footer">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Saving..." : editingId ? "Save Changes" : "Add Product"}
          </button>
          <Link to="/products" className="secondary-link-btn">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
