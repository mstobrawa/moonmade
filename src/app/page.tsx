import type { Metadata } from "next";
import Image from "next/image";
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
    <main className="home-hero relative isolate flex min-h-[70svh] items-start justify-center overflow-hidden px-5 pb-12 pt-7 text-moon-contrast sm:px-8 sm:pb-14 sm:pt-8 md:pb-16 md:pt-9">
      <Image
        src="/left.webp"
        alt=""
        width={1024}
        height={1024}
        priority
        className="home-hero__decoration home-hero__decoration--left pointer-events-none absolute bottom-[-2%] left-[-3%] z-0 h-auto w-[clamp(29rem,54vw,53rem)] select-none"
      />

      <Image
        src="/right.webp"
        alt=""
        width={1200}
        height={800}
        priority
        className="home-hero__decoration home-hero__decoration--right pointer-events-none absolute bottom-[-2%] right-[-5%] z-20 h-auto w-[clamp(30rem,52vw,51rem)] select-none"
      />

      <HeroCard className="relative z-10 max-w-3xl bg-[#fbf4ec]/88 px-6 py-10 text-center shadow-[0_24px_70px_rgba(93,61,38,0.13)] backdrop-blur-[3px] sm:px-10 md:px-14 md:py-12">
        <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-moon-rose-dark">
          Moonmade Atelier
        </p>

        <h1 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.65rem]">
          Z miłości do kamieni powstaje biżuteria, która ma duszę
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-moon-contrast/76 sm:text-base sm:leading-7">
          Każdy naszyjnik i każda bransoletka tworzone są ręcznie – z pasji,
          cierpliwości i wrażliwości na piękno natury.
        </p>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-moon-contrast/74 sm:text-base sm:leading-7">
          Szlachetne <span className="font-semibold">ametysty</span>, ciepłe{" "}
          <span className="font-semibold">karneole</span>, spokojne{" "}
          <span className="font-semibold">labradoryty</span> i energetyczne{" "}
          <span className="font-semibold">jaspisy</span> – każdy kamień opowiada
          własną historię, a razem tworzą niepowtarzalną harmonię w naszych
          kolekcjach.
        </p>

        <div className="mt-7">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-moon-rose to-moon-rose-dark px-7 py-3.5 text-sm font-semibold text-moon-cream shadow-[0_16px_36px_rgba(138,110,108,0.2)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(138,110,108,0.24)]"
          >
            Zobacz kolekcję
          </Link>
        </div>
      </HeroCard>
    </main>
  );
}
