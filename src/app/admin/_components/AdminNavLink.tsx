"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function AdminNavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "rounded-full px-4 py-2 text-sm tracking-[0.08em] transition",
        isActive
          ? "bg-moon-contrast text-[#faf9f6] shadow-[0_12px_28px_rgba(47,42,40,0.18)]"
          : "text-moon-contrast/72 hover:bg-moon-white/65 hover:text-moon-contrast",
      )}
    >
      {label}
    </Link>
  );
}
