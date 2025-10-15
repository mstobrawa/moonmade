import type { Metadata } from "next";
import "./globals.css";
import { playfair, montserrat } from "@/app/ui/fonts";

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
        className={`${playfair.variable} ${montserrat.variable} antialiased font-playfair bg-moon-cream text-moon-rose-dark tracking-wider`}
      >
        {children}
      </body>
    </html>
  );
}
