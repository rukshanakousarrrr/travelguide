"use client";

import { useActionState, useState } from "react";
import { createAdminUserAction, type CreateUserState } from "./actions";
import { X, UserPlus, Eye, EyeOff } from "lucide-react";

const initial: CreateUserState = {};

export function CreateUserModal({ onClose }: { onClose: () => void }) {
  const [state, formAction, pending] = useActionState(createAdminUserAction, initial);
  const [showPassword, setShowPassword] = useState(false);

  // Auto-close on success after a short delay
  if (state.success) {
    setTimeout(onClose, 1400);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-[0_24px_64px_-12px_rgba(0,0,0,0.18)] overflow-hidden animate-fade-in">
        {/* Top stripe */}
        <div className="h-1 bg-gradient-to-r from-[#C41230] via-[#C8A84B] to-[#1B2847]" />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F5E6E9] flex items-center justify-center">
                <UserPlus className="w-4.5 h-4.5 text-[#C41230]" size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#111111]">Create Staff Account</h2>
                <p className="text-xs text-[#7A746D]">Add a new dashboard user</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#7A746D] hover:text-[#111111] hover:bg-[#F8F7F5] transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Success */}
          {state.success && (
            <div className="mb-4 flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#DCFCE7] border border-[#15803D]/20 text-[#15803D] text-sm">
              <span className="text-base">✓</span>
              {state.success}
            </div>
          )}

          {/* Error */}
          {state.error && (
            <div className="mb-4 flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#FEE2E2] border border-[#DC2626]/20 text-[#DC2626] text-sm">
              <span className="shrink-0 w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">!</span>
              {state.error}
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="cu-name" className="block text-sm font-medium text-[#111111] mb-1.5">
                Full name <span className="text-[#A8A29E] font-normal">(optional)</span>
              </label>
              <input
                id="cu-name"
                name="name"
                type="text"
                placeholder="Jane Smith"
                className="w-full h-10 px-3 rounded-lg border border-[#E4E0D9] text-sm text-[#111111] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="cu-email" className="block text-sm font-medium text-[#111111] mb-1.5">
                Email address <span className="text-[#C41230]">*</span>
              </label>
              <input
                id="cu-email"
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
                className="w-full h-10 px-3 rounded-lg border border-[#E4E0D9] text-sm text-[#111111] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="cu-password" className="block text-sm font-medium text-[#111111] mb-1.5">
                Temporary password <span className="text-[#C41230]">*</span>
              </label>
              <div className="relative">
                <input
                  id="cu-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="Min. 8 characters"
                  className="w-full h-10 px-3 pr-10 rounded-lg border border-[#E4E0D9] text-sm text-[#111111] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center px-2.5 text-[#7A746D] hover:text-[#111111] transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Role — always ADMIN for dashboard accounts */}
            <input type="hidden" name="role" value="ADMIN" />
            <div className="px-3.5 py-2.5 rounded-lg bg-[#F8F7F5] border border-[#E4E0D9] text-xs text-[#7A746D]">
              This account will have <span className="font-semibold text-[#111111]">full dashboard access</span>. They can log in at <span className="font-mono text-[#C41230]">/admin/login</span>.
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-10 rounded-lg border border-[#E4E0D9] text-sm font-medium text-[#7A746D] hover:bg-[#F8F7F5] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pending || !!state.success}
                className="flex-1 h-10 rounded-lg bg-[#C41230] text-white text-sm font-semibold hover:bg-[#A00E25] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {pending ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating…
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
