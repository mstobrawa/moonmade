import type { Metadata } from "next";
import Image from "next/image";
import StaticPageLayout from "@/app/ui/StaticPageLayout";

export const metadata: Metadata = {
  title: "Płatności",
  description: "Informacje o dostępnych metodach płatności w sklepie Moonmade.",
  alternates: {
    canonical: "/payment",
  },
};

export default function PaymentsPage() {
  return (
    <StaticPageLayout title="Płatności">
      <p className="max-w-xl text-lg leading-8 text-moon-contrast/76">
        W Moonmade dbamy o bezpieczne i wygodne formy płatności. Na etapie
        finalizacji zamówienia udostępniamy szybkie i sprawdzone metody
        płatnicze.
      </p>

      <section className="mt-8 flex max-w-xl flex-col gap-4">
        <p className="moon-nav-text text-[0.72rem] text-moon-rose-dark">
          Bezpieczne płatności obsługiwane przez
        </p>

        <Image
          src="/bankpay.webp"
          alt="Autopay - bezpieczne płatności online"
          width={550}
          height={160}
          className="opacity-90 drop-shadow-[0_10px_24px_rgba(47,42,40,0.08)]"
        />

        <p className="max-w-xs text-xs leading-6 text-moon-rose-dark">
          Obsługujemy szybkie przelewy bankowe oraz inne metody płatności
          oferowane przez Autopay.
        </p>
      </section>

      <p className="text-sm leading-7 text-moon-rose-dark">
        Szczegóły dotyczące płatności przekazywane są indywidualnie po złożeniu
        zamówienia.
      </p>
    </StaticPageLayout>
  );
}
