"use client";

import React, { useState } from "react";
import { useAuthStore, UserAddress, UserKyc } from "../store/useAuthStore";
import {
  X,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  LogOut,
  Building,
  Home,
  Briefcase,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";

export const AuthModal: React.FC = () => {
  const {
    user,
    isAuthenticated,
    isAuthModalOpen,
    authModalView,
    closeAuthModal,
    setAuthModalView,
    login,
    signup,
    logout,
  } = useAuthStore();

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginMethod, setLoginMethod] = useState<"otp" | "password">("otp");
  const [otpCode, setOtpCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Signup Multi-Step State
  const [signupStep, setSignupStep] = useState<1 | 2 | 3>(1);

  // Step 1: Account Info
  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  // Step 2: Delivery Address
  const [flatNo, setFlatNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("Bangalore");
  const [pincode, setPincode] = useState("");
  const [addressType, setAddressType] = useState<"Home" | "Work" | "Other">("Home");

  // Step 3: Rental KYC & Verification
  const [idType, setIdType] = useState<"Aadhaar" | "Driving License" | "Voter ID" | "Passport">("Aadhaar");
  const [idNumber, setIdNumber] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  if (!isAuthModalOpen) return null;

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginIdentifier.trim()) {
      setLoginError("Please enter your mobile number or email address");
      return;
    }

    if (loginMethod === "otp" && !isOtpSent) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsOtpSent(true);
      }, 500);
      return;
    }

    if (loginMethod === "otp" && isOtpSent && otpCode.length < 4) {
      setLoginError("Please enter a valid 4-digit verification code");
      return;
    }

    if (loginMethod === "password" && !password.trim()) {
      setLoginError("Please enter your password");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      login(loginIdentifier.trim());
      setIsSubmitting(false);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#8ee600", "#3d0b5e", "#2563eb"],
        });
      } catch (err) {
        console.error(err);
      }
    }, 600);
  };

  // Handle Signup submission
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (signupStep === 1) {
      if (!fullName.trim() || !signupEmail.trim() || !signupPhone.trim() || !signupPassword.trim()) {
        setLoginError("Please fill in all personal details");
        return;
      }
      if (signupPassword !== signupConfirmPassword) {
        setLoginError("Passwords do not match");
        return;
      }
      setSignupStep(2);
      return;
    }

    if (signupStep === 2) {
      if (!flatNo.trim() || !street.trim() || !pincode.trim()) {
        setLoginError("Please provide your delivery address and pincode");
        return;
      }
      setSignupStep(3);
      return;
    }

    if (signupStep === 3) {
      if (!idNumber.trim()) {
        setLoginError("Please provide your Government ID number for Zero-Deposit verification");
        return;
      }
      if (!agreeTerms) {
        setLoginError("You must accept the terms of service and rental agreement");
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        const addressData: UserAddress = {
          flatNo,
          street,
          landmark,
          city,
          pincode,
          addressType,
        };

        const kycData: UserKyc = {
          idType,
          idNumber,
          isVerified: true,
          emergencyContactName: emergencyName,
          emergencyContactPhone: emergencyPhone,
        };

        signup({
          fullName,
          email: signupEmail,
          phone: signupPhone,
          address: addressData,
          kyc: kycData,
        });

        setIsSubmitting(false);
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
            colors: ["#8ee600", "#3d0b5e", "#2563eb"],
          });
        } catch (err) {
          console.error(err);
        }
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200 max-h-[92vh]">
        {/* Top Purple Accent Banner */}
        <div className="relative bg-gradient-to-r from-[#3d0b5e] via-[#4d0e75] to-[#2563eb] p-6 text-white">
          <button
            onClick={closeAuthModal}
            className="absolute right-4 top-4 rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="font-heading text-xl font-black italic tracking-tight text-white">
              Share
            </span>
            <span className="rounded-lg bg-[#2563eb] px-1.5 py-0.5 font-heading text-xl font-black italic tracking-tight text-[#8ee600]">
              Pal
            </span>
          </div>

          <h2 className="mt-2 font-heading text-lg sm:text-xl font-black text-white">
            {authModalView === "login" && "Welcome Back Gamer!"}
            {authModalView === "signup" && "Create Your SharePal Account"}
            {authModalView === "profile" && "Your Rental Profile"}
          </h2>
          <p className="text-xs text-purple-100">
            {authModalView === "login" && "Login to manage your bookings and dates"}
            {authModalView === "signup" && "Sign up with KYC for Zero Security Deposit gadget rentals in Bangalore"}
            {authModalView === "profile" && "Manage verified details, delivery address & active rentals"}
          </p>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {loginError && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
              <span>{loginError}</span>
            </div>
          )}

          {/* ================= VIEW: LOGIN ================= */}
          {authModalView === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number or Email
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-semibold text-slate-400">
                    {loginIdentifier.match(/^[0-9]+$/) ? "+91" : ""}
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Enter 10-digit mobile or email"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none ${
                      loginIdentifier.match(/^[0-9]+$/) ? "pl-11" : "pl-3.5"
                    }`}
                  />
                </div>
              </div>

              {loginMethod === "otp" ? (
                <>
                  {isOtpSent && (
                    <div className="animate-in fade-in duration-200">
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-700">
                          Enter 4-Digit Verification Code
                        </label>
                        <button
                          type="button"
                          onClick={() => setOtpCode("4589")}
                          className="text-[11px] font-bold text-[#2563eb] hover:underline"
                        >
                          Auto-fill Demo OTP (4589)
                        </button>
                      </div>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="••••"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full text-center tracking-widest text-lg font-bold rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-slate-900 focus:border-purple-600 focus:bg-white focus:outline-none"
                      />
                      <p className="mt-1 text-[11px] text-slate-400">
                        OTP sent to {loginIdentifier}. Didn&apos;t receive? <span className="text-purple-700 font-semibold cursor-pointer">Resend</span>
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                  />
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod(loginMethod === "otp" ? "password" : "otp");
                    setIsOtpSent(false);
                    setLoginError("");
                  }}
                  className="font-semibold text-purple-700 hover:underline"
                >
                  {loginMethod === "otp" ? "Login with Password instead" : "Login with OTP instead"}
                </button>
                <button
                  type="button"
                  onClick={() => alert("Password reset link sent to your registered contact.")}
                  className="hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#8ee600] py-3 text-xs sm:text-sm font-black text-slate-950 shadow-md transition hover:bg-[#7ecb00] active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>{loginMethod === "otp" && !isOtpSent ? "Get OTP" : "Login to SharePal"}</span>
                )}
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-white px-3 text-[11px] text-slate-400 font-medium">
                  OR
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  login("rahul.sharma@gmail.com", "Rahul Sharma");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google (Demo Auto-Login)</span>
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                New to SharePal?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalView("signup");
                    setSignupStep(1);
                    setLoginError("");
                  }}
                  className="font-bold text-[#3d0b5e] hover:underline"
                >
                  Create an Account
                </button>
              </div>
            </form>
          )}

          {/* ================= VIEW: SIGNUP ================= */}
          {authModalView === "signup" && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              {/* Step indicator */}
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <div
                  className={`flex items-center gap-1.5 text-xs font-bold ${
                    signupStep === 1 ? "text-[#3d0b5e]" : "text-slate-400"
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-[11px] text-purple-900">
                    1
                  </span>
                  <span>Personal</span>
                </div>
                <div className="h-0.5 w-6 bg-slate-200" />
                <div
                  className={`flex items-center gap-1.5 text-xs font-bold ${
                    signupStep === 2 ? "text-[#3d0b5e]" : "text-slate-400"
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-[11px] text-purple-900">
                    2
                  </span>
                  <span>Delivery Address</span>
                </div>
                <div className="h-0.5 w-6 bg-slate-200" />
                <div
                  className={`flex items-center gap-1.5 text-xs font-bold ${
                    signupStep === 3 ? "text-[#3d0b5e]" : "text-slate-400"
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-[11px] text-purple-900">
                    3
                  </span>
                  <span>Rental KYC</span>
                </div>
              </div>

              {/* STEP 1: Personal Details */}
              {signupStep === 1 && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Min 6 characters"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Re-type password"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#3d0b5e] py-3 text-xs sm:text-sm font-black text-white shadow-md transition hover:bg-[#30064c] active:scale-95"
                  >
                    <span>Proceed to Delivery Address</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* STEP 2: Delivery Address */}
              {signupStep === 2 && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="rounded-xl bg-blue-50/80 p-3 text-[11px] text-blue-900 border border-blue-100 flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      SharePal delivers consoles and gaming accessories directly to your doorstep in Bangalore with sanitization.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Flat / House No. / Building / Society <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 301, Prestige Palms"
                      value={flatNo}
                      onChange={(e) => setFlatNo(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Street / Area / Locality <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 100ft Road, Indiranagar / Koramangala 4th Block"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Near Metro / Signal"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 focus:border-purple-600 focus:bg-white focus:outline-none font-semibold"
                      >
                        <option value="Bangalore">Bangalore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Pune">Pune</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="560034"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Address Type
                    </label>
                    <div className="flex gap-2">
                      {(["Home", "Work", "Other"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setAddressType(type)}
                          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                            addressType === type
                              ? "bg-[#3d0b5e] text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {type === "Home" && <Home className="h-3.5 w-3.5" />}
                          {type === "Work" && <Briefcase className="h-3.5 w-3.5" />}
                          {type === "Other" && <MapPin className="h-3.5 w-3.5" />}
                          <span>{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSignupStep(1)}
                      className="flex items-center justify-center gap-1 rounded-full border border-slate-200 px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#3d0b5e] py-3 text-xs sm:text-sm font-black text-white shadow-md transition hover:bg-[#30064c] active:scale-95"
                    >
                      <span>Proceed to Rental KYC</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Rental KYC & Verification */}
              {signupStep === 3 && (
                <div className="space-y-3.5 animate-in fade-in duration-200">
                  <div className="rounded-xl bg-purple-50/80 p-3 text-[11px] text-purple-900 border border-purple-100 flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#8ee600] shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Security Deposit Pre-Qualification:</strong> As high-value PS5 consoles are delivered with zero deposit, Govt ID verification ensures swift delivery without security holding amounts.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Government ID Proof Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={idType}
                        onChange={(e) => setIdType(e.target.value as any)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 focus:border-purple-600 focus:bg-white focus:outline-none font-semibold"
                      >
                        <option value="Aadhaar">Aadhaar Card</option>
                        <option value="Driving License">Driving License</option>
                        <option value="Voter ID">Voter ID</option>
                        <option value="Passport">Passport</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ID Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. XXXX-XXXX-1234"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Alternate / Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        placeholder="Friend / Family Member"
                        value={emergencyName}
                        onChange={(e) => setEmergencyName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Alternate Contact Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="9876500000"
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-purple-700 focus:ring-purple-600"
                    />
                    <label htmlFor="agreeTerms" className="text-[11px] text-slate-600 leading-snug">
                      I agree to the <span className="font-bold text-slate-800">SharePal Terms of Service</span>, Zero-Deposit Rental Policy, and doorstep quality verification agreement.
                    </label>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSignupStep(2)}
                      className="flex items-center justify-center gap-1 rounded-full border border-slate-200 px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#8ee600] py-3 text-xs sm:text-sm font-black text-slate-950 shadow-md transition hover:bg-[#7ecb00] active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <span>Complete Registration</span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-2 text-center text-xs text-slate-500">
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalView("login");
                    setLoginError("");
                  }}
                  className="font-bold text-[#3d0b5e] hover:underline"
                >
                  Login Here
                </button>
              </div>
            </form>
          )}

          {/* ================= VIEW: PROFILE ================= */}
          {authModalView === "profile" && user && (
            <div className="space-y-4">
              <div className="flex items-center gap-3.5 rounded-2xl bg-purple-50 p-4 border border-purple-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3d0b5e] text-base font-black text-white shadow-sm">
                  {user.fullName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{user.fullName}</h3>
                  <p className="text-xs text-slate-500">{user.email} • +91 {user.phone}</p>
                  <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full w-fit">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Zero Deposit KYC Verified</span>
                  </div>
                </div>
              </div>

              {/* Saved Delivery Address */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <MapPin className="h-4 w-4 text-purple-700" />
                    <span>Saved Delivery Address ({user.address.addressType})</span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-800">
                  {user.address.flatNo}, {user.address.street}
                </p>
                {user.address.landmark && (
                  <p className="text-[11px] text-slate-500">Landmark: {user.address.landmark}</p>
                )}
                <p className="text-xs text-slate-600 font-medium">
                  {user.address.city} – {user.address.pincode}
                </p>
              </div>

              {/* Rental KYC Information */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>Verification Status</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">ID Type</span>
                    <span className="font-semibold text-slate-800">{user.kyc.idType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">ID Number</span>
                    <span className="font-semibold text-slate-800">{user.kyc.idNumber}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={closeAuthModal}
                  className="flex-1 rounded-full bg-[#8ee600] py-2.5 text-xs font-black text-slate-950 shadow-sm transition hover:bg-[#7ecb00]"
                >
                  Start Renting Gadgets
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-100 transition"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
