"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Gem, Headphones } from "lucide-react";

export default function TrustFeatures() {
  const features = [
    {
      icon: Truck,
      title: "Premium Shipping",
      description: "Complimentary secure delivery on all orders",
    },
    {
      icon: ShieldCheck,
      title: "Secure Checkout",
      description: "Your payment information is fully encrypted",
    },
    {
      icon: Gem,
      title: "Authentic Quality",
      description: "Crafted with the finest premium materials",
    },
    {
      icon: Headphones,
      title: "24/7 Concierge",
      description: "Dedicated support team at your service",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="w-full py-16 md:py-24 bg-background border-t border-b border-border/20">
      <div className="my-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center px-4"
              >
                <div className="mb-5 text-foreground/70 flex items-center justify-center">
                  <Icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1} />
                </div>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-[11px] md:text-[12px] text-foreground/50 tracking-wide leading-relaxed max-w-[220px]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
