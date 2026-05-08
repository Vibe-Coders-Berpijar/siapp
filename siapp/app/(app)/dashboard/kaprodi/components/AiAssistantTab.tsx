'use client';

import { useState, useRef, useEffect } from 'react';
import { mockAIStream } from '@/lib/mock-ai';

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}

function getTimestamp() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function generateAnswer(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes('ipk') || lower.includes('indeks prestasi')) {
    return 'Rata-rata IPK mahasiswa S1 semester ini adalah 3.38, naik dari 3.32 semester lalu. Untuk S2 mencapai 3.68 — tertinggi dalam 3 tahun terakhir. Terdapat 23 mahasiswa dengan IPK di bawah 2.75 yang perlu perhatian khusus.';
  }
  if (lower.includes('akreditasi') || lower.includes('ban-pt') || lower.includes('led')) {
    return 'Coverage akreditasi keseluruhan saat ini 74% untuk Kriteria 5 (Kurikulum). Sub-kriteria yang paling perlu perhatian adalah Integrasi Penelitian (55%) dan RPKPS (61%). Disarankan menyelesaikan 3 RPKPS yang masih Draft sebelum visitasi.';
  }
  if (lower.includes('mahasiswa') || lower.includes('at-risk') || lower.includes('risiko')) {
    return 'Terdapat 23 mahasiswa at-risk: 18 di S1 dengan IPK < 2.75, 5 di S2 yang melampaui batas semester normal. 1 mahasiswa S3 sudah memasuki tahun ke-6. Disarankan segera mengirim peringatan akademik ke mahasiswa angkatan 2020 yang belum menyelesaikan skripsi.';
  }
  if (lower.includes('edom') || lower.includes('evaluasi dosen')) {
    return 'Rata-rata skor EDOM program adalah 4.0 dari 5.0. Prof. Bambang Wicaksono memperoleh skor tertinggi (4.6). Mata kuliah Kebijakan Publik mendapat skor terendah (3.5) — perlu evaluasi metode pengajaran untuk semester berikutnya.';
  }
  if (lower.includes('kurikulum') || lower.includes('rpkps') || lower.includes('silabus')) {
    return 'Dari 12 mata kuliah aktif, 5 sudah memiliki RPKPS berstatus Disetujui, 2 masih Menunggu, 3 berstatus Draft, dan 2 belum ada RPKPS sama sekali. POL4101 dan POL3201 perlu segera difinalkan sebelum semester baru dimulai.';
  }
  if (lower.includes('lulusan') || lower.includes('kelulusan') || lower.includes('wisuda')) {
    return 'Tahun 2025 tercatat 151 lulusan: 110 dari S1, 30 dari S2, dan 11 dari S3. Tingkat kelulusan tepat waktu S1 mencapai 78% — meningkat 5% dibanding tahun lalu. Rata-rata masa studi S1 adalah 4.2 tahun.';
  }
  if (lower.includes('hibah') || lower.includes('penelitian') || lower.includes('riset')) {
    return 'Departemen memiliki 3 hibah aktif senilai total Rp 780 juta (BRIN, Kemendagri, LPDP). Prof. Hery Santoso dan Prof. Bambang Wicaksono masing-masing mengelola hibah dengan nilai terbesar. 5 publikasi Q1 berhasil dihasilkan dari hibah yang berjalan.';
  }
  return 'Saya dapat membantu Anda menganalisis data program studi. Coba tanyakan tentang IPK mahasiswa, status akreditasi, mahasiswa at-risk, skor EDOM, kurikulum dan RPKPS, atau data kelulusan.';
}

const SUGGESTED = [
  'Berapa rata-rata IPK mahasiswa saat ini?',
  'Bagaimana status akreditasi Kriteria 5?',
  'Siapa mahasiswa yang paling berisiko?',
  'Bagaimana skor EDOM program?',
];

export function AiAssistantTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: 'Halo! Saya asisten AI SIAPP. Saya dapat membantu Anda menganalisis data program studi — IPK, akreditasi, mahasiswa at-risk, EDOM, kurikulum, dan kelulusan. Apa yang ingin Anda ketahui?',
      timestamp: getTimestamp(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(text?: string) {
    const q = (text ?? input).trim();
    if (!q || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: q, timestamp: getTimestamp() }]);
    setLoading(true);

    // TODO: replace with aiRoute('kaprodi.qa') in Phase 2
    const answer = await mockAIStream(generateAnswer(q), 1400);

    setMessages((prev) => [...prev, { role: 'ai', content: answer, timestamp: getTimestamp() }]);
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {/* Chat panel */}
      <div className="col-span-2 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow flex flex-col" style={{ height: '560px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-base">✦</span>
            <span className="text-sm font-semibold text-gray-800">AI Asisten Kaprodi</span>
            <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
              Mock Phase 1
            </span>
          </div>
          <button
            onClick={() => setMessages([{
              role: 'ai',
              content: 'Riwayat percakapan dihapus. Ada yang bisa saya bantu?',
              timestamp: getTimestamp(),
            }])}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Hapus Riwayat
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[#231F54] text-white rounded-br-sm'
                  : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm'
              }`}>
                <p>{m.content}</p>
                <p className={`text-[10px] mt-1 ${m.role === 'user' ? 'text-white/60 text-right' : 'text-gray-400'}`}>
                  {m.timestamp}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Tanyakan tentang data program studi..."
              className="flex-1 text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white/80"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 bg-[#231F54] text-white rounded-xl text-sm font-semibold hover:bg-indigo-900 disabled:opacity-40 transition-colors"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>

      {/* Suggested questions */}
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-4">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Pertanyaan Umum</h3>
          <div className="space-y-2">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                disabled={loading}
                className="w-full text-left text-sm text-gray-700 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-700 px-3 py-2.5 rounded-xl border border-gray-100 hover:border-indigo-200 transition-all disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200/60 bg-amber-50/60 backdrop-blur-xl shadow p-4">
          <p className="text-xs text-amber-700 leading-relaxed">
            <strong>Catatan Phase 1:</strong> Jawaban dihasilkan dari data mock. Di Phase 2, AI akan menjawab berdasarkan data real-time dari database.
          </p>
          {/* TODO: replace with aiRoute('kaprodi.qa') in Phase 2 */}
        </div>
      </div>
    </div>
  );
}
