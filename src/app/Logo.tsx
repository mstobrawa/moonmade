import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}
export default function Logo({ size = 160, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-6xl">MOON</span>
      <Image
        src="/logo.webp"
        alt="Moonmade logo"
        width={size}
        height={size}
        priority
      />
      <span className="text-6xl">MADE</span>
    </div>
  );
}
