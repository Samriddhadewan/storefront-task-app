"use client";

import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";

export default function ClientProvider({ children }) {
  return (
    <CartProvider>
      <Navbar />
      {children}
    </CartProvider>
  );
}
