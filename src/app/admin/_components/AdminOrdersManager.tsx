"use client";

import { useState } from "react";

type OrderItem = {
  id: string;
  title: string;
  price: number;
  image?: string;
};

type AdminOrder = {
  id: string;
  created_at: string | null;
  status: string;
  total: number;
  shipping_method: string | null;
  shipping_cost: number | null;
  customer_name: string | null;
  email: string | null;
  phone: string | null;
  address: Record<string, unknown> | null;
  items: OrderItem[] | null;
  paid_at: string | null;
};

const availableStatuses = ["new", "paid", "completed", "cancelled"];

export default function AdminOrdersManager({
  initialOrders,
}: {
  initialOrders: AdminOrder[];
}) {
  const [orders, setOrders] = useState(initialOrders);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleStatusChange(orderId: string, status: string) {
    setBusyId(orderId);
    setError("");

    const response = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = (await response.json()) as {
      error?: string;
      order?: AdminOrder;
    };

    setBusyId(null);

    if (!response.ok || !data.order) {
      setError(data.error ?? "Nie udalo sie zapisac statusu.");
      return;
    }

    setOrders((current) =>
      current.map((order) => (order.id === orderId ? data.order! : order)),
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-moon-rose-dark">
          Zamowienia
        </p>
        <h2 className="text-3xl text-moon-contrast">Obsluga zamowien</h2>
        <p className="max-w-2xl text-sm leading-7 text-moon-contrast/72">
          Tu mozesz podejrzec szczegoly zamowien i recznie aktualizowac ich status.
          Statystyki i bardziej rozbudowany workflow dolozymy pozniej.
        </p>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="space-y-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-[1.5rem] border border-moon-contrast/10 bg-moon-white/65 p-5 shadow-sm"
          >
            <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl text-moon-contrast">
                    Zamowienie #{order.id.slice(0, 8)}
                  </h3>
                  <span className="rounded-full bg-moon-contrast/8 px-3 py-1 text-xs uppercase tracking-[0.12em] text-moon-contrast/70">
                    {order.status}
                  </span>
                </div>

                <div className="grid gap-3 text-sm text-moon-contrast/72 md:grid-cols-2">
                  <p>Klient: {order.customer_name ?? "-"}</p>
                  <p>Email: {order.email ?? "-"}</p>
                  <p>Telefon: {order.phone ?? "-"}</p>
                  <p>Wysylka: {order.shipping_method ?? "-"}</p>
                  <p>Suma: {order.total} zl</p>
                  <p>Koszt dostawy: {order.shipping_cost ?? 0} zl</p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-moon-rose-dark">
                    Produkty
                  </p>
                  <div className="space-y-2">
                    {(order.items ?? []).map((item) => (
                      <div
                        key={`${order.id}-${item.id}`}
                        className="rounded-xl border border-moon-contrast/8 bg-[#faf6f1] px-4 py-3 text-sm text-moon-contrast/78"
                      >
                        {item.title} - {item.price} zl
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-[1.25rem] border border-moon-contrast/8 bg-[linear-gradient(135deg,rgba(250,246,241,0.95),rgba(242,225,214,0.74))] p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moon-rose-dark">
                    Aktualizacja statusu
                  </p>
                  <select
                    value={order.status}
                    onChange={(event) =>
                      handleStatusChange(order.id, event.target.value)
                    }
                    disabled={busyId === order.id}
                    className="mt-3 w-full rounded-xl border border-moon-contrast/12 bg-moon-white/90 px-4 py-3 text-sm text-moon-contrast outline-none transition focus:border-moon-rose-dark/50"
                  >
                    {availableStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 text-sm text-moon-contrast/68">
                  <p>Data: {order.created_at ? new Date(order.created_at).toLocaleString("pl-PL") : "-"}</p>
                  <p>Oplacone: {order.paid_at ? new Date(order.paid_at).toLocaleString("pl-PL") : "nie"}</p>
                  <p>Adres: {order.address ? JSON.stringify(order.address) : "-"}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
