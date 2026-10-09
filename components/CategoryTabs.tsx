"use client";

import React from "react";
import { motion } from "framer-motion";

interface CategoryTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeTab = "Gaming",
  onTabChange,
}) => {
  const tabs = [
    { id: "Photography", label: "Photography" },
    { id: "Gaming", label: "Gaming" },
    { id: "Outdoor", label: "Outdoor" },
    { id: "Entertainment", label: "Entertainment" },
  ];

  return (
    <div className="sticky top-[57px] md:top-[61px] z-30 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4">
        <nav className="flex space-x-6 sm:space-x-12" aria-label="Main Category Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange?.(tab.id)}
                className={`relative py-3.5 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-[#3d0b5e]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#3d0b5e]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
