import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getServerSupabaseEnv() {
  return {
    url: process.env.SUPABASE_URL?.trim(),
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  };
}

export function isSupabaseServerConfigured() {
  const { url, serviceRoleKey } = getServerSupabaseEnv();
  return Boolean(url && serviceRoleKey);
}

export function getSupabaseServer() {
  const { url, serviceRoleKey } = getServerSupabaseEnv();

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase server environment variables. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createClient(url, serviceRoleKey);
}

export const supabaseServer = new Proxy({} as SupabaseClient, {
  get(_target, property) {
    const client = getSupabaseServer() as unknown as Record<PropertyKey, unknown>;
    const value = client[property];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
