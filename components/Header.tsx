'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { Receipt, Info } from 'lucide-react';

export function Header() {
  const { mode, setMode, totalItems, toggleCart, setIsAboutOpen, bcvRate, isBcvLoading } = useShop();
  const [logoError, setLogoError] = useState(false);

  const isWholesale = mode === 'mayorista';

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors duration-300 ${
        isWholesale
          ? 'border-zinc-800 bg-black/90 text-white'
          : 'border-zinc-200/90 bg-white/90 text-zinc-900'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Logo PNG + Logo "iEssentials" + Píldora "Quiénes Somos" */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMode('welcome')}
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-85"
            title="Ir al inicio"
          >
            {/* Isotipo con imagen PNG local */}
            <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 aspect-square shrink-0 items-center justify-center rounded-xl overflow-hidden shadow-xs transition-transform duration-300 group-hover:scale-105">
              {!logoError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/images/logo.png"
                  alt="iEssentials Logo"
                  onError={() => setLogoError(true)}
                  className="h-full w-full aspect-square object-contain rounded-xl"
                  width={40}
                  height={40}
                />
              ) : (
                <div
                  className={`flex h-full w-full items-center justify-center font-bold text-sm tracking-tighter rounded-xl ${
                    isWholesale ? 'bg-white text-black' : 'bg-black text-white'
                  }`}
                >
                  iE
                </div>
              )}
            </div>
            
            {/* Logo Text */}
            <span
              className={`text-lg font-bold tracking-tight font-sans ${
                isWholesale ? 'text-white' : 'text-zinc-950'
              }`}
            >
              iEssentials
            </span>
          </button>

          {/* Píldora "Quiénes Somos" */}
          <button
            onClick={() => setIsAboutOpen(true)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all active:scale-95 ${
              isWholesale
                ? 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-500 hover:text-white'
                : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100 hover:text-black'
            }`}
          >
            <Info className="h-3 w-3 opacity-70" />
            <span>Quiénes Somos</span>
          </button>
        </div>

        {/* Right: Tasa BCV Euro Minimalista + Botón "Recibo" */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Tasa BCV (EUR) Badge */}
          <div
            className={`hidden sm:flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-mono transition-colors ${
              isWholesale
                ? 'border-zinc-800 bg-zinc-900/90 text-zinc-300'
                : 'border-zinc-200 bg-zinc-50 text-zinc-700'
            }`}
            title="Tasa oficial Euro del Banco Central de Venezuela en tiempo real"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-sans font-medium uppercase tracking-wider opacity-75">BCV (EUR):</span>
            <span className="font-bold">
              {isBcvLoading ? 'Cargando...' : `Bs. ${bcvRate.toFixed(2)}`}
            </span>
          </div>

          {/* Botón "Recibo" */}
          <button
            onClick={toggleCart}
            id="header-receipt-btn"
            className={`group relative flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold shadow-xs transition-all duration-200 active:scale-98 ${
              isWholesale
                ? 'border-zinc-700 bg-zinc-900 text-white hover:border-zinc-500 hover:bg-zinc-800'
                : 'border-zinc-200 bg-black text-white hover:bg-zinc-800'
            }`}
          >
            <Receipt className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            <span>Recibo</span>
            {totalItems > 0 && (
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold font-mono ${
                  isWholesale ? 'bg-white text-black' : 'bg-white text-black'
                }`}
              >
                {totalItems}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
