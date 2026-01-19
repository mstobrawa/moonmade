"use client";

import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export default function Input({ label, className = "", ...props }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    // ⬇️ KLUCZ: wrapper MA TŁO
    <div className={`relative w-full bg-moon-white ${className}`}>
      {/* INPUT */}
      <input
        id={props.id || label}
        {...props}
        type={props.type === "password" && showPassword ? "text" : props.type}
        placeholder=" "
        className="
          peer
          w-full
          border-2
          rounded-xl
          border-moon-contrast
          bg-transparent
          px-4
          py-3
          pr-10
          text-moon-contrast
          placeholder-transparent
          focus:outline-none
          focus:border-moon-rose-dark
        "
      />

      {/* Oczko */}
      {props.type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-moon-rose-dark hover:text-moon-rose"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {/* LABEL */}
      {label && (
        <label
          htmlFor={props.id || label}
          className="
            absolute
            left-4
            top-3
            px-1
            text-moon-rose-dark
            bg-moon-white
            transition-all
            duration-200
            pointer-events-none
            peer-placeholder-shown:top-3
            peer-placeholder-shown:text-base
            peer-focus:-top-2
            peer-focus:text-sm
            peer-not-placeholder-shown:-top-2
            peer-not-placeholder-shown:text-sm
          "
        >
          {label}
        </label>
      )}
    </div>
  );
}
