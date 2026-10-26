import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(undefined);

const STORAGE_KEY = "sprintix_cart";

function isCartItem(item) {
  const validId =
    (typeof item?.id === "number" && Number.isSafeInteger(item.id) && item.id > 0) ||
    (typeof item?.id === "string" && item.id.trim().length > 0);

  return (
    item !== null &&
    typeof item === "object" &&
    validId &&
    typeof item.title === "string" &&
    item.title.trim().length > 0 &&
    Number.isFinite(item.price) &&
    item.price >= 0 &&
    typeof item.image === "string" &&
    item.image.length > 0 &&
    Number.isSafeInteger(item.qty) &&
    item.qty > 0
  );
}

function loadItems() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch (error) {
    console.error("Unable to restore the saved shopping bag.", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadItems);

  const persist = (nextItems) => {
    setItems(nextItems);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
    } catch (error) {
      console.error("Unable to save the shopping bag in local storage.", error);
    }
  };

  const addToCart = (product, qty = 1) => {
    const cartItem = product && {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty,
    };
    if (!isCartItem(cartItem)) {
      throw new TypeError("A valid product and positive whole-number quantity are required.");
    }
    const existing = items.find((it) => it.id === product.id);
    const nextQty = (existing?.qty ?? 0) + qty;
    if (!Number.isSafeInteger(nextQty)) {
      throw new RangeError("The requested quantity is too large.");
    }
    let next;
    if (existing) {
      next = items.map((it) =>
        it.id === product.id ? { ...it, qty: it.qty + qty } : it
      );
    } else {
      next = [
        ...items,
        cartItem,
      ];
    }
    persist(next);
  };

  const removeFromCart = (id) => {
    persist(items.filter((it) => it.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    if (!Number.isSafeInteger(qty)) {
      throw new TypeError("Cart quantity must be a positive whole number.");
    }
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
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }
  return context;
}
