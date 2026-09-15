import React, { useState } from "react";
import { specBadges } from "../utils/productFamilies";

export function QtyStepper({ id, quantity, max, onChange }) {
  return (
    <div className="qty-stepper">
      <button
        type="button"
        className="qty-btn qty-btn-dec"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
        onClick={() => onChange(Math.max(1, quantity - 1))}
      >
        <i className="fa-solid fa-minus" aria-hidden="true"></i>
      </button>
      <input
        id={id}
        type="number"
        className="qty-input"
        min="1"
        max={max}
        value={quantity}
        onChange={(e) => onChange(Math.max(1, Number(e.target.value) || 1))}
      />
      <button
        type="button"
        className="qty-btn qty-btn-inc"
        aria-label="Increase quantity"
        disabled={max && quantity >= max}
        onClick={() => onChange(Math.min(max || quantity + 1, quantity + 1))}
      >
        <i className="fa-solid fa-plus" aria-hidden="true"></i>
      </button>
    </div>
  );
}

// Text-based size/option chips
export function VariantSwatches({ variants, activeIndex, onSelect }) {
  if (!variants || variants.length <= 1) return null;

  return (
    <div className="detail-swatches-container">
      <div className="swatches-header-strip">
        <span className="swatches-label">Quick Select Option</span>
        <span className="swatches-count-chip">{variants.length} available</span>
      </div>
      <div className="variant-swatch-row">
        {variants.map((v, i) => {
          const inStock = Number(v.stock) > 0;
          const isActive = i === activeIndex;
          return (
            <button
              type="button"
              key={v.id ?? i}
              className={`variant-swatch-card ${isActive ? "active" : ""} ${
                !inStock ? "out-of-stock" : ""
              }`}
              onClick={() => onSelect(i)}
            >
              <div className="swatch-meta">
                <span className="swatch-title" title={v.label}>
                  {v.label}
                </span>
                <span className="swatch-price">
                  ₹{Number(v.price || 0).toLocaleString("en-IN")}
                </span>
              </div>
              {isActive && (
                <div className="swatch-active-indicator">
                  <i className="fa-solid fa-check"></i>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// One card per variant
export function VariantRow({
  product,
  variant,
  onAdd,
  justAddedId,
  highlighted,
  onSelectHero,
}) {
  const [quantity, setQuantity] = useState(1);
  const inStock = Number(variant.stock) > 0;
  const isJustAdded = justAddedId === variant.id;
  const label = variant.label || product.name;

  return (
    <div
      className={`variant-card ${highlighted ? "is-highlighted" : ""} ${!inStock ? "is-oos" : ""}`}
      onClick={() => onSelectHero && onSelectHero()}
    >
      <div className="variant-card-main">
        <div className="variant-card-info">
          <div className="variant-card-heading">
            <h4 className="variant-card-title">{label}</h4>
            <span
              className={`variant-stock-tag ${inStock ? "in-stock" : "out-of-stock"}`}
            >
              <span className="stock-dot"></span>
              <span>
                {inStock ? `${variant.stock} in stock` : "Out of stock"}
              </span>
            </span>
          </div>

          {variant.sku && (
            <div className="variant-sku-line">
              <span>
                SKU: <code>{variant.sku}</code>
              </span>
            </div>
          )}

          {specBadges(product).length > 0 && (
            <div className="variant-specs-wrap">
              {specBadges(product).map(([k, v]) => (
                <span className="variant-spec-pill" key={k}>
                  <span className="spec-name">{k}:</span> <strong>{v}</strong>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="variant-card-purchase">
        <div className="variant-price-section">
          <span className="variant-price-val">
            ₹{Number(variant.price || 0).toLocaleString("en-IN")}
          </span>
          <span className="variant-price-tax">incl. GST</span>
        </div>

        <div className="variant-actions-group">
          <QtyStepper
            id={`qty-${variant.id ?? "base"}`}
            quantity={quantity}
            max={Number(variant.stock) || 99}
            onChange={setQuantity}
          />

          <button
            type="button"
            className={`variant-add-btn ${isJustAdded ? "btn-success" : ""}`}
            disabled={!inStock}
            onClick={(e) => {
              e.stopPropagation();
              onAdd(variant, quantity);
            }}
          >
            {isJustAdded ? (
              <>
                <i className="fa-solid fa-check" aria-hidden="true"></i>
                <span>Added to Cart</span>
              </>
            ) : inStock ? (
              <>
                <i className="fa-solid fa-cart-plus" aria-hidden="true"></i>
                <span>Add to Cart</span>
              </>
            ) : (
              <span>Out of Stock</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
