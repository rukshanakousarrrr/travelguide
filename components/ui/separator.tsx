import { cn } from "@/lib/utils";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?:       string;
}

export function Separator({ orientation = "horizontal", label, className, ...props }: SeparatorProps) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)} {...props}>
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted whitespace-nowrap">{label}</span>
        <div className="flex-1 h-px bg-border" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        "bg-border",
        className
      )}
      {...props}
    />
  );
}
