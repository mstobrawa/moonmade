"use client";

import { useMemo, useRef, useState } from "react";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import Textarea from "@/app/ui/Textarea";

type AdminProduct = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  is_available: boolean;
  created_at?: string | null;
};

type ProductFormState = {
  title: string;
  slug: string;
  description: string;
  price: string;
  images: string;
  isAvailable: boolean;
};

const emptyForm: ProductFormState = {
  title: "",
  slug: "",
  description: "",
  price: "",
  images: "",
  isAvailable: true,
};

export default function AdminProductsManager({
  initialProducts,
}: {
  initialProducts: AdminProduct[];
}) {
  const [products, setProducts] = useState(initialProducts);
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
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  const sortedProducts = useMemo(
    () =>
      [...products].sort((a, b) => {
        const aTime = new Date(a.created_at ?? 0).getTime();
        const bTime = new Date(b.created_at ?? 0).getTime();
        return bTime - aTime;
      }),
    [products],
  );

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
      setError(data.error ?? "Nie udalo sie zapisac kolejnosci zdjec.");
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
      setError("Najpierw zapisz produkt, a potem dodawaj zdjecia.");
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
      setError(data.error ?? "Nie udalo sie wgrac zdjec.");
      return;
    }

    setProducts((current) =>
      current.map((item) => (item.id === editingId ? data.product! : item)),
    );
    setImagesValue(data.product.images ?? []);
    setMessage(
      `Dodano ${data.uploadedUrls?.length ?? 0} zdjec do folderu produktu.`,
    );

    if (uploadInputRef.current) {
      uploadInputRef.current.value = "";
    }
  }

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
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

    const shouldDelete = window.confirm("Usunac to zdjecie z produktu i storage?");
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
      setError(data.error ?? "Nie udalo sie usunac zdjecia.");
      return;
    }

    setProducts((current) =>
      current.map((item) => (item.id === editingId ? data.product! : item)),
    );
    setImagesValue(data.product.images ?? []);
    setMessage("Zdjecie zostalo usuniete.");
  }

  const imageList = form.images
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

  async function handleSetAsFirst(imageUrl: string) {
    const nextImages = [imageUrl, ...imageList.filter((item) => item !== imageUrl)];
    await persistImageOrder(nextImages, "Zdjecie glowne zostalo ustawione.");
  }

  async function handleImageReorder(sourceImage: string, targetImage: string) {
    if (sourceImage === targetImage) return;

    const sourceIndex = imageList.indexOf(sourceImage);
    const targetIndex = imageList.indexOf(targetImage);

    if (sourceIndex === -1 || targetIndex === -1) return;

    const nextImages = [...imageList];
    const [movedImage] = nextImages.splice(sourceIndex, 1);
    nextImages.splice(targetIndex, 0, movedImage);
    await persistImageOrder(nextImages, "Kolejnosc zdjec zostala zapisana.");
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
      setError(data.error ?? "Nie udalo sie zapisac produktu.");
      return;
    }

    setProducts((current) => {
      if (editingId) {
        return current.map((item) => (item.id === editingId ? data.product! : item));
      }

      return [data.product!, ...current];
    });

    setMessage(editingId ? "Produkt zostal zaktualizowany." : "Produkt zostal dodany.");
    resetForm();
  }

  async function handleDelete(id: string) {
    const shouldDelete = window.confirm("Usunac ten produkt?");
    if (!shouldDelete) return;

    setMessage("");
    setError("");

    const response = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Nie udalo sie usunac produktu.");
      return;
    }

    setProducts((current) => current.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
    setMessage("Produkt zostal usuniety.");
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
          label="Tytul"
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
          Produkt dostepny w sklepie
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
            label="Zdjecia (URL, oddzielone enterem lub przecinkiem)"
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
                Zdjecia trafiaja do osobnego folderu produktu.
                {!editingId
                  ? " Najpierw zapisz nowy produkt, potem dodawaj pliki."
                  : " Ten produkt jest juz gotowy do uploadu i porzadkowania galerii."}
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
                {isUploading ? "Wgrywanie..." : "Dodaj zdjecia"}
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
              Przeciagnij zdjecia tutaj
            </p>
            <p className="mt-1 text-sm text-moon-contrast/68">
              Upload wielopliki, osobny folder produktu, automatyczne dopisanie do galerii.
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
                      <span>{index === 0 ? "Glowne" : `Zdjecie ${index + 1}`}</span>
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
                        {index === 0 ? "Zdjecie glowne" : "Ustaw jako pierwsze"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleImageDelete(image)}
                        disabled={!editingId || deletingImage === image}
                        className="rounded-full border border-moon-contrast/12 bg-moon-white px-2.5 py-1 text-[0.68rem] font-semibold text-moon-contrast transition hover:border-moon-rose/30 hover:text-moon-rose-dark disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingImage === image ? "Usuwanie..." : "Usun"}
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
            {editingId ? "Anuluj edycje" : "Wyczysc formularz"}
          </Button>

          {message ? <p className="text-sm text-green-700">{message}</p> : null}
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
      </form>

      <div className="space-y-4">
        {sortedProducts.map((product) => (
          <article
            key={product.id}
            className="rounded-[1.5rem] border border-moon-contrast/10 bg-moon-white/65 p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl text-moon-contrast">{product.title}</h3>
                  <span className="rounded-full bg-moon-contrast/8 px-3 py-1 text-xs uppercase tracking-[0.12em] text-moon-contrast/70">
                    {product.is_available ? "dostepny" : "ukryty"}
                  </span>
                </div>
                <p className="text-sm text-moon-contrast/68">/{product.slug}</p>
                <p className="max-w-3xl text-sm leading-6 text-moon-contrast/75">
                  {product.description || "Brak opisu."}
                </p>
                <p className="text-sm font-semibold text-moon-rose-dark">
                  {product.price} zl
                </p>
                <p className="text-xs text-moon-contrast/58">
                  Zdjec: {product.images?.length ?? 0}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => beginEdit(product)}>
                  Edytuj
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(product.id)}>
                  Usun
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
