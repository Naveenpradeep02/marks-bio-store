import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import {
  ProductsIcon,
  BrandsIcon,
  CustomersIcon,
  OrdersIcon,
  AlertIcon,
  InvoicesIcon,
  InventoryIcon,
  ArrowRightIcon,
  OffersIcon,
  TrendingUpIcon,
  SparklesIcon,
  AnalyticsIcon,
  ClockIcon,
  CartIcon,
} from "../components/Icons";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const STATUS_CLASS = {
  pending: "badge-amber",
  confirmed: "badge-blue",
  shipped: "badge-blue",
  delivered: "badge-green",
  cancelled: "badge-red",
};

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [chartMetric, setChartMetric] = useState("revenue"); // "revenue" | "orders"
  const [orderFilter, setOrderFilter] = useState("all"); // "all" | "pending" | "delivered" | "wholesale"
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get("/products"),
      api.get("/brands"),
      api.get("/customers"),
      api.get("/orders"),
      api.get("/invoices"),
      api.get("/offers").catch(() => ({ offers: [] })),
      api.get("/categories").catch(() => []),
    ])
      .then(([products, brands, customers, orders, invoices, offersRes, categories]) => {
        setData({
          products: products || [],
          brands: brands || [],
          customers: customers || [],
          orders: orders || [],
          invoices: invoices || [],
          offers: offersRes?.offers || [],
          categories: categories || [],
        });
      })
      .catch((err) => setError(err.message));
  }, []);

  // Compute 14-day chronological timeline
  const chartData = useMemo(() => {
    if (!data?.orders) return [];
    const days = [];
    const now = new Date();

    for (let i = 13; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });

      const dayOrders = data.orders.filter(
        (o) => o.createdAt && o.createdAt.slice(0, 10) === dateStr
      );

      const rev = dayOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
      const count = dayOrders.length;

      days.push({
        date: dateStr,
        label,
        revenue: Math.round(rev),
        orders: count,
      });
    }
    return days;
  }, [data?.orders]);

  if (error) return <div className="error-banner">{error}</div>;

  if (!data) {
    return (
      <div className="dash-premium-wrapper">
        <div className="dash-skeleton-header" style={{ height: 110, borderRadius: 14 }} />
        <div className="dash-kpi-grid">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="dash-kpi-card skeleton" style={{ height: 120 }} />
          ))}
        </div>
      </div>
    );
  }

  const { products, brands, customers, orders, invoices, offers } = data;

  // Executive Metrics
  const grossRevenue = orders.reduce(
    (sum, o) => sum + Number(o.subtotal || o.total || 0),
    0
  );
  const totalDiscountSavings = orders.reduce(
    (sum, o) => sum + Number(o.discountTotal || 0),
    0
  );
  const netRevenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const unpaidInvoices = invoices.filter((i) => i.status === "unpaid");
  const unpaidTotal = unpaidInvoices.reduce((s, i) => s + Number(i.total || 0), 0);
  const retailCustomers = customers.filter(
    (c) => !c.customerType || c.customerType === "retail"
  ).length;
  const wholesaleCustomers = customers.filter(
    (c) => c.customerType === "wholesale"
  ).length;
  const activeOffers = offers.filter((o) => o.status === "active");
  const totalOfferRedemptions = offers.reduce(
    (sum, o) => sum + Number(o.usage_count || o.times_used || 0),
    0
  );

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "pending") return o.status === "pending";
    if (orderFilter === "delivered") return o.status === "delivered";
    if (orderFilter === "wholesale") {
      const cust = customers.find((c) => c.email === o.customerEmail);
      return cust?.customerType === "wholesale";
    }
    return true;
  });

  const recentOrders = [...filteredOrders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 7);

  // SVG Chart Dimensions
  const maxRev = Math.max(...chartData.map((d) => d.revenue), 1000);
  const maxOrders = Math.max(...chartData.map((d) => d.orders), 5);
  const maxVal = chartMetric === "revenue" ? maxRev : maxOrders;
  const chartHeight = 160;
  const chartWidth = 600;
  const paddingX = 25;
  const paddingY = 20;

  const points = chartData.map((d, idx) => {
    const x = paddingX + (idx / (chartData.length - 1)) * (chartWidth - paddingX * 2);
    const val = chartMetric === "revenue" ? d.revenue : d.orders;
    const y = chartHeight - paddingY - (val / (maxVal || 1)) * (chartHeight - paddingY * 2);
    return { x, y, data: d };
  });

  const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x} ${p.y}`, "");
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  return (
    <div className="dash-premium-wrapper">
      {/* 1. Executive Hero Header */}
      <div className="dash-executive-hero">
        <div className="dash-hero-title-group">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
            <span className="dash-hero-status-pill">Clinical Operations Active</span>
            <span style={{ fontSize: "0.75rem", color: "#cbd5e1" }}>
              • {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
          <h1>
            {greeting()}, {user?.email ? user.email.split("@")[0].toUpperCase() : "DIRECTOR"}
          </h1>
          <p className="dash-hero-sub">
            Real-time Marks Biotech enterprise analytics, offer management engine, and clinical order transactions.
          </p>
        </div>

        <div className="dash-hero-actions">
          <Link to="/offers/new" className="dash-hero-btn dash-hero-btn-primary">
            <SparklesIcon width={16} height={16} />
            <span>+ Create Campaign</span>
          </Link>
          <Link to="/products/new" className="dash-hero-btn dash-hero-btn-secondary">
            <ProductsIcon width={16} height={16} />
            <span>+ Add Product</span>
          </Link>
          <Link to="/invoices" className="dash-hero-btn dash-hero-btn-secondary">
            <InvoicesIcon width={16} height={16} />
            <span>Invoices</span>
          </Link>
          <Link to="/customers" className="dash-hero-btn dash-hero-btn-secondary">
            <CustomersIcon width={16} height={16} />
            <span>Customer 360</span>
          </Link>
        </div>
      </div>

      {/* 2. Executive 5-KPI Ribbon */}
      <div className="dash-kpi-grid">
        {/* Card 1: Gross Invoiced Revenue */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-top">
            <div className="dash-kpi-icon-box kpi-blue">
              <OrdersIcon width={20} height={20} />
            </div>
            <span className="dash-kpi-badge badge-trend-up">
              <TrendingUpIcon width={12} height={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 2 }} />
              GROSS
            </span>
          </div>
          <div>
            <div className="dash-kpi-value">₹{grossRevenue.toLocaleString("en-IN")}</div>
            <div className="dash-kpi-label">Gross Order Volume</div>
          </div>
          <div className="dash-kpi-sub">
            <span>Catalog value prior to discounts</span>
          </div>
        </div>

        {/* Card 2: Promotional Savings Disbursed (Offers Engine) */}
        <Link to="/offers" className="dash-kpi-card" style={{ borderLeft: "3px solid #dc2626" }}>
          <div className="dash-kpi-top">
            <div className="dash-kpi-icon-box kpi-red">
              <OffersIcon width={20} height={20} />
            </div>
            <span className="dash-kpi-badge badge-trend-promo">OFFERS ENGINE</span>
          </div>
          <div>
            <div className="dash-kpi-value" style={{ color: "#dc2626" }}>
              -₹{totalDiscountSavings.toLocaleString("en-IN")}
            </div>
            <div className="dash-kpi-label">Savings Disbursed</div>
          </div>
          <div className="dash-kpi-sub">
            <span style={{ color: "#dc2626", fontWeight: 700 }}>
              {activeOffers.length} Active Campaigns
            </span>
            <span>• {totalOfferRedemptions} redemptions</span>
          </div>
        </Link>

        {/* Card 3: Realized Net Clinical Revenue */}
        <div className="dash-kpi-card" style={{ borderLeft: "3px solid #059669" }}>
          <div className="dash-kpi-top">
            <div className="dash-kpi-icon-box kpi-emerald">
              <AnalyticsIcon width={20} height={20} />
            </div>
            <span className="dash-kpi-badge badge-trend-up">NET REALIZED</span>
          </div>
          <div>
            <div className="dash-kpi-value" style={{ color: "#059669" }}>
              ₹{netRevenue.toLocaleString("en-IN")}
            </div>
            <div className="dash-kpi-label">Net Realized Revenue</div>
          </div>
          <div className="dash-kpi-sub">
            <span>Authoritative net billed amount</span>
          </div>
        </div>

        {/* Card 4: Orders & Fulfillment Rate */}
        <Link to="/orders" className="dash-kpi-card">
          <div className="dash-kpi-top">
            <div className="dash-kpi-icon-box kpi-purple">
              <CartIcon width={20} height={20} />
            </div>
            <span className="dash-kpi-badge badge-trend-neutral">
              {pendingOrders > 0 ? `${pendingOrders} Pending` : "Fulfilled"}
            </span>
          </div>
          <div>
            <div className="dash-kpi-value">{orders.length}</div>
            <div className="dash-kpi-label">Total Transactions</div>
          </div>
          <div className="dash-kpi-sub">
            <span>{deliveredOrders} delivered to clinics</span>
          </div>
        </Link>

        {/* Card 5: Clinical Customer Network */}
        <Link to="/customers" className="dash-kpi-card">
          <div className="dash-kpi-top">
            <div className="dash-kpi-icon-box kpi-amber">
              <CustomersIcon width={20} height={20} />
            </div>
            <span className="dash-kpi-badge badge-trend-neutral">TIER RATIO</span>
          </div>
          <div>
            <div className="dash-kpi-value">{customers.length}</div>
            <div className="dash-kpi-label">Clinicians &amp; Networks</div>
          </div>
          <div className="dash-kpi-sub">
            <span style={{ fontWeight: 600, color: "#0369a1" }}>{retailCustomers} Retail</span>
            <span> / </span>
            <span style={{ fontWeight: 600, color: "#7e22ce" }}>{wholesaleCustomers} Wholesale</span>
          </div>
        </Link>
      </div>

      {/* 3. Middle Section: Revenue Trajectory Chart & Offers Health */}
      <div className="dash-middle-grid">
        {/* Interactive SVG Sales Chart */}
        <div className="dash-card-box">
          <div className="dash-card-header">
            <div>
              <h2>
                <AnalyticsIcon width={18} height={18} style={{ color: "var(--brand)" }} />
                <span>14-Day Velocity Trajectory</span>
              </h2>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: 2 }}>
                Live daily sales volume and transactional velocity
              </div>
            </div>

            <div className="dash-tabs-pill">
              <button
                type="button"
                className={`dash-tab-btn ${chartMetric === "revenue" ? "active" : ""}`}
                onClick={() => setChartMetric("revenue")}
              >
                Revenue (₹)
              </button>
              <button
                type="button"
                className={`dash-tab-btn ${chartMetric === "orders" ? "active" : ""}`}
                onClick={() => setChartMetric("orders")}
              >
                Orders Count
              </button>
            </div>
          </div>

          {/* SVG Visual Graph */}
          <div style={{ position: "relative", width: "100%", height: chartHeight, marginTop: "0.5rem" }}>
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ce2017" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#ce2017" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal subtle grid guidelines */}
              <line
                x1={paddingX}
                y1={paddingY}
                x2={chartWidth - paddingX}
                y2={paddingY}
                stroke="#f1f5f9"
                strokeDasharray="4 4"
              />
              <line
                x1={paddingX}
                y1={chartHeight / 2}
                x2={chartWidth - paddingX}
                y2={chartHeight / 2}
                stroke="#f1f5f9"
                strokeDasharray="4 4"
              />
              <line
                x1={paddingX}
                y1={chartHeight - paddingY}
                x2={chartWidth - paddingX}
                y2={chartHeight - paddingY}
                stroke="#e2e8f0"
              />

              {/* Area gradient fill */}
              <path d={areaD} fill="url(#chartGradient)" />

              {/* Trajectory Stroke */}
              <path
                d={pathD}
                fill="none"
                stroke="var(--brand)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {points.map((p, idx) => (
                <circle
                  key={idx}
                  cx={p.x}
                  cy={p.y}
                  r={hoveredDay === idx ? 5 : 3}
                  fill={hoveredDay === idx ? "var(--brand)" : "#fff"}
                  stroke="var(--brand)"
                  strokeWidth="2"
                  style={{ cursor: "pointer", transition: "all 0.15s ease" }}
                  onMouseEnter={() => setHoveredDay(idx)}
                  onMouseLeave={() => setHoveredDay(null)}
                />
              ))}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredDay !== null && points[hoveredDay] && (
              <div
                style={{
                  position: "absolute",
                  left: `${(points[hoveredDay].x / chartWidth) * 100}%`,
                  top: Math.max(0, points[hoveredDay].y - 45),
                  transform: "translateX(-50%)",
                  background: "#0f172a",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  zIndex: 10,
                }}
              >
                <div>{points[hoveredDay].data.label}</div>
                <div style={{ color: "#34d399", fontWeight: 700 }}>
                  {chartMetric === "revenue"
                    ? `₹${points[hoveredDay].data.revenue.toLocaleString("en-IN")}`
                    : `${points[hoveredDay].data.orders} Orders`}
                </div>
              </div>
            )}
          </div>

          {/* Timeline Date Labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: `0 ${paddingX}px`,
              marginTop: "0.5rem",
              fontSize: "0.7rem",
              color: "#94a3b8",
            }}
          >
            <span>{chartData[0]?.label}</span>
            <span>{chartData[Math.floor(chartData.length / 2)]?.label}</span>
            <span>{chartData[chartData.length - 1]?.label} (Today)</span>
          </div>
        </div>

        {/* Right Middle Box: Live Marketing Engine Showcase */}
        <div className="dash-card-box">
          <div className="dash-card-header">
            <h2>
              <OffersIcon width={18} height={18} style={{ color: "var(--brand)" }} />
              <span>Active Promotions</span>
            </h2>
            <Link
              to="/offers"
              style={{
                fontSize: "0.75rem",
                color: "var(--brand)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              View All ({activeOffers.length}) →
            </Link>
          </div>

          {activeOffers.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem 0", color: "var(--muted)" }}>
              <p style={{ margin: 0 }}>No active promotions running currently.</p>
              <Link
                to="/offers/new"
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  fontSize: "0.8rem",
                  color: "var(--brand)",
                  fontWeight: 600,
                }}
              >
                + Launch a Promotion
              </Link>
            </div>
          ) : (
            <div>
              {activeOffers.slice(0, 4).map((off) => (
                <div key={off.id} className="campaign-mini-card">
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: 2 }}>
                      <span className="campaign-tag-badge">
                        {off.offer_type.replace("_", " ")}
                      </span>
                      {off.storefront_badge && (
                        <span
                          style={{
                            fontSize: "0.65rem",
                            background: "#ecfdf5",
                            color: "#059669",
                            padding: "1px 5px",
                            borderRadius: "4px",
                            fontWeight: 600,
                          }}
                        >
                          {off.storefront_badge}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b" }}>
                      {off.title || off.name}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#059669" }}>
                      {off.usage_count || 0} Redemptions
                    </div>
                    <Link
                      to={`/offers/${off.id}/edit`}
                      style={{ fontSize: "0.72rem", color: "var(--brand)", textDecoration: "none", fontWeight: 600 }}
                    >
                      Configure →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Bottom Section: Recent Clinical Transactions & Executive Hub */}
      <div className="dash-middle-grid">
        {/* Left Table: Recent Transactions */}
        <div className="dash-card-box">
          <div className="dash-card-header">
            <div>
              <h2>
                <CartIcon width={18} height={18} style={{ color: "var(--brand)" }} />
                <span>Recent Clinical Orders</span>
              </h2>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: 2 }}>
                Hospital purchasing orders with applied promotional savings
              </div>
            </div>

            <div className="dash-tabs-pill">
              <button
                type="button"
                className={`dash-tab-btn ${orderFilter === "all" ? "active" : ""}`}
                onClick={() => setOrderFilter("all")}
              >
                All ({orders.length})
              </button>
              <button
                type="button"
                className={`dash-tab-btn ${orderFilter === "pending" ? "active" : ""}`}
                onClick={() => setOrderFilter("pending")}
              >
                Pending ({pendingOrders})
              </button>
              <button
                type="button"
                className={`dash-tab-btn ${orderFilter === "wholesale" ? "active" : ""}`}
                onClick={() => setOrderFilter("wholesale")}
              >
                Wholesale
              </button>
            </div>
          </div>

          {recentOrders.length === 0 ? (
            <p style={{ textAlign: "center", padding: "2rem", color: "var(--muted)" }}>
              No orders found under this filter view.
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="data-table dash-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left", fontSize: "0.75rem", color: "#64748b" }}>
                    <th style={{ padding: "0.6rem 0.75rem" }}>Order &amp; Date</th>
                    <th style={{ padding: "0.6rem 0.75rem" }}>Clinician / Buyer</th>
                    <th style={{ padding: "0.6rem 0.75rem" }}>Customer Tier</th>
                    <th style={{ padding: "0.6rem 0.75rem" }}>Applied Offers</th>
                    <th style={{ padding: "0.6rem 0.75rem" }}>Total Billed</th>
                    <th style={{ padding: "0.6rem 0.75rem" }}>Status</th>
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "right" }}>Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => {
                    const cust = customers.find((c) => c.email === o.customerEmail);
                    const isWholesale = cust?.customerType === "wholesale";
                    let applied = [];
                    try {
                      applied = typeof o.appliedOffers === "string" ? JSON.parse(o.appliedOffers) : (o.appliedOffers || []);
                    } catch {
                      applied = [];
                    }

                    return (
                      <tr key={o.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "0.65rem 0.75rem" }}>
                          <span style={{ fontWeight: 700, color: "#0f172a" }}>#{o.orderNumber}</span>
                          <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
                            {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </div>
                        </td>

                        <td style={{ padding: "0.65rem 0.75rem" }}>
                          <div style={{ fontWeight: 600, fontSize: "0.82rem" }}>
                            {cust?.clinicName || o.customerName || "Clinical Order"}
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "#64748b" }}>{o.customerEmail}</div>
                        </td>

                        <td style={{ padding: "0.65rem 0.75rem" }}>
                          <span className={isWholesale ? "tier-tag-wholesale" : "tier-tag-retail"}>
                            {isWholesale ? "Wholesale" : "Retail Clinic"}
                          </span>
                        </td>

                        <td style={{ padding: "0.65rem 0.75rem" }}>
                          {applied.length > 0 ? (
                            applied.map((ao, aIdx) => (
                              <span
                                key={aIdx}
                                style={{
                                  fontSize: "0.68rem",
                                  fontWeight: 700,
                                  background: "#ecfdf5",
                                  color: "#059669",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  display: "inline-block",
                                  marginRight: 4,
                                }}
                              >
                                🏷️ {ao.badge || ao.title}
                              </span>
                            ))
                          ) : (
                            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Standard Pricing</span>
                          )}
                        </td>

                        <td style={{ padding: "0.65rem 0.75rem" }}>
                          <div style={{ fontWeight: 700, color: "#0f172a" }}>
                            ₹{Number(o.total).toLocaleString("en-IN")}
                          </div>
                          {Number(o.discountTotal) > 0 && (
                            <div style={{ fontSize: "0.68rem", color: "#059669", fontWeight: 700 }}>
                              Saved ₹{Number(o.discountTotal).toLocaleString("en-IN")}
                            </div>
                          )}
                        </td>

                        <td style={{ padding: "0.65rem 0.75rem" }}>
                          <span className={`status-badge ${STATUS_CLASS[o.status] || "badge-blue"}`}>
                            {o.status}
                          </span>
                        </td>

                        <td style={{ padding: "0.65rem 0.75rem", textAlign: "right" }}>
                          <Link
                            to="/orders"
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color: "var(--brand)",
                              textDecoration: "none",
                            }}
                          >
                            Manage →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Operations Hub */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Operations & Invoicing Alerts */}
          <div className="dash-card-box">
            <div className="dash-card-header">
              <h2>
                <AlertIcon width={18} height={18} style={{ color: "#d97706" }} />
                <span>Operations &amp; Billing</span>
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <Link
                to="/orders"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  background: pendingOrders > 0 ? "#fef3c7" : "#f8fafc",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <ClockIcon width={16} height={16} style={{ color: "#b45309" }} />
                  <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Orders Pending Dispatch</span>
                </div>
                <strong style={{ color: "#b45309" }}>{pendingOrders}</strong>
              </Link>

              <Link
                to="/invoices"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  background: unpaidInvoices.length > 0 ? "#fff1f2" : "#f8fafc",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <InvoicesIcon width={16} height={16} style={{ color: "#be123c" }} />
                  <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Unpaid Tax Invoices</span>
                </div>
                <strong style={{ color: "#be123c" }}>
                  {unpaidInvoices.length} (₹{unpaidTotal.toLocaleString("en-IN")})
                </strong>
              </Link>

              <Link
                to="/products"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  background: "#f8fafc",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <ProductsIcon width={16} height={16} style={{ color: "var(--brand)" }} />
                  <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Active Surgical Catalog</span>
                </div>
                <strong>{products.length} Items</strong>
              </Link>
            </div>
          </div>

          {/* Recent Clinicians / Practitioners */}
          <div className="dash-card-box">
            <div className="dash-card-header">
              <h2>
                <CustomersIcon width={18} height={18} style={{ color: "#0369a1" }} />
                <span>Recent Clinicians</span>
              </h2>
              <Link
                to="/customers"
                style={{ fontSize: "0.75rem", color: "var(--brand)", textDecoration: "none", fontWeight: 600 }}
              >
                View Directory →
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {customers.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "0.5rem",
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: c.customerType === "wholesale" ? "#f3e8ff" : "#e0f2fe",
                        color: c.customerType === "wholesale" ? "#7e22ce" : "#0369a1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {(c.name || c.email || "Dr")[0].toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1e293b" }}>
                        {c.name || c.clinicName || c.email.split("@")[0]}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#64748b" }}>{c.city || c.email}</div>
                    </div>
                  </div>

                  <span className={c.customerType === "wholesale" ? "tier-tag-wholesale" : "tier-tag-retail"}>
                    {c.customerType === "wholesale" ? "Wholesale" : "Retail"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
