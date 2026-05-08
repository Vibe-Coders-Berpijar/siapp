"use client";

import { useState } from "react";
import { Plus, X, CalendarDays, Clock, User, MapPin, AlertCircle } from "lucide-react";
import { bookings as seedBookings, Booking } from "@/lib/seed";
import { MiniCalendar } from "@/components/sekretariat/MiniCalendar";
import { Badge } from "@/components/sekretariat/Badge";
import { Button } from "@/components/sekretariat/Button";
import { DataTable, Column } from "@/components/sekretariat/DataTable";
import { formatDateShort } from "@/lib/utils";

const ROOMS = [
  "Ruang Rapat Utama",
  "Ruang Rapat Kecil",
  "Aula Gedung A",
  "Lab Komputer",
  "Lab Tanah",
  "Ruang Kelas 201",
  "Ruang Kelas 202",
];

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function hasConflict(
  bookings: Booking[],
  ruangan: string,
  tanggal: string,
  mulai: string,
  selesai: string,
  excludeId?: number
): boolean {
  const start = timeToMinutes(mulai);
  const end   = timeToMinutes(selesai);
  return bookings.some(b => {
    if (b.id === excludeId) return false;
    if (b.ruangan !== ruangan || b.tanggal !== tanggal) return false;
    if (b.status === "Ditolak") return false;
    const bStart = timeToMinutes(b.waktuMulai);
    const bEnd   = timeToMinutes(b.waktuSelesai);
    return start < bEnd && end > bStart;
  });
}

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>(seedBookings);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  const [form, setForm] = useState({
    ruangan: ROOMS[0],
    pemohon: "",
    tanggal: new Date().toISOString().slice(0, 10),
    waktuMulai: "09:00",
    waktuSelesai: "11:00",
    keperluan: "",
  });

  const bookedDates = Array.from(new Set(
    bookings
      .filter(b => b.status !== "Ditolak")
      .map(b => b.tanggal)
  ));

  const handleDateClick = (date: string) => {
    setSelectedDate(prev => (prev === date ? null : date));
  };

  const bookingsOnDate = selectedDate
    ? bookings.filter(b => b.tanggal === selectedDate)
    : bookings;

  const handleConfirm = (id: number) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "Dikonfirmasi" as const } : b));
  };

  const handleReject = (id: number) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "Ditolak" as const } : b));
  };

  const handleFormChange = (patch: Partial<typeof form>) => {
    const updated = { ...form, ...patch };
    setForm(updated);
    // Live conflict check
    const conflict = hasConflict(
      bookings, updated.ruangan, updated.tanggal,
      updated.waktuMulai, updated.waktuSelesai
    );
    setConflictWarning(conflict
      ? `Ruangan ${updated.ruangan} sudah dibooking pada waktu yang dipilih.`
      : null
    );
  };

  const handleSubmitForm = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const conflict = hasConflict(
      bookings, form.ruangan, form.tanggal, form.waktuMulai, form.waktuSelesai
    );
    const nextId = Math.max(...bookings.map(b => b.id)) + 1;
    const newBooking: Booking = {
      id: nextId,
      ...form,
      status: conflict ? "Menunggu" : "Dikonfirmasi",
    };
    setBookings(prev => [newBooking, ...prev]);
    setShowForm(false);
    setConflictWarning(null);
    setForm({
      ruangan: ROOMS[0],
      pemohon: "",
      tanggal: new Date().toISOString().slice(0, 10),
      waktuMulai: "09:00",
      waktuSelesai: "11:00",
      keperluan: "",
    });
  };

  const columns: Column<Booking>[] = [
    {
      key: "ruangan",
      label: "Ruangan",
      sortable: true,
      render: (v) => (
        <span className="flex items-center gap-1.5 text-white/80">
          <MapPin className="w-3 h-3 text-white/30" />
          {String(v)}
        </span>
      ),
    },
    {
      key: "pemohon",
      label: "Pemohon",
      sortable: true,
      render: (v) => (
        <span className="flex items-center gap-1.5 text-white/70 text-xs">
          <User className="w-3 h-3 text-white/30" />
          {String(v)}
        </span>
      ),
    },
    {
      key: "tanggal",
      label: "Tanggal",
      sortable: true,
      render: (v) => (
        <span className="flex items-center gap-1.5 text-white/60 text-xs whitespace-nowrap">
          <CalendarDays className="w-3 h-3 text-white/30" />
          {formatDateShort(String(v))}
        </span>
      ),
    },
    {
      key: "waktuMulai",
      label: "Waktu",
      render: (_, row) => (
        <span className="flex items-center gap-1 text-white/60 text-xs whitespace-nowrap">
          <Clock className="w-3 h-3 text-white/30" />
          {(row as Booking).waktuMulai} – {(row as Booking).waktuSelesai}
        </span>
      ),
    },
    {
      key: "keperluan",
      label: "Keperluan",
      render: (v) => (
        <span className="max-w-[180px] block truncate text-white/70 text-xs">{String(v)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (v) => <Badge>{String(v)}</Badge>,
    },
    {
      key: "id",
      label: "Aksi",
      render: (_, row) => {
        const b = row as Booking;
        if (b.status !== "Menunggu") return null;
        return (
          <div className="flex items-center gap-1.5">
            <Button size="sm" variant="ghost" onClick={() => handleConfirm(b.id)}
              className="text-emerald-400 border-emerald-400/20 hover:bg-emerald-400/10">
              Konfirmasi
            </Button>
            <Button size="sm" variant="danger" onClick={() => handleReject(b.id)}>
              Tolak
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Booking Ruangan</h1>
          <p className="text-sm text-white/40 mt-1">
            Kelola peminjaman fasilitas dan ruang departemen.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4" />
          Ajukan Booking
        </Button>
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="space-y-4">
          <MiniCalendar
            bookedDates={bookedDates}
            onDateClick={handleDateClick}
          />

          {selectedDate && (
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-white">{formatDateShort(selectedDate)}</p>
                <button onClick={() => setSelectedDate(null)}
                  className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/40">
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                {bookings.filter(b => b.tanggal === selectedDate).length === 0 ? (
                  <p className="text-xs text-white/30">Tidak ada booking pada tanggal ini.</p>
                ) : (
                  bookings.filter(b => b.tanggal === selectedDate).map(b => (
                    <div key={b.id} className="text-xs space-y-0.5">
                      <p className="text-white/70 font-medium">{b.ruangan}</p>
                      <p className="text-white/40">{b.waktuMulai}–{b.waktuSelesai} · {b.pemohon}</p>
                      <Badge>{b.status}</Badge>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="glass rounded-2xl p-4 space-y-2">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3">Ringkasan</p>
            {(["Dikonfirmasi", "Menunggu", "Ditolak"] as const).map(s => (
              <div key={s} className="flex justify-between items-center">
                <Badge>{s}</Badge>
                <span className="text-sm font-bold text-white">
                  {bookings.filter(b => b.status === s).length}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="lg:col-span-2">
          {selectedDate && (
            <p className="text-sm text-white/40 mb-3">
              Menampilkan booking untuk{" "}
              <span className="text-ugm-gold font-medium">{formatDateShort(selectedDate)}</span>
              {" "}·{" "}
              <button onClick={() => setSelectedDate(null)} className="hover:underline">Lihat semua</button>
            </p>
          )}
          <DataTable
            columns={columns}
            data={bookingsOnDate}
            emptyMessage="Tidak ada booking untuk tanggal ini."
          />
        </div>
      </div>

      {/* New Booking Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass rounded-2xl border border-white/14 w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <p className="font-semibold text-white">Ajukan Booking Ruangan</p>
              <button onClick={() => { setShowForm(false); setConflictWarning(null); }}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-6 space-y-4">
              {/* Ruangan */}
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">
                  Ruangan <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.ruangan}
                  onChange={e => handleFormChange({ ruangan: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-ugm-gold/50 transition-colors"
                >
                  {ROOMS.map(r => <option key={r} value={r} className="bg-gray-900">{r}</option>)}
                </select>
              </div>

              {/* Pemohon */}
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">
                  Nama Pemohon <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.pemohon}
                  onChange={e => handleFormChange({ pemohon: e.target.value })}
                  required
                  placeholder="Dr. Nama Lengkap"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-ugm-gold/50 transition-colors"
                />
              </div>

              {/* Tanggal & Waktu */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Tanggal</label>
                  <input
                    type="date"
                    value={form.tanggal}
                    onChange={e => handleFormChange({ tanggal: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-ugm-gold/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Mulai</label>
                  <input
                    type="time"
                    value={form.waktuMulai}
                    onChange={e => handleFormChange({ waktuMulai: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-ugm-gold/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Selesai</label>
                  <input
                    type="time"
                    value={form.waktuSelesai}
                    onChange={e => handleFormChange({ waktuSelesai: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-ugm-gold/50 transition-colors"
                  />
                </div>
              </div>

              {/* Conflict warning */}
              {conflictWarning && (
                <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-amber-400/10 border border-amber-400/25 text-xs text-amber-300">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>{conflictWarning} Booking akan masuk status <strong>Menunggu</strong> untuk dikonfirmasi manual.</span>
                </div>
              )}

              {!conflictWarning && form.pemohon && (
                <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-xs text-emerald-300">
                  <span>✓ Tidak ada konflik — booking akan otomatis dikonfirmasi.</span>
                </div>
              )}

              {/* Keperluan */}
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">
                  Keperluan <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.keperluan}
                  onChange={e => handleFormChange({ keperluan: e.target.value })}
                  required
                  placeholder="Rapat / Seminar / Praktikum ..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-ugm-gold/50 transition-colors"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button type="button" variant="ghost" onClick={() => { setShowForm(false); setConflictWarning(null); }} className="flex-1">
                  Batal
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  {conflictWarning ? "Ajukan (Menunggu)" : "Konfirmasi Booking"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
