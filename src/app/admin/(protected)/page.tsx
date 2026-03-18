import { supabaseServer } from "@/lib/supabase/server";

async function getCount(table: "products" | "orders", filter?: [string, unknown]) {
  let query = supabaseServer.from(table).select("*", { count: "exact", head: true });

  if (filter) {
    query = query.eq(filter[0], filter[1]);
  }

  const { count } = await query;
  return count ?? 0;
}

const stats = [
  {
    label: "Wszystkie produkty",
    key: "products",
  },
  {
    label: "Dostepne produkty",
    key: "availableProducts",
  },
  {
    label: "Wszystkie zamowienia",
    key: "orders",
  },
  {
    label: "Nowe zamowienia",
    key: "newOrders",
  },
] as const;

export default async function AdminDashboardPage() {
  const [products, availableProducts, orders, newOrders] = await Promise.all([
    getCount("products"),
    getCount("products", ["is_available", true]),
    getCount("orders"),
    getCount("orders", ["status", "new"]),
  ]);

  const values = {
    products,
    availableProducts,
    orders,
    newOrders,
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-moon-rose-dark">
          Start
        </p>
        <h2 className="text-3xl text-moon-contrast">Przeglad sklepu</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-moon-contrast/72">
          To jest osobna czesc administracyjna pod przyszle
          {" "}
          <span className="font-semibold">admin.moonmade.pl</span>.
          Masz tu gotowy start pod produkty, zamowienia i kolejne statystyki.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.key}
            className="rounded-[1.5rem] border border-moon-contrast/10 bg-[linear-gradient(135deg,rgba(250,246,241,0.9),rgba(242,225,214,0.72))] p-5 shadow-sm"
          >
            <p className="text-sm text-moon-contrast/68">{stat.label}</p>
            <p className="mt-3 text-4xl text-moon-contrast">
              {values[stat.key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
