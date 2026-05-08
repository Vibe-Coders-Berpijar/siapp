"use client";

import { Sidebar } from '@/components/kadep/Sidebar'

interface DashboardLayoutProps {
  title: string
  subtitle?: string
  userName: string
  jabatan: string
  children: React.ReactNode
}

export function DashboardLayout({ title, subtitle, userName, jabatan, children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar userName={userName} jabatan={jabatan} />
      <main className="flex-1 overflow-y-auto px-8 py-7 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}
