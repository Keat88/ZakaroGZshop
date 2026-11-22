import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "zharpro-cart";

const readCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((i) => i && i.id != null) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    const id = product?.id ?? product?.product_id;
    if (id == null) return;
    const quantity = Math.max(1, Number(qty) || 1);
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => i.id === id ? { ...i, quantity: Math.min(99, i.quantity + quantity) } : i);
      }
      return [...prev, {
        id,
        name: product.name || product.title || "Product",
        price: Number(product.price) || 0,
        image: product.image || product.img || "",
        brand: product.brand || product.category || "",
        quantity: Math.min(99, quantity),
      }];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateQuantity = (id, qty) => {
    const quantity = Math.max(1, Math.min(99, Number(qty) || 1));
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };
  const clearCart = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  const value = useMemo(() => ({ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }), [items, totalItems, subtotal]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
