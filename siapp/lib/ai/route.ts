import Anthropic from '@anthropic-ai/sdk'

// Feature key → model + system prompt
const FEATURES = {
  // Haiku 4.5 — fast classification / lookup
  'publikasi.doi_lookup': {
    model: 'claude-haiku-4-5',
    system: `Anda adalah asisten akademik yang membantu mengisi metadata publikasi ilmiah.
Diberikan judul artikel, kembalikan JSON dengan format berikut (tanpa markdown fence):
{"journal":"<nama jurnal>","quartile":"<Q1|Q2|Q3|Q4>","doi":"<doi atau null>","year":<tahun|null>,"authors":"<penulis utama et al.>"}
Jika informasi tidak tersedia, gunakan null. Hanya kembalikan JSON, tidak ada teks lain.`,
  },
  'kepegawaian.duplicate_detection': {
    model: 'claude-haiku-4-5',
    system: `Anda adalah asisten yang mendeteksi publikasi duplikat dalam daftar akademik.
Analisis daftar yang diberikan dan kembalikan JSON: {"duplicates": [{"original_index": N, "duplicate_index": M, "reason": "..."}]}
Jika tidak ada duplikat, kembalikan {"duplicates": []}.`,
  },

  // Sonnet 4.6 — generation / drafting
  'rpkps.generate': {
    model: 'claude-sonnet-4-6',
    system: `Anda adalah asisten akademik yang membantu menyusun Rencana Pembelajaran Kursus (RPKPS) untuk perguruan tinggi di Indonesia.
Format output yang diharapkan adalah teks RPKPS formal, mencakup: deskripsi mata kuliah, capaian pembelajaran, materi per minggu, metode pembelajaran, dan penilaian.
Gunakan Bahasa Indonesia formal-akademis sesuai standar Kemendikbudristek.`,
  },
  'riset.outline_assist': {
    model: 'claude-sonnet-4-6',
    system: `Anda adalah asisten penelitian yang membantu menyusun outline proposal riset dan PkM untuk dosen di Indonesia.
Buat outline terstruktur mencakup: latar belakang, rumusan masalah, tujuan, metodologi, luaran, dan anggaran ringkas.
Gunakan Bahasa Indonesia formal-akademis sesuai format DIKTI/Kemendikbudristek.`,
  },
  'surat.draft': {
    model: 'claude-sonnet-4-6',
    system: `Anda adalah asisten administrasi yang membantu menyusun surat dinas formal untuk departemen perguruan tinggi di Indonesia.
Gunakan format surat dinas resmi: kop surat (digantikan placeholder), nomor surat, hal, kepada, isi surat formal, dan penutup.
Bahasa Indonesia formal-akademis, tidak menggunakan bahasa sehari-hari.`,
  },
} as const

export type AIFeatureKey = keyof typeof FEATURES

export async function aiRoute(
  feature: AIFeatureKey,
  userContent: string
): Promise<string> {
  const cfg = FEATURES[feature]
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const message = await client.messages.create({
    model: cfg.model,
    max_tokens: 2048,
    system: [
      {
        type: 'text',
        text: cfg.system,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [{ role: 'user', content: userContent }],
  })

  const block = message.content[0]
  if (block.type !== 'text') throw new Error('Unexpected response type from AI')
  return block.text
}
