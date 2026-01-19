import type { Metadata } from "next";
import "./globals.css";
import { playfair, montserrat } from "@/app/ui/fonts";
import Header from "./ui/Header";
import SubHeader from "./ui/SubHeader";
import Footer from "./ui/Footer";
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
        className={`${playfair.variable} ${montserrat.variable} antialiased font-playfair bg-moon-cream text-moon-rose-dark min-h-screen flex flex-col`}
      >
        <CartProvider>
          <Header />
          <SubHeader />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
