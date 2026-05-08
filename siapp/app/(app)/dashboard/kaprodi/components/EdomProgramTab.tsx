'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';

interface EdomMK {
  mk: string;
  dosen: string;
  skor: number;
  prodi: string;
}

const MOCK_EDOM: EdomMK[] = [
  { mk: 'Teori Politik Kontemporer',     dosen: 'Prof. Bambang Wicaksono', skor: 4.6, prodi: 'S1' },
  { mk: 'Metode Penelitian Kualitatif',  dosen: 'Dr. Fitri Handayani',     skor: 4.5, prodi: 'S2' },
  { mk: 'Tata Kelola Digital',           dosen: 'Dr. Reza Pratama',        skor: 4.4, prodi: 'S1' },
  { mk: 'Sistem Politik Indonesia',      dosen: 'Dr. Siti Nuraini',        skor: 4.2, prodi: 'S1' },
  { mk: 'Pengantar Ilmu Politik',        dosen: 'Dr. Ahmad Fauzi',         skor: 4.1, prodi: 'S1' },
  { mk: 'Politik Komparatif',            dosen: 'Prof. Hery Santoso',      skor: 3.9, prodi: 'S1' },
  { mk: 'Seminar Disertasi',             dosen: 'Prof. Bambang Wicaksono', skor: 3.8, prodi: 'S3' },
  { mk: 'Metodologi Penelitian Politik', dosen: 'Dr. Maya Indira',         skor: 3.7, prodi: 'S1' },
  { mk: 'Kebijakan Publik',              dosen: 'Dr. Ratih Dewi Kusuma',   skor: 3.5, prodi: 'S1' },
];

const DOSEN_SUMMARY = [
  { nama: 'Prof. Bambang Wicaksono', inisial: 'BW', skor: 4.2, materi: 4.5, metode: 4.0, interaksi: 4.1, trend: 'up' as const },
  { nama: 'Dr. Ahmad Fauzi',         inisial: 'AF', skor: 4.1, materi: 4.2, metode: 3.9, interaksi: 4.2, trend: 'up' as const },
  { nama: 'Dr. Ratih Dewi Kusuma',   inisial: 'RD', skor: 3.7, materi: 3.8, metode: 3.6, interaksi: 3.7, trend: 'down' as const },
  { nama: 'Prof. Hery Santoso',      inisial: 'HS', skor: 4.0, materi: 4.1, metode: 4.0, interaksi: 3.9, trend: 'up' as const },
];

function scoreColor(s: number) {
  if (s >= 4.0) return '#4f46e5';
  if (s >= 3.5) return '#f59e0b';
  return '#ef4444';
}

function MiniBar({ label, value }: { label: string; value: number }) {
  const pct = (value / 5) * 100;
  const color = value >= 4.0 ? 'bg-indigo-500' : value >= 3.5 ? 'bg-amber-400' : 'bg-red-400';
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-16 text-gray-500 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-6 text-right font-medium text-gray-700">{value.toFixed(1)}</span>
    </div>
  );
}

export function EdomProgramTab({ prodi }: { prodi: string }) {
  const filtered = MOCK_EDOM
    .filter((e) => prodi === 'semua' || e.prodi === prodi)
    .sort((a, b) => b.skor - a.skor);

  const avg = filtered.length
    ? (filtered.reduce((s, e) => s + e.skor, 0) / filtered.length).toFixed(2)
    : '—';

  return (
    <div className="space-y-5">
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{avg}</p>
          <p className="text-xs text-gray-500 mt-1">Rata-rata EDOM</p>
        </div>
        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
          <p className="text-xs text-gray-500 mt-1">MK Dievaluasi</p>
        </div>
        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">892</p>
          <p className="text-xs text-gray-500 mt-1">Total Responden</p>
        </div>
      </div>

      {/* Bar chart per MK */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800">Skor EDOM per Mata Kuliah</h2>
          <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800">
            Unduh Laporan →
          </button>
        </div>
        <ResponsiveContainer width="100%" height={filtered.length * 36 + 40}>
          <BarChart
            data={filtered}
            layout="vertical"
            margin={{ top: 0, right: 40, left: 8, bottom: 0 }}
            barSize={18}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
            <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="mk"
              tick={{ fontSize: 11, fill: '#4b5563' }}
              width={200}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
              formatter={(v) => [`${v} / 5.0`, 'Skor EDOM']}
            />
            <Bar dataKey="skor" radius={[0, 4, 4, 0]}>
              {filtered.map((entry) => (
                <Cell key={entry.mk} fill={scoreColor(entry.skor)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Per-dosen cards */}
      <div>
        <h2 className="text-sm font-semibold text-gray-800 mb-3">Ringkasan per Dosen</h2>
        <div className="grid grid-cols-2 gap-4">
          {DOSEN_SUMMARY.map((d) => (
            <div key={d.nama} className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#231F54] text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {d.inisial}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{d.nama}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-base font-bold ${d.skor >= 4.0 ? 'text-indigo-600' : 'text-amber-600'}`}>
                      {d.skor.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-400">/ 5.0</span>
                    <span className={`text-xs font-semibold ml-1 ${d.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                      {d.trend === 'up' ? '↑' : '↓'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <MiniBar label="Materi" value={d.materi} />
                <MiniBar label="Metode" value={d.metode} />
                <MiniBar label="Interaksi" value={d.interaksi} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
