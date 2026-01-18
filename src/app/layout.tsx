import type { Metadata } from "next";
import "./globals.css";
import { playfair, montserrat } from "@/app/ui/fonts";
import Header from "./ui/Header";
import SubHeader from "./ui/SubHeader";
import Footer from "./ui/Footer";
import { CartProvider } from "./(store)/cart/CartContext";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Moonmade.pl - Z miłości do kamieni",
  description: "Moonmade.pl Unikatowa biżuteria z kamieni naturalnych",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased font-playfair bg-moon-cream text-moon-rose-dark tracking-wider min-h-screen flex flex-col`}
      >
        <CartProvider>
          <Header />
          <SubHeader />
          <main className="flex-grow"> {children} </main>
          <Footer />
        </CartProvider>
        <Script
          src="https://geowidget.inpost.pl/inpost-geowidget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
