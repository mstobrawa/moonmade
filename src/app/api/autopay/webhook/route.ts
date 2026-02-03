import { NextResponse } from "next/server";
import { supabaseServer as supabase } from "@/lib/supabase/server";

/**
 * Struktura itemu zapisanego w orders.items (jsonb)
 * zgodna z tym co masz realnie w bazie
 */
interface OrderItem {
  id: string;
  title: string;
  price: number;
  image?: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    /**
     * W wersji docelowej Autopay:
     * - order_id -> ID zamówienia (uuid)
     * - status   -> SUCCESS | FAILED | CANCELLED
     * - payment_id -> ID transakcji u operatora
     */
    const { order_id, status, payment_id } = body;

    if (!order_id || !status) {
      return NextResponse.json(
        { error: "Brak order_id lub status" },
        { status: 400 },
      );
    }

    // Obsługujemy tylko sukces
    if (status !== "SUCCESS") {
      return NextResponse.json({ ok: true, ignored: true });
    }

    /* =========================
       1️⃣ Pobierz zamówienie
       ========================= */
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, items")
      .eq("id", order_id)
      .single();

    if (orderError || !order) {
      console.error("ORDER NOT FOUND:", orderError);
      return NextResponse.json(
        { error: "Zamówienie nie istnieje" },
        { status: 404 },
      );
    }

    /* =========================
       2️⃣ Oznacz zamówienie jako opłacone
       ========================= */
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
        { error: "Nie udało się zaktualizować zamówienia" },
        { status: 500 },
      );
    }

    /* =========================
       3️⃣ Zablokuj kupione produkty
       ========================= */
    const items = order.items as OrderItem[];
    const productIds = items.map((item) => item.id);

    if (productIds.length > 0) {
      const { error: productsError } = await supabase
        .from("products")
        .update({ is_available: false })
        .in("id", productIds);

      if (productsError) {
        console.error("PRODUCT UPDATE ERROR:", productsError);
        return NextResponse.json(
          { error: "Nie udało się zablokować produktów" },
          { status: 500 },
        );
      }
    }

    /* =========================
       4️⃣ OK
       ========================= */
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("WEBHOOK ERROR:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
