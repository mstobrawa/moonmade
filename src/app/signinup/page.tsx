"use client";

import React from "react";
import LoginForm from "../ui/LoginForm";
import RegisterForm from "../ui/RegisterForm";

export default function SignInUpPage() {
  return (
    <main className="min-h-screen bg-moon-cream flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-moon-contrast">
          Logowanie / Rejestracja
        </h1>

        {/* Grid: mobile -> stacked, desktop -> two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Login panel */}
          <section className="rounded-2xl p-6 bg-moon-cream shadow-2xl">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-moon-contrast">
                Logowanie
              </h2>
              <p className="text-sm text-moon-rose-dark/80">
                Masz już konto? Zaloguj się.
              </p>
            </div>
            <LoginForm />
          </section>

          {/* Register panel */}
          <section className="rounded-2xl p-6 bg-moon-cream shadow-2xl">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-moon-contrast">
                Rejestracja
              </h2>
              <p className="text-sm text-moon-rose-dark/80">
                Stwórz nowe konto.
              </p>
            </div>
            <RegisterForm />
          </section>
        </div>
      </div>
    </main>
  );
}
