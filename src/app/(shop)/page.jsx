import HeroSection from "@/components/shop/HeroSection";
import { getBanners } from "@/services/shopService";

export const metadata = {
  title: "Aura Threads | Premium Clothing Brand",
  description:
    "Discover the latest trends in luxury fashion with Aura Threads.",
};

export default async function HomePage() {
  const [mainBanners, sideBanners] = await Promise.all([
    getBanners("main-slider"),
    getBanners("side-slider"),
  ]);

  return (
    <div className="flex flex-col w-full">
      <HeroSection mainBanners={mainBanners} sideBanners={sideBanners} />
    </div>
  );
}
