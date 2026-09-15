import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { trackCheckoutStart, sendAnalyticsEvent } from "../utils/analytics";
import "../styles/all-products.css";
import "../styles/shop-account.css";

const API_ORIGIN = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "");
const TAX_RATE = 0.18;

function CartItemRow({ item, onUpdateQty, onRemove }) {
  const lineTotal = item.price * item.quantity;
  return (
    <div className="cart-item-row">
      <div className="cart-item-img-wrap">
        {item.image ? (
          <img
            src={`${API_ORIGIN}${item.image}`}
            alt={item.name}
            loading="lazy"
          />
        ) : (
          <i className="fa-solid fa-image" aria-hidden="true"></i>
        )}
      </div>

      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.name}</h3>
        <span className="cart-item-unit-price">
          ₹{item.price.toFixed(2)} each
        </span>
        <button
          type="button"
          className="cart-item-remove"
          onClick={() => onRemove(item.productId, item.variantId ?? null)}
        >
          <i className="fa-solid fa-trash-can" aria-hidden="true"></i> Remove
        </button>
      </div>

      <div className="qty-stepper cart-item-qty">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() =>
            onUpdateQty(
              item.productId,
              item.variantId ?? null,
              item.quantity - 1,
            )
          }
        >
          −
        </button>
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) =>
            onUpdateQty(
              item.productId,
              item.variantId ?? null,
              Math.max(1, Number(e.target.value) || 1),
            )
          }
        />
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() =>
            onUpdateQty(
              item.productId,
              item.variantId ?? null,
              item.quantity + 1,
            )
          }
        >
          +
        </button>
      </div>

      <div className="cart-item-total">₹{lineTotal.toFixed(2)}</div>
    </div>
  );
}

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal, checkout } =
    useCart();
  const { isLoggedIn } = useAuth();
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

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  useEffect(() => {
    if (items.length > 0) {
      trackCheckoutStart(items, total);
    }
  }, [items.length]);

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
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  }

  if (placedOrder) {
    return (
      <div className="all-products-page">
        <section className="products-hero-banner">
          <h1 className="products-hero-title">
            Order <span>Confirmed</span>
          </h1>
          <p className="products-hero-subtitle">Thank you for your purchase.</p>
        </section>
        <div className="order-success-wrap">
          <div className="order-success-card">
            <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
            <h2>Order #{placedOrder.orderNumber} placed successfully</h2>
            <p>
              Total <strong>₹{placedOrder.total}</strong> — a confirmation has
              been recorded on your account.
            </p>
            <div className="order-success-actions">
              <Link to="/account" className="product-btn-primary">
                View My Orders
              </Link>
              <Link to="/all-products" className="product-btn-outline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="all-products-page">
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
          <span className="breadcrumb-current">Cart</span>
        </div>
      </nav>

      <section className="products-hero-banner">
        <h1 className="products-hero-title">
          Your <span>Cart</span>
        </h1>
        <p className="products-hero-subtitle">
          Review your items and complete your order.
        </p>
      </section>

      <div className="cart-layout-wrap">
        {error && <div className="cart-error-banner">{error}</div>}

        {items.length === 0 ? (
          <div className="no-products-found cart-empty">
            <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
            <h3>Your cart is empty</h3>
            <p>Browse our catalog and add products to get started.</p>
            <Link
              to="/all-products"
              className="product-btn-primary cart-empty-cta"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items-col">
              <div className="cart-items-header">
                <span>Product</span>
                <span className="cart-col-qty">Quantity</span>
                <span className="cart-col-total">Total</span>
              </div>
              {items.map((item) => (
                <CartItemRow
                  key={`${item.productId}-${item.variantId ?? "base"}`}
                  item={item}
                  onUpdateQty={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <aside className="cart-summary-col">
              <div className="cart-summary-card">
                <h2>Order Summary</h2>
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Estimated GST (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row cart-summary-total">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <form onSubmit={handlePlaceOrder} className="cart-address-form">
                  <h3>Shipping Address</h3>
                  <input
                    placeholder="Address line"
                    value={address.line1}
                    onChange={(e) =>
                      setAddress({ ...address, line1: e.target.value })
                    }
                    required
                  />
                  <div className="cart-address-form-row">
                    <input
                      placeholder="City"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      required
                    />
                    <input
                      placeholder="State"
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="cart-address-form-row">
                    <input
                      placeholder="Pincode"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                      }
                      required
                    />
                    <input
                      placeholder="Phone"
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="product-btn-primary cart-place-order-btn"
                    disabled={placing}
                  >
                    {placing
                      ? "Placing order..."
                      : isLoggedIn
                        ? "Place Order"
                        : "Sign In to Place Order"}
                  </button>
                </form>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
