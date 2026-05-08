'use client';

import { useState } from 'react';

interface Source {
  type: string;
  excerpt: string;
}

interface AiDraftBannerProps {
  confidence: number;
  sources?: Source[];
  rationale?: string;
  onAccept: () => Promise<void> | void;
  onReject: () => void;
  loading?: boolean;
}

function ConfidenceBadge({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const config =
    score >= 0.8
      ? { label: 'Tinggi', cls: 'bg-green-100 text-green-700' }
      : score >= 0.5
      ? { label: 'Sedang', cls: 'bg-amber-100 text-amber-700' }
      : { label: 'Rendah', cls: 'bg-red-100 text-red-700' };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${config.cls}`}>
      {pct}% · {config.label}
    </span>
  );
}

export function AiDraftBanner({
  confidence,
  sources = [],
  rationale,
  onAccept,
  onReject,
  loading = false,
}: AiDraftBannerProps) {
  const [accepting, setAccepting] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  async function handleAccept() {
    setAccepting(true);
    try {
      await onAccept();
    } finally {
      setAccepting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-amber-300/60 bg-amber-50/70 backdrop-blur-xl shadow p-4 space-y-3">
      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
            ✦ Draft AI
          </span>
          <ConfidenceBadge score={confidence} />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReject}
            disabled={accepting || loading}
            className="text-xs font-medium text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Tolak
          </button>
          <button
            onClick={handleAccept}
            disabled={accepting || loading}
            className="text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1.5"
          >
            {accepting ? (
              <>
                <span className="inline-block h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Menyimpan…
              </>
            ) : (
              'Terima'
            )}
          </button>
        </div>
      </div>

      {/* Rationale */}
      {rationale && (
        <p className="text-xs text-amber-800 leading-relaxed">{rationale}</p>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <div>
          <button
            onClick={() => setSourcesOpen((o) => !o)}
            className="text-[11px] text-amber-700 hover:text-amber-900 font-medium"
          >
            {sourcesOpen ? '▾' : '▸'} {sources.length} sumber referensi
          </button>
          {sourcesOpen && (
            <ul className="mt-2 space-y-1">
              {sources.map((s, i) => (
                <li key={i} className="text-[11px] text-amber-700 bg-amber-100/60 rounded-lg px-3 py-1.5">
                  <span className="font-semibold capitalize">{s.type}</span>
                  {s.excerpt && <span className="text-amber-600"> · {s.excerpt}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
