import ProductsGrid from "../ui/ProductsGrid";
import { supabaseServer as supabase } from "@/lib/supabase/server";
import HeroCard from "../ui/HeroCard";

type StoreProduct = {
  id: string;
  slug: string;
  title: string;
  price: number;
  description: string;
  images: string[];
};

export const revalidate = 60; // ISR – lista może się odświeżać

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

  const normalizedProducts: StoreProduct[] = (products ?? []).map(
    (product) => ({
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
    }),
  );

  return (
    <main className="mx-auto w-full max-w-275 px-6 py-6">
      <HeroCard className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-moon-rose-dark">
          Kolekcja Moonmade
        </p>

        <h1 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
          Ręcznie tworzona biżuteria z kamieni naturalnych
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-7 text-moon-contrast/75">
          Każdy egzemplarz jest unikatowy i powstaje z dbałością o proporcje,
          detal i subtelny blask naturalnych minerałów.
        </p>
      </HeroCard>

      <ProductsGrid products={normalizedProducts} />
    </main>
  );
}
