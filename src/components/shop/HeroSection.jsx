"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection({ mainBanners = [], sideBanners = [] }) {
  const [currentMainIndex, setCurrentMainIndex] = useState(0);
  const [currentSideIndex, setCurrentSideIndex] = useState(0);

  useEffect(() => {
    if (mainBanners.length <= 1) return;
    const mainTimer = setInterval(() => {
      setCurrentMainIndex((prev) => (prev + 1) % mainBanners.length);
    }, 5000);
    return () => clearInterval(mainTimer);
  }, [mainBanners]);

  useEffect(() => {
    if (sideBanners.length <= 1) return;
    const sideTimer = setInterval(() => {
      setCurrentSideIndex((prev) => (prev + 1) % sideBanners.length);
    }, 6000);
    return () => clearInterval(sideTimer);
  }, [sideBanners]);

  const activeMain = mainBanners[currentMainIndex];
  const activeSide = sideBanners[currentSideIndex];

  if (!mainBanners.length && !sideBanners.length) return null;

  return (
    <section className="w-full h-[50vh] min-h-[350px] md:h-[80vh] md:min-h-[600px] flex flex-col md:flex-row bg-background">
      <div className="relative w-full md:w-2/3 h-full overflow-hidden group">
        <AnimatePresence mode="sync">
          {activeMain && (
            <motion.div
              key={activeMain._id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={activeMain.image}
                alt={activeMain.title || "Premium Collection"}
                fill
                priority={currentMainIndex === 0}
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="max-w-2xl"
                >
                  {activeMain.title && (
                    <h1 className="text-2xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-[0.15em] leading-snug md:leading-tight mb-4 md:mb-6">
                      {activeMain.title}
                    </h1>
                  )}
                  {activeMain.link && (
                    <Link
                      href={activeMain.link}
                      className="inline-flex items-center justify-center px-6 md:px-10 py-3 md:py-4 border border-white text-white text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500"
                    >
                      {activeMain.buttonText || "Discover Now"}
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {mainBanners.length > 1 && (
          <div className="absolute bottom-6 right-6 md:bottom-16 md:right-16 flex gap-2 md:gap-3 z-20">
            {mainBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentMainIndex(idx)}
                className="group py-2 cursor-pointer"
                aria-label={`Main Slide ${idx + 1}`}
              >
                <div
                  className={`h-[1px] transition-all duration-500 ease-out ${
                    currentMainIndex === idx
                      ? "w-8 md:w-12 bg-white"
                      : "w-4 md:w-6 bg-white/40 group-hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:block relative w-1/3 h-full overflow-hidden border-l border-border/20 group">
        <AnimatePresence mode="sync">
          {activeSide && (
            <motion.div
              key={activeSide._id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={activeSide.image}
                alt={activeSide.title || "Exclusive Offers"}
                fill
                priority={currentSideIndex === 0}
                className="object-cover object-center transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-700" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                {activeSide.title && (
                  <h2 className="text-2xl lg:text-3xl font-light text-white uppercase tracking-[0.15em] leading-snug mb-8">
                    {activeSide.title}
                  </h2>
                )}
                {activeSide.link && (
                  <Link
                    href={activeSide.link}
                    className="relative text-[11px] font-medium tracking-[0.2em] uppercase text-white pb-2"
                  >
                    {activeSide.buttonText || "Shop Collection"}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {sideBanners.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {sideBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSideIndex(idx)}
                className="group py-2 cursor-pointer"
                aria-label={`Side Slide ${idx + 1}`}
              >
                <div
                  className={`h-[1px] transition-all duration-500 ease-out ${
                    currentSideIndex === idx
                      ? "w-6 bg-white"
                      : "w-3 bg-white/40 group-hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
