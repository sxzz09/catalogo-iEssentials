'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, CartItem, StoreMode, CustomerInfo } from '@/types';

interface ShopContextType {
  mode: StoreMode;
  setMode: (mode: StoreMode) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  total: number;
  totalSavings: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  customerInfo: CustomerInfo;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  updateCustomerField: <K extends keyof CustomerInfo>(field: K, value: CustomerInfo[K]) => void;
  bcvRate: number;
  isBcvLoading: boolean;
  bcvLastUpdated: string | null;
  formatBs: (usd: number) => string;
}

// Fallback oficial a la tasa BCV Euro solicitada
const DEFAULT_BCV_RATE = 921.81;

const initialCustomerInfo: CustomerInfo = {
  name: '',
  phone: '',
  companyOrId: '',
  paymentMethod: 'zinli',
  notes: '',
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  // Always mandatory landing view is 'welcome'
  const [mode, setModeState] = useState<StoreMode>('welcome');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(initialCustomerInfo);
  
  // BCV Euro Exchange Rate State
  const [bcvRate, setBcvRate] = useState<number>(DEFAULT_BCV_RATE);
  const [isBcvLoading, setIsBcvLoading] = useState<boolean>(true);
  const [bcvLastUpdated, setBcvLastUpdated] = useState<string | null>(null);

  // Fetch BCV Euro Rate in Real-Time
  useEffect(() => {
    let isMounted = true;
    async function fetchBcvEuro() {
      try {
        setIsBcvLoading(true);
        const res = await fetch('https://ve.dolarapi.com/v1/euros/oficial', {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          const rate = Number(data.promedio || data.precio || DEFAULT_BCV_RATE);
          if (isMounted && !isNaN(rate) && rate > 0) {
            setBcvRate(rate);
            setBcvLastUpdated(data.fechaActualizacion || null);
          }
        }
      } catch (err) {
        console.warn('Could not fetch live BCV Euro rate, using fallback:', err);
      } finally {
        if (isMounted) setIsBcvLoading(false);
      }
    }

    fetchBcvEuro();
    // Refresh rate every 10 minutes
    const interval = setInterval(fetchBcvEuro, 10 * 60 * 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Load saved cart if available
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('iessentials_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Error loading saved cart', e);
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem('iessentials_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart state', e);
    }
  }, [cart]);

  const setMode = (newMode: StoreMode) => {
    setModeState(newMode);

    // Automatically recalculate unit price and enforce minimums according to mode
    if (newMode === 'detal' || newMode === 'mayorista') {
      setCart((prevCart) =>
        prevCart.map((item) => ({
          ...item,
          quantity: newMode === 'mayorista' ? Math.max(3, item.quantity) : item.quantity,
          unitPrice: newMode === 'mayorista' ? item.product.mayoristaPrice : item.product.detalPrice,
        }))
      );
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const isWholesale = mode === 'mayorista';
    const activePrice = isWholesale ? product.mayoristaPrice : product.detalPrice;
    const effectiveQty = isWholesale ? Math.max(3, quantity) : Math.max(1, quantity);
    
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + effectiveQty;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: isWholesale ? Math.max(3, newQty) : newQty,
          unitPrice: activePrice,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity: effectiveQty,
            unitPrice: activePrice,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const minAllowed = mode === 'mayorista' ? 3 : 1;
    const finalQty = Math.max(minAllowed, quantity);

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity: finalQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const updateCustomerField = <K extends keyof CustomerInfo>(field: K, value: CustomerInfo[K]) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatBs = (usd: number): string => {
    const bsAmount = usd * bcvRate;
    return `Bs. ${bsAmount.toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const { totalItems, subtotal, total, totalSavings } = useMemo(() => {
    let itemsCount = 0;
    let sum = 0;
    let retailSum = 0;

    cart.forEach((item) => {
      itemsCount += item.quantity;
      const currentPrice = mode === 'mayorista' ? item.product.mayoristaPrice : item.product.detalPrice;
      sum += currentPrice * item.quantity;
      retailSum += item.product.detalPrice * item.quantity;
    });

    const savings = mode === 'mayorista' ? Math.max(0, retailSum - sum) : 0;

    return {
      totalItems: itemsCount,
      subtotal: sum,
      total: sum,
      totalSavings: savings,
    };
  }, [cart, mode]);

  return (
    <ShopContext.Provider
      value={{
        mode,
        setMode,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        total,
        totalSavings,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        isAboutOpen,
        setIsAboutOpen,
        customerInfo,
        setCustomerInfo,
        updateCustomerField,
        bcvRate,
        isBcvLoading,
        bcvLastUpdated,
        formatBs,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
