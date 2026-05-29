import Navbar from "@/components/shop/Navbar";
import BottomNav from "@/components/shop/BottomNav";
import Modals from "@/components/shop/Modals";
import Footer from "@/components/shared/Footer";
import { getSettings, getCategories } from "@/services/shopService";

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: settings?.branding?.siteName
      ? `${settings.branding.siteName} | Premium Store`
      : "Aura Threads | Premium Store",
    description:
      settings?.trackingAndSeo?.metaDescription ||
      "Discover premium fashion collections.",
  };
}

export default async function ShopLayout({ children }) {
  const settings = await getSettings();
  const categories = await getCategories(true);

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar settings={settings} categories={categories} />
      <main className="flex-grow pb-16 md:pb-0">{children}</main>
      <Footer settings={settings} />
      <BottomNav />
      <Modals settings={settings} categories={categories} />
    </div>
  );
}
