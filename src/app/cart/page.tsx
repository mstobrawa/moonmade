"use client";

import React from "react";
import { useCart } from "@/app/(store)/cart/CartContext";
import Button from "../ui/Button";

function formatPrice(n: number) {
  return n.toFixed(2).replace(".", ",") + " zł";
}

export default function CartPage() {
  const { state, dispatch, isHydrated } = useCart();

  // guard przed hydratacją (unikamy mismatch SSR/CSR)
  if (!isHydrated) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 p-6">
        <div className="animate-pulse space-y-4 w-full max-w-2xl">
          <div className="h-8 w-56 bg-gray-200 rounded" />
          <div className="h-40 bg-gray-100 rounded" />
          <div className="h-6 w-40 bg-gray-200 rounded" />
        </div>
      </main>
    );
  }

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (state.items.length === 0) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 p-6">
        <h1 className="text-2xl text-moon-contrast font-semibold">
          Twój koszyk jest pusty 🛒
        </h1>
        <Button as="a" href="/products">
          Przejdź do produktów
        </Button>
      </main>
    );
  }

  const handleInc = (id: string) => {
    const item = state.items.find((i) => i.id === id);
    if (!item) return;
    // ADD_ITEM z qty:1 — Twój reducer to zwiększy
    dispatch({ type: "ADD_ITEM", payload: { ...item, qty: 1 } });
  };

  const handleDec = (id: string) => {
    // REMOVE_ITEM domyślnie zmniejszy o 1, a jeśli qty === 1 usunie
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const handleSetQty = (id: string, qty: number) => {
    // SET_QTY usuwa element przy qty <= 0 w Twoim reducerze
    dispatch({ type: "SET_QTY", payload: { id, qty } });
  };

  return (
    <main className="p-6 min-h-screen bg-moon-cream text-moon-contrast">
      <h1 className="text-3xl font-bold mb-6">Twój koszyk</h1>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* 🧺 Lista produktów */}
        <section className="flex-1 space-y-4">
          {state.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-moon-white p-4 rounded-xl shadow"
            >
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-moon-rose-dark">
                  Cena: {formatPrice(item.price)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    aria-label={`Zmniejsz ilość ${item.title}`}
                    onClick={() => handleDec(item.id)}
                    className="px-3 py-1 rounded-md bg-moon-rose-light text-moon-contrast hover:opacity-90"
                  >
                    −
                  </button>

                  <input
                    type="number"
                    min={0}
                    value={item.qty}
                    onChange={(e) => {
                      const v = Number(e.target.value || 0);
                      const qty = Number.isNaN(v)
                        ? item.qty
                        : Math.max(0, Math.floor(v));
                      handleSetQty(item.id, qty);
                    }}
                    className="w-16 text-center bg-white rounded-md border px-2 py-1"
                  />

                  <button
                    aria-label={`Zwiększ ilość ${item.title}`}
                    onClick={() => handleInc(item.id)}
                    className="px-3 py-1 rounded-md bg-moon-rose text-white hover:opacity-90"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    {formatPrice(item.price * item.qty)}
                  </p>

                  <button
                    onClick={() =>
                      // jeśli chcesz całkowicie usunąć natychmiast:
                      dispatch({
                        type: "SET_QTY",
                        payload: { id: item.id, qty: 0 },
                      })
                    }
                    className="mt-2 text-sm text-moon-rose-dark hover:underline"
                    aria-label={`Usuń ${item.title}`}
                  >
                    Usuń
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 💰 Podsumowanie */}
        <aside className="w-full md:w-1/3 bg-moon-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Podsumowanie</h2>

          <div className="flex justify-between mb-2">
            <span className="text-sm text-moon-rose-dark">Produkty</span>
            <span className="text-sm">{state.items.length}</span>
          </div>

          <p className="text-lg mb-4">
            Razem: <span className="font-bold">{formatPrice(totalPrice)}</span>
          </p>

          <Button
            className="w-full mb-3"
            onClick={() => alert("Checkout w przygotowaniu")}
          >
            Przejdź do kasy
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => dispatch({ type: "CLEAR" })}
          >
            Wyczyść koszyk
          </Button>
        </aside>
      </div>
    </main>
  );
}
