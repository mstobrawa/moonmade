import { NextResponse } from "next/server";
import { supabaseServer as supabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { customer, shippingMethod, shippingCost, items, total } = body;

    // 🔒 Walidacja minimum (backend!)
    if (
      !customer?.name ||
      !customer?.email ||
      !customer?.phone ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Niepoprawne dane zamówienia" },
        { status: 400 },
      );
    }

    // 📦 Budowa adresu (jsonb)
    const address =
      shippingMethod === "locker"
        ? {
            type: "locker",
            lockerCode: customer.lockerCode,
            country: customer.country ?? "Polska",
          }
        : {
            type: "home",
            street: customer.street,
            postalCode: customer.postalCode,
            city: customer.city,
            country: customer.country ?? "Polska",
          };

    // 💾 ZAPIS DO BAZY
    const { data, error } = await supabase
      .from("orders")
      .insert({
        customer_name: customer.name,
        email: customer.email,
        phone: customer.phone,

        address,
        items,

        shipping_method: shippingMethod,
        shipping_cost: shippingCost,
        total,

        status: "new",
        payment_provider: "autopay",
      })
      .select()
      .single();

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return NextResponse.json(
        { error: "Nie udało się zapisać zamówienia" },
        { status: 500 },
      );
    }

    // ✅ OK
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("API /checkout ERROR:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
