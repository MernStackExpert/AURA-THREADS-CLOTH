import { create } from "zustand";

export const useUIStore = create((set) => ({
  isMenuOpen: false,
  isCartOpen: false,
  isCategoryOpen: false,
  isSearchOpen: false,
  openMenu: () =>
    set({
      isMenuOpen: true,
      isCartOpen: false,
      isCategoryOpen: false,
      isSearchOpen: false,
    }),
  closeMenu: () => set({ isMenuOpen: false }),
  openCart: () =>
    set({
      isCartOpen: true,
      isMenuOpen: false,
      isCategoryOpen: false,
      isSearchOpen: false,
    }),
  closeCart: () => set({ isCartOpen: false }),
  openCategory: () =>
    set({
      isCategoryOpen: true,
      isMenuOpen: false,
      isCartOpen: false,
      isSearchOpen: false,
    }),
  closeCategory: () => set({ isCategoryOpen: false }),
  openSearch: () =>
    set({
      isSearchOpen: true,
      isMenuOpen: false,
      isCartOpen: false,
      isCategoryOpen: false,
    }),
  closeSearch: () => set({ isSearchOpen: false }),
  closeAll: () =>
    set({
      isMenuOpen: false,
      isCartOpen: false,
      isCategoryOpen: false,
      isSearchOpen: false,
    }),
}));
