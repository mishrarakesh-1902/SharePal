"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { useDateStore } from "../store/useDateStore";
import { formatDateShort } from "../lib/utils";

export const StickyDatePill: React.FC = () => {
  const { deliveryDate, pickupDate, openDatePicker } = useDateStore();

  const isConfigured = deliveryDate && pickupDate;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <button
        onClick={openDatePicker}
        className="flex items-center gap-2 rounded-full border-2 border-[#8ee600] bg-[#081329] px-5 py-2.5 text-xs sm:text-sm font-black text-white shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <Calendar className="h-4 w-4 text-[#8ee600]" />
        <span>
          {isConfigured
            ? `${formatDateShort(deliveryDate)} – ${formatDateShort(pickupDate)}`
            : "Select rental dates to view prices"}
        </span>
      </button>
    </div>
  );
};
