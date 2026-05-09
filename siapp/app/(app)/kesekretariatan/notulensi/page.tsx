"use client";

import { useState } from "react";
import { Plus, Search, Eye, Users, CalendarDays, Lock, Globe } from "lucide-react";
import { notulensiList as seedNotulensi, NotulensiItem, NotulensiLabel } from "@/lib/seed";
import { Badge } from "@/components/sekretariat/Badge";
import { Button } from "@/components/sekretariat/Button";
import { formatDateShort } from "@/lib/utils";
import Link from "next/link";

const LABELS: NotulensiLabel[] = ["Departemen", "Prodi", "General", "Lainnya"];

const LABEL_COLORS: Record<NotulensiLabel, string> = {
  Departemen: "bg-blue-500/20 text-blue-300 border-blue-400/30",
  Prodi:      "bg-purple-500/20 text-purple-300 border-purple-400/30",
  General:    "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  Lainnya:    "bg-white/10 text-white/50 border-white/20",
};

export default function NotulensiPage() {
  const [items, setItems] = useState<NotulensiItem[]>(seedNotulensi);
  const [search, setSearch] = useState("");
  const [labelFilter, setLabelFilter] = useState<NotulensiLabel | "Semua">("Semua");
  const [aksesFilter, setAksesFilter] = useState<"semua" | "anggota" | "publik">("semua");
  const [selected, setSelected] = useState<NotulensiItem | null>(null);

  const filtered = items.filter(n => {
    if (labelFilter !== "Semua" && n.label !== labelFilter) return false;
    if (aksesFilter !== "semua" && n.akses !== aksesFilter) return false;
    if (search && !n.judul.toLowerCase().includes(search.toLowerCase()) &&
        !n.pimpinanRapat.toLowerCase().includes(search.toLowerCase()) &&
        !n.tempat.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleApprove = (id: number) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, status: "Disetujui" as const } : n));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: "Disetujui" } : null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notulensi Rapat</h1>
          <p className="text-sm text-white/40 mt-1">Arsip dan buat notulensi rapat departemen.</p>
        </div>
        <Link href="/kesekretariatan/notulensi/baru">
          <Button variant="primary"><Plus className="w-4 h-4" />Notulensi Baru</Button>
        </Link>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari judul, pimpinan, tempat..."
            className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-ugm-gold/50 transition-colors" />
        </div>

        {/* Label filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(["Semua", ...LABELS] as const).map(l => (
            <button key={l} onClick={() => setLabelFilter(l)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                labelFilter === l
                  ? "bg-ugm-gold text-ugm-blue-dark border-ugm-gold"
                  : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10"
              }`}>
              {l}
            </button>
          ))}
        </div>

        {/* Akses filter */}
        <div className="flex items-center gap-1.5">
          {([
            { val: "semua",   icon: null,    label: "Semua Akses" },
            { val: "anggota", icon: Lock,    label: "Anggota" },
            { val: "publik",  icon: Globe,   label: "Publik" },
          ] as const).map(({ val, icon: Icon, label }) => (
            <button key={val} onClick={() => setAksesFilter(val)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                aksesFilter === val
                  ? "bg-white/20 text-white border-white/30"
                  : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
              }`}>
              {Icon && <Icon className="w-3 h-3" />}{label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-white/30">{filtered.length} notulensi ditemukan</p>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="glass rounded-2xl px-5 py-12 text-center text-white/30 text-sm">
            Tidak ada notulensi yang ditemukan.
          </div>
        )}
        {filtered.map(n => (
          <div key={n.id} onClick={() => setSelected(n)}
            className="glass rounded-2xl p-5 hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <p className="font-semibold text-white truncate">{n.judul}</p>
                  <Badge>{n.status}</Badge>
                  {/* Label */}
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${LABEL_COLORS[n.label]}`}>
                    {n.label}
                  </span>
                  {/* Akses */}
                  <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                    n.akses === "publik"
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/20"
                      : "bg-white/5 text-white/40 border-white/10"
                  }`}>
                    {n.akses === "publik" ? <Globe className="w-2.5 h-2.5" /> : <Lock className="w-2.5 h-2.5" />}
                    {n.akses === "publik" ? "Publik" : "Anggota"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-white/40">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />{formatDateShort(n.tanggal)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />{n.peserta.length} peserta · {n.anggota.length} anggota
                  </span>
                  <span>{n.tempat}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {n.agenda.slice(0, 3).map((a, i) => (
                    <span key={i} className="text-[10px] text-white/40 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">{a}</span>
                  ))}
                  {n.agenda.length > 3 && <span className="text-[10px] text-white/30">+{n.agenda.length - 3} agenda</span>}
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={e => { e.stopPropagation(); setSelected(n); }}>
                <Eye className="w-3.5 h-3.5" />Detail
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass rounded-2xl border border-white/14 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-white">{selected.judul}</p>
                <Badge>{selected.status}</Badge>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${LABEL_COLORS[selected.label]}`}>
                  {selected.label}
                </span>
                <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                  selected.akses === "publik"
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/20"
                    : "bg-white/5 text-white/40 border-white/10"
                }`}>
                  {selected.akses === "publik" ? <Globe className="w-2.5 h-2.5" /> : <Lock className="w-2.5 h-2.5" />}
                  {selected.akses === "publik" ? "Publik" : "Anggota Saja"}
                </span>
              </div>
              <button onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors">×</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Tanggal", formatDateShort(selected.tanggal)],
                  ["Tempat", selected.tempat],
                  ["Pimpinan Rapat", selected.pimpinanRapat],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-xs text-white/40 mb-0.5">{k}</p>
                    <p className="text-white/80">{v}</p>
                  </div>
                ))}
              </div>

              {/* Peserta */}
              <div>
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2">Peserta Rapat</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.peserta.map((p, i) => (
                    <span key={i} className="text-xs text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">{p}</span>
                  ))}
                </div>
              </div>

              {/* Anggota (access list) */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">Hak Akses Dokumen</p>
                  <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                    selected.akses === "publik"
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/20"
                      : "bg-white/5 text-white/40 border-white/10"
                  }`}>
                    {selected.akses === "publik" ? <Globe className="w-2.5 h-2.5" /> : <Lock className="w-2.5 h-2.5" />}
                    {selected.akses === "publik" ? "Semua pengguna dapat melihat" : "Anggota terdaftar saja"}
                  </span>
                </div>
                {selected.akses === "anggota" && (
                  <div className="flex flex-wrap gap-1.5">
                    {selected.anggota.map((a, i) => (
                      <span key={i} className="text-xs text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Users className="w-2.5 h-2.5 text-white/30" />{a}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Agenda */}
              <div>
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2">Agenda</p>
                <ul className="space-y-1">
                  {selected.agenda.map((a, i) => (
                    <li key={i} className="flex gap-2 text-sm text-white/70">
                      <span className="text-white/30 flex-shrink-0">{i + 1}.</span>{a}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Keputusan */}
              <div>
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2">Keputusan</p>
                <ul className="space-y-1.5">
                  {selected.keputusan.map((k, i) => (
                    <li key={i} className="flex gap-2 text-sm text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-ugm-gold/60 mt-2 flex-shrink-0" />{k}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tindak Lanjut */}
              <div>
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2">Tindak Lanjut</p>
                <div className="space-y-2">
                  {selected.tindakLanjut.map((tl, i) => (
                    <div key={i} className="glass rounded-xl p-3 flex items-start gap-3">
                      <div className="flex-1">
                        <p className="text-sm text-white/80">{tl.item}</p>
                        <p className="text-xs text-white/40 mt-0.5">{tl.penanggungJawab}</p>
                      </div>
                      <span className="text-xs text-ugm-gold/70 font-mono flex-shrink-0">{tl.tenggat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selected.status === "Draft" && (
              <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setSelected(null)}>Tutup</Button>
                <Button variant="primary" onClick={() => handleApprove(selected.id)}>Setujui Notulensi</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
