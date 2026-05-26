import api from "./api";

export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const applyCouponCode = async (code, orderAmount) => {
  const response = await api.post("/coupons/apply", { code, orderAmount });
  return response.data;
};
