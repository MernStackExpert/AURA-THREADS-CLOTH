import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (userData, token) => {
        Cookies.set("token", token, { expires: 7, secure: true });
        set({ user: userData, token, isAuthenticated: true });
      },

      logout: () => {
        Cookies.remove("token");
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateUser: (updatedData) => {
        set((state) => ({ user: { ...state.user, ...updatedData } }));
      },
    }),
    {
      name: "aura-threads-auth",
    },
  ),
);

export default useAuthStore;
