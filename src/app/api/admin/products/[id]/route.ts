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

function getStoragePathFromPublicUrl(imageUrl: string, bucket: string) {
  try {
    const url = new URL(imageUrl);
    const marker = `/storage/v1/object/public/${bucket}/`;
    const markerIndex = url.pathname.indexOf(marker);

    if (markerIndex === -1) {
      return null;
    }

    return decodeURIComponent(url.pathname.slice(markerIndex + marker.length));
  } catch {
    return null;
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Brak dostepu." }, { status: 401 });
  }

  try {
    const { id } = await params;
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
      .update({
        title,
        slug,
        description,
        price,
        images,
        is_available: isAvailable,
      })
      .eq("id", id)
      .select("id, slug, title, description, price, images, is_available, created_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ product: data });
  } catch (error) {
    console.error("ADMIN UPDATE PRODUCT ERROR:", error);
    return NextResponse.json({ error: "Blad serwera." }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Brak dostepu." }, { status: 401 });
  }

  try {
    const { id } = await params;

    const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "products";
    const { data: product } = await supabaseServer
      .from("products")
      .select("id, images")
      .eq("id", id)
      .single();

    const listedFiles = await supabaseServer.storage.from(bucket).list(id, {
      limit: 1000,
    });

    const storagePaths = new Set<string>();

    for (const item of listedFiles.data ?? []) {
      if (item.name) {
        storagePaths.add(`${id}/${item.name}`);
      }
    }

    for (const imageUrl of (product?.images as string[] | null) ?? []) {
      const path = getStoragePathFromPublicUrl(imageUrl, bucket);
      if (path?.startsWith(`${id}/`)) {
        storagePaths.add(path);
      }
    }

    if (storagePaths.size > 0) {
      const { error: storageError } = await supabaseServer.storage
        .from(bucket)
        .remove([...storagePaths]);

      if (storageError) {
        return NextResponse.json({ error: storageError.message }, { status: 500 });
      }
    }

    const { error } = await supabaseServer.from("products").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("ADMIN DELETE PRODUCT ERROR:", error);
    return NextResponse.json({ error: "Blad serwera." }, { status: 500 });
  }
}
