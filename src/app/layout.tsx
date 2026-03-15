import type { Metadata } from "next";
import "./globals.css";
import { playfair, montserrat } from "@/app/ui/fonts";
import Header from "./ui/Header";
import SubHeader from "./ui/SubHeader";
import Footer from "./ui/Footer";
import ScrollToTop from "./ui/ScrollToTop";
import { CartProvider } from "./(store)/cart/CartContext";

export const metadata: Metadata = {
  title: "Moonmade.pl - Z miłości do kamieni",
  description: "Unikatowa biżuteria z kamieni naturalnych",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body
        className={`${playfair.variable} ${montserrat.variable} min-h-screen bg-moon-cream text-moon-contrast antialiased flex flex-col`}
      >
        <CartProvider>
          <ScrollToTop />
          <div className="sticky inset-x-0 top-0 z-40">
            <Header />
            <SubHeader />
          </div>
          <main className="grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
