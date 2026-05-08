"use client";

import { useState } from 'react'
import { decisionAsks } from '@/lib/mock-data-kadep'
import { Modal, Field, inputCls, selectCls } from '@/components/shared/Modal'
import { useToast } from '@/components/shared/Toast'

type Priority = 'Tinggi' | 'Sedang'
type DecisionStatus = 'menunggu' | 'dalam-review' | 'disetujui'

interface Decision {
  id: number
  item: string
  batas: string
  status: DecisionStatus
  prioritas: Priority
}

const priorityColor: Record<string, string> = {
  Tinggi: 'bg-red-100 text-red-700',
  Sedang: 'bg-amber-100 text-amber-700',
}

const blank = (): Omit<Decision, 'id'> => ({
  item: '', batas: '', status: 'menunggu', prioritas: 'Sedang',
})

export function DecisionAsks() {
  const [decisions, setDecisions] = useState<Decision[]>(decisionAsks as Decision[])
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [form, setForm] = useState(blank())
  const [editId, setEditId] = useState<number | null>(null)
  const { show, node } = useToast()

  function openAdd() { setForm(blank()); setModal('add') }
  function openEdit(d: Decision) { setForm({ item: d.item, batas: d.batas, status: d.status, prioritas: d.prioritas }); setEditId(d.id); setModal('edit') }
  function closeModal() { setModal(null); setEditId(null) }

  function handleSave() {
    if (!form.item.trim()) { show('Deskripsi keputusan wajib diisi', 'error'); return }
    if (modal === 'add') {
      const newId = Math.max(...decisions.map(d => d.id), 0) + 1
      setDecisions(prev => [...prev, { id: newId, ...form }])
      show('Keputusan ditambahkan', 'success')
    } else {
      setDecisions(prev => prev.map(d => d.id === editId ? { ...d, ...form } : d))
      show('Keputusan diperbarui', 'success')
    }
    closeModal()
  }

  function handleApprove(id: number, item: string) {
    setDecisions(prev => prev.map(d => d.id === id ? { ...d, status: 'disetujui' } : d))
    show(`Disetujui: ${item.slice(0, 40)}…`, 'success')
  }

  function handleDelete(d: Decision) {
    setDecisions(prev => prev.filter(x => x.id !== d.id))
    show('Keputusan dihapus', 'info')
  }

  function set<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  const pending = decisions.filter(d => d.status !== 'disetujui')

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-4">
      {node}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Keputusan Strategis Menunggu</p>
          {pending.length > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">{pending.length} item</span>
          )}
        </div>
        <button onClick={openAdd} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">+ Tambah</button>
      </div>

      {pending.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-6">Semua keputusan telah diselesaikan.</p>
      ) : (
        <div className="space-y-2">
          {pending.map(d => (
            <div key={d.id} className="flex flex-col gap-2 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 leading-snug">{d.item}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Batas: {d.batas}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${priorityColor[d.prioritas]}`}>{d.prioritas}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => handleApprove(d.id, d.item)} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">Setuju</button>
                <button onClick={() => openEdit(d)} className="text-xs text-blue-600 hover:underline px-1">Edit</button>
                <button onClick={() => handleDelete(d)} className="text-xs text-red-500 hover:underline px-1">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === 'add' ? 'Tambah Keputusan' : 'Edit Keputusan'} onClose={closeModal} onSave={handleSave}>
          <Field label="Deskripsi Keputusan">
            <input className={inputCls} value={form.item} onChange={e => set('item', e.target.value)} placeholder="Persetujuan / validasi..." />
          </Field>
          <Field label="Batas Waktu">
            <input className={inputCls} value={form.batas} onChange={e => set('batas', e.target.value)} placeholder="15 Mei 2026" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Prioritas">
              <select className={selectCls} value={form.prioritas} onChange={e => set('prioritas', e.target.value as Priority)}>
                <option value="Tinggi">Tinggi</option>
                <option value="Sedang">Sedang</option>
              </select>
            </Field>
            <Field label="Status">
              <select className={selectCls} value={form.status} onChange={e => set('status', e.target.value as DecisionStatus)}>
                <option value="menunggu">Menunggu</option>
                <option value="dalam-review">Dalam Review</option>
                <option value="disetujui">Disetujui</option>
              </select>
            </Field>
          </div>
        </Modal>
      )}
    </div>
  )
}
