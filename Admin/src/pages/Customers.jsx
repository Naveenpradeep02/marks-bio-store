import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import {
  CustomersIcon,
  SearchIcon,
  SparklesIcon,
  TargetIcon,
} from "../components/Icons";

const FILTERS = [
  { id: "all", label: "All Customers" },
  { id: "new", label: "New Customers" },
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
  { id: "high_value", label: "High Value" },
  { id: "repeat", label: "Repeat Buyers" },
  { id: "never_purchased", label: "Never Purchased" },
  { id: "cart_active", label: "Cart Activity" },
  { id: "saved_active", label: "Wishlist Activity" },
  { id: "recently_viewed", label: "Recently Viewed" },
  { id: "high_cancellation", label: "Cancellations" },
];

function initialsOf(name, email) {
  const source = (name || email || "?").trim();
  const parts = source.split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, [activeFilter, search]);

  async function fetchCustomers() {
    setLoading(true);
    setError("");
    try {
      let url = `/customers?filter=${activeFilter}`;
      if (search.trim()) {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }
      const data = await api.get(url);
      setCustomers(data);
    } catch (err) {
      setError(err.message || "Failed to load customer records");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="analytics-page">
      <div className="analytics-header-row">
        <div>
          <div className="analytics-badge-label">
            <CustomersIcon width={14} height={14} />
            <span>Customer Intelligence</span>
          </div>
          <h1 className="analytics-title">Customer 360 Management</h1>
          <p className="analytics-subtitle">
            Comprehensive customer profiles, multi-touch behavior, lifetime
            value & RFM segmentation.
          </p>
        </div>

        <div className="analytics-actions-toolbar">
          <span className="status-badge badge-blue">
            {customers.length} records
          </span>
        </div>
      </div>

      {/* Behavioral Filter Chips */}
      <div className="date-preset-bar" style={{ marginBottom: "1rem" }}>
        <div className="date-pills">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`date-pill ${activeFilter === f.id ? "active" : ""}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div
        className="table-search-wrap"
        style={{ maxWidth: "420px", marginBottom: "1.25rem" }}
      >
        <SearchIcon width={16} height={16} className="search-icon-inside" />
        <input
          type="text"
          className="table-search-input"
          placeholder="Search by customer name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <div className="page-loading">Loading customer 360 intelligence...</div>
      ) : (
        <div className="analytics-card-panel">
          <div className="analytics-table-container">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Joined / Last Active</th>
                  <th className="num-col">Orders</th>
                  <th className="num-col">Total Spend</th>
                  <th className="num-col">AOV</th>
                  <th className="num-col">Views</th>
                  <th className="num-col">Saved</th>
                  <th>Segment</th>
                  <th style={{ width: "130px" }}></th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div className="customer-cell">
                        <span className="user-avatar">
                          {initialsOf(c.name, c.email)}
                        </span>
                        <div>
                          <div className="customer-name">
                            {c.name || "Unnamed Clinician"}
                          </div>
                          <div className="customer-email">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono">{c.phone || "—"}</td>
                    <td>
                      <div style={{ fontSize: "12.5px" }}>
                        <div>
                          Reg:{" "}
                          {c.createdAt
                            ? new Date(c.createdAt).toLocaleDateString("en-IN")
                            : "—"}
                        </div>
                        <div className="field-hint">
                          Active:{" "}
                          {c.lastActiveDate
                            ? new Date(c.lastActiveDate).toLocaleDateString(
                                "en-IN",
                              )
                            : "—"}
                        </div>
                      </div>
                    </td>
                    <td className="num-col font-mono font-bold">
                      {c.totalOrders}
                    </td>
                    <td className="num-col font-mono font-bold">
                      ₹{(c.totalSpend || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="num-col font-mono">
                      ₹{(c.averageOrderValue || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="num-col font-mono">
                      {c.productViewsCount || 0}
                    </td>
                    <td className="num-col font-mono">
                      {c.savedProductsCount || 0}
                    </td>
                    <td>
                      <span
                        className={`segment-pill ${
                          c.segment.includes("Champions") ||
                          c.segment.includes("High Value")
                            ? "seg-champ"
                            : c.segment.includes("Loyal") ||
                                c.segment.includes("Repeat")
                              ? "seg-loyal"
                              : c.segment.includes("New")
                                ? "seg-new"
                                : c.segment.includes("At Risk") ||
                                    c.segment.includes("Inactive")
                                  ? "seg-risk"
                                  : "seg-default"
                        }`}
                      >
                        {c.segment}
                      </span>
                    </td>
                    <td className="row-actions">
                      <Link
                        to={`/customers/${c.id}`}
                        className="view-deepdive-btn"
                      >
                        Customer 360 →
                      </Link>
                    </td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan={10} className="empty-table-cell">
                      No customers matched the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
