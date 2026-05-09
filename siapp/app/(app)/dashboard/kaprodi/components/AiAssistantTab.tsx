'use client';

import { useState, useRef, useEffect } from 'react';
import { askKaprodiAI } from '../actions';
import type { ChatMessage } from '@/lib/ai/route';

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}

function getTimestamp() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
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

    try {
      const history: ChatMessage[] = messages
        .filter((m) => m.role !== 'ai' || messages.indexOf(m) > 0)
        .map((m) => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content }));
      const answer = await askKaprodiAI(q, history);
      setMessages((prev) => [...prev, { role: 'ai', content: answer, timestamp: getTimestamp() }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'ai', content: 'Maaf, terjadi kesalahan. Coba lagi dalam beberapa saat.', timestamp: getTimestamp() }]);
    } finally {
      setLoading(false);
    }
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
            <span className="text-[10px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
              Phase 2 · AI Aktif
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

        <div className="rounded-2xl border border-blue-200/60 bg-blue-50/60 backdrop-blur-xl shadow p-4">
          <p className="text-xs text-blue-700 leading-relaxed">
            <strong>AI Aktif:</strong> Dijawab oleh Claude Sonnet. Saat data real-time terhubung, jawaban akan semakin akurat dan spesifik.
          </p>
        </div>
      </div>
    </div>
  );
}
