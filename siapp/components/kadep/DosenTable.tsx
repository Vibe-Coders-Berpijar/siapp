"use client";

import { useState } from 'react'
import { Modal, Field, inputCls, selectCls } from '@/components/shared/Modal'
import { useToast } from '@/components/shared/Toast'

export type Jabatan = 'Guru Besar' | 'Lektor Kepala' | 'Lektor' | 'Asisten Ahli'

export interface Dosen {
  id: number
  nama: string
  jabatan: Jabatan
  nidn: string
  publikasi: number
  sks: number
  hibahAktif: number
}

interface Props {
  dosens: Dosen[]
  onChange: (next: Dosen[]) => void
}

const jabatanColor: Record<string, string> = {
  'Guru Besar': 'bg-purple-100 text-purple-700',
  'Lektor Kepala': 'bg-blue-100 text-blue-700',
  'Lektor': 'bg-slate-100 text-slate-600',
  'Asisten Ahli': 'bg-emerald-100 text-emerald-700',
}

const blank = (): Omit<Dosen, 'id'> => ({
  nama: '', jabatan: 'Asisten Ahli', nidn: '', publikasi: 0, sks: 12, hibahAktif: 0,
})

export function DosenTable({ dosens, onChange }: Props) {
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [form, setForm] = useState(blank())
  const [editId, setEditId] = useState<number | null>(null)
  const { show, node } = useToast()

  function openAdd() { setForm(blank()); setModal('add') }
  function openEdit(d: Dosen) {
    setForm({ nama: d.nama, jabatan: d.jabatan, nidn: d.nidn, publikasi: d.publikasi, sks: d.sks, hibahAktif: d.hibahAktif })
    setEditId(d.id)
    setModal('edit')
  }
  function closeModal() { setModal(null); setEditId(null) }

  function handleSave() {
    if (!form.nama.trim() || !form.nidn.trim()) { show('Nama dan NIDN wajib diisi', 'error'); return }
    if (modal === 'add') {
      const newId = Math.max(...dosens.map(d => d.id), 0) + 1
      onChange([...dosens, { id: newId, ...form }])
      show(`${form.nama} ditambahkan`, 'success')
    } else {
      onChange(dosens.map(d => d.id === editId ? { ...d, ...form } : d))
      show(`${form.nama} diperbarui`, 'success')
    }
    closeModal()
  }

  function handleDelete(d: Dosen) {
    onChange(dosens.filter(x => x.id !== d.id))
    show(`${d.nama} dihapus`, 'info')
  }

  function set<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  return (
    <div className="rounded-2xl p-5 bg-white border border-slate-100 shadow-sm">
      {node}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Performa Dosen</p>
        <button onClick={openAdd} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">+ Tambah Dosen</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-medium text-slate-400 pb-2 pr-4">Nama</th>
              <th className="text-left text-xs font-medium text-slate-400 pb-2 pr-4">Jabatan</th>
              <th className="text-center text-xs font-medium text-slate-400 pb-2 pr-4">Publikasi</th>
              <th className="text-center text-xs font-medium text-slate-400 pb-2 pr-4">SKS</th>
              <th className="text-center text-xs font-medium text-slate-400 pb-2 pr-4">Hibah</th>
              <th className="text-right text-xs font-medium text-slate-400 pb-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dosens.map(d => (
              <tr key={d.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-2.5 pr-4">
                  <p className="font-medium text-slate-800">{d.nama}</p>
                  <p className="text-xs text-slate-400">{d.nidn}</p>
                </td>
                <td className="py-2.5 pr-4">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${jabatanColor[d.jabatan] ?? 'bg-slate-100 text-slate-600'}`}>{d.jabatan}</span>
                </td>
                <td className="py-2.5 pr-4 text-center font-semibold text-slate-700">{d.publikasi}</td>
                <td className="py-2.5 pr-4 text-center text-slate-600">{d.sks}</td>
                <td className="py-2.5 pr-4 text-center">
                  {d.hibahAktif > 0 ? <span className="text-xs font-semibold text-emerald-600">{d.hibahAktif}</span> : <span className="text-xs text-slate-300">—</span>}
                </td>
                <td className="py-2.5 text-right">
                  <button onClick={() => openEdit(d)} className="text-xs text-blue-600 hover:underline mr-3">Edit</button>
                  <button onClick={() => handleDelete(d)} className="text-xs text-red-500 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Tambah Dosen' : 'Edit Dosen'} onClose={closeModal} onSave={handleSave}>
          <Field label="Nama Lengkap">
            <input className={inputCls} value={form.nama} onChange={e => set('nama', e.target.value)} placeholder="Prof. / Dr. ..." />
          </Field>
          <Field label="NIDN">
            <input className={inputCls} value={form.nidn} onChange={e => set('nidn', e.target.value)} placeholder="0012345678" />
          </Field>
          <Field label="Jabatan Fungsional">
            <select className={selectCls} value={form.jabatan} onChange={e => set('jabatan', e.target.value as Jabatan)}>
              <option>Guru Besar</option>
              <option>Lektor Kepala</option>
              <option>Lektor</option>
              <option>Asisten Ahli</option>
            </select>
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Publikasi">
              <input type="number" min={0} className={inputCls} value={form.publikasi} onChange={e => set('publikasi', +e.target.value)} />
            </Field>
            <Field label="SKS Mengajar">
              <input type="number" min={0} className={inputCls} value={form.sks} onChange={e => set('sks', +e.target.value)} />
            </Field>
            <Field label="Hibah Aktif">
              <input type="number" min={0} className={inputCls} value={form.hibahAktif} onChange={e => set('hibahAktif', +e.target.value)} />
            </Field>
          </div>
        </Modal>
      )}
    </div>
  )
}
