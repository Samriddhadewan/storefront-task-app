"use client";

import React from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, updateQty, removeFromCart } = useCart();

  const handleQuantityChange = (id, quantity) => {
    const newQuantity = parseInt(quantity);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      updateQty(id, newQuantity);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 mb-2 rounded"
          >
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p>Price: ${item.price}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                className="w-16 border p-1 rounded"
              />
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
