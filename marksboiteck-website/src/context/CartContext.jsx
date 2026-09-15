import { createContext, useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addToCart(product, quantity = 1, variant = null) {
    const variantId = variant?.id ?? null;
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id && i.variantId === variantId);
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
          name: variant ? `${product.name} — ${variant.label}` : product.name,
          sku: variant ? variant.sku : product.sku,
          price: Number(variant ? variant.price : product.price) || 0,
          image: product.images?.[0] || "",
          quantity,
        },
      ];
    });
  }

  function updateQuantity(productId, variantId, quantity) {
    if (quantity <= 0) return removeFromCart(productId, variantId);
    setItems((prev) =>
      prev.map((i) => (i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i))
    );
  }

  function removeFromCart(productId, variantId = null) {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)));
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  async function checkout(shippingAddress) {
    const order = await api.post("/orders", {
      items: items.map((i) => ({ productId: i.productId, variantId: i.variantId, quantity: i.quantity })),
      shippingAddress,
    });
    clearCart();
    return order;
  }

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, subtotal, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
