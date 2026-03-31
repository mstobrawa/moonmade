"use client";

import Image from "next/image";

const PLACEHOLDER = "/placeholder.webp";

export default function ProductCardImage({
  src,
  alt,
}: {
  src?: string | null;
  alt: string;
}) {
  const imageSrc = typeof src === "string" && src.trim().length > 0 ? src : PLACEHOLDER;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
}
