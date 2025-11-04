"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/(store)/cart/CartContext";
import Badge from "./Badge";

interface HeaderUserProps {
  isLoggedIn: boolean;
}

export default function HeaderUser({ isLoggedIn }: HeaderUserProps) {
  const pathname = usePathname();
  const { state, isHydrated } = useCart();

  const isCartActive = pathname === "/cart";
  const isAccountActive = pathname === "/signinup" || pathname === "/login";

  // klasa odpowiadająca tylko za efekt hover (underline)
  const hoverUnderline =
    "relative after:absolute after:left-1/2 after:-bottom-1 after:w-0 after:h-[2px] after:bg-moon-rose after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full";

  const totalQty = isHydrated
    ? state.items.reduce((sum, item) => sum + item.qty, 0)
    : 0;

  return (
    <div className="flex items-end gap-6">
      {/* 🛒 Koszyk */}
      <Link
        href="/cart"
        className={`text-moon-contrast ${hoverUnderline} ${
          isCartActive ? "after:w-full" : ""
        }`}
      >
        <span className="relative inline-flex items-center justify-center">
          <ShoppingCart size={24} />
          {isHydrated && totalQty > 0 && (
            <Badge
              variant="rose"
              className="absolute -top-2 -right-2 shadow-md"
            >
              {totalQty}
            </Badge>
          )}
        </span>
      </Link>

      {/* 👤 Logowanie / Konto */}
      {!isLoggedIn ? (
        <Link
          href="/signinup"
          className={`text-moon-contrast ${hoverUnderline} ${
            isAccountActive ? "after:w-full" : ""
          }`}
        >
          <div className="flex flex-col items-center text-sm leading-tight">
            <span>Logowanie</span>
            <span>Rejestracja</span>
          </div>
        </Link>
      ) : (
        <Link
          href="/account"
          className={`text-moon-contrast ${hoverUnderline} ${
            isAccountActive ? "after:w-full" : ""
          } text-sm`}
        >
          Konto
        </Link>
      )}
    </div>
  );
}
