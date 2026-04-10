import Link from "next/link";
import { ShieldX } from "lucide-react";
import { COMPANY_NAME } from "@/lib/constants";

const messages: Record<string, string> = {
  Configuration:     "There is a problem with the server configuration.",
  AccessDenied:      "You do not have permission to access this page.",
  Verification:      "The verification link may have been used or has expired.",
  CredentialsSignin: "Invalid email or password.",
  Default:           "An unexpected error occurred during authentication.",
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error = "Default" } = await searchParams;
  const message = messages[error] ?? messages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7F5] px-4">
      <div className="w-full max-w-sm text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FEE2E2] mb-5">
          <ShieldX className="w-8 h-8 text-[#DC2626]" />
        </div>
        <h1 className="text-2xl font-bold text-[#111111] mb-2">Authentication Error</h1>
        <p className="text-[#7A746D] text-sm mb-6">{message}</p>
        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-[#1B2847] text-white text-sm font-medium hover:bg-[#1B2847]/90 transition-colors"
        >
          Back to Login
        </Link>
        <p className="text-xs text-[#A8A29E] mt-4">{COMPANY_NAME} · Admin Portal</p>
      </div>
    </div>
  );
}
