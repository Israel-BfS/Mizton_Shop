'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string | number;
  title: string;
  price_mxn?: number;
  price?: number;
  images?: string[];
  category?: string;
  is_new?: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false);

  const rawImage = Array.isArray(product?.images) && product.images.length > 0 ? product.images[0] : null;
  const cleanImage = rawImage ? rawImage.split('?')[0].replace(/_\.(avif|webp)$/i, '') : null;
  const displayPrice = Number(product?.price_mxn ?? product?.price ?? 0);

  const fallbackImage = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60';

  return (
    <Link 
      className="group block rounded-2xl overflow-hidden border border-outline-variant/60 hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-surface-container-lowest flex flex-col h-full" 
      href={`/products/${product?.id || ''}`}
    >
      <div className="aspect-square w-full overflow-hidden bg-surface-container-low relative">
        <img
          src={!imageError && cleanImage ? cleanImage : fallbackImage}
          alt={product?.title || 'Producto'}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product?.is_new && (
          <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-secondary to-tertiary text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs z-10">
            Nuevo
          </div>
        )}
      </div>
      <div className="p-3.5 md:p-4 flex flex-col flex-grow justify-between gap-2">
        <div>
          {product?.category && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant/70 mb-1 block">
              {product.category}
            </span>
          )}
          <h3 className="font-semibold text-sm md:text-base text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
            {product?.title || 'Sin título'}
          </h3>
        </div>
        <div className="pt-2 border-t border-outline-variant/40 flex items-baseline justify-between">
          <span className="text-xs text-on-surface-variant font-medium">Precio</span>
          <p className="text-base md:text-lg font-extrabold text-primary">
            ${displayPrice.toFixed(2)} <span className="text-xs font-semibold text-on-surface-variant">MXN</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
