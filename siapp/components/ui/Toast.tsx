"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastItem {
  id: number;
  message: string;
  type: "success" | "info";
}

let _nextId = 0;

export function Toast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { message, type } = (e as CustomEvent<{ message: string; type: "success" | "info" }>).detail;
      const id = ++_nextId;
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 4000);
    };
    window.addEventListener("show-toast", handler);
    return () => window.removeEventListener("show-toast", handler);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium max-w-sm backdrop-blur-sm pointer-events-auto",
            t.type === "success"
              ? "bg-emerald-950/90 border border-emerald-500/30 text-emerald-200"
              : "bg-blue-950/90 border border-blue-500/30 text-blue-200"
          )}
        >
          {t.type === "success"
            ? <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            : <Info className="w-4 h-4 flex-shrink-0 text-blue-400" />
          }
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
            className="opacity-50 hover:opacity-100 transition-opacity"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
