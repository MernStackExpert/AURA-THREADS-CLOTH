"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Upload,
  User,
} from "lucide-react";
import api from "@/services/api";
import useAuthStore from "@/store/useAuthStore";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "@/utils/uploadImage";

export default function RegisterClient() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const { confirmPassword, ...apiData } = formData;
      const res = await api.post("/auth/register", apiData);
      if (res.data.success) {
        login(res.data.user, res.data.token);
        toast.success("Account created successfully!");
        router.push("/my-dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
          Create Account
        </h1>
        <div className="w-12 h-[1px] bg-foreground mb-4"></div>
        <p className="text-[12px] text-foreground/60 tracking-wider uppercase">
          Join Aura Threads
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center mb-2">
          <div className="relative w-24 h-24 rounded-full border border-border/40 overflow-hidden flex items-center justify-center bg-foreground/5 group">
            {formData.image ? (
              <Image
                src={formData.image}
                alt="Profile Preview"
                fill
                className="object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-foreground/40" />
            )}

            <label className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              {isUploading ? (
                <Loader2 className="w-5 h-5 animate-spin text-foreground" />
              ) : (
                <Upload className="w-5 h-5 text-foreground" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>
          <span className="text-[10px] uppercase tracking-[0.1em] text-foreground/50 mt-3">
            Profile Picture (Optional)
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-[0.15em]">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full bg-transparent border border-border/40 text-[13px] px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-[0.15em]">
            Phone Number *
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
            Password *
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

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-[0.15em]">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-border/40 text-[13px] px-4 py-3 pr-10 focus:outline-none focus:border-foreground transition-colors"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors cursor-pointer p-1"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || isUploading}
          className="w-full bg-foreground text-background py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors flex justify-center items-center gap-2 mt-4 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Register
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-[12px] text-foreground/60 tracking-wider">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-foreground hover:underline underline-offset-4 uppercase font-bold tracking-[0.1em]"
          >
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
