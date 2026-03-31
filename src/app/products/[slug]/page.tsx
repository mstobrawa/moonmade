import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseServer as supabase } from "@/lib/supabase/server";
import ProductDetailView from "./ProductDetailView";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProduct(slug: string) {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !product) {
    return null;
  }

  return product;
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Produkt niedostepny",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    String(product.description ?? "").trim() ||
    `Poznaj produkt ${product.title} od Moonmade.`;

  const image =
    Array.isArray(product.images) && typeof product.images[0] === "string"
      ? product.images[0]
      : "/placeholder.webp";

  return {
    title: String(product.title),
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      type: "website",
      url: `/products/${product.slug}`,
      title: `${product.title} | Moonmade`,
      description,
      images: [
        {
          url: image,
          alt: String(product.title),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Moonmade`,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: String(product.title),
    description: String(product.description ?? ""),
    image: Array.isArray(product.images) ? product.images : [],
    offers: {
      "@type": "Offer",
      priceCurrency: "PLN",
      price: Number(product.price),
      availability: product.is_available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `/products/${product.slug}`,
    },
    brand: {
      "@type": "Brand",
      name: "Moonmade",
    },
  };

  return (
    <main className="min-h-screen bg-moon-cream px-6 py-8 md:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailView product={product} />
    </main>
  );
}
