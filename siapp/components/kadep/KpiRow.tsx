"use client";

import { StatCard } from '@/components/shared/StatCard'
import { kpiData } from '@/lib/mock-data-kadep'

export function KpiRow() {
  return (
    <div className="flex gap-4 flex-wrap">
      <StatCard label="Total Dosen" value={kpiData.totalDosen} hint="Aktif mengajar" trend="up" />
      <StatCard label="Publikasi Tahun Ini" value={kpiData.publikasiTahunIni} hint="Per Mei 2026" trend="up" />
      <StatCard label="Hibah Aktif" value={kpiData.hibahAktif} hint="Kemdiktisaintek & LPDP" />
      <StatCard label="Mahasiswa Aktif" value={kpiData.mahasiswaAktif} hint="S1, S2, S3" trend="up" />
    </div>
  )
}
