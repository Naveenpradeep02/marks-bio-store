import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

const OFFER_TYPES = {
  bulk_quantity: { label: "Bulk Quantity", color: "#2563eb", bg: "#eff6ff" },
  mix_match: { label: "Mix & Match", color: "#7c3aed", bg: "#f5f3ff" },
  combo_bundle: { label: "Combo / Bundle", color: "#059669", bg: "#ecfdf5" },
  cross_sell: { label: "Cross-Sell / Bought Together", color: "#d97706", bg: "#fffbeb" },
  cart_value: { label: "Cart Value Tier", color: "#db2777", bg: "#fdf2f8" },
};

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  function loadOffers() {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (typeFilter) params.set("type", typeFilter);
    if (statusFilter) params.set("status", statusFilter);

    api
      .get(`/offers?${params.toString()}`)
      .then((res) => {
        setOffers(res.offers || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadOffers();
  }, [typeFilter, statusFilter]);

  async function handleSearch(e) {
    e.preventDefault();
    loadOffers();
  }

  async function handleStatusToggle(id, currentStatus) {
    const nextStatus = currentStatus === "active" ? "inactive" : "active";
    setActionLoading(id);
    try {
      await api.patch(`/offers/${id}/status`, { status: nextStatus });
      loadOffers();
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDuplicate(id) {
    if (!confirm("Duplicate this offer as a new draft?")) return;
    setActionLoading(id);
    try {
      await api.post(`/offers/${id}/duplicate`, {});
      loadOffers();
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to permanently delete this offer?")) return;
    setActionLoading(id);
    try {
      await api.delete(`/offers/${id}`);
      loadOffers();
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  }

  const activeCount = offers.filter((o) => o.status === "active").length;
  const totalUsages = offers.reduce((acc, o) => acc + (o.usage_count || 0), 0);

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", paddingBottom: "3rem" }}>
      {/* Top Header */}
      <div className="page-header-row" style={{ alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ margin: "0 0 0.25rem 0", fontSize: "1.75rem", fontWeight: 700 }}>
            Offer Management
          </h1>
          <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>
            Create and manage bulk quantity slabs, combos, mix & match promotions, and Flipkart-style cross-sells.
          </p>
        </div>
        <Link
          to="/offers/new"
          className="primary-link-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.25rem",
            background: "var(--brand)",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          <span>+ Create New Offer</span>
        </Link>
      </div>

      {error && <div className="error-banner" style={{ marginBottom: "1.5rem" }}>{error}</div>}

      {/* Analytics KPI Ribbon */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ background: "#fff", padding: "1.25rem", borderRadius: "10px", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: "0.85rem", color: "var(--muted)", fontWeight: 500 }}>Total Offers</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, marginTop: "0.35rem" }}>{offers.length}</div>
        </div>
        <div style={{ background: "#fff", padding: "1.25rem", borderRadius: "10px", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: "0.85rem", color: "#059669", fontWeight: 500 }}>Active Campaigns</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, marginTop: "0.35rem", color: "#059669" }}>{activeCount}</div>
        </div>
        <div style={{ background: "#fff", padding: "1.25rem", borderRadius: "10px", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: "0.85rem", color: "var(--muted)", fontWeight: 500 }}>Total Redemptions</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, marginTop: "0.35rem" }}>{totalUsages}</div>
        </div>
        <div style={{ background: "#fff", padding: "1.25rem", borderRadius: "10px", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: "0.85rem", color: "var(--muted)", fontWeight: 500 }}>Engine Status</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
            <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#10b981" }}>Authoritative & Online</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
          background: "#fff",
          padding: "1rem 1.25rem",
          borderRadius: "10px",
          border: "1px solid var(--border)",
          marginBottom: "1.5rem",
        }}
      >
        <form onSubmit={handleSearch} style={{ flex: 1, minWidth: 260, display: "flex", gap: "0.5rem" }}>
          <input
            className="search-box"
            style={{ width: "100%", margin: 0 }}
            placeholder="Search offers by title, internal code, badge..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            style={{
              padding: "0.6rem 1rem",
              background: "#1f2937",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Search
          </button>
        </form>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              padding: "0.6rem 0.85rem",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              fontSize: "0.85rem",
              background: "#fff",
            }}
          >
            <option value="">All Offer Types</option>
            <option value="bulk_quantity">Bulk Quantity Slabs</option>
            <option value="mix_match">Mix & Match</option>
            <option value="combo_bundle">Combo / Bundle</option>
            <option value="cross_sell">Cross-Sell / Recommendations</option>
            <option value="cart_value">Cart Value Tier</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "0.6rem 0.85rem",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              fontSize: "0.85rem",
              background: "#fff",
            }}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Offers Table */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", background: "#fff", borderRadius: "10px" }}>
          <p style={{ color: "var(--muted)" }}>Loading offers...</p>
        </div>
      ) : offers.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", background: "#fff", borderRadius: "10px", border: "1px dashed var(--border)" }}>
          <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--ink)" }}>No offers found</h3>
          <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
            Get started by creating your first promotional pricing rule, quantity discount, or combo deal.
          </p>
          <Link
            to="/offers/new"
            className="primary-link-btn"
            style={{ textDecoration: "none", padding: "0.6rem 1.2rem", background: "var(--brand)", color: "#fff", borderRadius: "6px" }}
          >
            + Create First Offer
          </Link>
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid var(--border)", overflow: "hidden" }}>
          <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid var(--border)", textAlign: "left" }}>
                <th style={{ padding: "0.85rem 1rem" }}>Offer Title & Code</th>
                <th style={{ padding: "0.85rem 1rem" }}>Type</th>
                <th style={{ padding: "0.85rem 1rem" }}>Target Config</th>
                <th style={{ padding: "0.85rem 1rem" }}>Priority & Stacking</th>
                <th style={{ padding: "0.85rem 1rem" }}>Usage</th>
                <th style={{ padding: "0.85rem 1rem" }}>Status</th>
                <th style={{ padding: "0.85rem 1rem", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => {
                const typeMeta = OFFER_TYPES[offer.offer_type] || {
                  label: offer.offer_type,
                  color: "#475569",
                  bg: "#f1f5f9",
                };

                return (
                  <tr key={offer.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                    {/* Offer Title & Code */}
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontWeight: 600, color: "var(--ink)" }}>{offer.title}</div>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "0.25rem" }}>
                        <code style={{ fontSize: "0.75rem", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>
                          {offer.internal_code}
                        </code>
                        {offer.storefront_badge && (
                          <span
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              background: "#fee2e2",
                              color: "var(--brand)",
                              padding: "2px 6px",
                              borderRadius: "4px",
                            }}
                          >
                            🏷️ {offer.storefront_badge}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Offer Type */}
                    <td style={{ padding: "1rem" }}>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: typeMeta.color,
                          background: typeMeta.bg,
                          padding: "4px 8px",
                          borderRadius: "6px",
                          display: "inline-block",
                        }}
                      >
                        {typeMeta.label}
                      </span>
                    </td>

                    {/* Target Config */}
                    <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--ink)" }}>
                      {offer.offer_type === "bulk_quantity" && (
                        <span>{offer.slabs_count || 0} Quantity Slab(s)</span>
                      )}
                      {offer.offer_type === "mix_match" && (
                        <span>{offer.products_count || 0} Condition Item(s)</span>
                      )}
                      {offer.offer_type === "combo_bundle" && (
                        <span>{offer.products_count || 0} Bundle Items</span>
                      )}
                      {offer.offer_type === "cross_sell" && (
                        <span>{offer.recommendations_count || 0} Cross-Sell Product(s)</span>
                      )}
                      {offer.offer_type === "cart_value" && (
                        <span>Min Cart ₹{Number(offer.min_cart_value || 0).toLocaleString("en-IN")}</span>
                      )}
                    </td>

                    {/* Priority & Stacking */}
                    <td style={{ padding: "1rem", fontSize: "0.85rem" }}>
                      <div>Priority: <strong>{offer.priority}</strong></div>
                      <div style={{ fontSize: "0.75rem", color: offer.is_stackable ? "#059669" : "var(--muted)" }}>
                        {offer.is_stackable ? "✓ Stackable" : "Exclusive"}
                      </div>
                    </td>

                    {/* Usage */}
                    <td style={{ padding: "1rem", fontSize: "0.85rem" }}>
                      <strong>{offer.usage_count || 0}</strong>
                      {offer.usage_limit ? ` / ${offer.usage_limit}` : " used"}
                    </td>

                    {/* Status */}
                    <td style={{ padding: "1rem" }}>
                      <button
                        onClick={() => handleStatusToggle(offer.id, offer.status)}
                        disabled={actionLoading === offer.id}
                        style={{
                          border: "none",
                          cursor: "pointer",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          textTransform: "capitalize",
                          background:
                            offer.status === "active"
                              ? "#dcfce7"
                              : offer.status === "scheduled"
                              ? "#fef3c7"
                              : "#f1f5f9",
                          color:
                            offer.status === "active"
                              ? "#15803d"
                              : offer.status === "scheduled"
                              ? "#b45309"
                              : "#64748b",
                        }}
                      >
                        {offer.status}
                      </button>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "1rem", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                        <Link
                          to={`/offers/${offer.id}/edit`}
                          style={{
                            padding: "4px 8px",
                            fontSize: "0.8rem",
                            border: "1px solid var(--border)",
                            borderRadius: "4px",
                            background: "#fff",
                            color: "var(--ink)",
                            textDecoration: "none",
                          }}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDuplicate(offer.id)}
                          disabled={actionLoading === offer.id}
                          title="Duplicate offer as draft"
                          style={{
                            padding: "4px 8px",
                            fontSize: "0.8rem",
                            border: "1px solid var(--border)",
                            borderRadius: "4px",
                            background: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          Duplicate
                        </button>
                        <button
                          onClick={() => handleDelete(offer.id)}
                          disabled={actionLoading === offer.id}
                          title="Delete offer"
                          style={{
                            padding: "4px 8px",
                            fontSize: "0.8rem",
                            border: "1px solid #fee2e2",
                            borderRadius: "4px",
                            background: "#fef2f2",
                            color: "var(--brand)",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
