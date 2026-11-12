import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingWidgets from "./components/FloatingWidgets";
import SideSectionNav from "./components/SideSectionNav";
import WebsitePopup from "./components/WebsitePopup";
import SeoManager from "./components/SeoManager";
import { trackPageView } from "./utils/analytics";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Careers from "./pages/Careers";
import ScientificEvidence from "./pages/ScientificEvidence";
import Allograft from "./pages/Allograft";
import Xenograft from "./pages/Xenograft";
import Tissue from "./pages/Tissue";
import AllProducts from "./pages/AllProducts";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Store from "./pages/Store";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Styles
import "./styles/nav.css";
import "./styles/style.css";
import "./styles/responsive-global.css";
import "./styles/login.css";

// Component to handle dynamic body classes matching exact HTML files
function RouteWatcher() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const path = location.pathname.toLowerCase();
    trackPageView(location.pathname + location.search);

    // Reset body attributes
    document.body.id = "";
    document.body.className = "";

    if (path === "/" || path === "/index.html") {
      document.body.id = "home";
    } else if (path.includes("/about")) {
      document.body.className = "about-page";
    } else if (path === "/events" || path === "/events.html") {
      document.body.className = "events-list-page";
    } else if (path.includes("/events/") || path.includes("/event")) {
      document.body.className = "events-enhanced-page";
    } else if (path.includes("/blog")) {
      document.body.className = "blog-page";
    } else if (path.includes("/careers")) {
      document.body.className = "careers-page";
    } else if (path.includes("/scientific-evidence")) {
      document.body.className = "scientific-page";
    } else if (path.includes("/allograft")) {
      document.body.className = "allograft-page";
    } else if (path.includes("/xenograft")) {
      document.body.className = "xenograft-page";
    } else if (path.includes("/tissue")) {
      document.body.className = "tissue-page";
    } else if (
      path.includes("/product") ||
      path.includes("/cart") ||
      path.includes("/account") ||
      path.includes("/store")
    ) {
      document.body.className = "all-products-page";
    } else if (
      path.includes("/login") ||
      path.includes("/signin") ||
      path.includes("/signup") ||
      path.includes("/register") ||
      path.includes("/forgot")
    ) {
      document.body.className = "login-page";
    }
  }, [location.pathname]);

  return null;
}

// Main App Layout Wrapper
function AppContent() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const isAuthPage =
    path.includes("/login") ||
    path.includes("/signin") ||
    path.includes("/signup") ||
    path.includes("/register") ||
    path.includes("/forgot");

  return (
    <div className="app-container">
      {/* Persistent Responsive Header - Hidden on Standalone Auth/Login Pages */}
      {!isAuthPage && <Header />}

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/about.html" element={<About />} />

        <Route path="/events" element={<Events />} />
        <Route path="/events.html" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/event:id.html" element={<EventDetail />} />
        <Route path="/event-5.html" element={<EventDetail />} />
        <Route path="/event5.html" element={<EventDetail />} />
        <Route path="/event-7.html" element={<EventDetail />} />
        <Route path="/event7.html" element={<EventDetail />} />
        <Route path="/event-8.html" element={<EventDetail />} />
        <Route path="/event8.html" element={<EventDetail />} />
        <Route path="/event-9.html" element={<EventDetail />} />
        <Route path="/event9.html" element={<EventDetail />} />
        <Route path="/event-10.html" element={<EventDetail />} />
        <Route path="/event10.html" element={<EventDetail />} />
        <Route path="/event-11.html" element={<EventDetail />} />
        <Route path="/event11.html" element={<EventDetail />} />
        <Route path="/event-12.html" element={<EventDetail />} />
        <Route path="/event12.html" element={<EventDetail />} />
        <Route path="/event-14.html" element={<EventDetail />} />
        <Route path="/event14.html" element={<EventDetail />} />
        <Route path="/event-15.html" element={<EventDetail />} />
        <Route path="/event15.html" element={<EventDetail />} />
        <Route path="/event-21.html" element={<EventDetail />} />
        <Route path="/event21.html" element={<EventDetail />} />
        <Route path="/event-24.html" element={<EventDetail />} />
        <Route path="/event24.html" element={<EventDetail />} />
        <Route path="/event-25.html" element={<EventDetail />} />
        <Route path="/event25.html" element={<EventDetail />} />
        <Route path="/event-26.html" element={<EventDetail />} />
        <Route path="/event26.html" element={<EventDetail />} />
        <Route path="/event-27.html" element={<EventDetail />} />
        <Route path="/event27.html" element={<EventDetail />} />
        <Route path="/event-33.html" element={<EventDetail />} />
        <Route path="/event33.html" element={<EventDetail />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog.html" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/blog-1.html" element={<BlogPost />} />
        <Route path="/blog-2.html" element={<BlogPost />} />
        <Route path="/blog-3.html" element={<BlogPost />} />
        <Route path="/blog-4.html" element={<BlogPost />} />
        <Route path="/blog-5.html" element={<BlogPost />} />
        <Route path="/blog-6.html" element={<BlogPost />} />
        <Route path="/blog-7.html" element={<BlogPost />} />
        <Route path="/blog-8.html" element={<BlogPost />} />
        <Route path="/blog-9.html" element={<BlogPost />} />
        <Route path="/blog-10.html" element={<BlogPost />} />
        <Route path="/blog-11.html" element={<BlogPost />} />
        <Route path="/blog-12.html" element={<BlogPost />} />
        <Route path="/blog-13.html" element={<BlogPost />} />
        <Route path="/blog-14.html" element={<BlogPost />} />
        <Route
          path="/blog/photogrammetry-full-arch-dental-implants-passivity"
          element={<BlogPost />}
        />
        <Route
          path="/blog/passive-fit-implant-prosthesis-digital-technology"
          element={<BlogPost />}
        />
        <Route
          path="/blog/radiographic-markers-guided-implant-surgery"
          element={<BlogPost />}
        />
        <Route
          path="/blog/compactors-expanders-dental-implant-surgery"
          element={<BlogPost />}
        />
        <Route
          path="/blog/emergence-profile-dental-implant-peek-abutments"
          element={<BlogPost />}
        />
        <Route
          path="/blog/guided-endodontics-dynamic-navigation-systems"
          element={<BlogPost />}
        />
        <Route
          path="/blog/tooth-bone-segmentation-ai-dentistry"
          element={<BlogPost />}
        />
        <Route
          path="/blog/evaluating-3d-implant-placement-digital-dentistry-software"
          element={<BlogPost />}
        />
        <Route
          path="/blog/auto-merging-cbct-data-soft-tissue-digital-dentistry"
          element={<BlogPost />}
        />
        <Route
          path="/blog/tmj-pain-management-arthrocentesis-navigation-procedure"
          element={<BlogPost />}
        />
        <Route
          path="/blog/tissue-adhesives-in-dentistry"
          element={<BlogPost />}
        />
        <Route
          path="/blog/tissue-mapper-eliminate-ios-scans-full-arch-case-day-of-surgery"
          element={<BlogPost />}
        />

        <Route path="/careers" element={<Careers />} />
        <Route path="/careers.html" element={<Careers />} />

        <Route path="/scientific-evidence" element={<ScientificEvidence />} />
        <Route
          path="/scientific-evidence.html"
          element={<ScientificEvidence />}
        />

        <Route path="/allograft" element={<Allograft />} />
        <Route path="/allograft.html" element={<Allograft />} />

        <Route path="/xenograft" element={<Xenograft />} />
        <Route path="/xenograft.html" element={<Xenograft />} />

        <Route path="/tissue" element={<Tissue />} />
        <Route path="/tissue.html" element={<Tissue />} />

        {/* Dedicated Catalog and Standalone Clinician Portal */}
        <Route path="/products" element={<AllProducts />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/all-products/:slug" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/forgot-password" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/store" element={<AllProducts />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Universal Floating Side Section Navigator (Scrollspy) */}
      {!isAuthPage && <SideSectionNav />}

      {/* Persistent Floating Widgets & Modals - Hidden on Auth */}
      {!isAuthPage && <FloatingWidgets />}

      {/* Persistent Responsive Footer - Hidden on Auth */}
      {!isAuthPage && <Footer />}

      {/* Dynamic Popups (Event & Product) */}
      <WebsitePopup />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <SeoManager />
          <RouteWatcher />
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
