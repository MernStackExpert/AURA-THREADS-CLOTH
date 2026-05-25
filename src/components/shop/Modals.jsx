"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/store/useUIStore";
import { X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";

export default function Modals({ settings, categories }) {
  const { isMenuOpen, isCartOpen, isCategoryOpen, isSearchOpen, closeAll } =
    useUIStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const hasOpenModal =
    isMenuOpen || isCartOpen || isCategoryOpen || isSearchOpen;
  const siteName = settings?.branding?.siteName || "AURA THREADS";
  const social = settings?.socialMedia || {};

  const customEase = [0.22, 1, 0.36, 1];

  return (
    <AnimatePresence>
      {/* Background Overlay */}
      {hasOpenModal && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={closeAll}
          className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm cursor-pointer"
        />
      )}

      {/* Side Menu */}
      {isMenuOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.5, ease: customEase }}
          className="fixed top-0 left-0 bottom-0 z-[100] w-[85%] max-w-sm bg-background shadow-2xl flex flex-col border-r border-border/20 cursor-default"
        >
          <div className="flex items-center justify-between p-8">
            <span className="font-medium text-[13px] tracking-[0.2em] uppercase text-foreground">
              {siteName}
            </span>
            <button
              onClick={closeAll}
              aria-label="Close"
              className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer p-2 -mr-2"
            >
              <X className="w-6 h-6" strokeWidth={1.25} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto px-8 py-4 flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              {["Home", "Shop", "About", "Contact"].map((item, idx) => {
                const paths = ["/", "/shop", "/about", "/contact"];
                const isActive = pathname === paths[idx];
                return (
                  <Link
                    key={idx}
                    href={paths[idx]}
                    onClick={closeAll}
                    className={`text-[22px] font-light tracking-wide transition-all duration-300 w-fit cursor-pointer ${
                      isActive
                        ? "text-foreground translate-x-2"
                        : "text-foreground/60 hover:text-foreground hover:translate-x-2"
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 mb-2">
              <div className="h-[1px] w-10 bg-foreground/20 mb-6"></div>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/40 block mb-5">
                Collections
              </span>
              <div className="flex flex-col gap-4">
                {categories?.map((cat) => {
                  const isActive = pathname === `/category/${cat.slug}`;
                  return (
                    <Link
                      key={cat._id || cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={closeAll}
                      className={`text-[15px] font-light tracking-wider transition-all duration-300 w-fit cursor-pointer ${
                        isActive
                          ? "text-foreground translate-x-2"
                          : "text-foreground/60 hover:text-foreground hover:translate-x-2"
                      }`}
                    >
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-8 mt-auto border-t border-border/20">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/40 block mb-4">
              Follow Us
            </span>
            <div className="flex items-center gap-5">
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                >
                  <FaFacebookF className="w-[18px] h-[18px]" />
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                >
                  <FaInstagram className="w-[19px] h-[19px]" />
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                >
                  <FaTwitter className="w-[19px] h-[19px]" />
                </a>
              )}
              {social.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                >
                  <FaYoutube className="w-[20px] h-[20px]" />
                </a>
              )}
              {social.tiktok && (
                <a
                  href={social.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                >
                  <FaTiktok className="w-[18px] h-[18px]" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <motion.div
          key="cart-modal"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: customEase }}
          className="fixed top-0 right-0 bottom-0 z-[100] w-full sm:w-[450px] bg-background shadow-2xl flex flex-col cursor-default"
        >
          <div className="flex items-center justify-between p-8 border-b border-border/20">
            <span className="font-medium text-[13px] tracking-[0.2em] uppercase text-foreground">
              Shopping Bag <span className="text-foreground/50 ml-1">(0)</span>
            </span>
            <button
              onClick={closeAll}
              aria-label="Close"
              className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer p-2 -mr-2"
            >
              <X className="w-6 h-6" strokeWidth={1.25} />
            </button>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center p-10 text-center gap-8">
            <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mb-2">
              <span className="text-2xl opacity-50">🛍️</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-foreground font-medium text-lg tracking-wide">
                Your bag is empty
              </p>
              <p className="text-foreground/50 font-light text-sm">
                Looks like you haven't added anything yet.
              </p>
            </div>
            <Link
              href="/shop"
              onClick={closeAll}
              className="group flex items-center justify-center w-full max-w-[250px] bg-foreground text-background py-4 px-6 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors cursor-pointer"
            >
              Start Shopping
              <ArrowRight
                className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform duration-300"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Category Modal (Mobile view equivalent) */}
      {isCategoryOpen && (
        <motion.div
          key="category-modal"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: customEase }}
          className="fixed top-0 left-0 right-0 z-[100] bg-background shadow-2xl max-h-[85vh] flex flex-col cursor-default border-b border-border/20"
        >
          <div className="container mx-auto px-4 md:px-8 flex items-center justify-between py-8">
            <span className="font-medium text-[13px] tracking-[0.2em] uppercase text-foreground">
              Collections
            </span>
            <button
              onClick={closeAll}
              aria-label="Close"
              className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer p-2 -mr-2"
            >
              <X className="w-6 h-6" strokeWidth={1.25} />
            </button>
          </div>
          <div className="container mx-auto px-4 md:px-8 pb-12 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
              {categories?.map((cat) => (
                <Link
                  key={cat._id || cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={closeAll}
                  className="group block cursor-pointer w-fit"
                >
                  <span className="text-lg md:text-xl font-light tracking-wide text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                    {cat.name}
                  </span>
                  <div className="h-[1px] w-0 bg-foreground mt-2 transition-all duration-500 ease-out group-hover:w-12"></div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <motion.div
          key="search-modal"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: customEase }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center cursor-default"
        >
          <button
            onClick={closeAll}
            className="absolute top-8 right-8 text-foreground/50 hover:text-foreground transition-colors p-4 cursor-pointer"
          >
            <X className="w-8 h-8" strokeWidth={1} />
          </button>
          <div className="w-full max-w-3xl px-8 flex flex-col gap-4">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/40 pl-2">
              What are you looking for?
            </span>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent border-b border-foreground/20 px-2 py-4 text-3xl md:text-5xl font-light tracking-wide focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/20"
              autoFocus
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
