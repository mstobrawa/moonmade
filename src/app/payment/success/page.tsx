import Link from "next/link";
import ClearCartClient from "./ClearCartClient";
import HeroCard from "@/app/ui/HeroCard";

interface SuccessPageProps {
  searchParams: {
    order?: string;
  };
}

function formatOrderNumber(uuid: string) {
  return `ZAM-${uuid.slice(-6).toUpperCase()}`;
}

export default function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
  const orderId = searchParams.order;

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <HeroCard className="max-w-3xl text-center">
        <ClearCartClient />

        <h1 className="text-4xl font-semibold tracking-tight text-moon-contrast">
          Dziękujemy za zamówienie
        </h1>

        <p className="text-base leading-8 text-moon-contrast/74">
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
          <Link
            href="/products"
            className="inline-flex w-full items-center justify-center rounded-full border border-moon-contrast/15 bg-moon-white/80 px-5 py-3 font-semibold text-moon-contrast shadow-[0_12px_30px_rgba(47,42,40,0.08)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-moon-white hover:shadow-[0_16px_36px_rgba(47,42,40,0.12)]"
          >
            Wróć do sklepu
          </Link>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-moon-contrast to-moon-rose-dark px-5 py-3 font-semibold text-moon-cream shadow-[0_14px_35px_rgba(47,42,40,0.18)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(47,42,40,0.22)]"
          >
            Strona główna
          </Link>
        </div>
      </HeroCard>
    </main>
  );
}
