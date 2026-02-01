import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔔 Na razie tylko logujemy – nic nie zapisujemy
    console.log("🔔 AUTOPAY WEBHOOK RECEIVED");
    console.log(JSON.stringify(body, null, 2));

    /**
     * W przyszłości tutaj będzie:
     * - weryfikacja podpisu (hash)
     * - update orders.status = "paid"
     * - update products.is_available = false
     */

    // ✅ ZAWSZE 200 – Autopay musi dostać OK
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ AUTOPAY WEBHOOK ERROR", error);

    // ⚠️ Nawet przy błędzie NIE rzucamy 500
    // (Autopay ponowi webhook)
    return NextResponse.json({ ok: false });
  }
}
