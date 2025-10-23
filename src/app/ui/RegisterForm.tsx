"use client";

import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function RegisterForm() {
  return (
    <form
      className="w-full max-w-md flex flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input label="Imię" type="text" name="firstName" required />
      <Input label="Nazwisko" type="text" name="lastName" required />
      <Input label="E-mail" type="email" name="email" required />
      <Input label="Hasło" type="password" name="password" required />
      <Input label="Powtórz hasło" type="password" name="password2" required />
      <div className="flex justify-end">
        <Button type="submit">Zarejestruj</Button>
      </div>
    </form>
  );
}
