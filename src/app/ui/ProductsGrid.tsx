import ProductCard from "./ProductCard";

interface ProductsGridProps {
  products: {
    id: number;
    title: string;
    description: string;
    price: string;
    imgSrc: string;
  }[];
}
export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          className="hover:scale-105 transition"
          key={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          imgSrc={product.imgSrc}
        />
      ))}
    </div>
  );
}
