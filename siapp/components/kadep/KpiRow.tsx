import { StatCard } from '@/components/shared/StatCard'

interface Props {
  totalDosen: number
  publikasiTahunIni: number
  hibahAktif: number
  mahasiswaAktif: number
}

export function KpiRow({ totalDosen, publikasiTahunIni, hibahAktif, mahasiswaAktif }: Props) {
  return (
    <div className="flex gap-4 flex-wrap">
      <StatCard label="Total Dosen" value={totalDosen} hint="Aktif mengajar" trend="up" />
      <StatCard label="Publikasi Tahun Ini" value={publikasiTahunIni} hint="Per Mei 2026" trend="up" />
      <StatCard label="Hibah Aktif" value={hibahAktif} hint="Kemdiktisaintek & LPDP" />
      <StatCard label="Mahasiswa Aktif" value={mahasiswaAktif} hint="S1, S2, S3" trend="up" />
    </div>
  )
}
