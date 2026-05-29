"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function CustomerReviews({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <section className="w-full py-20 md:py-32 bg-foreground/[0.02] overflow-hidden">
      <div className="my-container relative">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] text-foreground/50 mb-4">
            Aura Experience
          </span>
          <h2 className="text-2xl md:text-4xl font-light uppercase tracking-[0.15em] text-foreground">
            Words From Our Clients
          </h2>
          <div className="w-12 h-[1px] bg-foreground/20 mt-8"></div>
        </div>

        <div className="relative max-w-4xl mx-auto h-[400px] md:h-[350px] flex items-center justify-center">
          <Quote className="absolute top-0 md:-top-10 left-1/2 -translate-x-1/2 w-24 h-24 text-foreground/5 -z-10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full flex flex-col items-center justify-center text-center px-4"
            >
              <div className="flex items-center gap-1 mb-8">
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

              <p className="text-lg md:text-2xl lg:text-3xl font-light text-foreground leading-relaxed md:leading-loose mb-10 tracking-wide max-w-3xl">
                &quot;{testimonials[currentIndex].reviewText}&quot;
              </p>

              <div className="flex flex-col items-center gap-4">
                {testimonials[currentIndex].image ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border/40">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].customerName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-[1px] bg-foreground/20 mb-2"></div>
                )}
                <div>
                  <h4 className="text-[13px] font-bold uppercase tracking-widest text-foreground">
                    {testimonials[currentIndex].customerName}
                  </h4>
                  {testimonials[currentIndex].designation && (
                    <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 mt-1.5">
                      {testimonials[currentIndex].designation}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={1} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" strokeWidth={1} />
              </button>
            </>
          )}
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-500 ${
                  index === currentIndex
                    ? "w-8 h-[1px] bg-foreground"
                    : "w-4 h-[1px] bg-foreground/20 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
