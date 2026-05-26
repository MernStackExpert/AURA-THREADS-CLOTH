import HeroSection from "@/components/shop/HeroSection";
import TopCategories from "@/components/shop/TopCategories";
import DynamicProductSections from "@/components/shop/DynamicProductSections";
import {
  getBanners,
  getTopCategories,
  getHomepageSections,
} from "@/services/shopService";

export const metadata = {
  title: "Aura Threads | Premium Clothing Brand",
  description:
    "Discover the latest trends in luxury fashion with Aura Threads.",
};

export default async function HomePage() {
  const [mainBanners, sideBanners, topCategories, homepageSections] =
    await Promise.all([
      getBanners("main-banner"),
      getBanners("side-banner"),
      getTopCategories(),
      getHomepageSections(),
    ]);

  return (
    <div className="flex flex-col w-full">
      <HeroSection mainBanners={mainBanners} sideBanners={sideBanners} />
      <TopCategories categories={topCategories} />
      <DynamicProductSections sections={homepageSections} />
    </div>
  );
}
