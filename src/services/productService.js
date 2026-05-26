import api from "./api";

export const getProductBySlug = async (slug) => {
  try {
    const response = await api.get(`/products/${slug}`);
    return response.data?.product || null;
  } catch (error) {
    return null;
  }
};
