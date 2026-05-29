"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, Upload, User, Mail, Phone, MapPin, Save } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import api from "@/services/api";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "@/utils/uploadImage";

export default function ProfileTab() {
  const { user, updateUser } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    address: {
      street: "",
      city: "",
      country: "",
    },
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        image: user.image || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          country: user.address?.country || "",
        },
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an valid image file");
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      toast.success(
        "Image uploaded successfully! Don't forget to save changes.",
      );
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.put("/auth/profile", formData);
      if (res.data.success) {
        updateUser(res.data.user);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-light uppercase tracking-[0.15em] text-foreground">
          Account Details
        </h2>
        <p className="text-[12px] text-foreground/60 tracking-wider">
          Update your personal information and default shipping address.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Profile Picture Section */}
        <div className="flex items-center gap-6 p-6 border border-border/40 bg-foreground/[0.02]">
          <div className="relative w-24 h-24 rounded-full border border-border/40 overflow-hidden flex items-center justify-center bg-background group shrink-0">
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
                disabled={isUploading || isSubmitting}
              />
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[13px] font-medium tracking-wider uppercase">
              Profile Picture
            </h3>
            <p className="text-[11px] text-foreground/50">
              Click the avatar to change your image. (Square image recommended)
            </p>
          </div>
        </div>

        {/* Personal Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-border/40 text-[13px] px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] flex items-center gap-2 text-foreground/50">
              <Phone className="w-3.5 h-3.5" /> Phone Number
            </label>
            <input
              type="text"
              value={user?.phoneNumber || ""}
              disabled
              className="w-full bg-foreground/[0.02] border border-border/20 text-[13px] px-4 py-3 focus:outline-none text-foreground/50 cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-border/40 text-[13px] px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
              placeholder="example@domain.com"
            />
          </div>
        </div>

        <div className="w-full h-[1px] bg-border/20"></div>

        {/* Shipping Address Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Default Shipping Address
          </h3>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em]">
              Street Address
            </label>
            <textarea
              name="street"
              value={formData.address.street}
              onChange={handleAddressChange}
              rows={2}
              className="w-full bg-transparent border border-border/40 text-[13px] px-4 py-3 focus:outline-none focus:border-foreground transition-colors resize-none"
              placeholder="House, Block, Road, Area"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em]">
                City / District
              </label>
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                className="w-full bg-transparent border border-border/40 text-[13px] px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                placeholder="e.g. Dhaka"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em]">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.address.country}
                onChange={handleAddressChange}
                className="w-full bg-transparent border border-border/40 text-[13px] px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                placeholder="e.g. Bangladesh"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="w-full md:w-auto self-start bg-foreground text-background px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors flex justify-center items-center gap-2 mt-4 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" strokeWidth={1.5} />
          )}
          Save Changes
        </button>
      </form>
    </div>
  );
}
