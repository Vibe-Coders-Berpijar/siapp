"use client";

import { useState } from 'react'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { useToast } from '@/components/shared/Toast'

export interface ApprovalItem {
  id: number
  nomor: string
  perihal: string
  pengaju: string
  tanggal: string
  status: string
}

export function PendingApprovals({ initialApprovals }: { initialApprovals?: ApprovalItem[] }) {
  const fallback: ApprovalItem[] = []
  const [items, setItems] = useState<ApprovalItem[]>(initialApprovals ?? fallback)
  const [signed, setSigned] = useState<number[]>([])
  const { show, node } = useToast()

  function handleSign(id: number, perihal: string) {
    setSigned(s => [...s, id])
    show(`Surat ditandatangani: ${perihal.slice(0, 40)}…`, 'success')
  }

  function handleView(nomor: string) {
    show(`Membuka surat ${nomor}`, 'info')
  }

  const pending = items.filter(s => !signed.includes(s.id))

  return (
    <div className="rounded-2xl p-5 h-full bg-white border border-slate-100 shadow-sm">
      {node}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Menunggu Tanda Tangan</p>
        <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">{pending.length} surat</span>
      </div>

      {pending.length === 0 && (
        <p className="text-sm text-slate-400 text-center py-6">Tidak ada surat menunggu.</p>
      )}

      <div className="space-y-3">
        {pending.map((surat) => (
          <div key={surat.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-xs text-slate-400 font-mono">{surat.nomor}</p>
              <StatusBadge status={surat.status} size="sm" />
            </div>
            <p className="text-sm font-medium text-slate-700 leading-snug mb-1">{surat.perihal}</p>
            <p className="text-xs text-slate-400">{surat.pengaju} · {surat.tanggal}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleSign(surat.id, surat.perihal)}
                className="text-xs font-medium px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Tanda Tangani
              </button>
              <button
                onClick={() => handleView(surat.nomor)}
                className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors"
              >
                Lihat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
