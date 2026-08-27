'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { User, Building2, Check, ArrowRight } from 'lucide-react';

export function WelcomeScreen() {
  const { setMode } = useShop();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-white overflow-hidden">

      <div className="relative z-10 max-w-4xl w-full mx-auto text-center">

        {/* Título Principal Centrado (Stagger 2) */}
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 font-sans animate-apple-slide-up animation-delay-200">
          Bienvenido a iEssentials
        </h1>

        {/* Subtítulo Centrado (Stagger 3) */}
        <p className="mt-4 text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed animate-apple-slide-up animation-delay-300">
          Accesorios  de alta calidad, carga rápida inteligente y sonido envolvente.
        </p>
        {/* Subtítulo Centrado (Stagger 67) */}
        <p className="mt-4 text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed animate-apple-slide-up animation-delay-300">
          ¿A qué vienes?
        </p>

        {/* Dos Tarjetas Paralelas con Animación Escalonada */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">

          {/* TARJETA 1 (Izquierda: Compra al Detal - Stagger 4) */}
          <div
            onClick={() => setMode('detal')}
            className="group relative cursor-pointer rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:-translate-y-1 hover:border-zinc-400 hover:shadow-xl flex flex-col justify-between animate-apple-slide-up animation-delay-400"
          >
            <div>
              {/* Header de la tarjeta */}
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100 text-zinc-900 shadow-xs transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                  <User className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                  Uso Personal
                </span>
              </div>

              {/* Título y Descripción */}
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-zinc-950">
                Compra al Detal
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                Adquiere unidades individuales para tu uso personal o regalo, con empaque original sellado y garantía de 7 días.
              </p>

              {/* Lista de Checkmarks */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-800">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>Sin montos mínimos de compra</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-800">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>Recibo digital instantáneo </span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-800">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>Entrega Presencial en Caracas</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-800">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>Envios Nacionales</span>
                </div>
              </div>
            </div>

            {/* Botón Abajo */}
            <div className="mt-8">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMode('detal');
                }}
                className="w-full flex items-center justify-between rounded-2xl bg-zinc-950 px-5 py-3.5 text-sm font-bold text-white shadow-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-zinc-800 active:scale-[0.98]"
              >
                <span>Ingresar al Catálogo Detal</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* TARJETA 2 (Derecha: Modo Al Mayor B2B - Stagger 5) */}
          <div
            onClick={() => setMode('mayorista')}
            className="group relative cursor-pointer rounded-3xl border border-zinc-800 bg-[#09090b] p-7 shadow-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:-translate-y-1 hover:border-zinc-700 hover:bg-[#121214] hover:shadow-2xl flex flex-col justify-between text-white animate-apple-slide-up animation-delay-500"
          >
            <div>
              {/* Header de la tarjeta */}
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-white shadow-xs transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="rounded-full border border-zinc-600 bg-zinc-900/90 px-3 py-1 text-xs font-bold text-white">
                  TIENDAS & REVENDEDORES
                </span>
              </div>

              {/* Título y Descripción */}
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Compra al Mayor
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Precios exclusivos por volumen para maximizar tu margen comercial. Genera presupuestos formales y órdenes listas.
              </p>

              {/* Lista de Checkmarks */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-300">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>Pedido mínimo desde solo 3 unidades</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-300">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>Recibo digital instantáneo</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-300">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>Entrega Presencial en Caracas</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-300">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>Envíos Nacionales </span>
                </div>
              </div>
            </div>

            {/* Botón Abajo */}
            <div className="mt-8">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMode('mayorista');
                }}
                className="w-full flex items-center justify-between rounded-2xl bg-white px-5 py-3.5 text-sm font-bold text-black shadow-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-zinc-200 active:scale-[0.98]"
              >
                <span>Ver Tarifas Mayoristas</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
