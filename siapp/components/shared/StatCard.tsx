interface StatCardProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down';
  hint?: string;
}

export function StatCard({ label, value, trend, hint }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-6">
      <p className="text-[13px] text-gray-500 font-medium">{label}</p>
      <div className="mt-1 flex items-end gap-2">
        <span className="text-2xl font-medium text-gray-900">{value}</span>
        {trend && (
          <span className={trend === 'up' ? 'text-green-600 text-sm' : 'text-red-500 text-sm'}>
            {trend === 'up' ? '↑' : '↓'}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-[12px] text-gray-400">{hint}</p>}
    </div>
  );
}
