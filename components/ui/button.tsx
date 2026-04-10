"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
type Size    = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?:    Size;
  loading?: boolean;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark active:scale-[0.98] shadow-sm",
  secondary:
    "bg-secondary text-white hover:bg-secondary/90 active:scale-[0.98] shadow-sm",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-surface active:scale-[0.98]",
  ghost:
    "bg-transparent text-foreground hover:bg-surface active:scale-[0.98]",
  danger:
    "bg-error text-white hover:bg-error/90 active:scale-[0.98] shadow-sm",
  accent:
    "bg-accent text-white hover:bg-accent/90 active:scale-[0.98] shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  sm:   "h-8  px-3   text-xs  gap-1.5",
  md:   "h-10 px-4   text-sm  gap-2",
  lg:   "h-12 px-6   text-base gap-2.5",
  icon: "h-10 w-10  text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", loading, disabled, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base
          "inline-flex items-center justify-center font-medium",
          "rounded-md transition-all duration-150 cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
          // Variant + size
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
