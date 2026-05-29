"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="my-container max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-3">
            Client Care
          </span>
          <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.15em] text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-[1px] bg-foreground mt-6"></div>
        </div>

        <div className="flex flex-col border-t border-border/30">
          {faqs.map((faq, index) => (
            <div key={faq._id || index} className="border-b border-border/30">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
              >
                <span className="text-[13px] md:text-[15px] font-medium tracking-wide pr-8 group-hover:text-foreground/70 transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 text-foreground/40 group-hover:text-foreground transition-colors"
                >
                  {openIndex === index ? (
                    <Minus
                      className="w-4 h-4 md:w-5 md:h-5"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Plus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-[13px] md:text-[14px] text-foreground/60 leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
