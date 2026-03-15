"use client";

import clsx from "clsx";
import React from "react";
import Link from "next/link";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  as?: "button" | "a";
  href?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as = "button",
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full border border-transparent font-semibold tracking-[0.01em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moon-rose/40 focus-visible:ring-offset-2 focus-visible:ring-offset-moon-cream active:scale-[0.99]";

  const variants = {
    primary:
      "bg-gradient-to-r from-moon-rose to-moon-rose-dark text-moon-white shadow-[0_14px_35px_rgba(138,110,108,0.18)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(138,110,108,0.22)]",
    secondary:
      "bg-moon-white/90 text-moon-contrast shadow-[0_10px_25px_rgba(47,42,40,0.08)] hover:-translate-y-0.5 hover:bg-moon-white hover:shadow-[0_14px_32px_rgba(47,42,40,0.12)]",
    outline:
      "border-moon-contrast/20 bg-moon-white/70 text-moon-contrast shadow-[0_10px_25px_rgba(47,42,40,0.06)] hover:-translate-y-0.5 hover:border-moon-rose/40 hover:bg-moon-white hover:shadow-[0_16px_34px_rgba(47,42,40,0.1)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-sm sm:text-base",
    lg: "px-7 py-3.5 text-base sm:text-lg",
  };

  // 🔑 Wykrywamy disabled z propsów
  const isDisabled = props.disabled;

  const disabledStyles = isDisabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const allClasses = clsx(
    baseStyles,
    variants[variant],
    sizes[size],
    disabledStyles,
    className,
  );

  if (as === "a" && href) {
    return (
      <Link href={href} className={allClasses} aria-disabled={isDisabled}>
        {children}
      </Link>
    );
  }

  return (
    <button className={allClasses} {...props}>
      {children}
    </button>
  );
}
