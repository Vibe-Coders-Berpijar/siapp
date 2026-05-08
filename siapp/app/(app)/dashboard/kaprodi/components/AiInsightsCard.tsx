'use client';

const INSIGHTS: Record<string, { icon: string; severity: string; cls: string; text: string }[]> = {
  semua: [
    { icon: '⚠', severity: 'Perhatian', cls: 'bg-red-100 text-red-700', text: '23 mahasiswa berisiko tidak lulus tepat waktu — 18 di S1, 5 di S2.' },
    { icon: '↑', severity: 'Positif', cls: 'bg-green-100 text-green-700', text: 'Rata-rata IPK semester ini naik 0.08 poin menjadi 3.42 — tren positif 3 semester berturut-turut.' },
    { icon: '📋', severity: 'Tindakan', cls: 'bg-amber-100 text-amber-700', text: 'Kurikulum 2023 Prodi S1 masih memiliki 3 RPKPS yang belum final sebelum sidang.' },
  ],
  S1: [
    { icon: '⚠', severity: 'Perhatian', cls: 'bg-red-100 text-red-700', text: '18 mahasiswa S1 dengan IPK di bawah 2.75 — perlu intervensi akademik segera.' },
    { icon: '↑', severity: 'Positif', cls: 'bg-green-100 text-green-700', text: 'Tingkat kelulusan tepat waktu S1 mencapai 78% — meningkat 5% dari tahun lalu.' },
    { icon: '📋', severity: 'Tindakan', cls: 'bg-amber-100 text-amber-700', text: '3 RPKPS S1 belum disetujui Kaprodi. Semester baru dimulai 3 minggu lagi.' },
  ],
  S2: [
    { icon: '⚠', severity: 'Perhatian', cls: 'bg-red-100 text-red-700', text: '5 mahasiswa S2 melewati batas 4 semester tanpa pengajuan judul tesis.' },
    { icon: '↑', severity: 'Positif', cls: 'bg-green-100 text-green-700', text: 'Rata-rata IPK S2 semester ini 3.68 — tertinggi dalam 3 tahun terakhir.' },
    { icon: '📋', severity: 'Tindakan', cls: 'bg-amber-100 text-amber-700', text: '2 mahasiswa S2 belum memiliki dosen pembimbing tesis yang terkonfirmasi.' },
  ],
  S3: [
    { icon: '⚠', severity: 'Perhatian', cls: 'bg-red-100 text-red-700', text: '1 mahasiswa S3 sudah memasuki tahun ke-6 — risiko pelampauan batas studi.' },
    { icon: '↑', severity: 'Positif', cls: 'bg-green-100 text-green-700', text: '2 disertasi S3 berhasil dipublikasikan di jurnal Q1 sebelum sidang — pencapaian terbaik.' },
    { icon: '📋', severity: 'Tindakan', cls: 'bg-amber-100 text-amber-700', text: 'Jadwal seminar proposal S3 angkatan 2023 belum dikonfirmasi ke Sekretariat.' },
  ],
};

export function AiInsightsCard({ prodi }: { prodi: string }) {
  const insights = INSIGHTS[prodi] ?? INSIGHTS.semua;

  return (
    <div className="rounded-2xl border border-amber-200/60 bg-amber-50/60 backdrop-blur-xl shadow p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-amber-900">✦ Analitik AI — {prodi === 'semua' ? 'Semua Prodi' : `Prodi ${prodi}`}</h2>
        <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
          Mock Phase 1
        </span>
      </div>
      <div className="space-y-3">
        {insights.map((s, i) => (
          <div key={i} className="flex items-start gap-3 bg-white/70 rounded-xl border border-amber-100 p-3">
            <span className="text-base mt-0.5">{s.icon}</span>
            <div className="flex-1 min-w-0">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.cls} mb-1 inline-block`}>
                {s.severity}
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
      {/* TODO: replace with aiRoute('kaprodi.dashboard_insights') in Phase 2 */}
      <p className="text-[11px] text-amber-600 mt-3">Data per 8 Mei 2026 · Dihasilkan dari data mock</p>
    </div>
  );
}
