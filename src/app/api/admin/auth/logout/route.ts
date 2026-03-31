import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clearAdminCookies } from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  clearAdminCookies(response, request.nextUrl.hostname);
  return response;
}
