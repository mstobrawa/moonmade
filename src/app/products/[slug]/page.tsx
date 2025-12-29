"use client";

"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import Image from "next/image";
import Button from "@/app/ui/Button";
import { useCart } from "@/app/(store)/cart/CartContext";

export default function ProductDetailsPage() {
  const { slug } = useParams(); // pobieramy slug z URL
  const { dispatch } = useCart(); // mamy dostęp do koszyka
  const router = useRouter(); // do powrotu na listę produktów

  // szukamy produktu
  const product = products.find((p) => p.slug === slug);

  // jeśli nie znaleziono
  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-moon-cream text-moon-contrast">
        <h1 className="text-2xl font-semibold">Nie znaleziono produktu 😢</h1>
      </main>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        qty: 1,
      },
    });
  };

  const handleGoBack = () => {
    router.push("/products");
  };
  return (
    <main className="min-h-screen bg-moon-cream text-moon-contrast flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-moon-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
        {/* obrazek */}
        <div className="flex-1 flex items-center justify-center">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={400}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>

        {/* szczegóły */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-moon-rose-dark mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">{product.price} zł</p>

          {/* Przyciski akcji */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 justify-center">
              {/* Dodaj do koszyka */}
              <Button variant="primary" size="md" onClick={handleAddToCart}>
                Dodaj do koszyka
              </Button>

              {/* Wróć do listy produktów */}
              <Button variant="primary" size="md" onClick={handleGoBack}>
                Wróć do produktów
              </Button>
            </div>

            {/* Przejdź do koszyka */}
            <div className="flex justify-center">
              <Button as="a" href="/cart" variant="primary" size="md">
                Przejdź do koszyka
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
