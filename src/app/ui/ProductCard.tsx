"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.images?.[0] ?? "/placeholder.webp";

  return (
    <div className="bg-moon-white rounded-xl shadow-md p-4 flex flex-col">
      {/* 🖼️ ZDJĘCIE – KWADRAT */}
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl bg-moon-cream">
        <Image
          src={imageSrc}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* 📄 TREŚĆ */}
      <h3 className="text-lg font-medium mb-1">{product.title}</h3>

      <p className="text-sm text-moon-contrast mb-2 line-clamp-2">
        {product.description}
      </p>

      <p className="font-semibold mb-4">{product.price} zł</p>

      {/* CTA NA DOLE */}
      <div className="mt-auto">
        <Link href={`/products/${product.slug}`} className="block">
          <Button className="w-full">Szczegóły</Button>
        </Link>
      </div>
    </div>
  );
}
