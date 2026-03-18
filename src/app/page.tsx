import type { Metadata } from "next";
import Link from "next/link";
import HeroCard from "./ui/HeroCard";

export const metadata: Metadata = {
  title: "Strona główna",
  description:
    "Moonmade to unikatowa, ręcznie tworzona biżuteria z naturalnych kamieni. Każdy egzemplarz powstaje z pasji i miłości do detalu.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-14 text-moon-contrast md:px-8 md:py-20">
      <HeroCard className="max-w-4xl overflow-hidden text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-moon-rose-dark">
          Moonmade Atelier
        </p>

        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Z miłości do kamieni powstaje biżuteria, która ma duszę
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-moon-contrast/76">
          Każdy naszyjnik i każda bransoletka tworzone są ręcznie - z pasji,
          cierpliwości i wrażliwości na piękno natury.
        </p>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-moon-contrast/74 sm:text-lg">
          Szlachetne <span className="font-semibold">ametysty</span>, ciepłe{" "}
          <span className="font-semibold">karneole</span>, spokojne{" "}
          <span className="font-semibold">labradoryty</span> i energetyczne{" "}
          <span className="font-semibold">jaspisy</span> - każdy kamień opowiada
          własną historię, a razem tworzą niepowtarzalną harmonię w naszych
          kolekcjach.
        </p>

        <div className="mt-8">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-moon-rose to-moon-rose-dark px-7 py-3.5 font-semibold text-moon-cream shadow-[0_16px_36px_rgba(138,110,108,0.2)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(138,110,108,0.24)]"
          >
            Zobacz kolekcję
          </Link>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-moon-contrast/74 sm:text-lg">
          Nasza biżuteria znalazła uznanie we Włoszech i dziś może towarzyszyć
          także Tobie w codziennym życiu, dodając subtelnego blasku i
          wyjątkowego charakteru. Każdy element jest unikatowy, tak jak Ty.
        </p>

        <p className="mt-6 text-sm tracking-[0.2em] text-moon-rose-dark">
          Moonmade - z miłości do kamieni
        </p>
      </HeroCard>
    </main>
  );
}
