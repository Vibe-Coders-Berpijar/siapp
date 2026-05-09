"use client";

import { DashboardLayout } from '@/components/kadep/DashboardLayout'
import { currentUser } from '@/lib/mock-data-kadep'

const ANGGARAN = [
  { label: 'Pagu Anggaran', nilai: 2_850_000_000, warna: 'bg-blue-50 border-blue-200 text-blue-700' },
  { label: 'Terealisasi', nilai: 1_920_000_000, warna: 'bg-green-50 border-green-200 text-green-700' },
  { label: 'Sisa Anggaran', nilai: 930_000_000, warna: 'bg-amber-50 border-amber-200 text-amber-700' },
  { label: 'Terserap (%)', nilai: null, persen: 67, warna: 'bg-slate-800 border-slate-700 text-white' },
]

const REALISASI: { bulan: string; rencana: number; realisasi: number }[] = [
  { bulan: 'Jan', rencana: 200, realisasi: 185 },
  { bulan: 'Feb', rencana: 210, realisasi: 198 },
  { bulan: 'Mar', rencana: 225, realisasi: 220 },
  { bulan: 'Apr', rencana: 230, realisasi: 215 },
  { bulan: 'Mei', rencana: 240, realisasi: 232 },
  { bulan: 'Jun', rencana: 245, realisasi: 240 },
  { bulan: 'Jul', rencana: 250, realisasi: 210 },
  { bulan: 'Agu', rencana: 255, realisasi: 180 },
  { bulan: 'Sep', rencana: 250, realisasi: 240 },
  { bulan: 'Okt', rencana: 245, realisasi: 0 },
  { bulan: 'Nov', rencana: 240, realisasi: 0 },
  { bulan: 'Des', rencana: 260, realisasi: 0 },
]

const POS_BELANJA = [
  { pos: 'Belanja Pegawai', anggaran: 1_400_000_000, realisasi: 980_000_000, persen: 70 },
  { pos: 'Belanja Barang', anggaran: 650_000_000, realisasi: 520_000_000, persen: 80 },
  { pos: 'Belanja Perjalanan Dinas', anggaran: 300_000_000, realisasi: 195_000_000, persen: 65 },
  { pos: 'Belanja Penelitian & PkM', anggaran: 350_000_000, realisasi: 175_000_000, persen: 50 },
  { pos: 'Belanja Modal', anggaran: 150_000_000, realisasi: 50_000_000, persen: 33 },
]

function rupiah(n: number) {
  return 'Rp ' + (n / 1_000_000).toLocaleString('id-ID') + ' Jt'
}

function persen(val: number) {
  const color = val >= 75 ? 'bg-green-500' : val >= 50 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-slate-100">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${val}%` }} />
      </div>
      <span className="text-xs font-semibold text-slate-600 w-8 text-right">{val}%</span>
    </div>
  )
}

const MAX_BAR = Math.max(...REALISASI.map(r => r.rencana))

export default function KeuanganPage() {
  return (
    <DashboardLayout
      title="Keuangan"
      subtitle="Realisasi anggaran departemen tahun berjalan"
      userName={currentUser.nama}
      jabatan={currentUser.jabatan}
    >
      {/* KPI cards */}
      <div className="flex gap-4 flex-wrap">
        {ANGGARAN.map((a) => (
          <div key={a.label} className={`flex-1 min-w-[150px] rounded-2xl p-5 border ${a.warna} shadow-sm`}>
            <p className="text-xs font-medium uppercase tracking-wide opacity-70 mb-1">{a.label}</p>
            <p className="text-2xl font-bold">
              {a.nilai !== null ? rupiah(a.nilai) : `${a.persen}%`}
            </p>
          </div>
        ))}
      </div>

      {/* Monthly bar chart */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Realisasi vs Rencana Bulanan (Juta Rp)
        </p>
        <div className="flex items-end gap-1.5 h-40">
          {REALISASI.map((r) => (
            <div key={r.bulan} className="flex-1 flex flex-col items-center gap-0.5">
              <div className="w-full flex gap-0.5 items-end" style={{ height: '120px' }}>
                <div
                  className="flex-1 rounded-t bg-blue-100"
                  style={{ height: `${(r.rencana / MAX_BAR) * 100}%` }}
                />
                <div
                  className={`flex-1 rounded-t ${r.realisasi > 0 ? 'bg-blue-500' : 'bg-slate-100'}`}
                  style={{ height: `${(r.realisasi / MAX_BAR) * 100}%` }}
                />
              </div>
              <p className="text-[9px] text-slate-400">{r.bulan}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-100" /><span className="text-xs text-slate-500">Rencana</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-500" /><span className="text-xs text-slate-500">Realisasi</span></div>
        </div>
      </div>

      {/* Per-pos breakdown */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Rincian per Pos Belanja
        </p>
        <div className="space-y-4">
          {POS_BELANJA.map((p) => (
            <div key={p.pos}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">{p.pos}</span>
                <div className="flex gap-3 text-xs text-slate-500">
                  <span>{rupiah(p.realisasi)}</span>
                  <span className="text-slate-300">/</span>
                  <span>{rupiah(p.anggaran)}</span>
                </div>
              </div>
              {persen(p.persen)}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
