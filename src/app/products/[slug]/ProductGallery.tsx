"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images?: string[] | null;
  title?: string | null;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  // 🛡️ zabezpieczenia
  const safeImages =
    Array.isArray(images) && images.length > 0 ? images : ["/placeholder.webp"];

  const safeTitle =
    typeof title === "string" && title.trim().length > 0
      ? title
      : "Produkt Moonmade";

  const [activeImage, setActiveImage] = useState<string>(safeImages[0]);

  return (
    <div className="space-y-4">
      {/* =====================
          GŁÓWNE ZDJĘCIE
         ===================== */}
      <div className="relative w-full aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-moon-cream">
        <Image
          src={activeImage}
          alt={safeTitle}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* =====================
          MINIATURY
         ===================== */}
      {safeImages.length > 1 && (
        <div className="flex gap-3 justify-center md:justify-start">
          {safeImages.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition
                ${
                  activeImage === img
                    ? "border-moon-rose"
                    : "border-transparent hover:border-moon-rose-light"
                }`}
              aria-label={`Pokaż zdjęcie ${index + 1}`}
            >
              <Image
                src={img}
                alt={`${safeTitle} – zdjęcie ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
