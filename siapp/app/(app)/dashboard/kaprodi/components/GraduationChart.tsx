'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const DATA = [
  { tahun: '2020', s1: 87, s2: 24, s3: 6 },
  { tahun: '2021', s1: 92, s2: 28, s3: 7 },
  { tahun: '2022', s1: 95, s2: 22, s3: 8 },
  { tahun: '2023', s1: 103, s2: 31, s3: 9 },
  { tahun: '2024', s1: 98, s2: 27, s3: 10 },
  { tahun: '2025', s1: 110, s2: 30, s3: 11 },
];

const DATA_S1 = DATA.map((d) => ({ ...d, s2: 0, s3: 0 }));
const DATA_S2 = DATA.map((d) => ({ ...d, s1: 0, s3: 0 }));
const DATA_S3 = DATA.map((d) => ({ ...d, s1: 0, s2: 0 }));

const PRODI_DATA: Record<string, typeof DATA> = {
  semua: DATA,
  S1: DATA_S1,
  S2: DATA_S2,
  S3: DATA_S3,
};

export function GraduationChart({ prodi }: { prodi: string }) {
  const chartData = PRODI_DATA[prodi] ?? DATA;

  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-5 h-full">
      <h2 className="text-sm font-semibold text-gray-800 mb-4">Tren Kelulusan per Angkatan</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="tahun" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
            cursor={{ fill: 'rgba(0,0,0,0.04)' }}
          />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          <Bar dataKey="s1" name="S1" stackId="a" fill="#4f46e5" radius={[0, 0, 0, 0]} />
          <Bar dataKey="s2" name="S2" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
          <Bar dataKey="s3" name="S3" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
