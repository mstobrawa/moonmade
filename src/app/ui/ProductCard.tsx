import Button from "./Button";
import ProductCardImage from "./ProductCardImage";

export interface StorefrontProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  originalPrice?: number | null;
  description: string;
  images?: string[] | null;
  available: boolean;
}

interface ProductCardProps {
  product: StorefrontProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isOnPromotion =
    product.originalPrice !== null && product.originalPrice !== undefined;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e7ddd6] bg-linear-to-r from-[#faf6f1] via-[#faebda] to-[#f2e1d6] p-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#d8cbc2] hover:shadow-[0_14px_28px_rgba(47,42,40,0.08)]">
      <div className="relative mb-3 aspect-4/3 w-full flex-none overflow-hidden rounded-lg border border-[#e7ddd6]/90 bg-[linear-gradient(180deg,rgba(250,245,240,0.96),rgba(231,216,206,0.68))]">
        <ProductCardImage src={product.images?.[0]} alt={product.title} />

        {isOnPromotion && (
          <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-[#8a6e6c]/84 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#faf9f6] shadow-[0_10px_20px_rgba(47,42,40,0.12)] backdrop-blur-[2px]">
            Promocja
          </div>
        )}

        {!product.available && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center bg-[#2f2a28]/68 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#faf9f6] backdrop-blur-[2px]">
            Wyprzedane
          </div>
        )}
      </div>

      <h3 className="mb-1 text-base font-semibold leading-tight text-moon-contrast">
        {product.title}
      </h3>

      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          {isOnPromotion ? (
            <p className="text-[0.78rem] font-medium text-moon-contrast/48 line-through">
              {product.originalPrice} zł
            </p>
          ) : null}
          <p className="text-2xl font-semibold leading-none tracking-[0.01em] text-moon-rose-dark">
            {product.price} zł
          </p>
        </div>

        {isOnPromotion ? (
          <p className="mt-1 text-[0.62rem] leading-4 text-moon-contrast/54">
            Najniższa cena z ostatnich 30 dni: {product.originalPrice} zł
          </p>
        ) : null}
      </div>

      <div className="mt-auto">
        <Button
          as="a"
          href={`/products/${product.slug}`}
          className="w-full bg-moon-white/80 shadow-[0_8px_18px_rgba(47,42,40,0.05)]"
          size="sm"
          variant="outline"
        >
          Szczegóły
        </Button>
      </div>
    </article>
  );
}
