import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import {
  AnalyticsIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  SearchIcon,
  EyeIcon,
  FunnelIcon,
  ExportIcon,
  TargetIcon,
  SparklesIcon,
  ClockIcon,
  CartIcon,
  ProductsIcon,
} from "../components/Icons";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const DATE_PRESETS = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "7d", label: "Last 7 Days" },
  { id: "30d", label: "Last 30 Days" },
  { id: "90d", label: "Last 90 Days" },
  { id: "this_year", label: "This Year" },
  { id: "custom", label: "Custom Range" },
];

export default function ProductAnalytics() {
  const navigate = useNavigate();
  const [range, setRange] = useState("30d");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [activeTab, setActiveTab] = useState("catalog"); // 'catalog' | 'search' | 'diagnostics' | 'opportunities' | 'funnel'
  const [searchFilter, setSearchFilter] = useState("");
  const [sortBy, setSortBy] = useState("views_desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, [range, customStart, customEnd]);

  async function fetchDashboard() {
    if (range === "custom" && (!customStart || !customEnd)) return;
    setLoading(true);
    setError("");

    try {
      let query = `?range=${range}`;
      if (range === "custom") {
        query += `&startDate=${customStart}&endDate=${customEnd}`;
      }
      const res = await api.get(`/analytics/products/performance${query}`);
      setData(res);
    } catch (err) {
      setError(err.message || "Failed to load product analytics");
    } finally {
      setLoading(false);
    }
  }

  function handleExport(type) {
    let query = `?range=${range}`;
    if (range === "custom") {
      query += `&startDate=${customStart}&endDate=${customEnd}`;
    }
    window.open(`${API_BASE}/analytics/export/${type}${query}`, "_blank");
  }

  const kpis = data?.kpis || {};
  const rawProducts = data?.rankedProducts || [];

  // Filter and sort ranked products
  const filteredProducts = useMemo(() => {
    let list = [...rawProducts];
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q)) ||
          (p.brandName && p.brandName.toLowerCase().includes(q)) ||
          (p.categoryName && p.categoryName.toLowerCase().includes(q)),
      );
    }

    if (sortBy === "views_desc") list.sort((a, b) => b.views - a.views);
    else if (sortBy === "views_asc") list.sort((a, b) => a.views - b.views);
    else if (sortBy === "score_desc")
      list.sort((a, b) => b.interestScore - a.interestScore);
    else if (sortBy === "revenue_desc")
      list.sort((a, b) => b.revenue - a.revenue);
    else if (sortBy === "orders_desc")
      list.sort((a, b) => b.ordersCount - a.ordersCount);
    else if (sortBy === "conversion_desc")
      list.sort((a, b) => b.conversionRate - a.conversionRate);
    else if (sortBy === "cart_desc")
      list.sort((a, b) => b.cartAdds - a.cartAdds);
    else if (sortBy === "dwell_desc")
      list.sort((a, b) => b.avgDwellSeconds - a.avgDwellSeconds);

    return list;
  }, [rawProducts, searchFilter, sortBy]);

  return (
    <div className="analytics-page">
      {/* Header & Date Range Toolbar */}
      <div className="analytics-header-row">
        <div>
          <div className="analytics-badge-label">
            <SparklesIcon width={14} height={14} />
            <span>Product Intelligence Engine</span>
          </div>
          <h1 className="analytics-title">Product Performance</h1>
          <p className="analytics-subtitle">
            Zero-mock customer behavioral metrics, conversion tracking & demand
            analytics.
          </p>
        </div>

        <div className="analytics-actions-toolbar">
          <button
            type="button"
            className="secondary-btn export-btn"
            onClick={() => handleExport("products")}
            title="Download CSV report"
          >
            <ExportIcon width={16} height={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Date Presets Selector */}
      <div className="date-preset-bar">
        <div className="date-pills">
          {DATE_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`date-pill ${range === p.id ? "active" : ""}`}
              onClick={() => setRange(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {range === "custom" && (
          <div className="custom-date-inputs">
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="analytics-date-input"
            />
            <span className="date-sep">to</span>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="analytics-date-input"
            />
          </div>
        )}

        {data?.dateRange && (
          <div className="active-period-indicator">
            <span>
              Current: <strong>{data.dateRange.current.start}</strong> to{" "}
              <strong>{data.dateRange.current.end}</strong>
            </span>
            <span className="period-sep">vs</span>
            <span className="prev-period-text">
              Prior: <strong>{data.dateRange.previous.start}</strong> to{" "}
              <strong>{data.dateRange.previous.end}</strong>
            </span>
          </div>
        )}
      </div>

      {error && <div className="error-banner">{error}</div>}

      {/* SECTION 1: 12 KPI CARDS WITH COMPARISONS */}
      <div className="analytics-kpi-grid">
        <KPICard
          title="Product Views"
          value={kpis.productViews?.current?.toLocaleString()}
          comp={kpis.productViews}
          icon={EyeIcon}
          tone="blue"
        />
        <KPICard
          title="Unique Viewers"
          value={kpis.uniqueViewers?.current?.toLocaleString()}
          comp={kpis.uniqueViewers}
          icon={ProductsIcon}
          tone="cyan"
        />
        <KPICard
          title="Total Searches"
          value={kpis.totalSearches?.current?.toLocaleString()}
          comp={kpis.totalSearches}
          icon={SearchIcon}
          tone="violet"
        />
        <KPICard
          title="Add To Cart"
          value={kpis.addToCart?.current?.toLocaleString()}
          comp={kpis.addToCart}
          icon={CartIcon}
          tone="amber"
        />
        <KPICard
          title="Purchases"
          value={kpis.purchases?.current?.toLocaleString()}
          comp={kpis.purchases}
          icon={TargetIcon}
          tone="green"
        />
        <KPICard
          title="Units Sold"
          value={kpis.unitsSold?.current?.toLocaleString()}
          comp={kpis.unitsSold}
          icon={ProductsIcon}
          tone="emerald"
        />
        <KPICard
          title="Revenue"
          value={`₹${(kpis.revenue?.current || 0).toLocaleString("en-IN")}`}
          comp={kpis.revenue}
          icon={AnalyticsIcon}
          tone="green"
        />
        <KPICard
          title="Product Conversion"
          value={`${kpis.conversionRate?.current || 0}%`}
          comp={kpis.conversionRate}
          icon={TargetIcon}
          tone="indigo"
          suffix="%"
        />
        <KPICard
          title="Avg Dwell Time"
          value={`${kpis.avgDwellTime?.current || 0}s`}
          comp={kpis.avgDwellTime}
          icon={ClockIcon}
          tone="teal"
          suffix="s"
        />
        <KPICard
          title="Wishlist / Save Rate"
          value={`${kpis.wishlistRate?.current || 0}%`}
          comp={kpis.wishlistRate}
          icon={SparklesIcon}
          tone="pink"
          suffix="%"
        />
        <KPICard
          title="Cancellation Rate"
          value={`${kpis.cancellationRate?.current || 0}%`}
          comp={kpis.cancellationRate}
          icon={TrendingDownIcon}
          tone="rose"
          inverseTrend
        />
        <KPICard
          title="Return Rate"
          value={`${kpis.returnRate?.current || 0}%`}
          comp={kpis.returnRate}
          icon={TrendingDownIcon}
          tone="orange"
          inverseTrend
        />
      </div>

      {/* Navigation Tabs for Modular Insights */}
      <div className="analytics-tabs-header">
        <button
          type="button"
          className={`analytics-tab-btn ${activeTab === "catalog" ? "active" : ""}`}
          onClick={() => setActiveTab("catalog")}
        >
          <ProductsIcon width={16} height={16} />
          <span>Ranked Catalog ({rawProducts.length})</span>
        </button>
        <button
          type="button"
          className={`analytics-tab-btn ${activeTab === "search" ? "active" : ""}`}
          onClick={() => setActiveTab("search")}
        >
          <SearchIcon width={16} height={16} />
          <span>Search Intelligence</span>
        </button>
        <button
          type="button"
          className={`analytics-tab-btn ${activeTab === "diagnostics" ? "active" : ""}`}
          onClick={() => setActiveTab("diagnostics")}
        >
          <TargetIcon width={16} height={16} />
          <span>Diagnostics & Declines</span>
        </button>
        <button
          type="button"
          className={`analytics-tab-btn ${activeTab === "opportunities" ? "active" : ""}`}
          onClick={() => setActiveTab("opportunities")}
        >
          <SparklesIcon width={16} height={16} />
          <span>Marketing Opportunities</span>
        </button>
        <button
          type="button"
          className={`analytics-tab-btn ${activeTab === "funnel" ? "active" : ""}`}
          onClick={() => setActiveTab("funnel")}
        >
          <FunnelIcon width={16} height={16} />
          <span>Conversion Funnel</span>
        </button>
      </div>

      {/* TAB 1: RANKED PRODUCT CATALOG TABLE */}
      {activeTab === "catalog" && (
        <div className="analytics-card-panel">
          <div className="panel-top-controls">
            <div className="table-search-wrap">
              <SearchIcon
                width={16}
                height={16}
                className="search-icon-inside"
              />
              <input
                type="text"
                className="table-search-input"
                placeholder="Search products by name, SKU, brand, or category..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>

            <div className="table-sort-wrap">
              <span className="sort-label">Sort by:</span>
              <select
                className="analytics-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="views_desc">Most Views</option>
                <option value="score_desc">Interest Score (Highest)</option>
                <option value="revenue_desc">Revenue (Highest)</option>
                <option value="orders_desc">Orders Placed</option>
                <option value="conversion_desc">Conversion Rate</option>
                <option value="cart_desc">Cart Additions</option>
                <option value="dwell_desc">Average Dwell Time</option>
              </select>
            </div>
          </div>

          <div className="analytics-table-container">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th style={{ width: "45px" }}>#</th>
                  <th>Product</th>
                  <th>Category / Brand</th>
                  <th className="num-col">Interest Score</th>
                  <th className="num-col">Views</th>
                  <th className="num-col">Unique</th>
                  <th className="num-col">Avg Dwell</th>
                  <th className="num-col">Cart Adds</th>
                  <th className="num-col">Orders</th>
                  <th className="num-col">Conv %</th>
                  <th className="num-col">Revenue</th>
                  <th style={{ width: "100px" }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p, idx) => (
                  <tr
                    key={p.id}
                    className="clickable-row"
                    onClick={() => navigate(`/analytics/products/${p.id}`)}
                  >
                    <td className="rank-cell">#{idx + 1}</td>
                    <td>
                      <div className="product-identity-cell">
                        {p.imageUrl ? (
                          <img
                            src={`${API_BASE.replace(/\/api\/?$/, "")}${p.imageUrl}`}
                            alt={p.name}
                            className="product-mini-thumb"
                          />
                        ) : (
                          <div className="product-mini-thumb-placeholder">
                            <ProductsIcon width={16} height={16} />
                          </div>
                        )}
                        <div>
                          <div className="product-table-name" title={p.name}>
                            {p.name}
                          </div>
                          <div className="product-table-sku">
                            SKU: {p.sku || "N/A"} · ₹
                            {p.price.toLocaleString("en-IN")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="cat-brand-cell">
                        <span className="category-chip">
                          {p.categoryName || "General"}
                        </span>
                        {p.brandName && (
                          <span className="brand-chip">{p.brandName}</span>
                        )}
                      </div>
                    </td>
                    <td className="num-col">
                      <div className="score-badge-wrap" title={p.scoreFormula}>
                        <span
                          className={`score-badge ${p.interestScore >= 70 ? "score-high" : p.interestScore >= 30 ? "score-med" : "score-low"}`}
                        >
                          {p.interestScore}/100
                        </span>
                      </div>
                    </td>
                    <td className="num-col font-mono">
                      {p.views.toLocaleString()}
                    </td>
                    <td className="num-col font-mono">
                      {p.uniqueViewers.toLocaleString()}
                    </td>
                    <td className="num-col font-mono">{p.avgDwellSeconds}s</td>
                    <td className="num-col font-mono">
                      {p.cartAdds.toLocaleString()}
                    </td>
                    <td className="num-col font-mono font-bold">
                      {p.ordersCount.toLocaleString()}
                    </td>
                    <td className="num-col">
                      <span
                        className={`conv-pill ${p.conversionRate >= 5 ? "conv-high" : p.conversionRate > 0 ? "conv-med" : "conv-zero"}`}
                      >
                        {p.conversionRate}%
                      </span>
                    </td>
                    <td className="num-col font-bold font-mono">
                      ₹{p.revenue.toLocaleString("en-IN")}
                    </td>
                    <td>
                      <Link
                        to={`/analytics/products/${p.id}`}
                        className="view-deepdive-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Deep-Dive →
                      </Link>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={12} className="empty-table-cell">
                      No product behavior recorded for this date range.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: SEARCH INTELLIGENCE & REPEATED QUERIES */}
      {activeTab === "search" && (
        <div className="analytics-tab-content">
          <div className="analytics-card-panel">
            <div className="panel-header-row">
              <div>
                <h3 className="panel-heading">
                  Search Demand & Query Intelligence
                </h3>
                <p className="panel-subheading">
                  Track high-intent customer search keywords, click-through
                  rates, and missed inventory opportunities.
                </p>
              </div>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => handleExport("search")}
              >
                <ExportIcon width={14} height={14} /> Export Search CSV
              </button>
            </div>

            <div className="analytics-table-container">
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Search Term</th>
                    <th className="num-col">Total Searches</th>
                    <th className="num-col">Unique Users</th>
                    <th className="num-col">Repeat Searches</th>
                    <th className="num-col">Avg Results</th>
                    <th className="num-col">Click-Through Rate</th>
                    <th>Demand Signal</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.searchIntelligence || []).map((s, idx) => (
                    <tr key={idx}>
                      <td className="font-bold">🔍 "{s.searchTerm}"</td>
                      <td className="num-col font-mono">{s.searchCount}</td>
                      <td className="num-col font-mono">{s.uniqueUsers}</td>
                      <td className="num-col font-mono">
                        {s.repeatSearchCount}
                      </td>
                      <td className="num-col font-mono">
                        {s.resultCount} items
                      </td>
                      <td className="num-col">
                        <span
                          className={`conv-pill ${s.clickRate >= 40 ? "conv-high" : s.clickRate > 0 ? "conv-med" : "conv-zero"}`}
                        >
                          {s.clickRate}%
                        </span>
                      </td>
                      <td>
                        <span
                          className={`opportunity-tag ${s.opportunityFlag.includes("No Results") ? "tag-danger" : s.opportunityFlag.includes("Low Click") ? "tag-warning" : "tag-success"}`}
                        >
                          {s.opportunityFlag}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(data?.searchIntelligence || []).length === 0 && (
                    <tr>
                      <td colSpan={7} className="empty-table-cell">
                        No search queries recorded for this period.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DIAGNOSTICS & DECLINING PRODUCTS */}
      {activeTab === "diagnostics" && (
        <div className="analytics-two-col-grid">
          {/* Traffic Without Conversion */}
          <div className="analytics-card-panel">
            <h3 className="panel-heading">Traffic Without Conversion</h3>
            <p className="panel-subheading">
              Products generating significant viewing traffic but low cart
              additions or purchases.
            </p>
            <div className="analytics-table-container">
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className="num-col">Views</th>
                    <th className="num-col">Cart</th>
                    <th className="num-col">Orders</th>
                    <th>Diagnostic Signal</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.trafficWithoutConversion || []).map((p) => (
                    <tr key={p.id}>
                      <td className="font-bold">{p.name}</td>
                      <td className="num-col font-mono">{p.views}</td>
                      <td className="num-col font-mono">{p.cartAdds}</td>
                      <td className="num-col font-mono">{p.ordersCount}</td>
                      <td>
                        <span className="opportunity-tag tag-warning">
                          {p.signal}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(data?.trafficWithoutConversion || []).length === 0 && (
                    <tr>
                      <td colSpan={5} className="empty-table-cell">
                        No traffic conversion bottlenecks detected.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Declining Products */}
          <div className="analytics-card-panel">
            <h3 className="panel-heading">
              Declining Products (vs Prior Period)
            </h3>
            <p className="panel-subheading">
              Products experiencing a drop &gt;20% in customer traffic or sales
              compared to prior period.
            </p>
            <div className="analytics-table-container">
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className="num-col">Cur Views</th>
                    <th className="num-col">Prior Views</th>
                    <th className="num-col">Change %</th>
                    <th>Signal</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.decliningProducts || []).map((p) => (
                    <tr key={p.id}>
                      <td className="font-bold">{p.name}</td>
                      <td className="num-col font-mono">{p.currentViews}</td>
                      <td className="num-col font-mono">{p.previousViews}</td>
                      <td className="num-col font-mono text-red">
                        {p.viewChangePercent}%
                      </td>
                      <td>
                        <span className="opportunity-tag tag-danger">
                          {p.signal}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(data?.decliningProducts || []).length === 0 && (
                    <tr>
                      <td colSpan={5} className="empty-table-cell">
                        No significant product performance declines detected.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: RULE-BASED MARKETING OPPORTUNITIES */}
      {activeTab === "opportunities" && (
        <div className="analytics-tab-content">
          <div className="opportunities-grid">
            {(data?.marketingOpportunities || []).map((opp, idx) => (
              <div
                key={idx}
                className={`opportunity-card priority-${opp.priority.toLowerCase()}`}
              >
                <div className="opp-header">
                  <span
                    className={`priority-badge badge-${opp.priority.toLowerCase()}`}
                  >
                    {opp.priority} Priority
                  </span>
                  <span className="opp-type-code">{opp.type}</span>
                </div>
                <h4 className="opp-title">{opp.title}</h4>
                <p className="opp-desc">{opp.description}</p>
                <div className="opp-metrics-strip">
                  {Object.entries(opp.metrics || {}).map(([k, v]) => (
                    <div key={k} className="opp-metric-chip">
                      <span className="opp-k">{k}:</span>
                      <strong className="opp-v">{v}</strong>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {(data?.marketingOpportunities || []).length === 0 && (
              <div className="empty-panel-box">
                <SparklesIcon width={32} height={32} />
                <h3>No Critical Opportunities Flagged</h3>
                <p>
                  Catalog performance is currently balanced with no severe
                  stock/conversion anomalies for this range.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: CONVERSION FUNNEL */}
      {activeTab === "funnel" && (
        <div className="analytics-card-panel">
          <h3 className="panel-heading">Storefront Conversion Funnel</h3>
          <p className="panel-subheading">
            Multi-step drop-off analysis from initial visitor interest to
            completed purchase.
          </p>

          <div className="funnel-steps-container">
            {(data?.productFunnel || []).map((step, idx) => {
              const maxCount = data.productFunnel[0]?.count || 1;
              const barWidth = Math.max(
                12,
                Math.round((step.count / Math.max(1, maxCount)) * 100),
              );
              return (
                <div key={idx} className="funnel-step-row">
                  <div className="funnel-step-info">
                    <span className="funnel-step-name">{step.step}</span>
                    <strong className="funnel-step-count">
                      {step.count.toLocaleString()}
                    </strong>
                  </div>
                  <div className="funnel-bar-track">
                    <div
                      className="funnel-bar-fill"
                      style={{ width: `${barWidth}%` }}
                    ></div>
                  </div>
                  <div className="funnel-step-dropoff">
                    {idx > 0 && (
                      <span className="dropoff-badge">
                        Drop-off: <strong>{step.dropOff}%</strong>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function KPICard({
  title,
  value,
  comp,
  icon: Icon,
  tone,
  suffix = "",
  inverseTrend = false,
}) {
  const isUp = comp?.trend === "up";
  const isDown = comp?.trend === "down";
  const isPositive = inverseTrend ? isDown : isUp;
  const isNegative = inverseTrend ? isUp : isDown;

  return (
    <div className={`analytics-kpi-card tone-${tone}`}>
      <div className="kpi-top-row">
        <span className="kpi-title">{title}</span>
        {Icon && (
          <div className="kpi-icon-wrap">
            <Icon width={16} height={16} />
          </div>
        )}
      </div>

      <div className="kpi-value-row">
        <h2 className="kpi-main-value">{value || 0}</h2>
      </div>

      <div className="kpi-footer-row">
        {comp && comp.hasBaseline ? (
          <div
            className={`comparison-pill ${isPositive ? "pill-up" : isNegative ? "pill-down" : "pill-neutral"}`}
          >
            {isUp && <TrendingUpIcon width={12} height={12} />}
            {isDown && <TrendingDownIcon width={12} height={12} />}
            <span>
              {comp.changePercent > 0
                ? `+${comp.changePercent}%`
                : `${comp.changePercent}%`}
            </span>
            <span className="comp-sub">vs prior</span>
          </div>
        ) : (
          <span className="no-baseline-tag">No prior baseline</span>
        )}
      </div>
    </div>
  );
}
