"use client";

import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

/**
 * Rejestracja: prosty formularz z walidacją (client-side).
 */
export default function RegisterForm() {
  // ---------- STANY ----------
  // trzymamy wartości pól formularza
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // trzymamy błędy - klucz = nazwa pola, wartość = komunikat
  const [errors, setErrors] = useState<Record<string, string>>({});

  // flaga wysyłania (opcjonalna, można użyć do disable przycisku)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---------- HELPERY / WALIDACJA ----------
  // prosty regex na e-mail (wystarczający dla większości form)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // funkcja, która sprawdza wszystkie pola i zwraca obiekt błędów
  function validateAll(values: typeof form) {
    const e: Record<string, string> = {};

    // firstName / lastName - wymagane
    if (!values.firstName.trim()) e.firstName = "Imię jest wymagane.";
    if (!values.lastName.trim()) e.lastName = "Nazwisko jest wymagane.";

    // email - wymagany i matching regex
    if (!values.email.trim()) e.email = "E-mail jest wymagany.";
    else if (!emailRegex.test(values.email))
      e.email = "Nieprawidłowy format e-mail.";

    // password - wymagane i min długość
    if (!values.password) e.password = "Hasło jest wymagane.";
    else if (values.password.length < 8)
      e.password = "Hasło musi mieć co najmniej 8 znaków.";

    // confirmPassword - wymagane i równość
    if (!values.confirmPassword) e.confirmPassword = "Potwierdź hasło.";
    else if (values.password !== values.confirmPassword)
      e.confirmPassword = "Hasła nie są identyczne.";

    return e;
  }

  // ---------- HANDLERY ----------
  // update stanu formularza przy zmianie inputa
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // opcjonalnie: możemy czyścić błąd pojedynczego pola przy zmianie
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  // obsługa przysiskiu resetu formularza
  const handleReset = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  // obsługa submitu: walidacja -> jeśli ok, dalsze akcje
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ochrona przed wielokrotnym kliknięciem
    if (isSubmitting) return;

    const validation = validateAll(form);
    setErrors(validation);

    // jeśli są błędy - przerywamy
    if (Object.keys(validation).length > 0) return;

    // symulacja wysyłania / dalszej logiki
    setIsSubmitting(true);
    // na razie tylko logujemy — tutaj podłączysz fetch/do API
    console.log("✅ Formularz gotowy do wysyłki:", form);

    // symulujemy krótkie zakończenie (jeszcze bez backendu)
    setTimeout(() => {
      setIsSubmitting(false);
      // opcjonalnie wyczyść formularz po sukcesie:
      // setForm({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
    }, 600);
  };

  // ---------- RENDER ----------
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex flex-col gap-4"
    >
      <div>
        <Input
          label="Imię"
          name="firstName"
          type="text"
          value={form.firstName}
          onChange={handleChange}
          placeholder="Imię"
          required
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
        )}
      </div>

      <div>
        <Input
          label="Nazwisko"
          name="lastName"
          type="text"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Nazwisko"
          required
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
        )}
      </div>

      <div>
        <Input
          label="E-mail"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="E-mail"
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Input
          label="Hasło"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Hasło"
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <Input
          label="Powtórz hasło"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Powtórz hasło"
          required
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" onClick={handleReset}>
          Wyczyść
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Przetwarzanie..." : "Zarejestruj"}
        </Button>
      </div>
    </form>
  );
}
