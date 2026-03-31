"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import AddToCartButton from "@/app/ui/AddToCartButton";
import Button from "@/app/ui/Button";

interface ProductDetailViewProps {
  product: {
    id: string;
    title: string;
    price: number;
    original_price?: number | null;
    description: string;
    images?: string[] | null;
    is_available?: boolean | null;
  };
}

const PLACEHOLDER = "/placeholder.webp";

export default function ProductDetailView({
  product,
}: ProductDetailViewProps) {
  const isOnPromotion =
    product.original_price !== null && product.original_price !== undefined;
  const galleryImages = useMemo(() => {
    const safeImages =
      Array.isArray(product.images) && product.images.length > 0
        ? product.images.filter(
            (image): image is string =>
              typeof image === "string" && image.trim().length > 0,
          )
        : [PLACEHOLDER];

    return safeImages.length > 0 ? safeImages : [PLACEHOLDER];
  }, [product.images]);

  const [activeImage, setActiveImage] = useState<string>(galleryImages[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setActiveImage(galleryImages[0]);
  }, [galleryImages]);

  const activeIndex = Math.max(galleryImages.indexOf(activeImage), 0);

  const resetZoom = useCallback(() => {
    setIsZoomActive(false);
    setZoomPosition({ x: 50, y: 50 });
  }, []);

  const showImageAt = useCallback(
    (index: number) => {
      const normalizedIndex =
        (index + galleryImages.length) % galleryImages.length;
      setActiveImage(galleryImages[normalizedIndex] ?? PLACEHOLDER);
      resetZoom();
    },
    [galleryImages, resetZoom],
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    resetZoom();
  }, [resetZoom]);

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
  }, [closeModal, isModalOpen, showNext, showPrevious]);

  return (
    <>
      <div className="mx-auto grid max-w-[770px] gap-3.5 rounded-2xl border border-[#e7ddd6] bg-gradient-to-r from-[#faf6f1] via-[#faebda] to-[#f2e1d6] p-3 shadow-sm md:grid-cols-[0.82fr_1fr] md:p-3.5">
        <div className="md:max-w-[18.75rem]">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-[#e7ddd6] bg-[linear-gradient(180deg,rgba(250,245,240,0.96),rgba(231,216,206,0.68))] text-left transition-all duration-300 ease-out hover:border-[#d8cbc2] md:aspect-[4/5.4]"
            aria-label="Powiększ zdjęcie produktu"
          >
            {isOnPromotion && (
              <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-[#8a6e6c]/84 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#faf9f6] shadow-[0_10px_20px_rgba(47,42,40,0.12)] backdrop-blur-[2px]">
                Promocja
              </span>
            )}

            {product.is_available === false && (
              <span className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center bg-[#2f2a28]/68 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#faf9f6] backdrop-blur-[2px]">
                Wyprzedane
              </span>
            )}

            <Image
              src={activeImage}
              alt={product.title}
              fill
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 34vw"
            />
            <span className="absolute inset-x-3 bottom-3 rounded-full bg-[#2f2a28]/70 px-3 py-1 text-[0.62rem] uppercase tracking-[0.12em] text-[#faf9f6] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Kliknij, aby powiększyć
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <h1 className="mb-1.5 text-lg font-semibold leading-tight text-moon-contrast md:text-[1.35rem]">
              {product.title}
            </h1>

            <p className="whitespace-pre-line text-[0.8rem] leading-5 text-moon-contrast/78 md:text-[0.84rem]">
              {product.description}
            </p>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              {isOnPromotion ? (
                <p className="text-[0.82rem] font-medium text-moon-contrast/48 line-through">
                  {product.original_price} zł
                </p>
              ) : null}
              <p className="text-4xl font-semibold leading-none tracking-[0.01em] text-moon-rose-dark">
                {product.price} zł
              </p>
            </div>

            {isOnPromotion ? (
              <p className="mt-1 text-[0.68rem] leading-4 text-moon-contrast/56">
                Najniższa cena z ostatnich 30 dni: {product.original_price} zł
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                image: galleryImages[0] ?? PLACEHOLDER,
                available: product.is_available ?? true,
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
                Wróć
              </Button>

              <Button as="a" href="/cart" className="w-full" size="sm">
                Koszyk
              </Button>
            </div>
          </div>

          <div className="border-t border-[#dccdc4] pt-2 text-[0.62rem] tracking-[0.08em] text-moon-rose-dark">
            Unikat - dostępna tylko 1 sztuka
          </div>

          {galleryImages.length > 1 && (
            <div className="space-y-1 border-t border-[#dccdc4] pt-2">
              <p className="text-[0.62rem] uppercase tracking-[0.12em] text-moon-rose-dark">
                Inne ujęcia
              </p>

              <div className="flex flex-wrap gap-1.5">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => {
                      setActiveImage(img);
                      resetZoom();
                    }}
                    className={`relative h-11 w-11 overflow-hidden rounded-lg border shadow-sm transition-all duration-300 ease-out md:h-12 md:w-12 ${
                      activeImage === img
                        ? "border-moon-rose bg-moon-white/70 -translate-y-0.5"
                        : "border-[#e7ddd6] bg-[#f6f1ed] hover:-translate-y-0.5 hover:border-moon-rose-light"
                    }`}
                    aria-label={`Pokaż zdjęcie ${index + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} - zdjęcie ${index + 1}`}
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
              aria-label="Zamknij podgląd"
            >
              Zamknij
            </button>

            <button
              type="button"
              className={`relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f6f1ed] md:aspect-[16/10] ${
                isZoomActive ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setIsZoomActive((current) => !current)}
              onPointerMove={(event) => {
                if (!isZoomActive || event.pointerType === "touch") return;

                const bounds = event.currentTarget.getBoundingClientRect();
                const x = ((event.clientX - bounds.left) / bounds.width) * 100;
                const y = ((event.clientY - bounds.top) / bounds.height) * 100;

                setZoomPosition({
                  x: Math.min(100, Math.max(0, x)),
                  y: Math.min(100, Math.max(0, y)),
                });
              }}
              onPointerLeave={() => {
                if (!isZoomActive) {
                  setZoomPosition({ x: 50, y: 50 });
                }
              }}
              aria-label={
                isZoomActive
                  ? "Wyłącz powiększenie zdjęcia"
                  : "Włącz powiększenie zdjęcia"
              }
            >
              <Image
                src={activeImage}
                alt={product.title}
                fill
                priority
                className="object-contain"
                sizes="90vw"
                style={{
                  transform: isZoomActive ? "scale(2.2)" : "scale(1)",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transition: "transform 180ms ease-out",
                }}
              />

              <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-[#2f2a28]/72 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#faf9f6]">
                {isZoomActive ? "− Zoom" : "+ Zoom"}
              </span>
            </button>

            <p className="mt-3 text-center text-[0.62rem] uppercase tracking-[0.12em] text-[#faf9f6]/78">
              Kliknij zdjęcie, aby włączyć lub wyłączyć przybliżenie
            </p>

            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-[#faf9f6]/88 px-3 py-2 text-sm text-moon-contrast shadow-[0_10px_25px_rgba(47,42,40,0.15)] transition hover:bg-[#faf9f6]"
                  aria-label="Poprzednie zdjęcie"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-[#faf9f6]/88 px-3 py-2 text-sm text-moon-contrast shadow-[0_10px_25px_rgba(47,42,40,0.15)] transition hover:bg-[#faf9f6]"
                  aria-label="Następne zdjęcie"
                >
                  →
                </button>

                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {galleryImages.map((img, index) => (
                    <button
                      key={`modal-${img}-${index}`}
                      type="button"
                      onClick={() => {
                        setActiveImage(img);
                        resetZoom();
                      }}
                      className={`relative h-12 w-12 overflow-hidden rounded-lg border transition-all duration-300 ${
                        activeImage === img
                          ? "border-[#faf9f6] ring-1 ring-[#faf9f6]/70"
                          : "border-[#faf9f6]/35 opacity-80 hover:opacity-100"
                      }`}
                      aria-label={`Pokaż podgląd ${index + 1}`}
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
