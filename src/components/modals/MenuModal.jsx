"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";

export default function MenuModal({
  closeAll,
  pathname,
  siteName,
  categories,
  social,
  customEase,
}) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.div
      key="mobile-menu"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.5, ease: customEase }}
      onClick={(e) => e.stopPropagation()}
      className="fixed top-0 left-0 bottom-0 z-[100] w-[85%] max-w-sm bg-background shadow-2xl flex flex-col border-r border-border/20 cursor-default"
    >
      <div className="flex items-center justify-between p-8">
        <span className="font-medium text-[13px] tracking-[0.2em] uppercase text-foreground">
          {siteName}
        </span>
        <button
          onClick={closeAll}
          aria-label="Close"
          className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer p-2 -mr-2"
        >
          <X className="w-6 h-6" strokeWidth={1.25} />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto px-8 py-4 flex flex-col gap-6">
        <div className="flex flex-col gap-5">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.path && !currentCategory;
            return (
              <Link
                key={idx}
                href={link.path}
                onClick={closeAll}
                className={`text-[22px] font-light tracking-wide transition-all duration-300 w-fit cursor-pointer ${
                  isActive
                    ? "text-foreground translate-x-2"
                    : "text-foreground/60 hover:text-foreground hover:translate-x-2"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 mb-2">
          <div className="h-[1px] w-10 bg-foreground/20 mb-6"></div>
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/40 block mb-5">
            Collections
          </span>
          <div className="flex flex-col gap-4">
            {categories?.map((cat) => {
              const isActive = currentCategory === cat.slug;
              return (
                <Link
                  key={cat._id || cat.slug}
                  href={`/product/shop?category=${cat.slug}`}
                  onClick={closeAll}
                  className={`text-[15px] font-light tracking-wider transition-all duration-300 w-fit cursor-pointer ${
                    isActive
                      ? "text-foreground translate-x-2"
                      : "text-foreground/60 hover:text-foreground hover:translate-x-2"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-8 mt-auto border-t border-border/20">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/40 block mb-4">
          Follow Us
        </span>
        <div className="flex items-center gap-5">
          {social.facebook && (
            <a
              href={social.facebook}
              target="_blank"
              rel="noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
            >
              <FaFacebookF className="w-[18px] h-[18px]" />
            </a>
          )}
          {social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
            >
              <FaInstagram className="w-[19px] h-[19px]" />
            </a>
          )}
          {social.twitter && (
            <a
              href={social.twitter}
              target="_blank"
              rel="noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
            >
              <FaTwitter className="w-[19px] h-[19px]" />
            </a>
          )}
          {social.youtube && (
            <a
              href={social.youtube}
              target="_blank"
              rel="noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
            >
              <FaYoutube className="w-[20px] h-[20px]" />
            </a>
          )}
          {social.tiktok && (
            <a
              href={social.tiktok}
              target="_blank"
              rel="noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
            >
              <FaTiktok className="w-[18px] h-[18px]" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
