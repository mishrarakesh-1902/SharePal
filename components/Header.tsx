"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar as CalendarIcon,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
} from "lucide-react";
import { useDateStore } from "../store/useDateStore";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { formatDateShort } from "../lib/utils";

interface HeaderProps {
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const { deliveryDate, pickupDate, openDatePicker } = useDateStore();
  const { items, openCart, getItemCount } = useCartStore();
  const { user, isAuthenticated, openAuthModal } = useAuthStore();
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const itemCount = getItemCount();

  const cities = ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai", "Kolkata"];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#3d0b5e] text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Left: SharePal Logo */}
        <Link href="/" className="flex items-center gap-1.5 focus:outline-none">
          <div className="flex items-center">
            <span className="font-heading text-2xl font-black italic tracking-tight text-white sm:text-3xl">
              Share
            </span>
            <span className="ml-0.5 rounded-lg bg-[#2563eb] px-1.5 py-0.5 font-heading text-2xl font-black italic tracking-tight text-[#8ee600] shadow-sm sm:text-3xl">
              Pal
            </span>
          </div>
        </Link>

        {/* Center: Location & Date Selector Capsule (Desktop / Tablet) */}
        <div className="hidden items-center rounded-full bg-white p-1 text-slate-800 shadow-sm md:flex">
          {/* City Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              aria-label="Select City"
            >
              <MapPin className="h-3.5 w-3.5 text-slate-500" />
              <span>{selectedCity}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {isCityDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-36 rounded-xl border border-slate-100 bg-white py-1.5 shadow-xl ring-1 ring-black/5 z-50">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setIsCityDropdownOpen(false);
                    }}
                    className={`flex w-full items-center px-3.5 py-1.5 text-left text-xs font-medium transition hover:bg-slate-50 ${
                      selectedCity === city
                        ? "text-[#3d0b5e] font-semibold bg-purple-50"
                        : "text-slate-700"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-slate-200" />

          {/* Delivery Date */}
          <button
            onClick={openDatePicker}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <CalendarIcon className="h-3.5 w-3.5 text-slate-500" />
            <span>
              {deliveryDate
                ? `Delivery Date: ${formatDateShort(deliveryDate)}`
                : "Delivery Date"}
            </span>
          </button>

          <div className="h-4 w-px bg-slate-200" />

          {/* Pickup Date */}
          <button
            onClick={openDatePicker}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <CalendarIcon className="h-3.5 w-3.5 text-slate-500" />
            <span>
              {pickupDate
                ? `Pickup Date: ${formatDateShort(pickupDate)}`
                : "Pickup Date"}
            </span>
          </button>

          {/* Select Button */}
          <button
            onClick={openDatePicker}
            className="flex items-center gap-1 rounded-full bg-[#081329] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-900 active:scale-95"
          >
            <CalendarIcon className="h-3 w-3" />
            <span>Select</span>
          </button>
        </div>

        {/* Right: Search, Cart, Login */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Icon */}
          <button
            onClick={onSearchClick}
            className="rounded-full p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
            aria-label="Search products"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Cart Icon with Counter */}
          <button
            onClick={openCart}
            className="relative rounded-full p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
            aria-label="Open Cart Drawer"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#8ee600] text-[11px] font-bold text-slate-950 shadow-sm animate-in zoom-in-50">
                {itemCount}
              </span>
            )}
          </button>

          {/* Profile / Login */}
          <button
            onClick={() => openAuthModal(isAuthenticated ? "profile" : "login")}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/20 active:scale-95"
            aria-label={isAuthenticated ? "Open Profile" : "Login or Signup"}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#3d0b5e] font-bold text-[11px]">
              {isAuthenticated && user ? (
                user.fullName.slice(0, 1).toUpperCase()
              ) : (
                <User className="h-3.5 w-3.5" />
              )}
            </div>
            <span className="hidden sm:inline">
              {isAuthenticated && user
                ? `Hi, ${user.fullName.split(" ")[0]}`
                : "Hi, Login"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile date capsule bar */}
      <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 md:hidden">
        <div className="flex items-center gap-1.5 text-xs text-white/90">
          <MapPin className="h-3.5 w-3.5 text-[#8ee600]" />
          <span className="font-semibold">{selectedCity}</span>
        </div>
        <button
          onClick={openDatePicker}
          className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white transition active:scale-95"
        >
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>
            {deliveryDate
              ? `${formatDateShort(deliveryDate)} - ${
                  pickupDate ? formatDateShort(pickupDate) : "Select pickup"
                }`
              : "Select Dates"}
          </span>
        </button>
      </div>
    </header>
  );
};
