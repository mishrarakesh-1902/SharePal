"use client";

import React from "react";
import {
  Calendar,
  Gift,
  Tag,
  RotateCcw,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export const AssetPartnerBanner: React.FC = () => {
  return (
    <div className="col-span-full my-3 overflow-hidden rounded-2xl md:rounded-3xl bg-[#091733] p-5 sm:p-7 text-white shadow-md border border-blue-900/30">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left / Top Info */}
        <div className="flex-1">
          <h3 className="font-heading text-lg sm:text-2xl font-black tracking-tight text-white">
            Become an <span className="text-[#8ee600]">Asset Partner.</span> Earn Monthly.
          </h3>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl">
            {/* Earning Benefits Card */}
            <div className="rounded-xl bg-[#0d2047] p-3.5 border border-blue-800/40">
              <span className="text-[10px] font-bold tracking-wider text-blue-300 uppercase">
                EARNING BENEFITS
              </span>
              <div className="mt-2 flex items-start gap-2.5">
                <Calendar className="h-4 w-4 text-[#8ee600] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Monthly Earnings</h4>
                  <p className="text-[10px] text-slate-300">From rental assets</p>
                </div>
              </div>
              <div className="mt-2.5 flex items-start gap-2.5">
                <Gift className="h-4 w-4 text-[#8ee600] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Upto ₹10,000</h4>
                  <p className="text-[10px] text-slate-300">Instant Wallet credits</p>
                </div>
              </div>
            </div>

            {/* Rental Benefits Card */}
            <div className="rounded-xl bg-[#0d2047] p-3.5 border border-blue-800/40">
              <span className="text-[10px] font-bold tracking-wider text-blue-300 uppercase">
                RENTAL BENEFITS
              </span>
              <div className="mt-2 flex items-start gap-2.5">
                <Tag className="h-4 w-4 text-[#8ee600] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">10% Off</h4>
                  <p className="text-[10px] text-slate-300">Exclusive discount when you rent</p>
                </div>
              </div>
              <div className="mt-2.5 flex items-start gap-2.5">
                <RotateCcw className="h-4 w-4 text-[#8ee600] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Get 10% Cashback</h4>
                  <p className="text-[10px] text-slate-300">On every order</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:flex-col gap-3">
          <a
            href="https://sharepal.in/asset-partner"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#8ee600] px-6 py-2.5 text-xs font-extrabold text-slate-950 shadow-sm transition hover:bg-[#7ecb00] active:scale-95"
          >
            <span>Know More</span>
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const RentOutGearBanner: React.FC = () => {
  return (
    <div className="col-span-full my-3 overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#1c4cb6] via-[#2154c8] to-[#1642a8] p-5 sm:p-7 text-white shadow-md border border-blue-400/20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="max-w-xl">
          <p className="text-xs font-semibold text-blue-200">
            Got gear you <span className="underline decoration-lime-400 decoration-2 underline-offset-4">dont use anymore</span>?
          </p>
          <h3 className="mt-1 font-heading text-xl sm:text-2xl font-black tracking-tight text-white">
            Rent Out Your Gear on SharePal
          </h3>
        </div>

        <a
          href="https://sharepal.in/rent-your-gear"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-full bg-[#8ee600] px-6 py-2.5 text-xs font-extrabold text-slate-950 shadow-sm transition hover:bg-[#7ecb00] active:scale-95 w-fit"
        >
          <span>Earn With Us</span>
          <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
        </a>
      </div>
    </div>
  );
};
