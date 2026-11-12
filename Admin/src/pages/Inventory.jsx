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
  const [stockEnabled, setStockEnabled] = useState(false);
  const [togglingStock, setTogglingStock] = useState(false);

  function load() {
    setLoading(true);
    Promise.all([
      api.get("/products"),
      api.get("/inventory/logs"),
      api.get("/inventory/settings").catch(() => ({ stockManagementEnabled: false })),
    ])
      .then(([p, l, s]) => {
        setProducts(p);
        setLogs(l);
        if (s && s.stockManagementEnabled !== undefined) {
          setStockEnabled(Boolean(s.stockManagementEnabled));
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleToggleStock() {
    setTogglingStock(true);
    setError("");
    setMessage("");
    try {
      const nextState = !stockEnabled;
      const res = await api.patch("/inventory/settings", { enabled: nextState });
      setStockEnabled(Boolean(res.stockManagementEnabled));
      setMessage(
        res.stockManagementEnabled
          ? "Stock Management is now ON. Inventory limits and stock tracking are active."
          : "Stock Management is now OFF. Storefront will not show out-of-stock messages and customers can order freely."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setTogglingStock(false);
    }
  }

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
    <div className="inventory-container" style={{ paddingBottom: "2rem" }}>
      <div
        className="page-header-row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.75rem",
          paddingBottom: "1.25rem",
          borderBottom: "1px solid var(--border-light, #e2e8f0)",
          flexWrap: "wrap",
          gap: "1.25rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <h1 style={{ margin: 0, fontSize: "1.65rem", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.02em" }}>
              Warehouse & Inventory
            </h1>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "3px 9px",
                borderRadius: "20px",
                background: stockEnabled ? "#dcfce7" : "#fee2e2",
                color: stockEnabled ? "#15803d" : "#b91c1c",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: stockEnabled ? "#16a34a" : "#dc2626",
                }}
              />
              {stockEnabled ? "Stock Tracking Active" : "Stock Tracking Disabled"}
            </span>
          </div>
          <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: "0.88rem" }}>
            Real-time multi-variant inventory control, warehouse stock reconciliation, and stock policies.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          {/* Stock Management Global Switch */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.85rem",
              background: stockEnabled ? "#f8fafc" : "#fef2f2",
              border: `1px solid ${stockEnabled ? "#cbd5e1" : "#fecaca"}`,
              borderRadius: "10px",
              padding: "7px 14px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#64748b",
                  fontWeight: "700",
                }}
              >
                Storefront Stock Policy
              </span>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "800",
                  color: stockEnabled ? "#0f172a" : "#b91c1c",
                }}
              >
                {stockEnabled ? "Limit Orders by Stock" : "Allow Unlimited Orders"}
              </span>
            </div>

            <button
              type="button"
              onClick={handleToggleStock}
              disabled={togglingStock}
              style={{
                background: stockEnabled ? "#dc2626" : "#16a34a",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "7px 14px",
                fontSize: "0.82rem",
                fontWeight: "700",
                cursor: togglingStock ? "wait" : "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                transition: "all 0.15s ease",
              }}
              title="Click to toggle Stock Management on or off"
            >
              {togglingStock
                ? "Updating..."
                : stockEnabled
                ? "Turn OFF Stock Limit"
                : "Turn ON Stock Limit"}
            </button>
          </div>

          <button
            className="submit-btn"
            onClick={() => setModal({ product: null })}
            style={{
              padding: "0.6rem 1.2rem",
              fontSize: "0.88rem",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>+</span> Adjust Stock
          </button>
        </div>
      </div>

      {!stockEnabled && (
        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "8px",
            padding: "0.85rem 1.15rem",
            marginBottom: "1.25rem",
            color: "#1e40af",
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <strong>Stock Management is currently turned OFF:</strong>
            <div style={{ marginTop: "2px", color: "#3b82f6" }}>
              The storefront does not display stock counts or &quot;Out of Stock&quot; warnings. Customers can purchase all products without stock limits.
            </div>
          </div>
          <span style={{ background: "#dbeafe", color: "#1e40af", padding: "4px 10px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "700", whiteSpace: "nowrap" }}>
            Storefront: Unlimited Stock
          </span>
        </div>
      )}

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
                <th style={{ width: "36%" }}>Product</th>
                <th style={{ width: "20%" }}>SKU</th>
                <th style={{ width: "16%", textAlign: "center" }}>Current Stock</th>
                <th style={{ width: "16%", textAlign: "center" }}>Status</th>
                <th style={{ width: "12%", textAlign: "right" }}>Actions</th>
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
                      <td>
                        <span className="category-name-cell">
                          <ProductsIcon width={16} height={16} />
                          <strong>{p.name}</strong>
                        </span>
                      </td>
                      <td><code>{p.sku || "-"}</code></td>
                      <td style={{ textAlign: "center" }}>
                        <strong className={status.cls === "badge-red" ? "low-stock" : ""}>{p.stock}</strong>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <span className={`status-badge ${status.cls}`}>{status.label}</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
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
                      <td><code>{p.sku || "-"}</code></td>
                      <td style={{ textAlign: "center" }}>
                        <strong className={status.cls === "badge-red" ? "low-stock" : ""}>{aggStock}</strong>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <span className={`status-badge ${status.cls}`}>{status.label}</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button className="secondary" onClick={() => setModal({ product: p })}>
                          Adjust
                        </button>
                      </td>
                    </tr>
                    {p.variants.map((v) => {
                      const vStatus = stockStatus(v.stock);
                      return (
                        <tr key={v.id} className="category-row-sub">
                          <td>
                            <span className="category-name-cell sub">
                              <span style={{ color: "#94a3b8", marginRight: "4px" }}>↳</span>
                              {v.value}
                            </span>
                          </td>
                          <td><code>{v.sku || "-"}</code></td>
                          <td style={{ textAlign: "center" }}>
                            <strong className={vStatus.cls === "badge-red" ? "low-stock" : ""}>{v.stock}</strong>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <span className={`status-badge ${vStatus.cls}`}>{vStatus.label}</span>
                          </td>
                          <td style={{ textAlign: "right" }}>
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
