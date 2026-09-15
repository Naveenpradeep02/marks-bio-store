import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  DashboardIcon,
  ProductsIcon,
  CategoriesIcon,
  BrandsIcon,
  InventoryIcon,
  OrdersIcon,
  InvoicesIcon,
  CustomersIcon,
  LogoutIcon,
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  AnalyticsIcon,
  MarketingIcon,
} from "./Icons";

const links = [
  { to: "/", label: "Dashboard", end: true, icon: DashboardIcon },
  {
    to: "/analytics/products",
    label: "Product Performance",
    icon: AnalyticsIcon,
  },
  {
    to: "/analytics/marketing",
    label: "Marketing Intelligence",
    icon: MarketingIcon,
  },
  { to: "/products", label: "Products", icon: ProductsIcon },
  { to: "/categories", label: "Categories", icon: CategoriesIcon },
  { to: "/brands", label: "Brands", icon: BrandsIcon },
  { to: "/inventory", label: "Inventory", icon: InventoryIcon },
  { to: "/orders", label: "Orders", icon: OrdersIcon },
  { to: "/invoices", label: "Invoices & Billing", icon: InvoicesIcon },
  { to: "/customers", label: "Customers", icon: CustomersIcon },
];

function initialsOf(email) {
  if (!email) return "A";
  const name = email.split("@")[0];
  return name.slice(0, 2).toUpperCase();
}

export default function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const currentLabel =
    links.find((l) =>
      l.end ? location.pathname === l.to : location.pathname.startsWith(l.to),
    )?.label || "Dashboard";

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="admin-shell">
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-brand">
          <span className="admin-brand-mark">MB</span>
          <span className="admin-brand-text">MarksBiotech</span>
          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon width={18} height={18} />
          </button>
        </div>
        <nav>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink key={link.to} to={link.to} end={link.end}>
                <Icon width={18} height={18} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="admin-sidebar-footer">
          <button className="sidebar-logout" onClick={logout}>
            <LogoutIcon width={18} height={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="topbar-menu-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
            <h2 className="topbar-title">{currentLabel}</h2>
          </div>

          <div className="admin-topbar-right" ref={menuRef}>
            <button
              className="user-menu-trigger"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="user-avatar">{initialsOf(user?.email)}</span>
              <span className="user-email">{user?.email}</span>
              <ChevronDownIcon width={16} height={16} />
            </button>
            {menuOpen && (
              <div className="user-menu-dropdown">
                <div className="user-menu-info">
                  <span className="user-avatar">{initialsOf(user?.email)}</span>
                  <div>
                    <div className="user-menu-name">Admin</div>
                    <div className="user-menu-email">{user?.email}</div>
                  </div>
                </div>
                <button className="user-menu-logout" onClick={logout}>
                  <LogoutIcon width={16} height={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
