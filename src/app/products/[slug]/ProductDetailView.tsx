"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import AddToCartButton from "@/app/ui/AddToCartButton";
import Button from "@/app/ui/Button";

interface ProductDetailViewProps {
  product: {
    id: string;
    title: string;
    price: number;
    description: string;
    images?: string[] | null;
  };
}

const PLACEHOLDER = "/placeholder.webp";
const DEMO_THUMBNAILS = ["/Slide1.webp", "/Slide2.webp", "/Slide3.webp"];

export default function ProductDetailView({
  product,
}: ProductDetailViewProps) {
  const safeImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [PLACEHOLDER];

  const galleryImages =
    safeImages.length > 1
      ? safeImages
      : [safeImages[0], ...DEMO_THUMBNAILS].filter(
          (image, index, arr) => arr.indexOf(image) === index,
        );

  const [activeImage, setActiveImage] = useState<string>(galleryImages[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeIndex = Math.max(galleryImages.indexOf(activeImage), 0);

  const showImageAt = useCallback(
    (index: number) => {
      const normalizedIndex =
        (index + galleryImages.length) % galleryImages.length;
      setActiveImage(galleryImages[normalizedIndex] ?? PLACEHOLDER);
    },
    [galleryImages],
  );

  const closeModal = () => setIsModalOpen(false);
  const showPrevious = useCallback(
    () => showImageAt(activeIndex - 1),
    [activeIndex, showImageAt],
  );
  const showNext = useCallback(
    () => showImageAt(activeIndex + 1),
    [activeIndex, showImageAt],
  );

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, showNext, showPrevious]);

  return (
    <>
      <div className="mx-auto grid max-w-[770px] gap-3.5 rounded-2xl border border-[#e7ddd6] bg-gradient-to-r from-[#faf6f1] via-[#faebda] to-[#f2e1d6] p-3 shadow-sm md:grid-cols-[0.82fr_1fr] md:p-3.5">
        <div className="md:max-w-[18.75rem]">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-[#e7ddd6] bg-[linear-gradient(180deg,rgba(250,245,240,0.96),rgba(231,216,206,0.68))] text-left transition-all duration-300 ease-out hover:border-[#d8cbc2] md:aspect-[4/5.4]"
            aria-label="Powieksz zdjecie produktu"
          >
            <Image
              src={activeImage}
              alt={product.title}
              fill
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 34vw"
              onError={() => setActiveImage(PLACEHOLDER)}
            />
            <span className="absolute inset-x-3 bottom-3 rounded-full bg-[#2f2a28]/70 px-3 py-1 text-[0.62rem] uppercase tracking-[0.12em] text-[#faf9f6] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Kliknij, aby powiekszyc
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <h1 className="mb-1.5 text-lg font-semibold leading-tight text-moon-contrast md:text-[1.35rem]">
              {product.title}
            </h1>

            <p className="text-[0.8rem] leading-5 text-moon-contrast/78 md:text-[0.84rem]">
              {product.description}
            </p>
          </div>

          <p className="text-[0.95rem] font-semibold tracking-[0.01em] text-moon-rose-dark">
            {product.price} zl
          </p>

          <div className="space-y-1.5">
            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                image: galleryImages[0] ?? PLACEHOLDER,
              }}
            />

            <div className="grid grid-cols-2 gap-2">
              <Button
                as="a"
                href="/products"
                variant="outline"
                className="w-full bg-moon-white/80 shadow-[0_10px_22px_rgba(47,42,40,0.06)]"
                size="sm"
              >
                Wroc
              </Button>

              <Button as="a" href="/cart" className="w-full" size="sm">
                Koszyk
              </Button>
            </div>
          </div>

          <div className="border-t border-[#dccdc4] pt-2 text-[0.62rem] tracking-[0.08em] text-moon-rose-dark">
            Unikat - dostepna tylko 1 sztuka
          </div>

          {galleryImages.length > 1 && (
            <div className="space-y-1 border-t border-[#dccdc4] pt-2">
              <p className="text-[0.62rem] uppercase tracking-[0.12em] text-moon-rose-dark">
                Inne ujecia
              </p>

              <div className="flex flex-wrap gap-1.5">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative h-11 w-11 overflow-hidden rounded-lg border shadow-sm transition-all duration-300 ease-out md:h-12 md:w-12 ${
                      activeImage === img
                        ? "border-moon-rose bg-moon-white/70 -translate-y-0.5"
                        : "border-[#e7ddd6] bg-[#f6f1ed] hover:-translate-y-0.5 hover:border-moon-rose-light"
                    }`}
                    aria-label={`Pokaz zdjecie ${index + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} - zdjecie ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f2a28]/82 px-4 py-8 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl border border-[#e7ddd6]/30 bg-[linear-gradient(180deg,rgba(250,246,241,0.12),rgba(242,225,214,0.08))] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-3 top-3 z-10 rounded-full bg-[#faf9f6]/90 px-3 py-1 text-xs tracking-[0.08em] text-moon-contrast transition hover:bg-[#faf9f6]"
              aria-label="Zamknij podglad"
            >
              Zamknij
            </button>

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f6f1ed] md:aspect-[16/10]">
              <Image
                src={activeImage}
                alt={product.title}
                fill
                priority
                className="object-contain"
                sizes="90vw"
              />
            </div>

            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-[#faf9f6]/88 px-3 py-2 text-sm text-moon-contrast shadow-[0_10px_25px_rgba(47,42,40,0.15)] transition hover:bg-[#faf9f6]"
                  aria-label="Poprzednie zdjecie"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-[#faf9f6]/88 px-3 py-2 text-sm text-moon-contrast shadow-[0_10px_25px_rgba(47,42,40,0.15)] transition hover:bg-[#faf9f6]"
                  aria-label="Nastepne zdjecie"
                >
                  →
                </button>

                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {galleryImages.map((img, index) => (
                    <button
                      key={`modal-${img}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`relative h-12 w-12 overflow-hidden rounded-lg border transition-all duration-300 ${
                        activeImage === img
                          ? "border-[#faf9f6] ring-1 ring-[#faf9f6]/70"
                          : "border-[#faf9f6]/35 opacity-80 hover:opacity-100"
                      }`}
                      aria-label={`Pokaz podglad ${index + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} - miniatura ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
