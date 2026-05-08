"use client";

import { useState } from "react";
import { Sparkles, Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/sekretariat/Button";
import { mockNotulensiExtract, NotulensiExtracted } from "@/lib/mockAIStream";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotulensiBaruPage() {
  const [transcript, setTranscript] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extracted, setExtracted] = useState<NotulensiExtracted | null>(null);
  const [saved, setSaved] = useState(false);

  // Editable fields after extraction
  const [judul, setJudul]             = useState("");
  const [pimpinan, setPimpinan]       = useState("");
  const [peserta, setPeserta]         = useState<string[]>([]);
  const [agenda, setAgenda]           = useState<string[]>([]); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [keputusan, setKeputusan]     = useState<string[]>([]);
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
      setAgenda(result.agenda);
      setKeputusan(result.keputusan);
      setTindakLanjut(result.tindakLanjut);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSave = () => {
    setSaved(true);
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
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/kesekretariatan/notulensi">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Notulensi Baru</h1>
          <p className="text-sm text-white/40 mt-1">
            Paste transkrip rapat lalu biarkan AI mengekstrak poin-poin penting.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left — Transcript input */}
        <div className="space-y-4">
          <div className="glass rounded-2xl p-5 space-y-4">
            <p className="text-sm font-semibold text-white">Transkrip Rapat</p>
            <textarea
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              rows={18}
              placeholder={"Paste transkrip rapat di sini...\n\nContoh:\nRapat dibuka oleh Dr. Hendra pukul 09.00\nAgenda: membahas persiapan akreditasi...\nKeputusan: borang harus selesai 15 Mei..."}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-ugm-gold/50 transition-colors resize-none font-mono"
            />
            <Button
              variant="primary"
              onClick={handleExtract}
              disabled={!transcript.trim() || isExtracting}
              className="w-full justify-center"
            >
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
        </div>

        {/* Right — Extracted form */}
        <div className="space-y-4">
          {!extracted && !isExtracting && (
            <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[200px] space-y-3">
              <Sparkles className="w-8 h-8 text-white/20" />
              <p className="text-white/30 text-sm">Hasil ekstraksi AI akan muncul di sini</p>
            </div>
          )}

          {extracted && (
            <div className="glass rounded-2xl p-5 space-y-5">
              <p className="text-sm font-semibold text-white">Hasil Ekstraksi — Dapat Diedit</p>

              {/* Judul */}
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Judul Rapat</label>
                <input
                  value={judul}
                  onChange={e => setJudul(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-ugm-gold/50 transition-colors"
                />
              </div>

              {/* Pimpinan */}
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Pimpinan Rapat</label>
                <input
                  value={pimpinan}
                  onChange={e => setPimpinan(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-ugm-gold/50 transition-colors"
                />
              </div>

              {/* Peserta */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-white/50 uppercase tracking-wide">Peserta</label>
                  <button onClick={() => setPeserta(p => [...p, ""])}
                    className="text-xs text-ugm-gold/70 hover:text-ugm-gold flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Tambah
                  </button>
                </div>
                <div className="space-y-1.5">
                  {peserta.map((p, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={p}
                        onChange={e => setPeserta(prev => prev.map((x, j) => j === i ? e.target.value : x))}
                        className="flex-1 bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-ugm-gold/50 transition-colors"
                      />
                      <button onClick={() => setPeserta(prev => prev.filter((_, j) => j !== i))}
                        className="text-white/30 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keputusan */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-white/50 uppercase tracking-wide">Keputusan</label>
                  <button onClick={() => setKeputusan(k => [...k, ""])}
                    className="text-xs text-ugm-gold/70 hover:text-ugm-gold flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Tambah
                  </button>
                </div>
                <div className="space-y-1.5">
                  {keputusan.map((k, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={k}
                        onChange={e => setKeputusan(prev => prev.map((x, j) => j === i ? e.target.value : x))}
                        className="flex-1 bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-ugm-gold/50 transition-colors"
                      />
                      <button onClick={() => setKeputusan(prev => prev.filter((_, j) => j !== i))}
                        className="text-white/30 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tindak Lanjut */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-white/50 uppercase tracking-wide">Tindak Lanjut</label>
                  <button onClick={() => setTindakLanjut(tl => [...tl, { item: "", penanggungJawab: "", tenggat: "" }])}
                    className="text-xs text-ugm-gold/70 hover:text-ugm-gold flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Tambah
                  </button>
                </div>
                <div className="space-y-2">
                  {tindakLanjut.map((tl, i) => (
                    <div key={i} className="glass rounded-xl p-3 space-y-1.5">
                      <input
                        value={tl.item}
                        onChange={e => setTindakLanjut(prev => prev.map((x, j) => j === i ? { ...x, item: e.target.value } : x))}
                        placeholder="Item tindak lanjut"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/25 focus:outline-none"
                      />
                      <div className="grid grid-cols-2 gap-1.5">
                        <input
                          value={tl.penanggungJawab}
                          onChange={e => setTindakLanjut(prev => prev.map((x, j) => j === i ? { ...x, penanggungJawab: e.target.value } : x))}
                          placeholder="Penanggung jawab"
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/25 focus:outline-none"
                        />
                        <input
                          type="date"
                          value={tl.tenggat}
                          onChange={e => setTindakLanjut(prev => prev.map((x, j) => j === i ? { ...x, tenggat: e.target.value } : x))}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="primary" onClick={handleSave} className="w-full justify-center" disabled={!judul}>
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
