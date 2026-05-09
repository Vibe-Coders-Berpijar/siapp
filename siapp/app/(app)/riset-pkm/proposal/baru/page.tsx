'use client';

import { useState } from 'react';
import Link from 'next/link';
import { generateRisetOutline } from '../../actions';

// TODO: replace with import from @/components/shared once Dev D merges
interface AiDraftBannerProps {
  content: string;
  onAccept: (content: string) => void;
  onReject: () => void;
}

function AiDraftBanner({ content, onAccept, onReject }: AiDraftBannerProps) {
  const [accepting, setAccepting] = useState(false);

  async function handleAccept() {
    setAccepting(true);
    await new Promise((r) => setTimeout(r, 600));
    onAccept(content);
    setAccepting(false);
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/80 backdrop-blur p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-amber-600 text-base">✦</span>
          <span className="text-sm font-semibold text-amber-800">Draf Outline dari AI</span>
          <span className="text-[10px] font-semibold bg-amber-200 text-amber-700 px-1.5 py-0.5 rounded-full">DRAF</span>
        </div>
        <button onClick={onReject} className="text-amber-400 hover:text-amber-700 text-xl leading-none">×</button>
      </div>
      <pre className="text-xs text-amber-900 whitespace-pre-wrap font-sans leading-relaxed bg-white/60 rounded-lg p-3 border border-amber-100 max-h-72 overflow-y-auto">
        {content}
      </pre>
      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          disabled={accepting}
          className="flex-1 py-1.5 rounded-lg bg-[#231F54] text-white text-sm font-semibold hover:bg-indigo-900 transition-colors disabled:opacity-50"
        >
          {accepting ? 'Menyalin...' : 'Gunakan Outline Ini'}
        </button>
        <button
          onClick={onReject}
          className="px-4 py-1.5 rounded-lg border border-amber-200 text-sm text-amber-700 hover:bg-amber-100 transition-colors"
        >
          Abaikan
        </button>
      </div>
    </div>
  );
}

type Jenis = 'Penelitian' | 'PkM';

type Submitted = 'draft' | 'review';

export default function ProposalBaruPage() {
  const [jenis, setJenis] = useState<Jenis>('Penelitian');
  const [judul, setJudul] = useState('');
  const [abstrak, setAbstrak] = useState('');
  const [anggota, setAnggota] = useState<string[]>([]);
  const [anggotaInput, setAnggotaInput] = useState('');
  const [anggaran, setAnggaran] = useState('');
  const [durasi, setDurasi] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDraft, setAiDraft] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Submitted | null>(null);

  const canSubmit = judul.trim() && abstrak.trim() && anggaran.trim() && durasi;

  async function handleAIOutline() {
    if (!judul.trim()) return;
    setAiLoading(true);
    try {
      const outline = await generateRisetOutline(judul, jenis, new Date().getFullYear());
      setAiDraft(outline);
    } catch {
      setAiDraft('Gagal membuat outline. Coba lagi dalam beberapa saat.');
    } finally {
      setAiLoading(false);
    }
  }

  function handleAcceptDraft(content: string) {
    setAbstrak((prev) => (prev ? prev + '\n\n---\n\n' + content : content));
    setAiDraft(null);
  }

  function addAnggota() {
    const t = anggotaInput.trim();
    if (t && !anggota.includes(t)) setAnggota((a) => [...a, t]);
    setAnggotaInput('');
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-8 max-w-md w-full text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto text-2xl">
            ✓
          </div>
          <h2 className="font-bold text-gray-900 text-lg">
            {submitted === 'draft' ? 'Proposal Disimpan sebagai Draft' : 'Proposal Dikirim untuk Review'}
          </h2>
          <p className="text-sm text-gray-500">
            {submitted === 'draft'
              ? 'Anda dapat melanjutkan pengisian kapan saja dan mengirimkannya nanti.'
              : 'Proposal akan ditinjau oleh Koordinator Riset. Anda akan diberitahu melalui email bila ada pembaruan.'}
          </p>
          <div className="flex gap-3 pt-2">
            <Link
              href="/riset-pkm"
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors text-center"
            >
              Lihat Semua Proposal
            </Link>
            <Link
              href="/dashboard/dosen"
              className="flex-1 py-2.5 rounded-xl bg-[#231F54] text-white text-sm font-semibold hover:bg-indigo-900 transition-colors text-center"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/dashboard/dosen" className="hover:text-gray-800 transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/riset-pkm" className="hover:text-gray-800 transition-colors">Riset &amp; PkM</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Buat Proposal</span>
        </div>

        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-6 space-y-6">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Buat Proposal Baru</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Isi formulir di bawah untuk mengajukan proposal riset atau pengabdian
            </p>
          </div>

          {/* Jenis */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Jenis Kegiatan
            </label>
            <div className="flex gap-3">
              {(['Penelitian', 'PkM'] as Jenis[]).map((j) => (
                <button
                  key={j}
                  onClick={() => setJenis(j)}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                    jenis === j
                      ? 'border-[#231F54] bg-[#231F54] text-white'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {j === 'Penelitian' ? '🔬 Penelitian' : '🤝 Pengabdian kepada Masyarakat'}
                </button>
              ))}
            </div>
          </div>

          {/* Judul */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Judul Proposal
            </label>
            <input
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder={
                jenis === 'Penelitian'
                  ? 'Contoh: Desentralisasi Fiskal dan Kapasitas Pemerintah Daerah...'
                  : 'Contoh: Pelatihan Literasi Digital bagi Aparatur Desa...'
              }
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* AI Outline */}
          <button
            onClick={handleAIOutline}
            disabled={aiLoading || !judul.trim()}
            className="w-full py-2.5 rounded-xl border-2 border-dashed border-indigo-300 text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {aiLoading ? (
              <>
                <span className="inline-block h-4 w-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                AI sedang menyusun outline...
              </>
            ) : (
              '✦ Bantu AI Buat Outline'
            )}
          </button>

          {/* AI Draft Banner */}
          {aiDraft && (
            <AiDraftBanner
              content={aiDraft}
              onAccept={handleAcceptDraft}
              onReject={() => setAiDraft(null)}
            />
          )}

          {/* Abstrak */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              {jenis === 'Penelitian' ? 'Abstrak / Latar Belakang' : 'Deskripsi Kegiatan'}
            </label>
            <textarea
              value={abstrak}
              onChange={(e) => setAbstrak(e.target.value)}
              placeholder={
                jenis === 'Penelitian'
                  ? 'Uraikan latar belakang, rumusan masalah, dan tujuan penelitian...'
                  : 'Uraikan situasi masyarakat sasaran, permasalahan, dan solusi yang ditawarkan...'
              }
              rows={6}
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Anggota Tim */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Anggota Tim
            </label>
            <div className="flex gap-2">
              <input
                value={anggotaInput}
                onChange={(e) => setAnggotaInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); addAnggota(); }
                }}
                placeholder="Nama anggota (tekan Enter untuk tambah)"
                className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button
                onClick={addAnggota}
                className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
              >
                + Tambah
              </button>
            </div>
            {anggota.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {anggota.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full border border-indigo-100"
                  >
                    {a}
                    <button
                      onClick={() => setAnggota((prev) => prev.filter((m) => m !== a))}
                      className="hover:text-red-500 leading-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Anggaran + Durasi */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Anggaran yang Diajukan
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">Rp</span>
                <input
                  type="text"
                  value={anggaran}
                  onChange={(e) => setAnggaran(e.target.value)}
                  placeholder="50.000.000"
                  className="w-full text-sm border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Durasi
              </label>
              <select
                value={durasi}
                onChange={(e) => setDurasi(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <option value="">Pilih durasi</option>
                {['3 bulan', '6 bulan', '8 bulan', '10 bulan', '12 bulan', '18 bulan', '24 bulan'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={() => setSubmitted('draft')}
                disabled={!judul.trim()}
                className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Simpan Draft
              </button>
              <button
                onClick={() => setSubmitted('review')}
                disabled={!canSubmit}
                className="flex-1 py-2.5 rounded-xl bg-[#231F54] text-white text-sm font-semibold hover:bg-indigo-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Kirim untuk Review
              </button>
            </div>
            <p className="text-[11px] text-gray-400 text-center">
              &quot;Kirim untuk Review&quot; memerlukan judul, deskripsi, anggaran, dan durasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
