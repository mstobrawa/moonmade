"use client";

import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm() {
  return (
    <form
      className="w-full max-w-md flex flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input label="E-mail" type="email" name="email" required />
      <Input label="Hasło" type="password" name="password" required />
      <div className="flex justify-end">
        <Button type="submit">Zaloguj</Button>
      </div>
    </form>
  );
}
