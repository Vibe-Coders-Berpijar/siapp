"use client";

import { useState, useRef } from "react";
import { X, Sparkles, Send, Save, Wand2 } from "lucide-react";
import { Button } from "@/components/sekretariat/Button";
import { letterTemplates, LetterCategory } from "@/lib/seed";
import { cn } from "@/lib/utils";

// mockAIImprove — local shim since lib/mockAIStream only re-exports mockAIStream
async function* mockAIImprove(original: string): AsyncGenerator<string> {
  const improved = `Dengan hormat,

${original
  .replace(/dengan hormat,?\s*/i, "")
  .replace(/hormat kami,[\s\S]*/i, "")
  .trim()
  .split(". ")
  .map((s: string) => s.trim())
  .filter(Boolean)
  .join(".\n\n")}

Demikian surat ini kami sampaikan dengan hormat. Atas perhatian serta kerja sama yang baik dari Bapak/Ibu, kami menyampaikan terima kasih yang sebesar-besarnya.

Hormat kami,
Sekretariat
Departemen Pendidikan Profesi
Universitas Gadjah Mada`;

  for (const char of improved.split("")) {
    yield char;
    await new Promise((r) => setTimeout(r, 5 + Math.random() * 15));
  }
}

interface NewLetterFormProps {
  onClose: () => void;
  onSave: (letter: {
    perihal: string;
    tujuan: string;
    isi: string;
    category: LetterCategory;
    status: "Draft" | "Menunggu";
  }) => void;
  nextSeq: number;
}

const CATEGORIES: { value: LetterCategory; label: string }[] = [
  { value: "undangan",      label: "Undangan" },
  { value: "keputusan",     label: "Keputusan" },
  { value: "tugas",         label: "Tugas" },
  { value: "keterangan",    label: "Keterangan" },
  { value: "permohonan",    label: "Permohonan" },
  { value: "pemberitahuan", label: "Pemberitahuan" },
  { value: "lainnya",       label: "Lainnya" },
];

export function NewLetterForm({ onClose, onSave, nextSeq }: NewLetterFormProps) {
  const [category, setCategory] = useState<LetterCategory>("undangan");
  const [perihal, setPerihal]   = useState("");
  const [tujuan, setTujuan]     = useState("");
  const [isi, setIsi]           = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamMode, setStreamMode]  = useState<"draft" | "improve" | null>(null);
  const abortRef = useRef(false);

  const year = new Date().getFullYear();
  const nomorPreview = `B/${String(nextSeq).padStart(3, "0")}/UN1.SIPSO/HM/${year}`;

  const handleAIDraft = async () => {
    if (!perihal) return;
    abortRef.current = false;
    setIsStreaming(true);
    setStreamMode("draft");
    setIsi("");

    void (category === "undangan" ? "undangan" : category === "permohonan" ? "permohonan" : "default");

    try {
      // mockAIStream from lib/mock-ai expects (content, delay) signature — use a simple shim
      const content = `Dengan hormat,

Sehubungan dengan ${perihal || "keperluan yang dimaksud"}, bersama surat ini kami menyampaikan informasi penting yang perlu mendapat perhatian Bapak/Ibu.

Departemen Pendidikan Profesi (DPP) Universitas Gadjah Mada senantiasa berkomitmen untuk menjalin komunikasi yang baik dengan seluruh pemangku kepentingan demi tercapainya visi dan misi institusi.

Kami mohon agar hal yang disampaikan dalam surat ini dapat ditindaklanjuti sebagaimana mestinya.

Demikian surat ini kami sampaikan. Atas perhatian Bapak/Ibu, kami ucapkan terima kasih.

Hormat kami,
Sekretariat DPP UGM`;

      for (const char of content.split("")) {
        if (abortRef.current) break;
        setIsi(prev => prev + char);
        await new Promise(r => setTimeout(r, 10 + Math.random() * 20));
      }
    } finally {
      setIsStreaming(false);
      setStreamMode(null);
    }
  };

  const handleImprove = async () => {
    if (!isi) return;
    abortRef.current = false;
    setIsStreaming(true);
    setStreamMode("improve");
    const original = isi;
    setIsi("");

    try {
      for await (const chunk of mockAIImprove(original)) {
        if (abortRef.current) break;
        setIsi(prev => prev + chunk);
      }
    } finally {
      setIsStreaming(false);
      setStreamMode(null);
    }
  };

  const handleTemplate = () => {
    const tpl = letterTemplates.find(t => t.category === category);
    if (!tpl) return;
    if (!perihal) setPerihal(tpl.subject);
    setIsi(tpl.body);
  };

  const handleStop = () => { abortRef.current = true; };

  const handleSubmit = (status: "Draft" | "Menunggu") => {
    if (!perihal || !tujuan) return;
    onSave({ perihal, tujuan, isi, category, status });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-white/14">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <p className="font-semibold text-white">Buat Surat Keluar</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">
              Kategori
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as LetterCategory)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-ugm-gold/50 transition-colors"
            >
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value} className="bg-gray-900">{c.label}</option>
              ))}
            </select>
          </div>

          {/* Nomor preview */}
          <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">
            <p className="text-[10px] text-white/30 uppercase tracking-wide mb-0.5">Nomor Surat (otomatis)</p>
            <p className="text-sm font-mono text-white/60">{nomorPreview}</p>
          </div>

          {/* Perihal */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">
              Perihal <span className="text-red-400">*</span>
            </label>
            <input
              value={perihal}
              onChange={e => setPerihal(e.target.value)}
              placeholder="Contoh: Undangan Seminar Internasional"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-ugm-gold/50 focus:bg-white/8 transition-colors"
            />
          </div>

          {/* Kepada */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">
              Kepada Yth. <span className="text-red-400">*</span>
            </label>
            <input
              value={tujuan}
              onChange={e => setTujuan(e.target.value)}
              placeholder="Nama / Jabatan penerima"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-ugm-gold/50 focus:bg-white/8 transition-colors"
            />
          </div>

          {/* Isi Surat */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wide">
                Isi Surat
              </label>
              <div className="flex items-center gap-1.5">
                <Button size="sm" variant="ghost" onClick={handleTemplate} className="text-white/40 text-xs">
                  Gunakan Template
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={isStreaming ? handleStop : handleAIDraft}
                  disabled={!perihal && !isStreaming}
                  className={cn(
                    "gap-1.5",
                    isStreaming && streamMode === "draft" && "border-amber-400/40 text-amber-300 hover:bg-amber-400/10"
                  )}
                >
                  <Sparkles className={cn("w-3.5 h-3.5", isStreaming && streamMode === "draft" && "animate-pulse")} />
                  {isStreaming && streamMode === "draft" ? "Hentikan" : "AI Draft"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={isStreaming ? handleStop : handleImprove}
                  disabled={!isi && !isStreaming}
                  className={cn(
                    "gap-1.5",
                    isStreaming && streamMode === "improve" && "border-purple-400/40 text-purple-300 hover:bg-purple-400/10"
                  )}
                >
                  <Wand2 className={cn("w-3.5 h-3.5", isStreaming && streamMode === "improve" && "animate-pulse")} />
                  {isStreaming && streamMode === "improve" ? "Hentikan" : "Perbaiki"}
                </Button>
              </div>
            </div>
            <div className="relative">
              <textarea
                value={isi}
                onChange={e => setIsi(e.target.value)}
                rows={10}
                placeholder="Tulis isi surat di sini, atau gunakan AI Draft / Template..."
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-ugm-gold/50 focus:bg-white/8 transition-colors resize-none font-mono"
              />
              {isStreaming && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-amber-300/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  {streamMode === "improve" ? "AI memperbaiki..." : "AI sedang menulis..."}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10">
          <Button variant="ghost" onClick={onClose}>Batal</Button>
          <Button
            variant="outline"
            onClick={() => handleSubmit("Draft")}
            disabled={!perihal || !tujuan}
          >
            <Save className="w-4 h-4" />
            Simpan Draft
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmit("Menunggu")}
            disabled={!perihal || !tujuan || !isi}
          >
            <Send className="w-4 h-4" />
            Kirim ke Persetujuan
          </Button>
        </div>
      </div>
    </div>
  );
}
