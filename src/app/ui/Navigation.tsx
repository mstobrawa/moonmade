"use client";

import React, { useState } from "react";
import MenuItem from "./MenuItem";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="relative">
      {/* Desktop menu */}
      <div className="hidden sm:flex gap-8">
        <MenuItem href="/" label="Strona główna" />
        <MenuItem href="/products" label="Produkty" />
        <MenuItem href="/about" label="O nas" />
        <MenuItem href="/contact" label="Kontakt" />
        <MenuItem href="/account" label="Konto" />
      </div>

      {/* Burger button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col gap-1.5 p-2 sm:hidden focus:outline-none"
      >
        <span
          className={`block h-[2px] w-6 bg-moon-contrast transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-[2px] w-6 bg-moon-contrast transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-[2px] w-6 bg-moon-contrast transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Animated Mobile Menu */}
      <div
        className={`absolute top-10 right-0 w-max bg-moon-cream border border-moon-rose-dark rounded-xl shadow-lg p-4 flex flex-col gap-2 z-50
          transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <MenuItem href="/" label="Strona główna" />
        <MenuItem href="/products" label="Produkty" />
        <MenuItem href="/about" label="O nas" />
        <MenuItem href="/contact" label="Kontakt" />
        <MenuItem href="/account" label="Konto" />
      </div>
    </nav>
  );
}
