import type { Metadata } from "next";
import "./globals.css";
import { playfair, montserrat } from "@/app/ui/fonts";
import { CartProvider } from "./(store)/cart/CartContext";
import AppShell from "./AppShell";

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
          <AppShell>{children}</AppShell>
        </CartProvider>
      </body>
    </html>
  );
}
