"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "../types/product";
import { X, Bell, CheckCircle2, Loader2 } from "lucide-react";

interface NotifyMeModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NotifyMeModal: React.FC<NotifyMeModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setEmailOrPhone("");
        onClose();
      }, 1800);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-[#8ee600]" />
            <h3 className="mt-3 text-base font-bold text-slate-900">
              Notification Alert Set!
            </h3>
            <p className="mt-1 text-xs text-slate-600 max-w-xs">
              We will send you an instant SMS/Email alert as soon as this item becomes available in Bangalore.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              <Bell className="h-4 w-4 text-purple-700" />
              <span>Availability Alert</span>
            </div>

            <h2 className="font-heading text-lg font-black text-slate-900 leading-snug">
              Get notified when back in stock
            </h2>

            <div className="my-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3 border border-slate-100">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={56}
                  height={56}
                  className="object-contain p-1 grayscale"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 line-clamp-2">
                  {product.name}
                </p>
                <p className="text-[10px] text-red-500 font-semibold mt-0.5">
                  Currently Out of Stock for Bangalore
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number or Email
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 9876543210 or yourname@gmail.com"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#3d0b5e] py-3 text-xs sm:text-sm font-black text-white shadow-md transition hover:bg-[#30064c] active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving Alert...</span>
                  </>
                ) : (
                  <span>Notify Me When Available</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
