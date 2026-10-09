import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  isInCart: (productId: number) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      addItem: (product: Product) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (item) => item.product.id === product.id
        );

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += 1;
          set({ items: updated });
        } else {
          set({ items: [...currentItems, { product, quantity: 1 }] });
        }
      },
      removeItem: (productId: number) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        });
      },
      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      isInCart: (productId: number) => {
        return get().items.some((item) => item.product.id === productId);
      },
    }),
    {
      name: "sharepal_cart_storage",
    }
  )
);
