import Link from 'next/link';
import { logout } from '@/app/login/actions';

const ROLES = [
  {
    role: 'Kepala Departemen',
    abbr: 'Kadep',
    href: '/dashboard/kadep',
    ready: true,
    desc: 'Executive dashboard, akreditasi BAN-PT, antrian persetujuan, briefing AI.',
    initial: 'KD',
    color: 'bg-blue-600',
  },
  {
    role: 'Sekretariat / Admin TU',
    abbr: 'Sekretariat',
    href: '/dashboard/sekretariat',
    ready: true,
    desc: 'Inbox surat, buat surat + AI draft, booking ruang, kepegawaian.',
    initial: 'SK',
    color: 'bg-green-600',
  },
  {
    role: 'Dosen',
    abbr: 'Dosen',
    href: '/dashboard/dosen',
    ready: true,
    desc: 'Profil, publikasi + AI auto-fill, mata kuliah + RPKPS, penelitian, surat.',
    initial: 'DS',
    color: 'bg-amber-500',
  },
  {
    role: 'Ketua Program Studi',
    abbr: 'Kaprodi',
    href: '/dashboard/kaprodi',
    ready: true,
    desc: 'KPI mahasiswa, kurikulum, at-risk + peringatan, EDOM, AI asisten, akreditasi.',
    initial: 'KP',
    color: 'bg-violet-600',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#231F54] via-indigo-900 to-indigo-800 flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#FFCA40]" />
          <span className="text-white/80 text-xs font-medium tracking-wide">SIAPP · Demo Mode · Phase 1</span>
        </div>
        <h1 className="text-4xl font-bold text-white">Sistem Informasi Departemen</h1>
          <form action={logout} className="mt-3 flex justify-center">
            <button type="submit" className="text-xs text-indigo-400 hover:text-white transition-colors underline underline-offset-2">
              Keluar dari demo
            </button>
          </form>
        <p className="text-indigo-200 mt-2 text-lg">Politik Pemerintahan — Universitas Gadjah Mada</p>
        <p className="text-indigo-300 mt-4 text-sm max-w-md mx-auto">
          Pilih peran untuk masuk ke dashboard masing-masing. Login OTP via{' '}
          <span className="text-white/70 font-medium">@ugm.ac.id</span> akan aktif di Phase 2.
        </p>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        {ROLES.map((r) =>
          r.ready ? (
            <Link
              key={r.abbr}
              href={r.href}
              className="group rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-xl p-6 transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className={`h-11 w-11 rounded-xl ${r.color} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow`}>
                  {r.initial}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-white">{r.role}</p>
                    <span className="text-[10px] font-bold bg-green-400/20 text-green-300 border border-green-400/30 px-2 py-0.5 rounded-full">
                      Ready
                    </span>
                  </div>
                  <p className="text-xs text-indigo-200 leading-relaxed">{r.desc}</p>
                </div>
              </div>
              <div className="mt-4 text-right">
                <span className="text-xs font-semibold text-indigo-200 group-hover:text-white transition-colors">
                  Masuk sebagai {r.abbr} →
                </span>
              </div>
            </Link>
          ) : (
            <div
              key={r.abbr}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 opacity-50 cursor-not-allowed"
            >
              <div className="flex items-start gap-4">
                <div className={`h-11 w-11 rounded-xl ${r.color} text-white font-bold text-sm flex items-center justify-center shrink-0 opacity-60`}>
                  {r.initial}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-white/70">{r.role}</p>
                    <span className="text-[10px] font-bold bg-white/10 text-white/40 border border-white/10 px-2 py-0.5 rounded-full">
                      Segera
                    </span>
                  </div>
                  <p className="text-xs text-indigo-300/60 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <p className="text-indigo-400 text-xs mt-12">
        SIAPP v2 · Vibe Coders Berpijar · 4-dev parallel build
      </p>
    </div>
  );
}
