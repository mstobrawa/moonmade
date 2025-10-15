"use client";
import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`bg-moon-rose text-moon-contrast font-bold px-4 py-2 rounded-xl hover:bg-moon-rose-dark transition border border-moon-contrast ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
