"use client";

import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  className?: string;
  error?: string;
  rows?: number;
  resize?: "none" | "y" | "x" | "both";
}

export default function Textarea({
  label,
  className = "",
  error,
  rows = 4,
  resize = "y",
  ...props
}: TextareaProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <textarea
        id={props.id || label}
        {...props}
        rows={rows}
        placeholder=" "
        className={`peer w-full rounded-xl border-2 bg-transparent p-3 text-moon-contrast transition focus:outline-none ${
          error
            ? "border-red-500"
            : "border-moon-contrast focus:border-moon-rose-dark"
        } ${
          resize === "none"
            ? "resize-none"
            : resize === "x"
              ? "resize-x"
              : resize === "both"
                ? "resize"
                : "resize-y"
        }`}
      />
      <label
        htmlFor={props.id || label}
        className={`absolute left-3 bg-moon-cream px-1 transition-all duration-200
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-moon-rose
          peer-focus:-top-3 peer-focus:text-sm peer-focus:text-moon-rose-dark
          peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-moon-rose-dark
          ${error ? "text-red-500" : "text-moon-rose-dark"}
        `}
      >
        {label}
      </label>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
