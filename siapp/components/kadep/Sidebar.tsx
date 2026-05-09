"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/login/actions'

const navItems = [
  { href: '/dashboard/kadep', label: 'Dashboard', icon: '⊞', exact: true },
  { href: '/dashboard/kadep/kepegawaian', label: 'Kepegawaian', icon: '👥', exact: false },
  { href: '/dashboard/kadep/akreditasi', label: 'Akreditasi', icon: '🏅', exact: false },
  { href: '/dashboard/kadep/persuratan', label: 'Persuratan', icon: '📄', exact: false },
  { href: '/dashboard/kadep/keuangan', label: 'Keuangan', icon: '💰', exact: false },
]

interface SidebarProps {
  userName: string
  jabatan: string
  onClose?: () => void
}

export function Sidebar({ userName, jabatan, onClose }: SidebarProps) {
  const pathname = usePathname()

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <aside className="w-60 shrink-0 h-screen flex flex-col bg-white border-r border-slate-100">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-100">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">S</div>
            <div>
              <p className="text-sm font-semibold text-slate-800">SIAPP</p>
              <p className="text-[10px] text-slate-400">DPP UGM</p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="md:hidden p-1 text-slate-400 hover:text-slate-600" aria-label="Tutup menu">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* User */}
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm mb-2">
          {userName.split(' ').slice(0, 2).map(w => w[0]).join('')}
        </div>
        <p className="text-sm font-medium text-slate-800 leading-tight">{userName}</p>
        <p className="text-xs text-slate-400">{jabatan}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive(item.href, item.exact) ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-100">
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <span>↩</span> Keluar
          </button>
        </form>
      </div>
    </aside>
  )
}
