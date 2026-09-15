import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { user } = useAuth();
  const { items: realCartItems } = useCart();
  const realCartCount = realCartItems.reduce((sum, i) => sum + i.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMega, setOpenMega] = useState(null); // 'dental' | 'regenerative' | 'robotic' | 'resources' | null
  const [col3Open, setCol3Open] = useState(false);

  // Straumann 2-Tier Header States
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginTab, setLoginTab] = useState("login"); // 'login' | 'register'
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos =
            window.scrollY || document.documentElement.scrollTop;
          if (scrollPos > 120) {
            setIsScrolled(true);
          } else if (scrollPos < 40) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Search catalog index
  const searchableItems = [
    {
      title: "DURAVIT EV Implant System",
      category: "Dental Implants",
      url: "https://bnbimplant.in/uniqueimplant#design1",
      external: true,
    },
    {
      title: "DURAVIT 3P Universal Implants",
      category: "Dental Implants",
      url: "https://bnbimplant.in/uniqueimplant#design2",
      external: true,
    },
    {
      title: "DURAVIT Wide Implants",
      category: "Dental Implants",
      url: "https://bnbimplant.in/uniqueimplant#design3",
      external: true,
    },
    {
      title: "DURAVIT Pterygo Implants",
      category: "Dental Implants",
      url: "https://bnbimplant.in/uniqueimplant#design4",
      external: true,
    },
    {
      title: "DURAVIT Slim Implants",
      category: "Dental Implants",
      url: "https://bnbimplant.in/uniqueimplant#design5",
      external: true,
    },
    {
      title: "DURAVIT Mini Implants",
      category: "Dental Implants",
      url: "https://bnbimplant.in/uniqueimplant#design6",
      external: true,
    },
    {
      title: "Customized Subperiosteal Implants",
      category: "Dental Implants",
      url: "https://bnbimplant.in/subperiosteal",
      external: true,
    },
    {
      title: "Digital Guided Surgery",
      category: "Dental Implants",
      url: "https://bnbimplant.in/digitalsurgicalguide",
      external: true,
    },
    {
      title: "B&B Surgical Kits",
      category: "Dental Implants",
      url: "https://bnbimplant.in/surgicalkit",
      external: true,
    },
    {
      title: "Prosthetics – Conexa Connection",
      category: "Prosthetics",
      url: "https://bnbimplant.in/conexaconnection",
      external: true,
    },
    {
      title: "Rocky Mountain Allograft",
      category: "Regenerative Products",
      url: "/allograft",
      external: false,
    },
    {
      title: "NovoBone Xenograft",
      category: "Regenerative Products",
      url: "/xenograft",
      external: false,
    },
    {
      title: "T-Barrier Equine Collagen Membrane",
      category: "Regenerative Products",
      url: "/xenograft#collagen",
      external: false,
    },
    {
      title: "Amcrylate Tissue Adhesive",
      category: "Regenerative Products",
      url: "/tissue",
      external: false,
    },
    {
      title: "Navident 3.0 Dynamic Tracking",
      category: "Robotic Navigation",
      url: "https://navident.in/",
      external: true,
    },
    {
      title: "Navident 4.0 EVO Surgical System",
      category: "Robotic Navigation",
      url: "https://navidentevo.in/",
      external: true,
    },
    {
      title: "MicronMapper Photogrammetry",
      category: "Photogrammetry",
      url: "https://micronmapper.in/",
      external: true,
    },
    {
      title: "Scientific Evidence & Clinical Studies",
      category: "Resources",
      url: "/scientific-evidence",
      external: false,
    },
    {
      title: "Education, Workshops & Masterclasses",
      category: "Resources",
      url: "/events",
      external: false,
    },
    {
      title: "Clinical Blogs & Articles",
      category: "Resources",
      url: "/blog",
      external: false,
    },
    {
      title: "Careers at Marks Biotech",
      category: "Resources",
      url: "/careers",
      external: false,
    },
    {
      title: "About Marks Biotech & Contact",
      category: "About Us",
      url: "/about",
      external: false,
    },
  ];

  const filteredSearch =
    searchQuery.trim() === ""
      ? searchableItems.slice(0, 6)
      : searchableItems.filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  // Sample Cart Items State with interactive quantity
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "DURAVIT EV Implant System",
      category: "Dental Implantology",
      img: "/assets/imgs/2.webp",
      price: "Contact for Quote",
      qty: 2,
    },
    {
      id: 2,
      name: "Rocky Mountain Allograft 1.0gm",
      category: "Regenerative Products",
      img: "/assets/imgs/Rectangle 253.webp",
      price: "Contact for Quote",
      qty: 1,
    },
  ]);

  // Close menus & modals on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenMega(null);
    setCol3Open(false);
    setShowLoginModal(false);
    setShowCartDrawer(false);
    setShowProductsModal(false);
    setShowSearchModal(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Focus search input on open
  useEffect(() => {
    if (showSearchModal && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 80);
    }
  }, [showSearchModal]);

  // Sync body class when modal/drawer is open
  useEffect(() => {
    if (
      mobileMenuOpen ||
      showCartDrawer ||
      showLoginModal ||
      showProductsModal ||
      showSearchModal
    ) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [
    mobileMenuOpen,
    showCartDrawer,
    showLoginModal,
    showProductsModal,
    showSearchModal,
  ]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setOpenMega(null);
    setCol3Open(false);
  };

  const handleMegaClick = (menuName, e) => {
    if (window.innerWidth <= 1024) {
      e.stopPropagation();
      setOpenMega((prev) => (prev === menuName ? null : menuName));
      if (menuName !== "dental") {
        setCol3Open(false);
      }
    }
  };

  const handleUniqueClick = (e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      e.stopPropagation();
      setCol3Open((prev) => !prev);
    } else {
      e.preventDefault();
      setCol3Open(true);
    }
  };

  // Cart operations
  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setShowCartDrawer(true);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner-container">
          {/* Left: Brand Logo */}
          <div className="header-brand-logo">
            <Link to="/" onClick={closeAllMenus}>
              <img
                src="/assets/imgs/marks-biotech-logo 1.webp"
                alt="Marks Biotech"
                loading="lazy"
              />
            </Link>
          </div>

          {/* Center: Main Navigation Menu */}
          <nav className="header-bottom-nav">
            <ul className={`nav-main-menu ${mobileMenuOpen ? "active" : ""}`}>
              {/* Highlights */}
              <li>
                <Link
                  to="/"
                  className={location.pathname === "/" ? "nav-link-active" : ""}
                  onClick={closeAllMenus}
                >
                  Highlights
                </Link>
              </li>

              {/* Dental Implantology */}
              <li
                className={`has-mega mega-dental ${openMega === "dental" ? "open" : ""} ${
                  col3Open ? "col3-open" : ""
                }`}
                onClick={(e) => handleMegaClick("dental", e)}
                onMouseLeave={() => setCol3Open(false)}
              >
                <span>Dental Implantology</span>
                <i className="fa-solid fa-angle-down" aria-hidden="true"></i>

                <div className="mega-menu">
                  <div className="mega-menu-inner">
                    <div className="mega-column column-2" id="col2">
                      <h4>Categories</h4>
                      <ul>
                        <li data-img="heritage">
                          <a
                            href="https://bnbimplant.in/heritage"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Heritage
                          </a>
                        </li>
                        <li
                          id="unique"
                          data-img="unique"
                          className="active-submenu"
                          onMouseEnter={() => setCol3Open(true)}
                          onFocus={() => setCol3Open(true)}
                        >
                          <a href="#col3" onClick={handleUniqueClick}>
                            Unique Design
                            <i
                              className="fa-solid fa-angle-right"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li data-img="custom">
                          <a
                            href="https://bnbimplant.in/subperiosteal"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Customized Implants
                          </a>
                        </li>
                        <li data-img="guided">
                          <a
                            href="https://bnbimplant.in/digitalsurgicalguide"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Digital Guided Surgery
                          </a>
                        </li>
                        <li data-img="kits">
                          <a
                            href="https://bnbimplant.in/surgicalkit"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Surgical Kits
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div
                      className={`mega-column column-3 ${col3Open ? "active" : ""}`}
                      id="col3"
                    >
                      <h4>Implants</h4>
                      <ul>
                        <li data-img="duravit-ev">
                          <a
                            href="https://bnbimplant.in/uniqueimplant#design1"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DURAVIT EV
                          </a>
                        </li>
                        <li data-img="duravit-3p">
                          <a
                            href="https://bnbimplant.in/uniqueimplant#design2"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DURAVIT 3P
                          </a>
                        </li>
                        <li data-img="duravit-wide">
                          <a
                            href="https://bnbimplant.in/uniqueimplant#design3"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DURAVIT Wide
                          </a>
                        </li>
                        <li data-img="duravit-pterygo">
                          <a
                            href="https://bnbimplant.in/uniqueimplant#design4"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DURAVIT Pterygo
                          </a>
                        </li>
                        <li data-img="duravit-slim">
                          <a
                            href="https://bnbimplant.in/uniqueimplant#design5"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DURAVIT Slim
                          </a>
                        </li>
                        <li data-img="duravit-mini">
                          <a
                            href="https://bnbimplant.in/uniqueimplant#design6"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DURAVIT Mini
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="mega-images">
                      <a
                        href="https://bnbimplant.in/uniqueimplant"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mega-showcase-card"
                      >
                        <img
                          src="/assets/imgs/di-1.webp"
                          alt="DURAVIT Implants"
                          loading="lazy"
                        />
                        <span className="showcase-title">
                          DURAVIT EV™ Implant System
                        </span>
                      </a>
                      <a
                        href="https://bnbimplant.in/subperiosteal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mega-showcase-card"
                      >
                        <img
                          src="/assets/imgs/di-2.webp"
                          alt="Subperiosteal Implants"
                          loading="lazy"
                        />
                        <span className="showcase-title">
                          Customized Subperiosteal Solutions
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>

              {/* Prosthetics */}
              <li>
                <a
                  href="https://bnbimplant.in/conexaconnection"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prosthetics
                </a>
              </li>

              {/* Regenerative Products */}
              <li
                className={`has-mega mega-regenerative ${
                  openMega === "regenerative" ? "open" : ""
                }`}
                onClick={(e) => handleMegaClick("regenerative", e)}
              >
                <span>Regenerative Products</span>
                <i className="fa-solid fa-angle-down" aria-hidden="true"></i>

                <div className="mega-menu">
                  <div className="mega-menu-inner">
                    <div className="mega-column">
                      <h4>Biomaterials</h4>
                      <ul>
                        <li>
                          <Link to="/allograft" onClick={closeAllMenus}>
                            Allograft – Rocky Mountain
                          </Link>
                        </li>
                        <li>
                          <Link to="/xenograft" onClick={closeAllMenus}>
                            Xenograft – NovoBone
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/xenograft#collagen"
                            onClick={closeAllMenus}
                          >
                            Collagen Membrane – Equine
                          </Link>
                        </li>
                        <li>
                          <Link to="/tissue" onClick={closeAllMenus}>
                            Tissue Adhesive – Amcrylate
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="mega-images">
                      <Link
                        to="/allograft"
                        onClick={closeAllMenus}
                        className="mega-showcase-card"
                      >
                        <img
                          src="/assets/imgs/g-1.webp"
                          alt="Regenerative product bone graft"
                          loading="lazy"
                        />
                        <span className="showcase-title">
                          Rocky Mountain Allograft (USA)
                        </span>
                      </Link>
                      <Link
                        to="/xenograft"
                        onClick={closeAllMenus}
                        className="mega-showcase-card"
                      >
                        <img
                          src="/assets/imgs/g-2.webp"
                          alt="Regenerative membrane product"
                          loading="lazy"
                        />
                        <span className="showcase-title">
                          NovoBone &amp; T-Barrier Membrane
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>

              {/* Robotic Navigation */}
              <li
                className={`has-mega mega-robotic ${
                  openMega === "robotic" ? "open" : ""
                }`}
                onClick={(e) => handleMegaClick("robotic", e)}
              >
                <span>Robotic Navigation</span>
                <i className="fa-solid fa-angle-down" aria-hidden="true"></i>

                <div className="mega-menu">
                  <div className="mega-menu-inner">
                    <div className="mega-column">
                      <h4>Robotic Systems</h4>
                      <ul>
                        <li>
                          <a
                            href="https://navident.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Navident 3.0 Dynamic Tracking
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://navidentevo.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Navident 4.0 EVO Surgical System
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="mega-images">
                      <a
                        href="https://navident.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mega-showcase-card"
                      >
                        <img
                          src="/assets/navident/navident-3.png"
                          alt="Navident 3.0 Dynamic Navigation system"
                          loading="lazy"
                        />
                        <span className="showcase-title">
                          Navident 3.0 Dynamic Navigation
                        </span>
                      </a>
                      <a
                        href="https://navidentevo.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mega-showcase-card"
                      >
                        <img
                          src="/assets/navident/navident-4-evo.png"
                          alt="Navident 4.0 EVO System"
                          loading="lazy"
                        />
                        <span className="showcase-title">
                          Navident 4.0 EVO System
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>

              {/* Photogrammetry */}
              <li>
                <a
                  href="https://micronmapper.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Photogrammetry
                </a>
              </li>

              {/* Resources */}
              <li
                className={`has-mega mega-resources ${
                  openMega === "resources" ? "open" : ""
                }`}
                onClick={(e) => handleMegaClick("resources", e)}
              >
                <span>Resources</span>
                <i className="fa-solid fa-angle-down" aria-hidden="true"></i>

                <div className="mega-menu">
                  <div className="mega-menu-inner">
                    <div className="mega-column">
                      <h4>Knowledge &amp; Evidence</h4>
                      <ul>
                        <li>
                          <Link to="/events" onClick={closeAllMenus}>
                            Education &amp; Workshops
                          </Link>
                        </li>
                        <li>
                          <Link to="/blog" onClick={closeAllMenus}>
                            Clinical Blogs &amp; Articles
                          </Link>
                        </li>
                        <li>
                          <Link to="/careers" onClick={closeAllMenus}>
                            Careers &amp; Opportunities
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/scientific-evidence"
                            onClick={closeAllMenus}
                          >
                            Scientific Evidence &amp; Papers
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="mega-images">
                      <Link
                        to="/events"
                        onClick={closeAllMenus}
                        className="mega-showcase-card"
                      >
                        <img
                          src="/assets/imgs/di-1.webp"
                          alt="Live Surgical Education"
                          loading="lazy"
                        />
                        <span className="showcase-title">
                          Live Surgical &amp; Prosthetic Workshops
                        </span>
                      </Link>
                      <Link
                        to="/scientific-evidence"
                        onClick={closeAllMenus}
                        className="mega-showcase-card"
                      >
                        <img
                          src="/assets/imgs/di-2.webp"
                          alt="Clinical Evidence"
                          loading="lazy"
                        />
                        <span className="showcase-title">
                          Clinical Research &amp; Studies
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>

              {/* About Us */}
              <li>
                <Link
                  to="/about"
                  className={
                    location.pathname === "/about" ? "nav-link-active" : ""
                  }
                  onClick={closeAllMenus}
                >
                  About Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right: Actions & Utilities */}
          <div className="header-top-utilities">
            {/* Shop Catalog Link */}
            <Link
              to="/products"
              className="top-util-btn"
              title="Shop"
              aria-label="Shop"
              onClick={closeAllMenus}
            >
              <i className="fa-solid fa-store" aria-hidden="true"></i>
            </Link>

            {/* Sign In / Account Link */}
            <Link
              to={user ? "/account" : "/login"}
              className="top-util-btn"
              title={user ? "My Account" : "Account"}
              aria-label={user ? "My Account" : "Account"}
              onClick={closeAllMenus}
            >
              <i className="fa-regular fa-user" aria-hidden="true"></i>
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="top-util-btn top-util-cart"
              aria-label="Shopping Cart"
              title="View Cart"
              onClick={closeAllMenus}
            >
              <div className="cart-icon-wrap">
                <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
                <span className="top-util-badge">{realCartCount}</span>
              </div>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              className="mobile-nav-toggle-btn"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <i
                className={
                  mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"
                }
              ></i>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          INTERACTIVE SEARCH MODAL
          ========================================================================= */}
      {showSearchModal && (
        <div
          className="mb-modal-overlay"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="search-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-modal-header">
              <div className="search-input-wrap">
                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products, implants, biomaterials, navigation, events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-main-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => setSearchQuery("")}
                  >
                    ✕
                  </button>
                )}
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowSearchModal(false)}
                aria-label="Close search"
              >
                ✕
              </button>
            </div>

            <div className="search-modal-body">
              {/* Quick Category Filters */}
              <div className="search-quick-tags">
                <span className="tags-label">Quick Search:</span>
                {[
                  "DURAVIT",
                  "Allograft",
                  "Xenograft",
                  "Navident",
                  "Evidence",
                  "Events",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="search-tag-chip"
                    onClick={() => setSearchQuery(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Results List */}
              <div className="search-results-list">
                {filteredSearch.length === 0 ? (
                  <div className="search-no-results">
                    <p>
                      No results found for "<strong>{searchQuery}</strong>".
                    </p>
                    <span>
                      Try searching for DURAVIT, Allograft, NovoBone, Navident,
                      or Events.
                    </span>
                  </div>
                ) : (
                  filteredSearch.map((item, idx) => (
                    <div
                      key={idx}
                      className="search-result-row"
                      onClick={() => {
                        setShowSearchModal(false);
                        if (item.external) {
                          window.open(
                            item.url,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        } else {
                          navigate(item.url);
                        }
                      }}
                    >
                      <div className="search-result-info">
                        <span className="search-result-title">
                          {item.title}
                        </span>
                        <span className="search-result-badge">
                          {item.category}
                        </span>
                      </div>
                      <i
                        className={
                          item.external
                            ? "fa-solid fa-arrow-up-right-from-square search-arrow"
                            : "fa-solid fa-chevron-right search-arrow"
                        }
                      ></i>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          LOGIN / REGISTER MODAL
          ========================================================================= */}
      {showLoginModal && (
        <div
          className="mb-modal-overlay"
          onClick={() => setShowLoginModal(false)}
        >
          <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowLoginModal(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="login-tabs">
              <button
                type="button"
                className={`login-tab-btn ${loginTab === "login" ? "active" : ""}`}
                onClick={() => setLoginTab("login")}
              >
                Doctor / Clinic Sign In
              </button>
              <button
                type="button"
                className={`login-tab-btn ${loginTab === "register" ? "active" : ""}`}
                onClick={() => setLoginTab("register")}
              >
                New Account
              </button>
            </div>

            {loginTab === "login" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Login successful!");
                  setShowLoginModal(false);
                }}
              >
                <div className="login-form-group">
                  <label>Email Address or Mobile Number</label>
                  <input
                    type="text"
                    placeholder="e.g. doctor@clinic.com"
                    required
                  />
                </div>
                <div className="login-form-group">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••" required />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                    marginBottom: "15px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <input type="checkbox" style={{ width: "auto" }} /> Remember
                    me
                  </label>
                  <a
                    href="#forgot"
                    style={{ color: "#ce2017", textDecoration: "none" }}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(
                        "Password reset link has been sent to your registered email.",
                      );
                    }}
                  >
                    Forgot Password?
                  </a>
                </div>
                <button type="submit" className="btn-login-submit">
                  Sign In
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "Account registration submitted! Our verification team will contact you.",
                  );
                  setShowLoginModal(false);
                }}
              >
                <div className="login-form-group">
                  <label>Full Name / Clinic Name</label>
                  <input type="text" placeholder="Dr. Full Name" required />
                </div>
                <div className="login-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="doctor@example.com"
                    required
                  />
                </div>
                <div className="login-form-group">
                  <label>Mobile Number</label>
                  <input type="tel" placeholder="+91 9876543210" required />
                </div>
                <div className="login-form-group">
                  <label>Dental Registration Number / Speciality</label>
                  <input
                    type="text"
                    placeholder="e.g. Implantologist / Periodontist"
                    required
                  />
                </div>
                <button type="submit" className="btn-login-submit">
                  Create Doctor Account
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          CART DRAWER
          ========================================================================= */}
      {showCartDrawer && (
        <div
          className="mb-modal-overlay"
          onClick={() => setShowCartDrawer(false)}
        >
          <div
            className="cart-drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-drawer-header">
              <h3>
                <i
                  className="fa-solid fa-cart-shopping"
                  style={{ color: "#ce2017" }}
                ></i>
                Your Medical Cart ({totalCartCount})
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowCartDrawer(false)}
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            <div className="cart-items-body">
              {cartItems.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    color: "#888",
                  }}
                >
                  <i
                    className="fa-solid fa-basket-shopping"
                    style={{
                      fontSize: "48px",
                      color: "#ddd",
                      marginBottom: "15px",
                    }}
                  ></i>
                  <h4>Your Cart is Empty</h4>
                  <p style={{ fontSize: "14px", marginTop: "6px" }}>
                    Browse our products and add them to your inquiry cart.
                  </p>
                  <button
                    type="button"
                    className="btn-all-products"
                    style={{ margin: "20px auto 0" }}
                    onClick={() => {
                      setShowCartDrawer(false);
                      setShowProductsModal(true);
                    }}
                  >
                    Browse All Products
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="cart-item-thumb"
                    />
                    <div className="cart-item-info">
                      <div className="cart-item-title">{item.name}</div>
                      <div className="cart-item-category">{item.category}</div>
                      <div className="cart-qty-controls">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQty(item.id, -1)}
                        >
                          -
                        </button>
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            minWidth: "18px",
                            textAlign: "center",
                          }}
                        >
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQty(item.id, 1)}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, -item.qty)}
                          style={{
                            marginLeft: "auto",
                            background: "none",
                            border: "none",
                            color: "#999",
                            cursor: "pointer",
                            fontSize: "13px",
                          }}
                        >
                          <i className="fa-regular fa-trash-can"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-drawer-footer">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                >
                  <span>Total Items:</span>
                  <span style={{ color: "#ce2017" }}>
                    {totalCartCount} Units
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-checkout-cart"
                  onClick={() => {
                    alert(
                      "Order Inquiry Submitted! Our sales specialist will contact you with priority pricing and dispatch details.",
                    );
                    setShowCartDrawer(false);
                  }}
                >
                  Request Official Quotation &amp; Dispatch
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          ALL PRODUCTS MODAL
          ========================================================================= */}
      {showProductsModal && (
        <div
          className="mb-modal-overlay"
          onClick={() => setShowProductsModal(false)}
        >
          <div
            className="all-products-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowProductsModal(false)}
              aria-label="Close products catalog"
            >
              ✕
            </button>

            <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#111" }}>
              Marks Biotech — Complete Medical &amp; Dental Portfolio
            </h2>
            <p style={{ color: "#666", fontSize: "15px", marginTop: "4px" }}>
              Select a category or quick-add medical products directly to your
              inquiry cart.
            </p>

            <div className="all-products-grid">
              {/* Category 1: Dental Implants */}
              <div className="product-category-box">
                <h4>
                  <i className="fa-solid fa-tooth"></i> Dental Implants
                </h4>
                <ul>
                  <li>
                    <a
                      href="https://bnbimplant.in/uniqueimplant#design1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DURAVIT EV (Immediate Load)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bnbimplant.in/uniqueimplant#design2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DURAVIT 3P (Universal)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bnbimplant.in/uniqueimplant#design3"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DURAVIT Wide (Molar Sites)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bnbimplant.in/uniqueimplant#design4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DURAVIT Pterygo (Pterygoid)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bnbimplant.in/uniqueimplant#design5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DURAVIT Slim (Narrow Ridge)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bnbimplant.in/uniqueimplant#design6"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DURAVIT Mini (Overdentures)
                    </a>
                  </li>
                </ul>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    marginTop: "12px",
                    padding: "8px",
                    fontSize: "13px",
                    fontWeight: "bold",
                    background: "#fff",
                    border: "1.5px solid #ce2017",
                    color: "#ce2017",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    addToCart({
                      id: 101,
                      name: "DURAVIT Dental Implant System",
                      category: "Dental Implantology",
                      img: "/assets/imgs/1.webp",
                    })
                  }
                >
                  + Add Implants to Cart
                </button>
              </div>

              {/* Category 2: Regenerative Biomaterials */}
              <div className="product-category-box">
                <h4>
                  <i className="fa-solid fa-dna"></i> Regenerative Products
                </h4>
                <ul>
                  <li>
                    <Link
                      to="/allograft"
                      onClick={() => setShowProductsModal(false)}
                    >
                      Rocky Mountain Allograft (USA)
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/xenograft"
                      onClick={() => setShowProductsModal(false)}
                    >
                      NovoBone Xenograft (Italy)
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/xenograft#collagen"
                      onClick={() => setShowProductsModal(false)}
                    >
                      T-Barrier Collagen Membrane
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tissue"
                      onClick={() => setShowProductsModal(false)}
                    >
                      Amcrylate Tissue Adhesive
                    </Link>
                  </li>
                </ul>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    marginTop: "12px",
                    padding: "8px",
                    fontSize: "13px",
                    fontWeight: "bold",
                    background: "#fff",
                    border: "1.5px solid #ce2017",
                    color: "#ce2017",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    addToCart({
                      id: 102,
                      name: "NovoBone Xenograft 1.0g Vial",
                      category: "Regenerative Products",
                      img: "/assets/imgs/image 102.webp",
                    })
                  }
                >
                  + Add Biomaterial to Cart
                </button>
              </div>

              {/* Category 3: Robotic Navigation & Digital */}
              <div className="product-category-box">
                <h4>
                  <i className="fa-solid fa-robot"></i> Robotic Navigation
                </h4>
                <ul>
                  <li>
                    <a
                      href="https://navident.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Navident 3.0 Dynamic Tracking
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://navidentevo.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Navident 4.0 EVO Surgical System
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://micronmapper.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      MicronMapper Photogrammetry
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bnbimplant.in/digitalsurgicalguide"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Digital Guided Surgery Software
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bnbimplant.in/surgicalkit"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      B&amp;B Guided Surgical Kits
                    </a>
                  </li>
                </ul>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    marginTop: "12px",
                    padding: "8px",
                    fontSize: "13px",
                    fontWeight: "bold",
                    background: "#fff",
                    border: "1.5px solid #ce2017",
                    color: "#ce2017",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    addToCart({
                      id: 103,
                      name: "Navident Dynamic Surgical Kit",
                      category: "Robotic Navigation",
                      img: "/assets/imgs/navident-1.webp",
                    })
                  }
                >
                  + Add Navigation Kit to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
