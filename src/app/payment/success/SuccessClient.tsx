"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

function formatOrderNumber(uuid: string) {
  return `ZAM-${uuid.slice(-6).toUpperCase()}`;
}

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-moon-white rounded-2xl shadow-md p-8 text-center space-y-6">
        <h1 className="text-3xl font-bold text-moon-contrast">
          Dziękujemy za zamówienie 💖
        </h1>

        <p className="text-sm text-moon-rose-dark">
          Twoje zamówienie zostało przyjęte do realizacji.
        </p>

        {orderId && (
          <p className="text-xs text-moon-contrast">
            Numer zamówienia:
            <br />
            <strong>{formatOrderNumber(orderId)}</strong>
          </p>
        )}

        <div className="flex flex-col gap-3 pt-4">
          <Link href="/products">
            <button className="w-full rounded-xl border border-moon-contrast py-2 hover:bg-moon-cream transition">
              Wróć do sklepu
            </button>
          </Link>

          <Link href="/">
            <button className="w-full rounded-xl bg-moon-contrast text-moon-cream py-2 hover:opacity-90 transition">
              Strona główna
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
