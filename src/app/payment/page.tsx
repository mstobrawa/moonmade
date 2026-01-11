import Image from "next/image";

export const metadata = {
  title: "Płatności | Moonmade",
  description: "Informacje o dostępnych metodach płatności w sklepie Moonmade.",
};

export default function PaymentsPage() {
  return (
    <main className="min-h-screen bg-moon-cream text-moon-contrast px-6 py-16 flex items-center justify-center">
      <div className="w-full max-w-xl bg-moon-white rounded-2xl shadow-md p-8 space-y-8 text-center">
        <h1 className="text-3xl font-bold">Płatności</h1>

        <p className="text-lg">
          W Moonmade dbamy o bezpieczne i wygodne formy płatności. Na etapie
          finalizacji zamówienia udostępniamy szybkie i sprawdzone metody
          płatnicze.
        </p>

        {/* 🔐 Baner Autopay */}
        <section className="flex flex-col items-center gap-4">
          <p className="text-sm text-moon-rose-dark">
            Bezpieczne płatności obsługiwane przez
          </p>

          <Image
            src="/bankpay.webp"
            alt="Autopay – bezpieczne płatności online"
            width={550}
            height={160}
            className="opacity-90"
          />

          <p className="text-xs text-moon-rose-dark max-w-xs">
            Obsługujemy szybkie przelewy bankowe oraz inne metody płatności
            oferowane przez Autopay.
          </p>
        </section>

        <p className="text-sm text-moon-rose-dark">
          Szczegóły dotyczące płatności przekazywane są indywidualnie po
          złożeniu zamówienia.
        </p>
      </div>
    </main>
  );
}
