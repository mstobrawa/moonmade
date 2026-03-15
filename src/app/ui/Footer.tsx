import FooterColumn from "./FooterColumn";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-gradient-to-r from-[#2F2A28] via-[#6a625e] to-[#2F2A28] py-14 text-[#FAF9F6]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-3">
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
