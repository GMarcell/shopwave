import { create } from "zustand";
import type { Product } from "../types/product";

export type CartItem = {
  product: Product;
  quantity: number;
  selectedVariant: string;
};

type CartState = {
  items: CartItem[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  setVariant: (id: number, variant: string) => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addProduct: (product) => {
    const items = get().items;
    const existing = items.find((item) => item.product.id === product.id);
    if (existing) {
      set({
        items: items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
      return;
    }

    set({
      items: [
        ...items,
        {
          product,
          quantity: 1,
          selectedVariant: "Default",
        },
      ],
    });
  },
  removeProduct: (id) =>
    set({ items: get().items.filter((item) => item.product.id !== id) }),
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      set({ items: get().items.filter((item) => item.product.id !== id) });
      return;
    }

    set({
      items: get().items.map((item) =>
        item.product.id === id ? { ...item, quantity } : item,
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  setVariant: (id, variant) =>
    set({
      items: get().items.map((item) =>
        item.product.id === id ? { ...item, selectedVariant: variant } : item,
      ),
    }),
}));
