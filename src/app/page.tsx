"use client";

import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-moon-cream text-moon-contrast py-16 px-6 sm:px-16 flex flex-col items-center text-center">
      {/* Nagłówek */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">
        Z miłości do kamieni powstaje biżuteria, która ma duszę
      </h1>

      {/* Pierwszy akapit */}
      <p className="text-lg sm:text-xl max-w-3xl mb-6">
        Każdy naszyjnik i każda bransoletka tworzone są ręcznie – z pasji,
        cierpliwości i wrażliwości na piękno natury.
      </p>

      {/* Drugi akapit */}
      <p className="text-lg sm:text-xl max-w-3xl mb-6">
        Szlachetne <span className="font-semibold">ametysty</span>, ciepłe{" "}
        <span className="font-semibold">karneole</span>, spokojne{" "}
        <span className="font-semibold">labradoryty</span> i energetyczne{" "}
        <span className="font-semibold">jaspisy</span> – każdy kamień opowiada
        własną historię, a razem tworzą niepowtarzalną harmonię w naszych
        kolekcjach.
      </p>

      {/* CTA button */}
      <Link
        href="/products"
        className="bg-moon-rose text-moon-cream font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-moon-rose-dark transition-colors mb-6"
      >
        Zobacz kolekcję
      </Link>

      {/* Trzeci akapit */}
      <p className="text-lg sm:text-xl max-w-3xl">
        Nasza biżuteria znalazła uznanie we Włoszech i dziś może towarzyszyć
        także Tobie w codziennym życiu, dodając subtelnego blasku i wyjątkowego
        charakteru. Każdy element jest unikatowy, tak jak Ty – dlatego Moonmade
        to coś więcej niż biżuteria: to małe dzieła sztuki, pełne pasji i
        miłości do kamieni.
      </p>
    </section>
  );
}
