"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success("Thank you. Your message has been received.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name *"
            className="w-full bg-transparent border-b border-foreground/20 px-0 py-4 text-[13px] md:text-[14px] text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground transition-colors"
            disabled={isSubmitting}
          />
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email *"
            className="w-full bg-transparent border-b border-foreground/20 px-0 py-4 text-[13px] md:text-[14px] text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground transition-colors"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full bg-transparent border-b border-foreground/20 px-0 py-4 text-[13px] md:text-[14px] text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground transition-colors"
          disabled={isSubmitting}
        />
      </div>

      <div className="relative">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message *"
          rows="5"
          className="w-full bg-transparent border-b border-foreground/20 px-0 py-4 text-[13px] md:text-[14px] text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground transition-colors resize-none"
          disabled={isSubmitting}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="self-start inline-flex items-center justify-center gap-3 bg-foreground text-background px-10 py-4 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-all duration-300 disabled:opacity-50 group"
      >
        <span>Send Message</span>
        <Send
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          strokeWidth={1.5}
        />
      </button>
    </motion.form>
  );
}
