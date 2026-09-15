import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import {
  ProductsIcon,
  SearchIcon,
  CartIcon,
  TargetIcon,
  EyeIcon,
  ClockIcon,
} from "../components/Icons";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function ProductAnalyticsDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [range, setRange] = useState("30d");

  useEffect(() => {
    fetchProductDeepDive();
  }, [id, range]);

  async function fetchProductDeepDive() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(
        `/analytics/products/${id}/deep-dive?range=${range}`,
      );
      setData(res);
    } catch (err) {
      setError(err.message || "Failed to load product analytics deep-dive");
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return (
      <div className="page-loading">
        Loading product performance intelligence...
      </div>
    );
  if (error) return <div className="error-banner">{error}</div>;
  if (!data?.product)
    return <div className="dash-empty">Product not found.</div>;

  const {
    product,
    variants = [],
    searchKeywords = [],
    funnel = {},
    dailyTrend = [],
  } = data;

  const totalViews = dailyTrend.reduce((s, d) => s + d.views, 0);
  const totalCart = dailyTrend.reduce((s, d) => s + d.cartAdds, 0);
  const totalOrders = dailyTrend.reduce((s, d) => s + d.purchases, 0);
  const totalRevenue = dailyTrend.reduce((s, d) => s + d.revenue, 0);
  const conversionRate =
    totalViews > 0 ? ((totalOrders / totalViews) * 100).toFixed(1) : "0.0";

  return (
    <div className="analytics-page">
      <Link to="/analytics/products" className="back-link">
        ← Back to Product Performance Dashboard
      </Link>

      {/* Product Hero Header */}
      <div className="product-detail-hero-card">
        <div className="hero-product-main">
          <div className="hero-product-meta">
            <span className="category-chip">
              {product.categoryName || "General Category"}
            </span>
            {product.brandName && (
              <span className="brand-chip">{product.brandName}</span>
            )}
            <span
              className={`status-badge ${product.status === "active" ? "badge-green" : "badge-amber"}`}
            >
              {product.status}
            </span>
          </div>
          <h1 className="hero-product-title">{product.name}</h1>
          <div className="hero-product-sub">
            <span>
              SKU: <strong>{product.sku || "N/A"}</strong>
            </span>
            <span>
              Base Price:{" "}
              <strong>₹{Number(product.price).toLocaleString("en-IN")}</strong>
            </span>
            <span>
              Inventory Stock: <strong>{product.stock} units</strong>
            </span>
          </div>
        </div>

        <div className="hero-quick-stats">
          <div className="stat-pill">
            <span className="stat-k">Total Views</span>
            <strong className="stat-v">{totalViews.toLocaleString()}</strong>
          </div>
          <div className="stat-pill">
            <span className="stat-k">Cart Additions</span>
            <strong className="stat-v">{totalCart.toLocaleString()}</strong>
          </div>
          <div className="stat-pill">
            <span className="stat-k">Units Sold</span>
            <strong className="stat-v">{totalOrders.toLocaleString()}</strong>
          </div>
          <div className="stat-pill highlight">
            <span className="stat-k">Total Revenue</span>
            <strong className="stat-v">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </strong>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Variant Performance Matrix & Micro Funnel */}
      <div className="analytics-two-col-grid" style={{ marginTop: "1.5rem" }}>
        {/* Variant Breakdown */}
        <div className="analytics-card-panel">
          <h3 className="panel-heading">Variant Performance Matrix</h3>
          <p className="panel-subheading">
            Breakdown of customer demand and sales across individual product
            sizes and specifications.
          </p>
          <div className="analytics-table-container">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Variant / Size</th>
                  <th>SKU</th>
                  <th className="num-col">Price</th>
                  <th className="num-col">Stock</th>
                  <th className="num-col">Units Sold</th>
                  <th className="num-col">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((v) => (
                  <tr key={v.id}>
                    <td className="font-bold">{v.value || v.attributeName}</td>
                    <td className="font-mono">{v.sku || "-"}</td>
                    <td className="num-col font-mono">
                      ₹{v.price.toLocaleString("en-IN")}
                    </td>
                    <td className="num-col font-mono">{v.stock}</td>
                    <td className="num-col font-mono font-bold">
                      {v.unitsSold}
                    </td>
                    <td className="num-col font-mono font-bold">
                      ₹{v.revenue.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
                {variants.length === 0 && (
                  <tr>
                    <td colSpan={6} className="empty-table-cell">
                      Single-variant product. All sales apply to parent SKU.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Micro Conversion Funnel */}
        <div className="analytics-card-panel">
          <h3 className="panel-heading">Product Micro-Funnel</h3>
          <p className="panel-subheading">
            Progression through view, cart, and checkout for this specific
            product.
          </p>

          <div
            className="funnel-steps-container"
            style={{ marginTop: "1.5rem" }}
          >
            <div className="funnel-step-row">
              <div className="funnel-step-info">
                <span>1. Product Page Views</span>
                <strong>{funnel.views?.toLocaleString() || totalViews}</strong>
              </div>
              <div className="funnel-bar-track">
                <div
                  className="funnel-bar-fill"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            <div className="funnel-step-row">
              <div className="funnel-step-info">
                <span>2. Added To Cart</span>
                <strong>
                  {funnel.cartAdds?.toLocaleString() || totalCart}
                </strong>
              </div>
              <div className="funnel-bar-track">
                <div
                  className="funnel-bar-fill"
                  style={{
                    width: `${totalViews > 0 ? Math.round((totalCart / totalViews) * 100) : 0}%`,
                  }}
                ></div>
              </div>
              <div className="funnel-step-dropoff">
                <span className="dropoff-badge">
                  Cart Rate:{" "}
                  <strong>
                    {totalViews > 0
                      ? ((totalCart / totalViews) * 100).toFixed(1)
                      : 0}
                    %
                  </strong>
                </span>
              </div>
            </div>

            <div className="funnel-step-row">
              <div className="funnel-step-info">
                <span>3. Orders Completed</span>
                <strong>
                  {funnel.purchases?.toLocaleString() || totalOrders}
                </strong>
              </div>
              <div className="funnel-bar-track">
                <div
                  className="funnel-bar-fill"
                  style={{
                    width: `${totalViews > 0 ? Math.round((totalOrders / totalViews) * 100) : 0}%`,
                  }}
                ></div>
              </div>
              <div className="funnel-step-dropoff">
                <span className="dropoff-badge">
                  Conversion: <strong>{conversionRate}%</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Search Keywords Leading to this Product */}
          <div style={{ marginTop: "2rem" }}>
            <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>
              Search Terms Leading to this Product
            </h4>
            <div className="keyword-chip-cloud">
              {searchKeywords.map((kw, idx) => (
                <div key={idx} className="keyword-bubble">
                  <SearchIcon width={12} height={12} />
                  <span>"{kw.searchQuery}"</span>
                  <span className="kw-count">{kw.clicks} clicks</span>
                </div>
              ))}
              {searchKeywords.length === 0 && (
                <span className="field-hint">
                  No keyword searches matched this product yet.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
