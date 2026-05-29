import HeroSection from "@/components/shop/HeroSection";
import TopCategories from "@/components/shop/TopCategories";
import DynamicProductSections from "@/components/shop/DynamicProductSections";
import PromotionalBottomBanner from "@/components/shop/PromotionalBottomBanner";
import CustomerReviews from "@/components/shop/CustomerReviews";
import FAQSection from "@/components/shop/FAQSection";
import {
  getBanners,
  getTopCategories,
  getHomepageSections,
  getTestimonials,
  getFaqs,
} from "@/services/shopService";
import TrustFeatures from "@/components/shop/TrustFeatures";
import Newsletter from "@/components/shop/Newsletter";

export const metadata = {
  title: "Aura Threads | Premium Clothing Brand",
  description:
    "Discover the latest trends in luxury fashion with Aura Threads.",
};

export default async function HomePage() {
  const [
    mainBanners,
    sideBanners,
    bottomBanners,
    topCategories,
    homepageSections,
    testimonials,
    faqs,
  ] = await Promise.all([
    getBanners("main-banner"),
    getBanners("side-banner"),
    getBanners("bottom-nav"),
    getTopCategories(),
    getHomepageSections(),
    getTestimonials(),
    getFaqs(),
  ]);

  return (
    <div className="flex flex-col w-full">
      <HeroSection mainBanners={mainBanners} sideBanners={sideBanners} />
      <TopCategories categories={topCategories} />
      <DynamicProductSections sections={homepageSections} />

      {/* {bottomBanners && bottomBanners.length > 0 && (
        <PromotionalBottomBanner banners={bottomBanners} />
      )} */}

      {mainBanners && mainBanners.length > 0 && (
        <PromotionalBottomBanner banners={mainBanners} />
      )}

      {testimonials && testimonials.length > 0 && (
        <CustomerReviews testimonials={testimonials} />
      )}

      {faqs && faqs.length > 0 && <FAQSection faqs={faqs} />}

      <TrustFeatures />
      <Newsletter />
    </div>
  );
}
