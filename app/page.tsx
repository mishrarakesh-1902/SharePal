"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Header } from "../components/Header";
import { CategoryTabs } from "../components/CategoryTabs";
import { Sidebar } from "../components/Sidebar";
import { HeroBanner } from "../components/HeroBanner";
import { BreadcrumbBar } from "../components/BreadcrumbBar";
import { ProductGrid } from "../components/ProductGrid";
import { FAQSection } from "../components/FAQSection";
import { ReviewsSection } from "../components/ReviewsSection";
import { StatsSection } from "../components/StatsSection";
import { Footer } from "../components/Footer";
import { DatePickerModal } from "../components/DatePickerModal";
import { CartDrawer } from "../components/CartDrawer";
import { WaitlistModal } from "../components/WaitlistModal";
import { NotifyMeModal } from "../components/NotifyMeModal";
import { StickyDatePill } from "../components/StickyDatePill";
import { ChatWidget } from "../components/ChatWidget";
import { AuthModal } from "../components/AuthModal";
import { Product, CategoryId, ProductsResponse } from "../types/product";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Gaming");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [notifyProduct, setNotifyProduct] = useState<Product | null>(null);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  // Fetch products from local API
  const fetchProducts = useCallback(
    async (
      pageNum: number,
      category: CategoryId,
      query: string,
      sort: string,
      append: boolean = false
    ) => {
      try {
        if (append) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }

        const params = new URLSearchParams({
          page: String(pageNum),
          pageSize: "12",
          category: category,
          q: query,
          sort: sort,
        });

        const res = await fetch(`/api/products?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data: ProductsResponse = await res.json();

        if (append) {
          setProducts((prev) => [...prev, ...data.products.slice(prev.length)]);
        } else {
          setProducts(data.products);
        }

        setTotal(data.total);
        setHasMore(data.hasMore);
        setPage(pageNum);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    []
  );

  // Load products whenever filters change
  useEffect(() => {
    fetchProducts(1, activeCategory, searchQuery, sortBy, false);
  }, [activeCategory, searchQuery, sortBy, fetchProducts]);

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      fetchProducts(page + 1, activeCategory, searchQuery, sortBy, true);
    }
  };

  const handleResetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setSortBy("default");
  };

  const handleNotifyMe = (product: Product) => {
    setNotifyProduct(product);
    setIsNotifyOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      {/* Sticky Purple Header */}
      <Header />

      {/* Secondary Sticky Category Tabs */}
      <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Category Sidebar */}
          <Sidebar
            activeCategory={activeCategory}
            onSelectCategory={(id) => {
              setActiveCategory(id);
            }}
          />

          {/* Main Grid Column */}
          <div className="flex-1 min-w-0">
            {/* Hero Banner */}
            <HeroBanner />

            {/* Breadcrumb & Sort Bar */}
            <BreadcrumbBar
              totalItems={total}
              sortBy={sortBy}
              onSortChange={setSortBy}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Product Grid & In-Grid Banners */}
            <ProductGrid
              products={products}
              total={total}
              hasMore={hasMore}
              isLoading={isLoading}
              isLoadingMore={isLoadingMore}
              onLoadMore={handleLoadMore}
              onResetFilters={handleResetFilters}
              onNotifyClick={handleNotifyMe}
            />

            {/* FAQ Accordion Section */}
            <FAQSection />
          </div>
        </div>
      </main>

      {/* Reviews Section */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ReviewsSection />
      </div>

      {/* Stats Row */}
      <StatsSection />

      {/* Dark Navy Footer */}
      <Footer />

      {/* Floating UI Elements */}
      <StickyDatePill />
      <ChatWidget />

      {/* Modals and Drawers */}
      <DatePickerModal />
      <CartDrawer />
      <WaitlistModal />
      <AuthModal />
      <NotifyMeModal
        product={notifyProduct}
        isOpen={isNotifyOpen}
        onClose={() => {
          setIsNotifyOpen(false);
          setNotifyProduct(null);
        }}
      />
    </div>
  );
}
