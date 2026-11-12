import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useCart } from "../context/CartContext";

const API_ORIGIN = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "");

export default function Store() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const { addToCart, items } = useCart();
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    Promise.all([api.get("/products"), api.get("/brands")])
      .then(([p, b]) => {
        setProducts(p.filter((item) => item.status !== "inactive"));
        setBrands(b);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = brandFilter ? products.filter((p) => p.brandId === brandFilter) : products;
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  function handleAdd(product) {
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0 }}>Shop</h1>
        <Link to="/cart">Cart ({cartCount})</Link>
      </div>

      <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} style={{ marginBottom: "1.5rem", padding: "0.5rem" }}>
        <option value="">All brands</option>
        {brands.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      {error && <p style={{ color: "#b3261e" }}>{error}</p>}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {filtered.map((p) => (
            <div key={p.id} style={{ border: "1px solid #eee", borderRadius: 10, overflow: "hidden" }}>
              {p.images?.[0] && (
                <img
                  src={`${API_ORIGIN}${p.images[0]}`}
                  alt={p.name}
                  style={{ width: "100%", height: 160, objectFit: "cover" }}
                />
              )}
              <div style={{ padding: "1rem" }}>
                <h3 style={{ margin: "0 0 0.4rem", fontSize: "1rem" }}>{p.name}</h3>
                <p style={{ margin: "0 0 0.6rem", fontWeight: 700 }}>₹{p.price}</p>
                <button onClick={() => handleAdd(p)}>
                  {addedId === p.id ? "Added!" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p>No products available yet.</p>}
        </div>
      )}
    </div>
  );
}
