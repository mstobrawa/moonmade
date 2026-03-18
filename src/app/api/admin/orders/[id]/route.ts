import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getAdminSessionFromRequest } from "@/lib/admin/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Brak dostepu." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const status = String(body.status ?? "").trim();

    if (!status) {
      return NextResponse.json(
        { error: "Status jest wymagany." },
        { status: 400 },
      );
    }

    const payload: {
      status: string;
      paid_at?: string | null;
    } = {
      status,
    };

    if (status === "paid") {
      payload.paid_at = new Date().toISOString();
    }

    const { data, error } = await supabaseServer
      .from("orders")
      .update(payload)
      .eq("id", id)
      .select(
        "id, created_at, status, total, shipping_method, shipping_cost, customer_name, email, phone, address, items, paid_at",
      )
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ order: data });
  } catch (error) {
    console.error("ADMIN UPDATE ORDER ERROR:", error);
    return NextResponse.json({ error: "Blad serwera." }, { status: 500 });
  }
}
