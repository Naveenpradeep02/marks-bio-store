import React, { useEffect, useState } from "react";
import { api } from "../api";
import {
  MarketingIcon,
  SearchIcon,
  TargetIcon,
  ExportIcon,
  SparklesIcon,
} from "../components/Icons";

const DATE_PRESETS = [
  { id: "today", label: "Today" },
  { id: "7d", label: "Last 7 Days" },
  { id: "30d", label: "Last 30 Days" },
  { id: "90d", label: "Last 90 Days" },
  { id: "this_year", label: "This Year" },
];

export default function MarketingAnalytics() {
  const [range, setRange] = useState("30d");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMarketingData();
  }, [range]);

  async function fetchMarketingData() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(
        `/analytics/marketing/intelligence?range=${range}`,
      );
      setData(res);
    } catch (err) {
      setError(err.message || "Failed to load marketing intelligence");
    } finally {
      setLoading(false);
    }
  }

  const campaigns = data?.campaigns || [];
  const referrers = data?.referrers || [];
  const totalSessions = campaigns.reduce((s, c) => s + c.sessions, 0);
  const totalRevenue = campaigns.reduce((s, c) => s + c.revenue, 0);
  const totalOrders = campaigns.reduce((s, c) => s + c.ordersCount, 0);

  return (
    <div className="analytics-page">
      <div className="analytics-header-row">
        <div>
          <div className="analytics-badge-label">
            <MarketingIcon width={14} height={14} />
            <span>Attribution & Acquisition</span>
          </div>
          <h1 className="analytics-title">Marketing Intelligence</h1>
          <p className="analytics-subtitle">
            Track UTM marketing campaigns, inbound referrer traffic, and revenue
            conversion attribution.
          </p>
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
      </div>

      {error && <div className="error-banner">{error}</div>}

      {/* KPI Cards */}
      <div
        className="analytics-kpi-grid"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
      >
        <div className="analytics-kpi-card tone-blue">
          <div className="kpi-top-row">
            <span className="kpi-title">Tracked Sessions</span>
            <MarketingIcon width={16} height={16} />
          </div>
          <div className="kpi-value-row">
            <h2 className="kpi-main-value">{totalSessions.toLocaleString()}</h2>
          </div>
        </div>

        <div className="analytics-kpi-card tone-green">
          <div className="kpi-top-row">
            <span className="kpi-title">Attributed Revenue</span>
            <TargetIcon width={16} height={16} />
          </div>
          <div className="kpi-value-row">
            <h2 className="kpi-main-value">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </h2>
          </div>
        </div>

        <div className="analytics-kpi-card tone-indigo">
          <div className="kpi-top-row">
            <span className="kpi-title">Attributed Orders</span>
            <TargetIcon width={16} height={16} />
          </div>
          <div className="kpi-value-row">
            <h2 className="kpi-main-value">{totalOrders.toLocaleString()}</h2>
          </div>
        </div>
      </div>

      {/* Campaign Attribution Table */}
      <div className="analytics-card-panel" style={{ marginTop: "1.5rem" }}>
        <h3 className="panel-heading">UTM Campaign Performance</h3>
        <p className="panel-subheading">
          Performance grouped by UTM Campaign, Source, and Medium tags.
        </p>

        <div className="analytics-table-container">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Source</th>
                <th>Medium</th>
                <th className="num-col">Sessions</th>
                <th className="num-col">Unique Visitors</th>
                <th className="num-col">Orders</th>
                <th className="num-col">Conv %</th>
                <th className="num-col">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, idx) => (
                <tr key={idx}>
                  <td className="font-bold">{c.campaign}</td>
                  <td>
                    <span className="category-chip">{c.source}</span>
                  </td>
                  <td>
                    <span className="brand-chip">{c.medium}</span>
                  </td>
                  <td className="num-col font-mono">{c.sessions}</td>
                  <td className="num-col font-mono">{c.visitors}</td>
                  <td className="num-col font-mono font-bold">
                    {c.ordersCount}
                  </td>
                  <td className="num-col">
                    <span
                      className={`conv-pill ${c.conversionRate >= 5 ? "conv-high" : c.conversionRate > 0 ? "conv-med" : "conv-zero"}`}
                    >
                      {c.conversionRate}%
                    </span>
                  </td>
                  <td className="num-col font-mono font-bold">
                    ₹{c.revenue.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan={8} className="empty-table-cell">
                    No campaign traffic recorded for this date range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Referrer Domains Table */}
      <div className="analytics-card-panel" style={{ marginTop: "1.5rem" }}>
        <h3 className="panel-heading">Inbound Referrer Domains</h3>
        <p className="panel-subheading">
          Direct, external website links, and search engine acquisition
          channels.
        </p>

        <div className="analytics-table-container">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Referrer Source</th>
                <th className="num-col">Sessions</th>
                <th className="num-col">Unique Visitors</th>
                <th className="num-col">Traffic Share</th>
              </tr>
            </thead>
            <tbody>
              {referrers.map((r, idx) => {
                const share =
                  totalSessions > 0
                    ? ((r.sessions / totalSessions) * 100).toFixed(1)
                    : 0;
                return (
                  <tr key={idx}>
                    <td className="font-bold">{r.referrer}</td>
                    <td className="num-col font-mono">{r.sessions}</td>
                    <td className="num-col font-mono">{r.visitors}</td>
                    <td className="num-col font-mono">{share}%</td>
                  </tr>
                );
              })}
              {referrers.length === 0 && (
                <tr>
                  <td colSpan={4} className="empty-table-cell">
                    No external referrer traffic recorded for this date range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
