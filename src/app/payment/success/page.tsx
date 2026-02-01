import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Ładowanie…</div>}>
      <SuccessClient />
    </Suspense>
  );
}
