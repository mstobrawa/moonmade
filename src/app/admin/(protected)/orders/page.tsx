import { supabaseServer } from "@/lib/supabase/server";
import AdminOrdersManager from "../../_components/AdminOrdersManager";

export default async function AdminOrdersPage() {
  const { data: orders, error } = await supabaseServer
    .from("orders")
    .select(
      "id, created_at, status, total, shipping_method, shipping_cost, customer_name, email, phone, address, items, paid_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return <AdminOrdersManager initialOrders={orders ?? []} />;
}
