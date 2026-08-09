import Image from "next/image";

export interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
  isNew?: boolean;
}

export default function ProductCard({
  title,
  price,
  imageUrl,
  imageAlt,
  isNew = false,
}: ProductCardProps) {
  // Format price to MXN
  const formattedPrice = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(price);

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded group hover:shadow-[0px_4px_12px_rgba(0,0,0,0.05)] transition-all overflow-hidden flex flex-col">
      <div className="relative h-40 md:h-56 w-full bg-surface-container-high">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {isNew && (
          <div className="absolute top-2 left-2 bg-primary-container text-on-primary-container px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider z-10">
            Nuevo
          </div>
        )}
      </div>
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <h3 className="font-body-md text-body-md font-semibold text-on-surface line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="font-label-md text-label-md text-primary mt-auto">
          MXN {formattedPrice}
        </p>
        <button className="mt-3 w-full border border-outline text-on-surface font-label-sm text-label-sm py-2 rounded hover:bg-surface-container-low transition-colors">
          Agregar
        </button>
      </div>
    </div>
  );
}
