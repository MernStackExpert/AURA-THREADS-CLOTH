"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/store/useUIStore";
import { X, ChevronRight, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Modals({ settings, categories }) {
  const { isMenuOpen, isCartOpen, isCategoryOpen, isSearchOpen, closeAll } =
    useUIStore();
  const [mounted, setMounted] = useState(false);

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
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        />
      )}

      {isMenuOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed top-0 left-0 bottom-0 z-[70] w-3/4 max-w-sm bg-background shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="font-extrabold text-xl uppercase tracking-widest">
              {settings?.branding?.siteName || "Menu"}
            </span>
            <button
              onClick={closeAll}
              aria-label="Close"
              className="p-2 hover:bg-secondary/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto py-4">
            <Link
              href="/"
              onClick={closeAll}
              className="block px-6 py-4 text-lg font-medium hover:bg-secondary/5 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={closeAll}
              className="block px-6 py-4 text-lg font-medium hover:bg-secondary/5 transition-colors"
            >
              Shop All
            </Link>
            {categories?.map((cat) => (
              <Link
                key={cat._id}
                href={`/category/${cat.slug}`}
                onClick={closeAll}
                className="flex items-center justify-between px-6 py-4 text-lg font-medium hover:bg-secondary/5 transition-colors"
              >
                {cat.name}
                <ChevronRight className="w-5 h-5 text-secondary" />
              </Link>
            ))}
          </div>
          {settings?.contact?.phone && (
            <div className="p-6 border-t border-border bg-secondary/5">
              <a
                href={`tel:${settings.contact.phone}`}
                className="flex items-center gap-3 text-sm font-semibold hover:text-accent transition-colors"
              >
                <Phone className="w-5 h-5" />
                {settings.contact.phone}
              </a>
            </div>
          )}
        </motion.div>
      )}

      {isCartOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[400px] bg-background shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="font-bold text-xl uppercase tracking-widest">
              Your Cart
            </span>
            <button
              onClick={closeAll}
              aria-label="Close"
              className="p-2 hover:bg-secondary/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-grow flex items-center justify-center p-6 text-center">
            <p className="text-secondary/60 text-lg">
              Your cart is currently empty.
            </p>
          </div>
        </motion.div>
      )}

      {isCategoryOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed top-0 left-0 right-0 z-[70] bg-background shadow-2xl max-h-[80vh] flex flex-col rounded-b-3xl"
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="font-bold text-xl uppercase tracking-widest">
              Categories
            </span>
            <button
              onClick={closeAll}
              aria-label="Close"
              className="p-2 hover:bg-secondary/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="overflow-y-auto p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories?.map((cat) => (
              <Link
                key={cat._id}
                href={`/category/${cat.slug}`}
                onClick={closeAll}
                className="flex flex-col items-center justify-center p-6 border border-border rounded-2xl hover:border-accent hover:text-accent transition-all group"
              >
                <span className="font-semibold text-center group-hover:scale-105 transition-transform">
                  {cat.name}
                </span>
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
          className="fixed top-0 left-0 right-0 z-[70] bg-background shadow-xl p-6 border-b border-border"
        >
          <div className="flex items-center gap-4 max-w-4xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for premium products..."
              className="w-full bg-secondary/5 border-2 border-border rounded-full px-8 py-4 text-lg focus:outline-none focus:border-accent transition-colors"
              autoFocus
            />
            <button
              onClick={closeAll}
              className="absolute right-6"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-foreground/60 hover:text-foreground transition-colors" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
