"use client";

import React from "react";
import { sidebarCategories } from "../data/categories";
import { CategoryId } from "../types/product";
import { motion } from "framer-motion";
import { Smile, Gamepad2, Disc3, Glasses, Tv, Compass } from "lucide-react";

interface SidebarProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const renderCategoryIcon = (id: CategoryId, isActive: boolean) => {
    switch (id) {
      case "all":
        return (
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
              isActive
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300"
            }`}
          >
            <Smile className="h-5 w-5" />
          </div>
        );
      case "gta-6":
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 p-1 text-[9px] font-black tracking-tighter text-white shadow-sm">
            GTA VI
          </div>
        );
      case "ps5-console":
        return (
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
              isActive
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-slate-200 bg-slate-50 text-slate-600 group-hover:border-slate-300"
            }`}
          >
            <Gamepad2 className="h-5 w-5" />
          </div>
        );
      case "xbox-console":
        return (
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
              isActive
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-slate-200 bg-slate-50 text-slate-600 group-hover:border-slate-300"
            }`}
          >
            <Disc3 className="h-5 w-5" />
          </div>
        );
      case "vr":
        return (
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
              isActive
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-slate-200 bg-slate-50 text-slate-600 group-hover:border-slate-300"
            }`}
          >
            <Glasses className="h-5 w-5" />
          </div>
        );
      case "racing-wheel":
        return (
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
              isActive
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-slate-200 bg-slate-50 text-slate-600 group-hover:border-slate-300"
            }`}
          >
            <Compass className="h-5 w-5" />
          </div>
        );
      case "big-screen-gaming":
        return (
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
              isActive
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-slate-200 bg-slate-50 text-slate-600 group-hover:border-slate-300"
            }`}
          >
            <Tv className="h-5 w-5" />
          </div>
        );
      default:
        return <Gamepad2 className="h-5 w-5" />;
    }
  };

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-36 shrink-0">
        <div className="sticky top-28 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-sm max-h-[calc(100vh-140px)] overflow-y-auto no-scrollbar">
          <div className="flex flex-col space-y-1">
            {sidebarCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`group relative flex flex-col items-center justify-center rounded-xl py-2.5 px-2 text-center transition-all ${
                    isActive
                      ? "border border-blue-500/80 bg-blue-50/50 shadow-sm"
                      : "hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  {renderCategoryIcon(cat.id, isActive)}
                  <span
                    className={`mt-1.5 text-[11px] font-semibold leading-tight transition-colors ${
                      isActive ? "text-blue-600" : "text-slate-700"
                    }`}
                  >
                    {cat.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActiveLine"
                      className="mt-1 h-0.5 w-6 rounded-full bg-blue-600"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Mobile Horizontal Scrollable Chip Bar */}
      <div className="lg:hidden w-full overflow-x-auto py-2 no-scrollbar border-b border-slate-200 bg-white px-3">
        <div className="flex space-x-2 min-w-max">
          {sidebarCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#3d0b5e] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
