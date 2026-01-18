"use client";

import { useCart } from "@/app/(store)/cart/CartContext";
import Button from "@/app/ui/Button";
import Link from "next/link";
import { useState } from "react";

type ShippingMethod = "locker" | "home";

export default function CheckoutPage() {
  const { state, isHydrated } = useCart();

  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("locker");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    // paczkomat
    lockerCode: "",
    // adres
    street: "",
    postalCode: "",
    city: "",
    country: "Polska",
  });

  if (!isHydrated) {
    return (
      <main className="p-6 text-center">
        <p>Ładowanie koszyka…</p>
      </main>
    );
  }

  if (state.items.length === 0) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">Twój koszyk jest pusty 🛒</h1>
        <Link href="/products">
          <Button>Wróć do produktów</Button>
        </Link>
      </main>
    );
  }

  const productsTotal = state.items.reduce((sum, item) => sum + item.price, 0);

  const FREE_SHIPPING_THRESHOLD = 250;

  const baseShippingCost = shippingMethod === "locker" ? 16.99 : 19.99;

  const shippingCost =
    productsTotal >= FREE_SHIPPING_THRESHOLD ? 0 : baseShippingCost;

  const total = productsTotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const order = {
      customer: form,
      shippingMethod,
      shippingCost,
      items: state.items,
      total,
    };

    console.log("ZAMÓWIENIE (TEST):", order);
    alert("Zamówienie testowe zapisane (console.log)");
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Finalizacja zamówienia</h1>

      {/* 🧺 PODSUMOWANIE */}
      <section className="bg-moon-white rounded-xl p-6 shadow space-y-4">
        <h2 className="text-xl font-semibold">Twoje produkty</h2>

        {state.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.title}</span>
            <span>{item.price} zł</span>
          </div>
        ))}

        <div className="flex justify-between pt-2">
          <span>Dostawa</span>
          <span>{shippingCost.toFixed(2)} zł</span>
        </div>

        <div className="flex justify-between text-lg font-bold pt-4">
          <span>Razem</span>
          <span>{total.toFixed(2)} zł</span>
        </div>
      </section>

      {/* 📦 METODA DOSTAWY */}
      <section className="bg-moon-white rounded-xl p-6 shadow space-y-4">
        <h2 className="text-xl font-semibold">Metoda dostawy</h2>

        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            checked={shippingMethod === "locker"}
            onChange={() => setShippingMethod("locker")}
          />
          Paczkomat® → Paczkomat® (16,99 zł)
        </label>

        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            checked={shippingMethod === "home"}
            onChange={() => setShippingMethod("home")}
          />
          Paczkomat® → Dom lub firma (19,99 zł)
        </label>
      </section>

      {/* 📄 FORMULARZ */}
      <form
        onSubmit={handleSubmit}
        className="bg-moon-white rounded-xl p-6 shadow space-y-4"
      >
        <h2 className="text-xl font-semibold">Dane zamawiającego</h2>

        <input
          required
          placeholder="Imię i nazwisko"
          className="w-full border p-3 rounded-lg"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          required
          type="email"
          placeholder="Adres e-mail"
          className="w-full border p-3 rounded-lg"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          required
          placeholder="Numer telefonu"
          className="w-full border p-3 rounded-lg"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        {/* 📦 PACZKOMAT */}
        {shippingMethod === "locker" && (
          <div className="space-y-2">
            <p className="text-sm text-moon-rose-dark">Wybierz paczkomat:</p>

            <div
              id="inpost-map"
              data-token="sandbox"
              data-language="pl"
              data-country="pl"
              data-callback="onInpostSelect"
              style={{ width: "100%", height: "400px" }}
            />

            {form.lockerCode && (
              <p className="text-sm">
                Wybrany paczkomat: <strong>{form.lockerCode}</strong>
              </p>
            )}
          </div>
        )}

        {/* 🚚 DOM / FIRMA */}
        {shippingMethod === "home" && (
          <>
            <input
              required
              placeholder="Ulica i numer"
              className="w-full border p-3 rounded-lg"
              value={form.street}
              onChange={(e) =>
                setForm({
                  ...form,
                  street: e.target.value,
                })
              }
            />

            <input
              required
              placeholder="Kod pocztowy"
              className="w-full border p-3 rounded-lg"
              value={form.postalCode}
              onChange={(e) =>
                setForm({
                  ...form,
                  postalCode: e.target.value,
                })
              }
            />

            <input
              required
              placeholder="Miasto"
              className="w-full border p-3 rounded-lg"
              value={form.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  city: e.target.value,
                })
              }
            />
          </>
        )}

        <Button type="submit" className="w-full">
          Złóż zamówienie (test)
        </Button>
      </form>

      <Link href="/cart">
        <Button variant="outline">← Wróć do koszyka</Button>
      </Link>
    </main>
  );
}
