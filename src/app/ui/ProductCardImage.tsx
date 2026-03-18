"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductCardImage({
  src,
  alt,
}: {
  src?: string | null;
  alt: string;
}) {
  const [imgSrc, setImgSrc] = useState(src || "/placeholder.webp");

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={() => setImgSrc("/placeholder.webp")}
    />
  );
}
