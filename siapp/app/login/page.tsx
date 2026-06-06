'use client';

import { useState } from 'react';
import { login, ssoLogin } from './actions';

type Tab = 'lokal' | 'sso';

export default function LoginPage() {
  const [tab, setTab]         = useState<Tab>('lokal');
  const [error, setError]     = useState('');
  const [info, setInfo]       = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLokal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(''); setInfo('');
    setLoading(true);
    const result = await login(new FormData(e.currentTarget));
    if (result?.error) { setError(result.error); setLoading(false); }
  }

  async function handleSSO(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(''); setInfo('');
    setLoading(true);
    const result = await ssoLogin(new FormData(e.currentTarget));
    if (result?.error) {
      // Distinguish soft info (registered in SSO, not in SIAPP) from hard error
      if (result.error.includes('belum terdaftar')) {
        setInfo(result.error);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#231F54] via-indigo-900 to-indigo-800 flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FFCA40] shadow-lg mb-2">
            <span className="text-[#231F54] font-black text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-white">SIAPP</h1>
          <p className="text-indigo-300 text-sm">Sistem Informasi Departemen</p>
          <p className="text-indigo-400 text-xs">Politik Pemerintahan — Universitas Gadjah Mada</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-2xl space-y-4">
          <p className="text-white font-semibold text-sm text-center">Masuk ke Sistem</p>

          {/* Tabs */}
          <div className="flex rounded-xl bg-white/10 p-1 gap-1">
            <button
              type="button"
              onClick={() => { setTab('lokal'); setError(''); setInfo(''); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                tab === 'lokal'
                  ? 'bg-white text-[#231F54] shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Login Lokal
            </button>
            <button
              type="button"
              onClick={() => { setTab('sso'); setError(''); setInfo(''); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                tab === 'sso'
                  ? 'bg-[#FFCA40] text-[#231F54] shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Login SSO UGM
            </button>
          </div>

          {/* Lokal Form */}
          {tab === 'lokal' && (
            <form onSubmit={handleLokal} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-indigo-200 uppercase tracking-wide">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="demo@dpp.ugm.ac.id"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFCA40]/50 focus:border-[#FFCA40]/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-indigo-200 uppercase tracking-wide">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFCA40]/50 focus:border-[#FFCA40]/50"
                />
              </div>
              {error && <p className="text-red-300 text-xs bg-red-500/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-[#FFCA40] text-[#231F54] text-sm font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? <><span className="inline-block h-4 w-4 rounded-full border-2 border-[#231F54] border-t-transparent animate-spin" />Memverifikasi...</> : 'Masuk'}
              </button>
            </form>
          )}

          {/* SSO Form */}
          {tab === 'sso' && (
            <form onSubmit={handleSSO} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-indigo-200 uppercase tracking-wide">Username UGM</label>
                <input
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="asepwap"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFCA40]/50 focus:border-[#FFCA40]/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-indigo-200 uppercase tracking-wide">Password UGM</label>
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFCA40]/50 focus:border-[#FFCA40]/50"
                />
              </div>
              {error && <p className="text-red-300 text-xs bg-red-500/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>}
              {info && (
                <p className="text-amber-200 text-xs bg-amber-500/10 border border-amber-400/20 rounded-lg px-3 py-2">
                  {info}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-[#FFCA40] text-[#231F54] text-sm font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? <><span className="inline-block h-4 w-4 rounded-full border-2 border-[#231F54] border-t-transparent animate-spin" />Memverifikasi...</> : 'Masuk SSO UGM'}
              </button>
              <p className="text-indigo-400 text-xs text-center leading-relaxed">
                Akun UGM Anda harus terdaftar di SIAPP.<br />
                Gunakan username, misal: <span className="text-indigo-300">asepwap</span>
              </p>
            </form>
          )}
        </div>

        {/* Demo hint (only on lokal tab) */}
        {tab === 'lokal' && (
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center space-y-0.5">
            <p className="text-xs text-indigo-300 font-medium">Akun Demo</p>
            <p className="text-xs text-white/50">demo@dpp.ugm.ac.id</p>
            <p className="text-xs text-white/50">siapp2026</p>
          </div>
        )}

        {/* SSO note */}
        {tab === 'sso' && (
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center space-y-0.5">
            <p className="text-xs text-indigo-300 font-medium">Login SSO UGM</p>
            <p className="text-xs text-white/40">Akun UGM Anda harus terdaftar di SIAPP.</p>
            <p className="text-xs text-white/40">Gunakan username, misal: asepwap</p>
          </div>
        )}

        <p className="text-center text-indigo-500 text-xs">
          SIAPP v2 · Demo Mode · Phase 1
        </p>
      </div>
    </div>
  );
}
