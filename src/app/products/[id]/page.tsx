import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    return (
      <>
        <Header />
        <main className="flex-grow flex items-center justify-center p-20">
          <h1 className="font-headline-md text-error">Producto no encontrado</h1>
        </main>
        <Footer />
      </>
    );
  }

  const displayPrice = Number(product.price_mxn || product.price || 0);
  const formattedPrice = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(displayPrice);

  const imageUrl = product.image_url || product.imageUrl;
  const finalImageUrl = imageUrl
    ? imageUrl.startsWith("//")
      ? "https:" + imageUrl
      : imageUrl
    : "https://lh3.googleusercontent.com/aida-public/AB6AXuDWjbqtzQlLhzuiRjIaPFNqXq1KtvCLXqONz6zlVQvF5YjPSVkrHqufGjifBK1HnB-jrJvFICv5uaVKOC3YXZ6Tb14v-DxS8r2ohZZnDF_uGcNajCsbfvfqq0FMdjVhcvQ3K32usnAuZF83KeTpR-ReUTldufVhexc2DCNG5MtIOFlhGlzUyIhQUuJbINdrrSVo_0UrkCfaAAm-KtT2fBaGi-O0owILFce2qVXFGBPf62LAmBOni2z4";

  return (
    <>
      <Header />
      <main className="flex-grow max-w-max-width mx-auto px-margin-mobile py-xl md:px-margin-desktop md:py-20 w-full flex flex-col md:flex-row gap-lg">
        {/* Gallery */}
        <div className="w-full md:w-1/2 relative h-[300px] md:h-[500px] rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant">
           <Image
             src={finalImageUrl}
             alt={product.title}
             fill
             className="object-cover"
           />
        </div>
        
        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-md">
           <h1 className="font-display-lg text-display-lg font-bold text-on-surface">{product.title}</h1>
           <p className="font-headline-md text-headline-md text-primary">{formattedPrice}</p>
           
           <div 
             className="prose prose-sm md:prose-base prose-neutral mt-4 font-body-md text-on-surface-variant"
             dangerouslySetInnerHTML={{ __html: product.description || "Sin descripción." }}
           />

           <div className="mt-8 flex flex-col gap-4">
             <button className="bg-primary text-on-primary font-label-md text-label-md py-4 rounded-full hover:bg-surface-tint transition-all shadow-md w-full">
               Añadir al Carrito
             </button>
           </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
