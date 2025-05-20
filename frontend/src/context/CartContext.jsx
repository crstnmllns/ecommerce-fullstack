import { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = product => {
    setItems(prev => {
      const exists = prev.find(i => i._id === product._id);
      if (exists) {
        return prev.map(i =>
          i._id === product._id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = id => {
    setItems(prev => prev.filter(i => i._id !== id));
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
}