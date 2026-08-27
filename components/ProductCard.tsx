'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { useShop } from '@/context/ShopContext';
import { ProductIcon } from './ProductIcon';
import { Check, ShoppingBag, Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { mode, addToCart, formatBs } = useShop();
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isWholesale = mode === 'mayorista';
  const minQty = isWholesale ? 3 : 1;
  const [qty, setQty] = useState(minQty);

  const currentPrice = isWholesale ? product.mayoristaPrice : product.detalPrice;
  const regularPrice = product.detalPrice;
  const savings = isWholesale ? regularPrice - product.mayoristaPrice : 0;
  const savingsPct = isWholesale ? Math.round((savings / regularPrice) * 100) : 0;

  const handleAdd = () => {
    addToCart(product, qty);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1400);
  };

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.025] hover:-translate-y-1.5 ${isWholesale
          ? 'border-zinc-800 bg-[#09090b] text-white hover:border-zinc-700 hover:bg-[#121214] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] shadow-md'
          : 'border-zinc-200/90 bg-white text-zinc-900 hover:border-zinc-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] shadow-xs'
        }`}
    >
      {/* Top badges */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 ${isWholesale
              ? 'border-zinc-800 bg-zinc-900 text-zinc-400'
              : 'border-zinc-200 bg-zinc-100 text-zinc-700'
            }`}
        >
          {product.category}
        </span>
        {product.badge && (
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors duration-300 ${isWholesale
                ? 'border-zinc-700 bg-zinc-800/80 text-zinc-200'
                : 'border-zinc-300 bg-zinc-100 text-zinc-800'
              }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Visual Product Image Container */}
      <div
        className={`relative my-6 flex h-48 w-full items-center justify-center rounded-2xl border p-4 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isWholesale
            ? 'border-zinc-800/80 bg-[#121214] group-hover:bg-[#18181b]'
            : 'border-zinc-100 bg-zinc-50/80 group-hover:bg-zinc-100/70'
          }`}
      >
        {/* Subtle neutral monochrome background shadow */}
        <div
          className={`pointer-events-none absolute h-32 w-32 rounded-full blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isWholesale
              ? 'bg-white/[0.03] group-hover:bg-white/[0.07]'
              : 'bg-black/[0.03] group-hover:bg-black/[0.07]'
            }`}
        />

        {product.image && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="relative z-10 max-h-36 max-w-[85%] object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.10)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
            <ProductIcon name={product.iconName} className="h-16 w-16 opacity-90" strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3
          className={`text-lg font-bold tracking-tight line-clamp-1 transition-colors duration-300 ${isWholesale ? 'text-white' : 'text-zinc-950'
            }`}
        >
          {product.name}
        </h3>
        <p
          className={`mt-1 text-xs line-clamp-2 leading-relaxed transition-colors duration-300 ${isWholesale ? 'text-zinc-400' : 'text-zinc-600'
            }`}
        >
          {product.tagline}
        </p>

        {/* Specs Pill List */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.specs.slice(0, 2).map((spec, i) => (
            <span
              key={i}
              className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[10px] font-medium transition-colors duration-300 ${isWholesale
                  ? 'border-zinc-800 bg-zinc-900 text-zinc-300'
                  : 'border-zinc-200 bg-zinc-100 text-zinc-700'
                }`}
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Price & Action Section with Dual Currency USD + BCV Euro rate */}
      <div
        className={`mt-6 border-t pt-4 transition-colors duration-300 ${isWholesale ? 'border-zinc-800' : 'border-zinc-100'
          }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <span
              className={`text-[11px] font-medium block transition-colors duration-300 ${isWholesale ? 'text-zinc-400' : 'text-zinc-500'
                }`}
            >
              {isWholesale ? 'Precio Al Mayor' : 'Precio al Detal'}
            </span>

            {/* USD Price */}
            <div className="flex items-baseline gap-1.5">
              <span
                className={`text-2xl font-bold tracking-tight font-mono transition-colors duration-300 ${isWholesale ? 'text-white' : 'text-zinc-950'
                  }`}
              >
                ${currentPrice.toFixed(2)}
              </span>
              <span
                className={`text-xs font-mono transition-colors duration-300 ${isWholesale ? 'text-zinc-400' : 'text-zinc-500'
                  }`}
              >
                USD
              </span>

              {isWholesale && (
                <span className="line-through text-xs text-zinc-500 font-mono ml-1">
                  ${regularPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Equivalent in Bolívares (BCV Euro conversion) */}
            <div className="mt-0.5">
              <span
                className={`inline-flex items-center text-[11px] font-mono font-medium transition-colors duration-300 ${isWholesale ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
              >
                ≈ {formatBs(currentPrice)}
              </span>
            </div>
          </div>

          {isWholesale && (
            <div className="text-right">
              <span className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                Ahorras {savingsPct}%
              </span>
              <span className="block text-[10px] text-zinc-400 mt-0.5 font-mono">
                Mín. 3 uds
              </span>
            </div>
          )}
        </div>

        {/* Quantity Controls & Add Button */}
        <div className="flex items-center gap-2 mt-4">
          {/* Quantity Selector */}
          <div
            className={`flex items-center rounded-xl border transition-colors duration-300 ${isWholesale
                ? 'border-zinc-800 bg-zinc-900'
                : 'border-zinc-200 bg-zinc-50'
              }`}
          >
            <button
              onClick={() => setQty((prev) => Math.max(minQty, prev - 1))}
              disabled={qty <= minQty}
              className={`px-2.5 py-2 text-xs font-semibold transition-all duration-200 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed ${isWholesale
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-zinc-600 hover:text-black'
                }`}
              aria-label="Disminuir cantidad"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span
              className={`px-1 text-xs font-bold min-w-5 text-center font-mono transition-colors duration-300 ${isWholesale ? 'text-white' : 'text-zinc-900'
                }`}
            >
              {qty}
            </span>
            <button
              onClick={() => setQty((prev) => prev + 1)}
              className={`px-2.5 py-2 text-xs font-semibold transition-all duration-200 active:scale-90 ${isWholesale
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-zinc-600 hover:text-black'
                }`}
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold tracking-wide transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] shadow-xs ${isAdded
                ? 'bg-emerald-600 text-white'
                : isWholesale
                  ? 'bg-white text-black hover:bg-zinc-200'
                  : 'bg-zinc-950 text-white hover:bg-zinc-800'
              }`}
          >
            {isAdded ? (
              <span className="inline-flex items-center gap-1.5 animate-apple-fade-in">
                <Check className="h-4 w-4 stroke-[2.5]" />
                <span>¡Agregado!</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <ShoppingBag className="h-4 w-4" />
                <span>Agregar al Carrito</span>
              </span>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}