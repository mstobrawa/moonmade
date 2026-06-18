"use client";

import { useState } from "react";
import { useCart } from "@/app/(store)/cart/CartContext";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import HeroCard from "@/app/ui/HeroCard";

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

  if (!isHydrated) {
    return (
      <main className="store-page-spacing px-6 text-center">Ładowanie...</main>
    );
  }

  if (state.items.length === 0) {
    return (
      <main className="store-page-spacing flex items-start justify-center px-6">
        <HeroCard className="text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight">
            Twój koszyk jest pusty
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-moon-contrast/74">
            Dodaj produkty do koszyka, aby przejść do bezpiecznej finalizacji
            zamówienia.
          </p>
          <Button as="a" href="/products">
            Wróć do produktów
          </Button>
        </HeroCard>
      </main>
    );
  }

  const productsTotal = state.items.reduce((sum, item) => sum + item.price, 0);
  const baseShippingCost = shippingMethod === "locker" ? 16.99 : 19.99;
  const shippingCost =
    productsTotal >= FREE_SHIPPING_THRESHOLD ? 0 : baseShippingCost;
  const total = productsTotal + shippingCost;
  const missingToFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - productsTotal,
  );

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!acceptedTerms) {
      alert("Musisz zaakceptować regulamin i politykę prywatności.");
      return;
    }

    if (shippingMethod === "locker" && !LOCKER_REGEX.test(form.lockerCode)) {
      alert("Podaj poprawny kod paczkomatu, np. WAW01A.");
      return;
    }

    if (
      shippingMethod === "home" &&
      (!form.street || !form.postalCode || !form.city)
    ) {
      alert("Uzupełnij pełny adres dostawy.");
      return;
    }

    setStep("summary");
  };

  const handleCreateOrder = async () => {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/checkout", {
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

      const text = await response.text();

      if (!response.ok) {
        alert(`Błąd API:\n${text}`);
        return;
      }

      const data = JSON.parse(text) as { paymentUrl?: string };

      if (!data.paymentUrl) {
        alert("Brak paymentUrl w odpowiedzi API.");
        return;
      }

      window.location.href = data.paymentUrl;
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);
      alert("Wystąpił błąd przy przejściu do płatności.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="store-page-spacing mx-auto max-w-5xl space-y-10 px-6 md:px-8">
      <HeroCard>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-moon-rose-dark">
          Moonmade Checkout
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Finalizacja zamówienia
        </h1>
      </HeroCard>

      {step === "form" && (
        <>
          <section className="space-y-4 rounded-2xl border border-[#e7ddd6] bg-gradient-to-r from-[#faf6f1] via-[#faebda] to-[#f2e1d6] p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Dostawa</h2>

            <div
              className={`cursor-pointer rounded-lg border p-4 transition ${
                shippingMethod === "locker"
                  ? "border-moon-rose bg-moon-white/55"
                  : "border-[#dccfc7] bg-[#f8f1eb]"
              }`}
              onClick={() => setShippingMethod("locker")}
            >
              Paczkomat InPost - 16,99 zł
            </div>

            <div
              className={`cursor-pointer rounded-lg border p-4 transition ${
                shippingMethod === "home"
                  ? "border-moon-rose bg-moon-white/55"
                  : "border-[#dccfc7] bg-[#f8f1eb]"
              }`}
              onClick={() => setShippingMethod("home")}
            >
              Kurier - 19,99 zł
            </div>

            {missingToFreeShipping > 0 && (
              <p className="text-sm text-moon-contrast/70">
                Do darmowej dostawy brakuje{" "}
                <strong>{missingToFreeShipping.toFixed(2)} zł</strong>
              </p>
            )}
          </section>

          <form
            onSubmit={handleFormSubmit}
            className="space-y-4 rounded-2xl border border-[#e7ddd6] bg-gradient-to-r from-[#faf6f1] via-[#faebda] to-[#f2e1d6] p-6 shadow-sm"
          >
            <Input
              label="Imię i nazwisko"
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />

            <Input
              label="Adres e-mail"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />

            <Input
              label="Numer telefonu"
              required
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
            />

            {shippingMethod === "locker" && (
              <div className="space-y-1">
                <Input
                  label="Kod paczkomatu InPost"
                  required
                  value={form.lockerCode}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      lockerCode: event.target.value.toUpperCase(),
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
                  onChange={(event) =>
                    setForm({ ...form, street: event.target.value })
                  }
                />

                <Input
                  label="Kod pocztowy"
                  required
                  value={form.postalCode}
                  onChange={(event) =>
                    setForm({ ...form, postalCode: event.target.value })
                  }
                />

                <Input
                  label="Miasto"
                  required
                  value={form.city}
                  onChange={(event) => setForm({ ...form, city: event.target.value })}
                />
              </>
            )}

            <div className="flex items-start gap-3 text-sm text-moon-contrast">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                className="mt-1"
              />
              <p>
                Akceptuję{" "}
                <a
                  href="/statute"
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

      {step === "summary" && (
        <section className="space-y-6 rounded-2xl border border-[#e7ddd6] bg-gradient-to-r from-[#faf6f1] via-[#faebda] to-[#f2e1d6] p-6 shadow-sm">
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
              {isSubmitting ? "Przetwarzanie..." : "Przejdź do płatności"}
            </Button>
          </div>
        </section>
      )}

      <Button
        as="a"
        href="/cart"
        variant="outline"
        className="bg-moon-white/80 shadow-[0_10px_22px_rgba(47,42,40,0.06)]"
      >
        ← Wróć do koszyka
      </Button>
    </main>
  );
}
