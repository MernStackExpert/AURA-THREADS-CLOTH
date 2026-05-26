"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import useCartStore from "@/store/useCartStore";
import { applyCouponCode, createOrder } from "@/services/orderService";
import toast from "react-hot-toast";
import {
  Loader2,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  Trash2,
  Tag,
} from "lucide-react";

export default function CheckoutClient({ settings }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isBuyNow = searchParams.get("mode") === "buynow";

  const { cartItems, buyNowItem, removeFromCart, updateQuantity } =
    useCartStore();
  const [checkoutItems, setCheckoutItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "inside",
  });

  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCouponForm, setShowCouponForm] = useState(false);

  const deliveryChargeInside = settings?.policies?.deliveryChargeInside || 60;
  const deliveryChargeOutside =
    settings?.policies?.deliveryChargeOutside || 120;
  const deliveryDiscount = settings?.deleveryDiscount;

  useEffect(() => {
    if (isBuyNow) {
      if (buyNowItem) {
        setCheckoutItems([buyNowItem]);
      } else {
        router.push("/product/shop");
      }
    } else {
      if (cartItems.length > 0) {
        setCheckoutItems(cartItems);
      } else {
        router.push("/product/shop");
      }
    }
  }, [isBuyNow, buyNowItem, cartItems, router]);

  const subTotal = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const isFreeDelivery =
    deliveryDiscount?.isActive &&
    deliveryDiscount?.minOrder > 0 &&
    subTotal >= deliveryDiscount?.minOrder;
  const baseDeliveryCharge =
    formData.city === "inside" ? deliveryChargeInside : deliveryChargeOutside;
  const deliveryCharge = isFreeDelivery ? 0 : baseDeliveryCharge;

  const totalAmount = subTotal + deliveryCharge - discountAmount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateItemQuantity = (idx, item, type) => {
    const maximumStock = item.maxStock > 0 ? item.maxStock : 10;
    const newItems = [...checkoutItems];

    if (type === "increase") {
      if (item.quantity >= maximumStock) {
        toast.error("Maximum stock limit reached");
        return;
      }
      newItems[idx].quantity += 1;
      if (!isBuyNow) updateQuantity(item.id, item.size, item.color, "increase");
    } else if (type === "decrease") {
      if (item.quantity > 1) {
        newItems[idx].quantity -= 1;
        if (!isBuyNow)
          updateQuantity(item.id, item.size, item.color, "decrease");
      }
    }
    setCheckoutItems(newItems);
  };

  const handleRemoveItem = (idx, item) => {
    const newItems = checkoutItems.filter((_, i) => i !== idx);
    setCheckoutItems(newItems);
    if (!isBuyNow) removeFromCart(item.id, item.size, item.color);
    if (newItems.length === 0) router.push("/product/shop");
    toast.success("Item removed");
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setIsCouponLoading(true);
    try {
      const res = await applyCouponCode(couponCode, subTotal);
      if (res.success) {
        setDiscountAmount(res.discountAmount);
        setAppliedCoupon(couponCode.toUpperCase());
        toast.success("Coupon applied successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid coupon code");
    } finally {
      setIsCouponLoading(false);
    }
  };

  const handleOnlinePaymentClick = () => {
    toast.error("Online payment is temporary disabled");
  };

  const handlePlaceOrder = async (e) => {
    e?.preventDefault();

    if (!formData.name.trim())
      return toast.error("Please enter your Full Name");
    if (!formData.phoneNumber.trim())
      return toast.error("Please enter your Phone Number");
    if (!formData.address.trim())
      return toast.error("Please enter your Full Delivery Address");

    setIsSubmitting(true);
    try {
      const orderItems = checkoutItems.map((item) => ({
        productId: item.id,
        name: item.name,
        slug: item.slug,
        image: item.image,
        size: item.size,
        color: item.color,
        price: item.price,
        quantity: item.quantity,
      }));

      const orderData = {
        userInfo: {
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          email: formData.email || null,
        },
        orderItems,
        pricing: {
          subTotal,
          deliveryCharge,
          discountAmount,
          totalAmount,
        },
        payment: {
          method: "Cash on Delivery",
          status: "Pending",
        },
        shippingDetails: formData.address,
      };

      const res = await createOrder(orderData);
      if (res.success) {
        toast.success("Order placed successfully");
        if (!isBuyNow) {
          checkoutItems.forEach((item) =>
            removeFromCart(item.id, item.size, item.color),
          );
        }
        router.push(`/order-success?id=${res.orderId}`);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checkoutItems.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes gentle-vibrate {
          0%, 100% { transform: translateX(0); }
          5% { transform: translateX(-2px) rotate(-1deg); }
          10% { transform: translateX(2px) rotate(1deg); }
          15% { transform: translateX(-2px) rotate(-1deg); }
          20% { transform: translateX(2px) rotate(1deg); }
          25% { transform: translateX(0); }
        }
        .animate-vibrate {
          animation: gentle-vibrate 3.5s infinite;
        }
      `}</style>

      {deliveryDiscount?.isActive && (
        <div className="w-full bg-foreground text-background py-3 px-4 text-center mb-8">
          <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.15em]">
            {deliveryDiscount.message}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-light uppercase tracking-[0.15em]">
              Checkout
            </h1>
            <div className="w-12 h-[1px] bg-foreground mt-4"></div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em]">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-border/40 text-[13px] px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em]">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border border-border/40 text-[13px] px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em]">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border border-border/40 text-[13px] px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em]">
                Shipping Region *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`border p-4 flex flex-col gap-1 cursor-pointer transition-colors ${formData.city === "inside" ? "border-foreground bg-foreground/5" : "border-border/40 hover:border-foreground"}`}
                >
                  <input
                    type="radio"
                    name="city"
                    value="inside"
                    checked={formData.city === "inside"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="text-[12px] font-bold uppercase tracking-wider">
                    Inside Dhaka
                  </span>
                  <span className="text-[11px] text-foreground/60">
                    {deliveryDiscount?.isActive &&
                    deliveryDiscount?.minOrder > 0 &&
                    subTotal >= deliveryDiscount?.minOrder ? (
                      <span className="text-green-600 font-bold uppercase tracking-widest">
                        Free
                      </span>
                    ) : (
                      `৳ ${deliveryChargeInside}`
                    )}
                  </span>
                </label>
                <label
                  className={`border p-4 flex flex-col gap-1 cursor-pointer transition-colors ${formData.city === "outside" ? "border-foreground bg-foreground/5" : "border-border/40 hover:border-foreground"}`}
                >
                  <input
                    type="radio"
                    name="city"
                    value="outside"
                    checked={formData.city === "outside"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="text-[12px] font-bold uppercase tracking-wider">
                    Outside Dhaka
                  </span>
                  <span className="text-[11px] text-foreground/60">
                    {deliveryDiscount?.isActive &&
                    deliveryDiscount?.minOrder > 0 &&
                    subTotal >= deliveryDiscount?.minOrder ? (
                      <span className="text-green-600 font-bold uppercase tracking-widest">
                        Free
                      </span>
                    ) : (
                      `৳ ${deliveryChargeOutside}`
                    )}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em]">
                Full Delivery Address *
              </label>
              <textarea
                name="address"
                required
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="House, Street, Area, Upazila, District"
                className="w-full bg-transparent border border-border/40 text-[13px] px-4 py-3 focus:outline-none focus:border-foreground transition-colors resize-none placeholder:text-foreground/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em]">
                Payment Method *
              </label>
              <div className="flex flex-col gap-3">
                <label className="border border-foreground bg-foreground/5 p-4 flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked
                    readOnly
                    className="accent-foreground"
                  />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold uppercase tracking-wider">
                      Cash on Delivery
                    </span>
                    <span className="text-[11px] text-foreground/50">
                      Pay with cash upon delivery
                    </span>
                  </div>
                </label>

                <div
                  onClick={handleOnlinePaymentClick}
                  className="border border-border/20 opacity-50 p-4 flex items-center gap-3 cursor-pointer hover:border-red-500/50 transition-colors"
                >
                  <input
                    type="radio"
                    disabled
                    className="accent-foreground cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold uppercase tracking-wider">
                      Online Payment
                    </span>
                    <span className="text-[11px] text-foreground/50">
                      bKash, Nagad, Visa, Mastercard
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full bg-foreground text-background py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 animate-vibrate"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              Place Order ৳ {totalAmount}
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 bg-foreground/[0.02] border border-border/40 p-6 md:p-8 lg:sticky lg:top-32 h-fit flex flex-col gap-6">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground border-b border-border/20 pb-4 block">
            Order Summary
          </span>

          <div className="flex flex-col gap-6 max-h-[350px] overflow-y-auto pr-2 scrollbar-hide">
            {checkoutItems.map((item, idx) => (
              <div
                key={`${item.id}-${item.size}-${item.color}-${idx}`}
                className="flex gap-4 group"
              >
                <div className="relative w-20 aspect-[3/4] bg-foreground/5 overflow-hidden flex-shrink-0">
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
                      <span className="text-[13px] font-light text-foreground line-clamp-1">
                        {item.name}
                      </span>
                      <div className="flex gap-2 text-[10px] text-foreground/50 uppercase tracking-widest mt-1">
                        {item.size && <span>{item.size}</span>}
                        {item.size && item.color && <span>|</span>}
                        {item.color && <span>{item.color}</span>}
                      </div>
                    </div>
                    <span className="text-[13px] font-medium whitespace-nowrap ml-2">
                      ৳ {item.price * item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-border/40">
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateItemQuantity(idx, item, "decrease")
                        }
                        className="w-7 h-7 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" strokeWidth={1.5} />
                      </button>
                      <span className="w-7 text-center text-[12px] font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateItemQuantity(idx, item, "increase")
                        }
                        className="w-7 h-7 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" strokeWidth={1.5} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx, item)}
                      className="text-foreground/40 hover:text-red-500 transition-colors p-2 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border/20">
            {!showCouponForm && !appliedCoupon ? (
              <button
                type="button"
                onClick={() => setShowCouponForm(true)}
                className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.1em] text-foreground/70 hover:text-foreground transition-colors cursor-pointer py-2"
              >
                <span className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5" />
                  If you have any coupon code, click here
                </span>
                <Plus className="w-3.5 h-3.5" />
              </button>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={!!appliedCoupon}
                  placeholder={
                    appliedCoupon
                      ? `COUPON APPLIED: ${appliedCoupon}`
                      : "ENTER COUPON CODE"
                  }
                  className="w-full bg-transparent border border-border/40 text-[11px] font-medium tracking-[0.1em] px-4 py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/40 disabled:opacity-60 disabled:border-green-600/30 text-center uppercase"
                />
                {!appliedCoupon && (
                  <button
                    type="submit"
                    disabled={isCouponLoading || !couponCode.trim()}
                    className="bg-foreground text-background text-[10px] font-bold uppercase tracking-[0.15em] px-6 py-3 hover:bg-foreground/90 transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center min-w-[90px]"
                  >
                    {isCouponLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Apply"
                    )}
                  </button>
                )}
              </form>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-border/20 text-[13px]">
            <div className="flex justify-between font-light text-foreground/70">
              <span>Subtotal</span>
              <span>৳ {subTotal}</span>
            </div>
            <div className="flex justify-between font-light text-foreground/70 items-center">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" strokeWidth={1.5} />
                Delivery Charge
              </span>
              <span
                className={isFreeDelivery ? "text-green-600 font-medium" : ""}
              >
                {isFreeDelivery ? "Free" : `৳ ${deliveryCharge}`}
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between font-light text-green-600">
                <span>Discount ({appliedCoupon})</span>
                <span>- ৳ {discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between font-medium uppercase tracking-[0.1em] text-foreground text-sm pt-3 border-t border-border/20 mt-1">
              <span>Total Amount</span>
              <span>৳ {totalAmount}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="w-full bg-foreground text-background py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 mt-2 animate-vibrate"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShieldCheck className="w-4 h-4" />
            )}
            Place Order ৳ {totalAmount}
          </button>
        </div>
      </div>
    </>
  );
}
