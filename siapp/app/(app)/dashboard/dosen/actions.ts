'use server'

import { aiRoute } from '@/lib/ai/route'

export interface DoiLookupResult {
  jurnal: string
  quartile: 'Q1' | 'Q2' | 'Q3' | 'Q4'
  doi: string | null
  tahun: number | null
}

export async function lookupPublikasiByTitle(judul: string): Promise<DoiLookupResult> {
  const raw = await aiRoute('publikasi.doi_lookup', `Judul artikel: "${judul}"`)
  try {
    const parsed = JSON.parse(raw)
    return {
      jurnal: parsed.journal ?? '',
      quartile: (['Q1', 'Q2', 'Q3', 'Q4'] as const).includes(parsed.quartile)
        ? parsed.quartile
        : 'Q2',
      doi: parsed.doi ?? null,
      tahun: parsed.year ? Number(parsed.year) : null,
    }
  } catch {
    return { jurnal: '', quartile: 'Q2', doi: null, tahun: null }
  }
}

export async function generateRPKPS(
  kode: string,
  nama: string,
  sks: number,
  semester: string
): Promise<string> {
  const prompt = `Buat RPKPS untuk mata kuliah berikut:
- Kode: ${kode}
- Nama: ${nama}
- SKS: ${sks}
- Semester: ${semester}

Susun RPKPS lengkap mencakup deskripsi mata kuliah, capaian pembelajaran (CPL & CPMK), rencana pembelajaran per minggu (${sks * 16} pertemuan), metode pembelajaran, dan rubrik penilaian.`

  return aiRoute('rpkps.generate', prompt)
}

export async function generateRisetOutline(
  judul: string,
  jenis: 'Penelitian' | 'PkM',
  tahun: number
): Promise<string> {
  const prompt = `Buat outline proposal ${jenis} berikut:
- Judul: ${judul}
- Jenis: ${jenis}
- Tahun: ${tahun}

Susun outline lengkap sesuai format DIKTI, mencakup latar belakang, rumusan masalah, tujuan, tinjauan pustaka, metodologi, luaran yang diharapkan, dan rencana anggaran ringkas.`

  return aiRoute('riset.outline_assist', prompt)
}
