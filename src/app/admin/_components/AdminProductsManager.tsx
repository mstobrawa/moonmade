"use client";

import { useMemo, useState } from "react";
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
