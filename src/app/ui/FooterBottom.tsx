import React from "react";

export default function FooterBottom() {
  return (
    <div className="mt-10 border-t border-moon-rose-dark pt-4 text-center text-xs text-moon-cream">
      © {new Date().getFullYear()} moonmade.pl — wszystkie prawa zastrzeżone
    </div>
  );
}
