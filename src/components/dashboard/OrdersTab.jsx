"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Eye,
  X,
  Package,
  Truck,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import api from "@/services/api";

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders");
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Filter and Search Logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchStatus =
        statusFilter === "All" || order.orderStatus === statusFilter;
      const matchSearch =
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderItems.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      return matchStatus && matchSearch;
    });
  }, [orders, searchTerm, statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "Processing":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "Completed":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-foreground/5 text-foreground border-border/40";
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-foreground/[0.02] p-4 border border-border/40">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search Order ID or Item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border border-border/40 text-[12px] px-10 py-2.5 focus:outline-none focus:border-foreground transition-colors"
          />
          <Search className="w-4 h-4 text-foreground/50 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-foreground/50 hidden md:block" />
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {["All", "Pending", "Processing", "Completed", "Cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] whitespace-nowrap transition-colors border ${
                    statusFilter === status
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-foreground/70 border-border/40 hover:border-foreground"
                  }`}
                >
                  {status}
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 border border-border/40 bg-foreground/[0.02] text-center flex flex-col items-center justify-center gap-3">
            <Package className="w-8 h-8 text-foreground/30" />
            <p className="text-[12px] font-bold uppercase tracking-widest text-foreground/50">
              No orders found
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="p-5 border border-border/40 bg-background flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-foreground/30 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <p className="text-[14px] font-medium text-foreground tracking-wider">
                  #{order._id.toUpperCase()}
                </p>
                <p className="text-[11px] text-foreground/60 uppercase tracking-widest">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="flex flex-col gap-1 md:items-center">
                <span className="text-[10px] uppercase tracking-widest text-foreground/50">
                  Items
                </span>
                <span className="text-[13px] font-medium">
                  {order.orderItems.length} Products
                </span>
              </div>

              <div className="flex flex-col gap-1 md:items-center">
                <span className="text-[10px] uppercase tracking-widest text-foreground/50">
                  Total Amount
                </span>
                <span className="text-[14px] font-medium">
                  ৳ {order.pricing?.totalAmount}
                </span>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 border-t border-border/20 md:border-none pt-4 md:pt-0 mt-2 md:mt-0">
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border ${getStatusColor(order.orderStatus)}`}
                >
                  {order.orderStatus}
                </span>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" /> Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[90]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-background border border-border/40 shadow-2xl z-[100] p-6 md:p-8 scrollbar-hide"
            >
              <div className="flex items-center justify-between border-b border-border/20 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-light uppercase tracking-[0.1em]">
                    Order Details
                  </h2>
                  <p className="text-[11px] text-foreground/60 tracking-widest mt-1">
                    #{selectedOrder._id.toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 bg-foreground/5 hover:bg-foreground/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-foreground/60">
                    <MapPin className="w-4 h-4" /> Shipping Address
                  </div>
                  <div className="p-4 bg-foreground/[0.02] border border-border/20 text-[13px] leading-relaxed">
                    <p className="font-semibold mb-1">
                      {selectedOrder.userInfo.name}
                    </p>
                    <p>{selectedOrder.userInfo.phoneNumber}</p>
                    <p className="mt-2 text-foreground/80">
                      {selectedOrder.shippingDetails}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-foreground/60">
                    <CheckCircle className="w-4 h-4" /> Payment Info
                  </div>
                  <div className="p-4 bg-foreground/[0.02] border border-border/20 flex flex-col gap-2 text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Method:</span>
                      <span className="font-medium">
                        {selectedOrder.payment?.method}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Status:</span>
                      <span className="font-medium text-orange-600">
                        {selectedOrder.payment?.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 mb-8">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/60">
                  Products
                </h3>
                <div className="flex flex-col gap-3">
                  {selectedOrder.orderItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 border border-border/20"
                    >
                      <div className="relative w-16 h-20 bg-foreground/5 flex-shrink-0">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <p className="text-[13px] font-medium line-clamp-1">
                          {item.name}
                        </p>
                        <div className="flex gap-2 text-[10px] text-foreground/50 uppercase tracking-widest">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.size && item.color && <span>|</span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                        <p className="text-[11px] font-medium mt-1">
                          Qty: {item.quantity} x ৳{item.price}
                        </p>
                      </div>
                      <div className="text-[13px] font-semibold">
                        ৳{item.quantity * item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/20 pt-4 flex flex-col gap-2 text-[13px]">
                <div className="flex justify-between text-foreground/70">
                  <span>Subtotal</span>
                  <span>৳{selectedOrder.pricing?.subTotal}</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Delivery Charge</span>
                  <span>৳{selectedOrder.pricing?.deliveryCharge}</span>
                </div>
                {selectedOrder.pricing?.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- ৳{selectedOrder.pricing?.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-foreground text-[15px] pt-2 border-t border-border/10 mt-1">
                  <span>Total Amount</span>
                  <span>৳{selectedOrder.pricing?.totalAmount}</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
