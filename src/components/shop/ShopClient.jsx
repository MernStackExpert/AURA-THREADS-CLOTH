"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  X,
  ChevronDown,
  Search as SearchIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ProductCard from "./ProductCard";

export default function ShopClient({ initialProducts, meta, categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sortBy") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");
  const totalPages = meta.totalPages || 1;

  const updateFilters = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(updates).forEach((key) => {
      if (updates[key]) {
        params.set(key, updates[key]);
      } else {
        params.delete(key);
      }
    });
    if (!updates.page) params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilters({ search: searchInput });
  };

  const handlePriceFilter = (e) => {
    e.preventDefault();
    updateFilters({ minPrice, maxPrice });
  };

  const clearAllFilters = () => {
    setSearchInput("");
    setMinPrice("");
    setMaxPrice("");
    router.push(pathname);
    setIsFilterOpen(false);
  };

  const customEase = [0.22, 1, 0.36, 1];

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-16">
        <div>
          <h1 className="text-3xl md:text-4xl font-light uppercase tracking-[0.15em] text-foreground">
            {searchParams.get("search")
              ? `Results for "${searchParams.get("search")}"`
              : "Our Collection"}
          </h1>
          <div className="w-12 h-[1px] bg-foreground mt-4 mb-3"></div>
          <p className="text-[12px] text-foreground/60 tracking-wider">
            Showing {initialProducts.length} of {meta.totalProducts || 0}{" "}
            products
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between md:justify-end gap-4 w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative w-full md:w-64">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent border border-border/40 text-[11px] font-medium tracking-[0.1em] text-foreground px-4 py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/40"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors cursor-pointer"
            >
              <SearchIcon className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </form>

          <div className="flex w-full md:w-auto gap-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden flex-1 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground border border-border/40 px-5 py-3 hover:bg-foreground/5 transition-colors"
            >
              <Filter className="w-4 h-4" strokeWidth={1.5} />
              Filters
            </button>

            <div className="relative group flex-1 md:flex-none">
              <select
                value={currentSort}
                onChange={(e) => updateFilters({ sortBy: e.target.value })}
                className="w-full md:w-auto appearance-none bg-transparent border border-border/40 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground px-5 py-3 pr-10 focus:outline-none focus:border-foreground transition-colors cursor-pointer rounded-none"
              >
                <option value="">Newest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="totalSold">Best Selling</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground pointer-events-none"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-10 lg:gap-16">
        <div className="hidden md:flex flex-col w-64 flex-shrink-0 sticky top-28 max-h-[calc(100vh-120px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8">
          <div className="flex items-center justify-between mb-8">
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground">
              Categories
            </span>
            {(currentCategory ||
              searchParams.get("search") ||
              minPrice ||
              maxPrice) && (
              <button
                onClick={clearAllFilters}
                className="text-[10px] uppercase tracking-[0.1em] text-foreground/50 hover:text-foreground underline underline-offset-4 transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-col gap-4 mb-10">
            <button
              onClick={() => updateFilters({ category: "" })}
              className={`text-left text-[13px] font-light tracking-wide transition-colors ${
                !currentCategory
                  ? "text-foreground font-medium"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => updateFilters({ category: cat.slug })}
                className={`text-left text-[13px] font-light tracking-wide transition-colors ${
                  currentCategory === cat.slug
                    ? "text-foreground font-medium"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground mb-6 block">
            Price Range
          </span>
          <form onSubmit={handlePriceFilter} className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min ৳"
                className="w-full bg-transparent border border-border/40 text-[12px] text-foreground px-3 py-2 focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/40"
              />
              <span className="text-foreground/40">-</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max ৳"
                className="w-full bg-transparent border border-border/40 text-[12px] text-foreground px-3 py-2 focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/40"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-foreground text-background py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors cursor-pointer"
            >
              Apply
            </button>
          </form>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm md:hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.5, ease: customEase }}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-0 left-0 bottom-0 w-[85%] max-w-sm bg-background flex flex-col shadow-2xl h-[100dvh]"
              >
                <div className="flex items-center justify-between p-6 border-b border-border/20">
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground">
                    Filters
                  </span>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-foreground/60 hover:text-foreground p-2 -mr-2 cursor-pointer"
                  >
                    <X className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto p-6 pb-20">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/40 block mb-5">
                    Categories
                  </span>
                  <div className="flex flex-col gap-5 mb-10">
                    <button
                      onClick={() => {
                        updateFilters({ category: "" });
                        setIsFilterOpen(false);
                      }}
                      className={`text-left text-[15px] font-light tracking-wider ${
                        !currentCategory
                          ? "text-foreground"
                          : "text-foreground/60"
                      }`}
                    >
                      All Products
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat._id}
                        onClick={() => {
                          updateFilters({ category: cat.slug });
                          setIsFilterOpen(false);
                        }}
                        className={`text-left text-[15px] font-light tracking-wider ${
                          currentCategory === cat.slug
                            ? "text-foreground"
                            : "text-foreground/60"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/40 block mb-5">
                    Price Range
                  </span>
                  <form
                    onSubmit={(e) => {
                      handlePriceFilter(e);
                      setIsFilterOpen(false);
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min ৳"
                        className="w-full bg-transparent border border-border/40 text-[12px] text-foreground px-3 py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/40"
                      />
                      <span className="text-foreground/40">-</span>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max ৳"
                        className="w-full bg-transparent border border-border/40 text-[12px] text-foreground px-3 py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/40"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-foreground text-background py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors cursor-pointer"
                    >
                      Apply Price
                    </button>
                  </form>
                </div>

                <div className="mt-auto p-6 border-t border-border/20 bg-background">
                  <button
                    onClick={clearAllFilters}
                    className="w-full bg-transparent border border-foreground text-foreground py-4 text-[11px] font-bold uppercase tracking-[0.2em] cursor-pointer hover:bg-foreground hover:text-background transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-grow flex flex-col">
          {initialProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-6 md:gap-y-14">
                {initialProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-20 pt-10 border-t border-border/20">
                  <button
                    onClick={() => updateFilters({ page: currentPage - 1 })}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 flex items-center justify-center border border-border/40 transition-colors ${
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed text-foreground/40"
                        : "hover:border-foreground hover:text-foreground cursor-pointer text-foreground/70"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => updateFilters({ page: i + 1 })}
                        className={`w-10 h-10 flex items-center justify-center text-[12px] font-medium transition-colors cursor-pointer ${
                          currentPage === i + 1
                            ? "bg-foreground text-background"
                            : "hover:bg-foreground/5 text-foreground/70"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => updateFilters({ page: currentPage + 1 })}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 flex items-center justify-center border border-border/40 transition-colors ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed text-foreground/40"
                        : "hover:border-foreground hover:text-foreground cursor-pointer text-foreground/70"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center gap-4 border border-border/20">
              <span className="text-4xl opacity-20">🛍️</span>
              <p className="text-foreground font-medium text-lg tracking-wide">
                No products found
              </p>
              <p className="text-foreground/50 font-light text-sm max-w-sm">
                We couldn't find any products matching your current filters. Try
                removing some filters to see more results.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 border border-foreground px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
