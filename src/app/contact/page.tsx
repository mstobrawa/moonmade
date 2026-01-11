export const metadata = {
  title: "Kontakt | Moonmade",
  description: "Skontaktuj się z nami – Moonmade",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-moon-cream text-moon-contrast px-6 py-16 flex items-center justify-center">
      <div className="w-full max-w-xl bg-moon-white rounded-2xl shadow-md p-8 text-center space-y-6">
        <h1 className="text-3xl font-bold">Kontakt</h1>

        <p className="text-lg">
          Masz pytania dotyczące biżuterii, dostępności unikatów lub zamówień
          indywidualnych?
        </p>

        <p className="text-lg">
          Napisz do nas:
          <br />
          <a
            href="mailto:kontakt@moonmade.pl"
            className="font-semibold text-moon-rose hover:underline"
          >
            kontakt@moonmade.pl
          </a>
        </p>

        <p className="text-sm text-moon-rose-dark">
          Odpowiadamy zazwyczaj w ciągu 24 godzin 🌙
        </p>
      </div>
    </main>
  );
}
