"use client";

import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="w-full bg-moon-cream shadow-md p-4 sm:px-8 flex items-center justify-between">
      <Logo />
      <Navigation />
    </header>
  );
}
