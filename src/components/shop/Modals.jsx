"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/store/useUIStore";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Modals() {
  const { isMenuOpen, isCartOpen, isCategoryOpen, isSearchOpen, closeAll } =
    useUIStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          className="fixed top-0 left-0 bottom-0 z-[70] w-3/4 max-w-sm bg-background shadow-2xl overflow-y-auto"
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-bold text-lg">Menu</span>
            <button
              onClick={closeAll}
              aria-label="Close Menu"
              className="p-1 hover:bg-secondary/10 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      )}

      {isCartOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[400px] bg-background shadow-2xl overflow-y-auto"
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-bold text-lg">Shopping Cart</span>
            <button
              onClick={closeAll}
              aria-label="Close Cart"
              className="p-1 hover:bg-secondary/10 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      )}

      {isCategoryOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed top-0 left-0 right-0 z-[70] bg-background shadow-2xl max-h-[80vh] overflow-y-auto rounded-b-2xl"
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-bold text-lg">Categories</span>
            <button
              onClick={closeAll}
              aria-label="Close Categories"
              className="p-1 hover:bg-secondary/10 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      )}

      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-[70] bg-background shadow-md p-4"
        >
          <div className="flex items-center gap-4 max-w-3xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full bg-secondary/10 border border-border rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            <button
              onClick={closeAll}
              className="absolute right-4"
              aria-label="Close Search"
            >
              <X className="w-5 h-5 text-foreground/60 hover:text-foreground" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
