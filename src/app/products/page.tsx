import ProductsGrid from "../ui/ProductsGrid";

const products = [
  {
    id: 1,
    title: "Naszyjnik Moonmade",
    description: "Ręcznie robiona",
    price: "120 zł",
    imgSrc: "/Slide1.webp",
    slug: "Naszyjnik_Moonmade",
  },
  {
    id: 2,
    title: "Naszyjnik Moonmade",
    description: "Elegancki design",
    price: "150 zł",
    imgSrc: "/Slide2.webp",
    slug: "Naszyjnik_Moonmade",
  },
  {
    id: 3,
    title: "Naszyjnik Moonmade",
    description: "Ręcznie robiona",
    price: "120 zł",
    imgSrc: "/Slide3.webp",
    slug: "Naszyjnik_Moonmade",
  } /*
  {
    id: 4,
    title: "Naszyjnik Moonmade",
    description: "Elegancki design",
    price: "150 zł",
    imgSrc: "https://via.placeholder.com/300x200",
  },
  {
    id: 5,
    title: "Bransoletka Moonmade",
    description: "Ręcznie robiona",
    price: "120 zł",
    imgSrc: "https://via.placeholder.com/300x200",
  },
  {
    id: 6,
    title: "Naszyjnik Moonmade",
    description: "Elegancki design",
    price: "150 zł",
    imgSrc: "https://via.placeholder.com/300x200",
  },
  {
    id: 7,
    title: "Bransoletka Moonmade",
    description: "Ręcznie robiona",
    price: "120 zł",
    imgSrc: "https://via.placeholder.com/300x200",
  },
  {
    id: 8,
    title: "Naszyjnik Moonmade",
    description: "Elegancki design",
    price: "150 zł",
    imgSrc: "https://via.placeholder.com/300x200",
  },
  {
    id: 9,
    title: "Bransoletka Moonmade",
    description: "Ręcznie robiona",
    price: "120 zł",
    imgSrc: "https://via.placeholder.com/300x200",
  },
  {
    id: 10,
    title: "Naszyjnik Moonmade",
    description: "Elegancki design",
    price: "150 zł",
    imgSrc: "https://via.placeholder.com/300x200",
  },*/,

  // kolejne produkty
];

export default function ProductPage() {
  return (
    <main className="p-4">
      <ProductsGrid products={products} />
    </main>
  );
}
