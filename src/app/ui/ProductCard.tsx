"use client";

import Link from "next/link";
import Button from "./Button";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-moon-white rounded-xl shadow-md p-4">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h3 className="text-lg mb-2">{product.title}</h3>
      <p className="text-sm mb-1.5">{product.description}</p>
      <p className="font-semibold mb-3">{product.price} zł</p>

      <Link href={`/products/${product.slug}`} className="inline-block">
        <Button>Szczegóły</Button>
      </Link>
    </div>
  );
}
