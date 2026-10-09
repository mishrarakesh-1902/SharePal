import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/product";

interface WaitlistState {
  joinedIds: number[];
  counts: Record<number, number>;
  isModalOpen: boolean;
  selectedProduct: Product | null;
  openWaitlistModal: (product: Product) => void;
  closeWaitlistModal: () => void;
  joinWaitlist: (productId: number, info: { name: string; contact: string }) => void;
  hasJoined: (productId: number) => boolean;
  getWaitlistCount: (productId: number) => number;
}

export const useWaitlistStore = create<WaitlistState>()(
  persist(
    (set, get) => ({
      joinedIds: [],
      counts: {
        37616: 26, // PlayStation Portal initial count
      },
      isModalOpen: false,
      selectedProduct: null,
      openWaitlistModal: (product: Product) =>
        set({ isModalOpen: true, selectedProduct: product }),
      closeWaitlistModal: () =>
        set({ isModalOpen: false, selectedProduct: null }),
      joinWaitlist: (productId: number) => {
        const joined = get().joinedIds;
        if (!joined.includes(productId)) {
          const currentCount = get().counts[productId] || 26;
          set({
            joinedIds: [...joined, productId],
            counts: {
              ...get().counts,
              [productId]: currentCount + 1,
            },
          });
        }
      },
      hasJoined: (productId: number) => {
        return get().joinedIds.includes(productId);
      },
      getWaitlistCount: (productId: number) => {
        return get().counts[productId] ?? 26;
      },
    }),
    {
      name: "sharepal_waitlist_store",
    }
  )
);
