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
    <Link className="group block border rounded-lg overflow-hidden hover:shadow-md transition bg-white" href={`/products/${product?.id || ''}`}>
      <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
        <img
          src={!imageError && cleanImage ? cleanImage : fallbackImage}
          alt={product?.title || 'Producto'}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product?.is_new && (
          <div className="absolute top-2 left-2 bg-primary-container text-on-primary-container px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider z-10">
            Nuevo
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 line-clamp-2">{product?.title || 'Sin título'}</h3>
        <p className="mt-2 text-lg font-bold text-emerald-600">
          MXN ${displayPrice.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
