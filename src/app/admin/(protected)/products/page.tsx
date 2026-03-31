import { supabaseServer } from "@/lib/supabase/server";
import {
  hasMissingOriginalPriceColumn,
  LEGACY_PRODUCT_SELECT,
  PRODUCT_SELECT,
  withNullableOriginalPrice,
} from "@/lib/admin/products";
import AdminProductsManager from "../../_components/AdminProductsManager";

export default async function AdminProductsPage() {
  const initialQuery = supabaseServer
    .from("products")
    .select(PRODUCT_SELECT)
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  let { data: products, error } = await initialQuery;

  if (hasMissingOriginalPriceColumn(error?.message)) {
    const legacyQuery = supabaseServer
      .from("products")
      .select(LEGACY_PRODUCT_SELECT)
      .order("position", { ascending: true })
      .order("created_at", { ascending: false });

    const legacyResult = await legacyQuery;
    products =
      legacyResult.data?.map((product) => withNullableOriginalPrice(product)) ?? null;
    error = legacyResult.error;
  }

  if (error) {
    throw new Error(error.message);
  }

  return <AdminProductsManager initialProducts={products ?? []} />;
}
