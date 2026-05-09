'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { calendarEvents, CalendarEvent } from '@/lib/seed';

const TIPE_STYLE: Record<CalendarEvent['tipe'], { label: string; dot: string; badge: string }> = {
  rapat:        { label: 'Rapat',        dot: 'bg-blue-400',   badge: 'bg-blue-400/20 text-blue-300 border-blue-400/30' },
  seminar:      { label: 'Seminar',      dot: 'bg-violet-400', badge: 'bg-violet-400/20 text-violet-300 border-violet-400/30' },
  kuliah_umum:  { label: 'Kuliah Umum', dot: 'bg-amber-400',  badge: 'bg-amber-400/20 text-amber-300 border-amber-400/30' },
  akreditasi:   { label: 'Akreditasi',  dot: 'bg-red-400',    badge: 'bg-red-400/20 text-red-300 border-red-400/30' },
  lainnya:      { label: 'Lainnya',     dot: 'bg-white/40',   badge: 'bg-white/10 text-white/50 border-white/20' },
};

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// Parse "YYYY-MM-DD" as local midnight (avoids UTC-offset shift)
function parseLocalDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function eventSpansDay(ev: CalendarEvent, d: Date): boolean {
  const start = parseLocalDate(ev.tanggal);
  const end = ev.tanggalAkhir ? parseLocalDate(ev.tanggalAkhir) : start;
  return d >= start && d <= end;
}

export function HomeCalendar() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  function eventsOnDay(d: Date) {
    return calendarEvents.filter(ev => eventSpansDay(ev, d));
  }

  const selectedEvents = selected ? eventsOnDay(selected) : [];

  // Upcoming: events whose end date >= today (include ongoing multi-day events)
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const upcoming = calendarEvents
    .filter(ev => {
      const end = ev.tanggalAkhir ? parseLocalDate(ev.tanggalAkhir) : parseLocalDate(ev.tanggal);
      return end >= todayMidnight;
    })
    .sort((a, b) => parseLocalDate(a.tanggal).getTime() - parseLocalDate(b.tanggal).getTime())
    .slice(0, 8);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Mini month grid */}
      <div className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl p-4">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <p className="text-sm font-semibold text-white">{MONTHS[month]} {year}</p>
          <button
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d => (
            <div key={d} className="text-center text-[10px] font-medium text-white/30 py-1">{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-y-0.5">
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const evs = eventsOnDay(d);
            const isToday = isSameDay(d, today);
            const isSelected = selected && isSameDay(d, selected);
            return (
              <button
                key={i}
                onClick={() => setSelected(d)}
                className={`relative flex flex-col items-center py-1 rounded-lg transition-colors ${
                  isSelected
                    ? 'bg-[#FFCA40]/25 text-[#FFCA40]'
                    : isToday
                    ? 'bg-white/15 text-white'
                    : 'hover:bg-white/8 text-white/60'
                }`}
              >
                <span className={`text-xs font-medium ${isToday && !isSelected ? 'font-bold' : ''}`}>
                  {d.getDate()}
                </span>
                {evs.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {evs.slice(0, 3).map((ev, j) => (
                      <span key={j} className={`w-1 h-1 rounded-full ${TIPE_STYLE[ev.tipe].dot}`} />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected day events */}
      {selected && (
        <div className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl p-4">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-3">
            {selected.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          {selectedEvents.length === 0 ? (
            <p className="text-sm text-white/25 text-center py-3">Tidak ada acara</p>
          ) : (
            <div className="space-y-2">
              {selectedEvents.map(ev => (
                <div key={ev.id} className="flex gap-3 items-start">
                  <div className={`w-1.5 rounded-full mt-1.5 self-stretch ${TIPE_STYLE[ev.tipe].dot}`} style={{ minHeight: 12 }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/85 font-medium leading-snug">{ev.judul}</p>
                    <div className="flex flex-wrap gap-2 mt-1 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />{ev.waktuMulai}–{ev.waktuSelesai}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{ev.lokasi}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${TIPE_STYLE[ev.tipe].badge}`}>
                    {TIPE_STYLE[ev.tipe].label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upcoming events */}
      <div className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl p-4">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-3">Agenda Mendatang</p>
        <div className="space-y-2">
          {upcoming.map(ev => {
            const d = parseLocalDate(ev.tanggal);
            const isEvToday = isSameDay(d, today);
            return (
              <button
                key={ev.id}
                onClick={() => { setSelected(d); setViewDate(new Date(d.getFullYear(), d.getMonth(), 1)); }}
                className="w-full flex gap-3 items-start text-left hover:bg-white/5 rounded-xl px-2 py-1.5 -mx-2 transition-colors group"
              >
                <div className="flex-shrink-0 w-8 text-center">
                  <p className="text-xs font-bold text-white/60 group-hover:text-white/80 leading-none">
                    {d.toLocaleDateString('id-ID', { day: '2-digit' })}
                  </p>
                  <p className="text-[9px] text-white/30 uppercase leading-tight">
                    {d.toLocaleDateString('id-ID', { month: 'short' })}
                  </p>
                </div>
                <div className={`w-0.5 self-stretch rounded-full flex-shrink-0 ${TIPE_STYLE[ev.tipe].dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/75 font-medium truncate leading-snug">{ev.judul}</p>
                  <p className="text-[10px] text-white/35 truncate">{ev.waktuMulai} · {ev.lokasi}</p>
                </div>
                {isEvToday && (
                  <span className="text-[9px] font-bold text-[#FFCA40] flex-shrink-0 mt-0.5">Hari ini</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
