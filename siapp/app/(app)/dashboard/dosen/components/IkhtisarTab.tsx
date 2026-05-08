'use client';

import { StatCard } from '@/components/shared/StatCard';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const TRIDHARMA_DATA = [
  { subject: 'Pendidikan', personal: 75, departemen: 72 },
  { subject: 'Penelitian', personal: 80, departemen: 65 },
  { subject: 'Pengabdian', personal: 70, departemen: 68 },
];

const AI_SUGGESTIONS = [
  {
    id: 1,
    icon: '⚠',
    severity: 'Tinggi',
    severityColor: 'bg-red-100 text-red-700',
    text: 'RPKPS POL4101 belum disetujui. Sidang mata kuliah mendekat — perlu finalisasi minggu ini.',
  },
  {
    id: 2,
    icon: '📋',
    severity: 'Sedang',
    severityColor: 'bg-amber-100 text-amber-700',
    text: '3 mahasiswa bimbingan S2 mendekati batas pengajuan judul tesis. Jadwal konsultasi disarankan.',
  },
  {
    id: 3,
    icon: '✦',
    severity: 'Info',
    severityColor: 'bg-blue-100 text-blue-700',
    text: 'Publikasi Q1 Anda terindeks Scopus. Perbarui profil SINTA dan ORCID untuk kelengkapan BKD.',
  },
];

export function IkhtisarTab() {
  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Skor Tridharma Saya" value="82 / 100" hint="Top 30% departemen" />
        <StatCard label="SKS Semester Ini" value="9 SKS" hint="3 mata kuliah aktif" />
        <StatCard label="Publikasi Tahun Ini" value="2 Publikasi" trend="up" />
        <StatCard label="Hibah Aktif" value="1 Hibah" hint="Rp 150 juta" />
      </div>

      {/* Tridharma RadarChart */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Kontribusi Tridharma</h2>
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={TRIDHARMA_DATA}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              tickCount={4}
            />
            <Radar
              name="Saya"
              dataKey="personal"
              stroke="#4f46e5"
              fill="#4f46e5"
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Radar
              name="Rata-rata Dept."
              dataKey="departemen"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.15}
              strokeWidth={2}
              strokeDasharray="4 3"
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            />
            <Tooltip
              formatter={(value) => [`${value} / 100`]}
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* AI Suggestions */}
      <div className="rounded-2xl border border-amber-200/60 bg-amber-50/60 backdrop-blur-xl shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-amber-900">✦ Saran dari SIAPP</h2>
          <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
            Mock Phase 1
          </span>
        </div>
        <div className="space-y-3">
          {AI_SUGGESTIONS.map((s) => (
            <div key={s.id} className="flex items-start gap-3 bg-white/70 rounded-xl border border-amber-100 p-3">
              <span className="text-base mt-0.5">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.severityColor}`}>
                    {s.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-amber-600 mt-3">
          {/* TODO: replace with aiRoute('dosen.daily_suggestions') in Phase 2 */}
          Data per 8 Mei 2026 · Dihasilkan dari data mock
        </p>
      </div>
    </div>
  );
}
