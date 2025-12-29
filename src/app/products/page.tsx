import ProductsGrid from "../ui/ProductsGrid";
import { products } from "@/data/products";

export default function ProductPage() {
  return (
    <main className="p-4">
      <ProductsGrid products={products} />
    </main>
  );
}
