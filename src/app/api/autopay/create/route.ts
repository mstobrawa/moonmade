import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.orderId) {
    return NextResponse.json({ error: "Brak orderId" }, { status: 400 });
  }

  return NextResponse.json({
    paymentUrl: "/payment/success?order=" + body.orderId,
  });
}
