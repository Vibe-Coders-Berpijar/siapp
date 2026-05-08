"use client";

import { useState } from 'react'
import { DashboardLayout } from '@/components/kadep/DashboardLayout'
import { AccreditationPanel } from '@/components/kadep/AccreditationPanel'
import { AiInsightPanel } from '@/components/kadep/AiInsightPanel'
import { CriteriaPanel } from '@/components/kadep/CriteriaPanel'
import { criteriaDetails, computeCriterionScore, hibahData, currentUser } from '@/lib/mock-data-kadep'
import type { CriterionDetail } from '@/lib/mock-data-kadep'

export default function AkreditasiPage() {
  const [details, setDetails] = useState<CriterionDetail[]>(criteriaDetails)

  const criteria = details.map(d => ({
    kode: d.kode,
    label: d.label,
    score: computeCriterionScore(d.metrics),
  }))

  const avg = Math.round(criteria.reduce((s, c) => s + c.score, 0) / criteria.length)
  const met = criteria.filter(c => c.score >= 80).length
  const attention = criteria.filter(c => c.score >= 50 && c.score < 80).length
  const critical = criteria.filter(c => c.score < 50).length

  const aktifHibah = hibahData.filter(h => h.status === 'aktif')
  const totalNilai = aktifHibah.reduce((s, h) => s + h.nilai, 0)
  const pengajuanCount = hibahData.filter(h => h.status === 'pengajuan').length

  return (
    <DashboardLayout
      title="Akreditasi BAN-PT"
      subtitle="Pemantauan kesiapan akreditasi 9 kriteria LAMSPAK · skor dihitung dari indikator nyata"
      userName={currentUser.nama}
      jabatan={currentUser.jabatan}
    >
      {/* Summary cards */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[140px] rounded-2xl p-5 bg-white border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Skor Rata-rata</p>
          <p className="text-3xl font-bold text-slate-800">{avg}%</p>
        </div>
        <div className="flex-1 min-w-[140px] rounded-2xl p-5 bg-emerald-50 border border-emerald-200 shadow-sm">
          <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide mb-1">Kriteria Baik (≥80%)</p>
          <p className="text-3xl font-bold text-emerald-700">{met}/9</p>
        </div>
        <div className="flex-1 min-w-[140px] rounded-2xl p-5 bg-amber-50 border border-amber-200 shadow-sm">
          <p className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Perlu Perhatian</p>
          <p className="text-3xl font-bold text-amber-700">{attention}/9</p>
        </div>
        <div className="flex-1 min-w-[140px] rounded-2xl p-5 bg-red-50 border border-red-200 shadow-sm">
          <p className="text-xs font-medium text-red-700 uppercase tracking-wide mb-1">Kritis (&lt;50%)</p>
          <p className="text-3xl font-bold text-red-700">{critical}/9</p>
        </div>
      </div>

      {/* Gauge + 9-criteria grid */}
      <AccreditationPanel criteria={criteria} />

      {/* AI-derived recommendations */}
      <AiInsightPanel criteria={criteria} />

      {/* Hibah evidence card — read-only, CRUD lives in Modul Riset */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Bukti Hibah — K7 Penelitian &amp; K9 Keluaran Tridarma
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">Data dari Modul Riset · hanya tampilan</p>
          </div>
          <button className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
            Kelola di Modul Riset →
          </button>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 rounded-xl p-3 bg-emerald-50 border border-emerald-100">
            <p className="text-[10px] font-medium text-emerald-700 uppercase tracking-wide">Hibah Aktif</p>
            <p className="text-xl font-bold text-emerald-800">{aktifHibah.length} proyek</p>
            <p className="text-xs text-emerald-600 mt-0.5">Rp {totalNilai}jt total dana</p>
          </div>
          <div className="flex-1 rounded-xl p-3 bg-amber-50 border border-amber-100">
            <p className="text-[10px] font-medium text-amber-700 uppercase tracking-wide">Dalam Pengajuan</p>
            <p className="text-xl font-bold text-amber-800">{pengajuanCount} proyek</p>
            <p className="text-xs text-amber-600 mt-0.5">menunggu persetujuan</p>
          </div>
          <div className="flex-1 rounded-xl p-3 bg-slate-50 border border-slate-100">
            <p className="text-[10px] font-medium text-slate-600 uppercase tracking-wide">Kriteria Didukung</p>
            <div className="flex gap-1 mt-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">K7</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">K9</span>
            </div>
          </div>
        </div>
      </div>

      {/* Per-criterion management with real metrics + evidence */}
      <CriteriaPanel details={details} onChange={setDetails} />
    </DashboardLayout>
  )
}
