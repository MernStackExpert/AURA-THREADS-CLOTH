"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

export default function CategoryModal({ closeAll, categories, customEase }) {
  return (
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
  );
}
