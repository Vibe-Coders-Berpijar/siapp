import { createServiceClient } from '@/lib/supabase/service'
import KaprodiClient, { type KpiItem } from './KaprodiClient'
import type { AtRiskStudent } from './components/AtRiskTab'

const PRODI_IDS = {
  S1: '11111111-0001-0000-0000-000000000000',
  S2: '11111111-0002-0000-0000-000000000000',
  S3: '11111111-0003-0000-0000-000000000000',
} as const

const CURRENT_YEAR = 2026

function avg(nums: number[]) {
  if (!nums.length) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

function classifyRisk(ipk: number, status: string, angkatan: number, prodi: 'S1' | 'S2' | 'S3') {
  if (status === 'cuti') return 'Tidak Aktif'
  const semester = (CURRENT_YEAR - angkatan) * 2
  const maxSmt = prodi === 'S2' ? 8 : 14
  if (semester > maxSmt) return 'Melewati Batas'
  return 'IPK Rendah'
}

export default async function KaprodiPage() {
  const supabase = createServiceClient()

  const { data: allStudents } = await supabase
    .from('students')
    .select('id, nim, nama, prodi_id, angkatan, ipk, sks_lulus, status')

  const students = allStudents ?? []

  const byProdi = {
    S1: students.filter((s) => s.prodi_id === PRODI_IDS.S1),
    S2: students.filter((s) => s.prodi_id === PRODI_IDS.S2),
    S3: students.filter((s) => s.prodi_id === PRODI_IDS.S3),
  }

  function prodiStats(arr: typeof students) {
    const aktif = arr.filter((s) => s.status === 'aktif')
    const ipks = aktif.map((s) => parseFloat(String(s.ipk ?? 0))).filter(Boolean)
    const atRisk = aktif.filter((s) => parseFloat(String(s.ipk ?? 0)) < 2.75).length
    return { aktif: aktif.length, avgIpk: avg(ipks).toFixed(2), atRisk }
  }

  const s1 = prodiStats(byProdi.S1)
  const s2 = prodiStats(byProdi.S2)
  const s3 = prodiStats(byProdi.S3)
  const allAktif = students.filter((s) => s.status === 'aktif')
  const allIpks = allAktif.map((s) => parseFloat(String(s.ipk ?? 0))).filter(Boolean)
  const allAtRisk = allAktif.filter((s) => parseFloat(String(s.ipk ?? 0)) < 2.75).length

  const kpi: Record<string, KpiItem[]> = {
    semua: [
      { label: 'Mahasiswa Aktif',   value: String(allAktif.length), hint: `S1: ${s1.aktif} · S2: ${s2.aktif} · S3: ${s3.aktif}` },
      { label: 'Rata-rata IPK',     value: avg(allIpks).toFixed(2), trend: 'up' },
      { label: 'Mahasiswa At-Risk', value: String(allAtRisk), trend: 'down', hint: 'IPK < 2.75 atau tidak aktif' },
      { label: 'Lulusan Tahun Ini', value: '—', hint: 'Data belum tersedia' },
    ],
    S1: [
      { label: 'Mahasiswa S1 Aktif', value: String(s1.aktif) },
      { label: 'Rata-rata IPK S1',   value: s1.avgIpk, trend: 'up' },
      { label: 'At-Risk S1',         value: String(s1.atRisk), trend: 'down', hint: 'IPK < 2.75' },
      { label: 'Lulusan S1',         value: '—', hint: 'Data belum tersedia' },
    ],
    S2: [
      { label: 'Mahasiswa S2 Aktif', value: String(s2.aktif) },
      { label: 'Rata-rata IPK S2',   value: s2.avgIpk, trend: 'up' },
      { label: 'At-Risk S2',         value: String(s2.atRisk), hint: 'Melewati batas semester' },
      { label: 'Lulusan S2',         value: '—', hint: 'Data belum tersedia' },
    ],
    S3: [
      { label: 'Mahasiswa S3 Aktif', value: String(s3.aktif) },
      { label: 'Rata-rata IPK S3',   value: s3.avgIpk, trend: 'up' },
      { label: 'At-Risk S3',         value: String(s3.atRisk), hint: 'Melewati tahun ke-6' },
      { label: 'Lulusan S3',         value: '—', hint: 'Data belum tersedia' },
    ],
  }

  const prodiLabel: Record<string, 'S1' | 'S2' | 'S3'> = {
    [PRODI_IDS.S1]: 'S1',
    [PRODI_IDS.S2]: 'S2',
    [PRODI_IDS.S3]: 'S3',
  }

  const atRiskStudents: AtRiskStudent[] = students
    .filter((s) => parseFloat(String(s.ipk ?? 0)) < 2.75 || s.status === 'cuti')
    .slice(0, 50)
    .map((s, idx) => {
      const pk = prodiLabel[s.prodi_id] ?? 'S1'
      return {
        id: String(idx + 1),
        nama: s.nama,
        nim: s.nim,
        prodi: pk,
        semester: (CURRENT_YEAR - Number(s.angkatan)) * 2,
        ipk: parseFloat(String(s.ipk ?? 0)),
        sksTertunggak: 0,
        riskType: classifyRisk(parseFloat(String(s.ipk ?? 0)), s.status, Number(s.angkatan), pk),
      }
    })

  return <KaprodiClient kpi={kpi} atRiskStudents={atRiskStudents} />
}
