"use client";

import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm() {
  return (
    <form
      className="flex w-full max-w-md flex-col gap-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <Input label="E-mail" type="email" name="email" required />
      <Input label="Hasło" type="password" name="password" required />
      <div className="flex justify-end">
        <Button type="submit">Zaloguj</Button>
      </div>
    </form>
  );
}
