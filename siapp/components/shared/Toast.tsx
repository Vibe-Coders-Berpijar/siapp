"use client";

import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'info' | 'error'
  onDone: () => void
}

export function Toast({ message, type = 'info', onDone }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 300) }, 2500)
    return () => clearTimeout(t)
  }, [onDone])

  const bg = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-red-600' : 'bg-slate-800'

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg transition-all duration-300 ${bg} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      {message}
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'info' | 'error' } | null>(null)
  const show = (message: string, type: 'success' | 'info' | 'error' = 'info') => setToast({ message, type })
  const node = toast ? <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} /> : null
  return { show, node }
}
