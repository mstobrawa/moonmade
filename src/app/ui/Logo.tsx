import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 100, className = "" }: LogoProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-3 ${className}`}
    >
      <span className="moon-brand-text order-2 text-center text-3xl text-moon-contrast sm:order-1 sm:text-5xl">
        MOON
      </span>

      <Image
        src="/logo.webp"
        alt="Moonmade logo"
        width={size}
        height={size}
        priority
        className="order-1 h-auto w-20 drop-shadow-[0_10px_24px_rgba(138,110,108,0.22)] transition-transform duration-500 ease-out hover:scale-[1.03] sm:order-2 sm:w-24"
      />

      <span className="moon-brand-text order-3 text-center text-3xl text-moon-contrast sm:text-5xl">
        MADE
      </span>
    </div>
  );
}
