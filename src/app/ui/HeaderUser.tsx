"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";

interface HeaderUserProps {
  isLoggedIn: boolean;
}

export default function HeaderUser({ isLoggedIn }: HeaderUserProps) {
  const pathname = usePathname();

  const isCartActive = pathname === "/cart";
  const isAccountActive = pathname === "/signinup" || pathname === "/login";

  const linkClass =
    "relative px-2 pb-1 text-moon-contrast cursor-pointer transition-colors " +
    "after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] " +
    "after:bg-moon-rose after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100";

  const activeClass = "after:scale-x-100";

  return (
    <div className="flex items-end gap-6">
      {/* Koszyk */}
      <Link
        href="/cart"
        className={`${linkClass} ${isCartActive ? activeClass : ""}`}
      >
        <ShoppingCart size={24} />
      </Link>

      {/* Logowanie / Rejestracja lub Konto */}
      {!isLoggedIn ? (
        <Link
          href="/signinup"
          className={`${linkClass} ${isAccountActive ? activeClass : ""}`}
        >
          <div className="flex flex-col items-center text-sm leading-tight">
            <span>Logowanie</span>
            <span>Rejestracja</span>
          </div>
        </Link>
      ) : (
        <Link
          href="/account"
          className={`${linkClass} ${
            isAccountActive ? activeClass : ""
          } text-sm`}
        >
          Konto
        </Link>
      )}
    </div>
  );
}
