import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import {
  ProductsIcon,
  BrandsIcon,
  CustomersIcon,
  OrdersIcon,
  AlertIcon,
  InvoicesIcon,
  InventoryIcon,
  ArrowRightIcon,
} from "../components/Icons";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const STATUS_CLASS = {
  pending: "badge-amber",
  confirmed: "badge-blue",
  shipped: "badge-blue",
  delivered: "badge-green",
  cancelled: "badge-red",
};

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.get("/products"),
      api.get("/brands"),
      api.get("/customers"),
      api.get("/orders"),
      api.get("/invoices"),
    ])
      .then(([products, brands, customers, orders, invoices]) => {
        setData({ products, brands, customers, orders, invoices });
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="error-banner">{error}</div>;
  if (!data) {
    return (
      <div>
        <div className="dash-skeleton-header" />
        <div className="stat-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="stat-card skeleton" />
          ))}
        </div>
      </div>
    );
  }

  const { products, brands, customers, orders, invoices } = data;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const unpaidInvoices = invoices.filter((i) => i.status === "unpaid").length;
  const lowStockProducts = products.filter((p) => Number(p.stock) <= 5);
  const revenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);

  const cards = [
    {
      label: "Total Revenue",
      value: `₹${revenue.toLocaleString("en-IN")}`,
      to: "/orders",
      icon: OrdersIcon,
      tone: "green",
    },
    {
      label: "Products",
      value: products.length,
      to: "/products",
      icon: ProductsIcon,
      tone: "blue",
    },
    {
      label: "Total Orders",
      value: orders.length,
      sub: pendingOrders ? `${pendingOrders} pending` : "All caught up",
      to: "/orders",
      icon: InventoryIcon,
      tone: "violet",
    },
    {
      label: "Customers",
      value: customers.length,
      to: "/customers",
      icon: CustomersIcon,
      tone: "amber",
    },
  ];

  const alertCards = [
    {
      label: "Low Stock Items",
      value: lowStockProducts.length,
      to: "/inventory",
      icon: AlertIcon,
      tone: "red",
    },
    {
      label: "Unpaid Invoices",
      value: unpaidInvoices,
      to: "/invoices",
      icon: InvoicesIcon,
      tone: "amber",
    },
    {
      label: "Brands",
      value: brands.length,
      to: "/brands",
      icon: BrandsIcon,
      tone: "blue",
    },
  ];

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className="dash">
      <div className="dash-header">
        <div>
          <h1 className="dash-greeting">
            {greeting()}
            {user?.email ? `, ${user.email.split("@")[0]}` : ""}
          </h1>
          <p className="dash-subtitle">Here's what's happening with your store today.</p>
        </div>
      </div>

      <div className="stat-grid">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.label} to={c.to} className="stat-card">
              <div className={`stat-icon tone-${c.tone}`}>
                <Icon width={20} height={20} />
              </div>
              <div className="stat-body">
                <div className="stat-value">{c.value}</div>
                <div className="stat-label">{c.label}</div>
                {c.sub && <div className="stat-sub">{c.sub}</div>}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="dash-split">
        <div className="dash-panel">
          <div className="dash-panel-header">
            <h2>Recent Orders</h2>
            <Link to="/orders" className="dash-panel-link">
              View all <ArrowRightIcon width={14} height={14} />
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="dash-empty">No orders yet.</p>
          ) : (
            <table className="data-table dash-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Placed</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td>#{o.orderNumber}</td>
                    <td>{o.customerEmail}</td>
                    <td>₹{o.total}</td>
                    <td>
                      <span className={`status-badge ${STATUS_CLASS[o.status] || "badge-blue"}`}>
                        {o.status}
                      </span>
                    </td>
                    <td>{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="dash-side">
          <div className="dash-panel">
            <div className="dash-panel-header">
              <h2>Alerts</h2>
            </div>
            <div className="alert-list">
              {alertCards.map((c) => {
                const Icon = c.icon;
                return (
                  <Link key={c.label} to={c.to} className="alert-row">
                    <span className={`alert-icon tone-${c.tone}`}>
                      <Icon width={16} height={16} />
                    </span>
                    <span className="alert-label">{c.label}</span>
                    <span className="alert-value">{c.value}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {lowStockProducts.length > 0 && (
            <div className="dash-panel">
              <div className="dash-panel-header">
                <h2>Low Stock Products</h2>
                <Link to="/inventory" className="dash-panel-link">
                  Manage <ArrowRightIcon width={14} height={14} />
                </Link>
              </div>
              <ul className="low-stock-list">
                {lowStockProducts.slice(0, 5).map((p) => (
                  <li key={p.id}>
                    <span>{p.name}</span>
                    <span className="low-stock">{p.stock} left</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
