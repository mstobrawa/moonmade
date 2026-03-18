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
      <input
        id={props.id || label}
        {...props}
        type={props.type === "password" && showPassword ? "text" : props.type}
        placeholder=" "
        className="
          peer
          w-full
          rounded-[1.25rem]
          border
          border-moon-contrast/15
          bg-moon-white/80
          px-4
          py-3.5
          pr-10
          text-moon-contrast
          placeholder-transparent
          shadow-[0_10px_24px_rgba(47,42,40,0.05)]
          transition-all
          duration-300
          focus:border-moon-rose-dark/50
          focus:bg-moon-white
          focus:outline-none
          focus:shadow-[0_14px_30px_rgba(138,110,108,0.12)]
        "
      />

      {props.type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-moon-rose-dark transition-colors duration-300 hover:text-moon-rose"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {label && (
        <label
          htmlFor={props.id || label}
          className="
            pointer-events-none
            absolute
            left-4
            top-3.5
            rounded-full
            bg-moon-white
            px-2
            text-moon-rose-dark/85
            transition-all
            duration-200
            peer-placeholder-shown:top-3.5
            peer-placeholder-shown:text-base
            peer-focus:-top-2.5
            peer-focus:text-sm
            peer-not-placeholder-shown:-top-2.5
            peer-not-placeholder-shown:text-sm
          "
        >
          {label}
        </label>
      )}
    </div>
  );
}
