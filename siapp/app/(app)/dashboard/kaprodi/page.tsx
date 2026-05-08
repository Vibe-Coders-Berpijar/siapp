'use client';

import { useState } from 'react';
import { StatCard } from '@/components/shared/StatCard';
import { GraduationChart } from './components/GraduationChart';
import { IpkDistributionChart } from './components/IpkDistributionChart';
import { AiInsightsCard } from './components/AiInsightsCard';
import { KurikulumTab } from './components/KurikulumTab';
import { AtRiskTab } from './components/AtRiskTab';
import { EdomProgramTab } from './components/EdomProgramTab';
import { AiAssistantTab } from './components/AiAssistantTab';
import { AkreditasiTab } from './components/AkreditasiTab';

const PRODIS = ['semua', 'S1', 'S2', 'S3'] as const;
type Prodi = (typeof PRODIS)[number];

const TABS = ['Ikhtisar', 'Kurikulum', 'Mahasiswa At-Risk', 'EDOM Program', 'AI Asisten', 'Akreditasi'] as const;
type Tab = (typeof TABS)[number];

const KPI: Record<Prodi, { label: string; value: string; trend?: 'up' | 'down'; hint?: string }[]> = {
  semua: [
    { label: 'Mahasiswa Aktif',    value: '892',  hint: 'S1: 650 · S2: 182 · S3: 60' },
    { label: 'Rata-rata IPK',      value: '3.42', trend: 'up',   hint: '+0.08 dari semester lalu' },
    { label: 'Mahasiswa At-Risk',  value: '23',   trend: 'down', hint: 'IPK < 2.75 atau tidak aktif' },
    { label: 'Lulusan Tahun Ini',  value: '151',  trend: 'up' },
  ],
  S1: [
    { label: 'Mahasiswa S1 Aktif', value: '650',  hint: 'Angkatan 2021–2024' },
    { label: 'Rata-rata IPK S1',   value: '3.38', trend: 'up',   hint: '+0.06 dari semester lalu' },
    { label: 'At-Risk S1',         value: '18',   trend: 'down', hint: 'IPK < 2.75' },
    { label: 'Lulusan S1',         value: '110',  trend: 'up' },
  ],
  S2: [
    { label: 'Mahasiswa S2 Aktif', value: '182',  hint: 'Angkatan 2022–2024' },
    { label: 'Rata-rata IPK S2',   value: '3.68', trend: 'up',   hint: 'Tertinggi 3 tahun terakhir' },
    { label: 'At-Risk S2',         value: '5',    hint: 'Melewati batas semester' },
    { label: 'Lulusan S2',         value: '30',   trend: 'up' },
  ],
  S3: [
    { label: 'Mahasiswa S3 Aktif', value: '60',   hint: 'Angkatan 2020–2023' },
    { label: 'Rata-rata IPK S3',   value: '3.81', trend: 'up' },
    { label: 'At-Risk S3',         value: '1',    hint: 'Melewati tahun ke-6' },
    { label: 'Lulusan S3',         value: '11',   trend: 'up' },
  ],
};

export default function KaprodiDashboard() {
  const [prodi, setProdi] = useState<Prodi>('semua');
  const [tab, setTab] = useState<Tab>('Ikhtisar');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-violet-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* Header + ProdiSelector */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard Kaprodi</h1>
            <p className="text-sm text-gray-500 mt-0.5">Program Studi Politik dan Pemerintahan — DPP UGM</p>
          </div>
          <div className="flex items-center bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-1 gap-1 shadow">
            {PRODIS.map((p) => (
              <button
                key={p}
                onClick={() => setProdi(p)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  prodi === p
                    ? 'bg-[#231F54] text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {p === 'semua' ? 'Semua' : p}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {KPI[prodi].map((k) => (
            <StatCard key={k.label} label={k.label} value={k.value} trend={k.trend} hint={k.hint} />
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-1 w-fit shadow">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                tab === t
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === 'Ikhtisar' && (
          <div className="space-y-5">
            <div className="grid grid-cols-7 gap-4">
              <div className="col-span-4">
                <GraduationChart prodi={prodi} />
              </div>
              <div className="col-span-3">
                <IpkDistributionChart prodi={prodi} />
              </div>
            </div>
            <AiInsightsCard prodi={prodi} />
          </div>
        )}

        {tab === 'Kurikulum' && <KurikulumTab prodi={prodi} />}
        {tab === 'Mahasiswa At-Risk' && <AtRiskTab prodi={prodi} />}
        {tab === 'EDOM Program' && <EdomProgramTab prodi={prodi} />}
        {tab === 'AI Asisten' && <AiAssistantTab />}
        {tab === 'Akreditasi' && <AkreditasiTab />}

      </div>
    </div>
  );
}
