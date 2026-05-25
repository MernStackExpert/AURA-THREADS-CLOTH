"use client";

import Link from "next/link";
import { Menu, Search, ShoppingCart, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useUIStore } from "@/store/useUIStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { openMenu, openCart, openSearch } = useUIStore();

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={openMenu}
            className="md:hidden p-2 -ml-2 text-foreground"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter text-foreground"
          >
            Aura Threads
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link
            href="/"
            className="hover:text-accent transition-colors text-foreground"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="hover:text-accent transition-colors text-foreground"
          >
            Shop
          </Link>
          <Link
            href="/men"
            className="hover:text-accent transition-colors text-foreground"
          >
            Men
          </Link>
          <Link
            href="/women"
            className="hover:text-accent transition-colors text-foreground"
          >
            Women
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={openSearch}
            aria-label="Search"
            className="p-2 hover:bg-secondary/10 rounded-full transition-colors text-foreground"
          >
            <Search className="w-5 h-5" />
          </button>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
              className="p-2 hover:bg-secondary/10 rounded-full transition-colors text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          )}

          <button
            onClick={openCart}
            aria-label="Cart"
            className="p-2 relative hover:bg-secondary/10 rounded-full transition-colors text-foreground"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
