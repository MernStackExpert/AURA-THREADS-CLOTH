"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success(
        "Welcome to the Aura Club! You've successfully subscribed.",
      );
      setEmail("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="w-full py-20 md:py-32 bg-foreground text-background">
      <div className="my-container max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex flex-col items-center"
        >
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-background/60 mb-4">
            Exclusive Access
          </span>
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-[0.15em] mb-6">
            Join The Aura Club
          </h2>
          <p className="text-[13px] md:text-[15px] font-light text-background/80 tracking-wide max-w-md mx-auto mb-12">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-md relative">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-transparent border-b border-background/40 px-2 py-4 text-[13px] md:text-[15px] text-background placeholder:text-background/40 focus:outline-none focus:border-background transition-colors"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-background/60 hover:text-background transition-colors disabled:opacity-50"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
