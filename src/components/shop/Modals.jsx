"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/store/useUIStore";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MenuModal from "@/components/modals/MenuModal";
import CartModal from "@/components/modals/CartModal";
import CategoryModal from "@/components/modals/CategoryModal";
import SearchModal from "@/components/modals/SearchModal";

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

      {isMenuOpen && (
        <MenuModal
          closeAll={closeAll}
          pathname={pathname}
          siteName={siteName}
          categories={categories}
          social={social}
          customEase={customEase}
        />
      )}

      {isCartOpen && <CartModal closeAll={closeAll} customEase={customEase} />}

      {isCategoryOpen && (
        <CategoryModal
          closeAll={closeAll}
          categories={categories}
          customEase={customEase}
        />
      )}

      {isSearchOpen && (
        <SearchModal closeAll={closeAll} customEase={customEase} />
      )}
    </AnimatePresence>
  );
}
