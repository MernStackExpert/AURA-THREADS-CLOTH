"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight, Trash2, Plus, Minus } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import toast from "react-hot-toast";

export default function CartModal({ closeAll, customEase }) {
  const { cartItems, updateQuantity, removeFromCart } = useCartStore();
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleUpdateQuantity = (item, type) => {
    if (type === "increase") {
      if (item.quantity >= item.maxStock) {
        toast.error("Maximum stock limit reached");
        return;
      }
      updateQuantity(item.id, item.size, item.color, "increase");
      toast.success("Quantity increased");
    } else if (type === "decrease") {
      if (item.quantity > 1) {
        updateQuantity(item.id, item.size, item.color, "decrease");
        toast.success("Quantity decreased");
      }
    }
  };

  const handleRemove = (item) => {
    removeFromCart(item.id, item.size, item.color);
    toast.success("Item removed from cart");
  };

  return (
    <motion.div
      key="cart-modal"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5, ease: customEase }}
      className="fixed top-0 right-0 bottom-0 z-[100] w-full sm:w-[450px] bg-background shadow-2xl flex flex-col cursor-default"
    >
      <div className="flex items-center justify-between p-8 border-b border-border/20">
        <span className="font-medium text-[13px] tracking-[0.2em] uppercase text-foreground">
          Shopping Bag{" "}
          <span className="text-foreground/50 ml-1">({totalItems})</span>
        </span>
        <button
          onClick={closeAll}
          aria-label="Close"
          className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer p-2 -mr-2"
        >
          <X className="w-6 h-6" strokeWidth={1.25} />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center p-10 text-center gap-8">
          <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mb-2">
            <span className="text-2xl opacity-50">🛍️</span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-foreground font-medium text-lg tracking-wide">
              Your bag is empty
            </p>
            <p className="text-foreground/50 font-light text-sm">
              Looks like you haven't added anything yet.
            </p>
          </div>
          <Link
            href="/product/shop"
            onClick={closeAll}
            className="group flex items-center justify-center w-full max-w-[250px] bg-foreground text-background py-4 px-6 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors cursor-pointer"
          >
            Start Shopping
            <ArrowRight
              className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform duration-300"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto p-6 md:p-8 flex flex-col gap-6">
            {cartItems.map((item, idx) => (
              <div
                key={`${item.id}-${item.size}-${item.color}-${idx}`}
                className="flex gap-4 group"
              >
                <div className="relative w-24 aspect-[3/4] bg-foreground/5 overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col flex-grow py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        href={`/product/shop/${item.slug}`}
                        onClick={closeAll}
                        className="text-[13px] font-light text-foreground hover:text-foreground/70 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <div className="flex gap-2 text-[10px] text-foreground/50 uppercase tracking-widest mt-1">
                        {item.size && <span>{item.size}</span>}
                        {item.size && item.color && <span>|</span>}
                        {item.color && <span>{item.color}</span>}
                      </div>
                    </div>
                    <span className="text-[13px] font-medium">
                      ৳ {item.price * item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-border/40">
                      <button
                        onClick={() => handleUpdateQuantity(item, "decrease")}
                        className="w-8 h-8 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" strokeWidth={1.5} />
                      </button>
                      <span className="w-8 text-center text-[12px] font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item, "increase")}
                        className="w-8 h-8 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" strokeWidth={1.5} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-foreground/40 hover:text-red-500 transition-colors p-2 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 md:p-8 bg-background border-t border-border/20 flex flex-col gap-6">
            <div className="flex items-center justify-between text-[13px] font-medium uppercase tracking-[0.1em]">
              <span>Subtotal</span>
              <span>৳ {subTotal}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeAll}
              className="w-full bg-foreground text-background py-4 px-6 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors flex justify-center items-center cursor-pointer"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </motion.div>
  );
}
