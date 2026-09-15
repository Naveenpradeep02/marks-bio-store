import { Fragment, useEffect, useState } from "react";
import { api } from "../api";
import { CategoriesIcon, ArrowRightIcon } from "../components/Icons";

const emptyForm = { name: "", description: "", parentId: "" };

export default function Categories() {
  const [tree, setTree] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [type, setType] = useState("main"); // "main" | "sub"
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  function load() {
    api
      .get("/categories?tree=true")
      .then(setTree)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  function resetForm() {
    setForm(emptyForm);
    setType("main");
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (type === "sub" && !form.parentId) {
      setError("Please choose a parent category for this subcategory.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        parentId: type === "sub" && form.parentId ? Number(form.parentId) : null,
      };
      if (editingId) {
        await api.put(`/categories/${editingId}`, payload);
        setMessage("Category updated.");
      } else {
        await api.post("/categories", payload);
        setMessage(type === "sub" ? "Subcategory added." : "Category added.");
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function startEdit(category) {
    setEditingId(category.id);
    setType(category.parentId ? "sub" : "main");
    setForm({
      name: category.name,
      description: category.description || "",
      parentId: category.parentId ? String(category.parentId) : "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startAddSub(parent) {
    setEditingId(null);
    setType("sub");
    setForm({ name: "", description: "", parentId: String(parent.id) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this category?")) return;
    setError("");
    try {
      await api.delete(`/categories/${id}`);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="page-header-row">
        <h1>Categories</h1>
      </div>
      {error && <div className="error-banner">{error}</div>}
      {message && <div className="success-banner">{message}</div>}

      <div className="card-form">
        <form onSubmit={handleSubmit}>
          <div className="form-section-title">
            {editingId ? "Edit Category" : "Add a New Category"}
          </div>

          {/* Clear, explicit choice: is this a top-level category or a subcategory? */}
          <div className="mode-switch">
            <button
              type="button"
              className={`mode-switch-btn ${type === "main" ? "active" : ""}`}
              onClick={() => setType("main")}
            >
              <span className="mode-switch-title">Main Category</span>
              <span className="mode-switch-desc">A top-level category, e.g. "Dental Implants".</span>
            </button>
            <button
              type="button"
              className={`mode-switch-btn ${type === "sub" ? "active" : ""}`}
              onClick={() => setType("sub")}
              disabled={tree.length === 0}
            >
              <span className="mode-switch-title">Subcategory</span>
              <span className="mode-switch-desc">
                {tree.length === 0
                  ? "Add a main category first."
                  : "Nested under an existing main category."}
              </span>
            </button>
          </div>

          <div className="form-grid">
            <div className="field">
              <label>Category name</label>
              <input
                placeholder="e.g. Allograft"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label>
                Description <span className="field-optional">(optional)</span>
              </label>
              <input
                placeholder="Short description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            {type === "sub" && (
              <div className="field">
                <label>Parent category</label>
                <select
                  value={form.parentId}
                  onChange={(e) => setForm({ ...form, parentId: e.target.value })}
                  required
                >
                  <option value="">Choose a main category…</option>
                  {tree.map((main) => (
                    <option key={main.id} value={main.id}>
                      {main.name}
                    </option>
                  ))}
                </select>
                <span className="field-hint">This category will be nested inside the one you pick.</span>
              </div>
            )}
          </div>

          <div className="form-footer" style={{ marginTop: "0.9rem", paddingTop: "0.9rem" }}>
            <button type="submit" className="submit-btn" disabled={saving}>
              {saving
                ? "Saving..."
                : editingId
                ? "Update Category"
                : type === "sub"
                ? "Add Subcategory"
                : "Add Main Category"}
            </button>
            {(editingId || type === "sub" || form.name) && (
              <button type="button" className="secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {loading ? (
        <p className="page-loading">Loading categories...</p>
      ) : tree.length === 0 ? (
        <p className="dash-empty">No categories yet. Add your first main category above.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tree.map((main) => (
              <Fragment key={main.id}>
                <tr className="category-row-main">
                  <td>
                    <span className="category-name-cell">
                      <CategoriesIcon width={16} height={16} />
                      <strong>{main.name}</strong>
                      {main.subcategories.length > 0 && (
                        <span className="status-badge badge-blue">
                          {main.subcategories.length} sub{main.subcategories.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </span>
                  </td>
                  <td>{main.description}</td>
                  <td className="row-actions">
                    <button className="secondary" onClick={() => startAddSub(main)}>
                      + Subcategory
                    </button>
                    <button onClick={() => startEdit(main)}>Edit</button>
                    <button className="danger" onClick={() => handleDelete(main.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
                {main.subcategories.map((sub) => (
                  <tr key={sub.id} className="category-row-sub">
                    <td>
                      <span className="category-name-cell sub">
                        <ArrowRightIcon width={13} height={13} className="tree-connector" />
                        {sub.name}
                        <span className="status-badge badge-green">Sub</span>
                      </span>
                    </td>
                    <td>{sub.description}</td>
                    <td className="row-actions">
                      <button onClick={() => startEdit(sub)}>Edit</button>
                      <button className="danger" onClick={() => handleDelete(sub.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
