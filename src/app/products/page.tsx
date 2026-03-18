import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Produkty",
  description:
    "Poznaj kolekcję Moonmade: ręcznie tworzone naszyjniki i bransoletki z kamieni naturalnych.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Produkty | Moonmade",
    description:
      "Kolekcja unikatowej biżuterii Moonmade tworzonej ręcznie z naturalnych kamieni.",
    url: "/products",
  },
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
      <header className="sr-only">
        <h1>Produkty Moonmade</h1>
        <p>
          Ręcznie tworzona biżuteria z kamieni naturalnych dostępna w krótkich,
          unikatowych seriach.
        </p>
      </header>

      <ProductsGrid products={normalizedProducts} />
    </main>
  );
}
