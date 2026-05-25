"use client";

import Link from "next/link";
import { Home, Grid, ShoppingCart, User } from "lucide-react";
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
    { name: "Shop", path: "#", icon: Grid, action: openCategory },
    { name: "Cart", path: "#", icon: ShoppingCart, action: openCart },
    { name: "Profile", path: "/login", icon: User, action: null },
  ];

  return (
    <nav
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl transition-transform duration-500 ease-in-out ${isVisible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="flex items-center justify-around h-16 pb-safe">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return item.action ? (
            <button
              key={index}
              onClick={item.action}
              className="flex flex-col items-center justify-center w-full h-full text-foreground/50 hover:text-foreground transition-colors relative"
            >
              <Icon className="w-5 h-5 mb-1" strokeWidth={1.5} />
              <span className="text-[9px] font-medium tracking-widest uppercase">
                {item.name}
              </span>
              {item.name === "Cart" && (
                <span className="absolute top-2 right-1/4 w-3.5 h-3.5 bg-foreground text-background text-[8px] font-bold flex items-center justify-center rounded-full">
                  0
                </span>
              )}
            </button>
          ) : (
            <Link
              key={index}
              href={item.path}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive ? "text-foreground" : "text-foreground/50 hover:text-foreground"}`}
            >
              <Icon className="w-5 h-5 mb-1" strokeWidth={1.5} />
              <span className="text-[9px] font-medium tracking-widest uppercase">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
