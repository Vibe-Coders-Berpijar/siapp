"use client";

import { useState } from 'react'
import { dosenData } from '@/lib/mock-data-kadep'
import { Modal, Field, inputCls, selectCls } from '@/components/shared/Modal'
import { useToast } from '@/components/shared/Toast'

interface Criterion { kode: string; label: string; score: number }

type Severity = 'Tinggi' | 'Sedang'

interface Insight {
  id: string
  kriteria: string
  pesan: string
  severity: Severity
  aksi: string
}

interface ActionPlan {
  insightId: string
  kriteria: string
  uraian: string
  pic: string
  targetTanggal: string
}

type TLModal = { insightId: string; kriteria: string } | null

function deriveInsights(criteria: Criterion[]): Insight[] {
  const insights: Insight[] = []
  for (const c of criteria) {
    if (c.score < 60) {
      insights.push({
        id: c.kode,
        kriteria: `${c.kode} — ${c.label}`,
        pesan: `Skor ${c.kode} kritis di ${c.score}% — di bawah ambang batas akreditasi minimum`,
        severity: 'Tinggi',
        aksi: `Susun rencana perbaikan ${c.label} dengan target kenaikan ≥15% sebelum visitasi`,
      })
    } else if (c.score < 75) {
      insights.push({
        id: c.kode,
        kriteria: `${c.kode} — ${c.label}`,
        pesan: `Skor ${c.kode} sebesar ${c.score}% — perlu perhatian sebelum batas aman 80%`,
        severity: 'Sedang',
        aksi: `Identifikasi gap pada ${c.label} dan jadwalkan tindak lanjut dalam 30 hari`,
      })
    }
  }
  return insights.sort((a, b) => {
    if (a.severity !== b.severity) return a.severity === 'Tinggi' ? -1 : 1
    const sa = criteria.find(c => c.kode === a.id)?.score ?? 100
    const sb = criteria.find(c => c.kode === b.id)?.score ?? 100
    return sa - sb
  })
}

const severityStyle: Record<Severity, { badge: string; borderColor: string }> = {
  Tinggi: { badge: 'bg-red-100 text-red-700', borderColor: '#ef4444' },
  Sedang: { badge: 'bg-amber-100 text-amber-700', borderColor: '#f59e0b' },
}

interface Props { criteria: Criterion[] }

export function AiInsightPanel({ criteria }: Props) {
  const [dismissed, setDismissed] = useState<string[]>([])
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([])
  const [tlModal, setTlModal] = useState<TLModal>(null)
  const [tlForm, setTlForm] = useState({ uraian: '', pic: '', targetTanggal: '' })
  const { show, node } = useToast()

  const allInsights = deriveInsights(criteria)
  const visible = allInsights.filter(i => !dismissed.includes(i.id))

  function openTL(insight: Insight) {
    setTlModal({ insightId: insight.id, kriteria: insight.kriteria })
    setTlForm({ uraian: '', pic: '', targetTanggal: '' })
  }

  function handleTLSave() {
    if (!tlModal) return
    if (!tlForm.uraian.trim()) { show('Uraian tindakan wajib diisi', 'info'); return }
    if (!tlForm.pic) { show('PIC wajib dipilih', 'info'); return }
    if (!tlForm.targetTanggal) { show('Target tanggal wajib diisi', 'info'); return }
    setActionPlans(prev => [...prev, {
      insightId: tlModal.insightId,
      kriteria: tlModal.kriteria,
      uraian: tlForm.uraian,
      pic: tlForm.pic,
      targetTanggal: tlForm.targetTanggal,
    }])
    setDismissed(d => [...d, tlModal.insightId])
    show(`Tindak lanjut ${tlModal.insightId} disimpan`, 'success')
    setTlModal(null)
  }

  return (
    <div className="rounded-2xl p-5 bg-white border border-slate-100 shadow-sm">
      {node}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">AI Insight</p>
          <span className="text-[10px] bg-violet-100 text-violet-700 font-semibold px-2 py-0.5 rounded-full">Otomatis</span>
          {dismissed.length > 0 && (
            <button onClick={() => setDismissed([])} className="text-[10px] text-slate-400 hover:text-slate-600 underline">
              Reset ({dismissed.length} disembunyikan)
            </button>
          )}
        </div>
        <p className="text-[10px] text-slate-400">{allInsights.length} indikator butuh perhatian</p>
      </div>

      {visible.length === 0 && (
        <p className="text-sm text-slate-400 text-center py-6">
          {allInsights.length === 0
            ? 'Semua kriteria dalam kondisi baik (≥75%).'
            : 'Semua peringatan disembunyikan atau sudah ditindaklanjuti.'}
        </p>
      )}

      <div className="space-y-3">
        {visible.map(insight => {
          const style = severityStyle[insight.severity]
          return (
            <div key={insight.id} className="rounded-xl p-3 pl-4"
              style={{ background: '#fafafa', border: '1px solid #f1f5f9', borderLeftColor: style.borderColor, borderLeftWidth: 3 }}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${style.badge}`}>{insight.severity}</span>
                    <span className="text-xs font-semibold text-slate-700">{insight.kriteria}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-snug">{insight.pesan}</p>
                  <p className="text-xs text-slate-400 mt-1">→ {insight.aksi}</p>
                </div>
                <button onClick={() => setDismissed(d => [...d, insight.id])}
                  className="text-slate-300 hover:text-slate-500 text-sm shrink-0">✕</button>
              </div>
              <div className="mt-2">
                <button
                  onClick={() => openTL(insight)}
                  className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors">
                  Tindak Lanjut
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {actionPlans.length > 0 && (
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Rencana Tindak Lanjut ({actionPlans.length})
          </p>
          <div className="space-y-2">
            {actionPlans.map((ap, i) => (
              <div key={i} className="rounded-xl p-3 bg-blue-50 border border-blue-100 text-xs">
                <p className="font-semibold text-blue-800">{ap.kriteria}</p>
                <p className="text-blue-700 mt-0.5">{ap.uraian}</p>
                <p className="text-blue-500 mt-0.5">PIC: {ap.pic} · Target: {ap.targetTanggal}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tlModal && (
        <Modal
          title={`Rencana Tindak Lanjut — ${tlModal.kriteria}`}
          onClose={() => setTlModal(null)}
          onSave={handleTLSave}
          saveLabel="Simpan Rencana"
        >
          <Field label="Uraian Tindakan *">
            <textarea
              rows={3}
              value={tlForm.uraian}
              onChange={e => setTlForm(p => ({ ...p, uraian: e.target.value }))}
              placeholder="Deskripsikan rencana tindak lanjut..."
              className={`${inputCls} resize-none`}
            />
          </Field>
          <Field label="PIC (Penanggung Jawab) *">
            <select
              className={selectCls}
              value={tlForm.pic}
              onChange={e => setTlForm(p => ({ ...p, pic: e.target.value }))}
            >
              <option value="">— Pilih Dosen —</option>
              {dosenData.map(d => (
                <option key={d.id} value={d.nama}>{d.nama}</option>
              ))}
            </select>
          </Field>
          <Field label="Target Tanggal *">
            <input
              type="date"
              className={inputCls}
              value={tlForm.targetTanggal}
              onChange={e => setTlForm(p => ({ ...p, targetTanggal: e.target.value }))}
            />
          </Field>
        </Modal>
      )}
    </div>
  )
}
