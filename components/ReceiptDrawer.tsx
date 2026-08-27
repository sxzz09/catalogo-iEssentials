'use client';

import React, { useRef, useState } from 'react';
import { CustomerInfo } from '@/types';
import { useShop } from '@/context/ShopContext';
import { toPng } from 'html-to-image';
import {
  X,
  Trash2,
  Download,
  ShoppingBag,
  Building2,
  User,
  Plus,
  Minus,
  CheckCircle2,
  Share2,
  Receipt,
} from 'lucide-react';
import { ProductIcon } from './ProductIcon';

export function ReceiptDrawer() {
  const {
    mode,
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    total,
    totalSavings,
    customerInfo,
    updateCustomerField,
    bcvRate,
    formatBs,
  } = useShop();

  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!isCartOpen) return null;

  const isWholesale = mode === 'mayorista';
  const orderId = `IE-${Date.now().toString().slice(-6)}`;
  const orderDate = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleDownloadPng = async () => {
    if (!receiptRef.current || cart.length === 0) return;

    try {
      setIsExporting(true);
      await new Promise((r) => setTimeout(r, 150));

      const dataUrl = await toPng(receiptRef.current, {
        cacheBust: true,
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: isWholesale ? '#000000' : '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `Recibo_iEssentials_${isWholesale ? 'Mayorista' : 'Detal'}_${orderId}.png`;
      link.href = dataUrl;
      link.click();

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (err) {
      console.error('Error generating receipt PNG:', err);
      alert('Hubo un inconveniente al generar la imagen. Por favor intenta de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleWhatsAppShare = () => {
    if (cart.length === 0) return;

    const targetPhone = '584129528391';

    let message = `*NUEVO PEDIDO - iEssentials*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += ` *Modo:* ${isWholesale ? 'Mayorista' : 'Detal'}\n`;
    message += ` *Orden:* #${orderId}\n`;
    message += ` *Fecha:* ${orderDate}\n`;
    message += ` *Tasa Oficial BCV (EUR):* 1 USD = Bs. ${bcvRate.toFixed(2)}\n`;

    if (customerInfo.name) {
      message += ` *Cliente:* ${customerInfo.name}\n`;
    }
    if (customerInfo.phone) {
      message += ` *Teléfono:* ${customerInfo.phone}\n`;
    }
    message += ` *Método de Pago:* ${customerInfo.paymentMethod.toUpperCase()}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    message += ` *PRODUCTOS:*\n`;
    cart.forEach((item, index) => {
      const itemTotalUsd = item.unitPrice * item.quantity;
      message += `${index + 1}. *${item.product.name}* x${item.quantity}\n`;
      message += `   ↳ $${itemTotalUsd.toFixed(2)} USD (≈ ${formatBs(itemTotalUsd)})\n`;
    });

    message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    message += ` *TOTAL A PAGAR (USD):* $${total.toFixed(2)} USD\n`;
    message += ` *TOTAL A PAGAR (Bs. BCV):* ${formatBs(total)}\n`;

    if (isWholesale && totalSavings > 0) {
      message += ` *Ahorro Mayorista:* $${totalSavings.toFixed(2)} USD (≈ ${formatBs(totalSavings)})\n`;
    }

    if (customerInfo.notes) {
      message += ` *Notas:* ${customerInfo.notes}\n`;
    }

    message += `\nHola, adjunto mi pedido generado desde la web para coordinar el pago y entrega.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop with cinematic fade */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-backdrop-fade"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        {/* Drawer Panel with cinematic slide-in */}
        <div
          className={`w-screen max-w-lg flex flex-col shadow-2xl animate-drawer-slide ${isWholesale
            ? 'bg-[#000000] text-white border-l border-zinc-800'
            : 'bg-white text-zinc-900 border-l border-zinc-200'
            }`}
        >
          {/* Drawer Header */}
          <div
            className={`flex items-center justify-between p-5 border-b ${isWholesale ? 'border-zinc-800 bg-[#09090b]' : 'border-zinc-200 bg-zinc-50'
              }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl ${isWholesale ? 'bg-white text-black' : 'bg-black text-white'
                  }`}
              >
                <Receipt className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-bold tracking-tight">
                  {isWholesale ? 'Recibo / Cotización Al Mayor' : 'Recibo de Compra Detal'}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.2 text-[10px] font-bold ${isWholesale
                      ? 'border border-zinc-700 bg-zinc-800 text-zinc-200'
                      : 'bg-zinc-200 text-zinc-800'
                      }`}
                  >
                    {isWholesale ? <Building2 className="h-2.5 w-2.5" /> : <User className="h-2.5 w-2.5" />}
                    {isWholesale ? 'Tarifa B2B' : 'Tarifa Detal'}
                  </span>
                  <span className="text-[11px] font-mono opacity-60">#{orderId}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  title="Vaciar carrito"
                  className={`p-2 rounded-xl text-xs opacity-60 hover:opacity-100 transition-opacity ${isWholesale ? 'hover:bg-zinc-900 text-red-400' : 'hover:bg-zinc-200 text-red-600'
                    }`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className={`p-2 rounded-xl opacity-60 hover:opacity-100 transition-opacity ${isWholesale ? 'hover:bg-zinc-900 text-zinc-300' : 'hover:bg-zinc-200 text-zinc-700'
                  }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 opacity-30" />
                <h3 className="mt-3 text-base font-semibold">Tu recibo está vacío</h3>
                <p className="mt-1 text-xs opacity-60 max-w-xs mx-auto">
                  Agrega productos desde el catálogo para visualizar tu pedido en tiempo real y exportar tu recibo.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className={`mt-6 rounded-full px-5 py-2 text-xs font-semibold shadow-xs transition-transform active:scale-95 ${isWholesale ? 'bg-white text-black' : 'bg-black text-white'
                    }`}
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Visual Printable Ticket Area */}
                <div
                  ref={receiptRef}
                  id="receipt-print-area"
                  className={`p-5 rounded-2xl border transition-all ${isWholesale
                    ? 'bg-black text-white border-zinc-800 shadow-inner'
                    : 'bg-white text-zinc-950 border-zinc-900 shadow-sm'
                    }`}
                  style={{ minWidth: '320px' }}
                >
                  {/* Receipt Header */}
                  <div
                    className={`text-center pb-4 border-b border-dashed ${isWholesale ? 'border-zinc-800' : 'border-zinc-300'
                      }`}
                  >
                    <div className="inline-flex items-center justify-center gap-1 font-bold text-lg tracking-tighter">
                      <span className="text-xl"></span> iEssentials
                    </div>
                    <p className="text-[11px] opacity-70 tracking-wide uppercase">
                      Apple Accessories
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px] font-mono opacity-80 border-t border-zinc-200 dark:border-zinc-800 pt-2">
                      <span>ORDEN: {orderId}</span>
                      <span>{orderDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono opacity-80">
                      <span>MODO: {isWholesale ? 'AL MAYOR (B2B)' : 'DETAL'}</span>
                      <span>PAGO: {customerInfo.paymentMethod.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono opacity-80 pt-0.5">
                      <span>TASA OFICIAL BCV (EUR):</span>
                      <span>1 USD = Bs. {bcvRate.toFixed(2)}</span>
                    </div>
                    {customerInfo.name && (
                      <div className="text-left text-[11px] font-mono opacity-90 mt-1 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                        <span>CLIENTE: {customerInfo.name}</span>
                        {customerInfo.phone && <span> | TEL: {customerInfo.phone}</span>}
                      </div>
                    )}
                  </div>

                  {/* Items List in Receipt */}
                  <div className="py-4 space-y-3">
                    <div
                      className={`text-[10px] font-mono uppercase tracking-wider opacity-60 flex justify-between pb-1 border-b ${isWholesale ? 'border-zinc-800' : 'border-zinc-200'
                        }`}
                    >
                      <span>Cant / Producto</span>
                      <span>Total USD / Bs</span>
                    </div>

                    {cart.map((item) => {
                      const itemTotalUsd = item.unitPrice * item.quantity;
                      return (
                        <div key={item.product.id} className="flex items-start justify-between gap-2 text-xs">
                          <div className="flex-1">
                            <div className="font-semibold leading-tight flex items-center gap-1.5">
                              <span className="font-mono font-bold opacity-80">{item.quantity}x</span>
                              <span>{item.product.name}</span>
                            </div>
                            <span className="text-[10px] font-mono opacity-60">
                              @ ${item.unitPrice.toFixed(2)} USD c/u
                            </span>
                          </div>
                          <div className="text-right font-mono">
                            <div className="font-bold">${itemTotalUsd.toFixed(2)}</div>
                            <div className="text-[10px] opacity-70">{formatBs(itemTotalUsd)}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Receipt Calculation & Totals in USD & Bs */}
                  <div
                    className={`pt-3 border-t border-dashed space-y-1.5 text-xs ${isWholesale ? 'border-zinc-800' : 'border-zinc-300'
                      }`}
                  >
                    <div className="flex justify-between text-xs opacity-75 font-mono">
                      <span>Subtotal ({totalItems} artículos)</span>
                      <span>${subtotal.toFixed(2)} USD</span>
                    </div>

                    {isWholesale && totalSavings > 0 && (
                      <div className="flex justify-between text-xs font-mono font-semibold text-emerald-500">
                        <span>Ahorro Mayorista</span>
                        <span>-${totalSavings.toFixed(2)} USD</span>
                      </div>
                    )}

                    {/* Total USD */}
                    <div
                      className={`flex justify-between text-base font-bold font-mono pt-2 border-t ${isWholesale ? 'border-zinc-800 text-white' : 'border-zinc-950 text-zinc-950'
                        }`}
                    >
                      <span>TOTAL USD</span>
                      <span className="text-lg">${total.toFixed(2)}</span>
                    </div>

                    {/* Total Bs (BCV Euro) */}
                    <div className="flex justify-between text-xs font-bold font-mono opacity-90 pt-0.5">
                      <span>TOTAL BOLÍVARES (BCV EUR)</span>
                      <span className="text-sm font-bold text-emerald-500">{formatBs(total)}</span>
                    </div>
                  </div>

                  {/* Receipt Footer Notes */}
                  <div
                    className={`mt-4 pt-3 border-t text-center text-[10px] opacity-60 leading-relaxed font-mono ${isWholesale ? 'border-zinc-800' : 'border-zinc-200'
                      }`}
                  >
                    <p>✓ Garantía Oficial iEssentials • Producto Verificado</p>
                    <p>Calculado a tasa oficial Euro BCV del día</p>
                  </div>
                </div>

                {/* Interactive Quantity Adjustments List */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-70 block">
                    Editar cantidades del pedido
                  </span>

                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className={`flex items-center justify-between p-3 rounded-2xl border ${isWholesale
                          ? 'bg-[#09090b] border-zinc-800'
                          : 'bg-zinc-50 border-zinc-200'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-1.5 h-9 w-9 aspect-square shrink-0 flex items-center justify-center rounded-xl overflow-hidden ${isWholesale ? 'bg-zinc-900 text-white border border-zinc-800' : 'bg-white text-zinc-900 border border-zinc-200 shadow-xs'
                              }`}
                          >
                            {item.product.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <ProductIcon name={item.product.iconName} className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-semibold line-clamp-1 max-w-[180px] sm:max-w-[220px]">
                              {item.product.name}
                            </p>
                            <p className="text-[11px] font-mono opacity-60">
                              ${item.unitPrice.toFixed(2)} USD (≈ {formatBs(item.unitPrice)})
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div
                            className={`flex items-center rounded-lg border ${isWholesale
                              ? 'bg-zinc-900 border-zinc-800'
                              : 'bg-white border-zinc-300'
                              }`}
                          >
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-1 text-xs hover:opacity-75"
                              aria-label="Restar uno"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-1 text-xs font-bold font-mono min-w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 text-xs hover:opacity-75"
                              aria-label="Sumar uno"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 opacity-60 hover:opacity-100 hover:text-red-500 transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Details Form */}
                <div
                  className={`p-4 rounded-2xl border space-y-3 ${isWholesale
                    ? 'bg-[#09090b] border-zinc-800'
                    : 'bg-zinc-50 border-zinc-200'
                    }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider opacity-70 block flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    Datos del Comprador (Opcional para el recibo)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] opacity-70 block mb-1">Nombre o Razón Social</label>
                      <input
                        type="text"
                        placeholder="Ej. Juan Pérez / Tienda"
                        value={customerInfo.name}
                        onChange={(e) => updateCustomerField('name', e.target.value)}
                        className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none ${isWholesale
                          ? 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500'
                          : 'bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
                          }`}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] opacity-70 block mb-1">Teléfono / WhatsApp</label>
                      <input
                        type="text"
                        placeholder="+58 412 0000000"
                        value={customerInfo.phone}
                        onChange={(e) => updateCustomerField('phone', e.target.value)}
                        className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none ${isWholesale
                          ? 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500'
                          : 'bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
                          }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] opacity-70 block mb-1">Método de Pago Preferido</label>
                    <select
                      value={customerInfo.paymentMethod}
                      onChange={(e) =>
                        updateCustomerField(
                          'paymentMethod',
                          e.target.value as CustomerInfo['paymentMethod']
                        )
                      }
                      className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none ${isWholesale
                        ? 'bg-zinc-900 border-zinc-800 text-white'
                        : 'bg-white border-zinc-300 text-zinc-900'
                        }`}
                    >
                      <option value="zinli">Zinli (USD)</option>
                      <option value="pago_movil">Pago Móvil (Bs. Tasa Oficial BCV)</option>
                      <option value="binance">Binance Pay (USDT)</option>
                      <option value="efectivo">Efectivo USD (Cash Delivery)</option>
                      <option value="transferencia">Transferencia Bancaria en Bs</option>
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Actions Footer */}
          {cart.length > 0 && (
            <div
              className={`p-5 border-t space-y-3 ${isWholesale ? 'border-zinc-800 bg-[#09090b]' : 'border-zinc-200 bg-zinc-50'
                }`}
            >
              {/* Grand Total Summary in USD and Bs */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs opacity-60">Total a Pagar</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold font-mono">${total.toFixed(2)}</span>
                    <span className="text-xs opacity-60 font-mono">USD</span>
                  </div>
                  <div className="text-xs font-mono font-semibold text-emerald-500">
                    ≈ {formatBs(total)}
                  </div>
                </div>

                {isWholesale && totalSavings > 0 && (
                  <div className="text-right">
                    <span className="text-[11px] text-emerald-400 font-semibold block">
                      Ahorras ${totalSavings.toFixed(2)} USD
                    </span>
                    <span className="text-[10px] opacity-60 font-mono">({formatBs(totalSavings)})</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {/* PNG Download Button */}
                <button
                  onClick={handleDownloadPng}
                  disabled={isExporting}
                  id="download-receipt-png-btn"
                  className={`flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-xs font-bold tracking-wide transition-all shadow-xs active:scale-98 ${exportSuccess
                    ? 'bg-emerald-600 text-white'
                    : isWholesale
                      ? 'bg-white text-black hover:bg-zinc-200'
                      : 'bg-black text-white hover:bg-zinc-800'
                    }`}
                >
                  {isExporting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>Generando PNG...</span>
                    </div>
                  ) : exportSuccess ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>¡Descargado con éxito!</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Descargar Recibo PNG</span>
                    </>
                  )}
                </button>

                {/* WhatsApp Share Button */}
                <button
                  onClick={handleWhatsAppShare}
                  id="whatsapp-share-order-btn"
                  className="flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-xs font-bold tracking-wide bg-[#25D366] hover:bg-[#20bd5a] text-black transition-all shadow-xs active:scale-98"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Enviar Pedido a WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
