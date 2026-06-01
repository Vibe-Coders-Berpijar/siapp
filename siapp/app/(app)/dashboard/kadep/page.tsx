import { createServiceClient } from '@/lib/supabase/service'
import { DashboardLayout } from '@/components/kadep/DashboardLayout'
import { KpiRow } from '@/components/kadep/KpiRow'
import { TridharmaChart } from '@/components/kadep/TridharmaChart'
import { PendingApprovals, type ApprovalItem } from '@/components/kadep/PendingApprovals'
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
    { data: pendingLetters },
  ] = await Promise.all([
    supabase.from('lecturers').select('*', { count: 'exact', head: true }),
    supabase.from('publications').select('*', { count: 'exact', head: true }).gte('tahun', CURRENT_YEAR - 1),
    supabase.from('grants').select('*', { count: 'exact', head: true }).eq('status', 'Aktif'),
    supabase.from('students').select('*', { count: 'exact', head: true }).eq('status', 'aktif'),
    supabase.from('letters').select('id, nomor, perihal, jenis, status, created_at, profiles!inner(full_name)').eq('status', 'Menunggu').order('created_at', { ascending: false }).limit(5),
  ])

  const approvals: ApprovalItem[] = (pendingLetters ?? []).map((l, i) => ({
    id: i + 1,
    nomor: l.nomor ?? '—',
    perihal: l.perihal,
    pengaju: (l.profiles as { full_name: string }).full_name ?? '—',
    tanggal: new Date(l.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    status: l.status,
  }))

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
        <PendingApprovals initialApprovals={approvals} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DecisionAsks />
        <IkuPanel />
      </div>
    </DashboardLayout>
  )
}
