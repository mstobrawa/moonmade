import ProductsGrid from "../ui/ProductsGrid";
import { supabase } from "@/lib/supabase/client";

export const revalidate = 60; // odświeżanie danych (ISR)

export default async function ProductPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_available", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="p-4">
        <p>Błąd ładowania produktów</p>
      </main>
    );
  }

  return (
    <main className="p-4">
      <ProductsGrid products={products ?? []} />
    </main>
  );
}
