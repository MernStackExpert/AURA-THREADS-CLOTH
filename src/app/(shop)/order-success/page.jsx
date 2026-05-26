import OrderSuccessClient from "@/components/shop/OrderSuccessClient";
import api from "@/services/api";

export const metadata = {
  title: "Order Successful | Aura Threads",
  description: "Thank you for your purchase.",
};

const fetchSliderProducts = async () => {
  try {
    const res = await api.get(
      "/products?limit=8&sortBy=totalSold&sortOrder=desc",
    );
    return res.data?.products || [];
  } catch (error) {
    return [];
  }
};

const fetchSettings = async () => {
  try {
    const res = await api.get("/settings");
    return res.data?.settings || null;
  } catch (error) {
    return null;
  }
};

export default async function OrderSuccessPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const orderId = resolvedParams.id || "";
  const products = await fetchSliderProducts();
  const settings = await fetchSettings();

  return (
    <main className="w-full bg-background min-h-screen pt-32 pb-24">
      <div className="my-container">
        <OrderSuccessClient
          orderId={orderId}
          products={products}
          settings={settings}
        />
      </div>
    </main>
  );
}
