"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "../types/product";
import { useWaitlistStore } from "../store/useWaitlistStore";
import { Check, Sparkles } from "lucide-react";

interface VoteToLaunchCardProps {
  product: Product;
}

export const VoteToLaunchCard: React.FC<VoteToLaunchCardProps> = ({ product }) => {
  const { openWaitlistModal, hasJoined, getWaitlistCount } = useWaitlistStore();
  const joined = hasJoined(product.id);
  const count = getWaitlistCount(product.id);
  const target = 1000;
  const percentage = Math.min(100, Math.max(3, (count / target) * 100));
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Top Tag */}
      <div className="p-3.5 pb-0">
        <span className="inline-block rounded border border-lime-400 bg-lime-50 px-2 py-0.5 text-[10px] font-bold tracking-wide text-slate-800">
          Vote to Launch
        </span>
      </div>

      {/* Product Image */}
      <div className="relative mx-auto my-2 flex h-40 w-full items-center justify-center px-4">
        <Image
          src={
            imageError
              ? "https://images.sharepal.in/categories/gaming-consoles/ps5/ps-portal-remote-player/ps-portal-on-rent-1.webp"
              : product.image
          }
          alt={product.name}
          width={220}
          height={160}
          className="max-h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
          priority
        />
      </div>

      {/* Title */}
      <div className="px-4 pb-3">
        <h3 className="line-clamp-2 text-xs sm:text-sm font-semibold text-slate-900 min-h-[38px]">
          {product.name}
        </h3>
      </div>

      {/* Bottom Waitlist Container */}
      <div className="bg-[#f2fcd8] border-t border-lime-200/80 p-3.5 flex flex-col justify-between">
        <div className="flex items-start gap-1.5 text-[11px] font-medium text-slate-800 leading-tight mb-2">
          <Sparkles className="h-3.5 w-3.5 text-purple-700 shrink-0 mt-0.5" />
          <span>We launch if 1k people join the waitlist. Get notified first!</span>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] font-semibold text-purple-900 mb-1">
            <span>{count}/{target} Joined</span>
            <span>{Math.round(percentage)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-purple-700 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Join Waitlist Button */}
        <button
          onClick={() => openWaitlistModal(product)}
          disabled={joined}
          className={`flex w-full items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition-all active:scale-95 shadow-sm ${
            joined
              ? "bg-slate-200 text-slate-700 cursor-default"
              : "bg-[#8ee600] text-slate-950 hover:bg-[#7ecb00]"
          }`}
        >
          {joined ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-700" />
              <span>Waitlist Joined</span>
            </>
          ) : (
            <span>Join Waitlist</span>
          )}
        </button>
      </div>
    </div>
  );
};
