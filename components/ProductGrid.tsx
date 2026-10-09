"use client";

import React from "react";
import { Product } from "../types/product";
import { ProductCard } from "./ProductCard";
import { VoteToLaunchCard } from "./VoteToLaunchCard";
import { AssetPartnerBanner, RentOutGearBanner } from "./GridBanners";
import { motion } from "framer-motion";
import { Gamepad2, RotateCcw, Loader2 } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  total: number;
  hasMore: boolean;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  onLoadMore: () => void;
  onResetFilters?: () => void;
  onNotifyClick?: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  total,
  hasMore,
  isLoading = false,
  isLoadingMore = false,
  onLoadMore,
  onResetFilters,
  onNotifyClick,
}) => {
  // Empty State
  if (!isLoading && products.length === 0) {
    return (
      <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 text-[#3d0b5e]">
          <Gamepad2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">
          No gaming gadgets found
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm">
          We couldn&apos;t find any gadgets matching your selected category or search filters.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-5 flex items-center gap-2 rounded-full bg-[#3d0b5e] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#32074d] active:scale-95 shadow-sm"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>View All Gaming Gadgets</span>
          </button>
        )}
      </div>
    );
  }

  // Skeletons when initial loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm animate-pulse h-80"
          >
            <div className="h-4 w-16 bg-slate-200 rounded" />
            <div className="h-36 w-full bg-slate-100 rounded-xl my-3" />
            <div className="h-4 w-3/4 bg-slate-200 rounded mb-2" />
            <div className="h-3 w-1/2 bg-slate-100 rounded mb-4" />
            <div className="h-8 w-full bg-slate-100 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  // Render items with in-grid banners
  // First row items: 0 to 3 (4 items)
  // Second row items: 4 to 7 (4 items)
  // Remaining items: 8 onwards
  const firstRow = products.slice(0, 4);
  const secondRow = products.slice(4, 8);
  const remainingRows = products.slice(8);

  const renderProductItem = (product: Product) => {
    const isPortal =
      product.name.toLowerCase().includes("portal") ||
      product.tag === "Vote to Launch";

    return (
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isPortal ? (
          <VoteToLaunchCard product={product} />
        ) : (
          <ProductCard product={product} onNotifyClick={onNotifyClick} />
        )}
      </motion.div>
    );
  };

  return (
    <div className="w-full">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* First Row */}
        {firstRow.map((product) => renderProductItem(product))}

        {/* Banner 1 (after first row) */}
        {products.length >= 4 && <AssetPartnerBanner />}

        {/* Second Row */}
        {secondRow.map((product) => renderProductItem(product))}

        {/* Banner 2 (after second row) */}
        {products.length >= 8 && <RentOutGearBanner />}

        {/* Remaining items */}
        {remainingRows.map((product) => renderProductItem(product))}
      </div>

      {/* Pagination & Count */}
      <div className="mt-10 mb-6 flex flex-col items-center justify-center gap-3">
        <p className="text-xs font-semibold text-slate-500">
          Showing <span className="text-slate-900 font-bold">{products.length}</span> of{" "}
          <span className="text-slate-900 font-bold">{total}</span> results
        </p>

        {hasMore && (
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-2.5 text-xs font-bold text-slate-800 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-400 active:scale-95 disabled:opacity-50"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-purple-700" />
                <span>Loading more...</span>
              </>
            ) : (
              <span>Show More</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
