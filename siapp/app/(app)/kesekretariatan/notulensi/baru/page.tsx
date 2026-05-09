"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Save, ArrowLeft, Plus, Trash2, Lock, Globe, Users, ChevronDown, X, Search } from "lucide-react";
import { Button } from "@/components/sekretariat/Button";
import { mockNotulensiExtract, NotulensiExtracted } from "@/lib/mockAIStream";
import { cn } from "@/lib/utils";
import { dosenData } from "@/lib/mock-data-kadep";
import Link from "next/link";
import type { NotulensiLabel, NotulensiAkses } from "@/lib/seed";

// ── Constants ──────────────────────────────────────────────────────────────────

const LABELS: NotulensiLabel[] = ["Departemen", "Prodi", "General", "Lainnya"];

type TingkatRapat =
  | "Departemen"
  | "Program Studi S1"
  | "Program Studi S2"
  | "Program Studi S3"
  | "Unit Kerja"
  | "Nasional / Eksternal";

const TINGKAT: TingkatRapat[] = [
  "Departemen",
  "Program Studi S1",
  "Program Studi S2",
  "Program Studi S3",
  "Unit Kerja",
  "Nasional / Eksternal",
];

const TENDIK = [
  "Budi Santoso",
  "Rina Kusuma",
  "Dewi Lestari",
  "Andi Prasetyo",
  "Sekretariat DPP",
];

const ALL_MEMBERS = [
  ...dosenData.map(d => ({ nama: d.nama, jabatan: d.jabatan })),
  ...TENDIK.map(n => ({ nama: n, jabatan: "Tendik" })),
];

const LABEL_COLORS: Record<NotulensiLabel, string> = {
  Departemen: "bg-blue-500/20 text-blue-300 border-blue-400/30",
  Prodi:      "bg-purple-500/20 text-purple-300 border-purple-400/30",
  General:    "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  Lainnya:    "bg-white/10 text-white/50 border-white/20",
};

// ── Member Picker ──────────────────────────────────────────────────────────────

function MemberPicker({
  value,
  onChange,
  placeholder = "Cari dan pilih anggota...",
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const suggestions = ALL_MEMBERS.filter(
    m => !value.includes(m.nama) &&
      (query === "" || m.nama.toLowerCase().includes(query.toLowerCase()) || m.jabatan.toLowerCase().includes(query.toLowerCase()))
  );

  const add = (nama: string) => {
    if (!value.includes(nama)) onChange([...value, nama]);
    setQuery("");
  };
  const remove = (nama: string) => onChange(value.filter(v => v !== nama));

  const addCustom = () => {
    const t = customInput.trim();
    if (t && !value.includes(t)) { onChange([...value, t]); setCustomInput(""); }
  };

  return (
    <div ref={ref} className="space-y-2">
      {/* Selected chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map(v => (
            <span key={v} className="flex items-center gap-1 text-xs text-white/80 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full">
              {v}
              <button onClick={() => remove(v)} className="text-white/40 hover:text-red-400 transition-colors ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search dropdown */}
      <div className="relative">
        <div
          className="flex items-center gap-2 w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 cursor-text"
          onClick={() => setOpen(true)}
        >
          <Search className="w-3.5 h-3.5 text-white/30 shrink-0" />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            placeholder={value.length ? "Tambah anggota lagi..." : placeholder}
            className="flex-1 bg-transparent text-xs text-white placeholder:text-white/25 focus:outline-none"
          />
          <ChevronDown className={cn("w-3.5 h-3.5 text-white/30 transition-transform shrink-0", open && "rotate-180")} />
        </div>

        {open && (
          <div className="absolute z-20 mt-1 w-full bg-[#1a1a3e] border border-white/15 rounded-xl shadow-2xl overflow-hidden max-h-52 overflow-y-auto">
            {suggestions.length === 0 && query && (
              <p className="px-4 py-3 text-xs text-white/30">Tidak ditemukan — gunakan tambah manual di bawah.</p>
            )}
            {suggestions.map(m => (
              <button key={m.nama} onClick={() => add(m.nama)}
                className="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-white/5 transition-colors">
                <span className="text-sm text-white/80">{m.nama}</span>
                <span className="text-[10px] text-white/30">{m.jabatan}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Manual add */}
      <div className="flex gap-2">
        <input
          value={customInput}
          onChange={e => setCustomInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (addCustom(), e.preventDefault())}
          placeholder="Tambah nama yang tidak ada di daftar..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-ugm-gold/40"
        />
        <button type="button" onClick={addCustom}
          className="text-xs text-ugm-gold/70 hover:text-ugm-gold px-2 flex items-center gap-1 transition-colors">
          <Plus className="w-3 h-3" />Tambah
        </button>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function NotulensiBaruPage() {
  const [transcript, setTranscript]   = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extracted, setExtracted]     = useState<NotulensiExtracted | null>(null);
  const [saved, setSaved]             = useState(false);

  // Meeting setup — available before extraction
  const [tingkat, setTingkat]   = useState<TingkatRapat>("Departemen");
  const [label, setLabel]       = useState<NotulensiLabel>("General");
  const [akses, setAkses]       = useState<NotulensiAkses>("anggota");

  // Extracted / editable fields
  const [judul, setJudul]         = useState("");
  const [pimpinan, setPimpinan]   = useState("");
  const [peserta, setPeserta]     = useState<string[]>([]);
  const [anggota, setAnggota]     = useState<string[]>([]);
  const [agenda, setAgenda]       = useState<string[]>([]);
  const [keputusan, setKeputusan] = useState<string[]>([]);
  const [tindakLanjut, setTindakLanjut] = useState<{ item: string; penanggungJawab: string; tenggat: string }[]>([]);

  const handleExtract = async () => {
    if (!transcript.trim()) return;
    setIsExtracting(true);
    try {
      const result = await mockNotulensiExtract(transcript);
      setExtracted(result);
      setJudul(result.judul);
      setPimpinan(result.pimpinanRapat);
      setPeserta(result.peserta);
      setAnggota(result.peserta); // default: peserta = anggota
      setAgenda(result.agenda);
      setKeputusan(result.keputusan);
      setTindakLanjut(result.tindakLanjut);
    } finally {
      setIsExtracting(false);
    }
  };

  if (saved) {
    return (
      <div className="max-w-2xl mx-auto mt-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto">
          <Save className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Notulensi Disimpan!</h2>
        <p className="text-white/50 text-sm">Notulensi berhasil disimpan sebagai Draft dan siap untuk disetujui.</p>
        <Link href="/kesekretariatan/notulensi">
          <Button variant="primary">Kembali ke Daftar Notulensi</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/kesekretariatan/notulensi">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Notulensi Baru</h1>
          <p className="text-sm text-white/40 mt-1">Isi metadata rapat, paste transkrip, lalu ekstrak dengan AI.</p>
        </div>
      </div>

      {/* ── Step 1: Meeting Metadata (always visible) ── */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">Metadata Rapat</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Tingkat Rapat */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Tingkat Rapat</label>
            <select value={tingkat} onChange={e => setTingkat(e.target.value as TingkatRapat)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-ugm-gold/50 transition-colors">
              {TINGKAT.map(t => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
            </select>
          </div>

          {/* Label */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Label</label>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {LABELS.map(l => (
                <button key={l} type="button" onClick={() => setLabel(l)}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-medium border transition-colors",
                    label === l
                      ? LABEL_COLORS[l]
                      : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
                  )}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Akses */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Akses Dokumen</label>
            <div className="flex gap-2">
              {([
                { val: "anggota", icon: Lock,  label: "Anggota Saja" },
                { val: "publik",  icon: Globe, label: "Publik" },
              ] as const).map(({ val, icon: Icon, label: lbl }) => (
                <button key={val} type="button" onClick={() => setAkses(val)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium border transition-colors",
                    akses === val
                      ? val === "publik"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                        : "bg-white/15 text-white border-white/30"
                      : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
                  )}>
                  <Icon className="w-3.5 h-3.5" />{lbl}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-white/30 mt-1.5">
              {akses === "publik"
                ? "Semua pengguna SIAPP dapat melihat notulensi ini."
                : "Hanya anggota terdaftar yang dapat mengakses."}
            </p>
          </div>
        </div>

        {/* Anggota picker — shown regardless of akses so you can pre-set members */}
        {akses === "anggota" && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wide flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Anggota (Hak Akses)
              </label>
              {peserta.length > 0 && (
                <button type="button" onClick={() => setAnggota(peserta)}
                  className="text-[10px] text-ugm-gold/70 hover:text-ugm-gold transition-colors">
                  Salin dari Peserta
                </button>
              )}
            </div>
            <MemberPicker value={anggota} onChange={setAnggota} />
          </div>
        )}
      </div>

      {/* ── Step 2: Transcript + Extraction ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left — Transcript */}
        <div className="glass rounded-2xl p-5 space-y-4">
          <p className="text-sm font-semibold text-white">Transkrip Rapat</p>
          <textarea
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
            rows={16}
            placeholder={"Paste transkrip rapat di sini...\n\nContoh:\nRapat dibuka oleh Dr. Hendra pukul 09.00\nAgenda: membahas persiapan akreditasi...\nKeputusan: borang harus selesai 15 Mei..."}
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-ugm-gold/50 transition-colors resize-none font-mono"
          />
          <Button variant="primary" onClick={handleExtract}
            disabled={!transcript.trim() || isExtracting} className="w-full justify-center">
            <Sparkles className={cn("w-4 h-4", isExtracting && "animate-pulse")} />
            {isExtracting ? "AI Sedang Mengekstrak..." : "Ekstrak dengan AI"}
          </Button>
          {isExtracting && (
            <div className="flex items-center gap-2 justify-center text-xs text-amber-300/70">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Menganalisis transkrip...
            </div>
          )}
        </div>

        {/* Right — Extracted form */}
        <div className="space-y-4">
          {!extracted && !isExtracting && (
            <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[200px] space-y-3">
              <Sparkles className="w-8 h-8 text-white/20" />
              <p className="text-white/30 text-sm">Hasil ekstraksi AI akan muncul di sini</p>
              <p className="text-white/20 text-xs">Atau isi manual di bawah tanpa transkrip</p>
            </div>
          )}

          {(extracted || !isExtracting) && (
            <div className="glass rounded-2xl p-5 space-y-5">
              <p className="text-sm font-semibold text-white">
                {extracted ? "Hasil Ekstraksi — Dapat Diedit" : "Isi Manual"}
              </p>

              {/* Judul */}
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Judul Rapat</label>
                <input value={judul} onChange={e => setJudul(e.target.value)}
                  placeholder="Judul rapat..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-ugm-gold/50 transition-colors" />
              </div>

              {/* Pimpinan */}
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Pimpinan Rapat</label>
                <input value={pimpinan} onChange={e => setPimpinan(e.target.value)}
                  placeholder="Nama pimpinan rapat..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-ugm-gold/50 transition-colors" />
              </div>

              {/* Peserta */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-white/50 uppercase tracking-wide">Peserta Rapat</label>
                  <div className="flex gap-2">
                    {akses === "anggota" && peserta.length > 0 && (
                      <button type="button" onClick={() => setAnggota(prev => Array.from(new Set([...prev, ...peserta])))}
                        className="text-[10px] text-ugm-gold/70 hover:text-ugm-gold transition-colors">
                        + Tambah ke Anggota
                      </button>
                    )}
                    <button onClick={() => setPeserta(p => [...p, ""])}
                      className="text-xs text-ugm-gold/70 hover:text-ugm-gold flex items-center gap-1">
                      <Plus className="w-3 h-3" />Tambah
                    </button>
                  </div>
                </div>
                <MemberPicker value={peserta} onChange={setPeserta} placeholder="Cari peserta rapat..." />
              </div>

              {/* Keputusan */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-white/50 uppercase tracking-wide">Keputusan</label>
                  <button onClick={() => setKeputusan(k => [...k, ""])}
                    className="text-xs text-ugm-gold/70 hover:text-ugm-gold flex items-center gap-1">
                    <Plus className="w-3 h-3" />Tambah
                  </button>
                </div>
                <div className="space-y-1.5">
                  {keputusan.map((k, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={k}
                        onChange={e => setKeputusan(prev => prev.map((x, j) => j === i ? e.target.value : x))}
                        className="flex-1 bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-ugm-gold/50 transition-colors" />
                      <button onClick={() => setKeputusan(prev => prev.filter((_, j) => j !== i))}
                        className="text-white/30 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {keputusan.length === 0 && (
                    <p className="text-xs text-white/20 py-1">Belum ada keputusan.</p>
                  )}
                </div>
              </div>

              {/* Tindak Lanjut */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-white/50 uppercase tracking-wide">Tindak Lanjut</label>
                  <button onClick={() => setTindakLanjut(tl => [...tl, { item: "", penanggungJawab: "", tenggat: "" }])}
                    className="text-xs text-ugm-gold/70 hover:text-ugm-gold flex items-center gap-1">
                    <Plus className="w-3 h-3" />Tambah
                  </button>
                </div>
                <div className="space-y-2">
                  {tindakLanjut.map((tl, i) => (
                    <div key={i} className="glass rounded-xl p-3 space-y-1.5 relative">
                      <button onClick={() => setTindakLanjut(prev => prev.filter((_, j) => j !== i))}
                        className="absolute top-2 right-2 text-white/20 hover:text-red-400 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                      <input value={tl.item}
                        onChange={e => setTindakLanjut(prev => prev.map((x, j) => j === i ? { ...x, item: e.target.value } : x))}
                        placeholder="Item tindak lanjut"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/25 focus:outline-none" />
                      <div className="grid grid-cols-2 gap-1.5">
                        <input value={tl.penanggungJawab}
                          onChange={e => setTindakLanjut(prev => prev.map((x, j) => j === i ? { ...x, penanggungJawab: e.target.value } : x))}
                          placeholder="Penanggung jawab"
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/25 focus:outline-none" />
                        <input type="date" value={tl.tenggat}
                          onChange={e => setTindakLanjut(prev => prev.map((x, j) => j === i ? { ...x, tenggat: e.target.value } : x))}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none" />
                      </div>
                    </div>
                  ))}
                  {tindakLanjut.length === 0 && (
                    <p className="text-xs text-white/20 py-1">Belum ada tindak lanjut.</p>
                  )}
                </div>
              </div>

              {/* Summary before save */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-1 text-xs text-white/40">
                <div className="flex justify-between">
                  <span>Tingkat</span><span className="text-white/60">{tingkat}</span>
                </div>
                <div className="flex justify-between">
                  <span>Label</span><span className="text-white/60">{label}</span>
                </div>
                <div className="flex justify-between">
                  <span>Akses</span>
                  <span className={akses === "publik" ? "text-emerald-300" : "text-white/60"}>
                    {akses === "publik" ? "🌐 Publik" : `🔒 Anggota (${anggota.length} orang)`}
                  </span>
                </div>
              </div>

              <Button variant="primary" onClick={() => setSaved(true)}
                className="w-full justify-center" disabled={!judul}>
                <Save className="w-4 h-4" />
                Simpan Notulensi
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
