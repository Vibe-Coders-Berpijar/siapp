"use client";

import { useState } from "react";
import { Plus, Eye, Search, Filter, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import {
  letters as seedLetters,
  Letter,
  LetterCategory,
} from "@/lib/seed";
import { DataTable, Column } from "@/components/sekretariat/DataTable";
import { Badge } from "@/components/sekretariat/Badge";
import { Button } from "@/components/sekretariat/Button";
import { LetterPreview } from "@/components/sekretariat/LetterPreview";
import { NewLetterForm } from "@/components/sekretariat/NewLetterForm";
import { formatDateShort } from "@/lib/utils";
import { createWorkflow } from "@/lib/mock-workflow";
import { mockSendWhatsApp, mockSendEmail } from "@/lib/mock-notifications";

const CATEGORY_LABELS: Record<LetterCategory, string> = {
  undangan:      "Undangan",
  keputusan:     "Keputusan",
  tugas:         "Tugas",
  keterangan:    "Keterangan",
  permohonan:    "Permohonan",
  pemberitahuan: "Pemberitahuan",
  lainnya:       "Lainnya",
};

export default function PersuratanPage() {
  const [letters, setLetters] = useState<Letter[]>(seedLetters);
  const [direction, setDirection] = useState<"keluar" | "masuk" | "semua">("semua");
  const [categoryFilter, setCategoryFilter] = useState<LetterCategory | "semua">("semua");
  const [statusFilter, setStatusFilter] = useState<string>("Semua");
  const [search, setSearch]   = useState("");
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [showNewForm, setShowNewForm]   = useState(false);

  // Compute next seq for outgoing letters
  const maxKeluar = Math.max(
    0,
    ...letters.filter(l => l.direction === "keluar").map(l => l.id)
  );
  const nextSeq = maxKeluar + 1;

  const filtered = letters.filter(l => {
    const matchDir = direction === "semua" || l.direction === direction;
    const matchCat = categoryFilter === "semua" || l.category === categoryFilter;
    const matchStatus = statusFilter === "Semua" || l.status === statusFilter;
    const matchSearch = !search ||
      l.perihal.toLowerCase().includes(search.toLowerCase()) ||
      l.nomor.toLowerCase().includes(search.toLowerCase()) ||
      l.tujuan.toLowerCase().includes(search.toLowerCase()) ||
      l.pengirim.toLowerCase().includes(search.toLowerCase());
    return matchDir && matchCat && matchStatus && matchSearch;
  });

  const handleSaveLetter = (data: {
    perihal: string;
    tujuan: string;
    isi: string;
    category: LetterCategory;
    status: "Draft" | "Menunggu";
  }) => {
    const nextId = Math.max(...letters.map(l => l.id)) + 1;
    const year = new Date().getFullYear();
    const now = new Date().toISOString().slice(0, 10);
    const timeNow = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    const nomor = `B/${String(nextSeq).padStart(3, "0")}/UN1.SIPSO/HM/${year}`;

    // Create workflow instance
    const wfInitialStatus = data.status === "Menunggu" ? "SUBMITTED" : "DRAFT";
    const wfInstance = createWorkflow("surat.keluar", String(nextId), wfInitialStatus);
    if (data.status === "Menunggu") {
      mockSendWhatsApp("Kadep", "Surat baru menunggu persetujuan Anda di SIAPP.");
      mockSendEmail("kadep@ugm.ac.id", "[SIAPP] Surat Baru Menunggu Persetujuan");
    }

    const newLetter: Letter = {
      id: nextId,
      direction: "keluar",
      category: data.category,
      nomor,
      perihal: data.perihal,
      tujuan: data.tujuan,
      pengirim: "Sekretariat DPP UGM",
      tanggal: now,
      status: data.status,
      approvalStep: data.status === "Menunggu" ? 1 : 0,
      isi: data.isi,
      workflowInstanceId: wfInstance.id,
      auditLog: [
        {
          aksi: data.status === "Menunggu" ? "Dibuat & Dikirim ke Sekdep" : "Dibuat (Draft)",
          oleh: "Admin Sekretariat",
          waktu: `${now} ${timeNow}`,
        },
      ],
    };
    setLetters(prev => [newLetter, ...prev]);
    setShowNewForm(false);
  };

  const handleUpdateLetter = (updated: Letter) => {
    setLetters(prev => prev.map(l => l.id === updated.id ? updated : l));
    setSelectedLetter(updated);
  };

  const columns: Column<Letter>[] = [
    {
      key: "direction",
      label: "",
      render: (v) =>
        v === "keluar" ? (
          <ArrowUpRight className="w-3.5 h-3.5 text-ugm-gold/70" />
        ) : (
          <ArrowDownLeft className="w-3.5 h-3.5 text-blue-400/70" />
        ),
    },
    {
      key: "nomor",
      label: "Nomor Surat",
      sortable: true,
      render: (v) => <span className="font-mono text-xs text-white/70">{String(v)}</span>,
    },
    {
      key: "perihal",
      label: "Perihal",
      sortable: true,
      render: (v) => (
        <span className="max-w-xs block truncate font-medium text-white/90">{String(v)}</span>
      ),
    },
    {
      key: "category",
      label: "Kategori",
      render: (v) => (
        <span className="text-xs text-white/50 px-2 py-0.5 rounded-lg bg-white/5 border border-white/10">
          {CATEGORY_LABELS[v as LetterCategory] ?? String(v)}
        </span>
      ),
    },
    {
      key: "tujuan",
      label: "Kepada / Dari",
      sortable: true,
      render: (_, row) => {
        const l = row as Letter;
        return (
          <span className="text-white/60 text-xs max-w-[140px] block truncate">
            {l.direction === "keluar" ? l.tujuan : l.pengirim}
          </span>
        );
      },
    },
    {
      key: "tanggal",
      label: "Tanggal",
      sortable: true,
      render: (v) => <span className="text-white/50 text-xs whitespace-nowrap">{formatDateShort(String(v))}</span>,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (v) => <Badge>{String(v)}</Badge>,
    },
    {
      key: "id",
      label: "Aksi",
      render: (_, row) => (
        <Button size="sm" variant="ghost" onClick={() => setSelectedLetter(row as Letter)}>
          <Eye className="w-3.5 h-3.5" />
          Lihat
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Persuratan</h1>
          <p className="text-sm text-white/40 mt-1">
            Kelola korespondensi dan alur persetujuan surat departemen.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowNewForm(true)}>
          <Plus className="w-4 h-4" />
          Buat Surat Baru
        </Button>
      </div>

      {/* Direction tabs */}
      <div className="flex gap-2">
        {(["semua", "keluar", "masuk"] as const).map(d => {
          const count = d === "semua" ? letters.length : letters.filter(l => l.direction === d).length;
          return (
            <button
              key={d}
              onClick={() => setDirection(d)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                direction === d
                  ? "bg-ugm-gold/20 text-ugm-gold border-ugm-gold/40"
                  : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10"
              }`}
            >
              {d === "keluar" && <ArrowUpRight className="w-3.5 h-3.5" />}
              {d === "masuk"  && <ArrowDownLeft className="w-3.5 h-3.5" />}
              {d === "semua" ? "Semua" : d.charAt(0).toUpperCase() + d.slice(1)}
              <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        {(["semua", "undangan", "keputusan", "tugas", "keterangan", "permohonan", "pemberitahuan", "lainnya"] as const).map(c => {
          const count = c === "semua"
            ? (direction === "semua" ? letters : letters.filter(l => l.direction === direction)).length
            : letters.filter(l => l.category === c && (direction === "semua" || l.direction === direction)).length;
          if (count === 0 && c !== "semua") return null;
          return (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                categoryFilter === c
                  ? "bg-ugm-gold/15 text-ugm-gold border-ugm-gold/30"
                  : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
              }`}
            >
              {c === "semua" ? "Semua Kategori" : CATEGORY_LABELS[c]}
            </button>
          );
        })}
      </div>

      {/* Status filter + search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {(["Semua", "Draft", "Menunggu", "Ditandatangani", "Diarsipkan"] as const).map(s => {
            const count = s === "Semua" ? filtered.length : letters.filter(l => l.status === s).length;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  statusFilter === s
                    ? "bg-ugm-gold/20 text-ugm-gold border-ugm-gold/40"
                    : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10"
                }`}
              >
                {s} <span className="ml-1 opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
        <div className="relative flex-1 max-w-xs ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari perihal, nomor..."
            className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-ugm-gold/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1 text-xs text-white/30">
          <Filter className="w-3.5 h-3.5" />
          {filtered.length} dari {letters.length}
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filtered}
        emptyMessage="Tidak ada surat yang cocok dengan filter."
      />

      {/* Modals */}
      {selectedLetter && (
        <LetterPreview
          letter={selectedLetter}
          onClose={() => setSelectedLetter(null)}
          onUpdate={handleUpdateLetter}
        />
      )}
      {showNewForm && (
        <NewLetterForm
          onClose={() => setShowNewForm(false)}
          onSave={handleSaveLetter}
          nextSeq={nextSeq}
        />
      )}
    </div>
  );
}
