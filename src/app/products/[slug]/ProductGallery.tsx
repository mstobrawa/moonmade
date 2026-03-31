"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images?: string[] | null;
  title?: string | null;
}

const PLACEHOLDER = "/placeholder.webp";

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const galleryImages = useMemo(() => {
    const safeImages =
      Array.isArray(images) && images.length > 0
        ? images.filter(
            (image): image is string =>
              typeof image === "string" && image.trim().length > 0,
          )
        : [];

    return safeImages.length > 0 ? safeImages : [PLACEHOLDER];
  }, [images]);

  const safeTitle =
    typeof title === "string" && title.trim().length > 0
      ? title
      : "Produkt Moonmade";

  const [activeImage, setActiveImage] = useState<string>(galleryImages[0]);

  useEffect(() => {
    setActiveImage(galleryImages[0]);
  }, [galleryImages]);

  return (
    <div className="space-y-2.5 md:max-w-[22rem]">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-[#e7ddd6] bg-[linear-gradient(180deg,rgba(250,245,240,0.96),rgba(231,216,206,0.68))] md:aspect-[4/5]">
        <Image
          src={activeImage}
          alt={safeTitle}
          fill
          priority
          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {galleryImages.length > 1 && (
        <div className="flex justify-center gap-2 md:justify-start">
          {galleryImages.map((img, index) => (
            <button
              key={`${img}-${index}`}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative h-14 w-14 overflow-hidden rounded-lg border shadow-sm transition-all duration-300 ease-out md:h-16 md:w-16 ${
                activeImage === img
                  ? "border-moon-rose bg-moon-white/70 -translate-y-0.5"
                  : "border-[#e7ddd6] bg-[#f6f1ed] hover:-translate-y-0.5 hover:border-moon-rose-light"
              }`}
              aria-label={`Pokaż zdjęcie ${index + 1}`}
            >
              <Image
                src={img}
                alt={`${safeTitle} - zdjęcie ${index + 1}`}
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
