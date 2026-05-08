import { renja } from "@/lib/seed";
import { TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = { title: "Renja — DPP UGM" };

export default function RenjaPage() {
  const active = renja;

  const totalAnggaran  = active.program.reduce((s, p) => s + p.anggaranJuta, 0);
  const totalRealisasi = active.program.reduce((s, p) => s + p.realisasiJuta, 0);
  const pct = Math.round((totalRealisasi / totalAnggaran) * 100);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Rencana Kerja {active.tahun}</h1>
          <p className="text-sm text-white/40 mt-1">Departemen Pendidikan Profesi UGM</p>
        </div>
        <div className="glass rounded-xl px-4 py-2.5">
          <p className="text-xs text-white/40">Status</p>
          <p className="text-sm font-bold text-emerald-400 capitalize">{active.status}</p>
        </div>
      </div>

      {/* Overall budget summary */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-ugm-gold" />
          <p className="text-sm font-semibold text-white">Ringkasan Anggaran</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="glass rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">Rp {totalAnggaran}jt</p>
            <p className="text-xs text-white/40 mt-0.5">Total RKAT</p>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-emerald-400">Rp {totalRealisasi}jt</p>
            <p className="text-xs text-white/40 mt-0.5">Realisasi</p>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <p className={`text-2xl font-bold ${pct >= 70 ? "text-emerald-400" : pct >= 40 ? "text-ugm-gold" : "text-amber-400"}`}>
              {pct}%
            </p>
            <p className="text-xs text-white/40 mt-0.5">Serapan</p>
          </div>
        </div>
        <div className="h-3 rounded-full bg-white/8 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${pct >= 70 ? "bg-emerald-400/80" : pct >= 40 ? "bg-ugm-gold/80" : "bg-amber-400/70"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Programs */}
      <div className="space-y-4">
        {active.program.map((prog, idx) => {
          const progPct = Math.round((prog.realisasiJuta / prog.anggaranJuta) * 100);
          return (
            <div key={idx} className="glass rounded-2xl overflow-hidden">
              {/* Program header */}
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-ugm-gold/15 border border-ugm-gold/25 flex items-center justify-center text-xs font-bold text-ugm-gold">
                    {idx + 1}
                  </span>
                  <p className="font-semibold text-white text-sm">{prog.nama}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/50">
                  <span>Rp {prog.realisasiJuta}jt / Rp {prog.anggaranJuta}jt</span>
                  <span className={`font-bold ${progPct >= 70 ? "text-emerald-400" : progPct >= 40 ? "text-ugm-gold" : "text-amber-400"}`}>
                    {progPct}%
                  </span>
                </div>
              </div>

              {/* Budget bar */}
              <div className="px-5 py-2 bg-white/3">
                <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${progPct >= 70 ? "bg-emerald-400/70" : progPct >= 40 ? "bg-ugm-gold/70" : "bg-amber-400/60"}`}
                    style={{ width: `${progPct}%` }}
                  />
                </div>
              </div>

              {/* KPI table */}
              <div className="px-5 pb-4">
                <table className="w-full text-xs mt-3">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-white/30 font-medium pb-2 w-1/2">Indikator Kinerja</th>
                      <th className="text-center text-white/30 font-medium pb-2">Target</th>
                      <th className="text-center text-white/30 font-medium pb-2">Realisasi</th>
                      <th className="text-center text-white/30 font-medium pb-2">Satuan</th>
                      <th className="text-center text-white/30 font-medium pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prog.kpis.map((kpi, ki) => {
                      const tgt = typeof kpi.target === "number" ? kpi.target : 0;
                      const real = typeof kpi.realisasi === "number" ? kpi.realisasi : 0;
                      const onTrack = tgt > 0 ? real / tgt >= 0.7 : true;
                      return (
                        <tr key={ki} className="border-b border-white/5 last:border-0">
                          <td className="py-2 text-white/70 pr-4">{kpi.indikator}</td>
                          <td className="py-2 text-center text-white/60 font-mono">{kpi.target}</td>
                          <td className="py-2 text-center font-mono font-bold">
                            <span className={onTrack ? "text-emerald-400" : "text-amber-400"}>{kpi.realisasi}</span>
                          </td>
                          <td className="py-2 text-center text-white/40">{kpi.satuan}</td>
                          <td className="py-2 text-center">
                            {onTrack
                              ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
                              : <AlertCircle  className="w-3.5 h-3.5 text-amber-400 inline" />
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
