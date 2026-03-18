"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/app/(store)/cart/CartContext";

export default function ClearCartClient() {
  const { dispatch, isHydrated } = useCart();
  const clearedRef = useRef(false);

  useEffect(() => {
    if (!isHydrated) return;
    if (clearedRef.current) return;

    dispatch({ type: "CLEAR" });
    clearedRef.current = true;
  }, [isHydrated, dispatch]);

  return null;
}
