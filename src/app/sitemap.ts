import type { MetadataRoute } from "next";
import {
  getSupabaseServer,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://moonmade.pl";

const staticRoutes = [
  "",
  "/products",
  "/about",
  "/contact",
  "/delivery",
  "/payment",
  "/returns",
  "/statute",
  "/polityka-prywatnosci",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/products" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/products" ? 0.9 : 0.7,
  }));

  if (!isSupabaseServerConfigured()) {
    return staticEntries;
  }

  const supabaseServer = getSupabaseServer();
  const { data: products } = await supabaseServer
    .from("products")
    .select("slug, updated_at, created_at")
    .eq("is_available", true);

  const productEntries: MetadataRoute.Sitemap = (products ?? []).map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: new Date(
      String(product.updated_at ?? product.created_at ?? new Date().toISOString()),
    ),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
