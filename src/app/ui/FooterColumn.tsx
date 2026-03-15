import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="space-y-5">
      <h3 className="moon-nav-text text-[0.74rem] text-[#FAF9F6]">
        {title}
      </h3>
      <ul className="space-y-3.5 text-sm text-[#FAF9F6]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="moon-nav-text relative inline-block cursor-pointer text-[0.74rem] text-[#FAF9F6] transition-colors duration-300 hover:text-[#FCEDDA] after:absolute after:left-1/2 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-[#FCEDDA] after:transition-all after:duration-300 after:transform after:-translate-x-1/2 hover:after:w-full"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
