export const dynamic = "force-dynamic";
export const revalidate = 0;

import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import { supabaseServer as supabase } from "@/lib/supabase/server";

import ProductGallery from "./ProductGallery";
import AddToCartButton from "@/app/ui/AddToCartButton";
import Button from "@/app/ui/Button";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  noStore();

  const { slug } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_available", true)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-moon-cream px-6 py-10 md:py-12">
      <div className="mx-auto grid max-w-5xl gap-10 rounded-2xl border border-[#e7ddd6] bg-gradient-to-r from-[#faf6f1] via-[#faebda] to-[#f2e1d6] p-6 shadow-sm md:grid-cols-2 md:p-10">
        {/* =====================
            GALERIA
           ===================== */}
        <ProductGallery images={product.images} title={product.title} />

        {/* =====================
            INFORMACJE
           ===================== */}
        <div className="flex flex-col gap-6">
          {/* Tytuł + opis */}
          <div>
            <h1 className="mb-3 text-4xl font-semibold leading-tight text-moon-contrast">
              {product.title}
            </h1>

            <p className="text-base leading-8 text-moon-contrast/78 sm:text-lg">
              {product.description}
            </p>
          </div>

          {/* Cena */}
          <p className="text-2xl font-semibold tracking-[0.01em] text-moon-rose-dark">
            {product.price} zł
          </p>

          {/* CTA */}
          <div className="space-y-3">
            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.images?.[0] ?? "/placeholder.webp",
              }}
            />

            <div className="grid grid-cols-2 gap-3">
              <Button
                as="a"
                href="/products"
                variant="outline"
                className="w-full bg-moon-white/80 shadow-[0_10px_22px_rgba(47,42,40,0.06)]"
              >
                ← Wróć
              </Button>

              <Button as="a" href="/cart" className="w-full">
                Koszyk
              </Button>
            </div>
          </div>

          {/* Info dodatkowe */}
          <div className="border-t border-[#dccdc4] pt-4 text-sm tracking-[0.06em] text-moon-rose-dark">
            Unikat – dostępna tylko 1 sztuka
          </div>
        </div>
      </div>
    </main>
  );
}
