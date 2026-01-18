export const dynamic = "force-dynamic";
export const revalidate = 0;

import { unstable_noStore as noStore } from "next/cache";
import { supabaseServer as supabase } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

import Button from "@/app/ui/Button";
import AddToCartButton from "@/app/ui/AddToCartButton";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  noStore();

  const { slug } = await params;

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_available", true)
    .maybeSingle();

  // 🟠 BEZPIECZNY FALLBACK (bez notFound)
  if (!product) {
    return (
      <main className="min-h-screen bg-moon-cream px-6 py-16 flex items-center justify-center">
        <div className="bg-moon-white p-8 rounded-2xl shadow-md text-center max-w-md space-y-6">
          <h1 className="text-2xl font-bold">Produkt niedostępny</h1>

          <p className="text-moon-contrast">
            Ten produkt nie jest obecnie dostępny lub został usunięty.
          </p>

          <Link href="/products">
            <Button>Wróć do produktów</Button>
          </Link>
        </div>
      </main>
    );
  }

  // 🟢 NORMALNY WIDOK PRODUKTU
  return (
    <main className="min-h-screen bg-moon-cream px-6 py-16">
      <div className="max-w-4xl mx-auto bg-moon-white rounded-2xl shadow-md p-8 grid gap-8 md:grid-cols-2">
        {/* 🖼️ Zdjęcie */}
        <div className="relative w-full h-80 md:h-full rounded-xl overflow-hidden">
          <Image
            src={product.images?.[0] ?? "/placeholder.webp"}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 📄 Dane produktu */}
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>

            <p className="text-lg text-moon-contrast">{product.description}</p>

            <p className="text-2xl font-semibold">{product.price} zł</p>

            <p className="text-sm text-moon-rose-dark">
              Unikat – dostępna 1 sztuka
            </p>
          </div>

          {/* 🛒 Akcje */}
          <div className="space-y-4">
            {/* Dodawanie do koszyka – BLOKUJE SIĘ */}
            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.images?.[0] ?? "/placeholder.webp",
              }}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/products" className="flex-1">
                <Button variant="outline" className="w-full">
                  ← Wróć do produktów
                </Button>
              </Link>

              <Link href="/cart" className="flex-1">
                <Button className="w-full">Przejdź do koszyka</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
