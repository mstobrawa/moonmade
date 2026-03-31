import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getBrowserSupabaseEnv() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  };
}

export function isSupabaseBrowserConfigured() {
  const { url, anonKey } = getBrowserSupabaseEnv();
  return Boolean(url && anonKey);
}

export function getSupabase() {
  const { url, anonKey } = getBrowserSupabaseEnv();

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase browser environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return createClient(url, anonKey);
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, property) {
    const client = getSupabase() as unknown as Record<PropertyKey, unknown>;
    const value = client[property];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
