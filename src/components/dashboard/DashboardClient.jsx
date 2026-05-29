"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  KeyRound,
  LogOut,
} from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import OverviewTab from "./OverviewTab";
import OrdersTab from "./OrdersTab";
import ProfileTab from "./ProfileTab";
import PasswordTab from "./PasswordTab";

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!mounted) return null;

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "profile", label: "Account Details", icon: User },
    { id: "password", label: "Security", icon: KeyRound },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab setActiveTab={setActiveTab} />;
      case "orders":
        return <OrdersTab />;
      case "profile":
        return <ProfileTab />;
      case "password":
        return <PasswordTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {/* Page Header */}
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-2xl md:text-4xl font-light uppercase tracking-[0.15em] text-foreground">
          My Account
        </h1>
        <div className="w-12 h-[1px] bg-foreground mt-2 mb-2"></div>
        <p className="text-[12px] md:text-[13px] text-foreground/60 tracking-wider">
          Welcome back, {user?.name || "User"}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Navigation Sidebar / Mobile Topbar */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-5 py-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap lg:whitespace-normal cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  {tab.label}
                </button>
              );
            })}

            <div className="hidden lg:block w-full h-[1px] bg-border/20 my-2"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-5 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-red-500/80 hover:bg-red-500/10 hover:text-red-600 transition-all whitespace-nowrap lg:whitespace-normal cursor-pointer"
            >
              <LogOut className="w-[18px] h-[18px]" strokeWidth={1.5} />
              Logout
            </button>
          </nav>
        </aside>

        {/* Tab Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
