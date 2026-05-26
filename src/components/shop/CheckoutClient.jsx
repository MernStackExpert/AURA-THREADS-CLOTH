"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import useCartStore from "@/store/useCartStore";
import { applyCouponCode, createOrder } from "@/services/orderService";
import toast from "react-hot-toast";
import { Loader2, ShieldCheck, Truck } from "lucide-react";

export default function CheckoutClient({ settings }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isBuyNow = searchParams.get("mode") === "buynow";

  const { cartItems, buyNowItem, removeFromCart } = useCartStore();
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

  const deliveryChargeInside = settings?.policies?.deliveryChargeInside || 60;
  const deliveryChargeOutside =
    settings?.policies?.deliveryChargeOutside || 120;
  const deliveryCharge =
    formData.city === "inside" ? deliveryChargeInside : deliveryChargeOutside;

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
  const totalAmount = subTotal + deliveryCharge - discountAmount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    e.preventDefault();
    if (!formData.name || !formData.phoneNumber || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      <div className="lg:col-span-7 flex flex-col gap-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-light uppercase tracking-[0.15em]">
            Checkout
          </h1>
          <div className="w-12 h-[1px] bg-foreground mt-4"></div>
        </div>

        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6">
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
                  ৳ {deliveryChargeInside}
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
                  ৳ {deliveryChargeOutside}
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
                <input type="radio" disabled className="accent-foreground" />
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
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-foreground text-background py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50"
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

        <div className="flex flex-col gap-5 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
          {checkoutItems.map((item, idx) => (
            <div
              key={`${item.id}-${item.size}-${item.color}-${idx}`}
              className="flex gap-4"
            >
              <div className="relative w-16 aspect-[3/4] bg-foreground/5 overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <span className="text-[13px] font-light text-foreground line-clamp-1">
                  {item.name}
                </span>
                <span className="text-[11px] text-foreground/50 uppercase tracking-widest mt-0.5">
                  Qty: {item.quantity} {item.size && `| Size: ${item.size}`}{" "}
                  {item.color && `| Color: ${item.color}`}
                </span>
              </div>
              <span className="text-[13px] font-medium self-center">
                ৳ {item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleApplyCoupon}
          className="flex gap-2 pt-4 border-t border-border/20"
        >
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            disabled={!!appliedCoupon}
            placeholder={
              appliedCoupon ? `COUPON APPLIED: ${appliedCoupon}` : "COUPON CODE"
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
            <span>৳ {deliveryCharge}</span>
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
      </div>
    </div>
  );
}
