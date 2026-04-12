"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/(public)/contact/actions";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const SUBJECTS = [
  "General enquiry",
  "Tour booking",
  "Private / custom tour",
  "Cancellation or refund",
  "Feedback",
  "Other",
];

const initial: ContactFormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, initial);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#DCFCE7] flex items-center justify-center">
          <CheckCircle className="size-8 text-[#15803D]" />
        </div>
        <h3 className="text-xl font-bold font-display text-[#111]">Message sent!</h3>
        <p className="text-[#545454] text-sm max-w-sm leading-relaxed">{state.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-sm font-semibold text-[#C41230] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">

      {/* Error banner */}
      {state.status === "error" && (
        <div className="flex items-start gap-3 bg-[#FEE2E2] border border-[#FCA5A5] rounded-xl px-4 py-3">
          <AlertCircle className="size-4 text-[#C41230] shrink-0 mt-0.5" />
          <p className="text-sm text-[#C41230] font-medium">{state.message}</p>
        </div>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#7A746D]">
            Full name <span className="text-[#C41230]">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Yuki Tanaka"
            className="w-full rounded-xl border border-[#E4E0D9] bg-[#F8F7F5] px-4 py-3 text-sm text-[#111] placeholder-[#B0AAA3] focus:outline-none focus:ring-2 focus:ring-[#C41230]/30 focus:border-[#C41230] transition"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#7A746D]">
            Email <span className="text-[#C41230]">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-[#E4E0D9] bg-[#F8F7F5] px-4 py-3 text-sm text-[#111] placeholder-[#B0AAA3] focus:outline-none focus:ring-2 focus:ring-[#C41230]/30 focus:border-[#C41230] transition"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-widest text-[#7A746D]">
          Subject
        </label>
        <select
          name="subject"
          defaultValue=""
          className="w-full rounded-xl border border-[#E4E0D9] bg-[#F8F7F5] px-4 py-3 text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#C41230]/30 focus:border-[#C41230] transition appearance-none"
        >
          <option value="" disabled>Select a topic…</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-widest text-[#7A746D]">
          Message <span className="text-[#C41230]">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us about your dream Japan experience, your travel dates, group size, or any questions you have…"
          className="w-full rounded-xl border border-[#E4E0D9] bg-[#F8F7F5] px-4 py-3 text-sm text-[#111] placeholder-[#B0AAA3] focus:outline-none focus:ring-2 focus:ring-[#C41230]/30 focus:border-[#C41230] transition resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="w-full flex items-center justify-center gap-2 bg-[#C41230] hover:bg-[#a50f28] disabled:opacity-60 text-white font-bold rounded-xl px-6 py-3.5 text-sm transition-colors"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" />
            Send message
          </>
        )}
      </button>

      <p className="text-center text-xs text-[#A8A29E]">
        We typically reply within 24 hours. No spam, ever.
      </p>
    </form>
  );
}
