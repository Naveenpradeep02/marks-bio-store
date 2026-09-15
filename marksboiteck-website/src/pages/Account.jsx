import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import "../styles/all-products.css";
import "../styles/account.css";

const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function initialsFor(name, email) {
  const source = (name || email || "").trim();
  if (!source) return "?";
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

function OrderRecordCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const address = order.shippingAddress || {};
  const addressLine = [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="order-record-card">
      <button
        type="button"
        className="order-record-header"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <div className="order-header-primary">
          <span className="order-id-code">#{order.orderNumber}</span>
          <span className="order-date-text">
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="order-header-secondary">
          <span className={`order-status-pill status-${order.status}`}>
            {STATUS_LABELS[order.status] || order.status}
          </span>
          <span className="order-price-bold">
            ₹
            {Number(order.total || 0).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </span>
          <i
            className={`fa-solid fa-chevron-${expanded ? "up" : "down"} order-expand-arrow`}
            aria-hidden="true"
          ></i>
        </div>
      </button>

      {expanded && (
        <div className="order-record-body">
          <div className="order-items-table">
            {order.items?.map((item, i) => (
              <div className="order-item-line" key={i}>
                <span className="order-item-name">
                  {item.name}
                  <span className="order-item-qty-tag">× {item.quantity}</span>
                </span>
                <span className="order-item-line-total">
                  ₹
                  {Number(item.lineTotal || 0).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            ))}
          </div>

          <div className="order-cost-breakdown">
            <div className="cost-row">
              <span>Subtotal</span>
              <span>
                ₹
                {Number(order.subtotal || 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="cost-row">
              <span>Applicable GST (18%)</span>
              <span>
                ₹
                {Number(order.tax || 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="cost-row cost-grand-total">
              <span>Grand Total</span>
              <span>
                ₹
                {Number(order.total || 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          {addressLine && (
            <div className="order-delivery-address-pill">
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
              <span>
                {addressLine} {address.phone && ` · Contact: ${address.phone}`}
              </span>
            </div>
          )}

          <div className="order-action-links">
            <Link to="/all-products" className="order-link-btn">
              <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
              <span>Re-order Products</span>
            </Link>
            <a
              href="https://wa.me/919819893250"
              target="_blank"
              rel="noopener noreferrer"
              className="order-link-btn"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
              <span>Track with Support</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Account() {
  const { user, profile, loading, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("orders");
  const [orderFilter, setOrderFilter] = useState("all");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [addressToast, setAddressToast] = useState("");

  // Profile form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "Implantologist & Dental Surgeon",
    clinicName: "Private Dental Practice",
    registrationNo: "DCI-84920",
    city: "Chennai",
    state: "Tamil Nadu",
  });

  // Saved Addresses state
  const [addresses, setAddresses] = useState([
    {
      id: "addr_default",
      type: "Default Practice Address",
      isDefault: true,
      clinicName: "Private Dental Practice",
      addressLine:
        "84, 1st Floor, Thirupathy Nagar, Main Road, Valasaravakkam, Chennai, Tamil Nadu - 600087",
      phone: "+91 98870686660",
    },
    {
      id: "addr_secondary",
      type: "Secondary / Hospital Address",
      isDefault: false,
      clinicName: "Surgical Center / Operation Unit",
      addressLine:
        "104/5, 6th Street, S-1, 2nd Floor, The Brown CLS Building, Radha Avenue, Chennai - 600087",
      phone: "+91 9819893250",
    },
  ]);

  // Modal for adding / editing address
  const [editingAddress, setEditingAddress] = useState(null); // null or address object
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    // 1. Fetch orders
    api
      .get("/orders/mine")
      .then(setOrders)
      .catch((err) => setError(err.message));

    // 2. Load stored profile from localStorage (saved during registration or previous edit)
    let localSavedProfile = null;
    try {
      const stored =
        localStorage.getItem(`mb_user_profile_${user.uid}`) ||
        (user.email
          ? localStorage.getItem(`mb_user_profile_${user.email.toLowerCase()}`)
          : null);
      if (stored) {
        localSavedProfile = JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error reading local profile:", e);
    }

    const currentName =
      localSavedProfile?.name ||
      profile?.name ||
      user?.displayName ||
      (user?.email ? user.email.split("@")[0] : "Clinician");
    const currentEmail =
      user?.email || profile?.email || localSavedProfile?.email || "";
    const currentPhone =
      localSavedProfile?.phone ||
      profile?.phone ||
      (user?.phoneNumber ? user.phoneNumber : "+91 98870686660");
    const currentSpeciality =
      localSavedProfile?.speciality ||
      profile?.speciality ||
      "Implantologist & Dental Surgeon";
    const currentClinic =
      localSavedProfile?.clinicName ||
      profile?.clinicName ||
      "Private Dental Practice";
    const currentRegNo =
      localSavedProfile?.registrationNo ||
      profile?.registrationNo ||
      "DCI-84920";
    const currentCity = localSavedProfile?.city || profile?.city || "Chennai";
    const currentState =
      localSavedProfile?.state || profile?.state || "Tamil Nadu";

    setFormData({
      name: currentName,
      email: currentEmail,
      phone: currentPhone,
      speciality: currentSpeciality,
      clinicName: currentClinic,
      registrationNo: currentRegNo,
      city: currentCity,
      state: currentState,
    });

    // Load saved addresses from localStorage if available
    try {
      const storedAddrs = localStorage.getItem(`mb_user_addresses_${user.uid}`);
      if (storedAddrs) {
        setAddresses(JSON.parse(storedAddrs));
      } else {
        // Sync default address with clinician name/clinic
        setAddresses((prev) => [
          {
            ...prev[0],
            clinicName: currentClinic,
            phone: currentPhone,
          },
          prev[1],
        ]);
      }
    } catch (e) {
      console.warn("Error reading stored addresses:", e);
    }
  }, [user, profile]);

  if (loading) {
    return (
      <div className="all-products-page">
        <div className="detail-loading-state">
          <div className="loading-spinner"></div>
          <p>Loading clinician portal...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const totalSpent = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "all") return true;
    return o.status === orderFilter;
  });

  async function handleSaveProfile(e) {
    e.preventDefault();
    try {
      // 1. Save locally for instantaneous persistence
      if (user?.uid) {
        localStorage.setItem(
          `mb_user_profile_${user.uid}`,
          JSON.stringify(formData),
        );
        localStorage.setItem(
          `mb_user_profile_${user.uid}`,
          JSON.stringify(formData),
        );
      }
      if (user?.email) {
        localStorage.setItem(
          `mb_user_profile_${user.email.toLowerCase()}`,
          JSON.stringify(formData),
        );
        localStorage.setItem(
          `mb_user_profile_${user.email.toLowerCase()}`,
          JSON.stringify(formData),
        );
      }

      // Update default address clinic & phone if matching
      setAddresses((prev) => {
        const updated = prev.map((addr) =>
          addr.isDefault
            ? {
                ...addr,
                clinicName: formData.clinicName || addr.clinicName,
                phone: formData.phone || addr.phone,
              }
            : addr
              ? {
                  ...addr,
                  clinicName: formData.clinicName || addr.clinicName,
                  phone: formData.phone || addr.phone,
                }
              : addr,
        );
        if (user?.uid) {
          localStorage.setItem(
            `mb_user_addresses_${user.uid}`,
            JSON.stringify(updated),
          );
          localStorage.setItem(
            `mb_user_addresses_${user.uid}`,
            JSON.stringify(updated),
          );
        }
        return updated;
      });

      // 2. Sync with backend API
      try {
        await api.post("/auth/sync-profile", formData);
      } catch (err) {
        console.warn("Backend profile sync optional:", err);
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (err) {
      console.error("Save profile error:", err);
    }
  }

  function handleOpenAddAddress() {
    setEditingAddress({
      id: "addr_" + Date.now(),
      type: "Practice / Clinic Address",
      isDefault: addresses.length === 0,
      clinicName: formData.clinicName || "",
      addressLine: "",
      phone: formData.phone || "",
    });
    setAddressModalOpen(true);
  }

  function handleOpenEditAddress(addr) {
    setEditingAddress({ ...addr });
    setAddressModalOpen(true);
  }

  function handleDeleteAddress(id) {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    if (user?.uid) {
      localStorage.setItem(
        `mb_user_addresses_${user.uid}`,
        JSON.stringify(updated),
      );
      localStorage.setItem(
        `mb_user_addresses_${user.uid}`,
        JSON.stringify(updated),
      );
    }
    setAddressToast("Address removed successfully.");
    setTimeout(() => setAddressToast(""), 3000);
  }

  function handleSaveAddressModal(e) {
    e.preventDefault();
    if (!editingAddress) return;

    let updatedList = [];
    const exists = addresses.some((a) => a.id === editingAddress.id);
    if (exists) {
      updatedList = addresses.map((a) =>
        a.id === editingAddress.id ? editingAddress : a,
      );
      updatedList = addresses.map((a) =>
        a.id === editingAddress.id ? editingAddress : a,
      );
    } else {
      updatedList = [...addresses, editingAddress];
    }

    // If marked as default, make others false
    if (editingAddress.isDefault) {
      updatedList = updatedList.map((a) => ({
        ...a,
        isDefault: a.id === editingAddress.id,
      }));
    }

    setAddresses(updatedList);
    if (user?.uid) {
      localStorage.setItem(
        `mb_user_addresses_${user.uid}`,
        JSON.stringify(updatedList),
      );
      localStorage.setItem(
        `mb_user_addresses_${user.uid}`,
        JSON.stringify(updatedList),
      );
    }
    setAddressModalOpen(false);
    setEditingAddress(null);
    setAddressToast("Address saved successfully.");
    setTimeout(() => setAddressToast(""), 3000);
  }

  const displayName =
    formData.name || profile?.name || user?.displayName || "Clinician";
  const displayEmail = formData.email || profile?.email || user?.email || "—";
  const displayPhone = formData.phone || profile?.phone || "—";

  return (
    <div className="all-products-page account-portal-container">
      {/* Top Breadcrumb Bar */}
      <nav className="products-breadcrumb-nav" aria-label="Breadcrumb">
        <div className="products-breadcrumb-container">
          <Link to="/" className="breadcrumb-link">
            <i className="fa-solid fa-house" aria-hidden="true"></i>
            <span>Home</span>
          </Link>
          <span className="breadcrumb-sep">/</span>
          <Link to="/all-products" className="breadcrumb-link">
            <span>Store</span>
          </Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Clinician Portal</span>
        </div>
      </nav>

      {/* Hero Header Banner */}
      <section className="products-hero-banner">
        <div className="products-hero-container">
          <div className="products-hero-badge">
            <i className="fa-solid fa-user-doctor" aria-hidden="true"></i>
            <span>Official Clinician &amp; Surgeon Portal</span>
          </div>
          <h1 className="products-hero-title">
            My <span>Account Dashboard</span>
          </h1>
          <p className="products-hero-subtitle">
            Manage your hospital biomaterial orders, clinical profile, and saved
            clinic addresses.
          </p>
        </div>
      </section>

      {/* Main 2-Column Dashboard Workspace */}
      <main className="account-main-layout">
        {/* Left Column: Clinician Profile & Navigation Tabs */}
        <aside className="account-sidebar-col" aria-label="Account Navigation">
          {/* Clinician Profile Card */}
          <div className="clinician-card">
            <div className="clinician-card-ambient" aria-hidden="true"></div>
            <div className="clinician-avatar-wrap">
              <div className="clinician-avatar">
                {initialsFor(displayName, displayEmail)}
              </div>
              <div
                className="clinician-verified-badge"
                title="Verified Marks Biotech Clinician"
              >
                <i className="fa-solid fa-check" aria-hidden="true"></i>
              </div>
            </div>

            <h2 className="clinician-name">{displayName}</h2>
            <span className="clinician-role-pill">
              {formData.speciality || "Implantologist"}
              <i className="fa-solid fa-user-doctor"></i>
              <span>{formData.speciality || "Implantologist"}</span>
            </span>

            <div className="clinician-meta-list">
              <div className="clinician-meta-item" title={displayEmail}>
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                <div className="meta-icon-box">
                  <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                </div>
                <span>{displayEmail}</span>
              </div>
              <div className="clinician-meta-item">
                <i className="fa-solid fa-phone" aria-hidden="true"></i>
                <div className="meta-icon-box">
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                </div>
                <span>{displayPhone}</span>
              </div>
              <div className="clinician-meta-item">
                <i className="fa-solid fa-hospital" aria-hidden="true"></i>
                <span>{formData.clinicName || "Dental Center"}</span>
                <div className="meta-icon-box">
                  <i className="fa-solid fa-hospital" aria-hidden="true"></i>
                </div>
                <span>{formData.clinicName || "Dental Practice"}</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu Tabs */}
          <nav className="account-nav-card" aria-label="Portal Tabs">
            <button
              type="button"
              className={`account-nav-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <div className="account-nav-btn-left">
                <i className="fa-solid fa-box" aria-hidden="true"></i>
                <div className="nav-icon-wrap">
                  <i className="fa-solid fa-box" aria-hidden="true"></i>
                </div>
                <span>Orders &amp; Invoices</span>
              </div>
              {orders.length > 0 && (
                <span className="nav-count-badge">{orders.length}</span>
              )}
            </button>

            <button
              type="button"
              className={`account-nav-btn ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <div className="account-nav-btn-left">
                <i className="fa-solid fa-user-doctor" aria-hidden="true"></i>
                <div className="nav-icon-wrap">
                  <i className="fa-solid fa-user-doctor" aria-hidden="true"></i>
                </div>
                <span>Clinician Profile</span>
              </div>
            </button>

            <button
              type="button"
              className={`account-nav-btn ${activeTab === "addresses" ? "active" : ""}`}
              onClick={() => setActiveTab("addresses")}
            >
              <div className="account-nav-btn-left">
                <i
                  className="fa-solid fa-map-location-dot"
                  aria-hidden="true"
                ></i>
                <div className="nav-icon-wrap">
                  <i
                    className="fa-solid fa-map-location-dot"
                    aria-hidden="true"
                  ></i>
                </div>
                <span>Saved Addresses</span>
              </div>
            </button>

            <button
              type="button"
              className={`account-nav-btn ${activeTab === "support" ? "active" : ""}`}
              onClick={() => setActiveTab("support")}
            >
              <div className="account-nav-btn-left">
                <i className="fa-solid fa-headset" aria-hidden="true"></i>
                <div className="nav-icon-wrap">
                  <i className="fa-solid fa-headset" aria-hidden="true"></i>
                </div>
                <span>Priority Support</span>
              </div>
            </button>
          </nav>

          {/* Sign Out Action */}
          <button
            type="button"
            className="account-signout-btn"
            onClick={logout}
          >
            <i
              className="fa-solid fa-arrow-right-from-bracket"
              aria-hidden="true"
            ></i>
            <span>Sign Out</span>
          </button>
        </aside>

        {/* Right Column: Dynamic Dashboard Content */}
        <section className="account-content-col" aria-label="Dashboard Content">
          {/* Top Quick Stats Grid */}
          <div className="account-stats-grid">
            <div className="account-stat-card">
              <div className="stat-icon-box">
                <i className="fa-solid fa-cart-flatbed" aria-hidden="true"></i>
              </div>
              <div className="stat-meta">
                <span className="stat-val">{orders.length}</span>
                <span className="stat-lbl">Total Orders</span>
              </div>
            </div>

            <div className="account-stat-card">
              <div className="stat-icon-box">
                <i
                  className="fa-solid fa-indian-rupee-sign"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="stat-meta">
                <span className="stat-val">
                  ₹
                  {totalSpent.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
                <span className="stat-lbl">Procurement Value</span>
              </div>
            </div>

            <div className="account-stat-card">
              <div className="stat-icon-box">
                <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
              </div>
              <div className="stat-meta">
                <span className="stat-val">Verified</span>
                <span className="stat-lbl">Clinician Tier</span>
              </div>
            </div>

            <div className="account-stat-card">
              <div className="stat-icon-box">
                <i className="fa-solid fa-truck-fast" aria-hidden="true"></i>
              </div>
              <div className="stat-meta">
                <span className="stat-val">Priority</span>
                <span className="stat-lbl">Dispatch Status</span>
              </div>
            </div>
          </div>

          {/* TAB 1: Orders & Invoices */}
          {activeTab === "orders" && (
            <div className="account-panel-card">
              <div className="panel-header">
                <div className="panel-title-wrap">
                  <i className="fa-solid fa-receipt" aria-hidden="true"></i>
                  <h2>Order History &amp; Invoices</h2>
                </div>

                <div className="order-filter-pills">
                  {[
                    "all",
                    "confirmed",
                    "delivered",
                    "pending",
                    "cancelled",
                  ].map((st) => (
                    <button
                      key={st}
                      type="button"
                      className={`order-filter-pill ${orderFilter === st ? "active" : ""}`}
                      onClick={() => setOrderFilter(st)}
                    >
                      {st.charAt(0).toUpperCase() + st.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p style={{ color: "#ef4444", marginBottom: "16px" }}>
                  {error}
                </p>
              )}

              {filteredOrders.length === 0 ? (
                <div className="orders-empty-card">
                  <i className="fa-solid fa-box-open" aria-hidden="true"></i>
                  <h3>No Orders Found</h3>
                  <p>
                    {orderFilter === "all"
                      ? "You haven't placed any medical supply orders yet."
                      : `No orders currently matching the "${orderFilter}" status.`}
                  </p>
                  <Link to="/all-products" className="product-btn-primary">
                    <i className="fa-solid fa-cart-plus" aria-hidden="true"></i>
                    <span>Browse Product Catalog</span>
                  </Link>
                </div>
              ) : (
                <div className="orders-stack">
                  {filteredOrders.map((o) => (
                    <OrderRecordCard key={o.id} order={o} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Clinician Profile Edit */}
          {activeTab === "profile" && (
            <div className="account-panel-card">
              <div className="panel-header">
                <div className="panel-title-wrap">
                  <i className="fa-solid fa-user-pen" aria-hidden="true"></i>
                  <h2>Clinician &amp; Practice Information</h2>
                </div>
              </div>

              {savedSuccess && (
                <div className="profile-success-toast">
                  <i
                    className="fa-solid fa-circle-check"
                    aria-hidden="true"
                  ></i>
                  <span>Profile updated successfully.</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="profile-form-grid">
                <div>
                  <label className="profile-field-label">
                    Full Name &amp; Title
                  </label>
                  <input
                    type="text"
                    className="profile-input-field"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="profile-field-label">Email Address</label>
                  <input
                    type="email"
                    className="profile-input-field"
                    value={formData.email}
                    disabled
                    style={{ background: "#19191d", cursor: "not-allowed" }}
                  />
                </div>

                <div>
                  <label className="profile-field-label">Mobile Number</label>
                  <input
                    type="tel"
                    className="profile-input-field"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="profile-field-label">
                    Speciality / Qualification
                  </label>
                  <input
                    type="text"
                    className="profile-input-field"
                    value={formData.speciality}
                    onChange={(e) =>
                      setFormData({ ...formData, speciality: e.target.value })
                    }
                  />
                </div>

                <div className="form-group-full">
                  <label className="profile-field-label">
                    Hospital / Clinic Name
                  </label>
                  <input
                    type="text"
                    className="profile-input-field"
                    value={formData.clinicName}
                    onChange={(e) =>
                      setFormData({ ...formData, clinicName: e.target.value })
                    }
                    placeholder="e.g. Apollo Dental Center / Private Practice"
                  />
                </div>

                <div>
                  <label className="profile-field-label">
                    Dental Council Reg. No
                  </label>
                  <input
                    type="text"
                    className="profile-input-field"
                    value={formData.registrationNo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationNo: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="profile-field-label">
                    City &amp; State
                  </label>
                  <input
                    type="text"
                    className="profile-input-field"
                    value={`${formData.city}, ${formData.state}`}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>

                <div className="form-group-full">
                  <button type="submit" className="profile-save-btn">
                    <i
                      className="fa-solid fa-floppy-disk"
                      aria-hidden="true"
                    ></i>
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: Saved Clinic Addresses */}
          {activeTab === "addresses" && (
            <div className="account-panel-card">
              <div className="panel-header">
                <div className="panel-title-wrap">
                  <i
                    className="fa-solid fa-location-dot"
                    aria-hidden="true"
                  ></i>
                  <h2>Saved Clinic &amp; Delivery Addresses</h2>
                </div>

                <button
                  type="button"
                  className="address-add-btn"
                  onClick={handleOpenAddAddress}
                >
                  <i className="fa-solid fa-plus" aria-hidden="true"></i>
                  <span>Add New Address</span>
                </button>
              </div>

              {addressToast && (
                <div className="profile-success-toast">
                  <i
                    className="fa-solid fa-circle-check"
                    aria-hidden="true"
                  ></i>
                  <span>{addressToast}</span>
                </div>
              )}

              <div className="addresses-cards-grid">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`address-item-card ${addr.isDefault ? "is-default" : ""}`}
                  >
                    <div className="address-card-header-row">
                      <span className="address-type-pill">{addr.type}</span>
                      <div className="address-card-actions">
                        <button
                          type="button"
                          className="address-action-btn edit"
                          onClick={() => handleOpenEditAddress(addr)}
                          title="Edit Address"
                        >
                          <i
                            className="fa-solid fa-pen-to-square"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa-solid fa-pen-to-square"
                            aria-hidden="true"
                          ></i>
                          <span>Edit</span>
                        </button>
                        {addresses.length > 1 && (
                          <button
                            type="button"
                            className="address-action-btn delete"
                            onClick={() => handleDeleteAddress(addr.id)}
                            title="Delete Address"
                          >
                            <i
                              className="fa-solid fa-trash-can"
                              aria-hidden="true"
                            ></i>
                            <i
                              className="fa-solid fa-trash-can"
                              aria-hidden="true"
                            ></i>
                          </button>
                        )}
                      </div>
                    </div>

                    <h3 className="address-clinic-title">
                      {addr.clinicName || "Practice Clinic"}
                    </h3>
                    <p className="address-full-text">
                      {addr.addressLine || "Address not provided"}
                    </p>
                    <div className="address-phone-text">
                      <i className="fa-solid fa-phone" aria-hidden="true"></i>
                      <span>{addr.phone || "No phone linked"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal / Dialog for Adding or Editing Address */}
          {addressModalOpen && editingAddress && (
            <div
              className="address-modal-overlay"
              onClick={() => setAddressModalOpen(false)}
            >
              <div
                className="address-modal-dialog"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="address-modal-header">
                  <h3>
                    <i
                      className="fa-solid fa-map-location-dot"
                      aria-hidden="true"
                    ></i>{" "}
                    {addresses.some((a) => a.id === editingAddress.id)
                      ? "Edit Practice Address"
                      : "Add New Practice Address"}
                  </h3>
                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={() => setAddressModalOpen(false)}
                  >
                    <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                  </button>
                </div>

                <form
                  onSubmit={handleSaveAddressModal}
                  className="address-modal-form"
                >
                  <div>
                    <label className="profile-field-label">
                      Address Label / Type
                    </label>
                    <input
                      type="text"
                      className="profile-input-field"
                      value={editingAddress.type}
                      onChange={(e) =>
                        setEditingAddress({
                          ...editingAddress,
                          type: e.target.value,
                        })
                      }
                      placeholder="e.g. Primary Clinic, Branch 2, Operation Unit"
                      required
                    />
                  </div>

                  <div>
                    <label className="profile-field-label">
                      Clinic / Hospital Name
                    </label>
                    <input
                      type="text"
                      className="profile-input-field"
                      value={editingAddress.clinicName}
                      onChange={(e) =>
                        setEditingAddress({
                          ...editingAddress,
                          clinicName: e.target.value,
                        })
                      }
                      placeholder="e.g. Elite Dental Center"
                      required
                    />
                  </div>

                  <div className="form-group-full">
                    <label className="profile-field-label">
                      Full Shipping Address
                    </label>
                    <textarea
                      className="profile-input-field address-textarea"
                      rows="3"
                      value={editingAddress.addressLine}
                      onChange={(e) =>
                        setEditingAddress({
                          ...editingAddress,
                          addressLine: e.target.value,
                        })
                      }
                      placeholder="Building, Street, Landmark, City, State - Pincode"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="profile-field-label">
                      Contact Mobile
                    </label>
                    <input
                      type="tel"
                      className="profile-input-field"
                      value={editingAddress.phone}
                      onChange={(e) =>
                        setEditingAddress({
                          ...editingAddress,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+91 98870686660"
                      required
                    />
                  </div>

                  <div className="modal-checkbox-row">
                    <label className="modal-checkbox-label">
                      <input
                        type="checkbox"
                        checked={editingAddress.isDefault}
                        onChange={(e) =>
                          setEditingAddress({
                            ...editingAddress,
                            isDefault: e.target.checked,
                          })
                        }
                      />
                      <span>Set as Default Practice Address</span>
                    </label>
                  </div>

                  <div className="address-modal-actions">
                    <button
                      type="button"
                      className="modal-cancel-btn"
                      onClick={() => setAddressModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="profile-save-btn">
                      <i className="fa-solid fa-check" aria-hidden="true"></i>
                      <span>Save Address</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: Priority Surgeon Support */}
          {activeTab === "support" && (
            <div className="account-panel-card">
              <div className="panel-header">
                <div className="panel-title-wrap">
                  <i className="fa-solid fa-headset" aria-hidden="true"></i>
                  <h2>Dedicated Biomaterial &amp; Implant Support</h2>
                </div>
              </div>

              <div className="priority-support-grid">
                <div className="support-channel-card">
                  <div className="channel-icon green">
                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                  </div>
                  <h3>Direct WhatsApp Specialist</h3>
                  <p>
                    Get immediate assistance with cold-chain delivery schedules,
                    custom graft sizes, and surgical navigation.
                  </p>
                  <a
                    href="https://wa.me/919819893250"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-cta-btn whatsapp"
                  >
                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                    <span>Chat with Specialist</span>
                  </a>
                </div>

                <div className="support-channel-card">
                  <div className="channel-icon">
                    <i
                      className="fa-solid fa-phone-volume"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <h3>Clinical Procurement Line</h3>
                  <p>
                    Direct line for hospital tenders, institutional bulk orders,
                    and invoice clearance.
                  </p>
                  <a href="tel:+914448593250" className="channel-cta-btn phone">
                    <i className="fa-solid fa-phone" aria-hidden="true"></i>
                    <span>Call +91 44 485 93250</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
