"use client";

import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function RegisterForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateAll(values: typeof form) {
    const nextErrors: Record<string, string> = {};

    if (!values.firstName.trim()) nextErrors.firstName = "Imię jest wymagane.";
    if (!values.lastName.trim()) nextErrors.lastName = "Nazwisko jest wymagane.";

    if (!values.email.trim()) nextErrors.email = "E-mail jest wymagany.";
    else if (!emailRegex.test(values.email))
      nextErrors.email = "Nieprawidłowy format e-mail.";

    if (!values.password) nextErrors.password = "Hasło jest wymagane.";
    else if (values.password.length < 8)
      nextErrors.password = "Hasło musi mieć co najmniej 8 znaków.";

    if (!values.confirmPassword)
      nextErrors.confirmPassword = "Potwierdź hasło.";
    else if (values.password !== values.confirmPassword)
      nextErrors.confirmPassword = "Hasła nie są identyczne.";

    return nextErrors;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validation = validateAll(form);
    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    setIsSubmitting(true);
    console.log("Formularz gotowy do wysylki:", form);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
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
          <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
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
          <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
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
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
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
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
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
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
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
