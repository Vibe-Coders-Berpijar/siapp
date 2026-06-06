import { createServiceClient } from '@/lib/supabase/service'
import PersuratanKadepClient, { type Surat } from './PersuratanKadepClient'

function mapStatus(s: string): Surat['status'] {
  const lower = s.toLowerCase()
  if (lower === 'menunggu') return 'menunggu'
  if (lower === 'ditandatangani') return 'ditandatangani'
  if (lower === 'diarsip') return 'diarsip'
  if (lower === 'ditolak') return 'ditolak'
  return 'menunggu'
}

export default async function PersuratanPage() {
  const supabase = createServiceClient()

  // Kepala Departemen: Dr. Anak Agung Gde Ngurah Ari Dwipayana (confirmed from dpp.fisipol.ugm.ac.id)
  const [{ data: letterRows }, { data: kadepRow }] = await Promise.all([
    supabase
      .from('letters')
      .select('id, nomor, perihal, status, created_at, profiles!inner(full_name)')
      .order('created_at', { ascending: false })
      .limit(20),
    supabase
      .from('lecturers')
      .select('jabatan, profiles!inner(full_name)')
      .eq('nidn', '0024027203')
      .single(),
  ])

  const surats: Surat[] = (letterRows ?? []).map((l, i) => ({
    id: i + 1,
    nomor: l.nomor ?? '—',
    perihal: l.perihal,
    pengaju: (l.profiles as unknown as { full_name: string }).full_name ?? '—',
    tanggal: new Date(l.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    status: mapStatus(l.status),
  }))

  const kadepName = kadepRow
    ? (kadepRow.profiles as unknown as { full_name: string }).full_name
    : 'Kepala Departemen'

  return (
    <PersuratanKadepClient
      initialSurat={surats}
      userName={kadepName}
      jabatan="Kepala Departemen"
    />
  )
}
