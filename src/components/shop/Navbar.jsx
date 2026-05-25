"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  ShoppingCart,
  Sun,
  Moon,
  User,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useUIStore } from "@/store/useUIStore";
import { useEffect, useState } from "react";

export default function Navbar({ settings, categories }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { openMenu, openCart, openSearch } = useUIStore();

  useEffect(() => setMounted(true), []);

  const logoUrl = settings?.branding?.logo;
  const siteName = settings?.branding?.siteName || "AURA THREADS";

  const staticLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-[80] w-full border-b border-border bg-background/90 backdrop-blur-2xl transition-colors duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={openMenu}
            className="md:hidden p-2 -ml-2 text-foreground hover:text-accent transition-colors"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="flex items-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={siteName}
                className="h-8 md:h-10 w-auto object-contain"
              />
            ) : (
              <span className="text-2xl md:text-3xl font-extrabold tracking-widest text-foreground uppercase">
                {siteName}
              </span>
            )}
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-10 h-full">
          {staticLinks.slice(0, 2).map((link, index) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={index}
                href={link.path}
                className={`text-sm font-bold tracking-widest uppercase relative group py-8 transition-colors duration-300 ${isActive ? "text-accent" : "text-foreground/70 hover:text-foreground"}`}
              >
                {link.name}
                <span
                  className={`absolute bottom-6 left-0 h-[2px] bg-accent transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            );
          })}

          <div className="group relative h-full flex items-center cursor-pointer">
            <span
              className={`text-sm font-bold tracking-widest uppercase flex items-center gap-1 transition-colors duration-300 ${pathname.includes("/category") ? "text-accent" : "text-foreground/70 group-hover:text-foreground"}`}
            >
              Categories{" "}
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </span>
            <span
              className={`absolute bottom-6 left-0 h-[2px] bg-accent transition-all duration-300 ${pathname.includes("/category") ? "w-full" : "w-0 group-hover:w-full"}`}
            ></span>

            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[650px] bg-card border border-border shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 grid grid-cols-3 gap-6 p-8 rounded-b-2xl">
              {categories?.map((cat, index) => (
                <Link
                  key={cat._id || cat.slug || index}
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-2 group/item"
                >
                  <div className="w-2 h-2 rounded-full bg-border group-hover/item:bg-accent transition-colors"></div>
                  <span className="text-sm font-bold text-foreground/80 group-hover/item:text-accent transition-colors uppercase tracking-wider">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {staticLinks.slice(2).map((link, index) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={index}
                href={link.path}
                className={`text-sm font-bold tracking-widest uppercase relative group py-8 transition-colors duration-300 ${isActive ? "text-accent" : "text-foreground/70 hover:text-foreground"}`}
              >
                {link.name}
                <span
                  className={`absolute bottom-6 left-0 h-[2px] bg-accent transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-5">
          <button
            onClick={openSearch}
            aria-label="Search"
            className="p-2 text-foreground/70 hover:text-accent transition-colors"
          >
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <Link
            href="/login"
            aria-label="Profile"
            className="p-2 text-foreground/70 hover:text-accent transition-colors hidden md:block"
          >
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
              className="p-2 text-foreground/70 hover:text-accent transition-colors"
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
            className="p-2 relative text-foreground/70 hover:text-accent transition-colors"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute top-0 right-0 w-4 h-4 md:w-5 md:h-5 bg-accent text-white text-[10px] md:text-xs font-bold flex items-center justify-center rounded-full">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
