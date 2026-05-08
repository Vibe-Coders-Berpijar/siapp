import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  sub?: string;
  accent?: "gold" | "blue" | "green" | "amber" | "default";
  className?: string;
}

const accentClasses = {
  gold:    "text-ugm-gold",
  blue:    "text-blue-400",
  green:   "text-emerald-400",
  amber:   "text-amber-400",
  default: "text-white/70",
};

const accentBg = {
  gold:    "bg-ugm-gold/15 border-ugm-gold/25",
  blue:    "bg-blue-400/15 border-blue-400/25",
  green:   "bg-emerald-400/15 border-emerald-400/25",
  amber:   "bg-amber-400/15 border-amber-400/25",
  default: "bg-white/8 border-white/15",
};

export function StatCard({
  label,
  value,
  icon: Icon,
  sub,
  accent = "default",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-5 flex items-start gap-4 transition-all hover:bg-white/10",
        className
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border",
          accentBg[accent]
        )}
      >
        <Icon className={cn("w-5 h-5", accentClasses[accent])} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-white/50 font-medium uppercase tracking-wide truncate">
          {label}
        </p>
        <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
        {sub && <p className="text-xs text-white/40 mt-0.5 truncate">{sub}</p>}
      </div>
    </div>
  );
}
