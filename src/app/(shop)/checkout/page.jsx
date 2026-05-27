import CheckoutClient from "@/components/shop/CheckoutClient";
import api from "@/services/api";
import { Suspense } from "react";

export const metadata = {
  title: "Secure Checkout | Aura Threads",
  description: "Complete your order securely at Aura Threads.",
};

const fetchSettings = async () => {
  try {
    const res = await api.get("/settings");
    return res.data?.settings || null;
  } catch (error) {
    return null;
  }
};

export default async function CheckoutPage() {
  const settings = await fetchSettings();

  return (
    <main className="w-full bg-background min-h-screen pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="my-container">
       <Suspense fallback={<div>Loading checkout...</div>}>
          <CheckoutClient settings={settings} />
        </Suspense>
      </div>
    </main>
  );
}
