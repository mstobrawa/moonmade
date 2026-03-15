import ProductCard, { type StorefrontProduct } from "./ProductCard";

interface ProductsGridProps {
  products: StorefrontProduct[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="mx-auto max-w-275">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
