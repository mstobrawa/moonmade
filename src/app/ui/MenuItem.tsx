"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

export default function MenuItem({
  href,
  label,
  onClick,
  className = "",
}: MenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`moon-nav-text group relative py-2 text-[0.72rem] transition-all duration-300 ease-out ${
        isActive
          ? "text-moon-rose-dark"
          : "text-moon-contrast/78 hover:text-moon-contrast"
      } ${className}`}
    >
      {label}
      <span
        aria-hidden
        className={`absolute inset-x-0 -bottom-0.5 h-px origin-center rounded-full bg-moon-rose transition-transform duration-300 ease-out ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}
