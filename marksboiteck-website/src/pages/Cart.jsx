import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { trackCheckoutStart, sendAnalyticsEvent } from "../utils/analytics";
import "../styles/all-products.css";
import "../styles/shop-account.css";

const API_ORIGIN = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "");

function formatCurrency(val) {
  return (
    "₹" +
    Number(val || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function CartItemRow({ item, calcItem, onUpdateQty, onRemove }) {
  const lineOriginal = (item.price || 0) * item.quantity;
  const lineDiscount = calcItem ? Number(calcItem.lineDiscount || 0) : 0;
  const lineFinal = calcItem ? Number(calcItem.lineTotal) : lineOriginal;

  // Extract variant label if present in name
  const nameParts = item.name.split(" — ");
  const mainName = nameParts[0];
  const variantLabel =
    nameParts.length > 1 ? nameParts.slice(1).join(" — ") : null;

  return (
    <div className="cart-item-row">
      <div className="cart-item-img-wrap">
        <div className="cart-item-ambient-glow" aria-hidden="true"></div>
        {item.image ? (
          <img
            src={
              item.image.startsWith("http")
                ? item.image
                : `${API_ORIGIN}${item.image}`
            }
            alt={item.name}
            loading="lazy"
            className="cart-item-thumb-img"
          />
        ) : (
          <div className="cart-item-img-placeholder">
            <i className="fa-solid fa-cube" aria-hidden="true"></i>
          </div>
        )}
      </div>

      <div className="cart-item-info">
        <div className="cart-item-meta-tags">
          {variantLabel ? (
            <span className="cart-item-variant-badge">
              <i className="fa-solid fa-layer-group"></i> {variantLabel}
            </span>
          ) : (
            <span className="cart-item-variant-badge generic">
              <i className="fa-solid fa-box-open"></i> Standard Spec
            </span>
          )}
          {item.sku && (
            <span className="cart-item-sku-badge">SKU: {item.sku}</span>
          )}
          {lineDiscount > 0 && (
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#059669",
                background: "#ecfdf5",
                padding: "2px 8px",
                borderRadius: "4px",
                border: "1px solid #a7f3d0",
              }}
            >
              🏷️ Saved {formatCurrency(lineDiscount)}
            </span>
          )}
        </div>

        <h3 className="cart-item-name">{mainName}</h3>

        <div className="cart-item-price-unit-row">
          <span className="cart-item-unit-price">
            {formatCurrency(item.price)}{" "}
            <span className="unit-label">/ unit</span>
          </span>
          {calcItem?.appliedOffers?.length > 0 && (
            <span
              style={{
                fontSize: "0.75rem",
                color: "#16a34a",
                fontWeight: 600,
                marginLeft: "0.5rem",
              }}
            >
              ({calcItem.appliedOffers.map((o) => o.title).join(", ")})
            </span>
          )}
        </div>

        <button
          type="button"
          className="cart-item-remove"
          onClick={() => onRemove(item.productId, item.variantId ?? null)}
          title="Remove from cart"
        >
          <i className="fa-regular fa-trash-can" aria-hidden="true"></i>
          <span>Remove</span>
        </button>
      </div>

      <div className="cart-item-controls-col">
        <div className="custom-qty-stepper">
          <button
            type="button"
            className="qty-btn minus"
            aria-label="Decrease quantity"
            disabled={item.quantity <= 1}
            onClick={() =>
              onUpdateQty(
                item.productId,
                item.variantId ?? null,
                item.quantity - 1
              )
            }
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          <span className="qty-value-display">{item.quantity}</span>
          <button
            type="button"
            className="qty-btn plus"
            aria-label="Increase quantity"
            onClick={() =>
              onUpdateQty(
                item.productId,
                item.variantId ?? null,
                item.quantity + 1
              )
            }
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        <div className="cart-item-total-price">
          <span className="total-label">Subtotal</span>
          {lineDiscount > 0 ? (
            <div>
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                  display: "block",
                }}
              >
                {formatCurrency(lineOriginal)}
              </span>
              <span className="total-value" style={{ color: "#059669" }}>
                {formatCurrency(lineFinal)}
              </span>
            </div>
          ) : (
            <span className="total-value">{formatCurrency(lineFinal)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountTotal,
    tax,
    total,
    appliedOffers,
    eligibleOffers,
    recommendations,
    calculatedItems,
    addRecommendationToCart,
    checkout,
  } = useCart();
  const { isLoggedIn, profile } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    line1: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  // Auto-fill address from profile if user is logged in
  useEffect(() => {
    if (profile) {
      setAddress((prev) => ({
        line1: prev.line1 || profile.clinicName || profile.addressLine1 || "",
        city: prev.city || profile.city || "Chennai",
        state: prev.state || profile.state || "Tamil Nadu",
        pincode: prev.pincode || profile.pincode || "",
        phone: prev.phone || profile.phone || "",
      }));
    }
  }, [profile]);

  const totalItemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    if (items.length > 0) {
      trackCheckoutStart(items, total);
    }
  }, [items.length, total]);

  async function handlePlaceOrder(e) {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login", { state: { redirectTo: "/cart" } });
      return;
    }
    setError("");
    setPlacing(true);
    try {
      const order = await checkout(address);
      setPlacedOrder(order);
      sendAnalyticsEvent("purchase", {
        orderId: order.id,
        eventMetadata: { total: order.total, orderNumber: order.orderNumber },
      });
    } catch (err) {
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  }

  if (placedOrder) {
    return (
      <div className="cart-page-wrapper">
        <section className="cart-hero-banner">
          <div className="cart-hero-glow"></div>
          <span className="cart-hero-pill">
            <i className="fa-solid fa-check-circle"></i> Verification
            Successful
          </span>
          <h1 className="cart-hero-title">
            Order <span>Confirmed</span>
          </h1>
          <p className="cart-hero-subtitle">
            Your clinical purchase order has been logged into our sterile
            distribution network.
          </p>
        </section>

        <div className="cart-container-main">
          <div
            style={{
              background: "#fff",
              padding: "2.5rem",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              maxWidth: 700,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#ecfdf5",
                color: "#10b981",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                marginBottom: "1rem",
              }}
            >
              ✓
            </div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              Thank You for Your Order!
            </h2>
            <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
              Order Number:{" "}
              <strong>{placedOrder.orderNumber || placedOrder.id}</strong>
            </p>

            {placedOrder.discountTotal > 0 && (
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  padding: "1rem",
                  borderRadius: "8px",
                  color: "#166534",
                  fontWeight: 600,
                  marginBottom: "1.5rem",
                }}
              >
                🎉 You saved {formatCurrency(placedOrder.discountTotal)} with
                applied promotional offers!
              </div>
            )}

            <div
              style={{
                borderTop: "1px solid #e2e8f0",
                paddingTop: "1.5rem",
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <Link
                to="/all-products"
                className="cart-cta-btn primary"
                style={{ textDecoration: "none" }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      {/* Hero Header */}
      <section className="cart-hero-banner">
        <div className="cart-hero-glow"></div>
        <span className="cart-hero-pill">
          <i className="fa-solid fa-cart-shopping"></i> Clinical Procurement Tray
        </span>
        <h1 className="cart-hero-title">
          Review &amp; <span>Checkout</span>
        </h1>
        <p className="cart-hero-subtitle">
          Verify selected biomaterials, active promotional quantity discounts,
          and clinical shipping address.
        </p>
      </section>

      <div className="cart-container-main">
        {error && <div className="cart-error-alert">{error}</div>}

        {items.length === 0 ? (
          <div className="cart-empty-state-card">
            <div className="empty-cart-icon-wrapper">
              <i className="fa-solid fa-basket-shopping"></i>
            </div>
            <h2>Your Procurement Tray is Empty</h2>
            <p>
              Explore our clinical catalogue of biomaterials, dental implants,
              and surgical instruments.
            </p>
            <div className="empty-cart-quick-links">
              <Link to="/all-products" className="cart-cta-btn primary">
                <i className="fa-solid fa-boxes-stacked"></i> Browse All Products
              </Link>
              <Link to="/allograft" className="cart-cta-btn outline">
                Rocky Mountain Allografts
              </Link>
              <Link to="/xenograft" className="cart-cta-btn outline">
                NovoBone Xenografts
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart-grid">
            {/* Left Column: Cart Items list */}
            <div className="cart-items-col">
              <div className="cart-items-header-bar">
                <div className="cart-header-title-group">
                  <div className="cart-header-icon">
                    <i className="fa-solid fa-box-archive"></i>
                  </div>
                  <div>
                    <h2>Selected Biologics &amp; Systems</h2>
                    <span className="cart-header-sub">
                      {items.length} Distinct{" "}
                      {items.length === 1 ? "Product" : "Products"} (
                      {totalItemCount} total units)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="cart-clear-btn"
                  onClick={clearCart}
                  title="Clear all items from cart"
                >
                  <i className="fa-regular fa-trash-can"></i> Clear Tray
                </button>
              </div>

              <div className="cart-items-list-body">
                {items.map((item, idx) => {
                  const calcItem = calculatedItems.find(
                    (ci) =>
                      ci.productId === item.productId &&
                      ci.variantId === item.variantId
                  );
                  return (
                    <CartItemRow
                      key={`${item.productId}-${item.variantId ?? "base"}`}
                      item={item}
                      calcItem={calcItem}
                      onUpdateQty={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  );
                })}
              </div>

              {/* Delivery Assurance Footer */}
              <div className="cart-items-footer-strip">
                <div className="assurance-item">
                  <i className="fa-solid fa-snowflake"></i>
                  <span>2°C - 8°C Cold Chain Packaging</span>
                </div>
                <div className="assurance-item">
                  <i className="fa-solid fa-truck-fast"></i>
                  <span>Express Direct Hospital Dispatch</span>
                </div>
                <div className="assurance-item">
                  <i className="fa-solid fa-certificate"></i>
                  <span>Batch Test Certificates Included</span>
                </div>
              </div>

              {/* Frequently Bought Together / Cross-Sell Recommendations Section */}
              {recommendations.length > 0 && (
                <div
                  style={{
                    marginTop: "2rem",
                    background: "#fff",
                    borderRadius: "14px",
                    border: "1px solid #e2e8f0",
                    padding: "1.5rem",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>🔥</span>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "#1e293b",
                      }}
                    >
                      Frequently Bought Together (Special Offer Pricing)
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: "1rem",
                    }}
                  >
                    {recommendations.map((rec) => (
                      <div
                        key={rec.recommendationId || rec.productId}
                        style={{
                          border: "1px solid #f1f5f9",
                          background: "#fafafa",
                          borderRadius: "10px",
                          padding: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          position: "relative",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: "flex",
                              gap: "0.75rem",
                              alignItems: "center",
                            }}
                          >
                            {rec.imageUrl ? (
                              <img
                                src={
                                  rec.imageUrl.startsWith("http")
                                    ? rec.imageUrl
                                    : `${API_ORIGIN}${rec.imageUrl}`
                                }
                                alt={rec.name}
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: "6px",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: "6px",
                                  background: "#e2e8f0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                📦
                              </div>
                            )}

                            <div>
                              <div
                                style={{
                                  fontWeight: 600,
                                  fontSize: "0.9rem",
                                  color: "#0f172a",
                                }}
                              >
                                {rec.name}
                              </div>
                              {rec.variantValue && (
                                <div
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "#64748b",
                                  }}
                                >
                                  Spec: {rec.variantValue}
                                </div>
                              )}
                            </div>
                          </div>

                          <div
                            style={{
                              marginTop: "0.75rem",
                              display: "flex",
                              alignItems: "baseline",
                              gap: "0.5rem",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                color: "#059669",
                              }}
                            >
                              {formatCurrency(rec.discountedPrice)}
                            </span>
                            {rec.discountedPrice < rec.originalPrice && (
                              <span
                                style={{
                                  fontSize: "0.85rem",
                                  color: "#94a3b8",
                                  textDecoration: "line-through",
                                }}
                              >
                                {formatCurrency(rec.originalPrice)}
                              </span>
                            )}
                            <span
                              style={{
                                fontSize: "0.7rem",
                                fontWeight: 700,
                                background: "#fee2e2",
                                color: "#b91c1c",
                                padding: "2px 6px",
                                borderRadius: "4px",
                              }}
                            >
                              Special Add-on
                            </span>
                          </div>

                          <p
                            style={{
                              margin: "0.5rem 0 0.75rem 0",
                              fontSize: "0.75rem",
                              color: "#64748b",
                            }}
                          >
                            {rec.displayMessage}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => addRecommendationToCart(rec)}
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "6px",
                            border: "none",
                            background: "#0f172a",
                            color: "#fff",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <span>+ Add to Cart</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Order Summary & Shipping Details */}
            <aside className="cart-summary-col">
              <div className="cart-summary-card">
                <div className="summary-card-header">
                  <div className="summary-header-icon">
                    <i className="fa-solid fa-receipt"></i>
                  </div>
                  <div>
                    <h2>Order Summary</h2>
                    <span className="summary-sub">
                      Authoritative Offer Engine Pricing
                    </span>
                  </div>
                </div>

                {/* Applied Offers / Savings Banner */}
                {appliedOffers.length > 0 && (
                  <div
                    style={{
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      borderRadius: "10px",
                      padding: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#166534",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span>🏷️ Offers &amp; Savings Applied</span>
                    </div>
                    {appliedOffers.map((ao, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.85rem",
                          color: "#15803d",
                          marginTop: "0.25rem",
                        }}
                      >
                        <span>
                          {ao.badge ? `[${ao.badge}] ` : ""}
                          {ao.title}
                        </span>
                        <strong>-{formatCurrency(ao.discountAmount)}</strong>
                      </div>
                    ))}
                  </div>
                )}

                {/* Eligible Offers Upsell Opportunities */}
                {eligibleOffers.length > 0 && (
                  <div
                    style={{
                      background: "#fffbeb",
                      border: "1px solid #fde68a",
                      borderRadius: "10px",
                      padding: "0.85rem 1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "#92400e",
                        marginBottom: "0.25rem",
                      }}
                    >
                      ⚡ Unlock More Savings:
                    </div>
                    {eligibleOffers.slice(0, 2).map((eo, idx) => (
                      <div
                        key={idx}
                        style={{
                          fontSize: "0.8rem",
                          color: "#b45309",
                          marginTop: "0.25rem",
                        }}
                      >
                        • {eo.message}
                      </div>
                    ))}
                  </div>
                )}

                {/* Financial breakdown */}
                <div className="cart-financial-breakdown">
                  <div className="summary-line-row">
                    <span className="row-label">Biologics Subtotal</span>
                    <span className="row-val">{formatCurrency(subtotal)}</span>
                  </div>

                  {discountTotal > 0 && (
                    <div className="summary-line-row" style={{ color: "#059669" }}>
                      <span className="row-label" style={{ color: "#059669", fontWeight: 600 }}>
                        Promotional Savings
                      </span>
                      <span className="row-val" style={{ color: "#059669", fontWeight: 700 }}>
                        -{formatCurrency(discountTotal)}
                      </span>
                    </div>
                  )}

                  <div className="summary-line-row">
                    <span className="row-label">
                      Applicable GST (18%)
                      <span className="gst-chip">Tax Credit</span>
                    </span>
                    <span className="row-val">{formatCurrency(tax)}</span>
                  </div>

                  <div className="summary-line-row">
                    <span className="row-label">Clinical Delivery</span>
                    <span className="delivery-free-badge">
                      <i className="fa-solid fa-check"></i> FREE
                    </span>
                  </div>

                  <div className="summary-total-banner">
                    <div className="total-text-group">
                      <span className="total-banner-label">Estimated Total</span>
                      <span className="total-tax-note">
                        All GST &amp; Cold-Chain Included
                      </span>
                    </div>
                    <span className="total-banner-amount">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                {/* Shipping & Clinician Address Form */}
                <form
                  onSubmit={handlePlaceOrder}
                  className="cart-checkout-form"
                >
                  <div className="form-section-header">
                    <i className="fa-solid fa-location-dot"></i>
                    <h3>Hospital / Clinic Delivery Address</h3>
                  </div>

                  <div className="floating-input-group">
                    <span className="input-icon">
                      <i className="fa-solid fa-building"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Clinic / Hospital Name & Address Line"
                      value={address.line1}
                      onChange={(e) =>
                        setAddress({ ...address, line1: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-double-row">
                    <div className="floating-input-group">
                      <span className="input-icon">
                        <i className="fa-solid fa-city"></i>
                      </span>
                      <input
                        type="text"
                        placeholder="City (e.g. Chennai)"
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="floating-input-group">
                      <span className="input-icon">
                        <i className="fa-solid fa-map-location-dot"></i>
                      </span>
                      <input
                        type="text"
                        placeholder="State (e.g. Tamil Nadu)"
                        value={address.state}
                        onChange={(e) =>
                          setAddress({ ...address, state: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-double-row">
                    <div className="floating-input-group">
                      <span className="input-icon">
                        <i className="fa-solid fa-hashtag"></i>
                      </span>
                      <input
                        type="text"
                        placeholder="PIN Code"
                        value={address.pincode}
                        onChange={(e) =>
                          setAddress({ ...address, pincode: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="floating-input-group">
                      <span className="input-icon">
                        <i className="fa-solid fa-phone"></i>
                      </span>
                      <input
                        type="tel"
                        placeholder="Surgeon / Hospital Phone"
                        value={address.phone}
                        onChange={(e) =>
                          setAddress({ ...address, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="cart-place-order-cta-btn"
                    disabled={placing}
                  >
                    {placing ? (
                      <span className="btn-loading-state">
                        <i className="fa-solid fa-spinner fa-spin"></i> Processing
                        Order...
                      </span>
                    ) : (
                      <>
                        <span>
                          {isLoggedIn
                            ? "Confirm & Place Order"
                            : "Sign In & Place Order"}
                        </span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </>
                    )}
                  </button>
                </form>

                {/* Trust and Clinical Invoice Guarantees */}
                <div className="summary-trust-guarantees">
                  <div className="guarantee-row">
                    <i className="fa-solid fa-lock" aria-hidden="true"></i>
                    <span>Encrypted Medical Order Processing</span>
                  </div>
                  <div className="guarantee-row">
                    <i
                      className="fa-solid fa-file-invoice"
                      aria-hidden="true"
                    ></i>
                    <span>Instant B2B GST Tax Invoice on Checkout</span>
                  </div>
                  <div className="guarantee-row">
                    <i className="fa-solid fa-headset" aria-hidden="true"></i>
                    <span>Dedicated Clinician Support Line</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
