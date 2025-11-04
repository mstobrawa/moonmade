"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import type { CartState, CartAction, CartItem } from "./cart-types";

const CartCtx = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  isHydrated: boolean; // 🧠 dodajemy flagę
} | null>(null);

const initial: CartState = { items: [] };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === exists.id ? { ...i, qty: i.qty + action.payload.qty } : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };
    case "SET_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const [isHydrated, setIsHydrated] = useState(false);

  // 🧩 efekt uruchamia się tylko po stronie klienta
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({ type: "CLEAR" }); // reset
        parsed.items.forEach((item: CartItem) =>
          dispatch({ type: "ADD_ITEM", payload: item })
        );
      }
    } catch (e) {
      console.warn("Nie udało się wczytać koszyka:", e);
    }
    setIsHydrated(true);
  }, []);

  // zapisz zmiany
  useEffect(() => {
    if (isHydrated) localStorage.setItem("cart", JSON.stringify(state));
  }, [state, isHydrated]);

  return (
    <CartCtx.Provider value={{ state, dispatch, isHydrated }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
