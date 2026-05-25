"use client";

import Link from "next/link";
import { Home, Grid, ShoppingBag, User, Store } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const { openCategory, openCart } = useUIStore();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", path: "/", icon: Home, action: null },
    { name: "Categories", path: "#", icon: Grid, action: openCategory },
    { name: "Shop", path: "/shop", icon: Store, action: null },
    { name: "Cart", path: "#", icon: ShoppingBag, action: openCart },
    { name: "Profile", path: "/login", icon: User, action: null },
  ];

  return (
    <nav
      className={`md:hidden fixed bottom-0 left-0 right-0 z-[70] bg-background/85 backdrop-blur-2xl border-t border-border/30 transition-transform duration-500 ease-[0.22,1,0.36,1] ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-around h-[72px] pb-safe relative px-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          const content = (
            <>
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 h-[2px] bg-foreground transition-all duration-500 ease-out rounded-b-full ${
                  isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                }`}
              ></div>
              <div className="relative mt-1">
                <Icon
                  className={`w-[22px] h-[22px] transition-all duration-500 ease-[0.22,1,0.36,1] ${
                    isActive
                      ? "text-foreground scale-110 translate-y-[-2px]"
                      : "text-foreground/40 group-hover:text-foreground/70"
                  }`}
                  strokeWidth={1.5}
                />
                {item.name === "Cart" && (
                  <span className="absolute -top-1.5 -right-2.5 bg-foreground text-background text-[9px] font-semibold flex items-center justify-center min-w-[16px] h-[16px] rounded-full px-1 shadow-sm transition-transform duration-300">
                    0
                  </span>
                )}
              </div>
              <span
                className={`text-[9px] font-medium tracking-[0.1em] uppercase mt-1.5 transition-all duration-300 ${
                  isActive
                    ? "text-foreground opacity-100"
                    : "text-foreground/40 opacity-70"
                }`}
              >
                {item.name}
              </span>
            </>
          );

          return item.action ? (
            <button
              key={index}
              onClick={item.action}
              className="flex flex-col items-center justify-center w-full h-full relative group cursor-pointer"
            >
              {content}
            </button>
          ) : (
            <Link
              key={index}
              href={item.path}
              className="flex flex-col items-center justify-center w-full h-full relative group cursor-pointer"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
