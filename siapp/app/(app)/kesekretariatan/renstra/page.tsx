import { renstra } from "@/lib/seed";
import { Target, TrendingUp } from "lucide-react";

export const metadata = { title: "Renstra — DPP UGM" };

export default function RenstraPage() {
  const active = renstra;
  if (!active) return <p className="text-white/40">Data renstra tidak ditemukan.</p>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Rencana Strategis</h1>
        <p className="text-sm text-white/40 mt-1">
          Renstra {active.periodeMulai}–{active.periodeAkhir} · Departemen Pendidikan Profesi UGM
        </p>
      </div>

      {/* Visi */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-ugm-gold" />
          <p className="text-sm font-bold text-ugm-gold uppercase tracking-wide">Visi</p>
        </div>
        <p className="text-white/90 text-lg font-semibold leading-relaxed">{active.visi}</p>
      </div>

      {/* Misi */}
      <div className="glass rounded-2xl p-6">
        <p className="text-sm font-bold text-white/50 uppercase tracking-wide mb-4">Misi</p>
        <ol className="space-y-3">
          {active.misi.map((m, i) => (
            <li key={i} className="flex gap-4">
              <span className="w-7 h-7 rounded-lg bg-ugm-gold/15 border border-ugm-gold/25 flex items-center justify-center text-xs font-bold text-ugm-gold flex-shrink-0">
                {i + 1}
              </span>
              <p className="text-white/80 text-sm leading-relaxed pt-1">{m}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Tujuan Strategis */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-ugm-gold" />
          <p className="text-sm font-bold text-white">Tujuan Strategis & Capaian</p>
        </div>
        <div className="space-y-4">
          {active.tujuanStrategis.map(g => (
            <div key={g.id} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex gap-3">
                  <span className="w-8 h-8 rounded-xl bg-ugm-gold/15 border border-ugm-gold/25 flex items-center justify-center text-sm font-bold text-ugm-gold flex-shrink-0">
                    {g.id}
                  </span>
                  <div>
                    <p className="font-semibold text-white text-sm">{g.tujuan}</p>
                    <p className="text-xs text-white/40 mt-0.5">Target 2030: {g.target2030}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-2xl font-bold ${g.capaian >= 75 ? "text-emerald-400" : g.capaian >= 50 ? "text-ugm-gold" : "text-amber-400"}`}>
                    {g.capaian}%
                  </p>
                  <p className="text-xs text-white/30">Capaian</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      g.capaian >= 75 ? "bg-emerald-400/80" :
                      g.capaian >= 50 ? "bg-ugm-gold/80" :
                                        "bg-amber-400/70"
                    }`}
                    style={{ width: `${g.capaian}%` }}
                  />
                </div>
              </div>

              {/* Indikator */}
              <div>
                <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wide mb-2">Indikator Keberhasilan</p>
                <div className="flex flex-wrap gap-2">
                  {g.indikator.map((ind, i) => (
                    <span key={i} className="text-xs text-white/50 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
