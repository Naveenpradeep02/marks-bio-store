import { useEffect, useState } from "react";
import { api, uploadFile } from "../api";

const API_ORIGIN = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "");

const emptyForm = { name: "", logoUrl: "", description: "" };

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  function load() {
    api
      .get("/brands")
      .then(setBrands)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleLogoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const result = await uploadFile("/uploads/brand-logo", file);
      setForm((f) => ({ ...f, logoUrl: result.path }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await api.put(`/brands/${editingId}`, form);
      } else {
        await api.post("/brands", form);
      }
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(brand) {
    setEditingId(brand.id);
    setForm({ name: brand.name, logoUrl: brand.logoUrl || "", description: brand.description || "" });
  }

  function resolveLogoSrc(url) {
    if (!url) return "";
    return url.startsWith("/") ? `${API_ORIGIN}${url}` : url;
  }

  async function handleDelete(id) {
    if (!confirm("Delete this brand?")) return;
    setError("");
    try {
      await api.delete(`/brands/${id}`);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1>Brands</h1>
      {error && <div className="error-banner">{error}</div>}

      <form className="inline-form" onSubmit={handleSubmit}>
        <input
          placeholder="Brand name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Logo URL (or upload below)"
          value={form.logoUrl}
          onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className="brand-logo-upload">
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleLogoChange} />
          {uploading && <span className="field-hint">Uploading...</span>}
          {form.logoUrl && (
            <img src={resolveLogoSrc(form.logoUrl)} alt="Logo preview" className="brand-logo-preview" />
          )}
        </div>
        <button type="submit">{editingId ? "Update Brand" : "Add Brand"}</button>
        {editingId && (
          <button
            type="button"
            className="secondary"
            onClick={() => {
              setEditingId(null);
              setForm(emptyForm);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.id}>
                <td>
                  {b.logoUrl && (
                    <img
                      src={resolveLogoSrc(b.logoUrl)}
                      alt={b.name}
                      style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 4 }}
                    />
                  )}
                </td>
                <td>{b.name}</td>
                <td>{b.description}</td>
                <td className="row-actions">
                  <button onClick={() => startEdit(b)}>Edit</button>
                  <button className="danger" onClick={() => handleDelete(b.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr>
                <td colSpan={4}>No brands yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
