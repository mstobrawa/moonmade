"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/(store)/cart/CartContext";
import Button from "../ui/Button";

function formatPrice(n: number) {
  return n.toFixed(2).replace(".", ",") + " zł";
}

export default function CartPage() {
  const { state, dispatch, isHydrated } = useCart();

  if (!isHydrated) return null;

  const totalPrice = state.items.reduce((sum, item) => sum + item.price, 0);

  if (state.items.length === 0) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4">
        <h1 className="text-2xl text-moon-contrast font-semibold">
          Twój koszyk jest pusty 🛒
        </h1>

        <Link href="/products">
          <Button>Przejdź do produktów</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6 min-h-screen bg-moon-cream text-moon-contrast">
      <h1 className="text-3xl font-bold mb-6">Twój koszyk</h1>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* 🧺 Lista unikatów */}
        <section className="flex-1 space-y-4">
          {state.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-moon-white p-4 rounded-xl shadow"
            >
              {/* miniaturka */}
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-moon-cream">
                <Image
                  src={item.image ?? "/placeholder.webp"}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-moon-rose-dark">
                  Unikat – dostępna 1 sztuka
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold mb-2">{formatPrice(item.price)}</p>
                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })
                  }
                  className="text-sm text-moon-rose-dark hover:underline"
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* 💰 Podsumowanie */}
        <aside className="w-full md:w-1/3 bg-moon-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Podsumowanie</h2>

          <p className="text-lg mb-4">
            Razem: <span className="font-bold">{formatPrice(totalPrice)}</span>
          </p>
          <Link href="/checkout">
            <Button className="w-full mb-3">Przejdź do kasy</Button>
          </Link>
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
