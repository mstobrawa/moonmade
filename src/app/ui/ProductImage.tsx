type ProductImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

export default function ProductImage({
  src,
  alt,
  className = "",
}: ProductImageProps) {
  return (
    <img
      src={src || "/placeholder.webp"}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.src = "/placeholder.webp";
      }}
    />
  );
}
