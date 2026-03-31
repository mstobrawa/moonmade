"use client";

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import ProductCardImage from "@/app/ui/ProductCardImage";
import Textarea from "@/app/ui/Textarea";

type AdminProduct = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  original_price?: number | null;
  images: string[];
  is_available: boolean;
  position: number;
  created_at?: string | null;
};

type ProductFormState = {
  title: string;
  slug: string;
  description: string;
  price: string;
  originalPrice: string;
  images: string;
  isAvailable: boolean;
};

const emptyForm: ProductFormState = {
  title: "",
  slug: "",
  description: "",
  price: "",
  originalPrice: "",
  images: "",
  isAvailable: true,
};

function sortProducts(products: AdminProduct[]) {
  return [...products].sort((left, right) => {
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
}

function assignSequentialPositions(products: AdminProduct[]) {
  return products.map((product, index) => ({
    ...product,
    position: index + 1,
  }));
}

function ProductGridCard({
  product,
  onEdit,
  onDelete,
  isReordering,
}: {
  product: AdminProduct;
  onEdit: () => void;
  onDelete: () => void;
  isReordering: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: product.id,
    disabled: isReordering,
  });

  return (
    <article
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e7ddd6] bg-linear-to-r from-[#faf6f1] via-[#faebda] to-[#f2e1d6] p-3 shadow-sm transition-all duration-300 ease-out ${
        isDragging
          ? "z-10 scale-[1.02] opacity-80 shadow-[0_18px_36px_rgba(47,42,40,0.16)]"
          : "hover:-translate-y-1 hover:border-[#d8cbc2] hover:shadow-[0_14px_28px_rgba(47,42,40,0.08)]"
      }`}
    >
      <div className="relative mb-3 aspect-4/3 w-full flex-none overflow-hidden rounded-lg border border-[#e7ddd6]/90 bg-[linear-gradient(180deg,rgba(250,245,240,0.96),rgba(231,216,206,0.68))]">
        <ProductCardImage src={product.images?.[0]} alt={product.title} />

        {!product.is_available ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center bg-[#2f2a28]/68 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#faf9f6] backdrop-blur-[2px]">
            Ukryty
          </div>
        ) : null}

        <button
          ref={setActivatorNodeRef}
          type="button"
          aria-label={`Przesuń produkt ${product.title}`}
          className={`absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-moon-contrast/12 bg-moon-white/88 text-moon-contrast shadow-[0_10px_24px_rgba(47,42,40,0.12)] transition hover:bg-moon-white ${
            isReordering ? "cursor-not-allowed opacity-60" : "cursor-grab active:cursor-grabbing"
          }`}
          style={{ touchAction: "none" }}
          disabled={isReordering}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>

      <h3 className="mb-1 text-base font-semibold leading-tight text-moon-contrast">
        {product.title}
      </h3>

      <div className="mb-4 flex items-baseline gap-2">
        {product.original_price ? (
          <p className="text-[0.78rem] font-medium text-moon-contrast/48 line-through">
            {product.original_price} zł
          </p>
        ) : null}
        <p className="text-sm font-semibold tracking-[0.01em] text-moon-rose-dark">
          {product.price} zł
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={onEdit} disabled={isReordering}>
          Edytuj
        </Button>
        <Button size="sm" variant="outline" onClick={onDelete} disabled={isReordering}>
          Usuń
        </Button>
      </div>
    </article>
  );
}

export default function AdminProductsManager({
  initialProducts,
}: {
  initialProducts: AdminProduct[];
}) {
  const [products, setProducts] = useState(() =>
    assignSequentialPositions(sortProducts(initialProducts)),
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingImage, setDeletingImage] = useState<string | null>(null);
  const [draggedImage, setDraggedImage] = useState<string | null>(null);
  const [isOrderingImages, setIsOrderingImages] = useState(false);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [isReordering, setIsReordering] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const orderedProducts = sortProducts(products);

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    if (uploadInputRef.current) {
      uploadInputRef.current.value = "";
    }
  }

  function beginEdit(product: AdminProduct) {
    setEditingId(product.id);
    setForm({
      title: product.title,
      slug: product.slug,
      description: product.description ?? "",
      price: String(product.price),
      originalPrice:
        product.original_price === null || product.original_price === undefined
          ? ""
          : String(product.original_price),
      images: (product.images ?? []).join("\n"),
      isAvailable: product.is_available,
    });
    setMessage("");
    setError("");
  }

  function setImagesValue(images: string[]) {
    setForm((current) => ({
      ...current,
      images: images.join("\n"),
    }));
  }

  async function persistImageOrder(images: string[], successMessage: string) {
    if (!editingId) {
      setError("Najpierw wybierz zapisany produkt.");
      return;
    }

    setIsOrderingImages(true);
    setMessage("");
    setError("");

    const response = await fetch(`/api/admin/products/${editingId}/images`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ images }),
    });

    const data = (await response.json()) as {
      error?: string;
      product?: AdminProduct;
    };

    setIsOrderingImages(false);

    if (!response.ok || !data.product) {
      setError(data.error ?? "Nie udało się zapisać kolejności zdjęć.");
      return;
    }

    setProducts((current) =>
      current.map((item) => (item.id === editingId ? data.product! : item)),
    );
    setImagesValue(data.product.images ?? []);
    setMessage(successMessage);
  }

  async function uploadFiles(files: File[]) {
    if (!editingId) {
      setError("Najpierw zapisz produkt, a potem dodawaj zdjęcia.");
      return;
    }

    if (files.length === 0) {
      return;
    }

    setIsUploading(true);
    setMessage("");
    setError("");

    const uploadForm = new FormData();

    files.forEach((file) => {
      uploadForm.append("files", file);
    });

    const response = await fetch(`/api/admin/products/${editingId}/images`, {
      method: "POST",
      body: uploadForm,
    });

    const data = (await response.json()) as {
      error?: string;
      uploadedUrls?: string[];
      product?: AdminProduct;
    };

    setIsUploading(false);

    if (!response.ok || !data.product) {
      setError(data.error ?? "Nie udało się wgrać zdjęć.");
      return;
    }

    setProducts((current) =>
      current.map((item) => (item.id === editingId ? data.product! : item)),
    );
    setImagesValue(data.product.images ?? []);
    setMessage(
      `Dodano ${data.uploadedUrls?.length ?? 0} zdjęć do folderu produktu.`,
    );

    if (uploadInputRef.current) {
      uploadInputRef.current.value = "";
    }
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    await uploadFiles(Array.from(files));
  }

  async function handleImageDelete(imageUrl: string) {
    if (!editingId) {
      setError("Najpierw wybierz zapisany produkt.");
      return;
    }

    const shouldDelete = window.confirm("Usunąć to zdjęcie z produktu i storage?");
    if (!shouldDelete) return;

    setDeletingImage(imageUrl);
    setMessage("");
    setError("");

    const response = await fetch(`/api/admin/products/${editingId}/images`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    const data = (await response.json()) as {
      error?: string;
      product?: AdminProduct;
    };

    setDeletingImage(null);

    if (!response.ok || !data.product) {
      setError(data.error ?? "Nie udało się usunąć zdjęcia.");
      return;
    }

    setProducts((current) =>
      current.map((item) => (item.id === editingId ? data.product! : item)),
    );
    setImagesValue(data.product.images ?? []);
    setMessage("Zdjęcie zostało usunięte.");
  }

  const imageList = form.images
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

  async function handleSetAsFirst(imageUrl: string) {
    const nextImages = [imageUrl, ...imageList.filter((item) => item !== imageUrl)];
    await persistImageOrder(nextImages, "Zdjęcie główne zostało ustawione.");
  }

  async function handleImageReorder(sourceImage: string, targetImage: string) {
    if (sourceImage === targetImage) return;

    const sourceIndex = imageList.indexOf(sourceImage);
    const targetIndex = imageList.indexOf(targetImage);

    if (sourceIndex === -1 || targetIndex === -1) return;

    const nextImages = [...imageList];
    const [movedImage] = nextImages.splice(sourceIndex, 1);
    nextImages.splice(targetIndex, 0, movedImage);
    await persistImageOrder(nextImages, "Kolejność zdjęć została zapisana.");
  }

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    setMessage("");
    setError("");

    const payload = {
      title: String(formData.get("title") ?? ""),
      slug: String(formData.get("slug") ?? ""),
      description: String(formData.get("description") ?? ""),
      price: String(formData.get("price") ?? ""),
      originalPrice: String(formData.get("originalPrice") ?? ""),
      images: String(formData.get("images") ?? ""),
      isAvailable: formData.get("isAvailable") === "on",
    };

    const endpoint = editingId
      ? `/api/admin/products/${editingId}`
      : "/api/admin/products";
    const method = editingId ? "PATCH" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as {
      error?: string;
      product?: AdminProduct;
    };

    setIsSaving(false);

    if (!response.ok || !data.product) {
      setError(data.error ?? "Nie udało się zapisać produktu.");
      return;
    }

    setProducts((current) => {
      if (editingId) {
        return current.map((item) => (item.id === editingId ? data.product! : item));
      }

      return assignSequentialPositions(sortProducts([...current, data.product!]));
    });

    setMessage(editingId ? "Produkt został zaktualizowany." : "Produkt został dodany.");
    resetForm();
  }

  async function handleDelete(id: string) {
    const shouldDelete = window.confirm("Usunąć ten produkt?");
    if (!shouldDelete) return;

    setMessage("");
    setError("");

    const response = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Nie udało się usunąć produktu.");
      return;
    }

    setProducts((current) =>
      assignSequentialPositions(sortProducts(current.filter((item) => item.id !== id))),
    );
    if (editingId === id) resetForm();
    setMessage("Produkt został usunięty.");
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveProductId(null);

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = products.findIndex((product) => product.id === active.id);
    const newIndex = products.findIndex((product) => product.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const previousProducts = [...products];
    const updatedProducts = assignSequentialPositions(
      arrayMove(products, oldIndex, newIndex),
    );

    console.log(updatedProducts);

    if (!updatedProducts.every((product) => product.position > 0)) {
      setError("Nieprawidłowa kolejność produktów.");
      return;
    }

    setProducts(updatedProducts);
    setIsReordering(true);
    setMessage("");
    setError("");

    const response = await fetch("/api/admin/products/reorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: updatedProducts.map((product) => ({
          id: product.id,
          position: product.position,
        })),
      }),
    });

    const data = (await response.json()) as {
      error?: string;
      products?: AdminProduct[];
    };

    setIsReordering(false);

    if (!response.ok || !data.products) {
      setProducts(previousProducts);
      setError(data.error ?? "Nie udało się zapisać kolejności produktów.");
      return;
    }

    setProducts(assignSequentialPositions(sortProducts(data.products)));
    setMessage("Kolejność produktów została zapisana.");
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveProductId(String(event.active.id));
    setMessage("");
    setError("");
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-moon-rose-dark">
          Produkty
        </p>
        <h2 className="text-3xl text-moon-contrast">Dodawanie, edycja i usuwanie</h2>
      </div>

      <form
        action={handleSubmit}
        className="grid gap-4 rounded-[1.5rem] border border-moon-contrast/10 bg-[linear-gradient(135deg,rgba(250,246,241,0.95),rgba(242,225,214,0.7))] p-5 shadow-sm md:grid-cols-2"
      >
        <Input
          label="Tytuł"
          name="title"
          value={form.title}
          onChange={(event) =>
            setForm((current) => ({ ...current, title: event.target.value }))
          }
          required
        />
        <Input
          label="Slug"
          name="slug"
          value={form.slug}
          onChange={(event) =>
            setForm((current) => ({ ...current, slug: event.target.value }))
          }
          placeholder="opcjonalny"
        />
        <Input
          label="Cena"
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={form.price}
          onChange={(event) =>
            setForm((current) => ({ ...current, price: event.target.value }))
          }
          required
        />
        <Input
          label="Cena przed promocją"
          name="originalPrice"
          type="number"
          step="0.01"
          min="0"
          value={form.originalPrice}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              originalPrice: event.target.value,
            }))
          }
          placeholder="opcjonalna"
        />
        <label className="flex items-center gap-3 rounded-[1.25rem] border border-moon-contrast/10 bg-moon-white/70 px-4 py-3 text-sm text-moon-contrast">
          <input
            type="checkbox"
            name="isAvailable"
            checked={form.isAvailable}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                isAvailable: event.target.checked,
              }))
            }
            className="h-4 w-4 accent-moon-rose-dark"
          />
          Produkt dostępny w sklepie
        </label>
        <div className="md:col-span-2">
          <Textarea
            label="Opis"
            name="description"
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            rows={5}
          />
        </div>
        <div className="md:col-span-2">
          <Textarea
            label="Zdjęcia (URL, oddzielone enterem lub przecinkiem)"
            name="images"
            value={form.images}
            onChange={(event) =>
              setForm((current) => ({ ...current, images: event.target.value }))
            }
            rows={4}
          />
        </div>

        <div className="md:col-span-2 rounded-[1.25rem] border border-moon-contrast/10 bg-moon-white/60 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-moon-contrast">
                Upload do Supabase Storage
              </p>
              <p className="text-sm text-moon-contrast/68">
                Zdjęcia trafiają do osobnego folderu produktu.
                {!editingId
                  ? " Najpierw zapisz nowy produkt, potem dodawaj pliki."
                  : " Ten produkt jest już gotowy do uploadu i porządkowania galerii."}
              </p>
            </div>

            <label className="inline-flex">
              <input
                ref={uploadInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={!editingId || isUploading}
              />
              <span className="inline-flex cursor-pointer items-center justify-center rounded-full border border-moon-contrast/20 bg-moon-white/75 px-4 py-2 text-sm font-semibold text-moon-contrast shadow-[0_10px_25px_rgba(47,42,40,0.06)] transition hover:-translate-y-0.5 hover:bg-moon-white">
                {isUploading ? "Wgrywanie..." : "Dodaj zdjęcia"}
              </span>
            </label>
          </div>

          <div
            className={`mt-4 rounded-[1.25rem] border border-dashed px-4 py-5 text-center transition ${
              isDraggingFiles
                ? "border-moon-rose-dark bg-[#f7ece4]"
                : "border-moon-contrast/18 bg-[#fbf7f3]"
            }`}
            onDragOver={(event) => {
              event.preventDefault();
              if (editingId) setIsDraggingFiles(true);
            }}
            onDragLeave={() => setIsDraggingFiles(false)}
            onDrop={async (event) => {
              event.preventDefault();
              setIsDraggingFiles(false);
              if (!editingId) return;
              const files = Array.from(event.dataTransfer.files).filter((file) =>
                file.type.startsWith("image/"),
              );
              await uploadFiles(files);
            }}
          >
            <p className="text-sm font-semibold text-moon-contrast">
              Przeciągnij zdjęcia tutaj
            </p>
            <p className="mt-1 text-sm text-moon-contrast/68">
              Upload wieloplikowy, osobny folder produktu, automatyczne dopisanie do galerii.
            </p>
          </div>

          {imageList.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {imageList.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  draggable
                  onDragStart={() => setDraggedImage(image)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={async () => {
                    if (!draggedImage) return;
                    await handleImageReorder(draggedImage, image);
                    setDraggedImage(null);
                  }}
                  onDragEnd={() => setDraggedImage(null)}
                  className={`overflow-hidden rounded-xl border bg-[#faf6f1] shadow-sm transition ${
                    index === 0
                      ? "border-moon-rose/35 ring-1 ring-moon-rose/20"
                      : "border-moon-contrast/10"
                  } ${draggedImage === image ? "opacity-60" : ""}`}
                >
                  <div className="aspect-square overflow-hidden bg-moon-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={`Miniatura ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="border-t border-moon-contrast/8 px-3 py-2">
                    <div className="flex items-center justify-between gap-2 text-[0.72rem] text-moon-contrast/62">
                      <span>{index === 0 ? "Główne" : `Zdjęcie ${index + 1}`}</span>
                      <span className="text-[0.64rem] uppercase tracking-[0.08em] text-moon-contrast/48">
                        drag
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleSetAsFirst(image)}
                        disabled={!editingId || isOrderingImages || index === 0}
                        className="rounded-full border border-moon-contrast/12 bg-moon-white px-2.5 py-1 text-[0.68rem] font-semibold text-moon-contrast transition hover:border-moon-rose/30 hover:text-moon-rose-dark disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {index === 0 ? "Zdjęcie główne" : "Ustaw jako pierwsze"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleImageDelete(image)}
                        disabled={!editingId || deletingImage === image}
                        className="rounded-full border border-moon-contrast/12 bg-moon-white px-2.5 py-1 text-[0.68rem] font-semibold text-moon-contrast transition hover:border-moon-rose/30 hover:text-moon-rose-dark disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingImage === image ? "Usuwanie..." : "Usuń"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={isSaving}>
            {isSaving
              ? "Zapisywanie..."
              : editingId
                ? "Zapisz zmiany"
                : "Dodaj produkt"}
          </Button>
          <Button type="button" variant="outline" onClick={resetForm}>
            {editingId ? "Anuluj edycję" : "Wyczyść formularz"}
          </Button>

          {message ? <p className="text-sm text-green-700">{message}</p> : null}
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
      </form>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl text-moon-contrast">Kolejność produktów</h3>
            <p className="text-sm text-moon-contrast/68">
              Przeciągnij karty, aby zmienić kolejność wyświetlania w sklepie.
            </p>
          </div>
          {isReordering ? (
            <p className="text-sm font-semibold text-moon-rose-dark">
              Zapisywanie kolejności...
            </p>
          ) : null}
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveProductId(null)}
        >
          <SortableContext
            items={orderedProducts.map((product) => product.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {orderedProducts.map((product) => (
                <ProductGridCard
                  key={product.id}
                  product={product}
                  onEdit={() => beginEdit(product)}
                  onDelete={() => handleDelete(product.id)}
                  isReordering={isReordering}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {activeProductId ? (
          <p className="text-xs uppercase tracking-[0.14em] text-moon-contrast/52">
            Przenosisz:{" "}
            {orderedProducts.find((product) => product.id === activeProductId)?.title}
          </p>
        ) : null}
      </div>
    </div>
  );
}
