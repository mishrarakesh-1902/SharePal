"use client";

import React, { useState } from "react";
import { faqsData } from "../data/faqs";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="my-12 w-full">
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-sm">
        <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-center md:text-left mb-6">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="space-y-3">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-slate-800 transition hover:bg-slate-50 focus:outline-none"
                >
                  <span className="pr-4 leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-purple-700" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="border-t border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4 text-xs sm:text-sm leading-relaxed text-slate-600 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
