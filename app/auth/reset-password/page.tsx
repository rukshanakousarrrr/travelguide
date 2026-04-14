"use client";

import { useState, useTransition, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MapPin, ArrowRight, CheckCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { COMPANY_NAME } from "@/lib/constants";
import { resetPasswordAction } from "@/app/auth/forgot-password/actions";

function ResetPasswordForm() {
  const searchParams           = useSearchParams();
  const router                 = useRouter();
  const token                  = searchParams.get("token") ?? "";
  const email                  = searchParams.get("email") ?? "";

  const [isPending, startTransition] = useTransition();
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPw, setShowPw]   = useState(false);
  const [showCf, setShowCf]   = useState(false);

  if (!token || !email) {
    return (
      <div className="text-center">
        <p className="text-sm text-[#C41230] font-semibold mb-4">Invalid or missing reset link.</p>
        <Link href="/auth/forgot-password" className="text-sm font-semibold text-[#1B2847] hover:underline">
          Request a new one
        </Link>
      </div>
    );
  }

  function handleSubmit(formData: FormData) {
    formData.set("token", token);
    formData.set("email", email);
    setError(null);
    startTransition(async () => {
      const result = await resetPasswordAction(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/auth/login"), 2500);
      }
    });
  }

  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#C41230] mb-4 shadow-lg">
          <MapPin className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
          Set New Password
        </h1>
        <p className="text-sm text-[#7A746D] mt-1">Choose a strong password for your account.</p>
      </div>

      {success ? (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#DCFCE7] flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-[#166534]" />
            </div>
          </div>
          <h2 className="text-lg font-bold text-[#111] mb-2">Password updated!</h2>
          <p className="text-sm text-[#7A746D]">Redirecting you to sign in…</p>
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-6 p-4 bg-[#FEE2E2] text-[#C41230] text-sm rounded-lg border border-[#FCA5A5]/50">
              {error}
              {error.includes("expired") && (
                <Link href="/auth/forgot-password" className="block mt-2 font-semibold underline">
                  Request a new link
                </Link>
              )}
            </div>
          )}

          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#111] mb-1.5">New Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  required
                  minLength={8}
                  placeholder="Min. 8 characters"
                  className="w-full h-12 px-4 pr-11 rounded-lg border border-[#E4E0D9] text-[#111] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#111] transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111] mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  type={showCf ? "text" : "password"}
                  name="confirm"
                  required
                  minLength={8}
                  placeholder="Repeat your password"
                  className="w-full h-12 px-4 pr-11 rounded-lg border border-[#E4E0D9] text-[#111] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowCf((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#111] transition-colors"
                >
                  {showCf ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-[#C41230] hover:bg-[#A00F27] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Updating…</>
                ) : (
                  <>Update Password <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F8F7F5] via-white to-[#F1EFE9] px-4 pt-24 pb-16">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-150 h-150 rounded-full bg-[#C41230]/5" />
        <div className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full bg-[#1B2847]/5" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12),0_0_0_1px_rgba(228,224,217,0.8)] overflow-hidden">
          <div className="h-1.5 bg-linear-to-r from-[#C41230] via-[#C8A84B] to-[#1B2847]" />
          <div className="p-8">
            <Suspense>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>

        <p className="text-center text-xs text-[#A8A29E] mt-5">
          © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
