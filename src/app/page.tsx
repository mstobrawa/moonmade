import Link from "next/link";

export const metadata = {
  title: "Moonmade – ręcznie tworzona biżuteria z kamieni naturalnych",
  description:
    "Moonmade to unikatowa, ręcznie tworzona biżuteria z naturalnych kamieni. Każdy egzemplarz powstaje z pasji i miłości do detalu.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-moon-cream text-moon-contrast px-6 py-16 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-moon-white rounded-2xl shadow-md p-8 space-y-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Z miłości do kamieni powstaje biżuteria, która ma duszę
        </h1>

        <p className="text-lg">
          Każdy naszyjnik i każda bransoletka tworzone są ręcznie – z pasji,
          cierpliwości i wrażliwości na piękno natury.
        </p>

        <p className="text-lg">
          Szlachetne <span className="font-semibold">ametysty</span>, ciepłe{" "}
          <span className="font-semibold">karneole</span>, spokojne{" "}
          <span className="font-semibold">labradoryty</span> i energetyczne{" "}
          <span className="font-semibold">jaspisy</span> – każdy kamień opowiada
          własną historię, a razem tworzą niepowtarzalną harmonię w naszych
          kolekcjach.
        </p>

        <Link
          href="/products"
          className="inline-block bg-moon-rose text-moon-cream font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-moon-rose-dark transition-colors"
        >
          Zobacz kolekcję
        </Link>

        <p className="text-lg">
          Nasza biżuteria znalazła uznanie we Włoszech i dziś może towarzyszyć
          także Tobie w codziennym życiu, dodając subtelnego blasku i
          wyjątkowego charakteru. Każdy element jest unikatowy, tak jak Ty.
        </p>

        <p className="text-sm text-moon-rose-dark">
          Moonmade — z miłości do kamieni 🌙
        </p>
      </div>
    </main>
  );
}
