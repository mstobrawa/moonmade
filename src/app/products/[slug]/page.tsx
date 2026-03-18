export const dynamic = "force-dynamic";
export const revalidate = 0;

import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import { supabaseServer as supabase } from "@/lib/supabase/server";

import ProductDetailView from "./ProductDetailView";

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
    <main className="min-h-screen bg-moon-cream px-6 py-8 md:py-8">
      <ProductDetailView product={product} />
    </main>
  );
}
