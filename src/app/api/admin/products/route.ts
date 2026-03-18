import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
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
    const images = normalizeImages(body.images);
    const isAvailable = Boolean(body.isAvailable);

    if (!title || !slug || Number.isNaN(price)) {
      return NextResponse.json(
        { error: "Tytul, slug i cena sa wymagane." },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseServer
      .from("products")
      .insert({
        title,
        slug,
        description,
        price,
        images,
        is_available: isAvailable,
      })
      .select("id, slug, title, description, price, images, is_available, created_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ product: data }, { status: 201 });
  } catch (error) {
    console.error("ADMIN CREATE PRODUCT ERROR:", error);
    return NextResponse.json({ error: "Blad serwera." }, { status: 500 });
  }
}
