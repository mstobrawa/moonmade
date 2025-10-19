// src/app/ui/MenuItem.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  href: string;
  label: string;
  className?: string;
}

export default function MenuItem({
  href,
  label,
  className = "",
}: MenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`group relative px-3 py-2 text-sm font-medium transition-colors duration-200
        ${
          isActive
            ? "text-moon-rose-dark"
            : "text-moon-contrast hover:text-moon-rose-dark"
        }
        ${className}`}
    >
      {label}

      {/* animowane podkreślenie - transform (scaleX) daje płynny efekt od środka */}
      <span
        aria-hidden
        className={`absolute left-0 -bottom-[2px] h-[2px] w-full bg-moon-rose transform origin-center transition-transform duration-300 ease-out
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
      />
    </Link>
  );
}
