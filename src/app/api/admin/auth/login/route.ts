import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  clearAdminCookies,
  getAdminCookieOptions,
  isAdminEmail,
} from "@/lib/admin/auth";
import {
  ADMIN_ACCESS_COOKIE,
  ADMIN_REFRESH_COOKIE,
} from "@/lib/admin/constants";

export async function POST(request: NextRequest) {
  try {
    const hostname = request.nextUrl.hostname;
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email i haslo sa wymagane." },
        { status: 400 },
      );
    }

    const supabaseAuth = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session || !data.user) {
      return NextResponse.json(
        { error: "Nieprawidlowe dane logowania." },
        { status: 401 },
      );
    }

    if (!isAdminEmail(data.user.email)) {
      const response = NextResponse.json(
        { error: "To konto nie ma dostepu do panelu admina." },
        { status: 403 },
      );
      clearAdminCookies(response, hostname);
      return response;
    }

    const response = NextResponse.json({
      ok: true,
      email: data.user.email ?? null,
    });

    response.cookies.set(
      ADMIN_ACCESS_COOKIE,
      data.session.access_token,
      getAdminCookieOptions(data.session.expires_in ?? 60 * 60, hostname),
    );

    if (data.session.refresh_token) {
      response.cookies.set(
        ADMIN_REFRESH_COOKIE,
        data.session.refresh_token,
        getAdminCookieOptions(60 * 60 * 24 * 30, hostname),
      );
    }

    return response;
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);
    return NextResponse.json({ error: "Blad serwera." }, { status: 500 });
  }
}
