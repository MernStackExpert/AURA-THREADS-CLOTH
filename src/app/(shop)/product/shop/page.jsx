import ShopClient from "@/components/shop/ShopClient";
import api from "@/services/api";

export const metadata = {
  title: "Shop Collection | Aura Threads",
  description: "Explore our premium and exclusive clothing collections.",
  openGraph: {
    title: "Shop Collection | Aura Threads",
    description: "Explore our premium and exclusive clothing collections.",
  },
};

const fetchProducts = async (searchParams) => {
  try {
    const query = new URLSearchParams(searchParams).toString();
    const res = await api.get(`/products?${query}`);
    return res.data;
  } catch (error) {
    return { products: [], meta: {} };
  }
};

const fetchCategories = async () => {
  try {
    const res = await api.get("/categories");
    return res.data?.categories || [];
  } catch (error) {
    return [];
  }
};

export default async function ShopPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const productsData = await fetchProducts(resolvedParams);
  const categories = await fetchCategories();

  return (
    <main className="w-full bg-background min-h-screen pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="my-container">
        <ShopClient
          initialProducts={productsData.products || []}
          meta={productsData.meta || {}}
          categories={categories}
          searchParams={resolvedParams}
        />
      </div>
    </main>
  );
}
