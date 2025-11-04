import { notFound } from "next/navigation";
import { products } from "@/data/products";
import Button from "@/app/ui/Button";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full rounded-xl"
        />
      </div>
      <div>
        <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>
        <p className="text-lg mb-4">{(product.price / 100).toFixed(2)} zł</p>
        <p className="text-moon-contrast/80 mb-6">{product.description}</p>

        {/* Tu zaraz dodamy: wybór ilości i „Dodaj do koszyka” */}
        <div className="flex items-center gap-3">
          {/* ilość */}
          {/* przycisk dodania */}
          <Button>Dodaj do koszyka</Button>
        </div>
      </div>
    </main>
  );
}
