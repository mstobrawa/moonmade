import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 160, className = "" }: LogoProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 ${className}`}
    >
      <span className="order-2 sm:order-1 text-3xl sm:text-5xl text-center">
        MOON
      </span>

      <Image
        src="/logo.webp"
        alt="Moonmade logo"
        width={size}
        height={size}
        priority
        className="order-1 sm:order-2 w-20 sm:w-40 h-auto"
      />

      <span className="order-3 text-3xl sm:text-5xl text-center">MADE</span>
    </div>
  );
}
