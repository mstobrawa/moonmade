import type { Metadata } from "next";
import "./globals.css";
import { playfair, montserrat } from "@/app/ui/fonts";
import { CartProvider } from "./(store)/cart/CartContext";
import AppShell from "./AppShell";
import TestRibbon from "./ui/TestRibbon";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://moonmade.pl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Moonmade | Ręcznie tworzona biżuteria z kamieni naturalnych",
    template: "%s | Moonmade",
  },
  description:
    "Unikatowa, ręcznie tworzona biżuteria z naturalnych kamieni. Moonmade to autorskie naszyjniki i bransoletki tworzone z miłości do detalu.",
  applicationName: "Moonmade",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "/",
    siteName: "Moonmade",
    title: "Moonmade | Ręcznie tworzona biżuteria z kamieni naturalnych",
    description:
      "Autorska biżuteria z kamieni naturalnych tworzona ręcznie w krótkich, unikatowych seriach.",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Moonmade",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moonmade | Ręcznie tworzona biżuteria z kamieni naturalnych",
    description:
      "Autorska biżuteria z kamieni naturalnych tworzona ręcznie w krótkich, unikatowych seriach.",
    images: ["/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.webp",
    apple: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body
        className={`${playfair.variable} ${montserrat.variable} flex min-h-screen flex-col bg-moon-cream text-moon-contrast antialiased`}
      >
        <CartProvider>
          <TestRibbon />
          <AppShell>{children}</AppShell>
        </CartProvider>
      </body>
    </html>
  );
}
