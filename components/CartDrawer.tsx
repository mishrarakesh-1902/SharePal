"use client";

import React from "react";
import Image from "next/image";
import { useCartStore } from "../store/useCartStore";
import { useDateStore } from "../store/useDateStore";
import { useAuthStore } from "../store/useAuthStore";
import { calculateDaysBetween, formatCurrency, formatDateShort } from "../lib/utils";
import { X, Trash2, Plus, Minus, Calendar, ShoppingBag, ArrowRight, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCartStore();

  const { deliveryDate, pickupDate, openDatePicker } = useDateStore();
  const { user, isAuthenticated, openAuthModal } = useAuthStore();

  if (!isCartOpen) return null;

  const days = calculateDaysBetween(deliveryDate, pickupDate);
  const effectiveDays = Math.max(1, days);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.per_day_rent * effectiveDays * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#3d0b5e]" />
            <h2 className="text-base font-bold text-slate-900">
              Your Rental Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            aria-label="Close Cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Date banner */}
        <div className="flex items-center justify-between border-b border-purple-100 bg-purple-50/60 px-4 py-2.5 text-xs">
          <div className="flex items-center gap-1.5 text-purple-900 font-medium">
            <Calendar className="h-4 w-4 text-purple-700" />
            <span>
              {deliveryDate && pickupDate
                ? `${formatDateShort(deliveryDate)} – ${formatDateShort(
                    pickupDate
                  )} (${effectiveDays} ${
                    effectiveDays === 1 ? "day" : "days"
                  })`
                : "No dates selected"}
            </span>
          </div>
          <button
            onClick={() => {
              closeCart();
              openDatePicker();
            }}
            className="text-xs font-bold text-purple-700 hover:underline"
          >
            Change
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 text-slate-500">
              <ShoppingBag className="h-12 w-12 text-slate-300 mb-3" />
              <p className="text-sm font-bold text-slate-800">Your cart is empty</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Explore our gaming gadgets and click &ldquo;+&rdquo; to add consoles and accessories.
              </p>
            </div>
          ) : (
            items.map(({ product, quantity }) => {
              const itemTotal = product.per_day_rent * effectiveDays * quantity;
              return (
                <div
                  key={product.id}
                  className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="line-clamp-2 text-xs font-bold text-slate-800">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-slate-400 hover:text-red-500 transition p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs font-bold text-slate-900">
                        {formatCurrency(itemTotal)}
                        <span className="text-[10px] text-slate-400 font-normal ml-1">
                          (₹{product.per_day_rent}/day)
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 p-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm"
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="px-1 text-xs font-bold text-slate-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm"
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 bg-slate-50/70 p-4 space-y-3">
            {/* Delivery Address Preview */}
            {isAuthenticated && user ? (
              <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-2.5 text-xs text-slate-700">
                <div className="flex items-center justify-between font-bold text-purple-900 mb-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-purple-700" />
                    <span>Delivering to: {user.fullName.split(" ")[0]} ({user.address.addressType})</span>
                  </div>
                  <button
                    onClick={() => {
                      closeCart();
                      openAuthModal("profile");
                    }}
                    className="text-[10px] text-purple-700 hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-[11px] text-slate-600 truncate">
                  {user.address.flatNo}, {user.address.street}, {user.address.city} - {user.address.pincode}
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-2.5 text-xs text-amber-900 flex items-center justify-between">
                <span>Sign up with address for Zero-Deposit doorstep delivery.</span>
                <button
                  onClick={() => {
                    closeCart();
                    openAuthModal("signup");
                  }}
                  className="font-bold text-purple-900 hover:underline whitespace-nowrap ml-2"
                >
                  Sign Up
                </button>
              </div>
            )}

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Rental Subtotal ({effectiveDays} days)</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Doorstep Delivery & Pickup</span>
                <span className="font-bold text-green-600 uppercase text-[10px]">
                  FREE
                </span>
              </div>
              <div className="flex justify-between">
                <span>Refundable Deposit</span>
                <span className="font-semibold text-slate-700">₹0</span>
              </div>
              <div className="h-px bg-slate-200 my-1" />
              <div className="flex justify-between text-sm font-black text-slate-900">
                <span>Total Amount</span>
                <span className="text-base text-[#3d0b5e]">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  closeCart();
                  openAuthModal("signup");
                } else {
                  alert(`Booking Confirmed for ${user?.fullName}! Delivering to ${user?.address.street}, ${user?.address.city} on ${deliveryDate ? formatDateShort(deliveryDate) : "selected date"}. Zero security deposit applied.`);
                  clearCart();
                  closeCart();
                }
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#8ee600] py-3 text-xs sm:text-sm font-black text-slate-950 shadow-md transition hover:bg-[#7ecb00] active:scale-95"
            >
              <span>{isAuthenticated ? "Confirm & Place Rental Order" : "Login / Sign Up to Checkout"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-[10px] text-slate-400 font-medium">
              Demo mode • Fast KYC verified • Zero deposit
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
