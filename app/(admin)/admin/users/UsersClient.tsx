"use client";

import { useState } from "react";
import { UserPlus, Shield, User, Search } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { CreateUserModal } from "./CreateUserModal";

type UserRow = {
  id:        string;
  name:      string | null;
  email:     string | null;
  role:      "ADMIN" | "CUSTOMER";
  createdAt: Date;
  _count:    { bookings: number };
};

export function UsersClient({ users }: { users: UserRow[] }) {
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = users.filter((u) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {showModal && <CreateUserModal onClose={() => setShowModal(false)} />}

      <div className="space-y-5">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#111111]">Dashboard Users</h1>
            <p className="text-sm text-[#7A746D] mt-0.5">
              Manage staff accounts that can access this dashboard.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-[#C41230] text-white text-sm font-semibold hover:bg-[#A00E25] active:scale-[0.98] transition-all shadow-sm shrink-0"
          >
            <UserPlus size={15} />
            New Account
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Users",   value: users.length,                                         color: "text-[#111111]" },
            { label: "Admins",        value: users.filter((u) => u.role === "ADMIN").length,        color: "text-[#C41230]" },
            { label: "Customers",     value: users.filter((u) => u.role === "CUSTOMER").length,     color: "text-[#1B6FA8]" },
            { label: "With Bookings", value: users.filter((u) => u._count.bookings > 0).length,     color: "text-[#15803D]" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl p-4 border border-[#E4E0D9] shadow-[var(--shadow-card)]">
              <p className="text-xs text-[#7A746D] mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="bg-white rounded-xl border border-[#E4E0D9] shadow-[var(--shadow-card)] overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E4E0D9]">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A8A29E]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users…"
                className="w-full h-9 pl-8 pr-3 rounded-lg border border-[#E4E0D9] text-sm text-[#111111] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230] transition-colors"
              />
            </div>
            <p className="text-xs text-[#7A746D] ml-auto">
              {filtered.length} {filtered.length === 1 ? "user" : "users"}
            </p>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="py-14 text-center text-[#A8A29E] text-sm">
              {query ? "No users match your search." : "No users yet."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E4E0D9] bg-[#F8F7F5]">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#7A746D] uppercase tracking-wide">User</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#7A746D] uppercase tracking-wide">Role</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#7A746D] uppercase tracking-wide">Bookings</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#7A746D] uppercase tracking-wide">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E0D9]">
                  {filtered.map((user) => (
                    <tr key={user.id} className="hover:bg-[#F8F7F5] transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="shrink-0 w-8 h-8 rounded-full bg-[#1B2847] flex items-center justify-center text-xs font-semibold text-white">
                            {getInitials(user.name ?? user.email ?? "U")}
                          </div>
                          <div>
                            <p className="font-medium text-[#111111]">{user.name ?? <span className="text-[#A8A29E]">—</span>}</p>
                            <p className="text-xs text-[#7A746D]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        {user.role === "ADMIN" ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-[#F5E6E9] text-[#C41230]">
                            <Shield size={10} />
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#1B6FA8]">
                            <User size={10} />
                            Customer
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-[#7A746D]">
                        {user._count.bookings > 0 ? (
                          <span className="font-medium text-[#111111]">{user._count.bookings}</span>
                        ) : (
                          <span className="text-[#A8A29E]">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-[#7A746D] whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
