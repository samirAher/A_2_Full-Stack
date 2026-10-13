import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const add = (product) =>
    setItems((prev) => {
      const found = prev.find((i) => i._id === product._id);
      if (found) return prev.map((i) => (i._id === product._id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { _id: product._id, name: product.name, price: product.price, icon: product.icon, qty: 1 }];
    });

  const setQty = (id, qty) =>
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i._id !== id) : prev.map((i) => (i._id === id ? { ...i, qty } : i))
    );

  const remove = (id) => setItems((prev) => prev.filter((i) => i._id !== id));
  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);

  return (
    <CartContext.Provider value={{ items, add, setQty, remove, clear, count, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
