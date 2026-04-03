"use client";

import { usePathname } from "next/navigation";

export default function TestRibbon() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-0 top-0 z-[80] h-28 w-28 overflow-hidden sm:h-32 sm:w-32">
      <div className="absolute right-[-2.55rem] top-[2.2rem] w-[10.5rem] rotate-45 bg-[#f2e6a8]/95 py-1 text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-black shadow-[0_8px_18px_rgba(47,42,40,0.16)] sm:right-[-2.35rem] sm:top-[2.45rem] sm:w-[11.5rem] sm:text-[0.65rem]">
        PREWIEV
      </div>
    </div>
  );
}
