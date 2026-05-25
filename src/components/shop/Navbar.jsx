"use client";

import Link from "next/link";
import { Menu, Search, ShoppingCart, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useUIStore } from "@/store/useUIStore";
import { useEffect, useState } from "react";

export default function Navbar({ settings, categories }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { openMenu, openCart, openSearch } = useUIStore();

  useEffect(() => setMounted(true), []);

  const siteName = settings?.branding?.siteName || "AURA THREADS";
  const navLinks = categories?.slice(0, 5) || [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={openMenu}
            className="md:hidden p-2 -ml-2 text-foreground hover:text-accent transition-colors"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link
            href="/"
            className="text-2xl md:text-3xl font-extrabold tracking-widest text-foreground uppercase"
          >
            {siteName}
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/shop"
            className="text-sm font-semibold tracking-wider text-foreground/80 hover:text-foreground transition-colors uppercase relative group"
          >
            Shop
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all group-hover:w-full"></span>
          </Link>
          {navLinks.map((cat) => (
            <Link
              key={cat._id}
              href={`/category/${cat.slug}`}
              className="text-sm font-semibold tracking-wider text-foreground/80 hover:text-foreground transition-colors uppercase relative group"
            >
              {cat.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={openSearch}
            aria-label="Search"
            className="p-2 text-foreground/80 hover:text-accent transition-colors"
          >
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
              className="p-2 text-foreground/80 hover:text-accent transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Moon className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </button>
          )}
          <button
            onClick={openCart}
            aria-label="Cart"
            className="p-2 relative text-foreground/80 hover:text-accent transition-colors"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute top-0 right-0 w-4 h-4 md:w-5 md:h-5 bg-foreground text-background text-[10px] md:text-xs font-bold flex items-center justify-center rounded-full">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
