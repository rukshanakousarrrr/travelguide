"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY_NAME, NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparent]);

  const isWhite = !transparent || scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isWhite
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              isWhite ? "bg-primary" : "bg-white/20 backdrop-blur-sm"
            )}>
              <MapPin className={cn("size-4", isWhite ? "text-white" : "text-white")} />
            </div>
            <span className={cn(
              "font-display font-semibold text-lg tracking-tight",
              isWhite ? "text-foreground" : "text-white"
            )}>
              {COMPANY_NAME}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150",
                  isWhite
                    ? "text-foreground hover:bg-surface hover:text-primary"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className={cn(
                "text-sm font-medium transition-colors",
                isWhite ? "text-muted hover:text-foreground" : "text-white/80 hover:text-white"
              )}
            >
              Sign In
            </Link>
            <Link href="/tours">
              <Button
                size="sm"
                className={cn(
                  !isWhite && "bg-accent text-secondary hover:bg-accent/90"
                )}
              >
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              isWhite ? "text-foreground hover:bg-surface" : "text-white hover:bg-white/10"
            )}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border animate-fade-in">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2.5 text-sm font-medium text-foreground rounded-lg hover:bg-surface"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-1 border-t border-border flex flex-col gap-2">
              <Link href="/auth/login" className="px-4 py-2.5 text-sm text-muted hover:text-foreground text-center">Sign In</Link>
              <Link href="/tours" onClick={() => setMenuOpen(false)}>
                <Button size="sm" className="w-full">Book Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
