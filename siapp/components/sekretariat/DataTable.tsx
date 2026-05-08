"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T extends object> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  emptyMessage?: string;
}

type SortDir = "asc" | "desc" | null;

export function DataTable<T extends object>({
  columns,
  data,
  className,
  emptyMessage = "Tidak ada data",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  const handleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else if (sortDir === "desc") {
      setSortKey(null);
      setSortDir(null);
    } else {
      setSortDir("asc");
    }
  };

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      if (av === bv) return 0;
      const cmp = String(av).localeCompare(String(bv), "id", { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sortKey !== colKey) return <ChevronsUpDown className="w-3 h-3 text-white/25" />;
    if (sortDir === "asc") return <ChevronUp className="w-3 h-3 text-ugm-gold" />;
    return <ChevronDown className="w-3 h-3 text-ugm-gold" />;
  };

  return (
    <div className={cn("glass rounded-2xl overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  onClick={() => col.sortable && handleSort(String(col.key))}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wide whitespace-nowrap",
                    col.sortable && "cursor-pointer hover:text-white/80 select-none",
                    col.className
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && <SortIcon colKey={String(col.key)} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-white/30 text-sm"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sorted.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                >
                  {columns.map(col => {
                    const val = (row as Record<string, unknown>)[String(col.key)];
                    return (
                      <td
                        key={String(col.key)}
                        className={cn("px-4 py-3 text-white/80", col.className)}
                      >
                        {col.render ? col.render(val, row) : String(val ?? "")}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
