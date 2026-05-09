"use client";

import { useState } from 'react'
import { Sidebar } from '@/components/kadep/Sidebar'

interface DashboardLayoutProps {
  title: string
  subtitle?: string
  userName: string
  jabatan: string
  children: React.ReactNode
}

export function DashboardLayout({ title, subtitle, userName, jabatan, children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — always visible on md+, drawer on mobile */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-200 md:relative md:translate-x-0 md:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar userName={userName} jabatan={jabatan} onClose={() => setSidebarOpen(false)} />
      </div>

      <main className="flex-1 min-w-0 overflow-y-auto px-4 md:px-8 py-5 md:py-7 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden shrink-0 p-2 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Buka menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="min-w-0">
              <h1 className="text-lg md:text-xl font-bold text-slate-800 truncate">{title}</h1>
              {subtitle && <p className="text-xs md:text-sm text-slate-500 mt-0.5 truncate">{subtitle}</p>}
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}
