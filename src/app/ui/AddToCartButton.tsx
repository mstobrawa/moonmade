"use client";

import { useCart } from "@/app/(store)/cart/CartContext";
import Button from "./Button";

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
    available?: boolean;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { state, dispatch } = useCart();

  const isInCart = state.items.some((item) => item.id === product.id);
  const isSoldOut = product.available === false;
  const isDisabled = isInCart || isSoldOut;

  const handleAddToCart = () => {
    if (isDisabled) return;

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
    });
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={`w-full shadow-[0_12px_26px_rgba(138,110,108,0.14)] ${
        isSoldOut ? "cursor-not-allowed opacity-60" : ""
      }`}
      size="sm"
    >
      {isSoldOut ? "Wyprzedane" : isInCart ? "Dodano do koszyka" : "Dodaj do koszyka"}
    </Button>
  );
}
