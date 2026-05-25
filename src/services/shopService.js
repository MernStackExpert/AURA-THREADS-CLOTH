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
