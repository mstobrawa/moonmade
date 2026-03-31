import { supabaseServer } from "@/lib/supabase/server";
import {
  hasMissingOriginalPriceColumn,
  LEGACY_PRODUCT_SELECT,
  PRODUCT_SELECT,
} from "@/lib/admin/products";
import AdminProductsManager from "../../_components/AdminProductsManager";

export default async function AdminProductsPage() {
  let query = supabaseServer
    .from("products")
    .select(PRODUCT_SELECT)
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  let { data: products, error } = await query;

  if (hasMissingOriginalPriceColumn(error?.message)) {
    query = supabaseServer
      .from("products")
      .select(LEGACY_PRODUCT_SELECT)
      .order("position", { ascending: true })
      .order("created_at", { ascending: false });

    ({ data: products, error } = await query);
  }

  if (error) {
    throw new Error(error.message);
  }

  return <AdminProductsManager initialProducts={products ?? []} />;
}
