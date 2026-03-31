import type { Metadata } from "next";
import ProductsGrid from "../ui/ProductsGrid";
import { supabaseServer as supabase } from "@/lib/supabase/server";

type StoreProduct = {
  id: string;
  slug: string;
  title: string;
  price: number;
  originalPrice: number | null;
  description: string;
  images: string[];
  available: boolean;
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
    .order("position", { ascending: true })
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
    originalPrice:
      product.original_price === null || product.original_price === undefined
        ? null
        : Number(product.original_price),
    description: String(product.description ?? ""),
    images: Array.isArray(product.images)
      ? product.images.filter(
          (image: unknown): image is string => typeof image === "string",
        )
      : [],
    available: Boolean(product.is_available),
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
