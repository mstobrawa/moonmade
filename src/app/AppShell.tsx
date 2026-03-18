"use client";

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

  return (
    <>
      <ScrollToTop />
      {isAdminRoute ? (
        <div className="flex min-h-screen flex-col">{children}</div>
      ) : (
        <>
          <div className="sticky inset-x-0 top-0 z-40">
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
