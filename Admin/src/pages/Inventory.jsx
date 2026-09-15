import { Fragment, useEffect, useMemo, useState } from "react";
import { api } from "../api";
import { InventoryIcon, AlertIcon, ProductsIcon, CloseIcon } from "../components/Icons";

const LOW_STOCK_THRESHOLD = 5;

function stockStatus(stock) {
  const n = Number(stock);
  if (n <= 0) return { label: "Out of stock", cls: "badge-red" };
  if (n <= LOW_STOCK_THRESHOLD) return { label: "Low stock", cls: "badge-amber" };
  return { label: "In stock", cls: "badge-green" };
}

const TYPE_LABEL = {
  in: "Stock In",
  out: "Stock Out",
  adjustment: "Adjustment",
};
const TYPE_BADGE = {
  in: "badge-green",
  out: "badge-red",
  adjustment: "badge-blue",
};

function AdjustModal({ product, variant, products, onClose, onSaved }) {
  const [productId, setProductId] = useState(product ? String(product.id) : "");
  const [variantId, setVariantId] = useState(variant ? String(variant.id) : "");
  const [type, setType] = useState("in");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const selectedProduct = products.find((p) => String(p.id) === String(productId));
  const variants = selectedProduct?.variants || [];
  const hasVariants = variants.length > 0;
  const selectedVariant = hasVariants ? variants.find((v) => String(v.id) === String(variantId)) : null;
  const currentStock = hasVariants ? selectedVariant?.stock : selectedProduct?.stock;

  const qtyNum = Number(quantity) || 0;
  const delta = type === "out" ? -Math.abs(qtyNum) : qtyNum;
  const previewStock = currentStock !== undefined && currentStock !== null ? Number(currentStock) + delta : null;

  function handleProductChange(id) {
    setProductId(id);
    setVariantId("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!productId || !quantity) {
      setError("Select a product and enter a quantity.");
      return;
    }
    if (hasVariants && !variantId) {
      setError("This product has size/variant options — pick which one you're adjusting.");
      return;
    }
    if (previewStock !== null && previewStock < 0) {
      setError("This adjustment would make stock negative.");
      return;
    }
    setSaving(true);
    try {
      const result = await api.post("/inventory/adjust", {
        productId,
        variantId: hasVariants ? variantId : null,
        type,
        quantity: qtyNum,
        reason,
      });
      onSaved(result.newStock);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Adjust Stock</h2>
          <button className="icon-remove-btn" onClick={onClose} aria-label="Close">
            <CloseIcon width={16} height={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-banner">{error}</div>}

          <div className="field" style={{ marginBottom: "0.9rem" }}>
            <label>Product</label>
            <select
              value={productId}
              onChange={(e) => handleProductChange(e.target.value)}
              required
              disabled={!!product}
            >
              <option value="">Select product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.variants?.length ? `(${p.variants.length} sizes)` : `— current stock: ${p.stock}`}
                </option>
              ))}
            </select>
          </div>

          {hasVariants && (
            <div className="field" style={{ marginBottom: "0.9rem" }}>
              <label>Size / Variant</label>
              <select value={variantId} onChange={(e) => setVariantId(e.target.value)} required disabled={!!variant}>
                <option value="">Select size...</option>
                {variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.value} — current stock: {v.stock}
                  </option>
                ))}
              </select>
              <span className="field-hint">This product is sold in multiple sizes — each has its own stock.</span>
            </div>
          )}

          <div className="mode-switch" style={{ gridTemplateColumns: "1fr 1fr 1fr", marginBottom: "0.9rem" }}>
            <button type="button" className={`mode-switch-btn ${type === "in" ? "active" : ""}`} onClick={() => setType("in")}>
              <span className="mode-switch-title">Stock In</span>
              <span className="mode-switch-desc">Restock / received</span>
            </button>
            <button type="button" className={`mode-switch-btn ${type === "out" ? "active" : ""}`} onClick={() => setType("out")}>
              <span className="mode-switch-title">Stock Out</span>
              <span className="mode-switch-desc">Damage / loss</span>
            </button>
            <button type="button" className={`mode-switch-btn ${type === "adjustment" ? "active" : ""}`} onClick={() => setType("adjustment")}>
              <span className="mode-switch-title">Adjustment</span>
              <span className="mode-switch-desc">Manual correction</span>
            </button>
          </div>

          <div className="form-grid">
            <div className="field">
              <label>Quantity</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>
                Reason / note <span className="field-optional">(optional)</span>
              </label>
              <input placeholder="e.g. Supplier delivery" value={reason} onChange={(e) => setReason(e.target.value)} />
            </div>
          </div>

          {currentStock !== undefined && currentStock !== null && quantity !== "" && (!hasVariants || selectedVariant) && (
            <div className="stock-preview">
              Current stock <strong>{currentStock}</strong> {type === "out" ? "−" : "+"} {qtyNum} ={" "}
              <strong className={previewStock < 0 ? "low-stock" : ""}>{previewStock}</strong> new stock
            </div>
          )}

          <div className="form-footer">
            <button type="submit" className="submit-btn" disabled={saving}>
              {saving ? "Saving..." : "Save Adjustment"}
            </button>
            <button type="button" className="secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [historySearch, setHistorySearch] = useState("");
  const [historyType, setHistoryType] = useState("");
  const [modal, setModal] = useState(null); // null = closed, { product, variant? } = open

  function load() {
    setLoading(true);
    Promise.all([api.get("/products"), api.get("/inventory/logs")])
      .then(([p, l]) => {
        setProducts(p);
        setLogs(l);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  function handleSaved(newStock) {
    setMessage(`Stock updated. New stock: ${newStock}`);
    setModal(null);
    load();
  }

  const filteredProducts = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [products, search]
  );

  const filteredLogs = useMemo(
    () =>
      logs.filter((l) => {
        const matchesSearch = (l.productName || "").toLowerCase().includes(historySearch.toLowerCase());
        const matchesType = !historyType || l.type === historyType;
        return matchesSearch && matchesType;
      }),
    [logs, historySearch, historyType]
  );

  const productAggregateStock = (p) =>
    p.variants?.length ? p.variants.reduce((sum, v) => sum + Number(v.stock || 0), 0) : Number(p.stock || 0);

  const totalUnits = products.reduce((sum, p) => sum + productAggregateStock(p), 0);
  const lowStockCount = products.filter((p) => {
    const s = productAggregateStock(p);
    return s > 0 && s <= LOW_STOCK_THRESHOLD;
  }).length;
  const outOfStockCount = products.filter((p) => productAggregateStock(p) <= 0).length;

  return (
    <div>
      <div className="page-header-row">
        <h1>Inventory</h1>
        <button className="submit-btn" onClick={() => setModal({ product: null })}>
          + Adjust Stock
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}
      {message && <div className="success-banner">{message}</div>}

      <div className="stat-grid" style={{ marginBottom: "1.25rem" }}>
        <div className="stat-card" style={{ cursor: "default" }}>
          <div className="stat-icon tone-blue">
            <ProductsIcon width={20} height={20} />
          </div>
          <div className="stat-body">
            <div className="stat-value">{totalUnits}</div>
            <div className="stat-label">Total Units in Stock</div>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: "default" }}>
          <div className="stat-icon tone-amber">
            <AlertIcon width={20} height={20} />
          </div>
          <div className="stat-body">
            <div className="stat-value">{lowStockCount}</div>
            <div className="stat-label">Low Stock (≤{LOW_STOCK_THRESHOLD})</div>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: "default" }}>
          <div className="stat-icon tone-red">
            <AlertIcon width={20} height={20} />
          </div>
          <div className="stat-body">
            <div className="stat-value">{outOfStockCount}</div>
            <div className="stat-label">Out of Stock</div>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: "default" }}>
          <div className="stat-icon tone-violet">
            <InventoryIcon width={20} height={20} />
          </div>
          <div className="stat-body">
            <div className="stat-value">{logs.length}</div>
            <div className="stat-label">Total Movements</div>
          </div>
        </div>
      </div>

      <div className="tabs-bar">
        <button className={`tab-btn ${tab === "overview" ? "active" : ""}`} onClick={() => setTab("overview")}>
          Stock Overview
        </button>
        <button className={`tab-btn ${tab === "history" ? "active" : ""}`} onClick={() => setTab("history")}>
          Movement History
        </button>
      </div>

      {loading ? (
        <p className="page-loading">Loading...</p>
      ) : tab === "overview" ? (
        <>
          <input
            className="search-box"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Current Stock</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const hasVariants = p.variants?.length > 0;
                const aggStock = productAggregateStock(p);
                const status = stockStatus(aggStock);

                if (!hasVariants) {
                  return (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.sku || "-"}</td>
                      <td>
                        <strong className={status.cls === "badge-red" ? "low-stock" : ""}>{p.stock}</strong>
                      </td>
                      <td>
                        <span className={`status-badge ${status.cls}`}>{status.label}</span>
                      </td>
                      <td className="row-actions">
                        <button className="secondary" onClick={() => setModal({ product: p })}>
                          Adjust
                        </button>
                      </td>
                    </tr>
                  );
                }

                return (
                  <Fragment key={p.id}>
                    <tr className="category-row-main">
                      <td>
                        <span className="category-name-cell">
                          <ProductsIcon width={16} height={16} />
                          <strong>{p.name}</strong>
                          <span className="status-badge badge-blue">{p.variants.length} sizes</span>
                        </span>
                      </td>
                      <td>{p.sku || "-"}</td>
                      <td>
                        <strong className={status.cls === "badge-red" ? "low-stock" : ""}>{aggStock}</strong>
                      </td>
                      <td>
                        <span className={`status-badge ${status.cls}`}>{status.label}</span>
                      </td>
                      <td></td>
                    </tr>
                    {p.variants.map((v) => {
                      const vStatus = stockStatus(v.stock);
                      return (
                        <tr key={v.id} className="category-row-sub">
                          <td>
                            <span className="category-name-cell sub">{v.value}</span>
                          </td>
                          <td>{v.sku || "-"}</td>
                          <td>
                            <strong className={vStatus.cls === "badge-red" ? "low-stock" : ""}>{v.stock}</strong>
                          </td>
                          <td>
                            <span className={`status-badge ${vStatus.cls}`}>{vStatus.label}</span>
                          </td>
                          <td className="row-actions">
                            <button className="secondary" onClick={() => setModal({ product: p, variant: v })}>
                              Adjust
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </Fragment>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5}>No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div className="inline-form" style={{ marginBottom: "0.75rem" }}>
            <input
              placeholder="Search by product name..."
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
            />
            <select value={historyType} onChange={(e) => setHistoryType(e.target.value)}>
              <option value="">All types</option>
              <option value="in">Stock In</option>
              <option value="out">Stock Out</option>
              <option value="adjustment">Adjustment</option>
            </select>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((l) => (
                <tr key={l.id}>
                  <td>{new Date(l.createdAt).toLocaleString("en-IN")}</td>
                  <td>
                    {l.productName}
                    {l.variantValue ? ` — ${l.variantValue}` : ""}
                  </td>
                  <td>
                    <span className={`status-badge ${TYPE_BADGE[l.type] || "badge-blue"}`}>
                      {TYPE_LABEL[l.type] || l.type}
                    </span>
                  </td>
                  <td className={l.delta > 0 ? "" : "low-stock"}>{l.delta > 0 ? `+${l.delta}` : l.delta}</td>
                  <td>{l.reason || "-"}</td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5}>No stock movements found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {modal && (
        <AdjustModal
          product={modal.product}
          variant={modal.variant}
          products={products}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
