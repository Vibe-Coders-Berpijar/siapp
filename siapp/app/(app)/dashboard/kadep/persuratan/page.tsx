"use client";

import { useState } from 'react'
import { DashboardLayout } from '@/components/kadep/DashboardLayout'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Modal, Field, inputCls, selectCls } from '@/components/shared/Modal'
import { useToast } from '@/components/shared/Toast'
import { pendingApprovals, currentUser } from '@/lib/mock-data-kadep'

type SuratStatus = 'menunggu' | 'ditandatangani' | 'diarsip' | 'ditolak'

interface Surat {
  id: number
  nomor: string
  perihal: string
  pengaju: string
  tanggal: string
  status: SuratStatus
}

const initialSurat: Surat[] = [
  ...(pendingApprovals as Surat[]),
  { id: 3, nomor: 'B/015/UN1.SIPSO/HM/2026', perihal: 'Surat Keterangan Aktif Mengajar — Prof. Bambang Wicaksono', pengaju: 'Prof. Bambang Wicaksono', tanggal: '2 Mei 2026', status: 'ditandatangani' },
  { id: 4, nomor: 'B/014/UN1.SIPSO/HM/2026', perihal: 'Undangan Rapat Koordinasi Akreditasi', pengaju: 'Dr. Ratih Dewi Kusuma', tanggal: '30 Apr 2026', status: 'ditandatangani' },
  { id: 5, nomor: 'B/013/UN1.SIPSO/HM/2026', perihal: 'Surat Tugas Konferensi Internasional APSA', pengaju: 'Dr. Maya Indira', tanggal: '25 Apr 2026', status: 'diarsip' },
  { id: 6, nomor: 'B/012/UN1.SIPSO/HM/2026', perihal: 'Pengajuan Dana Penelitian Hibah LPDP', pengaju: 'Dr. Reza Pratama', tanggal: '20 Apr 2026', status: 'diarsip' },
]

const blank = (): Omit<Surat, 'id'> => ({
  nomor: '', perihal: '', pengaju: '', tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }), status: 'menunggu',
})

const tabs = ['Semua', 'Menunggu', 'Ditandatangani', 'Diarsip']

export default function PersuratanPage() {
  const [surats, setSurats] = useState<Surat[]>(initialSurat)
  const [activeTab, setActiveTab] = useState('Semua')
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [form, setForm] = useState(blank())
  const [editId, setEditId] = useState<number | null>(null)
  const [editOriginalStatus, setEditOriginalStatus] = useState<SuratStatus>('menunggu')
  const { show, node } = useToast()

  function openAdd() { setForm(blank()); setModal('add') }
  function openEdit(s: Surat) {
    setForm({ nomor: s.nomor, perihal: s.perihal, pengaju: s.pengaju, tanggal: s.tanggal, status: s.status })
    setEditId(s.id)
    setEditOriginalStatus(s.status)
    setModal('edit')
  }
  function closeModal() { setModal(null); setEditId(null) }

  function handleSave() {
    if (!form.perihal.trim() || !form.pengaju.trim()) { show('Perihal dan pengaju wajib diisi', 'error'); return }
    if (modal === 'add') {
      const newId = Math.max(...surats.map(s => s.id), 0) + 1
      const maxSeq = Math.max(
        ...surats.map(s => { const m = s.nomor.match(/B\/(\d+)\//) ; return m ? parseInt(m[1]) : 0 }),
        0
      )
      const nomor = form.nomor.trim() || `B/${String(maxSeq + 1).padStart(3, '0')}/UN1.SIPSO/HM/2026`
      setSurats(prev => [{ id: newId, ...form, nomor }, ...prev])
      show(`Surat "${form.perihal.slice(0, 35)}…" dibuat`, 'success')
    } else {
      setSurats(prev => prev.map(s => s.id === editId ? { ...s, ...form } : s))
      show('Surat diperbarui', 'success')
    }
    closeModal()
  }

  function handleSign(id: number, perihal: string) {
    setSurats(prev => prev.map(s => s.id === id ? { ...s, status: 'ditandatangani' } : s))
    show(`Ditandatangani: ${perihal.slice(0, 45)}…`, 'success')
  }

  function handleDelete(s: Surat) {
    setSurats(prev => prev.filter(x => x.id !== s.id))
    show(`Surat ${s.nomor} dihapus`, 'info')
  }

  function set<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  const filtered = surats.filter(s => {
    if (activeTab === 'Semua') return true
    return s.status.toLowerCase() === activeTab.toLowerCase()
  })

  const counts = {
    total: surats.length,
    menunggu: surats.filter(s => s.status === 'menunggu').length,
    ditandatangani: surats.filter(s => s.status === 'ditandatangani').length,
    diarsip: surats.filter(s => s.status === 'diarsip').length,
  }

  return (
    <DashboardLayout
      title="Persuratan"
      subtitle="Kelola dan tandatangani surat keluar departemen"
      userName={currentUser.nama}
      jabatan={currentUser.jabatan}
    >
      {node}

      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[130px] rounded-2xl p-5 bg-white border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Total Surat</p>
          <p className="text-3xl font-bold text-slate-800">{counts.total}</p>
        </div>
        <div className="flex-1 min-w-[130px] rounded-2xl p-5 bg-amber-50 border border-amber-200 shadow-sm">
          <p className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Menunggu</p>
          <p className="text-3xl font-bold text-amber-700">{counts.menunggu}</p>
        </div>
        <div className="flex-1 min-w-[130px] rounded-2xl p-5 bg-emerald-50 border border-emerald-200 shadow-sm">
          <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide mb-1">Ditandatangani</p>
          <p className="text-3xl font-bold text-emerald-700">{counts.ditandatangani}</p>
        </div>
        <div className="flex-1 min-w-[130px] rounded-2xl p-5 bg-blue-50 border border-blue-200 shadow-sm">
          <p className="text-xs font-medium text-blue-700 uppercase tracking-wide mb-1">Diarsip</p>
          <p className="text-3xl font-bold text-blue-700">{counts.diarsip}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button onClick={openAdd} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0">+ Buat Surat</button>
        </div>

        {filtered.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-10">Tidak ada surat ditemukan.</p>
        )}

        <div className="space-y-3">
          {filtered.map(surat => (
            <div key={surat.id} className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 font-mono mb-1">{surat.nomor}</p>
                <p className="text-sm font-medium text-slate-800 leading-snug">{surat.perihal}</p>
                <p className="text-xs text-slate-400 mt-1">{surat.pengaju} · {surat.tanggal}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <StatusBadge status={surat.status} size="sm" />
                {surat.status === 'menunggu' && (
                  <button onClick={() => handleSign(surat.id, surat.perihal)} className="text-xs font-medium px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    Tanda Tangani
                  </button>
                )}
                <button onClick={() => openEdit(surat)} className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">Edit</button>
                <button onClick={() => handleDelete(surat)} className="text-xs font-medium px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Buat Surat Baru' : 'Edit Surat'} onClose={closeModal} onSave={handleSave}>
          <Field label="Nomor Surat (kosongkan untuk auto)">
            <input className={inputCls} value={form.nomor} onChange={e => set('nomor', e.target.value)} placeholder="B/0XX/UN1.SIPSO/HM/2026" />
          </Field>
          <Field label="Perihal">
            <input className={inputCls} value={form.perihal} onChange={e => set('perihal', e.target.value)} placeholder="Deskripsi surat..." />
          </Field>
          <Field label="Pengaju">
            <input className={inputCls} value={form.pengaju} onChange={e => set('pengaju', e.target.value)} placeholder="Nama dosen pengaju" />
          </Field>
          <Field label="Tanggal">
            <input className={inputCls} value={form.tanggal} onChange={e => set('tanggal', e.target.value)} />
          </Field>
          <Field label="Status">
            {modal === 'add' ? (
              <select className={selectCls} value={form.status} onChange={e => set('status', e.target.value as SuratStatus)}>
                <option value="menunggu">Menunggu</option>
                <option value="ditandatangani">Ditandatangani</option>
                <option value="diarsip">Diarsip</option>
                <option value="ditolak">Ditolak</option>
              </select>
            ) : (
              <select className={selectCls} value={form.status} onChange={e => set('status', e.target.value as SuratStatus)}>
                {editOriginalStatus === 'menunggu' && <option value="menunggu">Menunggu</option>}
                {(editOriginalStatus === 'menunggu' || editOriginalStatus === 'ditandatangani') && (
                  <option value="ditandatangani">Ditandatangani</option>
                )}
                {(editOriginalStatus === 'menunggu' || editOriginalStatus === 'ditandatangani' || editOriginalStatus === 'diarsip') && (
                  <option value="diarsip">Diarsip</option>
                )}
                {editOriginalStatus === 'menunggu' && <option value="ditolak">Ditolak</option>}
                {editOriginalStatus === 'ditolak' && <option value="ditolak">Ditolak</option>}
              </select>
            )}
          </Field>
        </Modal>
      )}
    </DashboardLayout>
  )
}
