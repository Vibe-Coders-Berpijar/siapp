"use client";

import { useState } from 'react'
import { Modal, Field, inputCls } from '@/components/shared/Modal'
import { useToast } from '@/components/shared/Toast'
import { computeCriterionScore, effectiveCurrent } from '@/lib/mock-data-kadep'
import type { CriterionDetail, CriterionMetric, EvidenceDoc, MetricEntry, MetricTemplate } from '@/lib/mock-data-kadep'

interface Props {
  details: CriterionDetail[]
  onChange: (next: CriterionDetail[]) => void
}

type UpdateModal = { kode: string; metric: CriterionMetric } | null
type DocModal = { kode: string; label: string } | null

const TEMPLATE_FIELDS: Record<MetricTemplate, { f1: string; f2: string; f3: string }> = {
  publication: { f1: 'Nama Dosen', f2: 'Judul Artikel / Karya', f3: 'URL / DOI / ISSN' },
  person:      { f1: 'Nama Dosen', f2: 'No. SK / Sertifikat / ID', f3: 'Keterangan / Institusi' },
  document:    { f1: 'Nama Dokumen', f2: 'Nomor / Referensi', f3: 'Keterangan' },
  contract:    { f1: 'Judul / Nama Proyek', f2: 'No. Kontrak / SK', f3: 'Funder / Nilai' },
  manual:      { f1: 'Uraian', f2: 'Sumber Data', f3: 'Catatan' },
}

function computeFromEntries(entries: MetricEntry[], ac: { mode: string; denom?: number }): number {
  const n = entries.length
  const d = ac.denom ?? 1
  if (ac.mode === 'count') return n
  if (ac.mode === 'ratio') return Math.round(n / d * 100) / 100
  if (ac.mode === 'percent') return Math.round(n / d * 1000) / 10
  return n
}

function scoreColor(score: number) {
  if (score >= 80) return { bar: 'bg-emerald-500', text: 'text-emerald-700', light: 'bg-emerald-50 text-emerald-700' }
  if (score >= 50) return { bar: 'bg-amber-400', text: 'text-amber-700', light: 'bg-amber-50 text-amber-700' }
  return { bar: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50 text-red-600' }
}

export function CriteriaPanel({ details, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [updateModal, setUpdateModal] = useState<UpdateModal>(null)
  const [localEntries, setLocalEntries] = useState<MetricEntry[]>([])
  const [addForm, setAddForm] = useState({ f1: '', f2: '', f3: '' })
  const [manualForm, setManualForm] = useState({ value: '', catatan: '' })
  const [docModal, setDocModal] = useState<DocModal>(null)
  const [docForm, setDocForm] = useState({ nama: '', keterangan: '' })
  const { show, node } = useToast()

  function toggle(kode: string) {
    setExpanded(prev => prev === kode ? null : kode)
  }

  function openUpdate(kode: string, metric: CriterionMetric) {
    setUpdateModal({ kode, metric })
    setLocalEntries([...metric.entries])
    setAddForm({ f1: '', f2: '', f3: '' })
    setManualForm({ value: String(effectiveCurrent(metric)), catatan: '' })
  }

  function handleAddEntry() {
    if (!addForm.f1.trim()) { show('Field pertama wajib diisi', 'info'); return }
    const entry: MetricEntry = {
      id: `entry_${Date.now()}`,
      f1: addForm.f1.trim(),
      f2: addForm.f2.trim(),
      f3: addForm.f3.trim(),
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    }
    setLocalEntries(prev => [...prev, entry])
    setAddForm({ f1: '', f2: '', f3: '' })
  }

  function handleUpdateSave() {
    if (!updateModal) return
    const { metric } = updateModal
    const isAutoMode = !!metric.autoCompute && localEntries.length > 0

    let newVal: number
    if (isAutoMode) {
      newVal = computeFromEntries(localEntries, metric.autoCompute!)
    } else {
      newVal = parseFloat(manualForm.value)
      if (isNaN(newVal) || newVal < 0) { show('Nilai tidak valid', 'error'); return }
      if (manualForm.catatan.trim().length < 10) { show('Catatan justifikasi minimal 10 karakter', 'info'); return }
    }

    onChange(details.map(d => d.kode !== updateModal.kode ? d : {
      ...d,
      metrics: d.metrics.map(m => m.id !== metric.id ? m : { ...m, current: newVal, entries: localEntries }),
    }))
    show(`${metric.label} diperbarui`, 'success')
    setUpdateModal(null)
  }

  function handleDocSave() {
    if (!docModal) return
    if (!docForm.nama.trim()) { show('Nama dokumen wajib diisi', 'info'); return }
    const newDoc: EvidenceDoc = {
      id: `doc_${Date.now()}`,
      nama: docForm.nama.trim(),
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      keterangan: docForm.keterangan.trim(),
    }
    onChange(details.map(d => d.kode !== docModal.kode ? d : { ...d, docs: [...d.docs, newDoc] }))
    show('Dokumen bukti ditambahkan', 'success')
    setDocModal(null)
    setDocForm({ nama: '', keterangan: '' })
  }

  function removeDoc(kode: string, docId: string) {
    onChange(details.map(d => d.kode !== kode ? d : { ...d, docs: d.docs.filter(doc => doc.id !== docId) }))
    show('Dokumen dihapus', 'info')
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {node}

      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Manajemen Per Kriteria</p>
        <p className="text-xs text-slate-400 mt-0.5">
          Perbarui indikator nyata dan lampirkan dokumen bukti — skor dihitung otomatis dari metrik
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {details.map(d => {
          const score = computeCriterionScore(d.metrics)
          const isOpen = expanded === d.kode
          const col = scoreColor(score)
          const completedMetrics = d.metrics.filter(m => effectiveCurrent(m) >= m.target).length

          return (
            <div key={d.kode}>
              <button
                onClick={() => toggle(d.kode)}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
              >
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${col.light}`}>{d.kode}</span>
                <span className="text-sm text-slate-700 flex-1 leading-snug">{d.label}</span>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex items-center gap-1.5">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${col.bar}`} style={{ width: `${score}%`, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                  <span className={`text-sm font-bold w-10 text-right ${col.text}`}>{score}%</span>
                  <span className="text-[10px] text-slate-400">{completedMetrics}/{d.metrics.length} met</span>
                  {d.docs.length > 0 && (
                    <span className="text-[10px] bg-blue-100 text-blue-600 font-semibold px-1.5 py-0.5 rounded-full">
                      {d.docs.length} dok
                    </span>
                  )}
                  <span className="text-slate-300 text-xs w-3">{isOpen ? '▲' : '▼'}</span>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/40 px-5 pb-5">

                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mt-4 mb-2">
                    Indikator Kinerja
                  </p>
                  <div className="space-y-2">
                    {d.metrics.map(m => {
                      const cur = effectiveCurrent(m)
                      const ratio = Math.min(cur / m.target, 1)
                      const pct = Math.round(ratio * 100)
                      const mc = scoreColor(pct)
                      const atTarget = cur >= m.target
                      const isAuto = !!m.autoCompute && m.entries.length > 0
                      return (
                        <div key={m.id} className="bg-white rounded-xl px-4 py-3 border border-slate-100 flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-xs font-medium text-slate-700 leading-snug">{m.label}</p>
                              {isAuto && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700 shrink-0">
                                  AUTO · {m.entries.length} entri
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1.5">
                              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full transition-all duration-500 ${mc.bar}`} style={{ width: `${pct}%` }} />
                              </div>
                              <span className="text-[10px] text-slate-500 whitespace-nowrap font-mono">
                                {cur} / {m.target} {m.unit}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 mt-0.5">
                            <span className={`text-[10px] font-bold ${atTarget ? 'text-emerald-600' : mc.text}`}>
                              {atTarget ? '✓ Target' : `${pct}%`}
                            </span>
                            <button
                              onClick={() => openUpdate(d.kode, m)}
                              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                              Perbarui
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Evidence docs */}
                  <div className="flex items-center justify-between mt-5 mb-2">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                      Dokumen Bukti ({d.docs.length})
                    </p>
                    <button
                      onClick={() => { setDocModal({ kode: d.kode, label: d.label }); setDocForm({ nama: '', keterangan: '' }) }}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      + Tambah Bukti
                    </button>
                  </div>

                  {d.docs.length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2">
                      Belum ada dokumen bukti. Tambahkan dokumen pendukung untuk memperkuat nilai indikator.
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {d.docs.map(doc => (
                        <div key={doc.id} className="flex items-start gap-3 bg-white rounded-lg px-3 py-2.5 border border-slate-100">
                          <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[9px] font-bold text-blue-600">DOC</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-700 leading-snug">{doc.nama}</p>
                            {doc.keterangan && <p className="text-[10px] text-slate-400 mt-0.5">{doc.keterangan}</p>}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] text-slate-400">{doc.tanggal}</span>
                            <button onClick={() => removeDoc(d.kode, doc.id)} className="text-slate-300 hover:text-red-400 transition-colors text-xs">✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Metric update modal */}
      {updateModal && (() => {
        const { metric } = updateModal
        const fields = TEMPLATE_FIELDS[metric.template]
        const isAutoMode = !!metric.autoCompute && localEntries.length > 0
        const computedVal = metric.autoCompute
          ? computeFromEntries(localEntries, metric.autoCompute)
          : null

        return (
          <Modal
            title={`Perbarui Indikator — ${updateModal.kode}: ${metric.label}`}
            onClose={() => setUpdateModal(null)}
            onSave={handleUpdateSave}
            saveLabel="Simpan"
            wide
          >
            <div className="text-xs text-slate-600 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 leading-relaxed">
              <span className="font-semibold text-blue-700">Panduan dokumen:</span>{' '}
              {metric.hint}
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
              <span className="text-slate-500">Nilai terukur:</span>
              <span className="font-mono font-bold text-slate-800">
                {isAutoMode ? computedVal : effectiveCurrent(metric)} {metric.unit}
              </span>
              {isAutoMode && (
                <span className="text-[10px] bg-violet-100 text-violet-700 font-semibold px-1.5 py-0.5 rounded-full">
                  otomatis dari {localEntries.length} entri
                </span>
              )}
              <span className="text-slate-400 ml-auto">target: {metric.target} {metric.unit}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-2 h-72">
              <div className="flex flex-col min-h-0 h-full">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2 shrink-0">
                  Entri Pendukung ({localEntries.length})
                  {metric.autoCompute && (
                    <span className="ml-1.5 text-violet-600 normal-case font-normal">· jumlah entri menentukan nilai</span>
                  )}
                </p>
                {localEntries.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center rounded-xl border-2 border-dashed border-slate-200">
                    <p className="text-xs text-slate-400 text-center px-4">Belum ada entri.<br />Tambahkan dari kolom kanan.</p>
                  </div>
                ) : (
                  <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 pr-1">
                    {localEntries.map((e, i) => (
                      <div key={e.id} className="flex items-start gap-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-mono shrink-0 mt-0.5 w-4 text-right">{i + 1}.</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-700 leading-snug">{e.f1}</p>
                          {e.f2 && <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{e.f2}</p>}
                          {e.f3 && <p className="text-[10px] text-blue-500 mt-0.5 break-all leading-snug">{e.f3}</p>}
                          <p className="text-[10px] text-slate-400 mt-0.5">{e.tanggal}</p>
                        </div>
                        <button
                          onClick={() => setLocalEntries(prev => prev.filter(x => x.id !== e.id))}
                          className="text-slate-300 hover:text-red-400 text-xs shrink-0 mt-0.5 transition-colors"
                        >✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 min-h-0 overflow-y-auto">
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Tambah Entri Baru</p>
                  <input
                    type="text"
                    placeholder={fields.f1}
                    value={addForm.f1}
                    onChange={e => setAddForm(p => ({ ...p, f1: e.target.value }))}
                    className={inputCls}
                  />
                  <input
                    type="text"
                    placeholder={fields.f2}
                    value={addForm.f2}
                    onChange={e => setAddForm(p => ({ ...p, f2: e.target.value }))}
                    className={inputCls}
                  />
                  <input
                    type="text"
                    placeholder={fields.f3}
                    value={addForm.f3}
                    onChange={e => setAddForm(p => ({ ...p, f3: e.target.value }))}
                    className={inputCls}
                  />
                  <button
                    onClick={handleAddEntry}
                    className="w-full text-[11px] font-medium px-3 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                  >
                    + Tambah Entri
                  </button>
                </div>

                {!isAutoMode && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <Field label={`Nilai Terukur (${metric.unit})`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="any"
                          min={0}
                          value={manualForm.value}
                          onChange={e => setManualForm(p => ({ ...p, value: e.target.value }))}
                          className={`${inputCls} flex-1`}
                          placeholder={`${effectiveCurrent(metric)}`}
                        />
                        <span className="text-xs text-slate-500 shrink-0">{metric.unit}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Target: {metric.target} {metric.unit}</p>
                    </Field>
                    <Field label="Catatan / Justifikasi *">
                      <textarea
                        rows={3}
                        value={manualForm.catatan}
                        onChange={e => setManualForm(p => ({ ...p, catatan: e.target.value }))}
                        placeholder="Jelaskan dasar perubahan nilai ini..."
                        className={`${inputCls} resize-none`}
                      />
                      <p className="text-[10px] text-slate-400 mt-0.5">Minimal 10 karakter</p>
                    </Field>
                  </div>
                )}
              </div>
            </div>
          </Modal>
        )
      })()}

      {docModal && (
        <Modal
          title={`Tambah Dokumen Bukti — ${docModal.kode}: ${docModal.label}`}
          onClose={() => setDocModal(null)}
          onSave={handleDocSave}
          saveLabel="Tambah Dokumen"
        >
          <Field label="Nama Dokumen *">
            <input
              type="text"
              value={docForm.nama}
              onChange={e => setDocForm(p => ({ ...p, nama: e.target.value }))}
              className={inputCls}
              placeholder="Contoh: Rekap BKD Semester Genap 2025/2026"
            />
          </Field>
          <Field label="Keterangan">
            <textarea
              rows={2}
              value={docForm.keterangan}
              onChange={e => setDocForm(p => ({ ...p, keterangan: e.target.value }))}
              placeholder="Deskripsi singkat tentang dokumen ini..."
              className={`${inputCls} resize-none`}
            />
          </Field>
          <div className="pb-1" />
        </Modal>
      )}
    </div>
  )
}
