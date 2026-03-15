import type { ReactNode } from "react";

interface HeroCardProps {
  children: ReactNode;
  className?: string;
}

export default function HeroCard({
  children,
  className = "",
}: HeroCardProps) {
  return (
    <div
      className={`mx-auto w-full max-w-5xl rounded-2xl border border-[#e7ddd6] bg-gradient-to-r from-[#faf6f1] via-[#faebda] to-[#f2e1d6] p-10 shadow-sm md:p-14 ${className}`}
    >
      {children}
    </div>
  );
}
