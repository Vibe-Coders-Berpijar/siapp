"use client";

import { cn } from "@/lib/utils";

type Variant = "draft" | "pending" | "signed" | "confirmed" | "rejected" | "default";

const variantClasses: Record<Variant, string> = {
  draft:     "bg-white/10 text-gray-300 border-white/20",
  pending:   "bg-amber-500/20 text-amber-300 border-amber-400/30",
  signed:    "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  confirmed: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  rejected:  "bg-red-500/20 text-red-300 border-red-400/30",
  default:   "bg-white/10 text-gray-300 border-white/20",
};

const STATUS_MAP: Record<string, Variant> = {
  Draft:           "draft",
  Menunggu:        "pending",
  Ditandatangani:  "signed",
  Dikonfirmasi:    "confirmed",
  Ditolak:         "rejected",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export function Badge({ children, variant, className }: BadgeProps) {
  const v: Variant =
    variant ??
    STATUS_MAP[typeof children === "string" ? children : ""] ??
    "default";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantClasses[v],
        className
      )}
    >
      {children}
    </span>
  );
}
