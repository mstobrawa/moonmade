import { supabaseServer } from "@/lib/supabase/server";

export const PRODUCT_SELECT =
  "id, slug, title, description, price, original_price, images, is_available, position, created_at";

export const LEGACY_PRODUCT_SELECT =
  "id, slug, title, description, price, images, is_available, position, created_at";

export function hasMissingOriginalPriceColumn(message?: string | null) {
  return message?.includes("column products.original_price does not exist") ?? false;
}

type LegacyAdminProduct = {
  id: unknown;
  slug: unknown;
  title: unknown;
  description: unknown;
  price: unknown;
  images: unknown;
  is_available: unknown;
  position: unknown;
  created_at?: unknown;
};

export function withNullableOriginalPrice<T extends LegacyAdminProduct>(product: T) {
  return {
    ...product,
    original_price: null,
  };
}

export async function getNextProductPosition() {
  const { data, error } = await supabaseServer
    .from("products")
    .select("position")
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return Number(data?.position ?? 0) + 1;
}

export async function resequenceProducts() {
  const { data, error } = await supabaseServer
    .from("products")
    .select("id, position, created_at");

  if (error) {
    throw error;
  }

  const orderedProducts = [...(data ?? [])].sort((left, right) => {
    const leftPosition =
      typeof left.position === "number" ? left.position : Number.MAX_SAFE_INTEGER;
    const rightPosition =
      typeof right.position === "number" ? right.position : Number.MAX_SAFE_INTEGER;

    if (leftPosition !== rightPosition) {
      return leftPosition - rightPosition;
    }

    const leftCreatedAt = new Date(left.created_at ?? 0).getTime();
    const rightCreatedAt = new Date(right.created_at ?? 0).getTime();
    return rightCreatedAt - leftCreatedAt;
  });

  const updates = orderedProducts
    .map((product, index) => ({
      id: String(product.id),
      position: index + 1,
    }))
    .filter((product, index) => product.position !== orderedProducts[index]?.position);

  if (updates.length === 0) {
    return;
  }

  const { error: updateError } = await supabaseServer
    .from("products")
    .upsert(updates, { onConflict: "id" });

  if (updateError) {
    throw updateError;
  }
}
