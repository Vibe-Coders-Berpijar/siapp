'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { sops } from '@/lib/seed';

const ALL_CATEGORIES = Array.from(new Set(sops.map(s => s.kategori)));

export function SopTab() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = sops.filter(s => {
    const matchCat = categoryFilter === 'Semua' || s.kategori === categoryFilter;
    const matchSearch =
      !search ||
      s.judul.toLowerCase().includes(search.toLowerCase()) ||
      s.ringkasan.toLowerCase().includes(search.toLowerCase()) ||
      s.nomor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch && s.isActive;
  });

  const toggle = (id: number) => setExpanded(prev => (prev === id ? null : id));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-5">
        <h2 className="font-semibold text-gray-900 mb-0.5">Standar Operasional Prosedur</h2>
        <p className="text-sm text-gray-500">Panduan prosedur operasional departemen yang berlaku.</p>

        {/* Search + category filter */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[180px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari SOP..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(['Semua', ...ALL_CATEGORIES]).map(c => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  categoryFilter === c
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-3">
          Menampilkan {filtered.length} dari {sops.filter(s => s.isActive).length} SOP aktif
        </p>
      </div>

      {/* SOP list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow px-5 py-12 text-center text-gray-400 text-sm">
            Tidak ada SOP yang ditemukan.
          </div>
        )}

        {filtered.map(sop => {
          const isOpen = expanded === sop.id;
          return (
            <div key={sop.id} className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow overflow-hidden">
              {/* Row header */}
              <button
                className="w-full px-5 py-4 flex items-center gap-4 hover:bg-white/80 transition-colors text-left"
                onClick={() => toggle(sop.id)}
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-900 text-sm">{sop.judul}</p>
                    <span className="text-[10px] text-gray-500 px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200">
                      {sop.kategori}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {sop.nomor} · v{sop.versi} · Efektif: {sop.tanggalEfektif}
                  </p>
                </div>
                <div className="flex-shrink-0 text-gray-400">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4 bg-white/40">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    {[
                      ['Unit Penanggung Jawab', sop.unitPenanggungJawab],
                      ['Nomor SOP', sop.nomor],
                      ['Versi', `v${sop.versi}`],
                      ['Tanggal Efektif', sop.tanggalEfektif],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-gray-400 mb-0.5">{label}</p>
                        <p className="text-gray-700 font-medium">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Ringkasan</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{sop.ringkasan}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Langkah-Langkah</p>
                    <ol className="space-y-2">
                      {sop.langkah.map((step: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[10px] font-bold text-blue-600 flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
