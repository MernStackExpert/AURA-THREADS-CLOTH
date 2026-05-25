"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/store/useUIStore";
import { X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Modals({ settings, categories }) {
  const { isMenuOpen, isCartOpen, isCategoryOpen, isSearchOpen, closeAll } =
    useUIStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const hasOpenModal =
    isMenuOpen || isCartOpen || isCategoryOpen || isSearchOpen;

  return (
    <AnimatePresence>
      {hasOpenModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAll}
          className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
        />
      )}

      {isMenuOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          className="fixed top-0 left-0 bottom-0 z-[100] w-[85%] max-w-sm bg-background shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between p-6 md:p-8">
            <span className="font-bold text-xl tracking-[0.2em] uppercase">
              {settings?.branding?.siteName || "MENU"}
            </span>
            <button
              onClick={closeAll}
              aria-label="Close"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto px-6 md:px-8 py-4 flex flex-col gap-6">
            {["Home", "Shop", "About Us", "Contact"].map((item, idx) => {
              const paths = ["/", "/shop", "/about", "/contact"];
              return (
                <Link
                  key={idx}
                  href={paths[idx]}
                  onClick={closeAll}
                  className={`text-2xl font-light tracking-wider transition-all duration-300 ${pathname === paths[idx] ? "text-foreground translate-x-2" : "text-foreground/60 hover:text-foreground hover:translate-x-2"}`}
                >
                  {item}
                </Link>
              );
            })}

            <div className="mt-8 mb-4">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/40">
                Categories
              </span>
            </div>
            {categories?.map((cat, index) => (
              <Link
                key={cat._id || cat.slug || index}
                href={`/category/${cat.slug}`}
                onClick={closeAll}
                className={`text-lg font-light tracking-wide transition-all duration-300 ${pathname === `/category/${cat.slug}` ? "text-foreground translate-x-2" : "text-foreground/60 hover:text-foreground hover:translate-x-2"}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {isCartOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          className="fixed top-0 right-0 bottom-0 z-[100] w-full sm:w-[450px] bg-background shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between p-6 md:p-10">
            <span className="font-bold text-lg tracking-[0.2em] uppercase">
              Cart
            </span>
            <button
              onClick={closeAll}
              aria-label="Close"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center p-10 text-center gap-6">
            <p className="text-foreground/50 font-light text-2xl tracking-wide">
              Your cart is empty.
            </p>
            <Link
              href="/shop"
              onClick={closeAll}
              className="group flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
            >
              Continue Shopping{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      )}

      {isCategoryOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-background shadow-2xl max-h-[85vh] flex flex-col"
        >
          <div className="flex items-center justify-between p-6 md:p-10">
            <span className="font-bold text-lg tracking-[0.2em] uppercase">
              Shop Collection
            </span>
            <button
              onClick={closeAll}
              aria-label="Close"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>
          </div>
          <div className="overflow-y-auto p-6 md:p-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {categories?.map((cat, index) => (
              <Link
                key={cat._id || cat.slug || index}
                href={`/category/${cat.slug}`}
                onClick={closeAll}
                className="group block"
              >
                <span className="text-xl font-light tracking-wider text-foreground/70 group-hover:text-foreground transition-colors">
                  {cat.name}
                </span>
                <div className="h-[1px] w-0 bg-foreground mt-2 transition-all duration-500 ease-out group-hover:w-12"></div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-background shadow-xl p-6 md:p-10"
        >
          <div className="flex items-center gap-4 max-w-4xl mx-auto relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent border-b border-foreground/20 px-4 py-4 text-2xl font-light tracking-wide focus:outline-none focus:border-foreground transition-colors"
              autoFocus
            />
            <button
              onClick={closeAll}
              className="absolute right-0 p-2 text-foreground/60 hover:text-foreground transition-colors"
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
