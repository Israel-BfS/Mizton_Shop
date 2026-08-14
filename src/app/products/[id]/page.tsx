import React from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import CheckoutButton from '@/components/CheckoutButton';

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
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Producto no encontrado</h2>
        <p className="mt-2 text-gray-600">El artículo que buscas no existe o fue retirado.</p>
        <Link href="/" className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const rawImage = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : null;
  const cleanImage = rawImage ? rawImage.split('?')[0].replace(/_\.(avif|webp)$/i, '') : 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80';
  const price = Number(product.price_mxn ?? product.price ?? 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link href="/" className="text-sm text-gray-500 hover:text-emerald-600 mb-6 inline-block">
        &larr; Volver al catálogo
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-xl overflow-hidden bg-gray-50 border p-4 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cleanImage} alt={product.title} className="w-full max-h-[500px] object-contain rounded-lg" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 mb-2">{product.category || 'General'}</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
          <p className="text-3xl font-extrabold text-gray-900 mb-6">MXN ${price.toFixed(2)}</p>
          <div className="prose prose-sm text-gray-700 mb-8" dangerouslySetInnerHTML={{ __html: product.description || '<p>Sin descripción disponible.</p>' }} />
          <CheckoutButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}
