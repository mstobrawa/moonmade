export type Product = {
  id: string;
  slug: string;
  title: string;
  price: number; // w groszach lub number w zł – jak wolisz, ale bądź spójny
  description: string;
  images: string[];
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "naszyjnik-ametyst",
    title: "Naszyjnik z ametystem",
    price: 125,
    description: "Ręcznie robiony naszyjnik z kamieniem ametystu.",
    images: ["/images/ametyst-1.webp"],
  },
  {
    id: "p2",
    slug: "bransoletka-labradoryt",
    title: "Bransoletka z labradorytem",
    price: 185,
    description: "Subtelna bransoletka z labradorytem, robiona ręcznie.",
    images: ["/images/labradoryt-1.webp"],
  },
];
