"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/app/(store)/cart/CartContext";

export default function ClearCartClient() {
  const { dispatch, isHydrated } = useCart();
  const clearedRef = useRef(false);

  useEffect(() => {
    // czekamy aż koszyk się załaduje z localStorage
    if (!isHydrated) return;

    // zabezpieczenie: wykonaj CLEAR tylko raz
    if (clearedRef.current) return;

    dispatch({ type: "CLEAR" });
    clearedRef.current = true;
  }, [isHydrated, dispatch]);

  return null;
}
