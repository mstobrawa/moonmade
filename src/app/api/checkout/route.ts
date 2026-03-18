import { NextResponse } from "next/server";
import { supabaseServer as supabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, shippingMethod, shippingCost, total } = body;

    if (
      !customer?.name ||
      !customer?.email ||
      !customer?.phone ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Niepoprawne dane zamowienia" },
        { status: 400 },
      );
    }

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

    const { data, error } = await supabase
      .from("orders")
      .insert({
        status: "new",
        total,
        shipping_cost: shippingCost,
        shipping_method: shippingMethod,
        customer_name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address,
        items,
        payment_provider: "autopay",
      })
      .select("id")
      .single();

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        orderId: data.id,
        paymentUrl: `/payment/success?order=${data.id}`,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json({ error: "Blad serwera" }, { status: 500 });
  }
}
