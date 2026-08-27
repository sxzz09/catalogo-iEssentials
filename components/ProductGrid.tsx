'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '@/data/products';
import { Category } from '@/types';
import { useShop } from '@/context/ShopContext';
import { ProductCard } from './ProductCard';
import { Search, Tag, Sparkles, ArrowLeft } from 'lucide-react';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'audio', label: 'Audio' },
  { id: 'carga', label: 'Carga' },
];

export function ProductGrid() {
  const { mode, setMode, bcvRate, isBcvLoading } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<Category>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const isWholesale = mode === 'mayorista';

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section
      className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isWholesale ? 'bg-black text-white' : 'bg-white text-zinc-900'
        } animate-apple-fade-in`}
    >
      {/* Mode Banner */}
      <div
        className={`mb-8 overflow-hidden rounded-3xl border p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] animate-apple-slide-up animation-delay-100 ${isWholesale
          ? 'border-zinc-800 bg-[#09090b] text-white shadow-lg'
          : 'border-zinc-200/90 bg-zinc-50 text-zinc-900 shadow-xs'
          }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMode('welcome')}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] ${isWholesale
                  ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700'
                  : 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300'
                  }`}
                title="Volver a la selección de modo"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Inicio</span>
              </button>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${isWholesale
                  ? 'border border-zinc-700 bg-zinc-800/90 text-white'
                  : 'bg-zinc-950 text-white'
                  }`}
              >
                <Tag className="h-3 w-3" />
                {isWholesale ? 'Catálogo al Mayor' : 'Catálogo Detal'}
              </span>

              <span
                className={`text-xs ${isWholesale ? 'text-zinc-400' : 'text-zinc-500'
                  }`}
              >
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
              </span>
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
              {isWholesale ? 'Accesorios de Alta Gama al Mayor' : 'Accesorios de Alta Gama'}
            </h2>
            <p
              className={`mt-1 text-sm ${isWholesale ? 'text-zinc-400' : 'text-zinc-600'
                }`}
            >
              {isWholesale
                ? 'Precios exclusivos por volumen para tu tienda. Añade al pedido y descarga tu recibo en PNG.'
                : 'Accesorios sellados de calidad certificada para todo tu ecosistema Apple.'}
            </p>
          </div>

          {/* Guarantee & BCV Euro Rate Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={`rounded-2xl border px-4 py-3 text-center ${isWholesale
                ? 'border-zinc-800 bg-[#121214] text-zinc-200'
                : 'border-zinc-200 bg-white text-zinc-800'
                }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold font-mono">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>BCV (EUR): Bs. {isBcvLoading ? '...' : bcvRate.toFixed(2)}</span>
              </div>
              <span className="text-[11px] opacity-70 flex items-center gap-1 justify-center mt-0.5">
                <Sparkles className="h-3 w-3 text-amber-500" />
                Se actualiza cada 10 minutos.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 animate-apple-slide-up animation-delay-200">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap border active:scale-[0.97] ${selectedCategory === cat.id
                ? isWholesale
                  ? 'border-white bg-white text-black shadow-xs'
                  : 'border-black bg-black text-white shadow-xs'
                : isWholesale
                  ? 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  : 'border-zinc-200 bg-zinc-100 text-zinc-700 hover:border-zinc-300 hover:text-black'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isWholesale ? 'text-zinc-400' : 'text-zinc-500'
              }`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar producto..."
            className={`w-full rounded-full border py-2 pl-10 pr-4 text-xs shadow-xs outline-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isWholesale
              ? 'border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus:border-zinc-600'
              : 'border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400'
              }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${isWholesale ? 'text-zinc-400 hover:text-white' : 'text-zinc-400 hover:text-black'
                }`}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto animate-apple-slide-up animation-delay-300">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
