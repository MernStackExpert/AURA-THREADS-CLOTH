"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function PromotionalBottomBanner({ banners }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide logic
  useEffect(() => {
    if (!banners || banners.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 seconds for a slower, more luxurious feel

    return () => clearInterval(timer);
  }, [banners, isHovered]);

  const handleNext = () => {
    if (!banners || banners.length <= 1) return;
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    if (!banners || banners.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  if (!banners || banners.length === 0) return null;

  return (
    <section className="w-full py-10 md:py-24 bg-background">
      {/* Desktop: my-container (Max-width), Mobile: Full width */}
      <div className="w-full md:my-container mx-auto">
        <div
          className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden group md:border md:border-border/20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Ken Burns Effect (Slow Zoom In) */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: 7, ease: "linear" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={banners[currentIndex].image}
                  alt={banners[currentIndex].title || "Promotional Banner"}
                  fill
                  priority
                  className="object-cover object-center"
                  quality={100}
                />
                {/* Dual Gradient for perfect text readability and mood */}
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
              </motion.div>

              {/* Luxury Inner Frame (Only visible on md and up) */}
              <div className="hidden md:block absolute inset-6 lg:inset-8 border border-white/20 pointer-events-none z-10"></div>

              {/* Content Container */}
              <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 text-center z-20">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.4,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="max-w-3xl flex flex-col items-center"
                >
                  <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] text-white/80 mb-4 md:mb-6">
                    Aura Threads Exclusive
                  </span>

                  {banners[currentIndex].title && (
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-light uppercase tracking-[0.1em] leading-[1.1] mb-8 text-white drop-shadow-2xl">
                      {banners[currentIndex].title}
                    </h2>
                  )}

                  {banners[currentIndex].link && (
                    <Link
                      href={banners[currentIndex].link}
                      className="relative overflow-hidden inline-flex items-center justify-center gap-4 bg-transparent border border-white text-white px-10 py-4 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 group/btn"
                    >
                      <span>
                        {banners[currentIndex].buttonText ||
                          "Discover Collection"}
                      </span>
                      <ArrowRight
                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                        strokeWidth={1.5}
                      />
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Luxury Navigation Arrows */}
          {banners.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-white hover:text-black text-white border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 cursor-pointer hidden md:flex"
                aria-label="Previous Banner"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-white hover:text-black text-white border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 cursor-pointer hidden md:flex"
                aria-label="Next Banner"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>

              {/* Minimalist Pagination Indicators */}
              <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-500 ${
                      index === currentIndex
                        ? "w-8 h-[2px] bg-white"
                        : "w-4 h-[2px] bg-white/40 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
