import StaticPageLayout from "@/app/ui/StaticPageLayout";

export default function DostawaPage() {
  return (
    <StaticPageLayout title="Dostawa">
      <h2>Obszar dostawy</h2>
      <p>
        Sklep <strong>moonmade.pl</strong> realizuje wysyłki wyłącznie na
        terenie Polski. Obecnie nie prowadzimy wysyłek zagranicznych.
      </p>

      <h2>Forma dostawy</h2>
      <p>
        Wszystkie zamówienia realizowane są za pośrednictwem firmy{" "}
        <strong>InPost</strong>.
      </p>

      <h3>Dostępne metody dostawy:</h3>
      <ul>
        <li>
          <strong>Paczkomat® → Paczkomat®</strong>
        </li>
        <li>
          <strong>Paczkomat® → Dom lub firma</strong>
        </li>
      </ul>

      <h2>Rozmiar przesyłki</h2>
      <p>
        W sklepie dostępna jest wyłącznie wysyłka małych paczek, odpowiednich do
        biżuterii ręcznie wykonanej.
      </p>

      <ul>
        <li>
          <strong>Mała paczka</strong> – maks. wymiary: 8 × 38 × 64 cm, maks.
          waga: 25 kg
        </li>
      </ul>

      <h2>Koszty dostawy</h2>

      <ul>
        <li>
          <strong>Paczkomat® → Paczkomat®:</strong> 16,99 zł
        </li>
        <li>
          <strong>Paczkomat® → Dom lub firma:</strong> 19,99 zł
        </li>
      </ul>

      <p>
        Koszt dostawy jest doliczany do zamówienia na etapie składania
        zamówienia i widoczny przed jego finalnym potwierdzeniem.
      </p>

      <h2>Czas dostawy</h2>
      <p>
        Przewidywany czas dostawy wynosi zazwyczaj od 1 do 3 dni roboczych od
        momentu nadania przesyłki, w zależności od wybranej formy dostawy oraz
        aktualnej dostępności paczkomatów.
      </p>
    </StaticPageLayout>
  );
}
