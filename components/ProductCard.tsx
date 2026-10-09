"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "../types/product";
import { useDateStore } from "../store/useDateStore";
import { useCartStore } from "../store/useCartStore";
import { calculateDaysBetween, formatCurrency } from "../lib/utils";
import { Plus, Check, Star, Info, Bell, Minus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onNotifyClick?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNotifyClick,
}) => {
  const { deliveryDate, pickupDate, openDatePicker } = useDateStore();
  const { items, addItem, removeItem, updateQuantity } = useCartStore();
  const [imageError, setImageError] = useState(false);

  const days = calculateDaysBetween(deliveryDate, pickupDate);
  const hasDates = !!(deliveryDate && pickupDate && days > 0);

  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleActionClick = () => {
    if (product.out_of_stock) {
      onNotifyClick?.(product);
      return;
    }

    if (!hasDates) {
      openDatePicker();
      return;
    }

    addItem(product);
  };

  const totalPrice = product.per_day_rent * Math.max(1, days);

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
        product.out_of_stock ? "border-slate-200 opacity-90" : "border-slate-200/90"
      }`}
    >
      {/* Top Meta Row (Tag & Rating) */}
      <div className="flex items-center justify-between min-h-[24px]">
        {product.tag ? (
          <span
            className={`rounded px-2 py-0.5 text-[10px] font-bold tracking-wide ${
              product.tag === "New"
                ? "border border-blue-500 text-blue-600 bg-blue-50/60"
                : product.tag === "Trending"
                ? "border border-orange-500 text-orange-600 bg-orange-50/60"
                : "border border-slate-300 text-slate-700 bg-slate-100"
            }`}
          >
            {product.tag}
          </span>
        ) : <div />}

        {/* Rating if > 0 */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            {product.booked_count > 0 && (
              <span className="text-[10px] text-slate-400 font-normal">
                ({product.booked_count})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Product Image Area */}
      <div className="relative mx-auto my-2 flex h-40 w-full items-center justify-center">
        <Image
          src={
            imageError
              ? "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-1-controller/ps5-console-with-1-controller-on-rent-sharepal-1.webp"
              : product.image
          }
          alt={product.name}
          width={220}
          height={160}
          className={`max-h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
            product.out_of_stock ? "grayscale opacity-75" : ""
          }`}
          onError={() => setImageError(true)}
          priority={false}
        />

        {product.out_of_stock && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            <span className="rounded-full bg-slate-800/80 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
              Unavailable for these dates
            </span>
          </div>
        )}
      </div>

      {/* Product Title */}
      <div className="mt-1">
        <h3 className="line-clamp-2 text-xs sm:text-sm font-semibold text-slate-900 min-h-[38px]">
          {product.name}
        </h3>
      </div>

      {/* Thin Divider */}
      <div className="my-2.5 h-px w-full bg-slate-100" />

      {/* Bottom Pricing & Action Section */}
      {product.out_of_stock ? (
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <Info className="h-3.5 w-3.5 text-slate-400" />
            <span>Unavailable</span>
          </div>
          <button
            onClick={() => onNotifyClick?.(product)}
            className="flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 active:scale-95"
          >
            <Bell className="h-3.5 w-3.5 text-slate-500" />
            <span>Check Availability</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-0.5">
          {/* Price information */}
          <div>
            {!hasDates ? (
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400">
                  Select Dates to view price
                </span>
                <span className="price-blur text-sm font-bold text-slate-400">
                  ₹ 999/day
                </span>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm sm:text-base font-extrabold text-slate-900">
                    {formatCurrency(totalPrice)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    for {days} {days === 1 ? "day" : "days"}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  ₹{product.per_day_rent}/day
                </span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div>
            {quantity > 0 && hasDates ? (
              <div className="flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 p-1 shadow-sm">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-purple-900 shadow-sm transition hover:bg-purple-100"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="px-1 text-xs font-bold text-purple-900">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-800 text-white shadow-sm transition hover:bg-purple-900"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleActionClick}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-[#3d0b5e] hover:bg-purple-50 hover:text-[#3d0b5e] active:scale-90"
                aria-label="Add to cart or select dates"
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
