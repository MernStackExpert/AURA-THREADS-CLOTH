import api from "./api";

export const getProductBySlug = async (slug) => {
  try {
    const response = await api.get(`/products/${slug}`);
    return response.data?.product || null;
  } catch (error) {
    return null;
  }
};

export const getRelatedProducts = async (category) => {
  try {
    const response = await api.get(`/products?category=${category}&limit=4`);
    return response.data?.products || [];
  } catch (error) {
    return [];
  }
};
