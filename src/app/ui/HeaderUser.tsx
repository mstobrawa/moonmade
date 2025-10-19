"use client";

import React, { useState } from "react";
import { ShoppingCart, LogIn, LogOut, UserPlus } from "lucide-react";

export default function HeaderUser() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthClick = () => setIsLoggedIn((prev) => !prev);

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {/* Koszyk */}
      <button className="relative">
        <ShoppingCart className="w-6 h-6 text-moon-contrast hover:text-moon-rose-dark transition" />
        <span className="absolute -top-2 -right-2 bg-moon-rose text-moon-cream text-xs font-semibold rounded-full px-1.5">
          2
        </span>
      </button>

      {/* Logowanie / Rejestracja */}
      {!isLoggedIn ? (
        <div className="flex gap-2 sm:gap-3">
          <button className="flex items-center gap-1 text-moon-contrast hover:text-moon-rose-dark transition">
            <LogIn className="w-5 h-5" /> Zaloguj
          </button>
          <button className="flex items-center gap-1 text-moon-contrast hover:text-moon-rose-dark transition">
            <UserPlus className="w-5 h-5" /> Zarejestruj
          </button>
        </div>
      ) : (
        <button
          onClick={handleAuthClick}
          className="flex items-center gap-1 text-moon-contrast hover:text-moon-rose-dark transition"
        >
          <LogOut className="w-5 h-5" /> Wyloguj
        </button>
      )}
    </div>
  );
}
