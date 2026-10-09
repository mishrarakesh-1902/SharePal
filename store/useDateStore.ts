import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DateState {
  deliveryDate: string | null;
  pickupDate: string | null;
  isDatePickerOpen: boolean;
  openDatePicker: () => void;
  closeDatePicker: () => void;
  setDateRange: (delivery: string | null, pickup: string | null) => void;
  clearDates: () => void;
}

// Default delivery date: 2 days from today (Oct 10, 2026 formatted)
const getDefaultDeliveryDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split("T")[0];
};

export const useDateStore = create<DateState>()(
  persist(
    (set) => ({
      deliveryDate: "2026-10-10",
      pickupDate: null,
      isDatePickerOpen: false,
      openDatePicker: () => set({ isDatePickerOpen: true }),
      closeDatePicker: () => set({ isDatePickerOpen: false }),
      setDateRange: (delivery, pickup) =>
        set({ deliveryDate: delivery, pickupDate: pickup }),
      clearDates: () =>
        set({ deliveryDate: null, pickupDate: null }),
    }),
    {
      name: "sharepal_rental_dates",
    }
  )
);
