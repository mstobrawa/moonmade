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
  isHydrated: boolean;
} | null>(null);

const initial: CartState = { items: [] };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    // ADD_ITEM: jeśli item istnieje -> zwiększ qty (domyślnie o 1)
    // jeśli nie istnieje -> dodaj z qty (domyślnie 1)
    case "ADD_ITEM": {
      const payload = action.payload as CartItem;
      const addQty = typeof payload.qty === "number" ? payload.qty : 1;

      const exists = state.items.find((i) => i.id === payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === exists.id ? { ...i, qty: i.qty + addQty } : i
          ),
        };
      }

      return { ...state, items: [...state.items, { ...payload, qty: addQty }] };
    }

    // REMOVE_ITEM: jeśli qty > removeQty -> zmniejsz
    // jeśli qty <= removeQty (np. removeQty === 1 i qty === 1) -> usuń produkt
    case "REMOVE_ITEM": {
      const payload = action.payload as { id: string; qty?: number };
      const removeQty = typeof payload.qty === "number" ? payload.qty : 1;

      const exists = state.items.find((i) => i.id === payload.id);
      if (!exists) return state;

      if (exists.qty > removeQty) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === payload.id ? { ...i, qty: i.qty - removeQty } : i
          ),
        };
      }

      // usuń jeśli qty <= removeQty
      return {
        ...state,
        items: state.items.filter((i) => i.id !== payload.id),
      };
    }

    // SET_QTY: ustaw dokładną ilość; jeśli <= 0 -> usuń
    case "SET_QTY": {
      const payload = action.payload as { id: string; qty: number };
      if (payload.qty <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === payload.id ? { ...i, qty: payload.qty } : i
        ),
      };
    }

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        // zamień na pojedyncze dispatchy żeby zachować logikę reducera
        dispatch({ type: "CLEAR" });
        parsed.items.forEach((item: CartItem) =>
          dispatch({ type: "ADD_ITEM", payload: item })
        );
      }
    } catch (e) {
      console.warn("Nie udało się wczytać koszyka:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // zapisujemy tylko po hydratacji (żeby uniknąć nadpisania SSR)
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("cart", JSON.stringify(state));
      } catch (e) {
        console.warn("Nie udało się zapisać koszyka:", e);
      }
    }
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
