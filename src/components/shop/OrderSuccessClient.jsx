"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  ShoppingBag,
  Copy,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef } from "react";
import useCartStore from "@/store/useCartStore";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";

export default function OrderSuccessClient({ orderId, products, settings }) {
  const setBuyNowItem = useCartStore((state) => state.setBuyNowItem);
  const sliderRef = useRef(null);
  const siteName = settings?.branding?.siteName || "AURA THREADS";

  useEffect(() => {
    setBuyNowItem(null, null, null);
  }, [setBuyNowItem]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let interval;
    const startAutoSlide = () => {
      interval = setInterval(() => {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const scrollAmount =
            window.innerWidth < 1024
              ? slider.clientWidth / 2
              : slider.clientWidth / 4;
          slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }, 3500);
    };

    startAutoSlide();

    slider.addEventListener("mouseenter", () => clearInterval(interval));
    slider.addEventListener("mouseleave", startAutoSlide);
    slider.addEventListener("touchstart", () => clearInterval(interval));
    slider.addEventListener("touchend", startAutoSlide);

    return () => {
      clearInterval(interval);
      slider.removeEventListener("mouseenter", () => clearInterval(interval));
      slider.removeEventListener("mouseleave", startAutoSlide);
      slider.removeEventListener("touchstart", () => clearInterval(interval));
      slider.removeEventListener("touchend", startAutoSlide);
    };
  }, []);

  const handleCopy = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId.toUpperCase());
      toast.success("Order ID copied to clipboard");
    }
  };

  const handleDownload = () => {
    if (orderId) {
      const receiptContent = `${siteName.toUpperCase()}\n\nOrder Reference: #${orderId.toUpperCase()}\nStatus: Confirmed\n\nThank you for shopping with us! Our team will contact you shortly to confirm the delivery details.`;
      const blob = new Blob([receiptContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${siteName.replace(/\s+/g, "-")}-Order-${orderId.toUpperCase()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Receipt downloaded successfully");
    }
  };

  const slide = (direction) => {
    if (sliderRef.current) {
      const scrollAmount =
        window.innerWidth < 1024
          ? sliderRef.current.clientWidth / 2
          : sliderRef.current.clientWidth / 4;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-24">
      <div className="flex flex-col items-center justify-center text-center gap-8 bg-foreground/[0.02] border border-border/20 p-10 md:p-16 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.6,
          }}
          className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-600/20"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Check className="w-12 h-12 text-white" strokeWidth={2.5} />
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-4 items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl md:text-5xl font-light uppercase tracking-[0.15em] text-foreground"
          >
            Order Confirmed
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-12 h-[1px] bg-foreground mt-2 mb-2"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-[13px] md:text-[14px] text-foreground/60 tracking-wider max-w-md leading-relaxed"
          >
            Thank you for your purchase. We have received your order and will
            contact you shortly to confirm the delivery details.
          </motion.p>
        </div>

        {orderId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-background border border-border/40 px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-lg mt-4"
          >
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50">
                Order Reference
              </span>
              <span className="text-[15px] font-medium tracking-widest text-foreground">
                #{orderId.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="w-10 h-10 flex items-center justify-center border border-border/40 text-foreground/70 hover:text-foreground hover:border-foreground transition-colors cursor-pointer"
                title="Copy Order ID"
              >
                <Copy className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                onClick={handleDownload}
                className="w-10 h-10 flex items-center justify-center border border-border/40 text-foreground/70 hover:text-foreground hover:border-foreground transition-colors cursor-pointer"
                title="Download Receipt"
              >
                <Download className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto"
        >
          <Link
            href="/product/shop"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
            Continue Shopping
          </Link>
          <Link
            href="/profile"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-transparent border border-foreground text-foreground px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
          >
            View My Profile
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>

      {products?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col gap-8 w-full"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.15em] text-foreground">
                Shop More
              </h2>
              <div className="w-12 h-[1px] bg-foreground mt-4 mb-2"></div>
              <p className="text-[12px] text-foreground/60 tracking-wider">
                Explore our trending products
              </p>
            </div>
            <div className="flex items-center gap-3 self-end">
              <button
                onClick={() => slide("left")}
                className="w-10 h-10 flex items-center justify-center border border-border/40 text-foreground/60 hover:text-foreground hover:border-foreground transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => slide("right")}
                className="w-10 h-10 flex items-center justify-center border border-border/40 text-foreground/60 hover:text-foreground hover:border-foreground transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="w-[calc(50%-8px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)] snap-start flex-shrink-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
