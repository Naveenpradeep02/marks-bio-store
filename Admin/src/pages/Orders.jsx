import { useEffect, useState } from "react";
import { api } from "../api";

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  function load() {
    api
      .get("/orders")
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function updateStatus(id, status) {
    setError("");
    try {
      await api.patch(`/orders/${id}/status`, { status });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function generateInvoice(orderId) {
    setError("");
    setMessage("");
    try {
      const invoice = await api.post("/invoices", { orderId });
      setMessage(
        invoice.alreadyExisted
          ? `Invoice already exists: ${invoice.invoiceNumber}`
          : `Invoice generated: ${invoice.invoiceNumber}`
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1>Orders</h1>
      {error && <div className="error-banner">{error}</div>}
      {message && <div className="success-banner">{message}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Placed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>
                  <strong>#{o.orderNumber}</strong>
                  {o.appliedOffers?.length > 0 && (
                    <div style={{ marginTop: "2px" }}>
                      {o.appliedOffers.map((ao, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            background: "#ecfdf5",
                            color: "#059669",
                            padding: "1px 6px",
                            borderRadius: "4px",
                            display: "inline-block",
                            marginRight: "4px",
                          }}
                        >
                          🏷️ {ao.badge || ao.title}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td>{o.customerEmail}</td>
                <td>{o.items.length} items</td>
                <td>
                  <div>
                    <strong>₹{Number(o.total).toLocaleString("en-IN")}</strong>
                  </div>
                  {Number(o.discountTotal) > 0 && (
                    <div style={{ fontSize: "11px", color: "#059669", fontWeight: 600 }}>
                      Saved ₹{Number(o.discountTotal).toLocaleString("en-IN")}
                    </div>
                  )}
                </td>
                <td>
                  <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                <td>
                  <button onClick={() => generateInvoice(o.id)}>Invoice</button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7}>No orders yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
