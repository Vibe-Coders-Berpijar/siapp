import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

const colorMap: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  belum: 'bg-gray-100 text-gray-600',
  menunggu: 'bg-amber-100 text-amber-800',
  pending: 'bg-amber-100 text-amber-800',
  aktif: 'bg-green-100 text-green-800',
  selesai: 'bg-green-100 text-green-800',
  ditandatangani: 'bg-green-100 text-green-800',
  disetujui: 'bg-green-100 text-green-800',
  ditolak: 'bg-red-100 text-red-800',
  diarsip: 'bg-blue-100 text-blue-800',
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const key = status.toLowerCase();
  const color = colorMap[key] ?? 'bg-gray-100 text-gray-600';
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium capitalize',
        color,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      )}
    >
      {status}
    </span>
  );
}
