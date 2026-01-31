"use client";

export default function FooterBottom() {
  return (
    <div className="mt-10 border-t border-moon-cream/20 pt-4 text-center space-y-1">
      <p className="text-xs text-moon-cream/70">
        © {new Date().getFullYear()} Moonmade.pl
      </p>

      <p className="text-[10px] text-moon-cream/40 tracking-wide">
        crafted by Mike Webworks
      </p>
    </div>
  );
}
