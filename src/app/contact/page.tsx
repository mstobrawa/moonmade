import type { Metadata } from "next";
import StaticPageLayout from "@/app/ui/StaticPageLayout";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skontaktuj się z Moonmade w sprawie biżuterii i zamówień.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <StaticPageLayout title="Kontakt">
      <p className="max-w-xl text-lg leading-8 text-moon-contrast/76">
        Masz pytania dotyczące biżuterii, dostępności unikatów lub zamówień
        indywidualnych?
      </p>

      <p className="text-lg leading-8">
        Napisz do nas:
        <br />
        <a
          href="mailto:kontakt@moonmade.pl"
          className="font-semibold text-moon-rose transition-colors duration-300 hover:text-moon-rose-dark hover:underline"
        >
          kontakt@moonmade.pl
        </a>
      </p>

      <p className="text-sm tracking-[0.16em] text-moon-rose-dark">
        Odpowiadamy zazwyczaj w ciągu 24 godzin
      </p>
    </StaticPageLayout>
  );
}
