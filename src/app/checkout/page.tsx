"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/(store)/cart/CartContext";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";

type ShippingMethod = "locker" | "home";
type Step = "form" | "summary";

const LOCKER_REGEX = /^[A-Z]{3}\d{2}[A-Z]?$/;

export default function CheckoutPage() {
  const { state, isHydrated } = useCart();

  const [step, setStep] = useState<Step>("form");
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("locker");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    lockerCode: "",
    street: "",
    postalCode: "",
    city: "",
    country: "Polska",
  });

  /* =====================
     STANY PODSTAWOWE
     ===================== */
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

  /* =====================
     KALKULACJE
     ===================== */
  const productsTotal = state.items.reduce((sum, item) => sum + item.price, 0);

  const FREE_SHIPPING_THRESHOLD = 250;
  const baseShippingCost = shippingMethod === "locker" ? 16.99 : 19.99;

  const shippingCost =
    productsTotal >= FREE_SHIPPING_THRESHOLD ? 0 : baseShippingCost;

  const total = productsTotal + shippingCost;

  /* =====================
     WALIDACJA → PODSUMOWANIE
     ===================== */
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (shippingMethod === "locker" && !LOCKER_REGEX.test(form.lockerCode)) {
      alert("Podaj poprawny kod paczkomatu (np. WAW01A)");
      return;
    }

    if (
      shippingMethod === "home" &&
      (!form.street || !form.postalCode || !form.city)
    ) {
      alert("Uzupełnij pełny adres do wysyłki");
      return;
    }

    setStep("summary");
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold">Finalizacja zamówienia</h1>

      {/* =====================
          PODSUMOWANIE CEN
         ===================== */}
      <section className="bg-moon-white rounded-xl p-6 shadow space-y-3">
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

        {productsTotal < FREE_SHIPPING_THRESHOLD && (
          <p className="text-sm text-moon-rose-dark">
            Dodaj produkty za{" "}
            <strong>
              {(FREE_SHIPPING_THRESHOLD - productsTotal).toFixed(2)} zł
            </strong>{" "}
            aby otrzymać darmową dostawę 🚚
          </p>
        )}
      </section>

      {/* =====================
          KROK 1 — FORMULARZ
         ===================== */}
      {step === "form" && (
        <>
          {/* METODA DOSTAWY */}
          <section className="bg-moon-white rounded-xl p-6 shadow space-y-3">
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
              Kurier → Dom lub firma (19,99 zł)
            </label>
          </section>

          {/* FORMULARZ */}
          <form
            onSubmit={handleFormSubmit}
            className="bg-moon-white rounded-xl p-6 shadow space-y-4"
          >
            <Input
              label="Imię i nazwisko"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Input
              label="Adres e-mail"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <Input
              label="Numer telefonu"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            {shippingMethod === "locker" && (
              <div className="space-y-2">
                <Input
                  label="Kod paczkomatu InPost"
                  required
                  value={form.lockerCode}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      lockerCode: e.target.value.toUpperCase(),
                    })
                  }
                />

                <p className="text-xs text-moon-rose-dark">
                  Nie znasz kodu?{" "}
                  <a
                    href="https://inpost.pl/znajdz-paczkomat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Sprawdź paczkomat na mapie InPost
                  </a>
                </p>
              </div>
            )}

            {shippingMethod === "home" && (
              <>
                <Input
                  label="Ulica i numer"
                  required
                  value={form.street}
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                />

                <Input
                  label="Kod pocztowy"
                  required
                  value={form.postalCode}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      postalCode: e.target.value,
                    })
                  }
                />

                <Input
                  label="Miasto"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </>
            )}

            <Button type="submit" className="w-full">
              Sprawdź zamówienie
            </Button>
          </form>
        </>
      )}

      {/* =====================
          KROK 2 — PODSUMOWANIE
         ===================== */}
      {step === "summary" && (
        <section className="bg-moon-white rounded-xl p-6 shadow space-y-6">
          <h2 className="text-2xl font-semibold">Podsumowanie zamówienia</h2>

          <div className="space-y-1 text-sm">
            <p>
              <strong>Imię i nazwisko:</strong> {form.name}
            </p>
            <p>
              <strong>Email:</strong> {form.email}
            </p>
            <p>
              <strong>Telefon:</strong> {form.phone}
            </p>

            <p>
              <strong>Dostawa:</strong>{" "}
              {shippingMethod === "locker"
                ? `Paczkomat InPost (${form.lockerCode})`
                : `Kurier – ${form.street}, ${form.postalCode} ${form.city}`}
            </p>
          </div>

          <div className="flex justify-between text-lg font-bold border-t pt-4">
            <span>Razem do zapłaty</span>
            <span>{total.toFixed(2)} zł</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setStep("form")}
            >
              ← Wróć do edycji
            </Button>

            <Button
              className="w-full"
              onClick={() => {
                // TU BĘDZIE AUTOPAY
                alert("Tu będzie płatność");
              }}
            >
              Przejdź do płatności
            </Button>
          </div>
        </section>
      )}

      <Link href="/cart">
        <Button variant="outline">← Wróć do koszyka</Button>
      </Link>
    </main>
  );
}
