'use client';

import { useState } from 'react';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { generateRPKPS } from '../actions';

interface MataKuliah {
  kode: string;
  nama: string;
  sks: number;
  semester: string;
  kelas: string;
  rpkpsStatus: string;
  edom: number | null;
}

const MOCK_MK: MataKuliah[] = [
  { kode: 'POL3101', nama: 'Politik Komparatif', sks: 3, semester: '2024/2025 Ganjil', kelas: 'A', rpkpsStatus: 'Disetujui', edom: 4.2 },
  { kode: 'POL4201', nama: 'Tata Kelola Lokal', sks: 3, semester: '2024/2025 Ganjil', kelas: 'B', rpkpsStatus: 'Draft', edom: 3.8 },
  { kode: 'POL2105', nama: 'Pengantar Ilmu Politik', sks: 2, semester: '2024/2025 Ganjil', kelas: 'C', rpkpsStatus: 'Belum Ada', edom: null },
];

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(score) ? 'text-amber-400' : 'text-gray-200'}>★</span>
      ))}
      <span className="text-xs text-gray-500 ml-1">{score.toFixed(1)}</span>
    </div>
  );
}

export function MataKuliahTab() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');
  const [loadingKode, setLoadingKode] = useState<string | null>(null);

  async function handleGenerateRPKPS(mk: MataKuliah) {
    setLoadingKode(mk.kode);
    try {
      const draft = await generateRPKPS(mk.kode, mk.nama, mk.sks, mk.semester);
      setDrawerContent(draft);
      setDrawerOpen(true);
    } catch {
      setDrawerContent('Gagal membuat draft RPKPS. Coba lagi dalam beberapa saat.');
      setDrawerOpen(true);
    } finally {
      setLoadingKode(null);
    }
  }

  return (
    <div className="relative">
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Mata Kuliah Diampu</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['Kode MK', 'Nama MK', 'SKS', 'Semester', 'Kelas', 'Status RPKPS', 'EDOM', 'Aksi'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_MK.map((mk) => (
              <tr key={mk.kode} className="border-b border-gray-50 hover:bg-white/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-gray-600">{mk.kode}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{mk.nama}</td>
                <td className="px-4 py-3 text-gray-600">{mk.sks}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{mk.semester}</td>
                <td className="px-4 py-3 text-gray-600">{mk.kelas}</td>
                <td className="px-4 py-3"><StatusBadge status={mk.rpkpsStatus} size="sm" /></td>
                <td className="px-4 py-3">
                  {mk.edom !== null ? <StarRating score={mk.edom} /> : <span className="text-xs text-gray-400">—</span>}
                </td>
                <td className="px-4 py-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                    onClick={() => handleGenerateRPKPS(mk)}
                    disabled={loadingKode === mk.kode}
                  >
                    {loadingKode === mk.kode ? 'Membuat...' : '✨ Generate RPKPS'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-[480px] bg-white h-full shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-gray-900">Draft RPKPS</h3>
              <Button size="sm" variant="ghost" onClick={() => setDrawerOpen(false)}>✕</Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{drawerContent}</pre>
            </div>
            <div className="p-4 border-t flex gap-2">
              <Button className="flex-1">Simpan Draft</Button>
              <Button variant="outline" onClick={() => setDrawerOpen(false)}>Tutup</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
