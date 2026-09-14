import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "sprintix_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const persist = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  };

  const addToCart = (product, qty = 1) => {
    const existing = items.find((it) => it.id === product.id);
    let next;
    if (existing) {
      next = items.map((it) =>
        it.id === product.id ? { ...it, qty: it.qty + qty } : it
      );
    } else {
      next = [
        ...items,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    }
    persist(next);
  };

  const removeFromCart = (id) => {
    persist(items.filter((it) => it.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    persist(items.map((it) => (it.id === id ? { ...it, qty } : it)));
  };

  const clearCart = () => {
    persist([]);
  };

  const totalItems = useMemo(
    () => items.reduce((sum, it) => sum + it.qty, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, it) => sum + it.qty * it.price, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
