import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getNextProductPosition,
  hasMissingOriginalPriceColumn,
  LEGACY_PRODUCT_SELECT,
  PRODUCT_SELECT,
} from "@/lib/admin/products";
import { supabaseServer } from "@/lib/supabase/server";
import { getAdminSessionFromRequest } from "@/lib/admin/auth";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeImages(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter(Boolean);
  }

  if (!value) return [];

  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeOptionalPrice(value: unknown) {
  const normalizedValue = String(value ?? "").trim();

  if (!normalizedValue) {
    return null;
  }

  const parsedValue = Number(normalizedValue);
  return Number.isNaN(parsedValue) ? Number.NaN : parsedValue;
}

export async function POST(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Brak dostepu." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const title = String(body.title ?? "").trim();
    const description = String(body.description ?? "").trim();
    const slug = slugify(String(body.slug ?? title));
    const price = Number(body.price ?? 0);
    const originalPrice = normalizeOptionalPrice(body.originalPrice);
    const images = normalizeImages(body.images);
    const isAvailable = Boolean(body.isAvailable);
    const position = await getNextProductPosition();

    if (!title || !slug || Number.isNaN(price) || Number.isNaN(originalPrice)) {
      return NextResponse.json(
        { error: "Tytul, slug i cena sa wymagane." },
        { status: 400 },
      );
    }

    let insertQuery = supabaseServer
      .from("products")
      .insert({
        title,
        slug,
        description,
        price,
        original_price: originalPrice,
        images,
        is_available: isAvailable,
        position,
      })
      .select(PRODUCT_SELECT)
      .single();

    let { data, error } = await insertQuery;

    if (hasMissingOriginalPriceColumn(error?.message)) {
      insertQuery = supabaseServer
        .from("products")
        .insert({
          title,
          slug,
          description,
          price,
          images,
          is_available: isAvailable,
          position,
        })
        .select(LEGACY_PRODUCT_SELECT)
        .single();

      ({ data, error } = await insertQuery);
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ product: data }, { status: 201 });
  } catch (error) {
    console.error("ADMIN CREATE PRODUCT ERROR:", error);
    return NextResponse.json({ error: "Blad serwera." }, { status: 500 });
  }
}
