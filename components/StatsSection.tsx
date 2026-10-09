"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export const StatsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Animate counts
    const duration = 1500;
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCount1(Math.round(250 * progress));
      setCount2(Number((4.5 * progress).toFixed(1)));
      setCount3(Math.round(100 * progress));

      if (step >= steps) {
        clearInterval(timer);
        setCount1(250);
        setCount2(4.5);
        setCount3(100);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section ref={ref} className="my-16 w-full py-8 border-y border-slate-200/80 bg-white/50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1e4bb5]">
              {count1}Cr+
            </div>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-600">
              Saved Together
            </p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight flex items-baseline justify-center">
              <span className="text-[#1e4bb5]">{count2}M</span>
              <span className="text-[#84cc16] ml-2">Kg</span>
            </div>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-600">
              CO₂E Emissions Saved
            </p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1e4bb5]">
              {count3}K+
            </div>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-600">
              Products In Circulation
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
