"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function CustomerReviews({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials]);

  const handleNext = () => {
    if (!testimonials || testimonials.length <= 1) return;
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrev = () => {
    if (!testimonials || testimonials.length <= 1) return;
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="my-container">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-16">
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-3">
            The Aura Experience
          </span>
          <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.15em] text-foreground">
            Client Testimonials
          </h2>
          <div className="w-12 h-[1px] bg-foreground mt-6"></div>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative bg-foreground/[0.02] border border-border/30 p-8 md:p-12 lg:p-16 overflow-hidden min-h-[350px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col items-center text-center"
              >
                {/* Small Elegant Quote Icon */}
                <Quote className="w-8 h-8 md:w-10 md:h-10 text-foreground/20 mb-6" />

                {/* Ratings */}
                <div className="flex items-center gap-1.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        i < (testimonials[currentIndex].rating || 5)
                          ? "fill-foreground text-foreground"
                          : "fill-transparent text-foreground/20"
                      }`}
                      strokeWidth={1}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-base md:text-xl font-light text-foreground/90 leading-relaxed md:leading-loose mb-10 max-w-3xl italic">
                  &quot;{testimonials[currentIndex].reviewText}&quot;
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-4 mt-auto">
                  {testimonials[currentIndex].image && (
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-border/40 shrink-0">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].customerName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="text-left flex flex-col justify-center">
                    <h4 className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-foreground">
                      {testimonials[currentIndex].customerName}
                    </h4>
                    {testimonials[currentIndex].designation && (
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-foreground/50 mt-1">
                        {testimonials[currentIndex].designation}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls (Below the card for safety and clean look) */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-between mt-8">
              {/* Pagination Lines */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 h-[2px] ${
                      index === currentIndex
                        ? "w-8 bg-foreground"
                        : "w-4 bg-foreground/20 hover:bg-foreground/50"
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next/Prev Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 flex items-center justify-center border border-border/40 hover:bg-foreground hover:text-background transition-colors cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 flex items-center justify-center border border-border/40 hover:bg-foreground hover:text-background transition-colors cursor-pointer"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
