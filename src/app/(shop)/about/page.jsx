import AboutContent from "@/components/shop/AboutContent";

export const metadata = {
  title: "Our Story | Premium Store",
  description:
    "Discover the heritage, philosophy, and craftsmanship behind Aura Threads.",
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-background">
      <AboutContent />
    </div>
  );
}
