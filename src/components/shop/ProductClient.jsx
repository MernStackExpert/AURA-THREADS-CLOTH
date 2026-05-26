"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Star,
  Truck,
  RefreshCw,
  ShoppingBag,
  Zap,
} from "lucide-react";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function ImageZoom({ src, alt }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      ref={imageRef}
      className="relative w-full aspect-[3/4] overflow-hidden bg-foreground/5 cursor-crosshair"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover object-center transition-transform duration-300 ease-out ${
          isZoomed ? "opacity-0" : "opacity-100"
        }`}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
      <div
        className={`absolute inset-0 transition-opacity duration-300 ease-out ${
          isZoomed ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: `${position.x}% ${position.y}%`,
          backgroundSize: "200%",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

function Accordion({ title, children, isOpen, onClick }) {
  return (
    <div className="border-b border-border/40">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left cursor-pointer group"
      >
        <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground group-hover:text-foreground/70 transition-colors">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-500 ease-[0.22,1,0.36,1] ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={1.5}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-[13px] text-foreground/70 leading-relaxed font-light">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductClient({ product }) {
  const [selectedImage, setSelectedImage] = useState(
    product.media?.images?.[0] || product.media?.thumbnail,
  );
  const [selectedSize, setSelectedSize] = useState(null);
  const [openAccordion, setOpenAccordion] = useState("description");

  const images = product.media?.images || [product.media?.thumbnail];
  const sizes =
    product.attributes?.find((attr) => attr.name.toLowerCase() === "size")
      ?.values || [];

  const handleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-24">
      <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-4">
        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto scrollbar-hide snap-x md:snap-y w-full md:w-[100px] flex-shrink-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative w-[80px] md:w-full aspect-[3/4] flex-shrink-0 cursor-pointer snap-start transition-all duration-300 ${
                selectedImage === img
                  ? "ring-1 ring-foreground opacity-100"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} view ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex-grow"
        >
          <ImageZoom src={selectedImage} alt={product.name} />
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 md:sticky md:top-32 h-fit">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col"
        >
          <motion.div variants={fadeUp} className="mb-6 flex flex-col gap-2">
            {product.brand && (
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                {product.brand}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground tracking-wide">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-2 text-[14px]">
              <div className="flex items-center gap-3">
                <span className="text-foreground font-medium text-lg">
                  ৳ {product.pricing?.price}
                </span>
                {product.pricing?.oldPrice > product.pricing?.price && (
                  <span className="text-foreground/40 line-through">
                    ৳ {product.pricing.oldPrice}
                  </span>
                )}
              </div>
              {product.pricing?.discountPercentage > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-bold tracking-[0.2em] px-2 py-1 uppercase">
                  -{product.pricing.discountPercentage}%
                </span>
              )}
            </div>

            {product.social?.rating > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-foreground">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.social.rating) ? "fill-current" : "text-foreground/20"}`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-medium tracking-wider text-foreground/60 mt-0.5">
                  ({product.social.totalReviews} Reviews)
                </span>
              </div>
            )}
          </motion.div>

          <motion.div variants={fadeUp} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
                Select Size
              </span>
              <button className="text-[10px] font-medium uppercase tracking-[0.1em] text-foreground/50 hover:text-foreground transition-colors underline underline-offset-4 cursor-pointer">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => {
                const variantInfo = product.variants?.find(
                  (v) => v.size === size,
                );
                const isOutOfStock = variantInfo && variantInfo.stock <= 0;

                return (
                  <button
                    key={size}
                    disabled={isOutOfStock}
                    onClick={() => setSelectedSize(size)}
                    className={`relative w-12 h-12 flex items-center justify-center text-[12px] font-medium transition-all duration-300 cursor-pointer ${
                      selectedSize === size
                        ? "bg-foreground text-background border border-foreground"
                        : "bg-transparent text-foreground border border-border/40 hover:border-foreground"
                    } ${isOutOfStock ? "opacity-30 cursor-not-allowed overflow-hidden" : ""}`}
                  >
                    {size}
                    {isOutOfStock && (
                      <div className="absolute w-[140%] h-[1px] bg-foreground rotate-45 transform origin-center" />
                    )}
                  </button>
                );
              })}
            </div>
            {!selectedSize && (
              <p className="text-[10px] text-red-500 mt-3 uppercase tracking-wider font-medium">
                Please select a size
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4 mb-10">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-foreground text-background text-[11px] font-bold tracking-[0.2em] uppercase py-4 flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              Buy It Now
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-transparent text-foreground border border-foreground text-[11px] font-bold tracking-[0.2em] uppercase py-4 flex items-center justify-center gap-2 hover:bg-foreground hover:text-background transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex gap-6 py-6 border-y border-border/40 mb-8"
          >
            <div className="flex flex-col gap-2 w-1/2">
              <div className="flex items-center gap-2 text-foreground">
                <Truck className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em]">
                  Delivery
                </span>
              </div>
              <p className="text-[11px] text-foreground/60 tracking-wider">
                {product.shipping?.estimatedDelivery || "3-6 Days"}
              </p>
            </div>
            <div className="w-[1px] h-full bg-border/40"></div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="flex items-center gap-2 text-foreground">
                <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em]">
                  Returns
                </span>
              </div>
              <p className="text-[11px] text-foreground/60 tracking-wider">
                {product.shipping?.returnPolicy || "5 Days Return"}
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col">
            <Accordion
              title="Description"
              isOpen={openAccordion === "description"}
              onClick={() => handleAccordion("description")}
            >
              {product.content?.fullDescription}
            </Accordion>

            {product.content?.features?.length > 0 && (
              <Accordion
                title="Features"
                isOpen={openAccordion === "features"}
                onClick={() => handleAccordion("features")}
              >
                <ul className="list-disc pl-4 flex flex-col gap-2">
                  {product.content.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </Accordion>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
