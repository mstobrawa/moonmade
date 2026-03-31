"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./ui/Header";
import SubHeader from "./ui/SubHeader";
import Footer from "./ui/Footer";
import ScrollToTop from "./ui/ScrollToTop";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (isAdminRoute) return;

    const scrollThreshold = 5;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (Math.abs(delta) <= scrollThreshold) {
        return;
      }

      if (currentScrollY <= 16 || delta < 0) {
        setIsHeaderHidden(false);
      } else if (delta > 0) {
        setIsHeaderHidden(true);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAdminRoute]);

  return (
    <>
      <ScrollToTop />
      {isAdminRoute ? (
        <div className="flex min-h-screen flex-col">{children}</div>
      ) : (
        <>
          <div
            className={`sticky inset-x-0 top-0 z-40 transition-transform duration-300 will-change-transform ${
              isHeaderHidden ? "-translate-y-full" : "translate-y-0"
            }`}
          >
            <Header />
            <SubHeader />
          </div>
          <div className="flex grow flex-col">{children}</div>
          <Footer />
        </>
      )}
    </>
  );
}
