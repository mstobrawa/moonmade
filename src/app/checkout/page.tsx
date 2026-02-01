"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/(store)/cart/CartContext";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";

type ShippingMethod = "locker" | "home";
type Step = "form" | "summary";

const LOCKER_REGEX = /^[A-Z]{3}\d{2}[A-Z]?$/;
const FREE_SHIPPING_THRESHOLD = 250;

export default function CheckoutPage() {
  const { state, isHydrated } = useCart();

  const [step, setStep] = useState<Step>("form");
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("locker");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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

  /* =======================
     STANY PODSTAWOWE
     ======================= */
  if (!isHydrated) {
    return <main className="p-6 text-center">Ładowanie…</main>;
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

  /* =======================
     CENY
     ======================= */
  const productsTotal = state.items.reduce((sum, item) => sum + item.price, 0);

  const baseShippingCost = shippingMethod === "locker" ? 16.99 : 19.99;
  const shippingCost =
    productsTotal >= FREE_SHIPPING_THRESHOLD ? 0 : baseShippingCost;

  const total = productsTotal + shippingCost;
  const missingToFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - productsTotal,
  );

  /* =======================
     WALIDACJA
     ======================= */
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert("Musisz zaakceptować regulamin i politykę prywatności.");
      return;
    }

    if (shippingMethod === "locker" && !LOCKER_REGEX.test(form.lockerCode)) {
      alert("Podaj poprawny kod paczkomatu (np. WAW01A)");
      return;
    }

    if (
      shippingMethod === "home" &&
      (!form.street || !form.postalCode || !form.city)
    ) {
      alert("Uzupełnij pełny adres dostawy");
      return;
    }

    setStep("summary");
  };

  /* =======================
     ZAPIS + PŁATNOŚĆ
     ======================= */
  const handleCreateOrder = async () => {
    try {
      setIsSubmitting(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: state.items,
          shippingMethod,
          shippingCost,
          total,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        alert("BŁĄD API:\n" + text);
        return;
      }

      const data = JSON.parse(text);

      if (!data.paymentUrl) {
        alert("BRAK paymentUrl w odpowiedzi API");
        return;
      }

      window.location.href = data.paymentUrl;
    } catch (err) {
      console.error("JS ERROR:", err);
      alert("Błąd przy przejściu do płatności");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold">Finalizacja zamówienia</h1>

      {/* =======================
         KROK 1 — FORMULARZ
         ======================= */}
      {step === "form" && (
        <>
          {/* DOSTAWA */}
          <section className="bg-moon-white rounded-xl p-6 shadow space-y-4">
            <h2 className="text-xl font-semibold">Dostawa</h2>

            <div
              className={`border rounded-lg p-4 cursor-pointer transition ${
                shippingMethod === "locker"
                  ? "border-moon-rose bg-moon-rose-light/30"
                  : ""
              }`}
              onClick={() => setShippingMethod("locker")}
            >
              Paczkomat InPost — 16,99 zł
            </div>

            <div
              className={`border rounded-lg p-4 cursor-pointer transition ${
                shippingMethod === "home"
                  ? "border-moon-rose bg-moon-rose-light/30"
                  : ""
              }`}
              onClick={() => setShippingMethod("home")}
            >
              Kurier — 19,99 zł
            </div>

            {missingToFreeShipping > 0 && (
              <p className="text-sm text-moon-contrast/70">
                Do darmowej dostawy brakuje{" "}
                <strong>{missingToFreeShipping.toFixed(2)} zł</strong>
              </p>
            )}
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
              <div className="space-y-1">
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

                <p className="text-sm text-moon-contrast/70">
                  Nie znasz kodu paczkomatu?{" "}
                  <a
                    href="https://inpost.pl/znajdz-paczkomat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-moon-contrast"
                  >
                    Sprawdź na mapie InPost
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
                    setForm({ ...form, postalCode: e.target.value })
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

            {/* CHECKBOX — REGULAMIN */}
            <div className="flex items-start gap-3 text-sm text-moon-contrast">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1"
              />
              <p>
                Akceptuję{" "}
                <a
                  href="/regulamin"
                  target="_blank"
                  className="underline hover:opacity-80"
                >
                  regulamin
                </a>{" "}
                oraz{" "}
                <a
                  href="/polityka-prywatnosci"
                  target="_blank"
                  className="underline hover:opacity-80"
                >
                  politykę prywatności
                </a>
                .
              </p>
            </div>

            <Button type="submit" className="w-full">
              Sprawdź zamówienie
            </Button>
          </form>
        </>
      )}

      {/* =======================
         KROK 2 — PODSUMOWANIE
         ======================= */}
      {step === "summary" && (
        <section className="bg-moon-white rounded-xl p-6 shadow space-y-6">
          <h2 className="text-2xl font-semibold">Podsumowanie zamówienia</h2>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Produkty</h3>
            {state.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.title}</span>
                <span className="font-medium">{item.price.toFixed(2)} zł</span>
              </div>
            ))}
          </div>

          <hr />

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Dostawa</h3>
            <div className="flex justify-between text-sm">
              <span>
                {shippingMethod === "locker" ? "Paczkomat InPost" : "Kurier"}
              </span>
              <span>
                {shippingCost === 0
                  ? "0,00 zł (Darmowa)"
                  : `${shippingCost.toFixed(2)} zł`}
              </span>
            </div>
          </div>

          <hr />

          <div className="flex justify-between text-lg font-bold">
            <span>Razem</span>
            <span>{total.toFixed(2)} zł</span>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setStep("form")}
            >
              ← Edytuj dane
            </Button>

            <Button
              className="w-full"
              disabled={isSubmitting}
              onClick={handleCreateOrder}
            >
              {isSubmitting ? "Przetwarzanie…" : "Przejdź do płatności"}
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
