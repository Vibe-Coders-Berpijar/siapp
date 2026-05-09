'use server'

import { aiRoute } from '@/lib/ai/route'

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
