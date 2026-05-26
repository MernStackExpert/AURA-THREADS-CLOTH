"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Search as SearchIcon, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/services/productService";
import ProductCard from "../shop/ProductCard";

export default function SearchModal({ closeAll, customEase }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const data = await searchProducts(debouncedQuery, 4);
        setResults(data || []);
      } catch (error) {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [debouncedQuery]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      closeAll();
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleViewAll = () => {
    closeAll();
    router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <motion.div
      key="search-modal"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: customEase }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col items-center pt-24 md:pt-32 pb-10 overflow-y-auto cursor-default"
    >
      <button
        onClick={closeAll}
        className="absolute top-8 right-8 text-foreground/50 hover:text-foreground transition-colors p-4 cursor-pointer z-10"
      >
        <X className="w-8 h-8" strokeWidth={1} />
      </button>

      <div className="w-full max-w-5xl px-6 md:px-8 flex flex-col gap-12">
        <div className="flex flex-col gap-4 relative w-full max-w-3xl mx-auto">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/40 pl-2">
            What are you looking for?
          </span>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="w-full bg-transparent border-b border-foreground/20 px-2 py-4 text-3xl md:text-5xl font-light tracking-wide focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/20"
              autoFocus
            />
            {isLoading ? (
              <Loader2
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-foreground/40 animate-spin"
                strokeWidth={1.5}
              />
            ) : (
              <SearchIcon
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-foreground/40"
                strokeWidth={1.5}
              />
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-full mt-8 flex flex-col gap-6"
        >
          <div className="flex items-end justify-between">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground">
              {query.trim() ? `Results for "${query}"` : "Trending Now"}
            </span>
            {query.trim() && results.length > 0 && (
              <button
                onClick={handleViewAll}
                className="group flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
              >
                View All Results
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </button>
            )}
          </div>

          {!isLoading && results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
              {results.map((product) => (
                <div key={product._id} onClick={closeAll}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : !isLoading && results.length === 0 ? (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center gap-4">
              <span className="text-4xl opacity-20">🔍</span>
              <p className="text-foreground font-medium text-lg tracking-wide">
                No results found
              </p>
              <p className="text-foreground/50 font-light text-sm">
                We couldn't find anything matching "{query}". Try different
                keywords.
              </p>
            </div>
          ) : null}
        </motion.div>
      </div>
    </motion.div>
  );
}
