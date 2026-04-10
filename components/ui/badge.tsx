import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "accent"
  | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:  "bg-surface-2 text-foreground border-border",
  primary:  "bg-primary-light text-primary border-primary/20",
  success:  "bg-success-light text-success border-success/20",
  warning:  "bg-warning-light text-warning border-warning/20",
  error:    "bg-error-light text-error border-error/20",
  accent:   "bg-accent-light text-accent border-accent/20",
  outline:  "bg-transparent text-foreground border-border",
};

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium",
        "rounded-full border whitespace-nowrap",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/** Map BookingStatus → Badge variant */
export function bookingStatusBadge(status: string) {
  const map: Record<string, BadgeVariant> = {
    PENDING:    "warning",
    CONFIRMED:  "success",
    CANCELLED:  "error",
    COMPLETED:  "primary",
    NO_SHOW:    "default",
  };
  const labels: Record<string, string> = {
    PENDING:    "Pending",
    CONFIRMED:  "Confirmed",
    CANCELLED:  "Cancelled",
    COMPLETED:  "Completed",
    NO_SHOW:    "No Show",
  };
  return { variant: map[status] ?? "default", label: labels[status] ?? status };
}

/** Map PaymentStatus → Badge variant */
export function paymentStatusBadge(status: string) {
  const map: Record<string, BadgeVariant> = {
    PENDING:                "warning",
    AWAITING_CONFIRMATION:  "accent",
    PAID:                   "success",
    REFUNDED:               "default",
    FAILED:                 "error",
  };
  const labels: Record<string, string> = {
    PENDING:                "Pending",
    AWAITING_CONFIRMATION:  "Awaiting Confirmation",
    PAID:                   "Paid",
    REFUNDED:               "Refunded",
    FAILED:                 "Failed",
  };
  return { variant: map[status] ?? "default", label: labels[status] ?? status };
}
