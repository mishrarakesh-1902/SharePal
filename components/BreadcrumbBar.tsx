"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowUpDown, Search, X } from "lucide-react";

interface BreadcrumbBarProps {
  totalItems: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const BreadcrumbBar: React.FC<BreadcrumbBarProps> = ({
  totalItems,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="mt-6 mb-4">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 mb-2">
        <Link href="/" className="hover:text-slate-800 transition">
          Bangalore
        </Link>
        <ChevronRight className="h-3 w-3 mx-1 text-slate-400" />
        <span className="text-slate-800 font-medium">Gaming gadgets on rent</span>
      </nav>

      {/* Title & Stats / Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Gaming Gadgets On Rent
          </h2>
        </div>

        <div className="flex items-center flex-wrap gap-2.5 sm:gap-4">
          {/* Search Bar */}
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search gadgets..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-8 w-36 sm:w-44 rounded-full border border-slate-200 bg-white pl-8 pr-7 text-xs text-slate-800 placeholder-slate-400 shadow-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700 shadow-sm focus:border-purple-600 focus:outline-none"
            >
              <option value="default">Sort by: Recommended</option>
              <option value="popularity">Popularity (Booked)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* Total Count */}
          <div className="text-xs font-semibold text-slate-500 pl-1">
            Total items: <span className="text-slate-900 font-bold">{totalItems} items</span>
          </div>
        </div>
      </div>
    </div>
  );
};
