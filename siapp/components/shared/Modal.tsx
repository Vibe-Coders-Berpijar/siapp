"use client";

import { ReactNode } from 'react'

interface ModalProps {
  title: string
  onClose: () => void
  onSave: () => void
  saveLabel?: string
  wide?: boolean
  children: ReactNode
}

export function Modal({ title, onClose, onSave, saveLabel = 'Simpan', wide = false, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-xl w-full mx-4 max-h-[90vh] flex flex-col ${wide ? 'max-w-3xl' : 'max-w-lg'}`}>
        <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
          <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 leading-none text-lg">✕</button>
        </div>
        <div className="space-y-3 overflow-y-auto flex-1 px-6">{children}</div>
        <div className="flex gap-2 justify-end px-6 py-4 shrink-0 border-t border-slate-100 mt-2">
          <button onClick={onClose} className="text-sm px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">Batal</button>
          <button onClick={onSave} className="text-sm px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">{saveLabel}</button>
        </div>
      </div>
    </div>
  )
}

interface FieldProps {
  label: string
  children: ReactNode
}

export function Field({ label, children }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      {children}
    </div>
  )
}

export const inputCls = 'w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
export const selectCls = 'w-full text-sm px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
