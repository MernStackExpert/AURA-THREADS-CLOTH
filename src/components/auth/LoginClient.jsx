"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, ArrowLeft, Eye, EyeOff } from "lucide-react";
import api from "@/services/api";
import useAuthStore from "@/store/useAuthStore";
import toast from "react-hot-toast";

export default function LoginClient() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phoneNumber || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      // API Route Updated: /auth/login
      const res = await api.post("/auth/login", formData);
      if (res.data.success) {
        login(res.data.user, res.data.token);
        toast.success("Welcome back!");

        if (res.data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/my-dashboard");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md px-6 md:px-0 relative"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-foreground/60 hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-3xl font-light uppercase tracking-[0.15em] text-foreground mb-4">
          Welcome Back
        </h1>
        <div className="w-12 h-[1px] bg-foreground mb-4"></div>
        <p className="text-[12px] text-foreground/60 tracking-wider uppercase">
          Sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-[0.15em]">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full bg-transparent border border-border/40 text-[13px] px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
            placeholder="+8801..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-[0.15em]">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-border/40 text-[13px] px-4 py-3 pr-10 focus:outline-none focus:border-foreground transition-colors"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors cursor-pointer p-1"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-foreground text-background py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors flex justify-center items-center gap-2 mt-4 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-[12px] text-foreground/60 tracking-wider">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-foreground hover:underline underline-offset-4 uppercase font-bold tracking-[0.1em]"
          >
            Register
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
