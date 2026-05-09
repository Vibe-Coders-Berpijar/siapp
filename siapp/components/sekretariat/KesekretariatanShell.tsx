"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";

export function KesekretariatanShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0D1B2A]">
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-200 md:relative md:translate-x-0 md:z-auto ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar onClose={() => setOpen(false)} />
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-6">
        {/* Mobile header bar */}
        <div className="flex items-center gap-3 mb-4 md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg text-white/50 hover:bg-white/10 transition-colors"
            aria-label="Buka menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <p className="text-sm font-semibold text-white">Sekretariat DPP UGM</p>
        </div>
        {children}
      </main>
    </div>
  );
}
