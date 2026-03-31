import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  hasMissingOriginalPriceColumn,
  LEGACY_PRODUCT_SELECT,
  PRODUCT_SELECT,
  withNullableOriginalPrice,
} from "@/lib/admin/products";
import { supabaseServer } from "@/lib/supabase/server";
import { getAdminSessionFromRequest } from "@/lib/admin/auth";

function sanitizeFileName(fileName: string) {
  return fileName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.-]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .toLowerCase();
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

function normalizeImageList(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value.filter((item): item is string => typeof item === "string");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Brak dostepu." }, { status: 401 });
  }

  try {
    const { id } = await params;

    const { data: product, error: productError } = await supabaseServer
      .from("products")
      .select("id, images")
      .eq("id", id)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { error: "Nie znaleziono produktu." },
        { status: 404 },
      );
    }

    const formData = await request.formData();
    const files = formData
      .getAll("files")
      .filter((entry): entry is File => entry instanceof File);

    if (files.length === 0) {
      return NextResponse.json(
        { error: "Nie wybrano zadnych plikow." },
        { status: 400 },
      );
    }

    const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "products";
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const filePath = `${product.id}/${Date.now()}-${sanitizeFileName(file.name)}`;

      const { error: uploadError } = await supabaseServer.storage
        .from(bucket)
        .upload(filePath, arrayBuffer, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
      }

      const { data: publicUrlData } = supabaseServer.storage
        .from(bucket)
        .getPublicUrl(filePath);

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    const nextImages = [
      ...((product.images as string[] | null) ?? []),
      ...uploadedUrls,
    ];

    const updateQuery = supabaseServer
      .from("products")
      .update({ images: nextImages })
      .eq("id", id)
      .select(PRODUCT_SELECT)
      .single();

    let { data: updatedProduct, error: updateError } = await updateQuery;

    if (hasMissingOriginalPriceColumn(updateError?.message)) {
      const legacyUpdateQuery = supabaseServer
        .from("products")
        .update({ images: nextImages })
        .eq("id", id)
        .select(LEGACY_PRODUCT_SELECT)
        .single();

      const legacyUpdateResult = await legacyUpdateQuery;
      updatedProduct = legacyUpdateResult.data
        ? withNullableOriginalPrice(legacyUpdateResult.data)
        : legacyUpdateResult.data;
      updateError = legacyUpdateResult.error;
    }

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      uploadedUrls,
      product: updatedProduct,
    });
  } catch (error) {
    console.error("ADMIN PRODUCT IMAGE UPLOAD ERROR:", error);
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
    const body = (await request.json()) as { imageUrl?: string };
    const imageUrl = String(body.imageUrl ?? "").trim();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Brakuje adresu zdjecia." },
        { status: 400 },
      );
    }

    const { data: product, error: productError } = await supabaseServer
      .from("products")
      .select("id, images")
      .eq("id", id)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { error: "Nie znaleziono produktu." },
        { status: 404 },
      );
    }

    const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "products";
    const storagePath = getStoragePathFromPublicUrl(imageUrl, bucket);

    if (storagePath) {
      const { error: storageError } = await supabaseServer.storage
        .from(bucket)
        .remove([storagePath]);

      if (storageError) {
        return NextResponse.json({ error: storageError.message }, { status: 500 });
      }
    }

    const nextImages = ((product.images as string[] | null) ?? []).filter(
      (item) => item !== imageUrl,
    );

    const updateQuery = supabaseServer
      .from("products")
      .update({ images: nextImages })
      .eq("id", id)
      .select(PRODUCT_SELECT)
      .single();

    let { data: updatedProduct, error: updateError } = await updateQuery;

    if (hasMissingOriginalPriceColumn(updateError?.message)) {
      const legacyUpdateQuery = supabaseServer
        .from("products")
        .update({ images: nextImages })
        .eq("id", id)
        .select(LEGACY_PRODUCT_SELECT)
        .single();

      const legacyUpdateResult = await legacyUpdateQuery;
      updatedProduct = legacyUpdateResult.data
        ? withNullableOriginalPrice(legacyUpdateResult.data)
        : legacyUpdateResult.data;
      updateError = legacyUpdateResult.error;
    }

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      removedImage: imageUrl,
      product: updatedProduct,
    });
  } catch (error) {
    console.error("ADMIN PRODUCT IMAGE DELETE ERROR:", error);
    return NextResponse.json({ error: "Blad serwera." }, { status: 500 });
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
    const body = (await request.json()) as { images?: unknown };
    const images = normalizeImageList(body.images);

    const updateQuery = supabaseServer
      .from("products")
      .update({ images })
      .eq("id", id)
      .select(PRODUCT_SELECT)
      .single();

    let { data: updatedProduct, error: updateError } = await updateQuery;

    if (hasMissingOriginalPriceColumn(updateError?.message)) {
      const legacyUpdateQuery = supabaseServer
        .from("products")
        .update({ images })
        .eq("id", id)
        .select(LEGACY_PRODUCT_SELECT)
        .single();

      const legacyUpdateResult = await legacyUpdateQuery;
      updatedProduct = legacyUpdateResult.data
        ? withNullableOriginalPrice(legacyUpdateResult.data)
        : legacyUpdateResult.data;
      updateError = legacyUpdateResult.error;
    }

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.error("ADMIN PRODUCT IMAGE ORDER ERROR:", error);
    return NextResponse.json({ error: "Blad serwera." }, { status: 500 });
  }
}
