import Anthropic from '@anthropic-ai/sdk'

const FEATURES = {
  // Haiku 4.5 — fast classification / lookup
  'kurikulum.status_check': {
    model: 'claude-haiku-4-5',
    system: `Anda adalah asisten akademik untuk program studi di Indonesia.
Analisis status kurikulum yang diberikan dan berikan ringkasan singkat beserta rekomendasi prioritas.
Gunakan Bahasa Indonesia formal-akademis. Hanya kembalikan teks ringkasan, tidak ada format JSON.`,
  },

  // Sonnet 4.6 — conversational Q&A with context
  'kaprodi.qa': {
    model: 'claude-sonnet-4-6',
    system: `Anda adalah asisten AI cerdas untuk Ketua Program Studi (Kaprodi) di Departemen Politik dan Pemerintahan Universitas Gadjah Mada (DPP UGM).

Konteks program studi:
- Program S1, S2, dan S3 Politik dan Pemerintahan
- Dosen aktif: Prof. Hery Santoso, Dr. Ratih Dewi Kusuma, Dr. Ahmad Fauzi, Dr. Siti Nuraini, Prof. Bambang Wicaksono, Dr. Maya Indira, Dr. Reza Pratama, Dr. Fitri Handayani
- Akreditasi BAN-PT: coverage keseluruhan ~74%, Kriteria 5 (Kurikulum) paling perlu perhatian
- Sistem informasi: SIAPP (SIMASTER, e-learning, RPKPS, hibah, publikasi terintegrasi)

Tugas Anda: menjawab pertanyaan Kaprodi tentang data akademik, status akreditasi, kinerja mahasiswa, dosen, kurikulum, dan penelitian. Berikan jawaban yang ringkas, spesifik, dan berbasis data. Bila data real-time tidak tersedia, berikan panduan analitik.
Gunakan Bahasa Indonesia formal-akademis.`,
  },
} as const

export type AIFeatureKey = keyof typeof FEATURES

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function aiRoute(feature: AIFeatureKey, userContent: string): Promise<string>
export async function aiRoute(
  feature: 'kaprodi.qa',
  userContent: string,
  history?: ChatMessage[]
): Promise<string>
export async function aiRoute(
  feature: AIFeatureKey,
  userContent: string,
  history?: ChatMessage[]
): Promise<string> {
  const cfg = FEATURES[feature]
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const messages: Anthropic.MessageParam[] = [
    ...(history ?? []).map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    { role: 'user', content: userContent },
  ]

  const message = await client.messages.create({
    model: cfg.model,
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: cfg.system,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages,
  })

  const block = message.content[0]
  if (block.type !== 'text') throw new Error('Unexpected response type from AI')
  return block.text
}
