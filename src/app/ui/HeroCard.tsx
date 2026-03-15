import type { ReactNode } from "react";

interface HeroCardProps {
  children: ReactNode;
  className?: string;
}

export default function HeroCard({ children, className = "" }: HeroCardProps) {
  return (
    <div
      className={`mx-auto w-full max-w-4xl rounded-2xl border border-[#e7ddd6] bg-linear-to-r from-[#faf6f1] via-[#faebda] to-[#f2e1d6] p-6 shadow-sm md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
