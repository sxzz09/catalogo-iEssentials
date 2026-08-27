'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { X, ShieldCheck, Truck, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export function AboutModal() {
  const { isAboutOpen, setIsAboutOpen, mode, setMode } = useShop();
  const [logoError, setLogoError] = React.useState(false);

  if (!isAboutOpen) return null;

  const isWholesale = mode === 'mayorista';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop with slow fade and blur */}
      <div
        onClick={() => setIsAboutOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-backdrop-fade"
      />

      {/* Modal Card with center pop and elevation */}
      <div
        className={`relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-2xl backdrop-blur-2xl transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] animate-modal-pop ${isWholesale
          ? 'border-zinc-800 bg-[#09090b] text-white'
          : 'border-zinc-200 bg-white text-zinc-900'
          }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAboutOpen(false)}
          className={`absolute right-5 top-5 rounded-full p-2 transition-colors ${isWholesale
            ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            : 'text-zinc-500 hover:bg-zinc-100 hover:text-black'
            }`}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Header with Official Logo Image */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 aspect-square shrink-0 items-center justify-center rounded-2xl overflow-hidden shadow-xs">
            {!logoError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/images/logo.png"
                alt="iEssentials Logo"
                onError={() => setLogoError(true)}
                className="h-full w-full object-contain aspect-square rounded-2xl"
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center font-bold text-xl tracking-tighter rounded-2xl ${isWholesale ? 'bg-white text-black' : 'bg-black text-white'
                  }`}
              >
                iE
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Quiénes Somos</h2>

            </div>
            <p className={`text-xs ${isWholesale ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Especialistas en Accesorios y Componentes del Ecosistema Apple
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div
          className={`mt-6 rounded-2xl border p-5 ${isWholesale
            ? 'border-zinc-800 bg-[#121214] text-zinc-300'
            : 'border-zinc-200 bg-zinc-50 text-zinc-700'
            }`}
        >
          <p className="text-sm leading-relaxed">
            En <strong>iEssentials</strong> nos dedicamos a ofrecer accesorios con el estándar de calidad más alto para dispositivos Apple. AirPods con cancelación de ruido real y Cargadores de 20W con protección térmica inteligente para compra individual y por volumen.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className={`flex items-start gap-3 rounded-2xl border p-4 ${isWholesale ? 'border-zinc-800 bg-[#121214]' : 'border-zinc-200 bg-zinc-50'
              }`}
          >
            <div
              className={`rounded-xl p-2.5 ${isWholesale ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900 shadow-xs'
                }`}
            >
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Garantía Inmediata
              </h4>
              <p className={`mt-1 text-xs ${isWholesale ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Reemplazo directo contra defectos de fábrica. Calidad testeada antes de despacho.
              </p>
            </div>
          </div>

          <div
            className={`flex items-start gap-3 rounded-2xl border p-4 ${isWholesale ? 'border-zinc-800 bg-[#121214]' : 'border-zinc-200 bg-zinc-50'
              }`}
          >
            <div
              className={`rounded-xl p-2.5 ${isWholesale ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900 shadow-xs'
                }`}
            >
              <Building2 className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Ventas al Mayor
              </h4>
              <p className={`mt-1 text-xs ${isWholesale ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Abastecemos principalmente a emprendedores.
              </p>
            </div>
          </div>

          <div
            className={`flex items-start gap-3 rounded-2xl border p-4 ${isWholesale ? 'border-zinc-800 bg-[#121214]' : 'border-zinc-200 bg-zinc-50'
              }`}
          >
            <div
              className={`rounded-xl p-2.5 ${isWholesale ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900 shadow-xs'
                }`}
            >
              <Truck className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Despacho Rápido
              </h4>
              <p className={`mt-1 text-xs ${isWholesale ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Entregas presenciales en Caracas y envíos a nivel nacional con embalaje reforzado y entregas prioritarias.
              </p>
            </div>
          </div>

          <div
            className={`flex items-start gap-3 rounded-2xl border p-4 ${isWholesale ? 'border-zinc-800 bg-[#121214]' : 'border-zinc-200 bg-zinc-50'
              }`}
          >
            <div
              className={`rounded-xl p-2.5 ${isWholesale ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900 shadow-xs'
                }`}
            >
              <Sparkles className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Recibos Digitales
              </h4>
              <p className={`mt-1 text-xs ${isWholesale ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Genera cotizaciones y comprobantes formales en PNG con un solo toque.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div
          className={`mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t pt-5 ${isWholesale ? 'border-zinc-800' : 'border-zinc-200'
            }`}
        >
          <div className="flex items-center gap-2 text-xs opacity-75">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Atención personalizada vía WhatsApp</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setMode('mayorista');
                setIsAboutOpen(false);
              }}
              className={`flex-1 sm:flex-none rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${isWholesale
                ? 'border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700'
                : 'border-zinc-300 bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                }`}
            >
              Ver Modo al Mayor
            </button>
            <button
              onClick={() => setIsAboutOpen(false)}
              className={`flex-1 sm:flex-none rounded-full px-4 py-2 text-xs font-semibold transition-colors ${isWholesale
                ? 'bg-white text-black hover:bg-zinc-200'
                : 'bg-black text-white hover:bg-zinc-800'
                }`}
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
