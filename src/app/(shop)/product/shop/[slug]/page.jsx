import { notFound } from "next/navigation";
import { getProductBySlug } from "@/services/productService";
import ProductClient from "@/components/shop/ProductClient";

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | Aura Threads",
    };
  }

  return {
    title: `${product.name} | Aura Threads`,
    description: product.content?.shortDescription || product.name,
    openGraph: {
      images: [product.media?.thumbnail || ""],
    },
  };
}

export default async function ProductDetailsPage({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="w-full bg-background min-h-screen pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="my-container">
        <ProductClient product={product} />
      </div>
    </main>
  );
}
