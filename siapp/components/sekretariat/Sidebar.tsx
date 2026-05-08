"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  CalendarDays,
  LogOut,
  GraduationCap,
  ChevronRight,
  BookOpen,
  FileText,
  ClipboardList,
  Target,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BASE = "/kesekretariatan";

const NAV_SECTIONS = [
  {
    label: "Utama",
    items: [
      { href: BASE,                    label: "Dashboard",      icon: LayoutDashboard, exact: true  },
      { href: `${BASE}/persuratan`,    label: "Persuratan",     icon: Mail,            exact: false },
      { href: `${BASE}/booking-ruang`, label: "Booking Ruang",  icon: CalendarDays,    exact: false },
      { href: `${BASE}/kalender`,      label: "Kalender",       icon: Calendar,        exact: false },
    ],
  },
  {
    label: "Dokumen",
    items: [
      { href: `${BASE}/notulensi`,     label: "Notulensi",      icon: ClipboardList,   exact: false },
      { href: `${BASE}/sop`,           label: "SOP",            icon: FileText,        exact: false },
    ],
  },
  {
    label: "Perencanaan",
    items: [
      { href: `${BASE}/renstra`,       label: "Renstra",        icon: Target,          exact: false },
      { href: `${BASE}/renja`,         label: "Renja",          icon: BookOpen,        exact: false },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="w-64 flex-shrink-0 h-full flex flex-col glass border-r border-white/10">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-ugm-gold/20 border border-ugm-gold/40 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-ugm-gold" />
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-tight">SIAPP</p>
          <p className="text-xs text-white/40 leading-tight">Sekretariat DPP UGM</p>
        </div>
      </div>

      {/* User badge */}
      <div className="mx-3 mt-3 px-3 py-2 rounded-xl bg-ugm-gold/10 border border-ugm-gold/20">
        <p className="text-xs text-ugm-gold font-semibold">Sekretariat / Admin</p>
        <p className="text-xs text-white/40 mt-0.5 truncate">admin@dpp.ugm.ac.id</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {NAV_SECTIONS.map(section => (
          <div key={section.label}>
            <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest px-3 mb-1">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon, exact }) => {
                const active = isActive(href, exact);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group",
                      active
                        ? "bg-ugm-gold/15 text-ugm-gold border border-ugm-gold/25"
                        : "text-white/60 hover:text-white hover:bg-white/8"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 flex-shrink-0",
                        active ? "text-ugm-gold" : "text-white/40 group-hover:text-white/70"
                      )}
                    />
                    <span className="flex-1">{label}</span>
                    {active && <ChevronRight className="w-3 h-3 text-ugm-gold/60" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <a href="/" className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut className="w-4 h-4" />
          Keluar
        </a>
      </div>
    </aside>
  );
}
