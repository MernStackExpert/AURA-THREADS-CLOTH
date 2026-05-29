import HeroSection from "@/components/shop/HeroSection";
import TopCategories from "@/components/shop/TopCategories";
import DynamicProductSections from "@/components/shop/DynamicProductSections";
import {
  getBanners,
  getTopCategories,
  getHomepageSections,
} from "@/services/shopService";
import PromotionalBottomBanner from "@/components/shop/PromotionalBottomBanner";

export const metadata = {
  title: "Aura Threads | Premium Clothing Brand",
  description:
    "Discover the latest trends in luxury fashion with Aura Threads.",
};

export default async function HomePage() {
  const [mainBanners, sideBanners,bottomBanners, topCategories, homepageSections] =
    await Promise.all([
      getBanners("main-banner"),
      getBanners("side-banner"),
      getBanners("bottom-banner"),
      getTopCategories(),
      getHomepageSections(),
    ]);

  return (
    <div className="flex flex-col w-full">
      <HeroSection mainBanners={mainBanners} sideBanners={sideBanners} />
      <TopCategories categories={topCategories} />
      <DynamicProductSections sections={homepageSections} />
      {mainBanners && mainBanners.length > 0 && (
         <PromotionalBottomBanner banners={mainBanners} />
      )}
    </div>
  );
}
