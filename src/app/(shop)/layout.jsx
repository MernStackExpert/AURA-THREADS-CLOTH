import Navbar from "@/components/shop/Navbar";
import BottomNav from "@/components/shop/BottomNav";
import Modals from "@/components/shop/Modals";

export const metadata = {
  title: "Shop | Aura Threads",
  description: "Browse our exclusive and premium clothing collections.",
};

export default function ShopLayout({ children }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pb-16 md:pb-0">{children}</main>
      <BottomNav />
      <Modals />
    </div>
  );
}
