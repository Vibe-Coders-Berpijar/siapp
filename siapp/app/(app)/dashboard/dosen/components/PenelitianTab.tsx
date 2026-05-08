'use client';

import Link from 'next/link';
import { StatusBadge } from '@/components/shared/StatusBadge';

interface Hibah {
  id: string;
  judul: string;
  sumberDana: string;
  nilai: string;
  periode: string;
  status: string;
}

interface Pkm {
  id: string;
  kegiatan: string;
  lokasi: string;
  tanggal: string;
  peserta: string;
  status: string;
}

const MOCK_HIBAH: Hibah[] = [
  {
    id: '1',
    judul: 'Desentralisasi Fiskal dan Kapasitas Pemerintah Daerah di Indonesia',
    sumberDana: 'BRIN',
    nilai: 'Rp 150.000.000',
    periode: '2025 – 2026',
    status: 'Aktif',
  },
  {
    id: '2',
    judul: 'Partisipasi Politik Pemuda di Daerah Perkotaan Pasca-Reformasi',
    sumberDana: 'UGM Dana Masyarakat',
    nilai: 'Rp 75.000.000',
    periode: '2023 – 2024',
    status: 'Selesai',
  },
];

const MOCK_PKM: Pkm[] = [
  {
    id: '1',
    kegiatan: 'Pelatihan Literasi Politik untuk Pemilih Pemula',
    lokasi: 'Desa Sleman, Yogyakarta',
    tanggal: '14 Mar 2025',
    peserta: '85 peserta',
    status: 'Selesai',
  },
  {
    id: '2',
    kegiatan: 'Seminar Publik: Otonomi Daerah 25 Tahun Reformasi',
    lokasi: 'FISIPOL UGM',
    tanggal: '22 Nov 2024',
    peserta: '200 peserta',
    status: 'Selesai',
  },
  {
    id: '3',
    kegiatan: 'Pendampingan Tata Kelola BUMDes Kabupaten Gunungkidul',
    lokasi: 'Kab. Gunungkidul, DIY',
    tanggal: '5 Aug 2024',
    peserta: '30 peserta',
    status: 'Selesai',
  },
];

export function PenelitianTab() {
  return (
    <div className="space-y-6">
      {/* Hibah Section */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Hibah & Penelitian</h2>
          <div className="flex items-center gap-3">
            <Link href="/riset-pkm" className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
              Lihat Semua Proposal →
            </Link>
            <Link
              href="/riset-pkm/proposal/baru"
              className="text-xs font-medium text-white bg-[#231F54] hover:bg-indigo-900 px-3 py-1.5 rounded-lg transition-colors"
            >
              + Buat Proposal
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {MOCK_HIBAH.map((h) => (
            <div key={h.id} className="p-4 hover:bg-white/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 leading-snug">{h.judul}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-xs text-gray-500">
                      <span className="font-medium text-gray-700">{h.sumberDana}</span>
                    </span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs font-semibold text-green-700">{h.nilai}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{h.periode}</span>
                  </div>
                </div>
                <StatusBadge status={h.status} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PkM Section */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Riwayat Pengabdian kepada Masyarakat</h2>
          <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
            + Tambah Kegiatan
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['Kegiatan', 'Lokasi', 'Tanggal', 'Peserta', 'Status'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_PKM.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-white/50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800 max-w-[260px]">
                  <p className="truncate">{p.kegiatan}</p>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{p.lokasi}</td>
                <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{p.tanggal}</td>
                <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{p.peserta}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={p.status} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
