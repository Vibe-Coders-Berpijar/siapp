'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, MapPin, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { calendarEvents, bookings as seedBookings, type CalendarEvent, type Booking, type BookingStatus } from '@/lib/seed';

// ── Constants ──────────────────────────────────────────────────────────────────

const ROOMS = [
  'Ruang Rapat Utama',
  'Ruang Rapat Kecil',
  'Aula Gedung A',
  'Lab Komputer',
  'Lab Tanah',
  'Ruang Kelas 201',
  'Ruang Kelas 202',
];

const MONTHS = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const DAYS   = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];

const TYPE_COLORS: Record<CalendarEvent['tipe'], string> = {
  rapat:       'bg-blue-100 text-blue-700',
  seminar:     'bg-purple-100 text-purple-700',
  kuliah_umum: 'bg-green-100 text-green-700',
  akreditasi:  'bg-amber-100 text-amber-700',
  lainnya:     'bg-gray-100 text-gray-600',
};

const TYPE_DOT: Record<CalendarEvent['tipe'], string> = {
  rapat:       'bg-blue-500',
  seminar:     'bg-purple-500',
  kuliah_umum: 'bg-green-500',
  akreditasi:  'bg-amber-500',
  lainnya:     'bg-gray-400',
};

const STATUS_COLORS: Record<BookingStatus, string> = {
  Dikonfirmasi: 'bg-green-100 text-green-700',
  Menunggu:     'bg-amber-100 text-amber-700',
  Ditolak:      'bg-red-100 text-red-600',
};

const DOSEN_NAME = 'Dr. Ahmad Fauzi';

function timeToMinutes(t: string) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function hasConflict(bookings: Booking[], ruangan: string, tanggal: string, mulai: string, selesai: string) {
  const s = timeToMinutes(mulai), e = timeToMinutes(selesai);
  return bookings.some(b => {
    if (b.ruangan !== ruangan || b.tanggal !== tanggal || b.status === 'Ditolak') return false;
    return s < timeToMinutes(b.waktuSelesai) && e > timeToMinutes(b.waktuMulai);
  });
}

// ── Calendar sub-component ─────────────────────────────────────────────────────

function KalenderView() {
  const now = new Date();
  const [year, setYear]   = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selected, setSelected] = useState<CalendarEvent | null>(null);

  const prev = () => month === 0 ? (setMonth(11), setYear(y => y - 1)) : setMonth(m => m - 1);
  const next = () => month === 11 ? (setMonth(0), setYear(y => y + 1)) : setMonth(m => m + 1);

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsInMonth = calendarEvents.filter(e => {
    const d = new Date(e.tanggal);
    return d.getFullYear() === year && d.getMonth() === month;
  });
  const eventsForDay = (day: number) => eventsInMonth.filter(e => new Date(e.tanggal).getDate() === day);
  const todayDate = new Date();
  const isToday = (day: number) =>
    todayDate.getFullYear() === year && todayDate.getMonth() === month && todayDate.getDate() === day;

  return (
    <div className="space-y-4">
      {/* Month nav */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <button onClick={prev} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <p className="font-semibold text-gray-900">{MONTHS[month]} {year}</p>
          <button onClick={next} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAYS.map(d => (
            <div key={d} className="py-2 text-center text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const events = day ? eventsForDay(day) : [];
            const weekend = i % 7 === 0 || i % 7 === 6;
            return (
              <div key={i} className={`min-h-[80px] p-1.5 border-b border-r border-gray-50 last:border-r-0 ${weekend ? 'bg-gray-50/50' : ''} ${day ? '' : 'opacity-30'}`}>
                {day && (
                  <>
                    <span className={`text-xs font-medium inline-flex w-6 h-6 items-center justify-center rounded-full ${isToday(day) ? 'bg-[#231F54] text-white font-bold' : 'text-gray-500'}`}>
                      {day}
                    </span>
                    <div className="mt-0.5 space-y-0.5">
                      {events.slice(0, 2).map(e => (
                        <button key={e.id} onClick={() => setSelected(e)}
                          className={`w-full text-left text-[9px] font-medium px-1 py-0.5 rounded truncate ${TYPE_COLORS[e.tipe]} hover:opacity-80 transition-opacity`}>
                          {e.judul}
                        </button>
                      ))}
                      {events.length > 2 && (
                        <p className="text-[9px] text-gray-400 px-1">+{events.length - 2}</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming this month */}
      {eventsInMonth.length > 0 && (
        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Kegiatan {MONTHS[month]}</p>
          </div>
          <div className="divide-y divide-gray-50">
            {eventsInMonth
              .sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime())
              .map(e => (
                <button key={e.id} onClick={() => setSelected(e)}
                  className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-white/80 transition-colors">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${TYPE_DOT[e.tipe]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{e.judul}</p>
                    <div className="flex gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />{new Date(e.tanggal).getDate()} {MONTHS[new Date(e.tanggal).getMonth()]} · {e.waktuMulai}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin className="w-3 h-3" />{e.lokasi}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${TYPE_COLORS[e.tipe]}`}>
                    {e.tipe.replace('_', ' ')}
                  </span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Event detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="rounded-2xl border border-white/40 bg-white shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[selected.tipe]}`}>
                {selected.tipe.replace('_', ' ')}
              </span>
              <button onClick={() => setSelected(null)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="font-bold text-gray-900 text-base">{selected.judul}</h3>
              {[
                ['Tanggal', new Date(selected.tanggal).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
                ['Waktu', `${selected.waktuMulai} – ${selected.waktuSelesai} WIB`],
                ['Lokasi', selected.lokasi],
                ['Penyelenggara', selected.penyelenggara],
                ...(selected.deskripsi ? [['Deskripsi', selected.deskripsi]] : []),
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3 text-sm">
                  <span className="text-gray-400 w-28 shrink-0">{k}</span>
                  <span className="text-gray-700">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Booking sub-component ──────────────────────────────────────────────────────

function BookingView() {
  const [bookings, setBookings] = useState<Booking[]>(seedBookings);
  const [showForm, setShowForm] = useState(false);
  const [conflict, setConflict] = useState<string | null>(null);
  const [form, setForm] = useState({
    ruangan: ROOMS[0],
    pemohon: DOSEN_NAME,
    tanggal: new Date().toISOString().slice(0, 10),
    waktuMulai: '09:00',
    waktuSelesai: '11:00',
    keperluan: '',
  });

  const myBookings = bookings.filter(b => b.pemohon === DOSEN_NAME);

  function patch(p: Partial<typeof form>) {
    const next = { ...form, ...p };
    setForm(next);
    setConflict(hasConflict(bookings, next.ruangan, next.tanggal, next.waktuMulai, next.waktuSelesai)
      ? `${next.ruangan} sudah terpakai pada waktu tersebut.`
      : null);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const isConflict = hasConflict(bookings, form.ruangan, form.tanggal, form.waktuMulai, form.waktuSelesai);
    const newBooking: Booking = {
      id: Math.max(...bookings.map(b => b.id)) + 1,
      ...form,
      status: isConflict ? 'Menunggu' : 'Dikonfirmasi',
    };
    setBookings(prev => [newBooking, ...prev]);
    setShowForm(false);
    setConflict(null);
    setForm({ ruangan: ROOMS[0], pemohon: DOSEN_NAME, tanggal: new Date().toISOString().slice(0, 10), waktuMulai: '09:00', waktuSelesai: '11:00', keperluan: '' });
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900">Booking Ruangan</p>
          <p className="text-xs text-gray-500 mt-0.5">Ajukan peminjaman ruang departemen</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded-xl bg-[#231F54] text-white text-sm font-semibold hover:bg-indigo-900 transition-colors">
          + Ajukan Booking
        </button>
      </div>

      {/* My bookings */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Booking Saya</p>
        </div>
        {myBookings.length === 0 ? (
          <p className="px-4 py-8 text-sm text-gray-400 text-center">Belum ada booking.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {myBookings.map(b => (
              <div key={b.id} className="px-4 py-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{b.ruangan}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(b.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {' · '}{b.waktuMulai}–{b.waktuSelesai}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{b.keperluan}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[b.status]}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="rounded-2xl border border-white/40 bg-white shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <p className="font-semibold text-gray-900">Ajukan Booking Ruangan</p>
              <button onClick={() => { setShowForm(false); setConflict(null); }}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={submit} className="p-5 space-y-4">
              {/* Ruangan */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Ruangan</label>
                <select value={form.ruangan} onChange={e => patch({ ruangan: e.target.value })} required
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
                  {ROOMS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>

              {/* Tanggal & Waktu */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Tanggal</label>
                  <input type="date" value={form.tanggal} onChange={e => patch({ tanggal: e.target.value })} required
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Mulai</label>
                  <input type="time" value={form.waktuMulai} onChange={e => patch({ waktuMulai: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Selesai</label>
                  <input type="time" value={form.waktuSelesai} onChange={e => patch({ waktuSelesai: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
              </div>

              {/* Conflict / OK indicator */}
              {conflict ? (
                <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{conflict} Booking akan berstatus <strong>Menunggu</strong> untuk dikonfirmasi sekretariat.</span>
                </div>
              ) : form.keperluan ? (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-green-50 border border-green-200 text-xs text-green-700">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Tidak ada konflik — booking akan otomatis dikonfirmasi.</span>
                </div>
              ) : null}

              {/* Keperluan */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Keperluan</label>
                <input value={form.keperluan} onChange={e => patch({ keperluan: e.target.value })} required
                  placeholder="Rapat / Seminar / Praktikum ..."
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => { setShowForm(false); setConflict(null); }}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  Batal
                </button>
                <button type="submit" disabled={!form.keperluan}
                  className="flex-1 py-2.5 rounded-xl bg-[#231F54] text-white text-sm font-semibold hover:bg-indigo-900 transition-colors disabled:opacity-40">
                  {conflict ? 'Ajukan (Menunggu)' : 'Konfirmasi Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────

export function KalenderBookingTab() {
  const [view, setView] = useState<'kalender' | 'booking'>('kalender');

  return (
    <div className="space-y-4">
      {/* Sub-nav */}
      <div className="flex gap-2 p-1 rounded-xl bg-white/60 backdrop-blur border border-white/40 w-fit">
        {(['kalender', 'booking'] as const).map(v => (
          <button key={v} onClick={() => setView(v)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
              view === v ? 'bg-[#231F54] text-white shadow' : 'text-gray-600 hover:text-gray-900'
            }`}>
            {v === 'kalender' ? '📅 Kalender' : '🏛 Booking Ruang'}
          </button>
        ))}
      </div>

      {view === 'kalender' ? <KalenderView /> : <BookingView />}
    </div>
  );
}
