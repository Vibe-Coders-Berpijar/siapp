'use client';

import { useState } from 'react';
import { StatusBadge } from '@/components/shared/StatusBadge';

interface MataKuliah {
  kode: string;
  nama: string;
  sks: number;
  semester: number;
  cpl: string[];
  statusRpkps: string;
  statusSilabus: string;
  dosen: string;
  prodi: string;
}

const MOCK_MK: MataKuliah[] = [
  { kode: 'POL1101', nama: 'Pengantar Ilmu Politik',          sks: 3, semester: 1, cpl: ['CPL-1','CPL-2'], statusRpkps: 'Disetujui',  statusSilabus: 'Disetujui',  dosen: 'Dr. Ahmad Fauzi',         prodi: 'S1' },
  { kode: 'POL1201', nama: 'Sistem Politik Indonesia',        sks: 3, semester: 2, cpl: ['CPL-1','CPL-3'], statusRpkps: 'Disetujui',  statusSilabus: 'Disetujui',  dosen: 'Dr. Siti Nuraini',        prodi: 'S1' },
  { kode: 'POL2101', nama: 'Teori Politik Kontemporer',       sks: 3, semester: 3, cpl: ['CPL-2','CPL-4'], statusRpkps: 'Menunggu',   statusSilabus: 'Disetujui',  dosen: 'Prof. Bambang Wicaksono', prodi: 'S1' },
  { kode: 'POL2201', nama: 'Politik Komparatif',              sks: 3, semester: 4, cpl: ['CPL-3','CPL-5'], statusRpkps: 'Disetujui',  statusSilabus: 'Menunggu',   dosen: 'Prof. Hery Santoso',      prodi: 'S1' },
  { kode: 'POL3101', nama: 'Kebijakan Publik',                sks: 3, semester: 5, cpl: ['CPL-4','CPL-6'], statusRpkps: 'Draft',      statusSilabus: 'Draft',      dosen: 'Dr. Ratih Dewi Kusuma',   prodi: 'S1' },
  { kode: 'POL3201', nama: 'Tata Kelola Digital',             sks: 2, semester: 6, cpl: ['CPL-5'],         statusRpkps: 'Draft',      statusSilabus: 'Belum Ada',  dosen: 'Dr. Reza Pratama',        prodi: 'S1' },
  { kode: 'POL4101', nama: 'Metodologi Penelitian Politik',   sks: 3, semester: 7, cpl: ['CPL-6','CPL-7'], statusRpkps: 'Belum Ada',  statusSilabus: 'Belum Ada',  dosen: 'Dr. Maya Indira',         prodi: 'S1' },
  { kode: 'POL4201', nama: 'Skripsi',                         sks: 6, semester: 8, cpl: ['CPL-7'],         statusRpkps: 'Disetujui',  statusSilabus: 'Disetujui',  dosen: 'Prof. Hery Santoso',      prodi: 'S1' },
  { kode: 'POL5101', nama: 'Teori Politik Lanjutan',          sks: 3, semester: 1, cpl: ['CPL-1','CPL-2'], statusRpkps: 'Disetujui',  statusSilabus: 'Disetujui',  dosen: 'Prof. Bambang Wicaksono', prodi: 'S2' },
  { kode: 'POL5201', nama: 'Metode Penelitian Kualitatif',    sks: 3, semester: 2, cpl: ['CPL-3'],         statusRpkps: 'Menunggu',   statusSilabus: 'Disetujui',  dosen: 'Dr. Fitri Handayani',     prodi: 'S2' },
  { kode: 'POL5301', nama: 'Tesis',                           sks: 6, semester: 3, cpl: ['CPL-4','CPL-5'], statusRpkps: 'Disetujui',  statusSilabus: 'Disetujui',  dosen: 'Prof. Hery Santoso',      prodi: 'S2' },
  { kode: 'POL6101', nama: 'Seminar Disertasi',               sks: 3, semester: 2, cpl: ['CPL-1'],         statusRpkps: 'Disetujui',  statusSilabus: 'Disetujui',  dosen: 'Prof. Bambang Wicaksono', prodi: 'S3' },
];

const SEMESTER_OPTIONS = ['Semua', '1', '2', '3', '4', '5', '6', '7', '8'];

export function KurikulumTab({ prodi }: { prodi: string }) {
  const [semester, setSemester] = useState('Semua');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = MOCK_MK.filter((mk) => {
    const prodiMatch = prodi === 'semua' || mk.prodi === prodi;
    const semMatch = semester === 'Semua' || mk.semester === parseInt(semester);
    return prodiMatch && semMatch;
  });

  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow overflow-hidden">
      {/* Filter bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-wrap gap-3">
        <h2 className="font-semibold text-gray-900">Kurikulum {prodi === 'semua' ? 'Semua Prodi' : `Prodi ${prodi}`}</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500">Semester:</span>
          <div className="flex gap-1 flex-wrap">
            {SEMESTER_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setSemester(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  semester === s
                    ? 'bg-[#231F54] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            {['Kode', 'Nama MK', 'SKS', 'Smt', 'Dosen Pengampu', 'RPKPS', 'Silabus'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((mk) => (
            <>
              <tr
                key={mk.kode}
                className="border-b border-gray-50 hover:bg-white/50 transition-colors cursor-pointer"
                onClick={() => setExpanded(expanded === mk.kode ? null : mk.kode)}
              >
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{mk.kode}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{mk.nama}</td>
                <td className="px-4 py-3 text-center text-gray-600">{mk.sks}</td>
                <td className="px-4 py-3 text-center text-gray-600">{mk.semester}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{mk.dosen}</td>
                <td className="px-4 py-3"><StatusBadge status={mk.statusRpkps} size="sm" /></td>
                <td className="px-4 py-3"><StatusBadge status={mk.statusSilabus} size="sm" /></td>
              </tr>
              {expanded === mk.kode && (
                <tr key={`${mk.kode}-detail`} className="bg-indigo-50/40">
                  <td colSpan={7} className="px-4 py-3">
                    <div className="flex items-start gap-6 text-xs text-gray-600">
                      <div>
                        <p className="font-semibold text-gray-700 mb-1">CPL Terkait</p>
                        <div className="flex gap-1">
                          {mk.cpl.map((c) => (
                            <span key={c} className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">{c}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 mb-1">Prodi</p>
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{mk.prodi}</span>
                      </div>
                      <div className="ml-auto">
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                          Lihat RPKPS →
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <div className="text-center py-10 text-gray-400 text-sm">
          Tidak ada mata kuliah untuk filter ini.
        </div>
      )}
    </div>
  );
}
