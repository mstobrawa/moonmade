"use client";

import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex flex-col gap-1.5 rounded-full border border-moon-contrast/10 bg-moon-cream/65 p-3 shadow-[0_10px_24px_rgba(47,42,40,0.08)] transition-all duration-300 ease-out hover:bg-moon-white/60 sm:hidden"
        aria-label="Otworz menu"
      >
        <span
          className={`block h-0.5 w-6 bg-moon-contrast transition-transform duration-300 ${
            isOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-moon-contrast transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-moon-contrast transition-transform duration-300 ${
            isOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      <div
        className={`absolute left-0 top-14 z-50 flex w-64 flex-col gap-3 rounded-3xl border border-moon-contrast/10 bg-[linear-gradient(180deg,rgba(252,237,218,0.9),rgba(247,231,216,0.8))] p-5 shadow-[0_18px_40px_rgba(47,42,40,0.12)] backdrop-blur-xl transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <MenuItem
          href="/"
          label="Strona główna"
          onClick={() => setIsOpen(false)}
        />
        <MenuItem
          href="/products"
          label="Produkty"
          onClick={() => setIsOpen(false)}
        />
        <MenuItem
          href="/about"
          label="O nas"
          onClick={() => setIsOpen(false)}
        />
        <MenuItem
          href="/contact"
          label="Kontakt"
          onClick={() => setIsOpen(false)}
        />
      </div>

      <div className="hidden items-center gap-7 sm:flex">
        <MenuItem href="/" label="Strona główna" />
        <MenuItem href="/products" label="Produkty" />
        <MenuItem href="/about" label="O nas" />
        <MenuItem href="/contact" label="Kontakt" />
      </div>
    </nav>
  );
}
