export const dynamic = "force-dynamic";
export const revalidate = 0;

import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import { supabaseServer as supabase } from "@/lib/supabase/server";

import ProductGallery from "./ProductGallery";
import AddToCartButton from "@/app/ui/AddToCartButton";
import Button from "@/app/ui/Button";
import Link from "next/link";

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
    <main className="min-h-screen bg-moon-cream px-6 py-16">
      <div className="max-w-5xl mx-auto bg-moon-white rounded-2xl shadow-md p-8 grid md:grid-cols-2 gap-10">
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
            <h1 className="text-3xl font-bold text-moon-contrast mb-2">
              {product.title}
            </h1>

            <p className="text-lg text-moon-contrast leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Cena */}
          <p className="text-2xl font-semibold">{product.price} zł</p>

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
              <Link href="/products">
                <Button variant="outline" className="w-full">
                  ← Wróć
                </Button>
              </Link>

              <Link href="/cart">
                <Button className="w-full">Koszyk</Button>
              </Link>
            </div>
          </div>

          {/* Info dodatkowe */}
          <div className="pt-4 border-t text-sm text-moon-rose-dark">
            Unikat – dostępna tylko 1 sztuka
          </div>
        </div>
      </div>
    </main>
  );
}
