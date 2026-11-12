import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../api";

const STEPS = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Customer & Limits" },
  { id: 3, label: "Product Targets" },
  { id: 4, label: "Discount Configuration" },
  { id: 5, label: "Storefront Display" },
  { id: 6, label: "Review & Publish" },
];

export default function OfferForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Catalog data for selection
  const [availableProducts, setAvailableProducts] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    internalCode: "",
    description: "",
    offerType: "bulk_quantity",
    status: "active",
    campaignImage: "",
    startDate: "",
    endDate: "",
    priority: 0,
    isStackable: false,
    usageLimit: "",
    minCartValue: "",
    maxDiscount: "",
    storefrontBadge: "",
    displayMessage: "",
    customerTypes: ["retail", "wholesale"],
    products: [],
    conditions: [],
    rewards: [
      {
        rewardType: "percentage_discount",
        discountValue: 10,
        maxDiscountAmount: "",
      },
    ],
    slabs: [
      {
        minQuantity: 5,
        maxQuantity: 9,
        discountType: "percentage",
        discountValue: 10,
        customerType: "all",
      },
      {
        minQuantity: 10,
        maxQuantity: "",
        discountType: "percentage",
        discountValue: 15,
        customerType: "all",
      },
    ],
    recommendations: [],
  });

  // Load catalog options
  useEffect(() => {
    Promise.all([
      api.get("/products"),
      api.get("/categories"),
      api.get("/brands"),
    ])
      .then(([prods, cats, brands]) => {
        setAvailableProducts(prods || []);
        setAvailableCategories(cats || []);
        setAvailableBrands(brands || []);
      })
      .catch((err) => console.error("Error loading catalog:", err));
  }, []);

  // Load existing offer if in edit mode
  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    api
      .get(`/offers/${id}`)
      .then((data) => {
        setFormData({
          title: data.title || "",
          internalCode: data.internal_code || "",
          description: data.description || "",
          offerType: data.offer_type || "bulk_quantity",
          status: data.status || "active",
          campaignImage: data.campaign_image || "",
          startDate: data.start_date ? data.start_date.slice(0, 10) : "",
          endDate: data.end_date ? data.end_date.slice(0, 10) : "",
          priority: data.priority || 0,
          isStackable: Boolean(data.is_stackable),
          usageLimit: data.usage_limit || "",
          minCartValue: data.min_cart_value || "",
          maxDiscount: data.max_discount || "",
          storefrontBadge: data.storefront_badge || "",
          displayMessage: data.display_message || "",
          customerTypes:
            data.customerTypes && data.customerTypes.length > 0
              ? data.customerTypes
              : ["retail", "wholesale"],
          products: (data.products || []).map((p) => ({
            productId: p.product_id,
            variantId: p.variant_id,
            role: p.role,
            minQuantity: p.min_quantity,
            exactQuantity: p.exact_quantity,
          })),
          conditions: data.conditions || [],
          rewards:
            data.rewards?.length > 0
              ? data.rewards.map((r) => ({
                  rewardType: r.reward_type,
                  discountValue: r.discount_value,
                  maxDiscountAmount: r.max_discount_amount || "",
                }))
              : [
                  {
                    rewardType: "percentage_discount",
                    discountValue: 10,
                    maxDiscountAmount: "",
                  },
                ],
          slabs:
            data.slabs?.length > 0
              ? data.slabs.map((s) => ({
                  productId: s.product_id,
                  variantId: s.variant_id,
                  minQuantity: s.min_quantity,
                  maxQuantity: s.max_quantity || "",
                  discountType: s.discount_type,
                  discountValue: s.discount_value,
                  customerType: s.customer_type || "all",
                }))
              : [],
          recommendations:
            data.recommendations?.length > 0
              ? data.recommendations.map((r) => ({
                  triggerProductId: r.trigger_product_id,
                  triggerVariantId: r.trigger_variant_id || null,
                  recommendedProductId: r.recommended_product_id,
                  recommendedVariantId: r.recommended_variant_id || null,
                  minTriggerQuantity: r.min_trigger_quantity || 1,
                  discountType: r.discount_type || "percentage",
                  discountValue: r.discount_value || 0,
                  priority: r.priority || 0,
                  displayMessage: r.display_message || "",
                  isActive: Boolean(r.is_active),
                }))
              : [],
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  function handleChange(field, val) {
    setFormData((prev) => ({ ...prev, [field]: val }));
  }

  function handleCustomerTypeToggle(type) {
    setFormData((prev) => {
      const exists = prev.customerTypes.includes(type);
      const updated = exists
        ? prev.customerTypes.filter((t) => t !== type)
        : [...prev.customerTypes, type];
      return { ...prev, customerTypes: updated.length ? updated : ["retail"] };
    });
  }

  // Slabs Management
  function addSlab() {
    setFormData((prev) => ({
      ...prev,
      slabs: [
        ...prev.slabs,
        {
          minQuantity: 10,
          maxQuantity: "",
          discountType: "percentage",
          discountValue: 10,
          customerType: "all",
        },
      ],
    }));
  }

  function updateSlab(index, key, val) {
    setFormData((prev) => {
      const next = [...prev.slabs];
      next[index] = { ...next[index], [key]: val };
      return { ...prev, slabs: next };
    });
  }

  function removeSlab(index) {
    setFormData((prev) => ({
      ...prev,
      slabs: prev.slabs.filter((_, i) => i !== index),
    }));
  }

  // Cross-sell Recommendations Management
  function addRecommendation() {
    if (availableProducts.length === 0) return;
    setFormData((prev) => ({
      ...prev,
      recommendations: [
        ...prev.recommendations,
        {
          triggerProductId: availableProducts[0]?.id || "",
          triggerVariantId: null,
          recommendedProductId: availableProducts[1]?.id || availableProducts[0]?.id || "",
          recommendedVariantId: null,
          minTriggerQuantity: 1,
          discountType: "percentage",
          discountValue: 10,
          priority: 0,
          displayMessage: "Frequently Bought Together — Save 10%",
          isActive: true,
        },
      ],
    }));
  }

  function updateRecommendation(index, key, val) {
    setFormData((prev) => {
      const next = [...prev.recommendations];
      next[index] = { ...next[index], [key]: val };
      return { ...prev, recommendations: next };
    });
  }

  function removeRecommendation(index) {
    setFormData((prev) => ({
      ...prev,
      recommendations: prev.recommendations.filter((_, i) => i !== index),
    }));
  }

  // Product Selection Management
  function addSelectedProduct(val, role = "condition", minQty = 1) {
    if (!val) return;
    const [pIdStr, vIdStr] = val.split("|");
    const productId = Number(pIdStr);
    const variantId = !vIdStr || vIdStr === "all" ? null : Number(vIdStr);

    if (
      formData.products.some(
        (p) => p.productId === productId && p.variantId === variantId
      )
    ) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          productId,
          variantId,
          role,
          minQuantity: minQty,
          exactQuantity: null,
        },
      ],
    }));
  }

  function removeSelectedProduct(idx) {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== idx),
    }));
  }

  async function handleSubmit(saveStatus = formData.status) {
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...formData,
        status: saveStatus,
      };

      if (isEdit) {
        await api.put(`/offers/${id}`, payload);
      } else {
        await api.post("/offers", payload);
      }
      navigate("/offers");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  if (loading) {
    return <div style={{ padding: "3rem", textAlign: "center" }}>Loading offer details...</div>;
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", paddingBottom: "4rem" }}>
      {/* Top Header */}
      <div className="page-header-row" style={{ alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <Link to="/offers" style={{ textDecoration: "none", color: "var(--muted)", fontSize: "0.85rem" }}>
            ← Back to Offers
          </Link>
          <h1 style={{ margin: "0.25rem 0 0 0", fontSize: "1.6rem", fontWeight: 700 }}>
            {isEdit ? "Edit Offer Campaign" : "Create New Offer Campaign"}
          </h1>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            type="button"
            onClick={() => handleSubmit("draft")}
            disabled={saving}
            style={{
              padding: "0.6rem 1rem",
              background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(formData.status || "active")}
            disabled={saving}
            style={{
              padding: "0.6rem 1.25rem",
              background: "var(--brand)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {saving ? "Saving..." : isEdit ? "Update Offer" : "Publish Offer"}
          </button>
        </div>
      </div>

      {error && <div className="error-banner" style={{ marginBottom: "1.5rem" }}>{error}</div>}

      {/* Step Progress Tracker */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border)",
          background: "#fff",
          borderRadius: "10px 10px 0 0",
          overflowX: "auto",
        }}
      >
        {STEPS.map((s) => {
          const isActive = currentStep === s.id;
          const isDone = currentStep > s.id;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentStep(s.id)}
              style={{
                flex: 1,
                padding: "1rem 0.5rem",
                border: "none",
                background: "transparent",
                borderBottom: isActive ? "3px solid var(--brand)" : "3px solid transparent",
                cursor: "pointer",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "var(--brand)" : isDone ? "var(--ink)" : "var(--muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                whiteSpace: "nowrap",
                fontSize: "0.85rem",
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: isActive ? "var(--brand)" : isDone ? "#10b981" : "#e2e8f0",
                  color: isActive || isDone ? "#fff" : "var(--muted)",
                  fontSize: "0.75rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {isDone ? "✓" : s.id}
              </span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Step Container */}
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "0 0 10px 10px",
          border: "1px solid var(--border)",
          borderTop: "none",
        }}
      >
        {/* ============================================================ */}
        {/* STEP 1: BASIC INFORMATION */}
        {/* ============================================================ */}
        {currentStep === 1 && (
          <div>
            <h2 style={{ fontSize: "1.2rem", margin: "0 0 1.25rem 0" }}>Step 1: Campaign Details</h2>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                  Offer Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bulk Dental Implants Slabs / Implant Starter Kit"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                  Internal Offer Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. IMPLANT-BULK-2026"
                  value={formData.internalCode}
                  onChange={(e) => handleChange("internalCode", e.target.value)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
                />
              </div>
            </div>

            <div style={{ marginTop: "1.25rem" }}>
              <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                Offer Type *
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
                {[
                  { id: "bulk_quantity", title: "Bulk Quantity", desc: "Quantity pricing slabs with % or ₹ discounts" },
                  { id: "mix_match", title: "Mix & Match", desc: "Buy X of A + Y of B to unlock combined reward" },
                  { id: "combo_bundle", title: "Combo / Bundle", desc: "Predefined product kit with fixed combo price" },
                  { id: "cross_sell", title: "Bought Together", desc: "Flipkart-style 1-click add recommendation" },
                  { id: "cart_value", title: "Cart Value Tier", desc: "Discounts based on total cart checkout value" },
                ].map((type) => {
                  const isSel = formData.offerType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => handleChange("offerType", type.id)}
                      style={{
                        padding: "1rem",
                        borderRadius: "8px",
                        border: isSel ? "2px solid var(--brand)" : "1px solid var(--border)",
                        background: isSel ? "#fef2f2" : "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: "0.95rem", color: isSel ? "var(--brand)" : "var(--ink)" }}>
                        {type.title}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                        {type.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: "1.25rem" }}>
              <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Internal notes or customer explanation of promotion..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
                >
                  <option value="active">Active (Live)</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="draft">Draft (Inactive)</option>
                  <option value="inactive">Disabled</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: CUSTOMER SEGMENTS & LIMITS */}
        {/* ============================================================ */}
        {currentStep === 2 && (
          <div>
            <h2 style={{ fontSize: "1.2rem", margin: "0 0 1.25rem 0" }}>Step 2: Customer Targeting & Stacking</h2>

            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                Eligible Customer Segments *
              </label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.25rem",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    background: formData.customerTypes.includes("retail") ? "#fef2f2" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.customerTypes.includes("retail")}
                    onChange={() => handleCustomerTypeToggle("retail")}
                  />
                  <div>
                    <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Retail Customers</span>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Individual practitioners & clinics</div>
                  </div>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.25rem",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    background: formData.customerTypes.includes("wholesale") ? "#fef2f2" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.customerTypes.includes("wholesale")}
                    onChange={() => handleCustomerTypeToggle("wholesale")}
                  />
                  <div>
                    <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Wholesale / Bulk Buyers</span>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Distributors & hospital networks</div>
                  </div>
                </label>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                  Display & Evaluation Priority (0 to 100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
                />
                <small style={{ color: "var(--muted)" }}>Higher priority offers are evaluated first.</small>
              </div>

              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                  Total Campaign Usage Limit (Optional)
                </label>
                <input
                  type="number"
                  placeholder="Unlimited if empty"
                  value={formData.usageLimit}
                  onChange={(e) => handleChange("usageLimit", e.target.value)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
                />
                <small style={{ color: "var(--muted)" }}>Maximum redemptions across all customers.</small>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.isStackable}
                  onChange={(e) => handleChange("isStackable", e.target.checked)}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Allow Stacking with Other Promotions</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                    If enabled, this offer can be combined with other eligible offers in the cart. If disabled, this offer runs exclusively.
                  </div>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: PRODUCT TARGETS */}
        {/* ============================================================ */}
        {currentStep === 3 && (
          <div>
            <h2 style={{ fontSize: "1.2rem", margin: "0 0 1.25rem 0" }}>Step 3: Select Target Products & Variants</h2>

            <div style={{ marginBottom: "1rem", display: "flex", gap: "0.75rem" }}>
              <select
                id="product-picker"
                style={{
                  flex: 1,
                  padding: "0.65rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  fontSize: "0.9rem",
                }}
              >
                <option value="">-- Select a product or variant to add to this offer --</option>
                {availableProducts.map((p) => {
                  const hasVariants = p.variants && p.variants.length > 0;
                  if (!hasVariants) {
                    return (
                      <option key={`p-${p.id}`} value={`${p.id}|all`}>
                        {p.name} (SKU: {p.sku || "N/A"}) — ₹{Number(p.price).toLocaleString("en-IN")}
                      </option>
                    );
                  }
                  return (
                    <optgroup key={`p-${p.id}`} label={`${p.name} (${p.variants.length} Variants)`}>
                      <option value={`${p.id}|all`}>
                        ✦ Entire Product: {p.name} (All Variants)
                      </option>
                      {p.variants.map((v) => (
                        <option key={`v-${v.id}`} value={`${p.id}|${v.id}`}>
                          &nbsp;&nbsp;&nbsp;&nbsp;↳ Variant: {v.value || v.name} (SKU: {v.sku || p.sku}) — ₹{Number(v.price).toLocaleString("en-IN")}
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>
              <button
                type="button"
                onClick={() => {
                  const sel = document.getElementById("product-picker");
                  if (sel?.value) {
                    addSelectedProduct(
                      sel.value,
                      formData.offerType === "combo_bundle" ? "bundle_item" : "condition"
                    );
                  }
                }}
                style={{
                  padding: "0.65rem 1.25rem",
                  background: "#1f2937",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                + Add Product / Variant
              </button>
            </div>

            {formData.products.length === 0 ? (
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px dashed var(--border)",
                }}
              >
                <p style={{ margin: 0, color: "var(--muted)" }}>
                  {formData.offerType === "cart_value"
                    ? "Cart Value tier offers apply to the entire cart by default (no specific product restriction required)."
                    : "No products added yet. Select a product or specific variant above to attach conditions or slabs."}
                </p>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left", borderBottom: "1px solid var(--border)" }}>
                    <th style={{ padding: "0.75rem" }}>Product & Variant Scope</th>
                    <th style={{ padding: "0.75rem" }}>Role</th>
                    <th style={{ padding: "0.75rem" }}>Required Qty</th>
                    <th style={{ padding: "0.75rem", textAlign: "right" }}>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.products.map((p, idx) => {
                    const prodInfo = availableProducts.find((x) => x.id === p.productId);
                    const variantInfo = p.variantId
                      ? prodInfo?.variants?.find((v) => v.id === p.variantId)
                      : null;
                    return (
                      <tr key={idx} style={{ borderBottom: "1px solid var(--border-light)" }}>
                        <td style={{ padding: "0.75rem", fontWeight: 600 }}>
                          {prodInfo?.name || `Product #${p.productId}`}
                          <div style={{ fontSize: "0.75rem", marginTop: "3px" }}>
                            {p.variantId ? (
                              <span
                                style={{
                                  background: "#fef3c7",
                                  color: "#92400e",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  fontWeight: 600,
                                }}
                              >
                                Specific Variant: {variantInfo?.value || variantInfo?.name || variantInfo?.sku || `Variant #${p.variantId}`} (₹{Number(variantInfo?.price || prodInfo?.price || 0).toLocaleString("en-IN")})
                              </span>
                            ) : (
                              <span style={{ color: "var(--muted)" }}>
                                Applies to: Entire Product (All Variants)
                              </span>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: "0.75rem" }}>
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              padding: "2px 8px",
                              borderRadius: "4px",
                              background: "#e0f2fe",
                              color: "#0369a1",
                            }}
                          >
                            {p.role}
                          </span>
                        </td>
                        <td style={{ padding: "0.75rem" }}>
                          <input
                            type="number"
                            min="1"
                            value={p.minQuantity || 1}
                            onChange={(e) => {
                              const val = Math.max(1, Number(e.target.value) || 1);
                              setFormData((prev) => {
                                const next = [...prev.products];
                                next[idx] = { ...next[idx], minQuantity: val };
                                return { ...prev, products: next };
                              });
                            }}
                            style={{ width: 80, padding: "0.4rem", borderRadius: "4px", border: "1px solid var(--border)" }}
                          />
                        </td>
                        <td style={{ padding: "0.75rem", textAlign: "right" }}>
                          <button
                            type="button"
                            onClick={() => removeSelectedProduct(idx)}
                            style={{
                              border: "none",
                              background: "transparent",
                              color: "var(--brand)",
                              cursor: "pointer",
                              fontWeight: 600,
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 4: DISCOUNT CONFIGURATION */}
        {/* ============================================================ */}
        {currentStep === 4 && (
          <div>
            <h2 style={{ fontSize: "1.2rem", margin: "0 0 1.25rem 0" }}>
              Step 4: Configure Discount Rules ({formData.offerType.replace("_", " ").toUpperCase()})
            </h2>

            {/* A. BULK QUANTITY SLABS */}
            {formData.offerType === "bulk_quantity" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted)" }}>
                    Define tiered volume pricing slabs. The engine automatically unlocks each slab as cart quantity increases.
                  </p>
                  <button
                    type="button"
                    onClick={addSlab}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#1f2937",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    + Add Quantity Slab
                  </button>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", textAlign: "left", borderBottom: "1px solid var(--border)" }}>
                      <th style={{ padding: "0.75rem" }}>Min Units</th>
                      <th style={{ padding: "0.75rem" }}>Max Units (Blank = ∞)</th>
                      <th style={{ padding: "0.75rem" }}>Discount Type</th>
                      <th style={{ padding: "0.75rem" }}>Value</th>
                      <th style={{ padding: "0.75rem" }}>Customer Scope</th>
                      <th style={{ padding: "0.75rem", textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.slabs.map((slab, sIdx) => (
                      <tr key={sIdx} style={{ borderBottom: "1px solid var(--border-light)" }}>
                        <td style={{ padding: "0.75rem" }}>
                          <input
                            type="number"
                            min="1"
                            value={slab.minQuantity}
                            onChange={(e) => updateSlab(sIdx, "minQuantity", Number(e.target.value))}
                            style={{ width: 80, padding: "0.45rem", borderRadius: "4px", border: "1px solid var(--border)" }}
                          />
                        </td>
                        <td style={{ padding: "0.75rem" }}>
                          <input
                            type="number"
                            min="1"
                            placeholder="Unlimited"
                            value={slab.maxQuantity}
                            onChange={(e) =>
                              updateSlab(
                                sIdx,
                                "maxQuantity",
                                e.target.value ? Number(e.target.value) : ""
                              )
                            }
                            style={{ width: 100, padding: "0.45rem", borderRadius: "4px", border: "1px solid var(--border)" }}
                          />
                        </td>
                        <td style={{ padding: "0.75rem" }}>
                          <select
                            value={slab.discountType}
                            onChange={(e) => updateSlab(sIdx, "discountType", e.target.value)}
                            style={{ padding: "0.45rem", borderRadius: "4px", border: "1px solid var(--border)" }}
                          >
                            <option value="percentage">% Percentage Off</option>
                            <option value="fixed_amount">₹ Flat Discount per Unit</option>
                            <option value="special_unit_price">₹ Special Fixed Unit Price</option>
                          </select>
                        </td>
                        <td style={{ padding: "0.75rem" }}>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={slab.discountValue}
                            onChange={(e) => updateSlab(sIdx, "discountValue", Number(e.target.value))}
                            style={{ width: 100, padding: "0.45rem", borderRadius: "4px", border: "1px solid var(--border)" }}
                          />
                        </td>
                        <td style={{ padding: "0.75rem" }}>
                          <select
                            value={slab.customerType}
                            onChange={(e) => updateSlab(sIdx, "customerType", e.target.value)}
                            style={{ padding: "0.45rem", borderRadius: "4px", border: "1px solid var(--border)" }}
                          >
                            <option value="all">All Customers</option>
                            <option value="retail">Retail Only</option>
                            <option value="wholesale">Wholesale Only</option>
                          </select>
                        </td>
                        <td style={{ padding: "0.75rem", textAlign: "right" }}>
                          <button
                            type="button"
                            onClick={() => removeSlab(sIdx)}
                            style={{ border: "none", background: "transparent", color: "var(--brand)", cursor: "pointer" }}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* B. MIX & MATCH / C. COMBO BUNDLE */}
            {(formData.offerType === "mix_match" || formData.offerType === "combo_bundle") && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                    Reward / Pricing Type
                  </label>
                  <select
                    value={formData.rewards[0]?.rewardType || "percentage_discount"}
                    onChange={(e) => {
                      const next = [...formData.rewards];
                      next[0] = { ...next[0], rewardType: e.target.value };
                      setFormData((prev) => ({ ...prev, rewards: next }));
                    }}
                    style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
                  >
                    <option value="percentage_discount">Percentage Discount (%)</option>
                    <option value="fixed_amount_discount">Fixed Amount Discount (₹)</option>
                    {formData.offerType === "combo_bundle" && (
                      <option value="fixed_bundle_price">Fixed Bundle Price (₹ All-inclusive)</option>
                    )}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                    Discount / Price Value
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.rewards[0]?.discountValue || 0}
                    onChange={(e) => {
                      const next = [...formData.rewards];
                      next[0] = { ...next[0], discountValue: Number(e.target.value) };
                      setFormData((prev) => ({ ...prev, rewards: next }));
                    }}
                    style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
                  />
                </div>
              </div>
            )}

            {/* D. CROSS-SELL / FREQUENTLY BOUGHT TOGETHER */}
            {formData.offerType === "cross_sell" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted)" }}>
                    Configure trigger products and paired cross-sell items with special discounted pricing.
                  </p>
                  <button
                    type="button"
                    onClick={addRecommendation}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#1f2937",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    + Add Cross-Sell Pair
                  </button>
                </div>

                {formData.recommendations.length === 0 ? (
                  <p style={{ color: "var(--muted)", textAlign: "center", padding: "2rem", background: "#f8fafc" }}>
                    No cross-sell pairs added yet. Click "+ Add Cross-Sell Pair" to link products.
                  </p>
                ) : (
                  formData.recommendations.map((rec, rIdx) => (
                    <div
                      key={rIdx}
                      style={{
                        padding: "1.25rem",
                        borderRadius: "8px",
                        border: "1px solid var(--border)",
                        marginBottom: "1rem",
                        background: "#fafafa",
                      }}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div>
                          <label style={{ display: "block", fontWeight: 600, fontSize: "0.8rem", marginBottom: "0.25rem" }}>
                            Trigger Product (Must be in Cart)
                          </label>
                          <select
                            value={`${rec.triggerProductId}|${rec.triggerVariantId || "all"}`}
                            onChange={(e) => {
                              const [pId, vId] = e.target.value.split("|");
                              updateRecommendation(rIdx, "triggerProductId", Number(pId));
                              updateRecommendation(rIdx, "triggerVariantId", vId === "all" ? null : Number(vId));
                            }}
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--border)" }}
                          >
                            {availableProducts.map((p) => {
                              const hasVariants = p.variants && p.variants.length > 0;
                              if (!hasVariants) {
                                return (
                                  <option key={`tp-${p.id}`} value={`${p.id}|all`}>
                                    {p.name}
                                  </option>
                                );
                              }
                              return (
                                <optgroup key={`tp-${p.id}`} label={p.name}>
                                  <option value={`${p.id}|all`}>Entire Product: {p.name}</option>
                                  {p.variants.map((v) => (
                                    <option key={`tv-${v.id}`} value={`${p.id}|${v.id}`}>
                                      &nbsp;&nbsp;↳ Variant: {v.value || v.name}
                                    </option>
                                  ))}
                                </optgroup>
                              );
                            })}
                          </select>
                        </div>

                        <div>
                          <label style={{ display: "block", fontWeight: 600, fontSize: "0.8rem", marginBottom: "0.25rem" }}>
                            Recommended Cross-Sell Product
                          </label>
                          <select
                            value={`${rec.recommendedProductId}|${rec.recommendedVariantId || "all"}`}
                            onChange={(e) => {
                              const [pId, vId] = e.target.value.split("|");
                              updateRecommendation(rIdx, "recommendedProductId", Number(pId));
                              updateRecommendation(rIdx, "recommendedVariantId", vId === "all" ? null : Number(vId));
                            }}
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--border)" }}
                          >
                            {availableProducts.map((p) => {
                              const hasVariants = p.variants && p.variants.length > 0;
                              if (!hasVariants) {
                                return (
                                  <option key={`rp-${p.id}`} value={`${p.id}|all`}>
                                    {p.name}
                                  </option>
                                );
                              }
                              return (
                                <optgroup key={`rp-${p.id}`} label={p.name}>
                                  <option value={`${p.id}|all`}>Entire Product: {p.name}</option>
                                  {p.variants.map((v) => (
                                    <option key={`rv-${v.id}`} value={`${p.id}|${v.id}`}>
                                      &nbsp;&nbsp;↳ Variant: {v.value || v.name}
                                    </option>
                                  ))}
                                </optgroup>
                              );
                            })}
                          </select>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "1rem", marginTop: "0.75rem", alignItems: "flex-end" }}>
                        <div>
                          <label style={{ display: "block", fontWeight: 600, fontSize: "0.8rem", marginBottom: "0.25rem" }}>
                            Min Trigger Qty
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={rec.minTriggerQuantity}
                            onChange={(e) => updateRecommendation(rIdx, "minTriggerQuantity", Number(e.target.value))}
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--border)" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontWeight: 600, fontSize: "0.8rem", marginBottom: "0.25rem" }}>
                            Discount Type
                          </label>
                          <select
                            value={rec.discountType}
                            onChange={(e) => updateRecommendation(rIdx, "discountType", e.target.value)}
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--border)" }}
                          >
                            <option value="percentage">% Percentage Off</option>
                            <option value="fixed_amount">₹ Flat Discount</option>
                            <option value="special_price">₹ Special Add-on Price</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: "block", fontWeight: 600, fontSize: "0.8rem", marginBottom: "0.25rem" }}>
                            Discount / Price Value
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={rec.discountValue}
                            onChange={(e) => updateRecommendation(rIdx, "discountValue", Number(e.target.value))}
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--border)" }}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removeRecommendation(rIdx)}
                          style={{
                            padding: "0.5rem 0.75rem",
                            background: "#fee2e2",
                            color: "var(--brand)",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* E. CART VALUE TIERS */}
            {formData.offerType === "cart_value" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                    Minimum Cart Value (₹) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 10000"
                    value={formData.minCartValue}
                    onChange={(e) => handleChange("minCartValue", e.target.value)}
                    style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                    Discount Percentage (%) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.rewards[0]?.discountValue || 0}
                    onChange={(e) => {
                      const next = [...formData.rewards];
                      next[0] = { ...next[0], discountValue: Number(e.target.value) };
                      setFormData((prev) => ({ ...prev, rewards: next }));
                    }}
                    style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                    Maximum Discount Cap (₹ Optional)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Unlimited if empty"
                    value={formData.maxDiscount}
                    onChange={(e) => handleChange("maxDiscount", e.target.value)}
                    style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 5: STOREFRONT DISPLAY */}
        {/* ============================================================ */}
        {currentStep === 5 && (
          <div>
            <h2 style={{ fontSize: "1.2rem", margin: "0 0 1.25rem 0" }}>Step 5: Storefront Display & Messaging</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                  Storefront Badge Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. BUY 5 GET 10% OFF / SURGICAL COMBO"
                  value={formData.storefrontBadge}
                  onChange={(e) => handleChange("storefrontBadge", e.target.value)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
                />
                <small style={{ color: "var(--muted)" }}>Renders in red banner badges on listing cards and product pages.</small>
              </div>

              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                  Promotional Banner Image URL (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. /uploads/campaigns/dental-combo.jpg"
                  value={formData.campaignImage}
                  onChange={(e) => handleChange("campaignImage", e.target.value)}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
                />
              </div>
            </div>

            <div style={{ marginTop: "1.25rem" }}>
              <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                Customer Display Message / Upsell Pitch
              </label>
              <input
                type="text"
                placeholder="e.g. Unlock extra 15% discount when you purchase 10+ dental units!"
                value={formData.displayMessage}
                onChange={(e) => handleChange("displayMessage", e.target.value)}
                style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid var(--border)" }}
              />
              <small style={{ color: "var(--muted)" }}>
                Shown prominently in product detail pages and cart upsell progress bars.
              </small>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 6: REVIEW & PUBLISH */}
        {/* ============================================================ */}
        {currentStep === 6 && (
          <div>
            <h2 style={{ fontSize: "1.2rem", margin: "0 0 1.25rem 0" }}>Step 6: Review & Live Storefront Preview</h2>

            {/* Simulation Preview Card */}
            <div
              style={{
                border: "2px dashed var(--brand)",
                borderRadius: "12px",
                padding: "1.5rem",
                background: "#fdf8f8",
                marginBottom: "2rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  {formData.storefrontBadge && (
                    <span
                      style={{
                        background: "var(--brand)",
                        color: "#fff",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {formData.storefrontBadge}
                    </span>
                  )}
                  <h3 style={{ margin: "0.5rem 0 0.25rem 0", fontSize: "1.3rem" }}>{formData.title || "Untitled Offer"}</h3>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.85rem" }}>
                    {formData.displayMessage || "Special promotion applied automatically at checkout."}
                  </p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      background: "#e0e7ff",
                      color: "#4338ca",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {formData.offerType.replace("_", " ").toUpperCase()}
                  </span>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                    Audience: {formData.customerTypes.join(", ")}
                  </div>
                </div>
              </div>

              {/* Slabs or Rewards preview */}
              {formData.offerType === "bulk_quantity" && formData.slabs.length > 0 && (
                <div style={{ marginTop: "1rem", background: "#fff", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
                  <div style={{ fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Quantity Pricing Slabs:</div>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {formData.slabs.map((s, idx) => (
                      <div key={idx} style={{ padding: "0.5rem 0.75rem", background: "#f8fafc", borderRadius: "6px", fontSize: "0.8rem" }}>
                        <strong>{s.minQuantity}{s.maxQuantity ? `–${s.maxQuantity}` : "+"} units:</strong>{" "}
                        <span style={{ color: "#059669", fontWeight: 700 }}>
                          {s.discountType === "percentage" ? `${s.discountValue}% OFF` : `₹${s.discountValue} Pricing`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Validation Checklist */}
            <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "8px" }}>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>Audit Checklist:</div>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.85rem", color: "var(--ink)" }}>
                <li>Authoritative server-side evaluation enabled</li>
                <li>Customer segment validated against authenticated database profile</li>
                <li>Stacking rule: {formData.isStackable ? "Stackable" : "Exclusive"}</li>
                <li>Priority ranking: {formData.priority}</li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            style={{
              padding: "0.6rem 1.2rem",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: "#fff",
              cursor: currentStep === 1 ? "not-allowed" : "pointer",
              color: currentStep === 1 ? "var(--muted)" : "var(--ink)",
              fontWeight: 500,
            }}
          >
            ← Previous Step
          </button>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(6, prev + 1))}
              style={{
                padding: "0.6rem 1.25rem",
                borderRadius: "6px",
                border: "none",
                background: "#1f2937",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Continue to Step {currentStep + 1} →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSubmit("active")}
              disabled={saving}
              style={{
                padding: "0.6rem 1.5rem",
                borderRadius: "6px",
                border: "none",
                background: "var(--brand)",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {saving ? "Publishing..." : "Publish Campaign Live 🚀"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
