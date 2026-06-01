'use client';

import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { lookupPublikasiByTitle } from '../actions';

type Quartile = 'Q1' | 'Q2' | 'Q3' | 'Q4';

interface Publikasi {
  id: string;
  judul: string;
  jurnal: string;
  tahun: number;
  quartile: Quartile;
  status: string;
  doi: string;
}

const MOCK_DATA: Publikasi[] = [
  { id: '1', judul: 'Desentralisasi dan Tata Kelola Daerah di Era Reformasi', jurnal: 'Jurnal Ilmu Politik', tahun: 2024, quartile: 'Q2', status: 'Terverifikasi', doi: '10.1234/jip.2024.01' },
  { id: '2', judul: 'Local Government Capacity in Indonesia', jurnal: 'Asian Journal of Political Science', tahun: 2023, quartile: 'Q1', status: 'Terverifikasi', doi: '10.1080/ajps.2023' },
  { id: '3', judul: 'Partisipasi Masyarakat dalam Perencanaan Pembangunan', jurnal: 'Jurnal Administrasi Publik', tahun: 2022, quartile: 'Q3', status: 'Menunggu', doi: '' },
];

const quartileColor: Record<Quartile, string> = {
  Q1: 'bg-green-100 text-green-800',
  Q2: 'bg-blue-100 text-blue-800',
  Q3: 'bg-amber-100 text-amber-800',
  Q4: 'bg-gray-100 text-gray-600',
};

const columns: ColumnDef<Publikasi>[] = [
  { accessorKey: 'judul', header: 'Judul', cell: ({ getValue }) => (
    <span className="text-sm font-medium text-gray-900 line-clamp-2">{getValue() as string}</span>
  )},
  { accessorKey: 'jurnal', header: 'Jurnal/Venue' },
  { accessorKey: 'tahun', header: 'Tahun' },
  { accessorKey: 'quartile', header: 'Quartile', cell: ({ getValue }) => {
    const q = getValue() as Quartile;
    return <span className={`text-xs font-semibold px-2 py-1 rounded-full ${quartileColor[q]}`}>{q}</span>;
  }},
  { accessorKey: 'status', header: 'Status', cell: ({ getValue }) => (
    <StatusBadge status={getValue() as string} size="sm" />
  )},
];

export function PublikasiTable({ initialData }: { initialData?: Publikasi[] }) {
  const [data, setData] = useState<Publikasi[]>(initialData ?? MOCK_DATA);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ judul: '', jurnal: '', tahun: new Date().getFullYear(), doi: '', quartile: 'Q2' as Quartile });
  const [aiLoading, setAiLoading] = useState(false);

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  async function handleAIFill() {
    if (!form.judul) return;
    setAiLoading(true);
    try {
      const result = await lookupPublikasiByTitle(form.judul);
      setForm((f) => ({
        ...f,
        jurnal: result.jurnal || f.jurnal,
        quartile: result.quartile,
        doi: result.doi ?? f.doi,
        tahun: result.tahun ?? f.tahun,
      }));
    } catch {
      // AI lookup failed — leave form fields as-is
    } finally {
      setAiLoading(false);
    }
  }

  function handleSubmit() {
    const newItem: Publikasi = { id: String(Date.now()), ...form, status: 'Menunggu' };
    setData((d) => [newItem, ...d]);
    setOpen(false);
    setForm({ judul: '', jurnal: '', tahun: new Date().getFullYear(), doi: '', quartile: 'Q2' });
  }

  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Publikasi Saya</h2>
        <Button size="sm" onClick={() => setOpen(true)}>+ Tambah Publikasi</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-gray-100">
                {hg.headers.map((h) => (
                  <th key={h.id} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-white/50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Publikasi</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>Judul</Label>
              <Input
                value={form.judul}
                onChange={(e) => setForm((f) => ({ ...f, judul: e.target.value }))}
                placeholder="Judul publikasi..."
                className="mt-1"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              onClick={handleAIFill}
              disabled={aiLoading || !form.judul}
            >
              {aiLoading ? 'Mengisi otomatis...' : '✨ Isi Otomatis dengan AI'}
            </Button>
            <div>
              <Label>Nama Jurnal</Label>
              <Input value={form.jurnal} onChange={(e) => setForm((f) => ({ ...f, jurnal: e.target.value }))} className="mt-1" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <Label>Tahun</Label>
                <Input type="number" value={form.tahun} onChange={(e) => setForm((f) => ({ ...f, tahun: Number(e.target.value) }))} className="mt-1" />
              </div>
              <div className="flex-1">
                <Label>Quartile</Label>
                <select
                  value={form.quartile}
                  onChange={(e) => setForm((f) => ({ ...f, quartile: e.target.value as Quartile }))}
                  className="mt-1 w-full border border-gray-200 rounded-md text-sm px-3 h-10 bg-white"
                >
                  {(['Q1', 'Q2', 'Q3', 'Q4'] as Quartile[]).map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Label>DOI</Label>
              <Input value={form.doi} onChange={(e) => setForm((f) => ({ ...f, doi: e.target.value }))} placeholder="10.xxxx/..." className="mt-1" />
            </div>
            <Button className="w-full" onClick={handleSubmit} disabled={!form.judul || !form.jurnal}>
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
