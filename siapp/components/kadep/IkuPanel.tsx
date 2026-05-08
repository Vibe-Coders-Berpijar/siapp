"use client";

import { useState } from 'react'
import { ikuData } from '@/lib/mock-data-kadep'
import { useToast } from '@/components/shared/Toast'

interface Iku {
  kode: string
  label: string
  target: number
  actual: number
  unit: string
}

export function IkuPanel() {
  const [ikus, setIkus] = useState<Iku[]>(ikuData)
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const { show, node } = useToast()

  function startEdit(iku: Iku) {
    setEditing(iku.kode)
    setDraft(String(iku.actual))
  }

  function commitEdit(kode: string, target: number) {
    const val = Number(draft)
    if (isNaN(val) || val < 0) { show('Nilai tidak valid', 'error'); return }
    if (val > target * 2) { show('Nilai melebihi 2× target — periksa kembali', 'error'); return }
    setIkus(prev => prev.map(i => i.kode === kode ? { ...i, actual: val } : i))
    setEditing(null)
    show(`${kode} diperbarui ke ${val}`, 'success')
  }

  const onTrack = ikus.filter(i => i.actual / i.target >= 0.9).length
  const atRisk = ikus.filter(i => { const r = i.actual / i.target; return r >= 0.6 && r < 0.9 }).length
  const critical = ikus.filter(i => i.actual / i.target < 0.6).length

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      {node}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">IKU PT — Permendikbud 210/M/2023</p>
          <p className="text-xs text-slate-400 mt-0.5">Klik nilai aktual untuk edit · 8 Indikator Kinerja Utama</p>
        </div>
        <div className="flex gap-1.5 text-xs font-medium flex-wrap">
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{onTrack} On Track</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{atRisk} At Risk</span>
          <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700">{critical} Kritis</span>
        </div>
      </div>

      <div className="space-y-3">
        {ikus.map(iku => {
          const pct = Math.min((iku.actual / iku.target) * 100, 100)
          const ratio = iku.actual / iku.target
          const barColor = ratio >= 0.9 ? 'bg-emerald-500' : ratio >= 0.6 ? 'bg-amber-400' : 'bg-red-500'
          const textColor = ratio >= 0.9 ? 'text-emerald-700' : ratio >= 0.6 ? 'text-amber-700' : 'text-red-600'
          const isEditing = editing === iku.kode

          return (
            <div key={iku.kode} className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 w-9 shrink-0">{iku.kode}</span>
              <span className="text-xs text-slate-600 flex-1 min-w-0 truncate" title={iku.label}>{iku.label}</span>
              <div className="w-20 shrink-0 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%`, transition: 'width 0.4s ease' }} />
              </div>
              <div className={`flex items-center gap-1 w-20 justify-end shrink-0 ${textColor}`}>
                {isEditing ? (
                  <input
                    autoFocus
                    type="number"
                    min={0}
                    className="w-14 text-xs font-bold text-right border border-blue-400 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    onBlur={() => commitEdit(iku.kode, iku.target)}
                    onKeyDown={e => { if (e.key === 'Enter') commitEdit(iku.kode, iku.target); if (e.key === 'Escape') setEditing(null) }}
                  />
                ) : (
                  <button
                    onClick={() => startEdit(iku)}
                    className={`text-xs font-bold hover:underline cursor-pointer ${textColor}`}
                    title="Klik untuk edit"
                  >
                    {iku.actual}/{iku.target} {iku.unit}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
