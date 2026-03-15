export default function FooterBottom() {
  return (
    <div className="mt-12 space-y-2 border-t border-white/12 pt-6 text-center">
      <p className="text-xs tracking-[0.12em] text-[#FAF9F6]">
        © {new Date().getFullYear()} Moonmade.pl
      </p>

      <p className="text-[10px] tracking-[0.18em] text-[#FAF9F6]/70">
        crafted by Mike Webworks
      </p>
    </div>
  );
}
