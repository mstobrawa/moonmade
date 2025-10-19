"use client";

export default function SubHeader() {
  return (
    <div className="w-full bg-moon-contrast py-3 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-evenly">
        {/* Lewa sekcja (widoczna tylko na desktopie) */}
        <div className="hidden sm:flex justify-between flex-1 text-moon-cream text-sm font-light">
          <span className="hover:drop-shadow-[0_0_6px_rgba(252,237,218,0.9)] transition">
            Agat
          </span>
          <span className="hover:drop-shadow-[0_0_6px_rgba(252,237,218,0.9)] transition">
            Kwarc
          </span>
          <span className="hover:drop-shadow-[0_0_6px_rgba(252,237,218,0.9)] transition">
            Ametyst
          </span>
        </div>

        {/* Środkowy napis (zawsze widoczny) */}
        <h2 className="text-center text-moon-cream text-lg sm:text-2xl font-semibold flex-1 hover:drop-shadow-[0_0_6px_rgba(252,237,218,0.9)] transition">
          Z&nbsp;MIŁOŚCI&nbsp;DO&nbsp;KAMIENI
        </h2>

        {/* Prawa sekcja (widoczna tylko na desktopie) */}
        <div className="hidden sm:flex justify-between flex-1 text-moon-cream text-sm font-light">
          <span className="hover:drop-shadow-[0_0_6px_rgba(252,237,218,0.9)] transition">
            Turmalin
          </span>
          <span className="hover:drop-shadow-[0_0_6px_rgba(252,237,218,0.9)] transition">
            Onyks
          </span>
          <span className="hover:drop-shadow-[0_0_6px_rgba(252,237,218,0.9)] transition">
            Labradoryt
          </span>
        </div>
      </div>
    </div>
  );
}
