"use client";

import { CartProvider } from "@/lib/cart/CartContext";
import CartDrawer from "./cart/CartDrawer";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
