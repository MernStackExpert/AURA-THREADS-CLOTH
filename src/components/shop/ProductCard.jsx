"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product }) {
  const { price, oldPrice, discountPercentage } = product.pricing || {};
  const isNew = product.status?.isNew;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="group flex flex-col relative">
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-foreground/5 mb-4">
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 z-0"
        >
          <Image
            src={product.media?.thumbnail || ""}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10 pointer-events-none">
          {isNew && (
            <span className="bg-white text-black text-[9px] font-bold tracking-[0.2em] px-2 py-1 uppercase shadow-sm">
              New
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-red-600 text-white text-[9px] font-bold tracking-[0.2em] px-2 py-1 uppercase shadow-sm">
              -{discountPercentage}%
            </span>
          )}
        </div>

        <div className="hidden md:block absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="hidden md:flex absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] z-20">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-white/95 backdrop-blur-sm text-black text-[11px] font-bold tracking-[0.2em] uppercase py-3.5 flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors duration-300"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
            Quick Add
          </button>
        </div>

        <button
          onClick={handleQuickAdd}
          className="md:hidden absolute bottom-3 right-3 w-9 h-9 bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm text-black hover:bg-black hover:text-white transition-colors z-20"
        >
          <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col gap-1.5 px-1">
        {product.brand && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-bold">
            {product.brand}
          </span>
        )}
        <Link href={`/product/${product.slug}`} className="w-fit">
          <h3 className="text-[13px] text-foreground font-light tracking-wide truncate transition-colors hover:text-foreground/60">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3 text-[12px] tracking-wider mt-1">
          <span className="text-foreground font-medium">৳ {price}</span>
          {oldPrice && oldPrice > price && (
            <span className="text-foreground/40 line-through">
              ৳ {oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
