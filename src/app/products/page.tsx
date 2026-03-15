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
    <main className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-16">
      <HeroCard className="mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-moon-rose-dark">
          Kolekcja Moonmade
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Ręcznie tworzona biżuteria z kamieni naturalnych
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-moon-contrast/75">
          Każdy egzemplarz jest unikatowy i powstaje z dbałością o proporcje,
          detal i subtelny blask naturalnych minerałów.
        </p>
      </HeroCard>

      <ProductsGrid products={normalizedProducts} />
    </main>
  );
}
