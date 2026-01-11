"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import Image from "next/image";
import Button from "@/app/ui/Button";
import { useCart } from "@/app/(store)/cart/CartContext";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { state, dispatch } = useCart();
  const router = useRouter();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-moon-cream text-moon-contrast">
        <h1 className="text-2xl font-semibold">Nie znaleziono produktu 😢</h1>
      </main>
    );
  }

  // 🔒 sprawdzamy czy produkt już w koszyku
  const isInCart = state.items.some((i) => i.id === product.id);

  const handleAddToCart = () => {
    if (isInCart) return;

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0], // ✅ miniaturka do koszyka
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

          {/* info o unikatowości */}
          <p className="text-sm text-moon-rose-dark mb-4">
            Unikat – dostępna 1 sztuka
          </p>

          {/* Przyciski akcji */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 justify-center">
              <Button
                variant="primary"
                size="md"
                disabled={isInCart}
                onClick={handleAddToCart}
              >
                {isInCart ? "Produkt w koszyku" : "Dodaj do koszyka"}
              </Button>

              <Button variant="primary" size="md" onClick={handleGoBack}>
                Wróć do produktów
              </Button>
            </div>

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
