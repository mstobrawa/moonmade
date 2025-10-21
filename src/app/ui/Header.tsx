"use client";

import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import HeaderUser from "./HeaderUser";

export default function Header() {
  return (
    <header className="w-full bg-moon-cream shadow-md p-4 flex flex-col sm:flex-col gap-4">
      {/* Logo */}
      <div className="mx-auto">
        <Logo />
      </div>

      {/* Mobile row: burger + user */}
      <div className="w-full flex justify-between items-center sm:hidden">
        <Navigation /> {/* burger menu */}
        <HeaderUser /> {/* koszyk + konto */}
      </div>

      {/* Desktop: logo w tej samej kolumnie, menu + user w wierszu */}
      <div className="hidden sm:flex justify-between items-center w-full">
        <Navigation />
        <HeaderUser />
      </div>
    </header>
  );
}
