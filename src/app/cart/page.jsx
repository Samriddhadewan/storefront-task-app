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

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border border-gray-300 p-4 mb-2 rounded"
            >
              {/* Image */}
              <div className="w-20 h-20 mr-4 flex-shrink-0">
                <img
                  src={item?.images?.[0]}
                  alt={item?.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="font-semibold text-sm sm:text-lg">{item.title}</h2>
                <p className="text-sm sm:text-lg">Price: ${item.price}</p>
                <p className="text-sm sm:text-lg">Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>

              {/* Qty & Remove */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="w-16 border p-1 rounded"
                />
                <button onClick={() => handleRemove(item.id)}>
                  <img
                    src="/images/bin_icon.png"
                    className="w-6 min-w-6"
                    alt="Remove Icon"
                  />
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold">
              Total Cart Value: ${totalPrice.toFixed(2)}
            </h2>
          </div>
        </>
      )}
    </div>
  );
}
