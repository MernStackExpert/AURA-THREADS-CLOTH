"use client";

import Link from "next/link";
import { Home, Grid, ShoppingCart, User } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export default function BottomNav() {
  const { openCategory, openCart } = useUIStore();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border pb-safe">
      <div className="flex items-center justify-around h-16">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 p-2 text-secondary hover:text-foreground transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        <button
          onClick={openCategory}
          className="flex flex-col items-center gap-1 p-2 text-secondary hover:text-foreground transition-colors"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-medium">Category</span>
        </button>

        <button
          onClick={openCart}
          className="flex flex-col items-center gap-1 p-2 text-secondary hover:text-foreground transition-colors relative"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-accent text-white text-[8px] font-bold flex items-center justify-center rounded-full">
            0
          </span>
          <span className="text-[10px] font-medium">Cart</span>
        </button>

        <Link
          href="/profile"
          className="flex flex-col items-center gap-1 p-2 text-secondary hover:text-foreground transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
