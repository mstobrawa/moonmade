"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        id={props.id || label}
        {...props}
        placeholder=" " // ważne
        className={`peer w-full border-2 rounded-xl border-moon-contrast bg-transparent p-2 text-moon-contrast focus:outline-none focus:border-moon-rose-dark ${className}`}
      />

      <label
        htmlFor={props.id || label}
        className="absolute left-2 top-2 bg-moon-cream px-1 text-moon-rose-dark transition-all duration-200
                   peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-moon-rose
                   peer-focus:-top-3 peer-focus:text-sm peer-focus:text-moon-rose-dark
                   peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-moon-rose-dark"
      >
        {label}
      </label>
    </div>
  );
}
