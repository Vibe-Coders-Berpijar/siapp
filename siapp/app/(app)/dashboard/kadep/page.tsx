"use client";

import { DashboardLayout } from '@/components/kadep/DashboardLayout'
import { KpiRow } from '@/components/kadep/KpiRow'
import { TridharmaChart } from '@/components/kadep/TridharmaChart'
import { PendingApprovals } from '@/components/kadep/PendingApprovals'
import { DecisionAsks } from '@/components/kadep/DecisionAsks'
import { IkuPanel } from '@/components/kadep/IkuPanel'
import { currentUser } from '@/lib/mock-data-kadep'

export default function KadepPage() {
  return (
    <DashboardLayout
      title="Dashboard Kepala Departemen"
      subtitle={`Selamat datang, ${currentUser.nama} · ${new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`}
      userName={currentUser.nama}
      jabatan={currentUser.jabatan}
    >
      <div className="flex items-end justify-end -mt-4 mb-2">
        <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-3 py-1.5 rounded-full">Sistem Aktif</span>
      </div>

      <KpiRow />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TridharmaChart />
        <PendingApprovals />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DecisionAsks />
        <IkuPanel />
      </div>
    </DashboardLayout>
  )
}
