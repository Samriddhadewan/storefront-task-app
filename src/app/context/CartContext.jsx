"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    }
  }, []);

  // Sync cartItems state to localStorage on changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Total quantity derived from state
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Add to cart or increase qty
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity + qty,
        };
        return updated;
      } else {
        return [...prev, { ...product, quantity: qty }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity of a product
  const updateQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  // Clear cart
  const clearAll = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, totalQuantity, addToCart, removeFromCart, updateQty, clearAll }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
