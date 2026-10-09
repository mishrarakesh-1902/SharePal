"use client";

import React, { useState, useEffect } from "react";
import { useDateStore } from "../store/useDateStore";
import {
  X,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Info,
  Percent,
} from "lucide-react";
import { calculateDaysBetween } from "../lib/utils";

export const DatePickerModal: React.FC = () => {
  const {
    deliveryDate,
    pickupDate,
    isDatePickerOpen,
    closeDatePicker,
    setDateRange,
  } = useDateStore();

  const [tempDelivery, setTempDelivery] = useState<string | null>(deliveryDate);
  const [tempPickup, setTempPickup] = useState<string | null>(pickupDate);
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(9); // 0-indexed: 9 = October

  useEffect(() => {
    if (isDatePickerOpen) {
      setTempDelivery(deliveryDate);
      setTempPickup(pickupDate);
    }
  }, [isDatePickerOpen, deliveryDate, pickupDate]);

  if (!isDatePickerOpen) return null;

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const getMonthName = (monthIdx: number) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    return months[monthIdx];
  };

  // Generate calendar days
  const renderMonthCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    // Prev month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        dateStr: null,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const mStr = String(month + 1).padStart(2, "0");
      const dStr = String(i).padStart(2, "0");
      const dateStr = `${year}-${mStr}-${dStr}`;
      days.push({
        day: i,
        isCurrentMonth: true,
        dateStr,
      });
    }

    // Next month padding to fill grid
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        dateStr: null,
      });
    }

    return (
      <div className="flex-1 min-w-[240px]">
        <div className="text-center font-bold text-xs sm:text-sm text-slate-800 mb-3">
          {getMonthName(month)} {year}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-400 mb-1">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {days.slice(0, 35).map((item, idx) => {
            if (!item.isCurrentMonth || !item.dateStr) {
              return (
                <div
                  key={idx}
                  className="flex h-8 w-8 items-center justify-center text-slate-300 mx-auto"
                >
                  {item.day}
                </div>
              );
            }

            const isStart = tempDelivery === item.dateStr;
            const isEnd = tempPickup === item.dateStr;
            const inRange =
              tempDelivery &&
              tempPickup &&
              item.dateStr > tempDelivery &&
              item.dateStr < tempPickup;

            return (
              <button
                key={idx}
                onClick={() => handleDateClick(item.dateStr!)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg font-medium transition mx-auto ${
                  isStart || isEnd
                    ? "bg-[#8ee600] text-slate-950 font-bold shadow-sm"
                    : inRange
                    ? "bg-lime-100 text-slate-900 font-semibold rounded-none"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const handleDateClick = (dateStr: string) => {
    if (!tempDelivery || (tempDelivery && tempPickup)) {
      setTempDelivery(dateStr);
      setTempPickup(null);
    } else if (tempDelivery && !tempPickup) {
      if (dateStr < tempDelivery) {
        setTempDelivery(dateStr);
      } else if (dateStr === tempDelivery) {
        // Same day: 1 day rental
        const nextDay = new Date(dateStr);
        nextDay.setDate(nextDay.getDate() + 1);
        setTempPickup(nextDay.toISOString().split("T")[0]);
      } else {
        setTempPickup(dateStr);
      }
    }
  };

  const daysCount = calculateDaysBetween(tempDelivery, tempPickup);

  const handleConfirm = () => {
    if (tempDelivery) {
      // If no pickup date selected, default to +2 days
      let finalPickup = tempPickup;
      if (!finalPickup) {
        const d = new Date(tempDelivery);
        d.setDate(d.getDate() + 2);
        finalPickup = d.toISOString().split("T")[0];
      }
      setDateRange(tempDelivery, finalPickup);
    }
    closeDatePicker();
  };

  const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  const nextMonthYear = viewMonth === 11 ? viewYear + 1 : viewYear;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex w-full max-w-4xl flex-col rounded-3xl bg-white p-6 shadow-2xl md:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 tracking-tight font-heading">
            Select your Dates
          </h2>
          <button
            onClick={closeDatePicker}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            aria-label="Close Date Picker"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body: Left Form / Right Calendar */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Date Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Delivery Date <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800">
                    <CalendarIcon className="h-4 w-4 text-slate-400" />
                    <span>{tempDelivery || "Select delivery"}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pickup Date <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800">
                    <CalendarIcon className="h-4 w-4 text-slate-400" />
                    <span>{tempPickup || "Select pickup"}</span>
                  </div>
                </div>
              </div>

              {/* Delivery notice */}
              <div className="flex items-start gap-2.5 rounded-xl bg-blue-50/70 p-3 text-[11px] text-blue-900 border border-blue-100">
                <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  <span className="font-bold">Same-day delivery</span> between 5PM and 11PM. For future dates, you can select a specific time slot at checkout. We pickup between 9AM to 1PM.
                </p>
              </div>

              {/* Rental Period Display */}
              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Your Rental Period:
                </span>
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">
                      {String(daysCount).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      {daysCount === 1 ? "Day" : "Days"}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">
                      Chargeable Period:
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {tempDelivery && tempPickup
                        ? `${tempDelivery} to ${tempPickup}`
                        : "Select pickup date"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Save More with Us Box */}
              <div className="rounded-2xl bg-[#091733] p-4 text-white border border-blue-950">
                <div className="flex items-center gap-2 font-black italic tracking-wide text-xs text-[#8ee600]">
                  <div className="rounded-full bg-[#8ee600]/20 p-1">
                    <Percent className="h-3.5 w-3.5 text-[#8ee600]" />
                  </div>
                  <span>Save more with us!</span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-300 leading-relaxed">
                  Longer rental periods mean bigger savings—enjoy discounts of up to 12%. We don&apos;t charge you for delivery and pickup days!
                </p>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleConfirm}
              className="w-full rounded-full bg-[#8ee600] py-3 text-xs sm:text-sm font-extrabold text-slate-950 shadow-md transition hover:bg-[#7ecb00] active:scale-95"
            >
              Continue
            </button>
          </div>

          {/* Right Calendar Container (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={handlePrevMonth}
                className="rounded-full p-1.5 text-slate-600 hover:bg-slate-100 transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Range
              </span>
              <button
                onClick={handleNextMonth}
                className="rounded-full p-1.5 text-slate-600 hover:bg-slate-100 transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderMonthCalendar(viewYear, viewMonth)}
              {renderMonthCalendar(nextMonthYear, nextMonth)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
