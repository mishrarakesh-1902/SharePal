import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserAddress {
  flatNo: string;
  street: string;
  landmark?: string;
  city: string;
  pincode: string;
  addressType: "Home" | "Work" | "Other";
}

export interface UserKyc {
  idType: "Aadhaar" | "Driving License" | "Voter ID" | "Passport";
  idNumber: string;
  isVerified: boolean;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: UserAddress;
  kyc: UserKyc;
  createdAt: string;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalView: "login" | "signup" | "forgot-password" | "profile";
  openAuthModal: (view?: "login" | "signup" | "forgot-password" | "profile") => void;
  closeAuthModal: () => void;
  setAuthModalView: (view: "login" | "signup" | "forgot-password" | "profile") => void;
  login: (phoneOrEmail: string, name?: string) => void;
  signup: (userData: Omit<UserProfile, "id" | "createdAt">) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isAuthModalOpen: false,
      authModalView: "login",

      openAuthModal: (view = "login") =>
        set({ isAuthModalOpen: true, authModalView: view }),

      closeAuthModal: () => set({ isAuthModalOpen: false }),

      setAuthModalView: (view) => set({ authModalView: view }),

      login: (phoneOrEmail: string, name = "Gamer") => {
        // Find if user was previously signed up or create a profile
        const existing = get().user;
        if (existing && (existing.email === phoneOrEmail || existing.phone === phoneOrEmail)) {
          set({ isAuthenticated: true, isAuthModalOpen: false });
          return;
        }

        const newUser: UserProfile = {
          id: `usr_${Date.now()}`,
          fullName: name !== "Gamer" ? name : (phoneOrEmail.includes("@") ? phoneOrEmail.split("@")[0] : `Gamer_${phoneOrEmail.slice(-4)}`),
          email: phoneOrEmail.includes("@") ? phoneOrEmail : `${phoneOrEmail}@sharepal-user.in`,
          phone: phoneOrEmail.includes("@") ? "9876543210" : phoneOrEmail,
          address: {
            flatNo: "Flat 402, Pine Heights",
            street: "80 Feet Rd, 4th Block, Koramangala",
            landmark: "Near Sony World Signal",
            city: "Bangalore",
            pincode: "560034",
            addressType: "Home",
          },
          kyc: {
            idType: "Aadhaar",
            idNumber: "XXXX-XXXX-8921",
            isVerified: true,
            emergencyContactName: "Friend / Family",
            emergencyContactPhone: "9876500000",
          },
          createdAt: new Date().toISOString(),
        };

        set({ user: newUser, isAuthenticated: true, isAuthModalOpen: false });
      },

      signup: (userData) => {
        const newUser: UserProfile = {
          ...userData,
          id: `usr_${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        set({ user: newUser, isAuthenticated: true, isAuthModalOpen: false });
      },

      updateProfile: (updates) => {
        const current = get().user;
        if (current) {
          set({ user: { ...current, ...updates } });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, isAuthModalOpen: false });
      },
    }),
    {
      name: "sharepal_auth_storage",
    }
  )
);
