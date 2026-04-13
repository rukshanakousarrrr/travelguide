"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Users, Mail, BookOpen, DollarSign } from "lucide-react";
import { formatPrice, getInitials } from "@/lib/utils";

type CustomerRow = {
  id:         string;
  name:       string | null;
  email:      string | null;
  createdAt:  Date;
  bookingCount: number;
  totalSpent:   number;
  lastBooking:  string | null;
};

export function CustomersClient({ customers }: { customers: CustomerRow[] }) {
  const [query, setQuery] = useState("");

  const filtered = customers.filter((c) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111]">Customers</h1>
        <p className="text-sm text-[#7A746D] mt-0.5">{customers.length} registered customer{customers.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: customers.length,                              icon: Users      },
          { label: "With Bookings",   value: customers.filter((c) => c.bookingCount > 0).length, icon: BookOpen   },
          { label: "Total Bookings",  value: customers.reduce((s, c) => s + c.bookingCount, 0),  icon: BookOpen   },
          { label: "Total Revenue",   value: formatPrice(customers.reduce((s, c) => s + c.totalSpent, 0), "USD"), icon: DollarSign },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-xl border border-[#E4E0D9] p-4 shadow-(--shadow-card)">
            <div className="flex items-center gap-2 mb-1">
              <Icon className="size-4 text-[#C41230]" />
              <span className="text-xs text-[#7A746D] font-medium">{label}</span>
            </div>
            <p className="text-xl font-bold text-[#111]">{value}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-[#E4E0D9] shadow-(--shadow-card) overflow-hidden">
        {/* Search toolbar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E4E0D9]">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#A8A29E]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email…"
              className="w-full h-9 pl-8 pr-3 rounded-lg border border-[#E4E0D9] text-sm text-[#111] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230] transition-colors"
            />
          </div>
          <p className="text-xs text-[#7A746D] ml-auto">{filtered.length} customers</p>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Users className="size-8 text-[#E4E0D9] mx-auto mb-3" />
            <p className="text-sm text-[#A8A29E]">No customers found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E4E0D9] bg-[#F8F7F5]">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#7A746D] uppercase tracking-wide">Customer</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#7A746D] uppercase tracking-wide">Bookings</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#7A746D] uppercase tracking-wide">Total Spent</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#7A746D] uppercase tracking-wide">Last Booking</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#7A746D] uppercase tracking-wide">Joined</th>
                  <th className="px-5 py-3 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E0D9]">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F8F7F5] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-[#1B2847] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {getInitials(c.name ?? c.email ?? "?")}
                        </div>
                        <div>
                          <p className="font-medium text-[#111]">{c.name ?? <span className="text-[#A8A29E]">—</span>}</p>
                          <p className="text-xs text-[#7A746D] flex items-center gap-1">
                            <Mail className="size-3" />{c.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-[#111]">
                      {c.bookingCount > 0
                        ? <span className="inline-flex items-center gap-1"><BookOpen className="size-3.5 text-[#C41230]" />{c.bookingCount}</span>
                        : <span className="text-[#A8A29E]">—</span>}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-[#111]">
                      {c.totalSpent > 0 ? formatPrice(c.totalSpent, "USD") : <span className="text-[#A8A29E]">—</span>}
                    </td>
                    <td className="px-5 py-3.5 text-[#7A746D] text-sm">
                      {c.lastBooking
                        ? new Date(c.lastBooking).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : <span className="text-[#A8A29E]">—</span>}
                    </td>
                    <td className="px-5 py-3.5 text-[#7A746D] text-sm">
                      {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/admin/customers/${c.id}`}
                        className="text-xs font-semibold text-[#C41230] hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
