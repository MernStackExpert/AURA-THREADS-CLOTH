"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import ProductCard from "./ProductCard";

const SliderLayout = ({ products }) => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (products.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const firstChild = scrollRef.current.children[0];
        const gap = window.innerWidth >= 768 ? 24 : 16;
        const itemWidth = firstChild ? firstChild.clientWidth + gap : 300;

        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [products, isPaused]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.children[0];
      const gap = window.innerWidth >= 768 ? 24 : 16;
      const itemWidth = firstChild ? firstChild.clientWidth + gap : 300;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -itemWidth : itemWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group/slider w-full">
      <div className="hidden md:flex absolute -top-20 right-0 gap-3 z-10">
        <button
          onClick={() => scroll("left")}
          className="w-10 h-10 border border-border/40 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-10 h-10 border border-border/40 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground transition-all duration-300 cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      <div
        className="w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 pt-2"
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function DynamicProductSections({ sections = [] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24 py-16 md:py-24 bg-background overflow-hidden">
      {sections.map((section) => {
        const isSlider = section.layout === "slider";

        return (
          <section key={section._id} className="w-full relative">
            <div className="my-container">
              <div className="flex items-end justify-between mb-8 md:mb-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.15em] text-foreground">
                    {section.title.replace(
                      /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
                      "",
                    )}
                  </h2>
                  <div className="w-12 h-[1px] bg-foreground mt-4"></div>
                </div>

                <Link
                  href={`/collections/${section._id}`}
                  className={`group hidden ${isSlider ? "lg:hidden" : "md:flex"} items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors`}
                >
                  View Collection
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>

              {isSlider ? (
                <SliderLayout products={section.products} />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-6 md:gap-y-14">
                  {section.products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}

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
        );
      })}
    </div>
  );
}
