export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { supabaseServer as supabase } from "@/lib/supabase/server";
import Image from "next/image";
import Button from "@/app/ui/Button";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
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
      <div className="max-w-3xl mx-auto bg-moon-white rounded-2xl shadow-md p-8 space-y-6">
        <div className="relative w-full h-80 rounded-xl overflow-hidden">
          <Image
            src={product.images?.[0] ?? "/placeholder.webp"}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-3xl font-bold">{product.title}</h1>

        <p className="text-lg text-moon-contrast">{product.description}</p>

        <p className="text-2xl font-semibold">{product.price} zł</p>

        <Button>Dodaj do koszyka</Button>
      </div>
    </main>
  );
}
