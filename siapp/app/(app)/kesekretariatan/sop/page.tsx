"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { sops } from "@/lib/seed";

const ALL_CATEGORIES = Array.from(new Set(sops.map(s => s.kategori)));

export default function SopPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("Semua");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = sops.filter(s => {
    const matchCat = categoryFilter === "Semua" || s.kategori === categoryFilter;
    const matchSearch = !search ||
      s.judul.toLowerCase().includes(search.toLowerCase()) ||
      s.ringkasan.toLowerCase().includes(search.toLowerCase()) ||
      s.nomor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch && s.isActive;
  });

  const toggleExpand = (id: number) => {
    setExpanded(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Standar Operasional Prosedur</h1>
        <p className="text-sm text-white/40 mt-1">
          Panduan prosedur operasional departemen yang berlaku.
        </p>
      </div>

      {/* Search + Category filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari SOP..."
            className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-ugm-gold/50 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["Semua", ...ALL_CATEGORIES]).map(c => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                categoryFilter === c
                  ? "bg-ugm-gold/20 text-ugm-gold border-ugm-gold/40"
                  : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* SOP count */}
      <p className="text-xs text-white/30">
        Menampilkan {filtered.length} dari {sops.filter(s => s.isActive).length} SOP aktif
      </p>

      {/* SOP cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="glass rounded-2xl px-5 py-12 text-center text-white/30 text-sm">
            Tidak ada SOP yang ditemukan.
          </div>
        )}
        {filtered.map(sop => {
          const isOpen = expanded === sop.id;
          return (
            <div key={sop.id} className="glass rounded-2xl overflow-hidden">
              {/* Card header */}
              <button
                className="w-full px-5 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left"
                onClick={() => toggleExpand(sop.id)}
              >
                <div className="w-9 h-9 rounded-xl bg-ugm-gold/15 border border-ugm-gold/25 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-ugm-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-white text-sm">{sop.judul}</p>
                    <span className="text-[10px] text-white/40 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                      {sop.kategori}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 mt-0.5 truncate">
                    {sop.nomor} · v{sop.versi} · Efektif: {sop.tanggalEfektif}
                  </p>
                </div>
                <div className="flex-shrink-0 text-white/30">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div className="px-5 pb-5 border-t border-white/10 pt-4 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div>
                      <p className="text-white/30 mb-0.5">Unit Penanggung Jawab</p>
                      <p className="text-white/70">{sop.unitPenanggungJawab}</p>
                    </div>
                    <div>
                      <p className="text-white/30 mb-0.5">Nomor SOP</p>
                      <p className="text-white/70 font-mono">{sop.nomor}</p>
                    </div>
                    <div>
                      <p className="text-white/30 mb-0.5">Versi</p>
                      <p className="text-white/70">v{sop.versi}</p>
                    </div>
                    <div>
                      <p className="text-white/30 mb-0.5">Tanggal Efektif</p>
                      <p className="text-white/70">{sop.tanggalEfektif}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-1.5">Ringkasan</p>
                    <p className="text-sm text-white/70 leading-relaxed">{sop.ringkasan}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2">Langkah-Langkah</p>
                    <ol className="space-y-2">
                      {sop.langkah.map((step: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <span className="w-6 h-6 rounded-full bg-ugm-gold/15 border border-ugm-gold/25 flex items-center justify-center text-[10px] font-bold text-ugm-gold flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-sm text-white/70 leading-relaxed">{step}</p>
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
