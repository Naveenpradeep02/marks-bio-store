import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { getVariantOptions, slugify } from "../utils/productFamilies";
import { trackSearch, trackSearchClick } from "../utils/analytics";
import "../styles/all-products.css";

const API_ORIGIN = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "");

function resolveProductImg(img) {
  if (!img) return null;
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  if (img.startsWith("/assets/")) return img;
  return `${API_ORIGIN}${img}`;
}

function ProductCard({ product, getBrandName, activeSearchQuery, offerBadge }) {
  const navigate = useNavigate();
  const variants = getVariantOptions(product);
  const isMultiVariant = variants.length > 1;
  const brandName = getBrandName(product.brandId);

  function goToDetail() {
    if (activeSearchQuery) {
      trackSearchClick(product.id, activeSearchQuery);
    }
    navigate(`/products/${product.slug || slugify(product.name)}`);
  }

  const minPrice = Math.min(...variants.map((v) => v.price));

  const categoryLabel = [product.mainCategoryName, product.categoryName]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="product-card clickable" onClick={goToDetail}>
      <div className="product-card-img-wrap">
        {/* Clean top badges (Brand and Multi-variant) */}
        <div className="card-top-badges">
          {brandName && (
            <span className="product-brand-badge">{brandName}</span>
          )}
          {isMultiVariant && (
            <span className="product-variant-badge">
              <i className="fa-solid fa-layer-group" aria-hidden="true"></i>
              <span>{variants.length} Sizes</span>
            </span>
          )}
          {offerBadge && (
            <span
              style={{
                background: "var(--brand, #ce2017)",
                color: "#fff",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              🏷️ {offerBadge}
            </span>
          )}
        </div>

        {/* Ambient lighting highlight behind product */}
        <div className="card-ambient-light" aria-hidden="true"></div>

        {/* Product Image */}
        {product.images?.[0] ? (
          <img
            className="product-card-img"
            src={resolveProductImg(product.images[0])}
            alt={product.name}
            loading="lazy"
          />
        ) : (
          <div className="product-card-img product-card-img-placeholder">
            <i className="fa-solid fa-tooth" aria-hidden="true"></i>
          </div>
        )}

        <div className="card-hover-overlay">
          <span className="card-quick-view-pill">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            <span>View Specifications</span>
          </span>
        </div>
      </div>

      <div className="product-card-body">
        {/* Category micro-tag */}
        <div className="product-meta-header">
          <span className="product-category-text">
            {categoryLabel || "Biotech Dental"}
          </span>
        </div>

        {/* Product Title (2-lines fixed clamp) */}
        <h3 className="product-card-title" title={product.name}>
          {product.name}
        </h3>

        {/* Price & Action Button */}
        <div className="product-card-footer">
          <div className="product-price-block">
            <span className="product-price-label">Starting from</span>
            <span className="product-price-main">
              ₹{minPrice.toLocaleString("en-IN")}
              {isMultiVariant && (
                <span className="price-onwards-tag"> onwards</span>
              )}
            </span>
          </div>

          <button
            type="button"
            className="product-btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              goToDetail();
            }}
          >
            <span>View Product</span>
            <span>Details</span>
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </article>
  );
}

function FilterSection({ title, icon, options, selected, onToggle }) {
  const [open, setOpen] = useState(true);
  if (options.length === 0) return null;

  return (
    <div className="filter-section">
      <button
        type="button"
        className="filter-section-header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="filter-section-title-wrap">
          {icon && (
            <i className={`${icon} filter-section-icon`} aria-hidden="true"></i>
          )}
          <span>{title}</span>
          {selected.size > 0 && (
            <span className="filter-section-active-badge">{selected.size}</span>
          )}
        </div>
        <i
          className={`fa-solid fa-chevron-${open ? "up" : "down"} filter-chevron`}
          aria-hidden="true"
        ></i>
      </button>
      {open && (
        <div className="filter-section-body">
          {options.map(({ value, label, count, indent }) => {
            const isChecked = selected.has(value);
            return (
              <label
                className={`filter-checkbox ${isChecked ? "is-selected" : ""}`}
                key={value}
                style={indent ? { paddingLeft: "1.25rem" } : undefined}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggle(value)}
                />
                <span className="custom-check-box">
                  <i className="fa-solid fa-check" aria-hidden="true"></i>
                </span>
                <span className="filter-label-text">{label}</span>
                <span className="filter-count-chip">{count}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categoryTree, setCategoryTree] = useState([]);
  const [activeOffers, setActiveOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Holds a mix of main-category ids and sub-category ids.
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedBrands, setSelectedBrands] = useState(new Set());
  const [sortBy, setSortBy] = useState("relevance");
  const [gridColumns, setGridColumns] = useState(3);

  useEffect(() => {
    Promise.all([
      api.get("/products"),
      api.get("/brands"),
      api.get("/categories?tree=true"),
      api.get("/offers/active").catch(() => []),
    ])
      .then(([p, b, c, off]) => {
        setProducts(p.filter((item) => item.status !== "inactive"));
        setBrands(b);
        setCategoryTree(c);
        setActiveOffers(off || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const brandName = (id) => brands.find((b) => b.id === id)?.name || "";
  const categoryPathById = useMemo(() => {
    const map = new Map();
    for (const main of categoryTree) {
      map.set(main.id, main.name);
      for (const sub of main.subcategories) {
        map.set(sub.id, `${main.name} · ${sub.name}`);
      }
    }
    return map;
  }, [categoryTree]);

  function matchesCategory(p) {
    if (selectedCategories.size === 0) return true;
    if (p.categoryId && selectedCategories.has(p.categoryId)) return true;
    if (p.mainCategoryId && selectedCategories.has(p.mainCategoryId))
      return true;
    return false;
  }

  function matchesFilters(
    p,
    { excludeCategory = false, excludeBrand = false } = {},
  ) {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      p.name.toLowerCase().includes(q) ||
      (p.categoryName || "").toLowerCase().includes(q) ||
      (p.sku || "").toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q);
    if (!matchesSearch) return false;

    if (!excludeCategory && !matchesCategory(p)) return false;
    if (
      !excludeBrand &&
      selectedBrands.size > 0 &&
      !selectedBrands.has(p.brandId)
    )
      return false;

    return true;
  }

  const visibleProducts = useMemo(() => {
    const matched = products.filter((p) => matchesFilters(p));

    const minPrice = (p) =>
      Math.min(...getVariantOptions(p).map((v) => v.price));

    switch (sortBy) {
      case "price-asc":
        return [...matched].sort((a, b) => minPrice(a) - minPrice(b));
      case "price-desc":
        return [...matched].sort((a, b) => minPrice(b) - minPrice(a));
      case "name-asc":
        return [...matched].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return matched;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, searchQuery, selectedCategories, selectedBrands, sortBy]);

  useEffect(() => {
    if (!searchQuery.trim()) return;
    const timer = setTimeout(() => {
      trackSearch(searchQuery.trim(), visibleProducts.length);
    }, 750);
    return () => clearTimeout(timer);
  }, [searchQuery, visibleProducts.length]);

  const categoryOptions = useMemo(() => {
    const counts = new Map();
    for (const p of products) {
      if (!matchesFilters(p, { excludeCategory: true })) continue;
      if (p.categoryId)
        counts.set(p.categoryId, (counts.get(p.categoryId) || 0) + 1);
    }
    const options = [];
    for (const main of categoryTree) {
      const subCounts = main.subcategories.map(
        (sub) => counts.get(sub.id) || 0,
      );
      const mainCount =
        (counts.get(main.id) || 0) + subCounts.reduce((a, b) => a + b, 0);
      if (mainCount === 0) continue;
      options.push({ value: main.id, label: main.name, count: mainCount });
      main.subcategories.forEach((sub, i) => {
        if (subCounts[i] === 0) return;
        options.push({
          value: sub.id,
          label: sub.name,
          count: subCounts[i],
          indent: true,
        });
      });
    }
    return options;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, categoryTree, searchQuery, selectedBrands]);

  const brandOptions = useMemo(() => {
    const counts = new Map();
    for (const p of products) {
      if (!p.brandId || !matchesFilters(p, { excludeBrand: true })) continue;
      counts.set(p.brandId, (counts.get(p.brandId) || 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([value, count]) => ({
        value,
        label: brandName(value) || `Brand ${value}`,
        count,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, brands, searchQuery, selectedCategories]);

  function toggleInSet(setState, value) {
    setState((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  const activeFilterCount =
    selectedCategories.size +
    selectedBrands.size +
    (searchQuery.trim() ? 1 : 0);

  function clearAllFilters() {
    setSelectedCategories(new Set());
    setSelectedBrands(new Set());
    setSearchQuery("");
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
          <span className="breadcrumb-current">Store</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">All Products</span>
        </div>
      </nav>

      {/* Premium Hero Header Banner */}
      <section className="products-hero-banner">
        <div className="products-hero-container">
          <div className="products-hero-badge">
            <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
            <span>Official Biotech Catalog &amp; Store</span>
          </div>
          <h1 className="products-hero-title">
            Implantology &amp; <span>Regenerative</span> Solutions
          </h1>
          <p className="products-hero-subtitle">
            Explore advanced medical-grade dental implants, allograft bone
            matrices, titanium barrier membranes, and robotic surgical
            navigation.
          </p>
        </div>
      </section>

      {/* Active Promotional Campaigns Banner */}
      {activeOffers.length > 0 && (
        <div style={{ maxWidth: 1400, margin: "1.5rem auto 0 auto", padding: "0 1.5rem" }}>
          <div
            style={{
              background: "linear-gradient(90deg, #0f172a 0%, #1e1b4b 100%)",
              border: "1px solid #334155",
              borderRadius: 12,
              padding: "1rem 1.5rem",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <span style={{ fontSize: "1.5rem" }}>🏷️</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1rem", color: "#f8fafc" }}>
                  Active Promotional Offers &amp; Volume Pricing
                </div>
                <div style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: "2px" }}>
                  {activeOffers.map((o) => o.badge || o.title).join(" · ")}
                </div>
              </div>
            </div>
            <Link
              to="/cart"
              style={{
                background: "var(--brand, #ce2017)",
                color: "#fff",
                padding: "0.55rem 1.15rem",
                borderRadius: 6,
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "0.85rem",
              }}
            >
              View Cart Tray →
            </Link>
          </div>
        </div>
      )}

      {/* Main Store Workspace (Sticky Filter + Product Grid) */}
      <main className="products-shop-layout">
        {/* Sticky Filter Sidebar */}
        <aside
          className="products-filters-sidebar"
          aria-label="Product Filters"
        >
          <div className="filters-header">
            <div className="filters-title-wrap">
              <i className="fa-solid fa-sliders" aria-hidden="true"></i>
              <h2>Filters</h2>
              {activeFilterCount > 0 && (
                <span className="filters-count-pill">{activeFilterCount}</span>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button
                type="button"
                className="filters-clear-btn"
                onClick={clearAllFilters}
                title="Reset all filters"
              >
                Reset All
              </button>
            )}
          </div>

          <div className="filters-scroll-area">
            <FilterSection
              title="Brand"
              icon="fa-solid fa-award"
              options={brandOptions}
              selected={selectedBrands}
              onToggle={(v) => toggleInSet(setSelectedBrands, v)}
            />
            <FilterSection
              title="Category"
              icon="fa-solid fa-shapes"
              options={categoryOptions}
              selected={selectedCategories}
              onToggle={(v) => toggleInSet(setSelectedCategories, v)}
            />
          </div>
        </aside>

        {/* Products Main Column */}
        <section
          className="products-grid-container"
          aria-label="Product Listings"
        >
          {/* Top Control Bar: Search, Results Count, Layout & Sort */}
          <div className="products-action-toolbar">
            <div className="toolbar-search-box">
              <i
                className="fa-solid fa-magnifying-glass search-icon"
                aria-hidden="true"
              ></i>
              <input
                type="search"
                className="toolbar-search-input"
                placeholder="Search by product name, SKU, category, or specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              )}
            </div>

            <div className="toolbar-right-controls">
              <span className="products-results-count">
                <strong>{visibleProducts.length}</strong>{" "}
                {visibleProducts.length === 1 ? "Product" : "Products"}
              </span>

              {/* Grid Column Switcher (Desktop) */}
              <div
                className="grid-layout-switcher"
                role="group"
                aria-label="Grid Columns"
              >
                <button
                  type="button"
                  className={`layout-btn ${gridColumns === 3 ? "active" : ""}`}
                  onClick={() => setGridColumns(3)}
                  title="3 Columns Grid"
                >
                  <i className="fa-solid fa-table-cells" aria-hidden="true"></i>
                </button>
                <button
                  type="button"
                  className={`layout-btn ${gridColumns === 4 ? "active" : ""}`}
                  onClick={() => setGridColumns(4)}
                  title="4 Columns Grid"
                >
                  <i
                    className="fa-solid fa-table-cells-large"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="products-sort-box">
                <label htmlFor="products-sort">Sort:</label>
                <select
                  id="products-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="products-sort-select"
                >
                  <option value="relevance">Featured &amp; Relevant</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Alphabetical: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Chips / Pills */}
          {activeFilterCount > 0 && (
            <div className="active-filter-chips-row">
              <span className="active-chips-label">Active Filters:</span>
              {searchQuery.trim() && (
                <span className="filter-chip">
                  <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                  <button type="button" onClick={() => setSearchQuery("")}>
                    <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                  </button>
                </span>
              )}
              {Array.from(selectedBrands).map((brandId) => (
                <span className="filter-chip" key={brandId}>
                  <span>Brand: {brandName(brandId) || brandId}</span>
                  <button
                    type="button"
                    onClick={() => toggleInSet(setSelectedBrands, brandId)}
                  >
                    <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                  </button>
                </span>
              ))}
              {Array.from(selectedCategories).map((catId) => (
                <span className="filter-chip" key={catId}>
                  <span>Category: {categoryPathById.get(catId) || catId}</span>
                  <button
                    type="button"
                    onClick={() => toggleInSet(setSelectedCategories, catId)}
                  >
                    <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                  </button>
                </span>
              ))}
              <button
                type="button"
                className="clear-all-chips-btn"
                onClick={clearAllFilters}
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid Content */}
          {error && (
            <div className="products-error-alert">
              <i
                className="fa-solid fa-circle-exclamation"
                aria-hidden="true"
              ></i>
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="products-loading-state">
              <div className="loading-spinner"></div>
              <p>Loading premium product catalog...</p>
            </div>
          ) : visibleProducts.length === 0 ? (
            <div className="no-products-found">
              <div className="empty-icon-wrap">
                <i className="fa-solid fa-box-open" aria-hidden="true"></i>
              </div>
              <h3>No Matching Products</h3>
              <p>
                {products.length === 0
                  ? "Our medical product catalog is currently being updated."
                  : "We couldn't find any products matching your active filters or search terms."}
              </p>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  className="empty-reset-btn"
                  onClick={clearAllFilters}
                >
                  <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
                  Reset All Filters
                </button>
              )}
            </div>
          ) : (
            <div className={`products-grid cols-${gridColumns}`}>
              {visibleProducts.map((product) => {
                const promo = activeOffers.find((o) => o.badge);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    getBrandName={brandName}
                    activeSearchQuery={searchQuery.trim()}
                    offerBadge={promo?.badge || null}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
