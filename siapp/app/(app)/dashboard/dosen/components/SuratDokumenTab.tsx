'use client';

import { StatusBadge } from '@/components/shared/StatusBadge';

interface Surat {
  nomor: string;
  perihal: string;
  tanggal: string;
  status: string;
}

interface Dokumen {
  nama: string;
  klasifikasi: string;
  tanggal: string;
}

const MOCK_SURAT: Surat[] = [
  { nomor: 'B/001/UN1.SIPSO/HM/2025', perihal: 'Permohonan Cuti Akademik', tanggal: '12 Jan 2025', status: 'Ditandatangani' },
  { nomor: 'B/002/UN1.SIPSO/HM/2025', perihal: 'Pengajuan Penelitian Hibah', tanggal: '3 Feb 2025', status: 'Menunggu' },
  { nomor: 'B/003/UN1.SIPSO/HM/2025', perihal: 'Surat Penugasan Seminar', tanggal: '20 Mar 2025', status: 'Draft' },
];

const MOCK_DOKUMEN: Dokumen[] = [
  { nama: 'SK_Pengangkatan_2024.pdf', klasifikasi: 'Internal', tanggal: '5 Jan 2024' },
  { nama: 'Sertifikat_Seminar_AIPI.pdf', klasifikasi: 'Publik', tanggal: '15 Apr 2024' },
  { nama: 'Laporan_Penelitian_2023.pdf', klasifikasi: 'Internal', tanggal: '30 Nov 2023' },
];

const klasifikasiColor: Record<string, string> = {
  Publik: 'bg-green-100 text-green-700',
  Internal: 'bg-amber-100 text-amber-700',
  Rahasia: 'bg-red-100 text-red-700',
};

export function SuratDokumenTab() {
  return (
    <div className="space-y-6">
      {/* Surat */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Riwayat Surat</h2>
          <a
            href="/kesekretariatan/persuratan/baru"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3"
          >
            + Ajukan Surat Baru
          </a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['Nomor', 'Perihal', 'Tanggal', 'Status'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_SURAT.map((s) => (
              <tr key={s.nomor} className="border-b border-gray-50 hover:bg-white/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-gray-600">{s.nomor}</td>
                <td className="px-4 py-3 text-gray-800">{s.perihal}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{s.tanggal}</td>
                <td className="px-4 py-3"><StatusBadge status={s.status} size="sm" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dokumen */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Dokumen Terunggah</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {MOCK_DOKUMEN.map((d) => (
            <div key={d.nama} className="flex items-center justify-between px-4 py-3 hover:bg-white/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{d.nama}</p>
                  <p className="text-xs text-gray-400">{d.tanggal}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${klasifikasiColor[d.klasifikasi] ?? 'bg-gray-100 text-gray-600'}`}>
                {d.klasifikasi}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
