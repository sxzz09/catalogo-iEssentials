'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { Header } from '@/components/Header';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { ProductGrid } from '@/components/ProductGrid';
import { ReceiptDrawer } from '@/components/ReceiptDrawer';
import { AboutModal } from '@/components/AboutModal';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const { mode } = useShop();

  const isWholesale = mode === 'mayorista';

  return (
    <div
      className={`flex min-h-screen flex-col transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isWholesale ? 'bg-black text-white' : 'bg-white text-zinc-900'
      }`}
    >
      {/* Header */}
      <Header />

      {/* Main Content: Welcome as mandatory default landing with cinematic cross-fade */}
      <main className="flex-1 animate-apple-fade-in" key={mode}>
        {mode === 'welcome' ? (
          <WelcomeScreen />
        ) : (
          <ProductGrid />
        )}
      </main>

      {/* Live Right Drawer / Receipt */}
      <ReceiptDrawer />

      {/* Quiénes Somos Modal */}
      <AboutModal />

      {/* Footer */}
      <Footer />
    </div>
  );
}
