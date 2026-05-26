import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      buyNowItem: null,

      addToCart: (product, selectedSize, selectedColor) => {
        const cart = get().cartItems;
        const existingItemIndex = cart.findIndex(
          (item) =>
            item.id === product._id &&
            item.size === selectedSize &&
            item.color === selectedColor,
        );

        if (existingItemIndex !== -1) {
          const updatedCart = [...cart];
          updatedCart[existingItemIndex].quantity += 1;
          set({ cartItems: updatedCart });
        } else {
          const newItem = {
            id: product._id,
            slug: product.slug,
            name: product.name,
            price: product.pricing?.price,
            image: product.media?.thumbnail,
            size: selectedSize,
            color: selectedColor,
            quantity: 1,
            maxStock:
              product.variants?.find(
                (v) => v.size === selectedSize && v.color === selectedColor,
              )?.stock ||
              product.inventory?.stock ||
              10,
          };
          set({ cartItems: [...cart, newItem] });
        }
      },

      setBuyNowItem: (product, selectedSize, selectedColor) => {
        if (!product) {
          set({ buyNowItem: null });
          return;
        }

        const item = {
          id: product._id,
          slug: product.slug,
          name: product.name,
          price: product.pricing?.price,
          image: product.media?.thumbnail,
          size: selectedSize,
          color: selectedColor,
          quantity: 1,
          maxStock:
            product.variants?.find(
              (v) => v.size === selectedSize && v.color === selectedColor,
            )?.stock ||
            product.inventory?.stock ||
            10,
        };
        set({ buyNowItem: item });
      },

      updateQuantity: (id, size, color, type) => {
        const cart = get().cartItems;
        const itemIndex = cart.findIndex(
          (item) =>
            item.id === id && item.size === size && item.color === color,
        );

        if (itemIndex !== -1) {
          const updatedCart = [...cart];
          const currentItem = updatedCart[itemIndex];
          const maximumStock =
            currentItem.maxStock > 0 ? currentItem.maxStock : 10;

          if (type === "increase" && currentItem.quantity < maximumStock) {
            updatedCart[itemIndex].quantity += 1;
          } else if (type === "decrease" && currentItem.quantity > 1) {
            updatedCart[itemIndex].quantity -= 1;
          }

          set({ cartItems: updatedCart });
        }
      },

      removeFromCart: (id, size, color) => {
        const cart = get().cartItems;
        const updatedCart = cart.filter(
          (item) =>
            !(item.id === id && item.size === size && item.color === color),
        );
        set({ cartItems: updatedCart });
      },
    }),
    {
      name: "aura-threads-cart",
    },
  ),
);

export default useCartStore;
