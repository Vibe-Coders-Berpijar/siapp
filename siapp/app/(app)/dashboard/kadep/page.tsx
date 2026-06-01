import { createServiceClient } from '@/lib/supabase/service'
import { DashboardLayout } from '@/components/kadep/DashboardLayout'
import { KpiRow } from '@/components/kadep/KpiRow'
import { TridharmaChart } from '@/components/kadep/TridharmaChart'
import { PendingApprovals } from '@/components/kadep/PendingApprovals'
import { DecisionAsks } from '@/components/kadep/DecisionAsks'
import { IkuPanel } from '@/components/kadep/IkuPanel'

const CURRENT_YEAR = new Date().getFullYear()

export default async function KadepPage() {
  const supabase = createServiceClient()

  const [
    { count: totalDosen },
    { count: publikasiTahunIni },
    { count: hibahAktif },
    { count: mahasiswaAktif },
  ] = await Promise.all([
    supabase.from('lecturers').select('*', { count: 'exact', head: true }),
    supabase.from('publications').select('*', { count: 'exact', head: true }).gte('tahun', CURRENT_YEAR - 1),
    supabase.from('grants').select('*', { count: 'exact', head: true }).eq('status', 'Aktif'),
    supabase.from('students').select('*', { count: 'exact', head: true }).eq('status', 'aktif'),
  ])

  return (
    <DashboardLayout
      title="Dashboard Kepala Departemen"
      subtitle={`Selamat datang · ${new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`}
      userName="Kepala Departemen"
      jabatan="Kepala Departemen"
    >
      <div className="flex items-end justify-end -mt-4 mb-2">
        <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-3 py-1.5 rounded-full">Sistem Aktif</span>
      </div>

      <KpiRow
        totalDosen={totalDosen ?? 0}
        publikasiTahunIni={publikasiTahunIni ?? 0}
        hibahAktif={hibahAktif ?? 0}
        mahasiswaAktif={mahasiswaAktif ?? 0}
      />

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
