"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/app/(store)/cart/CartContext";
import Button from "../ui/Button";
import HeroCard from "../ui/HeroCard";

function formatPrice(n: number) {
  return n.toFixed(2).replace(".", ",") + " zł";
}

const PLACEHOLDER = "/placeholder.webp";

/* ======================
   POJEDYNCZY ITEM KOSZYKA
   ====================== */
function CartItem({
  item,
  onRemove,
}: {
  item: {
    id: string;
    title: string;
    price: number;
    image?: string | null;
  };
  onRemove: (id: string) => void;
}) {
  const [imgSrc, setImgSrc] = React.useState(item.image || PLACEHOLDER);

  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#e7ddd6] bg-gradient-to-r from-[#faf6f1] via-[#faebda] to-[#f2e1d6] p-4 shadow-sm">
      {/* 🖼️ miniaturka */}
      <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-[#e7ddd6] bg-[linear-gradient(180deg,rgba(250,245,240,0.96),rgba(231,216,206,0.68))]">
        <Image
          src={imgSrc}
          alt={item.title}
          fill
          className="object-cover"
          sizes="80px"
          onError={() => setImgSrc(PLACEHOLDER)}
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-moon-contrast">{item.title}</h3>
        <p className="text-sm tracking-[0.04em] text-moon-rose-dark">
          Unikat – dostępna 1 sztuka
        </p>
      </div>

      <div className="text-right">
        <p className="mb-2 font-semibold text-moon-rose-dark">
          {formatPrice(item.price)}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-sm text-moon-rose-dark hover:underline"
        >
          Usuń
        </button>
      </div>
    </div>
  );
}

/* ======================
   STRONA KOSZYKA
   ====================== */
export default function CartPage() {
  const { state, dispatch, isHydrated } = useCart();

  if (!isHydrated) return null;

  const totalPrice = state.items.reduce((sum, item) => sum + item.price, 0);

  if (state.items.length === 0) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6 py-12">
        <HeroCard className="text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-moon-contrast">
            Twój koszyk jest pusty 🛒
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-moon-contrast/74">
            Wybierz unikatowe modele z kolekcji Moonmade i wróć tutaj, aby
            sfinalizować zamówienie.
          </p>

          <Button as="a" href="/products">
            Przejdź do produktów
          </Button>
        </HeroCard>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-12 text-moon-contrast md:px-8 md:py-16">
      <HeroCard className="mb-10 max-w-none">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-moon-rose-dark">
          Moonmade Cart
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">Twój koszyk</h1>
      </HeroCard>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* 🧺 Lista produktów */}
        <section className="flex-1 space-y-4">
          {state.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={(id) =>
                dispatch({
                  type: "REMOVE_ITEM",
                  payload: { id },
                })
              }
            />
          ))}
        </section>

        {/* 💰 Podsumowanie */}
        <aside className="w-full rounded-2xl border border-[#e7ddd6] bg-gradient-to-r from-[#faf6f1] via-[#faebda] to-[#f2e1d6] p-6 shadow-sm md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Podsumowanie</h2>

          <p className="text-lg mb-4">
            Razem: <span className="font-bold">{formatPrice(totalPrice)}</span>
          </p>

          <Button as="a" href="/checkout" className="mb-3 w-full">
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
