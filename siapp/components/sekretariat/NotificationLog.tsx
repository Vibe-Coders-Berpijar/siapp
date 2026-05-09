"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";

export function NotificationLog() {
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { message } = (e as CustomEvent<{ message: string }>).detail;
      setLog(prev => [
        `${new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} — ${message}`,
        ...prev.slice(0, 9),
      ]);
    };
    window.addEventListener("show-toast", handler);
    return () => window.removeEventListener("show-toast", handler);
  }, []);

  return (
    <div className="mx-3 mb-3 rounded-xl bg-white/3 border border-white/8 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/8">
        <Bell className="w-3 h-3 text-white/25" />
        <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest">Notifikasi Terkirim</p>
        {log.length > 0 && (
          <span className="ml-auto text-[9px] bg-ugm-gold/20 text-ugm-gold px-1.5 py-0.5 rounded-full font-bold">
            {log.length}
          </span>
        )}
      </div>
      <div className="px-3 py-2 space-y-1 max-h-28 overflow-y-auto">
        {log.length === 0 ? (
          <p className="text-[10px] text-white/20 italic">Belum ada notifikasi.</p>
        ) : (
          log.map((entry, i) => (
            <p key={i} className="text-[10px] text-white/40 leading-relaxed">{entry}</p>
          ))
        )}
      </div>
    </div>
  );
}
