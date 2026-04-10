"use client";

import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader }  from "./AdminHeader";

interface AdminShellProps {
  children: React.ReactNode;
  user: { name?: string | null; email?: string | null; image?: string | null };
}

export function AdminShell({ children, user }: AdminShellProps) {
  const [collapsed,   setCollapsed]   = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  return (
    <div className="flex h-screen bg-[#F8F7F5] overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        onToggle={() => setCollapsed((c) => !c)}
        user={user}
      />

      {/* Main content column */}
      <div className="flex flex-col flex-1 min-w-0">
        <AdminHeader
          onMobileMenuClick={() => setMobileOpen(true)}
          user={user}
        />
        <main className="flex-1 overflow-y-auto p-5 lg:p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
