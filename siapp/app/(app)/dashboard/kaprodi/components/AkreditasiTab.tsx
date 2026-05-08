'use client';

import { useState } from 'react';

interface SubKriteria {
  kode: string;
  nama: string;
  coverage: number;
  rekomendasiDok: string[];
}

const SUB_KRITERIA: SubKriteria[] = [
  { kode: '5.1', nama: 'Profil Lulusan',       coverage: 78, rekomendasiDok: ['Dokumen profil lulusan terbaru', 'Tracer study 2024', 'Laporan pemangku kepentingan'] },
  { kode: '5.2', nama: 'CPL',                  coverage: 92, rekomendasiDok: ['Matriks CPL–CPMK semua MK'] },
  { kode: '5.3', nama: 'Struktur Kurikulum',   coverage: 85, rekomendasiDok: ['Diagram alur kurikulum 2023', 'Rekap SKS per semester'] },
  { kode: '5.4', nama: 'RPKPS',                coverage: 61, rekomendasiDok: ['RPKPS POL3101 (Draft)', 'RPKPS POL3201 (Draft)', 'RPKPS POL4101 (Belum Ada)', 'Berita acara persetujuan RPKPS'] },
  { kode: '5.5', nama: 'Integrasi Penelitian', coverage: 55, rekomendasiDok: ['Laporan integrasi riset ke kurikulum', 'Daftar MK berbasis penelitian', 'Contoh tugas akhir terintegrasi riset'] },
  { kode: '5.6', nama: 'Suasana Akademik',     coverage: 72, rekomendasiDok: ['Laporan kegiatan seminar 2024–2025', 'Foto kegiatan diskusi ilmiah', 'Jadwal kuliah tamu'] },
];

const OVERALL = Math.round(SUB_KRITERIA.reduce((s, k) => s + k.coverage, 0) / SUB_KRITERIA.length);

function ringColor(pct: number) {
  if (pct >= 80) return '#10b981';
  if (pct >= 60) return '#f59e0b';
  return '#ef4444';
}

function RingChart({ pct, size = 80 }: { pct: number; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (pct / 100) * circ;
  const color = ringColor(pct);

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={8} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.6s ease' }}
      />
    </svg>
  );
}

export function AkreditasiTab() {
  const [selected, setSelected] = useState<SubKriteria | null>(null);
  const [uploadMsg, setUploadMsg] = useState('');

  function handleUpload() {
    setUploadMsg('Fitur unggah aktif di Phase 2.');
    setTimeout(() => setUploadMsg(''), 3000);
  }

  return (
    <div className="space-y-5">
      {/* Overall bar */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">Coverage Kriteria 5 — Kurikulum</h2>
            <p className="text-xs text-gray-400 mt-0.5">BAN-PT LED · Perspektif Kaprodi</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold" style={{ color: ringColor(OVERALL) }}>{OVERALL}%</span>
            <p className="text-xs text-gray-400">keseluruhan</p>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-700"
            style={{ width: `${OVERALL}%`, backgroundColor: ringColor(OVERALL) }}
          />
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> ≥ 80% Baik</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> 60–79% Perlu Perhatian</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" /> &lt; 60% Kritis</span>
        </div>
      </div>

      {/* Sub-kriteria grid */}
      <div className="grid grid-cols-3 gap-4">
        {SUB_KRITERIA.map((sk) => (
          <button
            key={sk.kode}
            onClick={() => setSelected(selected?.kode === sk.kode ? null : sk)}
            className={`rounded-2xl border bg-white/60 backdrop-blur-xl shadow p-4 text-left transition-all hover:shadow-md ${
              selected?.kode === sk.kode
                ? 'border-indigo-300 ring-2 ring-indigo-200'
                : 'border-white/40 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-400">{sk.kode}</span>
              <div className="relative">
                <RingChart pct={sk.coverage} size={56} />
                <span
                  className="absolute inset-0 flex items-center justify-center text-xs font-bold rotate-90"
                  style={{ color: ringColor(sk.coverage) }}
                >
                  {sk.coverage}%
                </span>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-800 leading-snug">{sk.nama}</p>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full"
                style={{ width: `${sk.coverage}%`, backgroundColor: ringColor(sk.coverage) }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Detail drawer (inline expansion) */}
      {selected && (
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 backdrop-blur-xl shadow p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                Kriteria 5.{selected.kode.split('.')[1]} — {selected.nama}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Coverage saat ini: <strong style={{ color: ringColor(selected.coverage) }}>{selected.coverage}%</strong>
                {selected.coverage < 80 && ' — diperlukan peningkatan untuk mencapai threshold 80%'}
              </p>
            </div>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Dokumen yang Direkomendasikan
            </h4>
            <ul className="space-y-2">
              {selected.rekomendasiDok.map((d, i) => (
                <li key={i} className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-2.5 border border-indigo-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">📄</span>
                    <span className="text-sm text-gray-700">{d}</span>
                  </div>
                  <button
                    onClick={handleUpload}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 whitespace-nowrap"
                  >
                    Unggah →
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {uploadMsg && (
            <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
              {uploadMsg}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
