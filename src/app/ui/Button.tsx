"use client";

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
    "inline-flex items-center justify-center rounded-xl transition font-semibold";

  const variants = {
    primary: "bg-moon-rose text-moon-white hover:bg-moon-rose-dark",
    secondary:
      "bg-moon-rose-light text-moon-contrast hover:bg-moon-rose-dark hover:text-moon-cream",
    outline:
      "border border-moon-contrast text-moon-contrast bg-transparent hover:bg-moon-contrast hover:text-moon-cream",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const allClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (as === "a" && href) {
    return (
      <Link href={href} className={allClasses}>
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
