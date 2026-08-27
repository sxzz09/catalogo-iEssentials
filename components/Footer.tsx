'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { ShieldCheck, Zap } from 'lucide-react';

export function Footer() {
  const { mode, setMode, setIsAboutOpen, bcvRate, isBcvLoading } = useShop();

  const isWholesale = mode === 'mayorista';

  return (
    <footer
      className={`mt-auto border-t py-10 transition-colors duration-300 ${isWholesale
        ? 'border-zinc-800 bg-black text-zinc-400'
        : 'border-zinc-200/90 bg-white text-zinc-600'
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Badges Centrados en Fila */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 sm:gap-6 pb-8 border-b ${isWholesale ? 'border-zinc-800' : 'border-zinc-100'
            }`}
        >
          {/* Badge 1: Garantía */}
          <div
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium shadow-xs transition-all ${isWholesale
              ? 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
              : 'border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-zinc-300'
              }`}
          >
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Garantía de 7 días</span>
          </div>

          {/* Badge 2: Pagos */}
          <div
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium shadow-xs transition-all ${isWholesale
              ? 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
              : 'border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-zinc-300'
              }`}
          >
            <Zap className="h-4 w-4 text-amber-500" />
            <span>Pagos en USD, Binance y Bs</span>
          </div>

          {/* Badge 3: Tasa BCV Euro */}
          <div
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium font-mono shadow-xs transition-all ${isWholesale
              ? 'border-zinc-800 bg-zinc-900 text-zinc-300'
              : 'border-zinc-200 bg-zinc-50 text-zinc-800'
              }`}
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Tasa BCV (EUR): {isBcvLoading ? 'Cargando...' : `Bs. ${bcvRate.toFixed(2)}`}</span>
          </div>
        </div>

        {/* Pie de página inferior */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`font-bold tracking-tight ${isWholesale ? 'text-white' : 'text-zinc-950'
                }`}
            >
              iEssentials
            </span>
            <span className="opacity-70">• © {new Date().getFullYear()} Catálogo Oficial.</span>
          </div>

          <div className="flex items-center gap-4 opacity-80">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="hover:underline transition-all"
            >
              Quiénes Somos
            </button>
            <button
              onClick={() => setMode('welcome')}
              className="hover:underline transition-all"
            >
              Inicio / Cambiar Modo
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
