import React from "react";
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
    <div>
      <h3 className="text-lg font-semibold mb-3 text-moon-cream">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="relative inline-block cursor-pointer text-moon-cream after:absolute after:left-1/2 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-moon-cream after:transition-all after:duration-300 after:transform after:-translate-x-1/2 hover:after:w-full"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
