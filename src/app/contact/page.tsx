"use client";
import { useCart } from "@/app/(store)/cart/CartContext";
import React from "react";

export default function ContactPage() {
  const { state, dispatch, isHydrated } = useCart();

  if (!isHydrated) return null; // 🧠 poczekaj aż się załaduje z localStorage

  const totalQty = state.items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: "ADD_ITEM",
            payload: { id: "p1", title: "Test", price: 1999, qty: 1 },
          })
        }
        className="px-4 py-2 bg-moon-rose text-moon-white rounded-lg hover:bg-moon-rose-dark transition"
      >
        + test do koszyka
      </button>

      <span className="text-lg text-moon-contrast">
        Produkty w koszyku: {totalQty}
      </span>
    </div>
  );
}
