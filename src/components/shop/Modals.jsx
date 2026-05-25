"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/store/useUIStore";
import { X, ChevronRight, Phone } from "lucide-react";
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
          className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
        />
      )}

      {isMenuOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed top-0 left-0 bottom-0 z-[100] w-[85%] max-w-sm bg-background shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-border bg-card">
            <span className="font-extrabold text-xl uppercase tracking-widest">
              {settings?.branding?.siteName || "Menu"}
            </span>
            <button
              onClick={closeAll}
              aria-label="Close"
              className="p-2 hover:bg-secondary/10 rounded-full transition-colors text-foreground"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto py-6">
            <Link
              href="/"
              onClick={closeAll}
              className={`block px-6 py-4 text-lg font-bold tracking-wider uppercase transition-colors ${pathname === "/" ? "text-accent bg-accent/5" : "text-foreground hover:bg-secondary/5"}`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={closeAll}
              className={`block px-6 py-4 text-lg font-bold tracking-wider uppercase transition-colors ${pathname === "/shop" ? "text-accent bg-accent/5" : "text-foreground hover:bg-secondary/5"}`}
            >
              Shop All
            </Link>
            <Link
              href="/about"
              onClick={closeAll}
              className={`block px-6 py-4 text-lg font-bold tracking-wider uppercase transition-colors ${pathname === "/about" ? "text-accent bg-accent/5" : "text-foreground hover:bg-secondary/5"}`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={closeAll}
              className={`block px-6 py-4 text-lg font-bold tracking-wider uppercase transition-colors ${pathname === "/contact" ? "text-accent bg-accent/5" : "text-foreground hover:bg-secondary/5"}`}
            >
              Contact
            </Link>

            <div className="px-6 py-4 mt-4 text-sm font-bold text-secondary uppercase tracking-widest border-b border-border">
              Categories
            </div>
            {categories?.map((cat, index) => (
              <Link
                key={cat._id || cat.slug || index}
                href={`/category/${cat.slug}`}
                onClick={closeAll}
                className={`flex items-center justify-between px-6 py-4 text-md font-bold uppercase tracking-wider transition-colors ${pathname === `/category/${cat.slug}` ? "text-accent bg-accent/5" : "text-foreground/80 hover:bg-secondary/5 hover:text-foreground"}`}
              >
                {cat.name}
                <ChevronRight className="w-5 h-5 text-secondary/50" />
              </Link>
            ))}
          </div>
          {settings?.contact?.phone && (
            <div className="p-6 border-t border-border bg-card">
              <a
                href={`tel:${settings.contact.phone}`}
                className="flex items-center gap-3 text-sm font-bold hover:text-accent transition-colors"
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
          className="fixed top-0 right-0 bottom-0 z-[100] w-full sm:w-[450px] bg-background shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-border bg-card">
            <span className="font-extrabold text-xl uppercase tracking-widest">
              Your Cart
            </span>
            <button
              onClick={closeAll}
              aria-label="Close"
              className="p-2 hover:bg-secondary/10 rounded-full transition-colors text-foreground"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center gap-4">
            <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <ShoppingCart className="w-10 h-10 text-secondary" />
            </div>
            <p className="text-foreground font-bold text-xl uppercase tracking-widest">
              Cart is Empty
            </p>
            <p className="text-secondary text-sm">
              Looks like you haven't added anything yet.
            </p>
            <Link
              href="/shop"
              onClick={closeAll}
              className="mt-4 px-8 py-3 bg-foreground text-background font-bold uppercase tracking-widest hover:bg-accent transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </motion.div>
      )}

      {isCategoryOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-background shadow-2xl max-h-[85vh] flex flex-col rounded-b-[2rem]"
        >
          <div className="flex items-center justify-between p-6 border-b border-border bg-card">
            <span className="font-extrabold text-xl uppercase tracking-widest">
              Shop By Category
            </span>
            <button
              onClick={closeAll}
              aria-label="Close"
              className="p-2 hover:bg-secondary/10 rounded-full transition-colors text-foreground"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="overflow-y-auto p-8 grid grid-cols-2 md:grid-cols-4 gap-6 bg-background">
            {categories?.map((cat, index) => (
              <Link
                key={cat._id || cat.slug || index}
                href={`/category/${cat.slug}`}
                onClick={closeAll}
                className="flex flex-col items-center justify-center p-8 border border-border rounded-2xl hover:border-accent hover:shadow-lg bg-card transition-all duration-300 group"
              >
                <span className="font-bold text-sm tracking-widest uppercase text-center group-hover:scale-110 group-hover:text-accent transition-all duration-300">
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
          className="fixed top-0 left-0 right-0 z-[100] bg-background shadow-2xl p-8 border-b border-border"
        >
          <div className="flex items-center gap-4 max-w-4xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for premium products..."
              className="w-full bg-card border-2 border-border rounded-none px-8 py-5 text-lg font-bold tracking-widest focus:outline-none focus:border-accent transition-colors uppercase placeholder:normal-case placeholder:font-normal"
              autoFocus
            />
            <button
              onClick={closeAll}
              className="absolute right-6 p-2 hover:bg-secondary/10 rounded-full transition-colors text-foreground"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
