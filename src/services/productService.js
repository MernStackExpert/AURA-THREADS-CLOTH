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

export const searchProducts = async (query = "", limit = 4) => {
  try {
    const endpoint = query
      ? `/products?search=${encodeURIComponent(query)}&limit=${limit}`
      : `/products?limit=${limit}&sortBy=totalSold&sortOrder=desc`;

    const response = await api.get(endpoint);
    return response.data?.products || [];
  } catch (error) {
    return [];
  }
};
