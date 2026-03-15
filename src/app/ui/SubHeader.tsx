export default function SubHeader() {
  return (
    <div className="w-full border-b border-white/12 bg-gradient-to-r from-[#2F2A28] via-[#6a625e] to-[#2F2A28] py-3 shadow-[0_10px_24px_rgba(47,42,40,0.22)]">
      <div className="mx-auto flex max-w-7xl items-center justify-evenly px-6">
        <div className="hidden flex-1 justify-between text-[0.72rem] font-medium tracking-[0.24em] text-[#FAF9F6] sm:flex">
          <span className="transition hover:text-[#FCEDDA]">Agat</span>
          <span className="transition hover:text-[#FCEDDA]">Kwarc</span>
          <span className="transition hover:text-[#FCEDDA]">Ametyst</span>
        </div>

        <h2 className="flex-1 text-center text-base font-semibold tracking-[0.26em] text-[#FAF9F6] sm:text-xl">
          Z&nbsp;MIŁOŚCI&nbsp;DO&nbsp;KAMIENI
        </h2>

        <div className="hidden flex-1 justify-between text-[0.72rem] font-medium tracking-[0.24em] text-[#FAF9F6] sm:flex">
          <span className="transition hover:text-[#FCEDDA]">Turmalin</span>
          <span className="transition hover:text-[#FCEDDA]">Onyks</span>
          <span className="transition hover:text-[#FCEDDA]">
            Labradoryt
          </span>
        </div>
      </div>
    </div>
  );
}
