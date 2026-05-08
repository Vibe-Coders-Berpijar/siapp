"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { tridharmaData } from '@/lib/mock-data-kadep'

export function TridharmaChart() {
  return (
    <div className="rounded-2xl p-5 bg-white border border-slate-100 shadow-sm">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Aktivitas Tridharma — 12 Bulan</p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={tridharmaData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="pendidikan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="penelitian" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="pkm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="pendidikan" name="Pendidikan" stroke="#3b82f6" strokeWidth={2} fill="url(#pendidikan)" />
          <Area type="monotone" dataKey="penelitian" name="Penelitian" stroke="#8b5cf6" strokeWidth={2} fill="url(#penelitian)" />
          <Area type="monotone" dataKey="pkm" name="PkM" stroke="#10b981" strokeWidth={2} fill="url(#pkm)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
