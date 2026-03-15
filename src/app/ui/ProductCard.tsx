"use client";

import Image from "next/image";
import Button from "./Button";
import { useState } from "react";

export interface StorefrontProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  description: string;
  images?: string[] | null;
}

interface ProductCardProps {
  product: StorefrontProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(
    product.images?.[0] || "/placeholder.webp",
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e7ddd6] bg-linear-to-r from-[#faf6f1] via-[#faebda] to-[#f2e1d6] p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#d8cbc2] hover:shadow-[0_14px_28px_rgba(47,42,40,0.08)]">
      {/* 🖼️ ZDJĘCIE */}
      <div className="relative mb-4 aspect-4/3 w-full flex-none overflow-hidden rounded-xl border border-[#e7ddd6]/90 bg-[linear-gradient(180deg,rgba(250,245,240,0.96),rgba(231,216,206,0.68))]">
        <Image
          src={imgSrc}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImgSrc("/placeholder.webp")}
        />
      </div>

      {/* 📄 TREŚĆ */}
      <h3 className="mb-2 text-xl font-semibold leading-tight text-moon-contrast">
        {product.title}
      </h3>

      <p className="mb-3 line-clamp-3 text-sm leading-6 text-moon-contrast/72">
        {product.description}
      </p>

      <p className="mb-4 text-base font-semibold tracking-[0.01em] text-moon-rose-dark">
        {product.price} zł
      </p>

      {/* CTA */}
      <div className="mt-auto">
        <Button
          as="a"
          href={`/products/${product.slug}`}
          className="w-full bg-moon-white/80 shadow-[0_8px_18px_rgba(47,42,40,0.05)]"
          variant="outline"
        >
          Szczegóły
        </Button>
      </div>
    </article>
  );
}
