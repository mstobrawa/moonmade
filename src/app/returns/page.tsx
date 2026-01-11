import StaticPageLayout from "@/app/ui/StaticPageLayout";

export default function ReklamacjeZwrotyPage() {
  return (
    <StaticPageLayout title="Reklamacje i Zwroty">
      <h2>Zwroty – odstąpienie od umowy</h2>
      <p>
        Konsument ma prawo odstąpić od umowy zawartej na odległość w terminie 14
        dni od otrzymania zamówienia, bez podania przyczyny.
      </p>
      <p>
        Aby skorzystać z prawa odstąpienia od umowy, należy poinformować
        Sprzedawcę drogą mailową na adres: <strong>kontakt@moonmade.pl</strong>
      </p>

      <h3>Warunki zwrotu</h3>
      <ul>
        <li>produkt nie może nosić śladów użytkowania,</li>
        <li>produkt powinien zostać zwrócony w stanie niezmienionym,</li>
        <li>
          produkt należy odesłać nie później niż w terminie 14 dni od zgłoszenia
          odstąpienia.
        </li>
      </ul>
      <p>Koszt odesłania produktu ponosi Kupujący.</p>
      <p>
        Zwrot środków nastąpi w terminie do 14 dni od otrzymania zwróconego
        produktu, przy użyciu tej samej metody płatności.
      </p>

      <h3>Wyjątki od prawa zwrotu</h3>
      <p>
        Prawo odstąpienia od umowy nie przysługuje w przypadku produktów
        wykonywanych na indywidualne zamówienie oraz produktów
        personalizowanych.
      </p>

      <h2>Reklamacje</h2>
      <p>Sprzedawca odpowiada wobec Konsumenta za zgodność produktu z umową.</p>
      <p>
        Reklamacje należy zgłaszać drogą mailową na adres:{" "}
        <strong>kontakt@moonmade.pl</strong>
      </p>

      <h3>Zgłoszenie reklamacyjne powinno zawierać:</h3>
      <ul>
        <li>imię i nazwisko,</li>
        <li>numer zamówienia,</li>
        <li>opis problemu,</li>
        <li>zdjęcia produktu (jeśli to możliwe).</li>
      </ul>

      <p>
        Reklamacje rozpatrywane są w terminie do 14 dni od dnia ich otrzymania.
      </p>

      <h3>Produkty unikatowe</h3>
      <p>
        Ze względu na ręczne wykonanie oraz unikatowy charakter produktów,
        poszczególne egzemplarze mogą nieznacznie różnić się od zdjęć
        prezentowanych na stronie. Nie stanowi to podstawy do reklamacji.
      </p>
    </StaticPageLayout>
  );
}
