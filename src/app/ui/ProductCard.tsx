"use client";
import { Button } from "./Button";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  price: string;
  imgSrc: string;
}

export default function ProductCard({
  title,
  description,
  price,
  imgSrc,
  className = "",
  ...props
}: ProductCardProps) {
  return (
    <div
      className={`bg-moon-white rounded-xl shadow-md p-4 ${className}`}
      {...props}
    >
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h3 className="text-lg mb-2">{title}</h3>
      <h2 className="text-md mb-1.5">{description}</h2>
      <p className="">{price}</p>
      <Button onClick={() => alert(`Dodano ${title} do koszyka`)}>
        Do koszyka
      </Button>
    </div>
  );
}
