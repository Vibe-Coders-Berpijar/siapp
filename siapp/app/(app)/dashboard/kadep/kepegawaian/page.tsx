import { createServiceClient } from '@/lib/supabase/service'
import KepegawaianClient from './KepegawaianClient'
import type { Dosen } from '@/components/kadep/DosenTable'

const JABATAN_ORDER: Record<string, number> = {
  'Guru Besar': 1,
  'Lektor Kepala': 2,
  'Lektor': 3,
  'Asisten Ahli': 4,
  'Tenaga Pengajar': 5,
}

export default async function KepegawaianPage() {
  const supabase = createServiceClient()

  const { data: rows } = await supabase
    .from('lecturers')
    .select(`
      id,
      nidn,
      jabatan,
      profiles!inner ( full_name ),
      publications ( id ),
      grants ( id, status )
    `)

  const dosens: Dosen[] = (rows ?? [])
    .map((r, idx) => ({
      id: idx + 1,
      nama: (r.profiles as { full_name: string }).full_name ?? '—',
      jabatan: (r.jabatan ?? 'Tenaga Pengajar') as Dosen['jabatan'],
      nidn: r.nidn ?? '—',
      publikasi: Array.isArray(r.publications) ? r.publications.length : 0,
      sks: 0,
      hibahAktif: Array.isArray(r.grants)
        ? r.grants.filter((g: { status: string }) => g.status === 'Aktif').length
        : 0,
    }))
    .sort((a, b) => (JABATAN_ORDER[a.jabatan] ?? 9) - (JABATAN_ORDER[b.jabatan] ?? 9))

  return (
    <KepegawaianClient
      initialDosens={dosens}
      userName="Kepala Departemen"
      jabatan="Kepala Departemen"
    />
  )
}
