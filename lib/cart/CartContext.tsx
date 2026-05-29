"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  material?: string;
  acabamento?: string;
  quantity: number;
}

interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
}

export const COUPONS: Record<string, Coupon> = {
  TENTECH10: { code: "TENTECH10", type: "percent", value: 10 },
  "3D20": { code: "3D20", type: "percent", value: 20 },
  FRETE10: { code: "FRETE10", type: "fixed", value: 10 },
};

export const SHIPPING_THRESHOLD = 200;
export const SHIPPING_COST = 19.9;

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  drawerOpen: boolean;
}

export type CartAction =
  | { type: "ADD_ITEM"; item: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "APPLY_COUPON"; code: string }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "HYDRATE"; items: CartItem[]; coupon: Coupon | null };

const initialState: CartState = {
  items: [],
  coupon: null,
  drawerOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          drawerOpen: true,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        drawerOpen: true,
        items: [...state.items, { ...action.item, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== action.id) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [], coupon: null };
    case "APPLY_COUPON": {
      const coupon = COUPONS[action.code.toUpperCase()] ?? null;
      return { ...state, coupon };
    }
    case "OPEN_DRAWER":
      return { ...state, drawerOpen: true };
    case "CLOSE_DRAWER":
      return { ...state, drawerOpen: false };
    case "HYDRATE":
      return { ...state, items: action.items, coupon: action.coupon };
    default:
      return state;
  }
}

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "tentech-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { items, coupon } = JSON.parse(saved);
        dispatch({ type: "HYDRATE", items: items ?? [], coupon: coupon ?? null });
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items: state.items, coupon: state.coupon })
      );
    } catch {}
  }, [state.items, state.coupon]);

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  let discount = 0;
  if (state.coupon) {
    discount =
      state.coupon.type === "percent"
        ? (subtotal * state.coupon.value) / 100
        : Math.min(state.coupon.value, subtotal);
  }

  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = afterDiscount + shipping;
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ state, dispatch, subtotal, discount, shipping, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
