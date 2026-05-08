"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, MapPin, Clock } from "lucide-react";
import { calendarEvents, CalendarEvent } from "@/lib/seed";

const TYPE_COLORS: Record<CalendarEvent["tipe"], string> = {
  rapat:        "bg-blue-500/80",
  seminar:      "bg-purple-500/80",
  kuliah_umum:  "bg-emerald-500/80",
  akreditasi:   "bg-amber-500/80",
  lainnya:      "bg-white/40",
};

const TYPE_LABELS: Record<CalendarEvent["tipe"], string> = {
  rapat:        "Rapat",
  seminar:      "Seminar",
  kuliah_umum:  "Kuliah Umum",
  akreditasi:   "Akreditasi",
  lainnya:      "Lainnya",
};

const MONTHS = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const DAYS   = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];

export default function KalenderPage() {
  const [year,  setYear]  = useState(2026);
  const [month, setMonth] = useState(4); // 0-indexed, 4 = Mei
  const [selected, setSelected] = useState<CalendarEvent | null>(null);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsInMonth = calendarEvents.filter(e => {
    const d = new Date(e.tanggal);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  const getEventsForDay = (day: number) =>
    eventsInMonth.filter(e => new Date(e.tanggal).getDate() === day);

  const today = new Date("2026-05-08");
  const isToday = (day: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Kalender Kegiatan</h1>
          <p className="text-sm text-white/40 mt-1">Jadwal kegiatan departemen.</p>
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-3">
          {(Object.entries(TYPE_LABELS) as [CalendarEvent["tipe"], string][]).map(([t, l]) => (
            <div key={t} className="flex items-center gap-1.5 text-xs text-white/50">
              <span className={`w-2.5 h-2.5 rounded-sm ${TYPE_COLORS[t]}`} />
              {l}
            </div>
          ))}
        </div>
      </div>

      {/* Month navigator */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <button onClick={prevMonth} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <p className="font-semibold text-white">{MONTHS[month]} {year}</p>
          <button onClick={nextMonth} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-white/10">
          {DAYS.map(d => (
            <div key={d} className="px-2 py-2.5 text-center text-xs font-semibold text-white/30 uppercase tracking-wide">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const events = day ? getEventsForDay(day) : [];
            const isWeekend = i % 7 === 0 || i % 7 === 6;
            return (
              <div
                key={i}
                className={`min-h-[100px] p-2 border-b border-r border-white/5 last:border-r-0 ${
                  isWeekend ? "bg-white/2" : ""
                } ${day ? "hover:bg-white/5 transition-colors" : "opacity-40"}`}
              >
                {day && (
                  <>
                    <span className={`text-xs font-medium inline-flex w-6 h-6 items-center justify-center rounded-full ${
                      isToday(day)
                        ? "bg-ugm-gold text-ugm-blue-dark font-bold"
                        : "text-white/50"
                    }`}>
                      {day}
                    </span>
                    <div className="mt-1 space-y-0.5">
                      {events.slice(0, 3).map(e => (
                        <button
                          key={e.id}
                          onClick={() => setSelected(e)}
                          className={`w-full text-left text-[10px] text-white font-medium px-1.5 py-0.5 rounded-md truncate ${TYPE_COLORS[e.tipe]} hover:opacity-90 transition-opacity`}
                        >
                          {e.judul}
                        </button>
                      ))}
                      {events.length > 3 && (
                        <p className="text-[10px] text-white/30 px-1">+{events.length - 3} lagi</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming events list */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10">
          <p className="text-sm font-semibold text-white">Semua Kegiatan — {MONTHS[month]} {year}</p>
        </div>
        {eventsInMonth.length === 0 ? (
          <p className="px-5 py-8 text-sm text-white/30 text-center">Tidak ada kegiatan bulan ini.</p>
        ) : (
          <div className="divide-y divide-white/5">
            {eventsInMonth
              .sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime())
              .map(e => (
                <div key={e.id} className="px-5 py-3.5 flex items-start gap-4 hover:bg-white/5 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${TYPE_COLORS[e.tipe]}`} />
                  <div className="w-14 flex-shrink-0">
                    <p className="text-xs font-bold text-white">{new Date(e.tanggal).getDate()}</p>
                    <p className="text-[10px] text-white/30">{MONTHS[new Date(e.tanggal).getMonth()]}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/90">{e.judul}</p>
                    <div className="flex flex-wrap gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-white/40">
                        <Clock className="w-3 h-3" />
                        {e.waktuMulai}–{e.waktuSelesai}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-white/40">
                        <MapPin className="w-3 h-3" />
                        {e.lokasi}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] text-white px-2 py-0.5 rounded-full ${TYPE_COLORS[e.tipe]}`}>
                    {TYPE_LABELS[e.tipe]}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Event detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass rounded-2xl border border-white/14 w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-sm ${TYPE_COLORS[selected.tipe]}`} />
                <p className="font-semibold text-white text-sm">{TYPE_LABELS[selected.tipe]}</p>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/50">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">{selected.judul}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex gap-3">
                  <span className="text-white/40 w-20 flex-shrink-0">Tanggal</span>
                  <span className="text-white/80">
                    {new Date(selected.tanggal).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-white/40 w-20 flex-shrink-0">Waktu</span>
                  <span className="text-white/80">{selected.waktuMulai} – {selected.waktuSelesai} WIB</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-white/40 w-20 flex-shrink-0">Lokasi</span>
                  <span className="text-white/80">{selected.lokasi}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-white/40 w-20 flex-shrink-0">Penyelenggara</span>
                  <span className="text-white/80">{selected.penyelenggara}</span>
                </div>
                {selected.deskripsi && (
                  <div className="flex gap-3">
                    <span className="text-white/40 w-20 flex-shrink-0">Deskripsi</span>
                    <span className="text-white/70 text-xs">{selected.deskripsi}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
