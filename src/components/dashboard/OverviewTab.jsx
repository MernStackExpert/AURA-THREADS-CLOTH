"use client";

import { useEffect, useState } from "react";
import { Package, CreditCard, Clock, ArrowRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "@/services/api";

export default function OverviewTab({ setActiveTab }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    pendingOrders: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const res = await api.get("/orders/my-orders");
        if (res.data.success) {
          const fetchedOrders = res.data.orders;
          setOrders(fetchedOrders);

          let spent = 0;
          let pending = 0;

          fetchedOrders.forEach((order) => {
            spent += order.pricing?.totalAmount || 0;
            if (order.orderStatus === "Pending") pending += 1;
          });

          setStats({
            totalOrders: fetchedOrders.length,
            totalSpent: spent,
            pendingOrders: pending,
          });

          const monthlyData = {};
          fetchedOrders.forEach((order) => {
            const date = new Date(order.createdAt);
            const monthYear =
              date.toLocaleString("default", { month: "short" }) +
              " " +
              date.getFullYear().toString().slice(-2);

            if (!monthlyData[monthYear]) {
              monthlyData[monthYear] = 0;
            }
            monthlyData[monthYear] += order.pricing?.totalAmount || 0;
          });

          const formattedChartData = Object.keys(monthlyData)
            .slice(0, 6) 
            .map((key) => ({
              name: key,
              spent: monthlyData[key],
            }))
            .reverse();

          if (formattedChartData.length === 0) {
            setChartData([
              { name: "Jan", spent: 0 },
              { name: "Feb", spent: 0 },
              { name: "Mar", spent: 0 },
            ]);
          } else {
            setChartData(formattedChartData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch overview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border/40 p-3 shadow-xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/60 mb-1">
            {label}
          </p>
          <p className="text-[13px] font-medium text-foreground">
            ৳ {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 border border-border/40 bg-foreground/[0.02] flex flex-col gap-4">
          <div className="flex items-center gap-3 text-foreground/60">
            <Package className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em]">
              Total Orders
            </span>
          </div>
          <p className="text-3xl font-light">{stats.totalOrders}</p>
        </div>

        <div className="p-6 border border-border/40 bg-foreground/[0.02] flex flex-col gap-4">
          <div className="flex items-center gap-3 text-foreground/60">
            <CreditCard className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em]">
              Total Spent
            </span>
          </div>
          <p className="text-3xl font-light">
            ৳ {stats.totalSpent.toLocaleString()}
          </p>
        </div>

        <div className="p-6 border border-border/40 bg-foreground/[0.02] flex flex-col gap-4">
          <div className="flex items-center gap-3 text-foreground/60">
            <Clock className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em]">
              Pending Orders
            </span>
          </div>
          <p className="text-3xl font-light">{stats.pendingOrders}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6 md:p-8 border border-border/40 bg-foreground/[0.02]">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground mb-8">
          Spending Overview
        </h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="currentColor"
                    stopOpacity={0.1}
                  />
                  <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="currentColor"
                opacity={0.1}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }}
                tickFormatter={(value) => `৳${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="spent"
                stroke="currentColor"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSpent)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Preview */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground">
            Recent Orders
          </h3>
          <button
            onClick={() => setActiveTab("orders")}
            className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/60 hover:text-foreground flex items-center gap-1 transition-colors"
          >
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {orders.slice(0, 3).map((order) => (
            <div
              key={order._id}
              className="p-4 border border-border/40 bg-background flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <p className="text-[13px] font-medium text-foreground">
                  #{order._id.slice(-6).toUpperCase()}
                </p>
                <p className="text-[11px] text-foreground/50 mt-1">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                <span className="text-[13px] font-medium">
                  ৳ {order.pricing?.totalAmount}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 ${
                    order.orderStatus === "Pending"
                      ? "bg-orange-500/10 text-orange-600"
                      : order.orderStatus === "Processing"
                        ? "bg-blue-500/10 text-blue-600"
                        : order.orderStatus === "Completed"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-red-500/10 text-red-600"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="p-8 border border-border/20 bg-foreground/[0.02] text-center">
              <p className="text-[12px] text-foreground/50 uppercase tracking-widest">
                No recent orders found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
