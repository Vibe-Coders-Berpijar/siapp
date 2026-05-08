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

const ALL_DATA = [
  { bin: '2.0–2.5', count: 8 },
  { bin: '2.5–3.0', count: 21 },
  { bin: '3.0–3.25', count: 47 },
  { bin: '3.25–3.5', count: 89 },
  { bin: '3.5–3.75', count: 112 },
  { bin: '3.75–4.0', count: 73 },
];

const S1_DATA = [
  { bin: '2.0–2.5', count: 6 },
  { bin: '2.5–3.0', count: 16 },
  { bin: '3.0–3.25', count: 34 },
  { bin: '3.25–3.5', count: 68 },
  { bin: '3.5–3.75', count: 85 },
  { bin: '3.75–4.0', count: 55 },
];

const S2_DATA = [
  { bin: '2.0–2.5', count: 1 },
  { bin: '2.5–3.0', count: 4 },
  { bin: '3.0–3.25', count: 10 },
  { bin: '3.25–3.5', count: 18 },
  { bin: '3.5–3.75', count: 22 },
  { bin: '3.75–4.0', count: 15 },
];

const S3_DATA = [
  { bin: '2.0–2.5', count: 0 },
  { bin: '2.5–3.0', count: 1 },
  { bin: '3.0–3.25', count: 3 },
  { bin: '3.25–3.5', count: 8 },
  { bin: '3.5–3.75', count: 12 },
  { bin: '3.75–4.0', count: 8 },
];

const PRODI_DATA: Record<string, typeof ALL_DATA> = {
  semua: ALL_DATA,
  S1: S1_DATA,
  S2: S2_DATA,
  S3: S3_DATA,
};

function getBarColor(bin: string) {
  if (bin.startsWith('2.0') || bin.startsWith('2.5')) return '#ef4444';
  if (bin.startsWith('3.0')) return '#f59e0b';
  return '#4f46e5';
}

export function IpkDistributionChart({ prodi }: { prodi: string }) {
  const data = PRODI_DATA[prodi] ?? ALL_DATA;

  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-5 h-full">
      <h2 className="text-sm font-semibold text-gray-800 mb-1">Sebaran IPK Mahasiswa Aktif</h2>
      <p className="text-xs text-gray-400 mb-4">
        <span className="inline-block w-2 h-2 rounded-full bg-red-400 mr-1" />Risiko
        <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mx-1 ml-3" />Cukup
        <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mx-1 ml-3" />Baik
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="bin" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
            cursor={{ fill: 'rgba(0,0,0,0.04)' }}
            formatter={(v) => [`${v} mahasiswa`, 'Jumlah']}
          />
          <Bar dataKey="count" name="Mahasiswa" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.bin} fill={getBarColor(entry.bin)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
