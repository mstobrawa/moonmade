import { NextResponse } from "next/server";
import { supabaseServer as supabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order_id, status, payment_id } = body;

    if (!order_id || !status) {
      return NextResponse.json(
        { error: "Brak order_id lub status" },
        { status: 400 },
      );
    }

    if (status !== "SUCCESS") {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, status")
      .eq("id", order_id)
      .single();

    if (orderError || !order) {
      console.error("ORDER NOT FOUND:", orderError);
      return NextResponse.json(
        { error: "Zamowienie nie istnieje" },
        { status: 404 },
      );
    }

    if (order.status === "paid") {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const { error: updateOrderError } = await supabase
      .from("orders")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        payment_provider: "autopay",
        payment_id: payment_id ?? null,
      })
      .eq("id", order_id);

    if (updateOrderError) {
      console.error("ORDER UPDATE ERROR:", updateOrderError);
      return NextResponse.json(
        { error: "Nie udalo sie zaktualizowac zamowienia" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("WEBHOOK ERROR:", error);
    return NextResponse.json({ error: "Blad serwera" }, { status: 500 });
  }
}
