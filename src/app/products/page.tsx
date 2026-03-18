import ProductsGrid from "../ui/ProductsGrid";
import { supabaseServer as supabase } from "@/lib/supabase/server";

type StoreProduct = {
  id: string;
  slug: string;
  title: string;
  price: number;
  description: string;
  images: string[];
};

export const revalidate = 60;

export default async function ProductPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_available", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="p-4">
        <p>Blad ladowania produktow</p>
      </main>
    );
  }

  const normalizedProducts: StoreProduct[] = (products ?? []).map((product) => ({
    id: String(product.id),
    slug: String(product.slug),
    title: String(product.title),
    price: Number(product.price),
    description: String(product.description ?? ""),
    images: Array.isArray(product.images)
      ? product.images.filter(
          (image: unknown): image is string => typeof image === "string",
        )
      : [],
  }));

  return (
    <main className="mx-auto w-full max-w-275 px-6 py-4">
      <ProductsGrid products={normalizedProducts} />
    </main>
  );
}
