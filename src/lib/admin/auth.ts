import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import {
  ADMIN_ACCESS_COOKIE,
  ADMIN_REFRESH_COOKIE,
} from "@/lib/admin/constants";

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null) {
  if (!email) return false;

  const adminEmails = getAdminEmails();

  if (adminEmails.length === 0) {
    return true;
  }

  return adminEmails.includes(email.toLowerCase());
}

export function getAdminCookieOptions(maxAge = 60 * 60) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

type AdminSession = {
  token: string;
  user: {
    id: string;
    email: string | null;
  };
};

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_ACCESS_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const { data, error } = await supabaseServer.auth.getUser(token);

  if (error || !data.user || !isAdminEmail(data.user.email)) {
    return null;
  }

  return {
    token,
    user: {
      id: data.user.id,
      email: data.user.email ?? null,
    },
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function getAdminSessionFromRequest(
  request: NextRequest,
): Promise<AdminSession | null> {
  const token = request.cookies.get(ADMIN_ACCESS_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const { data, error } = await supabaseServer.auth.getUser(token);

  if (error || !data.user || !isAdminEmail(data.user.email)) {
    return null;
  }

  return {
    token,
    user: {
      id: data.user.id,
      email: data.user.email ?? null,
    },
  };
}

export function clearAdminCookies(response: {
  cookies: {
    set: (
      name: string,
      value: string,
      options: ReturnType<typeof getAdminCookieOptions>,
    ) => void;
  };
}) {
  response.cookies.set(ADMIN_ACCESS_COOKIE, "", getAdminCookieOptions(0));
  response.cookies.set(ADMIN_REFRESH_COOKIE, "", getAdminCookieOptions(0));
}
