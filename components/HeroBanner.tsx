"use client";

import React from "react";
import Image from "next/image";

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#3a0857] via-[#52117c] to-[#3a0857] p-6 sm:p-8 lg:p-10 text-white shadow-lg">
      {/* Background ambient lighting effects */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

      {/* Decorative side elements for desktop */}
      <div className="hidden xl:block absolute left-6 top-1/2 -translate-y-1/2 w-44 h-44 opacity-85 transition-transform hover:scale-105 pointer-events-none">
        <Image
          src="https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-1-controller/ps5-console-with-1-controller-on-rent-sharepal-1.webp"
          alt="PS5 Console Preview"
          width={180}
          height={180}
          className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          priority
        />
      </div>

      <div className="hidden xl:block absolute right-6 top-1/2 -translate-y-1/2 w-44 h-44 opacity-85 transition-transform hover:scale-105 pointer-events-none">
        <Image
          src="https://images.sharepal.in/categories/gaming-consoles/ps5/ps-portal-remote-player/ps-portal-on-rent-1.webp"
          alt="PlayStation Portal Preview"
          width={180}
          height={180}
          className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          priority
        />
      </div>

      {/* Center Content */}
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white drop-shadow-sm">
          Gaming Consoles
        </h1>

        <p className="mt-2.5 text-xs sm:text-sm text-purple-100/90 leading-relaxed max-w-lg">
          Rent the latest gaming gadgets from{" "}
          <span className="font-bold italic text-white">SharePal</span>: PS5,
          Xbox, Oculus VR, Racing Wheel on rent.
        </p>

        {/* Partner Logos Row */}
        <div className="mt-5 flex items-center justify-center space-x-6 sm:space-x-8 text-white/90">
          {/* XBOX */}
          <div className="flex items-center gap-1.5 font-bold tracking-wider text-xs sm:text-sm">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.1c2.185 0 4.223.708 5.88 1.905-1.574 1.34-3.52 2.457-5.88 3.32-2.36-.863-4.306-1.98-5.88-3.32A9.856 9.856 0 0 1 12 2.1zM4.148 5.766c1.677 1.488 3.86 2.723 6.46 3.656C8.24 13.06 6.34 17.59 5.86 19.46A9.854 9.854 0 0 1 2.1 12c0-2.48.92-4.747 2.048-6.234zm15.704 0C20.98 7.253 21.9 9.52 21.9 12c0 2.94-1.28 5.58-3.31 7.42-.48-1.84-2.38-6.38-4.75-10.04 2.6-0.93 4.78-2.17 6.46-3.61z" />
            </svg>
            <span>XBOX</span>
          </div>

          {/* PS5 */}
          <div className="flex items-center gap-1.5 font-bold tracking-wider text-xs sm:text-sm">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M8.5 2C7.1 2 6 3.1 6 4.5v15c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5v-15C11 3.1 9.9 2 8.5 2zm7 0C14.1 2 13 3.1 13 4.5v15c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5v-15C18 3.1 16.9 2 15.5 2z" />
            </svg>
            <span className="tracking-tighter italic">PS5</span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-1.5 font-bold tracking-wider text-xs sm:text-sm">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.5c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm-2.5 10.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5zm5 0c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
            </svg>
            <span>Meta</span>
          </div>
        </div>
      </div>
    </div>
  );
};
