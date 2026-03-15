import Logo from "./Logo";
import Navigation from "./Navigation";
import HeaderUser from "./HeaderUser";

export default function Header() {
  return (
    <header className="w-full border-b border-moon-contrast/10 bg-[linear-gradient(180deg,rgba(252,237,218,0.88),rgba(247,231,216,0.76))] px-4 py-4 shadow-[0_12px_36px_rgba(47,42,40,0.06)] backdrop-blur-xl sm:px-6">
      {/* Logo */}
      <div className="mx-auto max-w-6xl">
        <Logo />
      </div>

      {/* Mobile row: burger + user */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between sm:hidden">
        <Navigation /> {/* burger menu */}
        <HeaderUser /> {/* koszyk + konto */}
      </div>

      {/* Desktop: logo w tej samej kolumnie, menu + user w wierszu */}
      <div className="mx-auto hidden w-full max-w-6xl items-center justify-between pt-2 sm:flex">
        <Navigation />
        <HeaderUser />
      </div>
    </header>
  );
}
