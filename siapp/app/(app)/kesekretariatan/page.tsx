import {
  Mail,
  Clock,
  CalendarCheck,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { StatCard } from "@/components/sekretariat/StatCard";
import { letters, bookings, calendarEvents, renja } from "@/lib/seed";
import { Badge } from "@/components/sekretariat/Badge";
import { formatDateShort } from "@/lib/utils";

export const metadata = { title: "Dashboard — Sekretariat DPP UGM" };

export default function DashboardPage() {
  const today = new Date("2026-05-08");

  // KPI 1 — surat keluar bulan ini
  const suratKeluarBulanIni = letters.filter(l => {
    if (l.direction !== "keluar") return false;
    const d = new Date(l.tanggal);
    return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth();
  }).length;

  // KPI 2 — booking menunggu konfirmasi
  const bookingMenunggu = bookings.filter(b => b.status === "Menunggu").length;

  // KPI 3 — surat belum selesai (stuck — step < 4, bukan draft, dibuat > 7 hari lalu)
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const workflowStuck = letters.filter(l =>
    l.direction === "keluar" &&
    l.approvalStep > 0 && l.approvalStep < 4 &&
    new Date(l.tanggal) < sevenDaysAgo
  ).length;

  // KPI 4 — surat masuk belum ditindaklanjuti
  const suratMasukBelumTL = letters.filter(l =>
    l.direction === "masuk" && l.status === "Menunggu"
  ).length;

  // KPI 5 — realisasi anggaran renja 2026
  const totalAnggaran  = renja.program.reduce((s, p) => s + p.anggaranJuta, 0);
  const totalRealisasi = renja.program.reduce((s, p) => s + p.realisasiJuta, 0);
  const pctRealisasi   = totalAnggaran > 0 ? Math.round((totalRealisasi / totalAnggaran) * 100) : 0;

  // KPI 6 — kegiatan bulan ini
  const kegiatanBulanIni = calendarEvents.filter(e => {
    const d = new Date(e.tanggal);
    return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth();
  }).length;

  // Recent letters
  const recentLetters = [...letters]
    .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
    .slice(0, 6);

  // Upcoming events (next 7 days)
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const upcomingEvents = calendarEvents
    .filter(e => {
      const d = new Date(e.tanggal);
      return d >= today && d <= nextWeek;
    })
    .sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime())
    .slice(0, 4);

  // Anomaly digest — items needing attention
  const anomalies: string[] = [];
  if (workflowStuck > 0) anomalies.push(`${workflowStuck} surat keluar tertahan >7 hari tanpa tanda tangan.`);
  if (suratMasukBelumTL > 0) anomalies.push(`${suratMasukBelumTL} surat masuk belum ditindaklanjuti.`);
  if (bookingMenunggu > 0) anomalies.push(`${bookingMenunggu} permintaan booking ruang menunggu konfirmasi.`);
  if (pctRealisasi < 30) anomalies.push(`Realisasi anggaran baru ${pctRealisasi}% — akselerasi belanja diperlukan.`);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-white/40 mt-1">
          Selamat datang, Admin. Ringkasan aktivitas per {formatDateShort("2026-05-08")}.
        </p>
      </div>

      {/* Anomaly digest banner */}
      {anomalies.length > 0 && (
        <div className="glass rounded-2xl p-4 border border-amber-400/20 bg-amber-400/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-300 mb-1">Perhatian Diperlukan</p>
              <ul className="space-y-0.5">
                {anomalies.map((a, i) => (
                  <li key={i} className="text-xs text-amber-200/70 flex items-start gap-1.5">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Surat Keluar Bulan Ini"
          value={suratKeluarBulanIni}
          icon={Mail}
          sub="Mei 2026"
          accent="blue"
        />
        <StatCard
          label="Booking Menunggu"
          value={bookingMenunggu}
          icon={Clock}
          sub="Perlu konfirmasi"
          accent="amber"
        />
        <StatCard
          label="Surat Masuk Belum TL"
          value={suratMasukBelumTL}
          icon={ArrowUpRight}
          sub="Perlu tindak lanjut"
          accent="amber"
        />
        <StatCard
          label="Workflow Tertahan"
          value={workflowStuck}
          icon={AlertTriangle}
          sub=">7 hari tanpa TTD"
          accent={workflowStuck > 0 ? "amber" : "green"}
        />
        <StatCard
          label="Realisasi Anggaran"
          value={`${pctRealisasi}%`}
          icon={TrendingUp}
          sub={`Rp ${totalRealisasi}jt / Rp ${totalAnggaran}jt`}
          accent="gold"
        />
        <StatCard
          label="Kegiatan Bulan Ini"
          value={kegiatanBulanIni}
          icon={CalendarCheck}
          sub="Terjadwal"
          accent="green"
        />
      </div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent letters */}
        <div className="lg:col-span-2 glass rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <p className="text-sm font-semibold text-white">Surat Terbaru</p>
            <a href="/kesekretariatan/persuratan" className="text-xs text-ugm-gold hover:underline flex items-center gap-1">
              Lihat semua <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <div className="divide-y divide-white/5">
            {recentLetters.map(letter => (
              <div key={letter.id} className="px-5 py-3 flex items-start gap-3 hover:bg-white/5 transition-colors">
                <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${letter.direction === "keluar" ? "bg-ugm-gold/60" : "bg-blue-400/60"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/90 font-medium truncate">{letter.perihal}</p>
                  <p className="text-xs text-white/40 mt-0.5 truncate">
                    {letter.nomor} · {letter.direction === "keluar" ? letter.tujuan : letter.pengirim}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <Badge>{letter.status}</Badge>
                  <span className="text-xs text-white/30">{formatDateShort(letter.tanggal)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Upcoming events */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-ugm-gold" />
              <p className="text-sm font-semibold text-white">Kegiatan Mendatang</p>
            </div>
            {upcomingEvents.length === 0 ? (
              <p className="text-xs text-white/30">Tidak ada kegiatan dalam 7 hari ke depan.</p>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map(e => (
                  <div key={e.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white/50">
                      {new Date(e.tanggal).getDate()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white/80 truncate">{e.judul}</p>
                      <p className="text-xs text-white/30">{e.waktuMulai} · {e.lokasi}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Anggaran progress */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-ugm-gold" />
              <p className="text-sm font-semibold text-white">Serapan Anggaran 2026</p>
            </div>
            <div className="space-y-3">
              {renja.program.map(p => {
                const pct = Math.round((p.realisasiJuta / p.anggaranJuta) * 100);
                return (
                  <div key={p.nama}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-white/50 truncate max-w-[140px]">{p.nama}</span>
                      <span className="text-xs font-medium text-white">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          pct >= 70 ? "bg-emerald-400/70" :
                          pct >= 40 ? "bg-ugm-gold/70" :
                                      "bg-amber-400/60"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Booking summary */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-white">Status Booking</p>
              <a href="/kesekretariatan/booking-ruang" className="text-xs text-ugm-gold hover:underline">Kelola</a>
            </div>
            <div className="space-y-2">
              {(["Dikonfirmasi", "Menunggu", "Ditolak"] as const).map(s => {
                const count = bookings.filter(b => b.status === s).length;
                const pct = Math.round((count / bookings.length) * 100);
                return (
                  <div key={s}>
                    <div className="flex justify-between mb-1">
                      <Badge>{s}</Badge>
                      <span className="text-xs font-bold text-white">{count}</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          s === "Dikonfirmasi" ? "bg-emerald-400/70" :
                          s === "Menunggu"     ? "bg-amber-400/70" :
                                                 "bg-red-400/70"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
