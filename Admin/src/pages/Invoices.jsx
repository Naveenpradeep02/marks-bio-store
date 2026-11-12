import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { api } from "../api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function load() {
    api
      .get("/invoices")
      .then(setInvoices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function updateStatus(id, status) {
    setError("");
    try {
      await api.patch(`/invoices/${id}/status`, { status });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function openPdf(id) {
    setError("");
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(`${BASE_URL}/invoices/${id}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Could not load invoice PDF");
      const blob = await res.blob();
      window.open(URL.createObjectURL(blob), "_blank");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1>Invoices &amp; Billing</h1>
      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Issued</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.invoiceNumber}</td>
                <td>{inv.customerName || inv.customerEmail}</td>
                <td>
                  <strong>₹{Number(inv.total).toLocaleString("en-IN")}</strong>
                  {Number(inv.discountTotal) > 0 && (
                    <div style={{ fontSize: "11px", color: "#059669", fontWeight: 600 }}>
                      Savings: ₹{Number(inv.discountTotal).toLocaleString("en-IN")}
                    </div>
                  )}
                </td>
                <td>
                  <select value={inv.status} onChange={(e) => updateStatus(inv.id, e.target.value)}>
                    <option value="unpaid">unpaid</option>
                    <option value="paid">paid</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </td>
                <td>{new Date(inv.issuedAt).toLocaleDateString("en-IN")}</td>
                <td>
                  <button onClick={() => openPdf(inv.id)}>View PDF</button>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan={6}>No invoices yet. Generate one from the Orders page.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
