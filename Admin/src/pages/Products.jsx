import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

const API_ORIGIN = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "");

export default function Products() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  function load() {
    setLoading(true);
    Promise.all([api.get("/products"), api.get("/brands")])
      .then(([p, b]) => {
        setProducts(p);
        setBrands(b);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;
    setError("");
    try {
      await api.delete(`/products/${id}`);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  const brandName = (id) => brands.find((b) => b.id === id)?.name || "-";
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header-row">
        <h1>Products</h1>
        <Link to="/products/new" className="primary-link-btn">
          + Add Product
        </Link>
      </div>
      {error && <div className="error-banner">{error}</div>}

      <input
        className="search-box"
        placeholder="Search by name or SKU..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Slug</th>
              <th>Brand</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.images?.[0] && (
                    <img
                      src={`${API_ORIGIN}${p.images[0]}`}
                      alt={p.name}
                      style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 4 }}
                    />
                  )}
                </td>
                <td>{p.name}</td>
                <td>
                  {p.mainCategoryName ? `${p.mainCategoryName} / ${p.categoryName || ""}` : p.categoryName || "-"}
                </td>
                <td>{p.slug}</td>
                <td>{brandName(p.brandId)}</td>
                <td>{p.sku}</td>
                <td>₹{p.price}</td>
                <td className={Number(p.stock) <= 5 ? "low-stock" : ""}>{p.stock}</td>
                <td>{p.status}</td>
                <td className="row-actions">
                  <Link to={`/products/${p.id}/edit`}>Edit</Link>
                  <button className="danger" onClick={() => handleDelete(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10}>No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
