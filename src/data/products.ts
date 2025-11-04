export type Product = {
  id: string;
  slug: string;
  title: string;
  price: number; // w groszach lub number w zł – jak wolisz, ale bądź spójny
  description: string;
  images: string[];
  stock: number;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "naszyjnik-ametyst",
    title: "Naszyjnik z ametystem",
    price: 24900,
    description: "Ręcznie robiony naszyjnik z kamieniem ametystu.",
    images: ["/images/ametyst-1.webp"],
    stock: 12,
  },
  {
    id: "p2",
    slug: "bransoletka-labradoryt",
    title: "Bransoletka z labradorytem",
    price: 18900,
    description: "Subtelna bransoletka z labradorytem, robiona ręcznie.",
    images: ["/images/labradoryt-1.webp"],
    stock: 8,
  },
];
