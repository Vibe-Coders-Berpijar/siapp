"use client";

interface Criterion { kode: string; label: string; score: number }

function scoreColor(score: number) {
  if (score >= 80) return { pill: 'bg-emerald-100 text-emerald-700 border-emerald-200', bar: '#10b981' }
  if (score >= 50) return { pill: 'bg-amber-100 text-amber-700 border-amber-200', bar: '#f59e0b' }
  return { pill: 'bg-red-100 text-red-700 border-red-200', bar: '#ef4444' }
}

function CircularGauge({ value }: { value: number }) {
  const r = 44
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  const color = value >= 80 ? '#10b981' : value >= 50 ? '#f59e0b' : '#ef4444'
  return (
    <div className="flex flex-col items-center">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="#f1f5f9" strokeWidth="10" />
        <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 55 55)" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
        <text x="55" y="51" textAnchor="middle" fill="#1e293b" fontSize="18" fontWeight="700">{value}%</text>
        <text x="55" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">Rata-rata</text>
      </svg>
      <p className="text-xs font-semibold text-slate-500 mt-1">Skor BAN-PT</p>
    </div>
  )
}

interface Props { criteria: Criterion[] }

export function AccreditationPanel({ criteria }: Props) {
  const avg = Math.round(criteria.reduce((s, c) => s + c.score, 0) / criteria.length)
  return (
    <div className="rounded-2xl p-5 bg-white border border-slate-100 shadow-sm">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Kesiapan Akreditasi BAN-PT</p>
      <div className="flex gap-6 items-start">
        <div className="shrink-0"><CircularGauge value={avg} /></div>
        <div className="grid grid-cols-3 gap-2 flex-1">
          {criteria.map(c => {
            const { pill } = scoreColor(c.score)
            return (
              <div key={c.kode} className={`rounded-xl px-3 py-2.5 border text-center ${pill}`}>
                <p className="text-[10px] font-bold">{c.kode}</p>
                <p className="text-[10px] font-medium opacity-80 leading-tight">{c.label}</p>
                <p className="text-base font-bold mt-0.5">{c.score}%</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex gap-3 mt-3 text-xs text-slate-500">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> ≥80% Baik</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span> 50–79% Perlu Perhatian</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span> &lt;50% Kritis</span>
      </div>
    </div>
  )
}
