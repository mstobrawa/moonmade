import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  hasMissingOriginalPriceColumn,
  LEGACY_PRODUCT_SELECT,
  PRODUCT_SELECT,
} from "@/lib/admin/products";
import { getAdminSessionFromRequest } from "@/lib/admin/auth";
import { supabaseServer } from "@/lib/supabase/server";

type ProductPositionUpdate = {
  id: string;
  position: number;
};

async function handleReorder(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Brak dostepu." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { products?: unknown };
    const products = Array.isArray(body.products)
      ? body.products.filter(
          (item): item is ProductPositionUpdate =>
            typeof item === "object" &&
            item !== null &&
            typeof (item as ProductPositionUpdate).id === "string" &&
            typeof (item as ProductPositionUpdate).position === "number",
        )
      : [];

    if (products.length === 0) {
      return NextResponse.json(
        { error: "Brakuje listy produktow do uporzadkowania." },
        { status: 400 },
      );
    }

    const ids = products.map((product) => product.id);
    const positions = products.map((product) => product.position);

    if (new Set(ids).size !== ids.length) {
      return NextResponse.json(
        { error: "Lista produktow zawiera duplikaty identyfikatorow." },
        { status: 400 },
      );
    }

    const sortedPositions = [...positions].sort((left, right) => left - right);
    const hasInvalidPositions = sortedPositions.some(
      (position, index) => !Number.isInteger(position) || position !== index + 1,
    );

    if (hasInvalidPositions) {
      return NextResponse.json(
        { error: "Pozycje musza byc kolejnymi liczbami bez luk." },
        { status: 400 },
      );
    }

    for (const product of products) {
      if (!product.position || product.position < 1) {
        throw new Error("Invalid position value");
      }
    }

    const { data: existingProducts, error: fetchError } = await supabaseServer
      .from("products")
      .select("id");

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    const existingIds = new Set((existingProducts ?? []).map((product) => String(product.id)));

    if (existingIds.size !== ids.length || ids.some((id) => !existingIds.has(id))) {
      return NextResponse.json(
        { error: "Lista produktow nie zgadza sie z baza danych." },
        { status: 400 },
      );
    }

    const currentMaxPositionResult = await supabaseServer
      .from("products")
      .select("position")
      .order("position", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (currentMaxPositionResult.error) {
      return NextResponse.json(
        { error: currentMaxPositionResult.error.message },
        { status: 500 },
      );
    }

    const offset = Number(currentMaxPositionResult.data?.position ?? 0) + products.length;

    const temporaryUpdates = await Promise.all(
      products.map((product, index) =>
        supabaseServer
          .from("products")
          .update({ position: offset + index + 1 })
          .eq("id", product.id),
      ),
    );

    const temporaryUpdateError = temporaryUpdates.find((result) => result.error)?.error;

    if (temporaryUpdateError) {
      return NextResponse.json(
        { error: temporaryUpdateError.message },
        { status: 500 },
      );
    }

    const finalUpdates = await Promise.all(
      products.map((product) =>
        supabaseServer
          .from("products")
          .update({ position: product.position })
          .eq("id", product.id),
      ),
    );

    const finalUpdateError = finalUpdates.find((result) => result.error)?.error;

    if (finalUpdateError) {
      return NextResponse.json({ error: finalUpdateError.message }, { status: 500 });
    }

    let selectQuery = supabaseServer
      .from("products")
      .select(PRODUCT_SELECT)
      .order("position", { ascending: true })
      .order("created_at", { ascending: false });

    let { data: reorderedProducts, error: selectError } = await selectQuery;

    if (hasMissingOriginalPriceColumn(selectError?.message)) {
      selectQuery = supabaseServer
        .from("products")
        .select(LEGACY_PRODUCT_SELECT)
        .order("position", { ascending: true })
        .order("created_at", { ascending: false });

      ({ data: reorderedProducts, error: selectError } = await selectQuery);
    }

    if (selectError) {
      return NextResponse.json({ error: selectError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, products: reorderedProducts });
  } catch (error) {
    console.error("ADMIN PRODUCT REORDER ERROR:", error);
    return NextResponse.json({ error: "Blad serwera." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return handleReorder(request);
}

export async function PATCH(request: NextRequest) {
  return handleReorder(request);
}
