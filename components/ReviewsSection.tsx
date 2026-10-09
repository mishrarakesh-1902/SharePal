"use client";

import React, { useRef, useState, useEffect } from "react";
import { reviewsData } from "../data/reviews";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export const ReviewsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto scroll feature
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="my-16 w-full">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 px-2">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Served more than{" "}
            <span className="text-[#ea580c] font-black">1 Lakh Orders</span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Over 100,000+ happy customers across India trust SharePal for premium gear.
          </p>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="hidden sm:flex items-center gap-2 mt-4 sm:mt-0">
          <button
            onClick={() => handleScroll("left")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-95"
            aria-label="Scroll reviews left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-95"
            aria-label="Scroll reviews right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Reviews Cards Scroll Container */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex space-x-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing px-2"
      >
        {reviewsData.map((rev) => (
          <div
            key={rev.id}
            className="flex w-[290px] sm:w-[330px] shrink-0 flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Top row: Google G & 5 Stars */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                {/* Google G Logo */}
                <div className="flex h-5 w-5 items-center justify-center font-bold text-sm">
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>

                <div className="flex items-center space-x-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]"
                    />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs text-slate-700 leading-relaxed italic line-clamp-3">
                &ldquo;{rev.text}&rdquo;
              </p>
            </div>

            {/* Bottom User Info */}
            <div className="mt-4 flex items-center gap-3 pt-3 border-t border-slate-100">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                {rev.initials}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{rev.name}</h4>
                <p className="text-[11px] text-slate-400">
                  {rev.location} • {rev.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
