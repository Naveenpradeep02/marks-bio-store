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

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog.html" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/blog-1.html" element={<BlogPost />} />
        <Route path="/blog-2.html" element={<BlogPost />} />

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
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <RouteWatcher />
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
