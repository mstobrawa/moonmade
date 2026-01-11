"use client";

import React from "react";
import FooterColumn from "./FooterColumn";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="bg-moon-contrast text-moon-cream py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <FooterColumn
          title="Informacje"
          links={[
            { label: "Regulamin", href: "/statute" },
            { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
          ]}
        />
        <FooterColumn
          title="Obsługa klienta"
          links={[
            { label: "Reklamacja/Zwroty", href: "/returns" },
            { label: "Dostawa", href: "/delivery" },
            { label: "Płatności", href: "/payment" },
          ]}
        />
        <FooterColumn
          title="Kontakt"
          links={[
            {
              label: "kontakt@moonmade.pl",
              href: "mailto:kontakt@moonmade.pl",
            },
            {
              label: "Instagram",
              href: "https://www.instagram.com/moonmade.pl",
            },
          ]}
        />
      </div>
      <FooterBottom />
    </footer>
  );
}
