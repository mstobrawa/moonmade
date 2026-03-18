"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";

export default function AdminLoginForm({
  nextPath = "/admin",
}: {
  nextPath?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    setError("");

    const response = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Nie udalo sie zalogowac.");
      return;
    }

    startTransition(() => {
      router.replace(nextPath || "/admin");
      router.refresh();
    });
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 rounded-[1.75rem] border border-moon-contrast/10 bg-moon-white/55 p-6 shadow-[0_18px_40px_rgba(47,42,40,0.08)] backdrop-blur-sm"
    >
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-moon-rose-dark">
          Moonmade Admin
        </p>
        <h1 className="text-3xl text-moon-contrast">Logowanie do panelu</h1>
      </div>

      <Input label="Email" name="email" type="email" required />
      <Input label="Haslo" name="password" type="password" required />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? "Logowanie..." : "Zaloguj"}
      </Button>
    </form>
  );
}
