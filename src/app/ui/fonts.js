import { Playfair, Montserrat } from "next/font/google";

export const playfair = Playfair({
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "500"],
  subset: ["latin"],
});
