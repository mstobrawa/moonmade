import type { Metadata } from "next";
import ProductsGrid from "../ui/ProductsGrid";
import {
  getSupabaseServer,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";

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
  if (!isSupabaseServerConfigured()) {
    return (
      <main className="store-page-spacing mx-auto max-w-275 px-6">
        <div className="rounded-[2rem] border border-moon-contrast/10 bg-white/70 p-8 text-center shadow-sm">
          <h1 className="text-2xl text-moon-contrast">Produkty w przygotowaniu</h1>
          <p className="mt-3 text-sm leading-7 text-moon-contrast/72">
            Lokalna konfiguracja Supabase nie jest jeszcze ustawiona, dlatego
            lista produktow jest chwilowo niedostepna.
          </p>
        </div>
      </main>
    );
  }

  const supabase = getSupabaseServer();
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="store-page-spacing mx-auto max-w-275 px-6">
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
    <main className="store-page-spacing mx-auto max-w-275 px-6">
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
