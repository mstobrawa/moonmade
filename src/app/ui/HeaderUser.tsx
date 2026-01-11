"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/(store)/cart/CartContext";
import Badge from "./Badge";

export default function HeaderUser() {
  const pathname = usePathname();
  const { state, isHydrated } = useCart();

  const isCartActive = pathname === "/cart";

  const hoverUnderline =
    "relative after:absolute after:left-1/2 after:-bottom-1 after:w-0 after:h-[2px] after:bg-moon-rose after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full";

  // ✅ UNIKATY → badge = liczba produktów w koszyku
  const totalItems = isHydrated ? state.items.length : 0;

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

          {isHydrated && totalItems > 0 && (
            <Badge
              variant="rose"
              className="absolute -top-2 -right-2 shadow-md"
            >
              {totalItems}
            </Badge>
          )}
        </span>
      </Link>

      {/* 👤 Auth celowo ukryty w headerze (komponenty zostają w projekcie) */}
    </div>
  );
}
