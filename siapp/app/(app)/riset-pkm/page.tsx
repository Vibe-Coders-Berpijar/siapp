'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/shared/StatusBadge';

type Jenis = 'Penelitian' | 'PkM';

interface Proposal {
  id: string;
  judul: string;
  jenis: Jenis;
  anggaran: string;
  durasi: string;
  status: string;
  tanggal: string;
  stage: number;
}

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: '1',
    judul: 'Dinamika Kebijakan Desentralisasi Fiskal di Era Pasca-COVID: Studi Komparatif Kabupaten/Kota di DIY',
    jenis: 'Penelitian',
    anggaran: 'Rp 85.000.000',
    durasi: '12 bulan',
    status: 'Menunggu',
    tanggal: '15 Jan 2025',
    stage: 1,
  },
  {
    id: '2',
    judul: 'Pelatihan Literasi Digital bagi Aparatur Desa di Kawasan Perbatasan Kalbar',
    jenis: 'PkM',
    anggaran: 'Rp 45.000.000',
    durasi: '6 bulan',
    status: 'Aktif',
    tanggal: '3 Feb 2025',
    stage: 3,
  },
  {
    id: '3',
    judul: 'Partisipasi Perempuan dalam Musrenbang Kelurahan: Studi Kasus Kota Yogyakarta',
    jenis: 'Penelitian',
    anggaran: 'Rp 60.000.000',
    durasi: '10 bulan',
    status: 'Draft',
    tanggal: '20 Mar 2025',
    stage: 0,
  },
];

const STAGES = ['Dosen', 'Koor Riset', 'Kaprodi', 'Kadep'];

const JENIS_COLOR: Record<Jenis, string> = {
  Penelitian: 'bg-indigo-50 text-indigo-700',
  PkM: 'bg-teal-50 text-teal-700',
};

type Filter = 'Semua' | Jenis;

export default function RisetPkmPage() {
  const [filter, setFilter] = useState<Filter>('Semua');

  const shown = filter === 'Semua' ? MOCK_PROPOSALS : MOCK_PROPOSALS.filter((p) => p.jenis === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/dashboard/dosen" className="hover:text-gray-800 transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Riset &amp; PkM</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Proposal Riset &amp; PkM</h1>
            <p className="text-sm text-gray-500 mt-0.5">Kelola proposal penelitian dan pengabdian kepada masyarakat</p>
          </div>
          <Link
            href="/riset-pkm/proposal/baru"
            className="inline-flex items-center gap-2 bg-[#231F54] hover:bg-indigo-900 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow"
          >
            + Buat Proposal Baru
          </Link>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2">
          {(['Semua', 'Penelitian', 'PkM'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-[#231F54] text-white shadow-sm'
                  : 'bg-white/60 border border-white/40 text-gray-600 hover:bg-white/80'
              }`}
            >
              {f}
              {f !== 'Semua' && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({MOCK_PROPOSALS.filter((p) => p.jenis === f).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Proposal cards */}
        <div className="space-y-3">
          {shown.map((p) => (
            <Link key={p.id} href={`/riset-pkm/proposal/${p.id}`} className="block group">
              <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow hover:bg-white/80 transition-all p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${JENIS_COLOR[p.jenis]}`}>
                        {p.jenis}
                      </span>
                      <span className="text-xs text-gray-400">{p.tanggal}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-indigo-800 transition-colors line-clamp-2">
                      {p.judul}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs font-semibold text-green-700">{p.anggaran}</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-500">{p.durasi}</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <StatusBadge status={p.status} size="sm" />
                  </div>
                </div>

                {/* Workflow progress */}
                <div className="mt-4 flex items-center gap-0">
                  {STAGES.map((stage, idx) => {
                    const done = idx < p.stage;
                    const active = idx === p.stage;
                    return (
                      <div key={stage} className="flex-1 flex items-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                              done
                                ? 'bg-[#231F54] border-[#231F54] text-white'
                                : active
                                ? 'bg-white border-[#231F54] text-[#231F54]'
                                : 'bg-white border-gray-200 text-gray-300'
                            }`}
                          >
                            {done ? '✓' : idx + 1}
                          </div>
                          <span
                            className={`text-[10px] mt-1 font-medium whitespace-nowrap ${
                              done || active ? 'text-gray-700' : 'text-gray-300'
                            }`}
                          >
                            {stage}
                          </span>
                        </div>
                        {idx < STAGES.length - 1 && (
                          <div
                            className={`flex-1 h-0.5 mx-1 mb-4 transition-all ${
                              done ? 'bg-[#231F54]' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Link>
          ))}

          {shown.length === 0 && (
            <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl text-center py-16">
              <p className="text-gray-400 text-sm">Belum ada proposal {filter === 'Semua' ? '' : filter}.</p>
              <Link href="/riset-pkm/proposal/baru" className="mt-3 inline-block text-sm text-indigo-600 hover:underline">
                Buat proposal pertama Anda &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
