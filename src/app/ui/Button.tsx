"use client";
import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`bg-moon-rose text-moon-contrast px-4 py-2 rounded-xl hover:bg-moon-rose-dark transition %{className}`}
      {...props}
    >
      {children}
    </button>
  );
}
