export const metadata = {
  title: "O nas | Moonmade",
  description:
    "Moonmade – ręcznie tworzona biżuteria z naturalnych kamieni. Poznaj naszą historię i filozofię.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-moon-cream text-moon-contrast px-6 py-16 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-moon-white rounded-2xl shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">O nas</h1>

        <p className="text-lg">
          Moonmade powstało z miłości do kamieni naturalnych, rękodzieła i
          prostoty. Wierzymy, że biżuteria może być czymś więcej niż dodatkiem –
          może nieść ze sobą emocje, historię i osobisty charakter.
        </p>

        <p className="text-lg">
          Każdy naszyjnik i każda bransoletka tworzona jest ręcznie, z
          uważnością na detal i szacunkiem do materiałów, z których powstaje.
          Pracujemy wyłącznie z naturalnymi kamieniami, wybierając je nie tylko
          ze względu na wygląd, ale także energię i symbolikę.
        </p>

        <p className="text-lg">
          Moonmade to mała, niezależna marka. Nie tworzymy masowo i nie
          powielamy wzorów – większość naszych projektów to unikatowe
          egzemplarze, dostępne w jednej sztuce.
        </p>

        <p className="text-lg">
          Nasza biżuteria znalazła uznanie również poza Polską, m.in. we
          Włoszech. Dziś z radością dzielimy się nią z osobami, które – tak jak
          my – cenią autentyczność, naturalność i ręczną pracę.
        </p>

        <p className="text-sm text-moon-rose-dark text-center">
          Moonmade — z miłości do kamieni 🌙
        </p>
      </div>
    </main>
  );
}
