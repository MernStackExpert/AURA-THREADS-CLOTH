"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Search,
  ShoppingBag,
  Sun,
  Moon,
  User,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useUIStore } from "@/store/useUIStore";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState, useRef } from "react";

export default function Navbar({ settings, categories }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { openMenu, openCart, openSearch } = useUIStore();
  const cartItems = useCartStore((state) => state.cartItems);
  const { isAuthenticated, user, logout } = useAuthStore();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoUrl = settings?.branding?.logo;
  const siteName = settings?.branding?.siteName || "AURA THREADS";

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    router.push("/login");
  };

  const staticLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/product/shop" },
  ];

  const rightLinks = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-[80] w-full bg-background/95 backdrop-blur-md border-b border-border/20 transition-all duration-500">
      <div className="my-container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 md:flex-none">
          <button
            onClick={openMenu}
            className="md:hidden p-2 -ml-2 text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <Link href="/" className="flex items-center cursor-pointer">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={siteName}
                className="h-6 md:h-7 w-auto object-contain"
              />
            ) : (
              <span className="text-lg md:text-xl font-semibold tracking-[0.15em] text-foreground uppercase">
                {siteName}
              </span>
            )}
          </Link>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-10 h-full flex-1">
          {staticLinks.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className={`relative text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 py-2 group cursor-pointer ${
                pathname === link.path
                  ? "text-foreground"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {link.name}
              <span
                className={`absolute bottom-0 left-0 w-full h-[1px] bg-foreground origin-center transition-transform duration-500 ease-out ${
                  pathname === link.path
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </Link>
          ))}

          <div className="group h-full flex items-center cursor-pointer">
            <div className="relative py-2 flex items-center">
              <span
                className={`text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${
                  pathname.includes("/category")
                    ? "text-foreground"
                    : "text-foreground/60 group-hover:text-foreground"
                }`}
              >
                Collections
              </span>
              <span
                className={`absolute bottom-0 left-0 w-full h-[1px] bg-foreground origin-center transition-transform duration-500 ease-out ${
                  pathname.includes("/category")
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </div>

            <div className="absolute top-20 left-0 w-full bg-background border-b border-border/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-in-out shadow-sm cursor-default">
              <div className="container mx-auto px-8 py-12">
                <div className="grid grid-cols-4 gap-12">
                  <div className="col-span-1 border-r border-foreground/10 pr-8">
                    <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/50 mb-4">
                      Discover
                    </h3>
                    <p className="text-[13px] text-foreground/80 leading-relaxed font-light">
                      Explore our meticulously crafted pieces designed for the
                      modern aesthetic.
                    </p>
                  </div>

                  <div className="col-span-3 grid grid-cols-3 gap-y-6 gap-x-8">
                    {categories?.map((cat) => (
                      <Link
                        key={cat._id || cat.slug}
                        href={`/product/shop?category=${cat.slug}`}
                        className="group/cat block cursor-pointer w-fit"
                      >
                        <span className="text-[12px] uppercase tracking-[0.1em] font-medium text-foreground/70 group-hover/cat:text-foreground transition-colors duration-300">
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {rightLinks.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className={`relative text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 py-2 group cursor-pointer ${
                pathname === link.path
                  ? "text-foreground"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {link.name}
              <span
                className={`absolute bottom-0 left-0 w-full h-[1px] bg-foreground origin-center transition-transform duration-500 ease-out ${
                  pathname === link.path
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-5 flex-1 md:flex-none">
          <button
            onClick={openSearch}
            aria-label="Search"
            className="text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
          >
            <Search className="w-[22px] h-[22px]" strokeWidth={1.5} />
          </button>

          {mounted && isAuthenticated && user ? (
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative w-7 h-7 rounded-full overflow-hidden border border-border/40 hover:border-foreground transition-colors focus:outline-none flex items-center justify-center bg-foreground/5 cursor-pointer"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User
                    className="w-[18px] h-[18px] text-foreground/80"
                    strokeWidth={1.5}
                  />
                )}
              </button>

              <div
                className={`absolute top-full right-0 mt-6 w-56 bg-background border border-border/20 shadow-2xl transition-all duration-300 origin-top-right ${
                  isProfileOpen
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible"
                }`}
              >
                <div className="p-5 border-b border-border/10 bg-foreground/[0.02]">
                  <p className="text-[13px] font-semibold text-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/50 mt-1">
                    {user.role}
                  </p>
                </div>
                <div className="flex flex-col py-2">
                  {user.role === "admin" ? (
                    <Link
                      href="/admin"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      <ShieldCheck
                        className="w-[18px] h-[18px]"
                        strokeWidth={1.5}
                      />
                      Atlas Admin
                    </Link>
                  ) : (
                    <Link
                      href="/my-dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      <LayoutDashboard
                        className="w-[18px] h-[18px]"
                        strokeWidth={1.5}
                      />
                      My Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-red-500/80 hover:text-red-600 hover:bg-red-500/10 transition-colors w-full text-left cursor-pointer"
                  >
                    <LogOut className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              aria-label="Profile"
              className="text-foreground/70 hover:text-foreground transition-colors hidden md:block cursor-pointer"
            >
              <User className="w-[22px] h-[22px]" strokeWidth={1.5} />
            </Link>
          )}

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
              className="text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="w-[22px] h-[22px]" strokeWidth={1.5} />
              ) : (
                <Moon className="w-[22px] h-[22px]" strokeWidth={1.5} />
              )}
            </button>
          )}

          <button
            onClick={openCart}
            aria-label="Cart"
            className="relative text-foreground/70 hover:text-foreground transition-colors flex items-center cursor-pointer"
          >
            <ShoppingBag className="w-[22px] h-[22px]" strokeWidth={1.5} />
            {mounted && totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-foreground text-background text-[9px] font-medium flex items-center justify-center min-w-[15px] h-[15px] rounded-full px-1">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
