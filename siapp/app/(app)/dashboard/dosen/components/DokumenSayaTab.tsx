'use client';

import { useState, useRef } from 'react';
import { Search, Plus, FileText, Upload, X, Download, Eye } from 'lucide-react';

type TipeDokumen = 'SK' | 'Sertifikat' | 'Laporan' | 'Kontrak' | 'Publikasi' | 'Lainnya';
type Klasifikasi = 'Publik' | 'Internal' | 'Rahasia';

interface Dokumen {
  id: number;
  nama: string;
  tipe: TipeDokumen;
  klasifikasi: Klasifikasi;
  tanggal: string;
  keterangan?: string;
  ukuran?: string;
  sumber: 'unggah' | 'universitas';
}

const SEED: Dokumen[] = [
  { id: 1,  nama: 'SK_Pengangkatan_Lektor_Kepala_2024.pdf',    tipe: 'SK',         klasifikasi: 'Internal', tanggal: '2024-01-05', keterangan: 'SK pengangkatan jabatan fungsional Lektor Kepala', ukuran: '245 KB', sumber: 'universitas' },
  { id: 2,  nama: 'Sertifikat_TOEFL_ITP_2023.pdf',             tipe: 'Sertifikat', klasifikasi: 'Publik',   tanggal: '2023-08-15', keterangan: 'TOEFL ITP score 587', ukuran: '180 KB', sumber: 'unggah' },
  { id: 3,  nama: 'Laporan_Penelitian_BRIN_2023.pdf',           tipe: 'Laporan',    klasifikasi: 'Internal', tanggal: '2023-11-30', keterangan: 'Laporan akhir penelitian hibah BRIN tahun 2023', ukuran: '2.1 MB', sumber: 'unggah' },
  { id: 4,  nama: 'Kontrak_Hibah_Dikti_2024.pdf',              tipe: 'Kontrak',    klasifikasi: 'Rahasia',  tanggal: '2024-03-01', keterangan: 'Kontrak penelitian hibah Dikti Rp 150 juta', ukuran: '320 KB', sumber: 'universitas' },
  { id: 5,  nama: 'Sertifikat_Pelatihan_PBL_2024.pdf',         tipe: 'Sertifikat', klasifikasi: 'Publik',   tanggal: '2024-04-20', keterangan: 'Sertifikat pelatihan Problem-Based Learning', ukuran: '150 KB', sumber: 'unggah' },
  { id: 6,  nama: 'SK_Tugas_Mengajar_Genap_2025.pdf',          tipe: 'SK',         klasifikasi: 'Internal', tanggal: '2025-01-10', ukuran: '198 KB', sumber: 'universitas' },
  { id: 7,  nama: 'Laporan_PKM_Desa_Binaan_2024.pdf',          tipe: 'Laporan',    klasifikasi: 'Internal', tanggal: '2024-12-15', keterangan: 'Laporan pengabdian masyarakat desa binaan DPP UGM', ukuran: '4.3 MB', sumber: 'unggah' },
  { id: 8,  nama: 'Ijazah_S3_Universitas_Indonesia_2012.pdf',  tipe: 'Sertifikat', klasifikasi: 'Publik',   tanggal: '2012-09-01', keterangan: 'Ijazah doktor Ilmu Politik UI', ukuran: '890 KB', sumber: 'universitas' },
  { id: 9,  nama: 'Publikasi_JPPOL_Vol12_No2_2024.pdf',        tipe: 'Publikasi',  klasifikasi: 'Publik',   tanggal: '2024-06-01', keterangan: 'Artikel jurnal JPPOL Q2 Sinta', ukuran: '1.2 MB', sumber: 'unggah' },
];

const TIPE_LIST: TipeDokumen[] = ['SK', 'Sertifikat', 'Laporan', 'Kontrak', 'Publikasi', 'Lainnya'];

const TIPE_COLOR: Record<TipeDokumen, string> = {
  SK:         'bg-blue-100 text-blue-700 border-blue-200',
  Sertifikat: 'bg-purple-100 text-purple-700 border-purple-200',
  Laporan:    'bg-amber-100 text-amber-700 border-amber-200',
  Kontrak:    'bg-orange-100 text-orange-700 border-orange-200',
  Publikasi:  'bg-emerald-100 text-emerald-700 border-emerald-200',
  Lainnya:    'bg-gray-100 text-gray-600 border-gray-200',
};

const KLAS_COLOR: Record<Klasifikasi, string> = {
  Publik:   'bg-green-100 text-green-700',
  Internal: 'bg-amber-100 text-amber-700',
  Rahasia:  'bg-red-100 text-red-700',
};

const SUMBER_STYLE: Record<Dokumen['sumber'], string> = {
  unggah:      'bg-indigo-50 text-indigo-600',
  universitas: 'bg-slate-100 text-slate-500',
};

const SUMBER_LABEL: Record<Dokumen['sumber'], string> = {
  unggah:      'Unggahan saya',
  universitas: 'Dari universitas',
};

const EMPTY_FORM = { nama: '', tipe: 'SK' as TipeDokumen, klasifikasi: 'Internal' as Klasifikasi, tanggal: '', keterangan: '', fileName: '' };

export function DokumenSayaTab() {
  const [docs, setDocs] = useState<Dokumen[]>(SEED);
  const [search, setSearch] = useState('');
  const [tipeFilter, setTipeFilter] = useState<TipeDokumen | 'Semua'>('Semua');
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState<Dokumen | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = docs.filter(d => {
    if (tipeFilter !== 'Semua' && d.tipe !== tipeFilter) return false;
    if (search && !d.nama.toLowerCase().includes(search.toLowerCase()) &&
        !(d.keterangan ?? '').toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleSave = async () => {
    if (!form.nama.trim() || !form.tanggal) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    const newDoc: Dokumen = {
      id: Date.now(),
      nama: form.nama.trim().endsWith('.pdf') ? form.nama.trim() : form.nama.trim() + '.pdf',
      tipe: form.tipe,
      klasifikasi: form.klasifikasi,
      tanggal: form.tanggal,
      keterangan: form.keterangan.trim() || undefined,
      ukuran: form.fileName ? '—' : undefined,
      sumber: 'unggah',
    };
    setDocs(prev => [newDoc, ...prev]);
    setForm(EMPTY_FORM);
    setShowModal(false);
    setSaving(false);
  };

  return (
    <div className="space-y-5">
      {/* Sync notice */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 flex items-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
        <p className="text-xs text-blue-700 leading-relaxed">
          Dokumen dari sistem universitas (HRIS, SIMASTER) akan tersinkronisasi otomatis di Phase 2.
          Saat ini Anda dapat mengunggah dokumen secara manual.
        </p>
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-4 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari dokumen..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>

        {/* Tipe filter */}
        <div className="flex flex-wrap gap-1.5">
          {(['Semua', ...TIPE_LIST] as const).map(t => (
            <button
              key={t}
              onClick={() => setTipeFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                tipeFilter === t
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Add button */}
        <button
          onClick={() => setShowModal(true)}
          className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />Tambah Dokumen
        </button>
      </div>

      {/* Count */}
      <p className="text-xs text-gray-400 px-1">{filtered.length} dokumen ditemukan</p>

      {/* Document list */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-5 py-12 text-center text-gray-400 text-sm">Tidak ada dokumen yang ditemukan.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Nama Dokumen', 'Tipe', 'Klasifikasi', 'Tanggal', 'Sumber', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} className="border-b border-gray-50 hover:bg-white/70 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-gray-800 font-medium truncate max-w-xs">{d.nama}</p>
                        {d.keterangan && <p className="text-xs text-gray-400 truncate max-w-xs">{d.keterangan}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${TIPE_COLOR[d.tipe]}`}>{d.tipe}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${KLAS_COLOR[d.klasifikasi]}`}>{d.klasifikasi}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                    {new Date(d.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${SUMBER_STYLE[d.sumber]}`}>{SUMBER_LABEL[d.sumber]}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPreview(d)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Lihat detail"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                        title="Unduh"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Document Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Tambah Dokumen</h2>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 text-gray-400 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* File upload area */}
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                {form.fileName ? (
                  <p className="text-sm text-blue-600 font-medium">{form.fileName}</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-500">Klik untuk pilih file</p>
                    <p className="text-xs text-gray-400 mt-0.5">PDF, DOCX, JPG — maks. 20 MB</p>
                  </>
                )}
                <input ref={fileRef} type="file" className="hidden" accept=".pdf,.docx,.jpg,.jpeg,.png"
                  onChange={e => {
                    const f = e.target.files?.[0];
                    if (f) setForm(prev => ({ ...prev, fileName: f.name, nama: prev.nama || f.name.replace(/\.[^.]+$/, '') }));
                  }} />
              </div>

              {/* Nama */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nama Dokumen <span className="text-red-500">*</span></label>
                <input
                  value={form.nama}
                  onChange={e => setForm(p => ({ ...p, nama: e.target.value }))}
                  placeholder="cth: SK_Pengangkatan_2025"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>

              {/* Tipe + Klasifikasi */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tipe</label>
                  <select
                    value={form.tipe}
                    onChange={e => setForm(p => ({ ...p, tipe: e.target.value as TipeDokumen }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-colors bg-white"
                  >
                    {TIPE_LIST.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Klasifikasi</label>
                  <select
                    value={form.klasifikasi}
                    onChange={e => setForm(p => ({ ...p, klasifikasi: e.target.value as Klasifikasi }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-colors bg-white"
                  >
                    {(['Publik', 'Internal', 'Rahasia'] as Klasifikasi[]).map(k => <option key={k}>{k}</option>)}
                  </select>
                </div>
              </div>

              {/* Tanggal */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Tanggal Dokumen <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={form.tanggal}
                  onChange={e => setForm(p => ({ ...p, tanggal: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>

              {/* Keterangan */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Keterangan (opsional)</label>
                <textarea
                  value={form.keterangan}
                  onChange={e => setForm(p => ({ ...p, keterangan: e.target.value }))}
                  placeholder="Deskripsi singkat dokumen..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-colors resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors">Batal</button>
              <button
                onClick={handleSave}
                disabled={saving || !form.nama.trim() || !form.tanggal}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 truncate pr-4">{preview.nama}</h2>
              <button onClick={() => setPreview(null)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 text-gray-400 transition-colors flex-shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-3">
              {[
                ['Tipe', <span key="t" className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${TIPE_COLOR[preview.tipe]}`}>{preview.tipe}</span>],
                ['Klasifikasi', <span key="k" className={`text-xs font-medium px-2 py-0.5 rounded-full ${KLAS_COLOR[preview.klasifikasi]}`}>{preview.klasifikasi}</span>],
                ['Tanggal', new Date(preview.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })],
                ['Sumber', SUMBER_LABEL[preview.sumber]],
                ...(preview.ukuran ? [['Ukuran', preview.ukuran]] : []),
                ...(preview.keterangan ? [['Keterangan', preview.keterangan]] : []),
              ].map(([label, value]) => (
                <div key={String(label)} className="flex items-start gap-3">
                  <p className="text-xs text-gray-400 w-24 flex-shrink-0 pt-0.5">{label}</p>
                  <div className="text-sm text-gray-800">{value}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setPreview(null)} className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors">Tutup</button>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <Download className="w-3.5 h-3.5" />Unduh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
