// src/app/ui/Badge.tsx
import React from "react";
import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "rose" | "contrast";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variantClass = {
    default: "bg-moon-rose text-moon-cream",
    rose: "bg-moon-rose-dark text-moon-cream",
    contrast: "bg-moon-contrast text-moon-cream",
  }[variant];

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center min-w-[20px] h-[20px] rounded-full text-[11px] font-semibold px-1.5",
        variantClass,
        className
      )}
    >
      {children}
    </span>
  );
}
