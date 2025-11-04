"use client";
import Button from "./Button";
import Link from "next/link";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  slug: string;
  title: string;
  description: string;
  price: string;
  imgSrc: string;
}

export default function ProductCard({
  slug,
  title,
  description,
  price,
  imgSrc,
  className = "",
  ...props
}: ProductCardProps) {
  return (
    <div
      className={`bg-moon-white rounded-xl shadow-md p-4 ${className}`}
      {...props}
    >
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h3 className="text-lg mb-2">{title}</h3>
      <h2 className="text-md mb-1.5">{description}</h2>
      <p className="">{price}</p>
      <Link href={`/products/${slug}`} className="inline-block">
        <Button> Szczegóły </Button>
      </Link>
    </div>
  );
}
