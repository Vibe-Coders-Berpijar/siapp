"use client";

import { useState } from 'react'
import { DashboardLayout } from '@/components/kadep/DashboardLayout'
import { DosenTable, type Dosen } from '@/components/kadep/DosenTable'

const jabatanColor: Record<string, string> = {
  'Guru Besar': 'bg-purple-100 text-purple-700',
  'Lektor Kepala': 'bg-blue-100 text-blue-700',
  'Lektor': 'bg-slate-100 text-slate-600',
  'Asisten Ahli': 'bg-emerald-100 text-emerald-700',
}

const summaryDef = [
  { label: 'Guru Besar',    key: 'Guru Besar',    color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { label: 'Lektor Kepala', key: 'Lektor Kepala',  color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { label: 'Lektor',        key: 'Lektor',         color: 'bg-slate-50 border-slate-200 text-slate-700' },
  { label: 'Asisten Ahli',  key: 'Asisten Ahli',   color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
]

interface Props {
  initialDosens: Dosen[]
  userName: string
  jabatan: string
}

export default function KepegawaianClient({ initialDosens, userName, jabatan }: Props) {
  const [dosens, setDosens] = useState<Dosen[]>(initialDosens)

  return (
    <DashboardLayout
      title="Kepegawaian"
      subtitle="Data dan performa seluruh dosen departemen"
      userName={userName}
      jabatan={jabatan}
    >
      <div className="flex gap-4 flex-wrap">
        {summaryDef.map(s => (
          <div key={s.label} className={`flex-1 min-w-[140px] rounded-2xl p-5 border ${s.color} bg-white shadow-sm`}>
            <p className="text-xs font-medium uppercase tracking-wide opacity-70 mb-1">{s.label}</p>
            <p className="text-3xl font-bold">{dosens.filter(d => d.jabatan === s.key).length}</p>
          </div>
        ))}
        <div className="flex-1 min-w-[140px] rounded-2xl p-5 border bg-slate-800 border-slate-700 text-white shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide opacity-70 mb-1">Total Dosen</p>
          <p className="text-3xl font-bold">{dosens.length}</p>
        </div>
      </div>

      <DosenTable dosens={dosens} onChange={setDosens} />

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Profil Singkat Dosen</p>
        <div className="grid grid-cols-2 gap-3">
          {dosens.map(d => (
            <div key={d.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm shrink-0">
                {d.nama.split(' ').slice(-1)[0][0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{d.nama}</p>
                <p className="text-xs text-slate-400">{d.nidn}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${jabatanColor[d.jabatan] ?? 'bg-gray-100 text-gray-600'}`}>
                {d.jabatan.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
