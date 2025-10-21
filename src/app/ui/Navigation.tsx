"use client";

import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // ✅ automatyczne zamykanie przy zmianie szerokości
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="relative">
      {/* Burger button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col gap-1.5 p-2 focus:outline-none sm:hidden"
        aria-label="Otwórz menu"
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

      {/* Mobile menu */}
      <div
        className={`absolute left-0 w-2xs bg-moon-cream border border-moon-contrast rounded-xl p-6 flex flex-col gap-4 z-50
    transition-all duration-300 ease-in-out
    ${
      isOpen
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-4 pointer-events-none"
    }
  `}
      >
        <MenuItem href="/" label="Strona główna" onClick={closeMenu} />
        <MenuItem href="/products" label="Produkty" onClick={closeMenu} />
        <MenuItem href="/about" label="O nas" onClick={closeMenu} />
        <MenuItem href="/contact" label="Kontakt" onClick={closeMenu} />
      </div>

      {/* Desktop menu */}
      <div className="hidden sm:flex gap-6">
        <MenuItem href="/" label="Strona główna" />
        <MenuItem href="/products" label="Produkty" />
        <MenuItem href="/about" label="O nas" />
        <MenuItem href="/contact" label="Kontakt" />
      </div>
    </nav>
  );
}
