'use client';

import { useState } from 'react';
import { StatCard } from '@/components/shared/StatCard';
import { GraduationChart } from './components/GraduationChart';
import { IpkDistributionChart } from './components/IpkDistributionChart';
import { AiInsightsCard } from './components/AiInsightsCard';
import { KurikulumTab } from './components/KurikulumTab';
import { AtRiskTab, type AtRiskStudent } from './components/AtRiskTab';
import { EdomProgramTab } from './components/EdomProgramTab';
import { AiAssistantTab } from './components/AiAssistantTab';
import { AkreditasiTab } from './components/AkreditasiTab';

const PRODIS = ['semua', 'S1', 'S2', 'S3'] as const;
type Prodi = (typeof PRODIS)[number];
const TABS = ['Ikhtisar', 'Kurikulum', 'Mahasiswa At-Risk', 'EDOM Program', 'AI Asisten', 'Akreditasi'] as const;
type Tab = (typeof TABS)[number];

export interface KpiItem { label: string; value: string; trend?: 'up' | 'down'; hint?: string }

interface Props {
  kpi: Record<Prodi, KpiItem[]>
  atRiskStudents: AtRiskStudent[]
}

export default function KaprodiClient({ kpi, atRiskStudents }: Props) {
  const [prodi, setProdi] = useState<Prodi>('semua');
  const [tab, setTab] = useState<Tab>('Ikhtisar');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-violet-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-5">

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
                  prodi === p ? 'bg-[#231F54] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {p === 'semua' ? 'Semua' : p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpi[prodi].map((k) => (
            <StatCard key={k.label} label={k.label} value={k.value} trend={k.trend} hint={k.hint} />
          ))}
        </div>

        <div className="flex gap-1 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-1 w-fit shadow">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Ikhtisar' && (
          <div className="space-y-5">
            <div className="grid grid-cols-7 gap-4">
              <div className="col-span-4"><GraduationChart prodi={prodi} /></div>
              <div className="col-span-3"><IpkDistributionChart prodi={prodi} /></div>
            </div>
            <AiInsightsCard prodi={prodi} />
          </div>
        )}
        {tab === 'Kurikulum' && <KurikulumTab prodi={prodi} />}
        {tab === 'Mahasiswa At-Risk' && <AtRiskTab prodi={prodi} initialStudents={atRiskStudents} />}
        {tab === 'EDOM Program' && <EdomProgramTab prodi={prodi} />}
        {tab === 'AI Asisten' && <AiAssistantTab />}
        {tab === 'Akreditasi' && <AkreditasiTab />}

      </div>
    </div>
  );
}
