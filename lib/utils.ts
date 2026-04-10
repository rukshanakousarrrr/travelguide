import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Generate a booking reference: JPN-YYYYMMDD-XXXXX */
export function generateBookingRef(): string {
  const date  = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand  = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `JPN-${date}-${rand}`;
}

/** Format currency */
export function formatPrice(
  amount: number | string,
  currency = "USD",
  locale  = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style:    "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

/** Format a date for display */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
): string {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}

/** Slugify a string */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Truncate text */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/** Get initials from a name */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/** Pluralize */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? `${count} ${singular}` : `${count} ${plural ?? singular + "s"}`;
}

/** Availability percentage */
export function getCapacityPercent(booked: number, max: number): number {
  if (max === 0) return 100;
  return Math.round((booked / max) * 100);
}
