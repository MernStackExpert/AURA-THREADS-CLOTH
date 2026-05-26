"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function TopCategories({ categories = [] }) {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress || 0);
    }
  };

  useEffect(() => {
    if (categories.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const firstChild = scrollRef.current.children[0];
        const itemWidth = firstChild ? firstChild.clientWidth + 24 : 300;

        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [categories, isPaused]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.children[0];
      const itemWidth = firstChild ? firstChild.clientWidth + 24 : 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -itemWidth : itemWidth,
        behavior: "smooth",
      });
    }
  };

  if (!categories || categories.length === 0) return null;

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="my-container">
        <div className="mb-8 md:mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.15em] text-foreground">
              Top Collections
            </h2>
            <div className="w-12 h-[1px] bg-foreground mt-4"></div>
          </div>
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 border border-border/40 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground transition-all duration-300 cursor-pointer"
              aria-label="Previous category"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 border border-border/40 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground transition-all duration-300 cursor-pointer"
              aria-label="Next category"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
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
            onScroll={handleScroll}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4"
          >
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/category/${category.slug}`}
                className="group relative flex-shrink-0 w-[80vw] sm:w-[45vw] md:w-[320px] lg:w-[380px] xl:w-[420px] aspect-[4/5] overflow-hidden snap-start cursor-pointer bg-foreground/5"
              >
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover object-center transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-105"
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 420px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-foreground/20 text-sm tracking-widest uppercase">
                    No Image
                  </div>
                )}

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-white text-xl md:text-2xl font-light uppercase tracking-[0.2em] scale-95 group-hover:scale-100 transition-transform duration-700 ease-out">
                    {category.name}
                  </span>
                  <div className="h-[1px] w-0 bg-white mt-4 transition-all duration-700 ease-out group-hover:w-12"></div>
                </div>
              </Link>
            ))}
          </div>

          {categories.length > 1 && (
            <div className="mt-8 md:mt-12">
              <div className="w-full max-w-[200px] md:max-w-md mx-auto h-[1px] bg-border/40 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-foreground transition-all duration-150 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
