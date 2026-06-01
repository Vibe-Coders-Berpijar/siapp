'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export interface PublikasiItem { judul: string; jurnal: string; tahun: number; quartile: string }
export interface DosenPublik {
  nama: string;
  jabatan: string;
  nidn: string;
  bio: string;
  bidangKeahlian: string[];
  publikasiTerverifikasi: PublikasiItem[];
}

const MOCK_DOSEN: DosenPublik = {
  nama: 'Dr. Ahmad Fauzi',
  jabatan: 'Lektor Kepala',
  nidn: '0012345678',
  bio: 'Peneliti dan pengajar di bidang Politik Komparatif dan Tata Kelola Lokal. Fokus riset pada desentralisasi, otonomi daerah, dan partisipasi masyarakat di Indonesia.',
  bidangKeahlian: ['Politik Komparatif', 'Tata Kelola Lokal', 'Otonomi Daerah'],
  publikasiTerverifikasi: [
    { judul: 'Desentralisasi dan Tata Kelola Daerah di Era Reformasi', jurnal: 'Jurnal Ilmu Politik', tahun: 2024, quartile: 'Q2' },
    { judul: 'Local Government Capacity in Indonesia', jurnal: 'Asian Journal of Political Science', tahun: 2023, quartile: 'Q1' },
  ],
};

export function ProfilPublikTab({ initialDosen }: { initialDosen?: DosenPublik }) {
  const dosen = initialDosen ?? MOCK_DOSEN;
  const initials = dosen.nama.split(' ').filter((w) => w.length > 1).slice(0, 2).map((w) => w[0]).join('');

  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-6 space-y-6">
      <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
        <span>👁</span> Tampilan hanya baca — ini adalah pratinjau profil publik Anda
      </div>

      {/* Header */}
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="bg-indigo-600 text-white text-lg font-semibold">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{dosen.nama}</h2>
          <p className="text-sm text-gray-500">{dosen.jabatan} · NIDN {dosen.nidn}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {dosen.bidangKeahlian.map((k) => (
              <span key={k} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">{k}</span>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      {/* Bio */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-1">Tentang</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{dosen.bio}</p>
      </div>

      <Separator />

      {/* Publikasi */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Publikasi Terverifikasi</h3>
        <div className="space-y-2">
          {dosen.publikasiTerverifikasi.map((p) => (
            <div key={p.judul} className="bg-white/70 rounded-xl border border-gray-100 p-3">
              <p className="text-sm font-medium text-gray-900">{p.judul}</p>
              <p className="text-xs text-gray-500 mt-0.5">{p.jurnal} · {p.tahun} · <span className="font-semibold text-indigo-600">{p.quartile}</span></p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
