"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-moon-white rounded-xl shadow-md p-4">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.images[0] ?? "/placeholder.webp"}
          alt={product.title}
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </div>

      <h3 className="text-lg mb-2">{product.title}</h3>
      <p className="text-sm mb-1.5">{product.description}</p>
      <p className="font-semibold mb-3">{product.price} zł</p>

      <Link href={`/products/${product.slug}`} className="inline-block">
        <Button>Szczegóły</Button>
      </Link>
    </div>
  );
}
