import localFont from "next/font/local";

export const playfair = localFont({
  src: [
    {
      path: "../fonts/PlayfairDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/PlayfairDisplay-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/PlayfairDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

export const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});
