import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../api";

const CartContext = createContext(null);
const STORAGE_KEY = "marksbiotech_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      return stored.map((i) => ({ variantId: null, ...i }));
    } catch {
      return [];
    }
  });

  const [calculation, setCalculation] = useState({
    items: [],
    appliedOffers: [],
    eligibleOffers: [],
    recommendations: [],
    subtotal: 0,
    discountTotal: 0,
    tax: 0,
    total: 0,
  });
  const [calcLoading, setCalcLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Authoritative server-side offer calculation
  const recalculateCart = useCallback(async (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      setCalculation({
        items: [],
        appliedOffers: [],
        eligibleOffers: [],
        recommendations: [],
        subtotal: 0,
        discountTotal: 0,
        tax: 0,
        total: 0,
      });
      return;
    }

    setCalcLoading(true);
    try {
      const res = await api.post("/offers/calculate-cart", {
        items: cartItems.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          quantity: i.quantity,
          price: i.price,
        })),
      });
      setCalculation(res);
    } catch (err) {
      console.warn("Offer calculation fallback:", err);
      const fallbackSub = cartItems.reduce((s, i) => s + (Number(i.price) || 0) * i.quantity, 0);
      const fallbackTax = Math.round(fallbackSub * 0.18 * 100) / 100;
      setCalculation({
        items: [],
        appliedOffers: [],
        eligibleOffers: [],
        recommendations: [],
        subtotal: fallbackSub,
        discountTotal: 0,
        tax: fallbackTax,
        total: Math.round((fallbackSub + fallbackTax) * 100) / 100,
      });
    } finally {
      setCalcLoading(false);
    }
  }, []);

  useEffect(() => {
    recalculateCart(items);
  }, [items, recalculateCart]);

  function addToCart(product, quantity = 1, variant = null) {
    const variantId = variant?.id ?? null;
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === product.id && i.variantId === variantId
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id && i.variantId === variantId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          variantId,
          name: variant ? `${product.name} — ${variant.label || variant.value}` : product.name,
          sku: variant ? variant.sku : product.sku,
          price: Number(variant ? variant.price : product.price) || 0,
          image: product.images?.[0] || product.image_url || "",
          quantity,
        },
      ];
    });
  }

  function addRecommendationToCart(rec) {
    const item = {
      id: rec.productId,
      name: rec.name,
      sku: rec.sku,
      price: rec.originalPrice,
      images: rec.imageUrl ? [rec.imageUrl] : [],
    };
    const variant = rec.variantId
      ? {
          id: rec.variantId,
          label: rec.variantValue,
          price: rec.originalPrice,
        }
      : null;
    addToCart(item, 1, variant);
  }

  function updateQuantity(productId, variantId, quantity) {
    if (quantity <= 0) return removeFromCart(productId, variantId);
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variantId === variantId
          ? { ...i, quantity }
          : i
      )
    );
  }

  function removeFromCart(productId, variantId = null) {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.variantId === variantId)
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const rawSubtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const subtotal = calculation.subtotal || rawSubtotal;
  const discountTotal = calculation.discountTotal || 0;
  const tax = calculation.tax || Math.round((subtotal - discountTotal) * 0.18 * 100) / 100;
  const total = calculation.total || Math.round((subtotal - discountTotal + tax) * 100) / 100;

  async function checkout(shippingAddress) {
    const order = await api.post("/orders", {
      items: items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
      })),
      shippingAddress,
    });
    clearCart();
    return order;
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        addRecommendationToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        discountTotal,
        tax,
        total,
        appliedOffers: calculation.appliedOffers || [],
        eligibleOffers: calculation.eligibleOffers || [],
        recommendations: calculation.recommendations || [],
        calculatedItems: calculation.items || [],
        calcLoading,
        checkout,
        recalculateCart: () => recalculateCart(items),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
