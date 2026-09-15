import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { auth } from "../firebase";
import {
  CustomersIcon,
  OrdersIcon,
  InvoicesIcon,
  SearchIcon,
  EyeIcon,
  CartIcon,
  TargetIcon,
  SparklesIcon,
  ClockIcon,
  ProductsIcon,
} from "../components/Icons";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ORDER_STATUS_CLASS = {
  pending: "badge-amber",
  confirmed: "badge-blue",
  shipped: "badge-blue",
  delivered: "badge-green",
  cancelled: "badge-red",
};

const INVOICE_STATUS_CLASS = {
  unpaid: "badge-amber",
  paid: "badge-green",
  cancelled: "badge-red",
};

function initialsOf(name, email) {
  const source = (name || email || "?").trim();
  const parts = source.split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

export default function CustomerProfile() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pdfError, setPdfError] = useState("");
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'orders' | 'behavior' | 'products' | 'signals'

  useEffect(() => {
    fetchCustomer360();
  }, [id]);

  async function fetchCustomer360() {
    setLoading(true);
    setError("");
    try {
      const [profileData, allInvoices] = await Promise.all([
        api.get(`/customers/${id}`),
        api.get("/invoices"),
      ]);
      setData(profileData);
      setInvoices(allInvoices.filter((inv) => inv.customerId === Number(id)));
    } catch (err) {
      setError(err.message || "Failed to load Customer 360 profile");
    } finally {
      setLoading(false);
    }
  }

  async function openPdf(invId) {
    setPdfError("");
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`${BASE_URL}/invoices/${invId}/pdf`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Could not load invoice PDF");
      const blob = await res.blob();
      window.open(URL.createObjectURL(blob), "_blank");
    } catch (err) {
      setPdfError(err.message);
    }
  }

  if (loading)
    return (
      <div className="page-loading">Loading Customer 360 intelligence...</div>
    );
  if (error) return <div className="error-banner">{error}</div>;
  if (!data?.customer)
    return <div className="dash-empty">Customer record not found.</div>;

  const {
    customer,
    kpis = {},
    rfm = {},
    orders = [],
    cancellations = [],
    productEngagement = [],
    savedProducts = [],
    activityTimeline = [],
    searchHistory = [],
    sessions = [],
    categoryAffinity = [],
    marketingSignals = [],
    addresses = [],
  } = data;

  return (
    <div className="analytics-page">
      <Link to="/customers" className="back-link">
        ← Back to Customers List
      </Link>

      {/* Customer 360 Hero Identity Header */}
      <div
        className="product-detail-hero-card"
        style={{ marginTop: "0.75rem" }}
      >
        <div className="hero-product-main">
          <div className="hero-product-meta">
            <span
              className={`segment-pill ${
                rfm.segment?.includes("Champions") ||
                rfm.segment?.includes("High Value")
                  ? "seg-champ"
                  : rfm.segment?.includes("Loyal") ||
                      rfm.segment?.includes("Repeat")
                    ? "seg-loyal"
                    : "seg-default"
              }`}
            >
              {rfm.segment || "Customer"}
            </span>
            <span className="status-badge badge-blue">
              Customer ID #{customer.id}
            </span>
          </div>

          <div
            className="customer-detail-header"
            style={{ marginBottom: 0, marginTop: "0.5rem" }}
          >
            <span className="user-avatar customer-detail-avatar">
              {initialsOf(customer.name, customer.email)}
            </span>
            <div>
              <h1 className="hero-product-title" style={{ margin: 0 }}>
                {customer.name || "Unnamed Clinician"}
              </h1>
              <div
                className="customer-email"
                style={{ fontSize: "14px", marginTop: "2px" }}
              >
                {customer.email}
              </div>
            </div>
          </div>

          <div className="hero-product-sub" style={{ marginTop: "1rem" }}>
            <span>
              Phone: <strong>{customer.phone || "Not provided"}</strong>
            </span>
            <span>
              Registered:{" "}
              <strong>
                {customer.createdAt
                  ? new Date(customer.createdAt).toLocaleDateString("en-IN")
                  : "—"}
              </strong>
            </span>
            <span>
              RFM Recency: <strong>Score {rfm.recencyScore}/5</strong>
            </span>
            <span>
              RFM Frequency: <strong>Score {rfm.frequencyScore}/5</strong>
            </span>
            <span>
              RFM Monetary: <strong>Score {rfm.monetaryScore}/5</strong>
            </span>
          </div>
        </div>

        <div className="hero-quick-stats">
          <div className="stat-pill highlight">
            <span className="stat-k">Lifetime Spend</span>
            <strong className="stat-v">
              ₹{(kpis.totalSpend || 0).toLocaleString("en-IN")}
            </strong>
          </div>
          <div className="stat-pill">
            <span className="stat-k">Total Orders</span>
            <strong className="stat-v">{kpis.totalOrders || 0}</strong>
          </div>
          <div className="stat-pill">
            <span className="stat-k">Average Order Value</span>
            <strong className="stat-v">
              ₹{(kpis.averageOrderValue || 0).toLocaleString("en-IN")}
            </strong>
          </div>
          <div className="stat-pill">
            <span className="stat-k">Product Views</span>
            <strong className="stat-v">{kpis.productViewsCount || 0}</strong>
          </div>
        </div>
      </div>

      {/* 12 Customer 360 KPI Grid */}
      <div
        className="analytics-kpi-grid"
        style={{
          marginTop: "1.25rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        }}
      >
        <div className="analytics-kpi-card tone-blue">
          <span className="kpi-title">Total Orders</span>
          <h2 className="kpi-main-value">{kpis.totalOrders || 0}</h2>
        </div>
        <div className="analytics-kpi-card tone-green">
          <span className="kpi-title">Total Spend</span>
          <h2 className="kpi-main-value">
            ₹{(kpis.totalSpend || 0).toLocaleString("en-IN")}
          </h2>
        </div>
        <div className="analytics-kpi-card tone-indigo">
          <span className="kpi-title">Average Order Value</span>
          <h2 className="kpi-main-value">
            ₹{(kpis.averageOrderValue || 0).toLocaleString("en-IN")}
          </h2>
        </div>
        <div className="analytics-kpi-card tone-emerald">
          <span className="kpi-title">Items Purchased</span>
          <h2 className="kpi-main-value">{kpis.totalItemsPurchased || 0}</h2>
        </div>
        <div className="analytics-kpi-card tone-rose">
          <span className="kpi-title">Cancellations</span>
          <h2 className="kpi-main-value">{kpis.totalCancellations || 0}</h2>
        </div>
        <div className="analytics-kpi-card tone-pink">
          <span className="kpi-title">Saved Products</span>
          <h2 className="kpi-main-value">{kpis.savedProductsCount || 0}</h2>
        </div>
        <div className="analytics-kpi-card tone-cyan">
          <span className="kpi-title">Product Views</span>
          <h2 className="kpi-main-value">{kpis.productViewsCount || 0}</h2>
        </div>
        <div className="analytics-kpi-card tone-violet">
          <span className="kpi-title">Search Queries</span>
          <h2 className="kpi-main-value">{kpis.searchCount || 0}</h2>
        </div>
        <div className="analytics-kpi-card tone-amber">
          <span className="kpi-title">Sessions</span>
          <h2 className="kpi-main-value">{kpis.totalSessions || 0}</h2>
        </div>
        <div className="analytics-kpi-card tone-teal">
          <span className="kpi-title">Time on Platform</span>
          <h2 className="kpi-main-value">
            {Math.round((kpis.totalTimeSpentSeconds || 0) / 60)}m
          </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="analytics-tabs-header" style={{ marginTop: "1.5rem" }}>
        <button
          type="button"
          className={`analytics-tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <TargetIcon width={16} height={16} />
          <span>Overview & Addresses</span>
        </button>
        <button
          type="button"
          className={`analytics-tab-btn ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <OrdersIcon width={16} height={16} />
          <span>Orders & Invoices ({orders.length})</span>
        </button>
        <button
          type="button"
          className={`analytics-tab-btn ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          <ProductsIcon width={16} height={16} />
          <span>Product Engagement ({productEngagement.length})</span>
        </button>
        <button
          type="button"
          className={`analytics-tab-btn ${activeTab === "behavior" ? "active" : ""}`}
          onClick={() => setActiveTab("behavior")}
        >
          <EyeIcon width={16} height={16} />
          <span>Activity Timeline & Searches</span>
        </button>
        <button
          type="button"
          className={`analytics-tab-btn ${activeTab === "signals" ? "active" : ""}`}
          onClick={() => setActiveTab("signals")}
        >
          <SparklesIcon width={16} height={16} />
          <span>Marketing Signals ({marketingSignals.length})</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & ADDRESSES */}
      {activeTab === "overview" && (
        <div className="analytics-two-col-grid">
          {/* Saved Delivery Addresses */}
          <div className="analytics-card-panel">
            <h3 className="panel-heading">Practice & Delivery Addresses</h3>
            <p className="panel-subheading">
              Shipping and clinic locations associated with this customer.
            </p>
            {addresses.length ? (
              <div className="address-cards">
                {addresses.map((a) => (
                  <div key={a.id} className="address-card">
                    <span className="status-badge badge-blue">{a.label}</span>
                    <p style={{ margin: "8px 0" }}>
                      {a.line1}
                      {a.line2 ? `, ${a.line2}` : ""}
                      <br />
                      {a.city}, {a.state} - {a.pincode}
                    </p>
                    {a.phone && <p className="field-hint">Phone: {a.phone}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="dash-empty">No addresses registered.</p>
            )}
          </div>

          {/* Category Affinity & RFM Analysis */}
          <div className="analytics-card-panel">
            <h3 className="panel-heading">
              Category Affinity & RFM Value Analysis
            </h3>
            <p className="panel-subheading">
              Interaction distribution across medical catalog categories.
            </p>

            <div style={{ marginTop: "1rem" }}>
              {categoryAffinity.map((ca, idx) => (
                <div key={idx} className="category-affinity-row">
                  <span className="cat-aff-name">{ca.categoryName}</span>
                  <div className="cat-aff-bar-wrap">
                    <div
                      className="cat-aff-bar"
                      style={{
                        width: `${Math.min(100, Math.max(15, (ca.interactionCount / (categoryAffinity[0]?.interactionCount || 1)) * 100))}%`,
                      }}
                    ></div>
                  </div>
                  <strong className="cat-aff-count">
                    {ca.interactionCount} events
                  </strong>
                </div>
              ))}
              {categoryAffinity.length === 0 && (
                <p className="dash-empty">
                  No category browsing events recorded yet.
                </p>
              )}
            </div>

            <div className="rfm-explainer-box" style={{ marginTop: "1.5rem" }}>
              <h4>RFM Segmentation Rules</h4>
              <p>
                <strong>Recency ({rfm.recencyScore}/5):</strong> Days since last
                purchase:{" "}
                {rfm.daysSinceLastPurchase
                  ? `${rfm.daysSinceLastPurchase} days`
                  : "Never purchased"}
                .<br />
                <strong>Frequency ({rfm.frequencyScore}/5):</strong> Total
                successful orders: {kpis.totalOrders}.<br />
                <strong>Monetary ({rfm.monetaryScore}/5):</strong> Cumulative
                lifetime revenue: ₹
                {(kpis.totalSpend || 0).toLocaleString("en-IN")}.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS & INVOICES */}
      {activeTab === "orders" && (
        <div className="analytics-tab-content">
          <div className="analytics-card-panel">
            <h3 className="panel-heading">Order History & Line Items</h3>
            <div className="analytics-table-container">
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Placed Date</th>
                    <th>Items Purchased</th>
                    <th className="num-col">Total</th>
                    <th>Order Status</th>
                    <th>Invoice</th>
                    <th style={{ width: "100px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td className="font-bold font-mono">#{o.orderNumber}</td>
                      <td>
                        {new Date(o.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td>
                        <div style={{ fontSize: "12.5px" }}>
                          {(o.items || []).map((it, i) => (
                            <div key={i} className="order-item-micro-line">
                              <span>
                                {it.name || it.productName} (x{it.quantity})
                              </span>
                              <span className="font-mono">
                                ₹{it.lineTotal.toLocaleString("en-IN")}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="num-col font-bold font-mono">
                        ₹{o.total.toLocaleString("en-IN")}
                      </td>
                      <td>
                        <span
                          className={`status-badge ${ORDER_STATUS_CLASS[o.status] || "badge-blue"}`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td>
                        {o.invoiceNumber ? (
                          <span className="font-mono">{o.invoiceNumber}</span>
                        ) : (
                          <span className="field-hint">Not generated</span>
                        )}
                      </td>
                      <td>
                        {o.invoiceId && (
                          <button
                            type="button"
                            className="secondary-btn"
                            style={{ padding: "4px 8px", fontSize: "12px" }}
                            onClick={() => openPdf(o.invoiceId)}
                          >
                            PDF
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={7} className="empty-table-cell">
                        No orders placed by this customer yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCT ENGAGEMENT & INTERACTION MATRIX */}
      {activeTab === "products" && (
        <div className="analytics-tab-content">
          <div className="analytics-card-panel">
            <h3 className="panel-heading">
              Product Interaction Matrix & Viewing Behavior
            </h3>
            <p className="panel-subheading">
              Complete log of products explored, dwell duration, cart additions,
              and purchasing decisions.
            </p>

            <div className="analytics-table-container">
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className="num-col">Views</th>
                    <th>First Viewed</th>
                    <th>Last Viewed</th>
                    <th className="num-col">Total Dwell</th>
                    <th className="num-col">Cart Adds</th>
                    <th>Saved</th>
                    <th>Purchased</th>
                  </tr>
                </thead>
                <tbody>
                  {productEngagement.map((p) => (
                    <tr key={p.id}>
                      <td className="font-bold">
                        <Link
                          to={`/analytics/products/${p.id}`}
                          className="table-link"
                        >
                          {p.name}
                        </Link>
                      </td>
                      <td className="num-col font-mono">{p.views}</td>
                      <td style={{ fontSize: "12px" }}>
                        {p.firstViewedAt
                          ? new Date(p.firstViewedAt).toLocaleDateString(
                              "en-IN",
                            )
                          : "—"}
                      </td>
                      <td style={{ fontSize: "12px" }}>
                        {p.lastViewedAt
                          ? new Date(p.lastViewedAt).toLocaleDateString("en-IN")
                          : "—"}
                      </td>
                      <td className="num-col font-mono">
                        {p.totalDwellSeconds}s
                      </td>
                      <td className="num-col font-mono">{p.cartAdds}</td>
                      <td>
                        {p.saved ? (
                          <span className="status-badge badge-green">
                            Saved
                          </span>
                        ) : (
                          <span className="field-hint">No</span>
                        )}
                      </td>
                      <td>
                        {p.purchased ? (
                          <span className="status-badge badge-green">
                            Purchased ({p.purchasedUnits})
                          </span>
                        ) : (
                          <span className="field-hint">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {productEngagement.length === 0 && (
                    <tr>
                      <td colSpan={8} className="empty-table-cell">
                        No product interactions tracked for this customer yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ACTIVITY TIMELINE & SEARCHES */}
      {activeTab === "behavior" && (
        <div className="analytics-two-col-grid">
          {/* Activity Timeline */}
          <div className="analytics-card-panel">
            <h3 className="panel-heading">Chronological Activity Journey</h3>
            <p className="panel-subheading">
              Event stream of customer session touches, searches, and cart
              actions.
            </p>

            <div className="activity-timeline-stream">
              {activityTimeline.map((ev, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <strong className="timeline-event-name">
                        {ev.eventType.replace(/_/g, " ").toUpperCase()}
                      </strong>
                      <span className="timeline-time">
                        {new Date(ev.createdAt).toLocaleString("en-IN")}
                      </span>
                    </div>
                    {ev.productName && (
                      <div className="timeline-sub">
                        Product: <strong>{ev.productName}</strong>
                      </div>
                    )}
                    {ev.searchQuery && (
                      <div className="timeline-sub">
                        Search: <em>"{ev.searchQuery}"</em>
                      </div>
                    )}
                    {ev.pageUrl && (
                      <div className="timeline-url">{ev.pageUrl}</div>
                    )}
                  </div>
                </div>
              ))}
              {activityTimeline.length === 0 && (
                <p className="dash-empty">
                  No behavioral event history recorded.
                </p>
              )}
            </div>
          </div>

          {/* Search History */}
          <div className="analytics-card-panel">
            <h3 className="panel-heading">Search Query History</h3>
            <p className="panel-subheading">
              Keywords searched by this clinician.
            </p>

            <div className="analytics-table-container">
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Keyword</th>
                    <th className="num-col">Searches</th>
                    <th>Last Searched</th>
                  </tr>
                </thead>
                <tbody>
                  {searchHistory.map((s, idx) => (
                    <tr key={idx}>
                      <td className="font-bold">🔍 "{s.searchQuery}"</td>
                      <td className="num-col font-mono">{s.count}</td>
                      <td style={{ fontSize: "12px" }}>
                        {s.lastSearchedAt
                          ? new Date(s.lastSearchedAt).toLocaleDateString(
                              "en-IN",
                            )
                          : "—"}
                      </td>
                    </tr>
                  ))}
                  {searchHistory.length === 0 && (
                    <tr>
                      <td colSpan={3} className="empty-table-cell">
                        No searches recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MARKETING SIGNALS */}
      {activeTab === "signals" && (
        <div className="analytics-tab-content">
          <div className="opportunities-grid">
            {marketingSignals.map((sig, idx) => (
              <div key={idx} className="opportunity-card priority-high">
                <div className="opp-header">
                  <span className="priority-badge badge-high">
                    {sig.severity}
                  </span>
                </div>
                <h4 className="opp-title">{sig.signal}</h4>
                <p className="opp-desc">{sig.description}</p>
              </div>
            ))}
            {marketingSignals.length === 0 && (
              <div className="empty-panel-box">
                <SparklesIcon width={32} height={32} />
                <h3>No Critical Marketing Triggers</h3>
                <p>
                  No high-intent drop-offs or inactive warnings detected for
                  this account.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
