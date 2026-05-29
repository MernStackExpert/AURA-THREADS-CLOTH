import api from "./api";

export const getSettings = async () => {
  try {
    const response = await api.get("/settings");
    return response.data?.settings || null;
  } catch (error) {
    return null;
  }
};

export const getCategories = async (isTop = false) => {
  try {
    const response = await api.get(`/categories${isTop ? "?isTop=true" : ""}`);
    return response.data?.categories || [];
  } catch (error) {
    return [];
  }
};

export const getBanners = async (position) => {
  try {
    const response = await api.get(
      `/banners${position ? `?position=${position}` : ""}`,
    );
    return response.data?.banners || [];
  } catch (error) {
    return [];
  }
};

export const getTopCategories = async () => {
  try {
    const response = await api.get("/categories?isTop=true");
    return response.data?.categories || [];
  } catch (error) {
    return [];
  }
};

export const getHomepageSections = async () => {
  try {
    const response = await api.get("/sections/homepage");
    return response.data?.data || [];
  } catch (error) {
    return [];
  }
};

export const getTestimonials = async () => {
  try {
    const res = await api.get("/testimonials");
    return res.data.success ? res.data.testimonials : [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};
