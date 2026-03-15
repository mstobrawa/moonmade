import StaticPageLayout from "@/app/ui/StaticPageLayout";

export const metadata = {
  title: "O nas | Moonmade",
  description:
    "Moonmade – ręcznie tworzona biżuteria z naturalnych kamieni. Poznaj naszą historię i filozofię.",
};

export default function AboutPage() {
  return (
    <StaticPageLayout title="O nas">
      <p className="moon-copy">
        Moonmade powstało z miłości do kamieni naturalnych, rękodzieła i
        prostoty. Wierzymy, że biżuteria może być czymś więcej niż dodatkiem –
        może nieść ze sobą emocje, historię i osobisty charakter.
      </p>

      <p className="moon-copy">
        Każdy naszyjnik i każda bransoletka tworzona jest ręcznie, z uważnością
        na detal i szacunkiem do materiałów, z których powstaje. Pracujemy
        wyłącznie z naturalnymi kamieniami, wybierając je nie tylko ze względu
        na wygląd, ale także energię i symbolikę.
      </p>

      <p className="moon-copy">
        Moonmade to mała, niezależna marka. Nie tworzymy masowo i nie
        powielamy wzorów – większość naszych projektów to unikatowe egzemplarze,
        dostępne w jednej sztuce.
      </p>

      <p className="moon-copy">
        Nasza biżuteria znalazła uznanie również poza Polską, m.in. we
        Włoszech. Dziś z radością dzielimy się nią z osobami, które – tak jak my
        – cenią autentyczność, naturalność i ręczną pracę.
      </p>

      <p className="pt-3 text-center text-sm tracking-[0.16em] text-moon-rose-dark">
        Moonmade — z miłości do kamieni 🌙
      </p>
    </StaticPageLayout>
  );
}
