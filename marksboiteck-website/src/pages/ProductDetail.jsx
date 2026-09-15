import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import { useCart } from "../context/CartContext";
import { getVariantOptions, slugify } from "../utils/productFamilies";
import { VariantSwatches, VariantRow } from "../components/ProductVariant";
import {
  trackProductView,
  trackAddToCart,
  trackDwellTime,
} from "../utils/analytics";
import "../styles/all-products.css";
import "../styles/product-detail.css";

const API_ORIGIN = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "");

export default function ProductDetail() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedId, setAddedId] = useState(undefined);
  const [heroIndex, setHeroIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    Promise.all([api.get("/products"), api.get("/brands")])
      .then(([p, b]) => {
        setProducts(p.filter((item) => item.status !== "inactive"));
        setBrands(b);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const product = useMemo(() => {
    if (!slug) return null;
    const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();
    return products.find(
      (p) =>
        (p.slug && p.slug.toLowerCase() === decodedSlug) ||
        slugify(p.name) === decodedSlug,
    );
  }, [products, slug]);

  useEffect(() => {
    if (!product?.id) return;
    trackProductView(product.id, null, {
      name: product.name,
      price: product.price,
    });
    const startTime = Date.now();

    return () => {
      const dwellSeconds = Math.round((Date.now() - startTime) / 1000);
      if (dwellSeconds > 2) {
        trackDwellTime(product.id, dwellSeconds);
      }
    };
  }, [product?.id]);

  const variantOptions = useMemo(() => getVariantOptions(product), [product]);
  const brandName = (id) => brands.find((b) => b.id === id)?.name || "";

  function handleAdd(variant, quantity) {
    addToCart(product, quantity, variant.id ? variant : null);
    trackAddToCart(product.id, variant.id || null, quantity, {
      variantValue: variant.value,
      price: variant.price || product.price,
    });
    setAddedId(variant.id);
    setTimeout(() => setAddedId(undefined), 1500);
  }

  if (loading) {
    return (
      <div className="all-products-page">
        <div className="detail-loading-state">
          <div className="loading-spinner"></div>
          <p>Loading medical catalog specifications...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="all-products-page">
        <div className="detail-not-found-container">
          <div className="empty-icon-wrap">
            <i className="fa-solid fa-box-open" aria-hidden="true"></i>
          </div>
          <h2>Product Not Found</h2>
          <p>
            {error ||
              "The requested medical product specification could not be located."}
          </p>
          <Link
            to="/all-products"
            className="product-btn-primary detail-back-cta"
          >
            <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
            <span>Back to All Products</span>
          </Link>
        </div>
      </div>
    );
  }

  const hero =
    variantOptions[Math.min(heroIndex, variantOptions.length - 1)] ||
    variantOptions[0];
  const brand = brandName(product.brandId);
  const isMultiVariant = variantOptions.length > 1;
  const minPrice = Math.min(...variantOptions.map((v) => v.price));

  return (
    <div className="all-products-page detail-page-container">
      {/* Top Breadcrumb Navigation */}
      <nav
        className="products-breadcrumb-nav detail-breadcrumb-nav"
        aria-label="Breadcrumb"
      >
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
          {product.mainCategoryName && (
            <>
              <span className="breadcrumb-muted">
                {product.mainCategoryName}
              </span>
              <span className="breadcrumb-sep">/</span>
            </>
          )}
          {product.categoryName &&
            product.categoryName.trim() !== product.name.trim() && (
              <>
                <span className="breadcrumb-muted">{product.categoryName}</span>
                <span className="breadcrumb-sep">/</span>
              </>
            )}
          <span className="breadcrumb-current">{product.name}</span>
        </div>
      </nav>

      {/* Main Two-Column Layout: Left = Product & Variants, Right = Description & Clinical Overview */}
      <main className="detail-main-layout">
        {/* Left Column: Product Visual Showcase & Variant Purchasing Options */}
        <section
          className="detail-gallery-col"
          aria-label="Product Showcase and Purchasing Options"
        >
          {/* Main Visual Presentation Card */}
          <div className="detail-gallery-card">
            <div className="detail-gallery-badges">
              {brand && <span className="detail-brand-badge">{brand}</span>}
              {product.categoryName && (
                <span className="detail-category-badge">
                  {product.categoryName}
                </span>
              )}
            </div>

            <div className="detail-gallery-viewport">
              <div
                className="detail-ambient-spotlight"
                aria-hidden="true"
              ></div>
              {product.images?.[0] ? (
                <img
                  src={`${API_ORIGIN}${product.images[0]}`}
                  alt={product.name}
                  className="detail-hero-img"
                />
              ) : (
                <div className="detail-img-placeholder">
                  <i className="fa-solid fa-cube" aria-hidden="true"></i>
                  <span>Medical Product Image</span>
                </div>
              )}
            </div>

            <div className="detail-gallery-caption">
              <span className="caption-text">{product.name}</span>
              <div className="caption-badge">
                <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
                <span>Medical-Grade Authentic Sterile Package</span>
              </div>
            </div>
          </div>

          {/* Quick Option Selector Swatches (Multi-variant only) */}
          {isMultiVariant && (
            <VariantSwatches
              variants={variantOptions}
              activeIndex={heroIndex}
              onSelect={setHeroIndex}
            />
          )}

          {/* Available Sizes / Variants Purchasing Stack */}
          <div className="detail-variants-section">
            <div className="variants-section-header">
              <div className="variants-header-left">
                <div className="variants-icon-box">
                  <i className="fa-solid fa-layer-group" aria-hidden="true"></i>
                </div>
                <div>
                  <h2>
                    {isMultiVariant
                      ? "Select Size & Specification"
                      : "Available Option"}
                  </h2>
                  <span className="variants-sub-hint">
                    Choose quantity and add to cart
                  </span>
                </div>
              </div>
              <span className="variants-count-badge">
                {variantOptions.length}{" "}
                {variantOptions.length === 1 ? "Option" : "Options"}
              </span>
            </div>

            <div className="detail-variants-stack">
              {variantOptions.map((v, idx) => (
                <VariantRow
                  key={v.id ?? idx}
                  product={product}
                  variant={v}
                  onAdd={handleAdd}
                  justAddedId={addedId}
                  highlighted={hero.id === v.id}
                  onSelectHero={() => setHeroIndex(idx)}
                />
              ))}
            </div>
          </div>

          {/* Trust & Quality Assurance Badges */}
          <div className="detail-trust-cards-grid">
            <div className="trust-micro-card">
              <div className="trust-icon-box">
                <i className="fa-solid fa-certificate" aria-hidden="true"></i>
              </div>
              <div>
                <strong>100% Certified Biologics</strong>
                <p>Authentic surgical-grade sourcing</p>
              </div>
            </div>
            <div className="trust-micro-card">
              <div className="trust-icon-box">
                <i
                  className="fa-solid fa-temperature-arrow-down"
                  aria-hidden="true"
                ></i>
              </div>
              <div>
                <strong>Sterile Cold-Chain</strong>
                <p>Protected temperature shipping</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Title, Pricing & Full Clinical Description / Specifications */}
        <section
          className="detail-purchase-col"
          aria-label="Product Description and Clinical Details"
        >
          {/* Header & Price Banner */}
          <div className="detail-product-header">
            <div className="detail-meta-eyebrow">
              <span className="eyebrow-category">
                {product.categoryName || "Biotech Product"}
              </span>
              {brand && <span className="eyebrow-brand">· By {brand}</span>}
            </div>

            <h1 className="detail-page-title">{product.name}</h1>

            <div className="detail-price-highlight-strip">
              <div className="price-tag-group">
                <span className="price-label">Price starting from</span>
                <span className="price-amount">
                  ₹{Number(minPrice).toLocaleString("en-IN")}
                  {isMultiVariant && (
                    <span className="price-onwards-text"> onwards</span>
                  )}
                </span>
                <div className="price-footer-strip">
                  <span className="price-tax-text">
                    All prices inclusive of applicable GST
                  </span>
                  <span className="price-delivery-pill">
                    <i
                      className="fa-solid fa-truck-fast"
                      aria-hidden="true"
                    ></i>
                    <span>Express Clinical Delivery</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Specifications & Indications Description Card */}
          {product.description && (
            <div className="detail-clinical-info-card">
              <div className="clinical-info-header">
                <div className="clinical-icon-badge">
                  <i
                    className="fa-solid fa-notes-medical"
                    aria-hidden="true"
                  ></i>
                </div>
                <div>
                  <h3>Clinical Overview &amp; Specifications</h3>
                  <span className="clinical-sub">
                    Surgical Indications &amp; Biocompatibility
                  </span>
                </div>
              </div>
              <div
                className="clinical-info-body"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {/* Clinician Direct Consultation & Support Box */}
          <div className="detail-support-box">
            <div className="support-box-icon">
              <i className="fa-solid fa-headset" aria-hidden="true"></i>
            </div>
            <div className="support-box-content">
              <h4>Need Clinical Guidance or Bulk Orders?</h4>
              <p>
                Our biomaterial and implant specialists are available to assist
                surgeons and clinics.
              </p>
              <div className="support-box-actions">
                <a
                  href="https://wa.me/919819893250"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="support-btn whatsapp"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                  <span>WhatsApp Consultant</span>
                </a>
                <a href="tel:+914448593250" className="support-btn phone">
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                  <span>+91 44 485 93250</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
