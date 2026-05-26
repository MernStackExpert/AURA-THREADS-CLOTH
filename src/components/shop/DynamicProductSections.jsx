"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function DynamicProductSections({ sections = [] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24 py-16 md:py-24 bg-background">
      {sections.map((section) => (
        <section key={section._id} className="w-full">
          <div className="my-container">
            <div className="flex items-end justify-between mb-8 md:mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.15em] text-foreground">
                  {section.title.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")}
                </h2>
                <div className="w-12 h-[1px] bg-foreground mt-4"></div>
              </div>
              <Link
                href={`/collections/${section._id}`}
                className="group hidden md:flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors"
              >
                View Collection
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-6 md:gap-y-14">
              {section.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <div className="mt-10 flex justify-center md:hidden">
              <Link
                href={`/collections/${section._id}`}
                className="inline-flex items-center justify-center px-8 py-3 border border-foreground/20 text-[10px] font-bold tracking-[0.2em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
              >
                View Collection
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
