"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useWaitlistStore } from "../store/useWaitlistStore";
import { X, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

export const WaitlistModal: React.FC = () => {
  const {
    isModalOpen,
    selectedProduct,
    closeWaitlistModal,
    joinWaitlist,
    getWaitlistCount,
  } = useWaitlistStore();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isModalOpen || !selectedProduct) return null;

  const currentCount = getWaitlistCount(selectedProduct.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      joinWaitlist(selectedProduct.id, { name, contact });
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#8ee600", "#3d0b5e", "#2563eb"],
        });
      } catch (err) {
        console.error(err);
      }

      setTimeout(() => {
        setIsSuccess(false);
        closeWaitlistModal();
      }, 1800);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={closeWaitlistModal}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-14 w-14 text-[#8ee600] animate-bounce" />
            <h3 className="mt-4 text-lg font-black text-slate-900 font-heading">
              You&apos;re on the Waitlist!
            </h3>
            <p className="mt-1 text-xs text-slate-600 max-w-xs">
              Thank you for voting. We have recorded your interest ({currentCount}/1000 joined). We&apos;ll notify you first when the PlayStation Portal launches on SharePal!
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-800 uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4 text-[#8ee600]" />
              <span>Vote to Launch</span>
            </div>

            <h2 className="font-heading text-lg font-black text-slate-900 leading-snug">
              Join the {selectedProduct.name} Waitlist
            </h2>

            <div className="my-4 flex items-center gap-3 rounded-2xl bg-purple-50/70 p-3 border border-purple-100">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white flex items-center justify-center">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={56}
                  height={56}
                  className="object-contain p-1"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  {currentCount}/1000 gamers already joined
                </p>
                <p className="text-[11px] text-slate-500">
                  Help us bring this gadget to Bangalore with zero deposit.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email or Phone Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. rahul@example.com or 9876543210"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#8ee600] py-3 text-xs sm:text-sm font-black text-slate-950 shadow-md transition hover:bg-[#7ecb00] active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting Vote...</span>
                  </>
                ) : (
                  <span>Submit Vote & Join Waitlist</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
