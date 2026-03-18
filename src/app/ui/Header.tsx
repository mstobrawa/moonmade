import Logo from "./Logo";
import Navigation from "./Navigation";
import HeaderUser from "./HeaderUser";

export default function Header() {
  return (
    <header className="w-full border-b border-moon-contrast/10 bg-[linear-gradient(180deg,rgba(252,237,218,0.88),rgba(247,231,216,0.76))] px-4 py-3 shadow-[0_12px_36px_rgba(47,42,40,0.06)] backdrop-blur-xl sm:px-6">
      <div className="mx-auto max-w-6xl md:max-w-[1200px]">
        <Logo />
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between sm:hidden">
        <Navigation />
        <HeaderUser />
      </div>

      <div className="mx-auto hidden w-full max-w-6xl items-center justify-between pt-1.5 sm:flex md:max-w-[1200px]">
        <Navigation />
        <HeaderUser />
      </div>
    </header>
  );
}
