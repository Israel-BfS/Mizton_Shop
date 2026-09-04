import React from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import CheckoutButton from '@/components/CheckoutButton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, ShieldCheck, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-surface text-on-surface">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mb-4">
            <span className="text-2xl font-bold">!</span>
          </div>
          <h2 className="text-2xl font-bold text-on-surface">Producto no encontrado</h2>
          <p className="mt-2 text-on-surface-variant">El artículo que buscas no existe o fue retirado.</p>
          <Link href="/" className="mt-6 px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium">
            Volver a la tienda
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const rawImage = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : null;
  const cleanImage = rawImage ? rawImage.split('?')[0].replace(/_\.(avif|webp)$/i, '') : 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80';
  const price = Number(product.price_mxn ?? product.price ?? 0);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header />
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 md:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary mb-8 font-medium transition-colors">
          <ArrowLeft size={16} />
          Volver al catálogo
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* Imagen del producto */}
          <div className="rounded-3xl overflow-hidden bg-surface-container-lowest border border-outline-variant/60 p-6 flex items-center justify-center shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={cleanImage} 
              alt={product.title} 
              className="w-full max-h-[460px] object-contain rounded-2xl" 
            />
          </div>

          {/* Información y Compra */}
          <div className="flex flex-col justify-center">
            <span className="text-xs uppercase font-bold tracking-wider text-secondary bg-secondary-container/50 px-3 py-1 rounded-full w-fit mb-3">
              {product.category || 'General'}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface mb-3 leading-snug">
              {product.title}
            </h1>
            <p className="text-3xl font-black text-primary mb-6">
              ${price.toFixed(2)} <span className="text-sm font-semibold text-on-surface-variant">MXN</span>
            </p>

            <div 
              className="prose prose-sm text-on-surface-variant mb-8 leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: product.description || '<p>Sin descripción disponible.</p>' }} 
            />

            <div className="space-y-4">
              <CheckoutButton productId={product.id} />
              
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-outline-variant/60 text-xs text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <Truck size={18} className="text-primary" />
                  <span>Envío a todo México (5-12 días)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-secondary" />
                  <span>Compra 100% Protegida</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
