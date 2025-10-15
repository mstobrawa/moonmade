import { Button } from "./ui/Button";
import ProductCard from "./ui/ProductCard";
import Logo from "./Logo";

export default function Home() {
  return (
    <main>
      <Logo />
      <h1 className="text-3xl underline">Hello world!</h1>
      <Button className="text-2xl">Testowy button</Button>
      <ProductCard
        title="Naszyjnik Tarot"
        description="Naszyjnik z kamieni naturalnych z pozłacanym zapięciem oraz zawięszką TAROT"
        price="199.99 z vat"
        imgSrc="https://picsum.photos/id/237/200/300"
      />
      <ProductCard
        title="Naszyjnik Tarot"
        description="Naszyjnik z kamieni naturalnych z pozłacanym zapięciem oraz zawięszką TAROT"
        price="199.99 z vat"
        imgSrc="https://picsum.photos/seed/picsum/200/300"
      />
      <ProductCard
        title="Naszyjnik Tarot"
        description="Naszyjnik z kamieni naturalnych z pozłacanym zapięciem oraz zawięszką TAROT"
        price="199.99 z vat"
        imgSrc="https://picsum.photos/200/300?grayscale"
      />
    </main>
  );
}
