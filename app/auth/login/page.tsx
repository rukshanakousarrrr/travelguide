"use client";

import { googleSignInAction } from "./actions";
import { COMPANY_NAME } from "@/lib/constants";
import { MapPin } from "lucide-react";
import { useState } from "react";

export default function ClientLoginPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F7F5] via-white to-[#F1EFE9] px-4 pt-24 pb-16">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#C41230]/5" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1B2847]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#E4E0D9]/60" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12),0_0_0_1px_rgba(228,224,217,0.8)] overflow-hidden">
          {/* Header stripe */}
          <div className="h-1.5 bg-gradient-to-r from-[#C41230] via-[#C8A84B] to-[#1B2847]" />

          <div className="p-8">
            {/* Logo / company */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#C41230] mb-4 shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h1
                className="text-2xl font-bold text-[#111111]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Welcome Back
              </h1>
              <p className="text-sm text-[#7A746D] mt-1">
                Sign in to book tours and leave reviews
              </p>
            </div>

            {/* Google Sign In */}
            <form action={googleSignInAction}>
              <button
                type="submit"
                disabled={loading}
                onClick={() => setLoading(true)}
                className="w-full h-12 rounded-lg border border-[#E4E0D9] bg-white text-sm font-medium text-[#111111] hover:bg-[#F8F7F5] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-sm"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#A8A29E]/40 border-t-[#111111] rounded-full animate-spin" />
                    Redirecting…
                  </>
                ) : (
                  <>
                    {/* Google icon */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.1a6.94 6.94 0 0 1 0-4.2V7.07H2.18A11.96 11.96 0 0 0 .96 12c0 1.94.46 3.77 1.22 5.43l3.66-3.33z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.16 6.16-4.16z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-[#E4E0D9]" />
              <span className="text-xs text-[#A8A29E] font-medium">Why sign in?</span>
              <div className="flex-1 h-px bg-[#E4E0D9]" />
            </div>

            {/* Benefits */}
            <ul className="space-y-3 text-sm text-[#7A746D]">
              {[
                "Book tours and manage your reservations",
                "Leave reviews and share your experiences",
                "Save your favourite tours for later",
                "Get personalised recommendations",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-[#DCFCE7] flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            {/* Footer */}
            <p className="text-center text-xs text-[#A8A29E] mt-6">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-[#A8A29E] mt-5">
          © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
