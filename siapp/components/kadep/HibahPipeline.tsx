"use client";

import { useState } from 'react'
import { hibahData } from '@/lib/mock-data-kadep'
import { Modal, Field, inputCls, selectCls } from '@/components/shared/Modal'
import { useToast } from '@/components/shared/Toast'

type HibahStatus = 'aktif' | 'pengajuan' | 'selesai'
type Funder = 'Kemdiktisaintek' | 'LPDP' | 'LLDIKTI'

interface Hibah {
  id: number
  judul: string
  funder: Funder
  nilai: number
  status: HibahStatus
  periode: string
  pic: string
}

const statusColor: Record<string, string> = {
  aktif: 'bg-emerald-100 text-emerald-700',
  pengajuan: 'bg-amber-100 text-amber-700',
  selesai: 'bg-slate-100 text-slate-500',
}

const funderColor: Record<string, string> = {
  'Kemdiktisaintek': 'bg-blue-100 text-blue-700',
  'LPDP': 'bg-purple-100 text-purple-700',
  'LLDIKTI': 'bg-teal-100 text-teal-700',
}

const blank = (): Omit<Hibah, 'id'> => ({
  judul: '', funder: 'Kemdiktisaintek', nilai: 0, status: 'pengajuan', periode: '2026–2027', pic: '',
})

export function HibahPipeline() {
  const [hibahs, setHibahs] = useState<Hibah[]>(hibahData as Hibah[])
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [form, setForm] = useState(blank())
  const [editId, setEditId] = useState<number | null>(null)
  const { show, node } = useToast()

  function openAdd() { setForm(blank()); setModal('add') }
  function openEdit(h: Hibah) { setForm({ judul: h.judul, funder: h.funder, nilai: h.nilai, status: h.status, periode: h.periode, pic: h.pic }); setEditId(h.id); setModal('edit') }
  function closeModal() { setModal(null); setEditId(null) }

  function handleSave() {
    if (!form.judul.trim() || !form.pic.trim()) { show('Judul dan PIC wajib diisi', 'error'); return }
    if (modal === 'add') {
      const newId = Math.max(...hibahs.map(h => h.id), 0) + 1
      setHibahs(prev => [...prev, { id: newId, ...form }])
      show(`Hibah "${form.judul.slice(0, 30)}…" ditambahkan`, 'success')
    } else {
      setHibahs(prev => prev.map(h => h.id === editId ? { ...h, ...form } : h))
      show('Data hibah diperbarui', 'success')
    }
    closeModal()
  }

  function handleDelete(h: Hibah) {
    setHibahs(prev => prev.filter(x => x.id !== h.id))
    show(`Hibah "${h.judul.slice(0, 30)}…" dihapus`, 'info')
  }

  function set<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  const totalNilai = hibahs.filter(h => h.status === 'aktif').reduce((s, h) => s + h.nilai, 0)
  const aktif = hibahs.filter(h => h.status === 'aktif').length
  const pengajuan = hibahs.filter(h => h.status === 'pengajuan').length

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      {node}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Pipeline Hibah Penelitian</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">{aktif} Aktif</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">{pengajuan} Pengajuan</span>
          <button onClick={openAdd} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">+ Tambah</button>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1 rounded-xl p-3 bg-emerald-50 border border-emerald-100">
          <p className="text-[10px] font-medium text-emerald-700 uppercase tracking-wide">Dana Aktif</p>
          <p className="text-xl font-bold text-emerald-800">Rp {totalNilai}jt</p>
        </div>
        <div className="flex-1 rounded-xl p-3 bg-slate-50 border border-slate-100">
          <p className="text-[10px] font-medium text-slate-600 uppercase tracking-wide">Total Hibah</p>
          <p className="text-xl font-bold text-slate-800">{hibahs.length} proyek</p>
        </div>
      </div>

      <div className="space-y-2">
        {hibahs.map(h => (
          <div key={h.id} className="flex items-start justify-between gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 leading-snug truncate">{h.judul}</p>
              <p className="text-xs text-slate-400 mt-0.5">{h.pic} · {h.periode}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${funderColor[h.funder] ?? 'bg-slate-100 text-slate-600'}`}>{h.funder}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColor[h.status]}`}>{h.status}</span>
              <span className="text-xs font-bold text-slate-600">Rp{h.nilai}jt</span>
              <button onClick={() => openEdit(h)} className="text-xs text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(h)} className="text-xs text-red-500 hover:underline">Hapus</button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Tambah Hibah' : 'Edit Hibah'} onClose={closeModal} onSave={handleSave}>
          <Field label="Judul Penelitian">
            <input className={inputCls} value={form.judul} onChange={e => set('judul', e.target.value)} placeholder="Judul riset..." />
          </Field>
          <Field label="PIC (Dosen Peneliti)">
            <input className={inputCls} value={form.pic} onChange={e => set('pic', e.target.value)} placeholder="Nama dosen" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Funder">
              <select className={selectCls} value={form.funder} onChange={e => set('funder', e.target.value as Funder)}>
                <option>Kemdiktisaintek</option>
                <option>LPDP</option>
                <option>LLDIKTI</option>
              </select>
            </Field>
            <Field label="Status">
              <select className={selectCls} value={form.status} onChange={e => set('status', e.target.value as HibahStatus)}>
                <option value="pengajuan">Pengajuan</option>
                <option value="aktif">Aktif</option>
                <option value="selesai">Selesai</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nilai (juta Rp)">
              <input type="number" min={0} className={inputCls} value={form.nilai} onChange={e => set('nilai', +e.target.value)} />
            </Field>
            <Field label="Periode">
              <input className={inputCls} value={form.periode} onChange={e => set('periode', e.target.value)} placeholder="2026–2027" />
            </Field>
          </div>
        </Modal>
      )}
    </div>
  )
}
