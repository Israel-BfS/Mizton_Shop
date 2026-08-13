import Image from "next/image";
import Link from "next/link";

export interface ProductCardProps {
  id: string | number;
  title: string;
  price?: number;
  price_mxn?: number;
  imageUrl: string;
  imageAlt: string;
  isNew?: boolean;
}

export default function ProductCard({
  id,
  title,
  price,
  price_mxn,
  imageUrl,
  imageAlt,
  isNew = false,
}: ProductCardProps) {
  // Safe price mapping
  const displayPrice = Number(price_mxn || price || 0);

  // Format price to MXN
  const formattedPrice = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(displayPrice);

  // Safe image mapping
  const finalImageUrl = imageUrl
    ? imageUrl.startsWith("//")
      ? "https:" + imageUrl
      : imageUrl
    : "https://lh3.googleusercontent.com/aida-public/AB6AXuDWjbqtzQlLhzuiRjIaPFNqXq1KtvCLXqONz6zlVQvF5YjPSVkrHqufGjifBK1HnB-jrJvFICv5uaVKOC3YXZ6Tb14v-DxS8r2ohZZnDF_uGcNajCsbfvfqq0FMdjVhcvQ3K32usnAuZF83KeTpR-ReUTldufVhexc2DCNG5MtIOFlhGlzUyIhQUuJbINdrrSVo_0UrkCfaAAm-KtT2fBaGi-O0owILFce2qVXFGBPf62LAmBOni2z4"; // Placeholder if no image

  return (
    <Link href={`/products/${id}`} className="block">
      <div className="bg-surface-container-lowest border border-outline-variant rounded group hover:shadow-[0px_4px_12px_rgba(0,0,0,0.05)] transition-all overflow-hidden flex flex-col h-full">
        <div className="relative h-40 md:h-56 w-full bg-surface-container-high">
          <Image
            src={finalImageUrl}
            alt={imageAlt || title}
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
    </Link>
  );
}
