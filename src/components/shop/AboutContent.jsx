"use client";

import { motion } from "framer-motion";

export default function AboutContent() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="w-full bg-background pb-24 md:pb-32">
      <section className="w-full pt-32 pb-20 md:pt-40 md:pb-32 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/50 mb-6"
          >
            The Heritage
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-[0.1em] text-foreground leading-[1.1] mb-10"
          >
            Redefining <br className="hidden md:block" /> Modern Luxury
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-16 h-[1px] bg-foreground/30 origin-center"
          ></motion.div>
        </div>
      </section>

      <section className="my-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 md:mb-32">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative w-full aspect-[4/5] bg-foreground/[0.03] border border-border/40 flex items-center justify-center overflow-hidden"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">
              Editorial Image Placement
            </span>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col justify-center"
          >
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground mb-6">
              Our Philosophy
            </h2>
            <p className="text-base md:text-lg font-light leading-relaxed text-foreground/80 mb-6">
              Aura Threads was born from a singular vision: to create garments
              that transcend fleeting trends. We believe that true luxury lies
              in the delicate balance between exceptional craftsmanship and
              timeless design.
            </p>
            <p className="text-base md:text-lg font-light leading-relaxed text-foreground/80">
              Every piece in our collection is a testament to uncompromised
              quality, sourced from the finest materials and tailored for the
              modern individual who appreciates the subtle art of elegance.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 md:mb-32">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col justify-center lg:order-1 order-2"
          >
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground mb-6">
              The Craftsmanship
            </h2>
            <p className="text-base md:text-lg font-light leading-relaxed text-foreground/80 mb-6">
              Our ateliers represent the pinnacle of artisanal skill. Each
              stitch, hem, and fold is executed with mathematical precision and
              an artist&apos;s touch.
            </p>
            <p className="text-base md:text-lg font-light leading-relaxed text-foreground/80">
              We collaborate exclusively with heritage mills and sustainable
              producers to ensure that our footprint is as refined as our
              silhouettes. Luxury is not just what you wear; it is how it is
              made.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative w-full aspect-square md:aspect-[4/3] bg-foreground/[0.03] border border-border/40 flex items-center justify-center overflow-hidden lg:order-2 order-1"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">
              Craftsmanship Image Placement
            </span>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-foreground text-background py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="my-container max-w-3xl mx-auto text-center"
        >
          <span className="text-[24px] md:text-[40px] font-light italic leading-relaxed text-background/90">
            &quot;Elegance is not about being noticed, it&apos;s about being
            remembered.&quot;
          </span>
        </motion.div>
      </section>
    </div>
  );
}
