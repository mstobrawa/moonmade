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
    <div className={`relative w-full ${className}`}>
      {/* Pole input */}
      <input
        id={props.id || label}
        {...props}
        type={props.type === "password" && showPassword ? "text" : props.type}
        placeholder=" "
        className={`peer w-full border-2 rounded-xl border-moon-contrast bg-transparent p-2 pr-10 
                    text-moon-contrast focus:outline-none focus:border-moon-rose-dark 
                    bg-autofill-moon-cream ${className}`}
      />

      {/* Oczko — tylko dla pól password */}
      {props.type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-2 text-moon-rose-dark hover:text-moon-rose transition-colors"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {/* Label */}
      {label && (
        <label
          htmlFor={props.id || label}
          className="absolute left-2 top-2 bg-moon-cream px-1 text-moon-rose-dark transition-all duration-200
                     peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-moon-rose
                     peer-focus:-top-3 peer-focus:text-sm peer-focus:text-moon-rose-dark
                     peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-moon-rose-dark"
        >
          {label}
        </label>
      )}
    </div>
  );
}
