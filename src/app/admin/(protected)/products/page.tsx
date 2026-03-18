import { supabaseServer } from "@/lib/supabase/server";
import AdminProductsManager from "../../_components/AdminProductsManager";

export default async function AdminProductsPage() {
  const { data: products, error } = await supabaseServer
    .from("products")
    .select("id, slug, title, description, price, images, is_available, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return <AdminProductsManager initialProducts={products ?? []} />;
}
