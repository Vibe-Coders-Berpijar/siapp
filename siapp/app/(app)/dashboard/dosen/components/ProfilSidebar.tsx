'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { logout } from '@/app/login/actions';

export interface DosenProfil {
  nama: string;
  jabatan: string;
  nidn: string;
  bidangKeahlian: string[];
  hIndex: number;
  orcid: string;
  sinta: string;
  scopus: string;
}

const MOCK_DOSEN: DosenProfil = {
  nama: 'Prof. Dr. Purwo Santoso, M.A.',
  jabatan: 'Guru Besar',
  nidn: '0004026309',
  bidangKeahlian: ['Politik Komparatif', 'Tata Kelola Lokal', 'Otonomi Daerah'],
  hIndex: 7,
  orcid: '0000-0002-1234-5678',
  sinta: 'S-12345',
  scopus: '57200000000',
};

const jabatanColor: Record<string, string> = {
  'Lektor': 'bg-blue-100 text-blue-800',
  'Lektor Kepala': 'bg-indigo-100 text-indigo-800',
  'Guru Besar': 'bg-purple-100 text-purple-800',
};

export function ProfilSidebar({ initialDosen }: { initialDosen?: DosenProfil }) {
  const [editMode, setEditMode] = useState(false);
  const [dosen, setDosen] = useState<DosenProfil>(initialDosen ?? MOCK_DOSEN);
  const [newKeahlian, setNewKeahlian] = useState('');

  const initials = dosen.nama
    .split(' ')
    .filter((w) => w.length > 1)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  function removeKeahlian(tag: string) {
    setDosen((d) => ({ ...d, bidangKeahlian: d.bidangKeahlian.filter((k) => k !== tag) }));
  }

  function addKeahlian() {
    const trimmed = newKeahlian.trim();
    if (trimmed && !dosen.bidangKeahlian.includes(trimmed)) {
      setDosen((d) => ({ ...d, bidangKeahlian: [...d.bidangKeahlian, trimmed] }));
    }
    setNewKeahlian('');
  }

  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-6 space-y-5">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3">
        <Avatar className="h-20 w-20 text-xl bg-indigo-600 text-white">
          <AvatarFallback className="bg-indigo-600 text-white text-xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="font-semibold text-gray-900 text-base">{dosen.nama}</p>
          <span className={`mt-1 inline-block text-xs font-medium px-2.5 py-1 rounded-full ${jabatanColor[dosen.jabatan] ?? 'bg-gray-100 text-gray-700'}`}>
            {dosen.jabatan}
          </span>
        </div>
        <Badge variant="outline" className="text-xs text-gray-500">
          NIDN {dosen.nidn}
        </Badge>
      </div>

      <Separator />

      {/* Bidang Keahlian */}
      <div>
        <Label className="text-xs text-gray-500 uppercase tracking-wide">Bidang Keahlian</Label>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {dosen.bidangKeahlian.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full border border-indigo-100"
            >
              {tag}
              {editMode && (
                <button onClick={() => removeKeahlian(tag)} className="hover:text-red-500 ml-0.5">×</button>
              )}
            </span>
          ))}
        </div>
        {editMode && (
          <div className="flex gap-2 mt-2">
            <Input
              value={newKeahlian}
              onChange={(e) => setNewKeahlian(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addKeahlian()}
              placeholder="Tambah keahlian..."
              className="text-sm h-8"
            />
            <Button size="sm" variant="outline" onClick={addKeahlian} className="h-8">+</Button>
          </div>
        )}
      </div>

      {/* H-Index */}
      <div>
        <Label className="text-xs text-gray-500 uppercase tracking-wide">H-Index</Label>
        {editMode ? (
          <Input
            type="number"
            value={dosen.hIndex}
            onChange={(e) => setDosen((d) => ({ ...d, hIndex: Number(e.target.value) }))}
            className="mt-1 h-8 w-24 text-sm"
          />
        ) : (
          <p className="mt-1 text-2xl font-semibold text-gray-900">{dosen.hIndex}</p>
        )}
      </div>

      <Separator />

      {/* External IDs */}
      <div className="space-y-2">
        <Label className="text-xs text-gray-500 uppercase tracking-wide">ID Eksternal</Label>
        {(['orcid', 'sinta', 'scopus'] as const).map((field) => (
          <div key={field}>
            <p className="text-[11px] text-gray-400 uppercase">{field}</p>
            {editMode ? (
              <Input
                value={dosen[field]}
                onChange={(e) => setDosen((d) => ({ ...d, [field]: e.target.value }))}
                className="h-7 text-sm mt-0.5"
              />
            ) : (
              <p className="text-sm text-gray-700">{dosen[field] || '—'}</p>
            )}
          </div>
        ))}
      </div>

      <Button
        className="w-full"
        variant={editMode ? 'default' : 'outline'}
        onClick={() => setEditMode((v) => !v)}
      >
        {editMode ? 'Simpan Profil' : 'Edit Profil'}
      </Button>

      <Separator />

      <form action={logout}>
        <Button type="submit" variant="ghost" className="w-full text-gray-400 hover:text-red-600 hover:bg-red-50">
          Keluar
        </Button>
      </form>
    </div>
  );
}
