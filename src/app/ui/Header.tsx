"use client";

import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import HeaderUser from "./HeaderUser";

export default function Header() {
  return (
    <header className="w-full bg-moon-cream shadow-md p-4 flex flex-col gap-4 items-center">
      {/* Logo na górze */}
      <Logo />

      {/* Nav + User w jednej linii */}
      <div className="w-full flex justify-between items-center">
        <Navigation />
        <HeaderUser />
      </div>
    </header>
  );
}
