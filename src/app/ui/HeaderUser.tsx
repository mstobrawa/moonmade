"use client";

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
    <div className="flex items-center gap-4">
      {/* 🛒 Koszyk */}
      <Link
        href="/cart"
        className={`relative inline-flex items-center justify-center py-2 text-moon-contrast transition-all duration-300 ease-out hover:scale-[1.03] hover:opacity-80 ${hoverUnderline} ${
          isCartActive ? "after:w-full" : ""
        }`}
        aria-label="Koszyk"
      >
        <span className="relative inline-flex items-center justify-center">
          <ShoppingCart size={22} strokeWidth={1.8} />

          {isHydrated && totalItems > 0 && (
            <Badge
              variant="rose"
              className="absolute -right-2.5 -top-2 h-[18px] min-w-[18px] text-[10px] shadow-[0_8px_18px_rgba(47,42,40,0.12)]"
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
