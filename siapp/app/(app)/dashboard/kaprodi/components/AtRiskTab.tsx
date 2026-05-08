'use client';

import { useState } from 'react';


interface AtRiskStudent {
  id: string;
  nama: string;
  nim: string;
  prodi: string;
  semester: number;
  ipk: number;
  sksTertunggak: number;
  riskType: string;
}

const MOCK_AT_RISK: AtRiskStudent[] = [
  { id: '1',  nama: 'Qori Ramadhan',      nim: '20/456010/SP/01', prodi: 'S1', semester: 10, ipk: 2.55, sksTertunggak: 12, riskType: 'IPK Rendah' },
  { id: '2',  nama: 'Rina Kusumawati',    nim: '21/456010/SP/01', prodi: 'S1', semester: 8,  ipk: 2.68, sksTertunggak: 8,  riskType: 'IPK Rendah' },
  { id: '3',  nama: 'Surya Perdana',      nim: '22/456010/SP/01', prodi: 'S1', semester: 6,  ipk: 2.70, sksTertunggak: 4,  riskType: 'IPK Rendah' },
  { id: '4',  nama: 'Tari Anggraini',     nim: '20/456011/SP/01', prodi: 'S1', semester: 10, ipk: 2.48, sksTertunggak: 18, riskType: 'SKS Tertunggak' },
  { id: '5',  nama: 'Eka Putri Santoso',  nim: '21/456002/SP/01', prodi: 'S1', semester: 8,  ipk: 2.71, sksTertunggak: 6,  riskType: 'IPK Rendah' },
  { id: '6',  nama: 'Joko Widyatmoko',   nim: '24/456002/SP/01', prodi: 'S1', semester: 2,  ipk: 2.60, sksTertunggak: 0,  riskType: 'IPK Rendah' },
  { id: '7',  nama: 'Budi Setiawan',      nim: '20/456002/SP/01', prodi: 'S1', semester: 10, ipk: 2.95, sksTertunggak: 6,  riskType: 'Tidak Aktif' },
  { id: '8',  nama: 'Lukman Hakim',       nim: '23/456002/SP/02', prodi: 'S2', semester: 5,  ipk: 3.40, sksTertunggak: 0,  riskType: 'Tidak Aktif' },
  { id: '9',  nama: 'Nanda Rizky Pratama',nim: '24/456002/SP/02', prodi: 'S2', semester: 3,  ipk: 3.55, sksTertunggak: 0,  riskType: 'Melewati Batas' },
  { id: '10', nama: 'Omar Syahputra',     nim: '22/456001/SP/03', prodi: 'S3', semester: 7,  ipk: 3.90, sksTertunggak: 0,  riskType: 'Melewati Batas' },
];

const RISK_COLORS: Record<string, string> = {
  'IPK Rendah':      'bg-red-100 text-red-700',
  'SKS Tertunggak':  'bg-orange-100 text-orange-700',
  'Tidak Aktif':     'bg-amber-100 text-amber-700',
  'Melewati Batas':  'bg-purple-100 text-purple-700',
};

interface WarningModal {
  student: AtRiskStudent;
}

export function AtRiskTab({ prodi }: { prodi: string }) {
  const [modal, setModal] = useState<WarningModal | null>(null);
  const [jenis, setJenis] = useState('Akademik');
  const [pesan, setPesan] = useState('');
  const [channels, setChannels] = useState({ email: true, whatsapp: false });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<Set<string>>(new Set());

  const filtered = MOCK_AT_RISK.filter(
    (s) => prodi === 'semua' || s.prodi === prodi
  );

  async function handleSend() {
    if (!modal) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent((prev) => new Set(prev).add(modal.student.id));
    setSending(false);
    setModal(null);
    setPesan('');
  }

  return (
    <>
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-gray-900">Mahasiswa At-Risk</h2>
            <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
              {filtered.length} mahasiswa
            </span>
          </div>
          <p className="text-xs text-gray-400">Klik &quot;Beri Peringatan&quot; untuk mengirim notifikasi</p>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['Nama', 'NIM', 'Prodi', 'Smt', 'IPK', 'SKS Tertunggak', 'Tipe Risiko', 'Aksi'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-gray-50 hover:bg-white/50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">{s.nama}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{s.nim}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">{s.prodi}</span>
                </td>
                <td className="px-4 py-3 text-center text-gray-600">{s.semester}</td>
                <td className="px-4 py-3">
                  <span className={`font-semibold text-sm ${s.ipk < 2.75 ? 'text-red-600' : 'text-amber-600'}`}>
                    {s.ipk.toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-gray-600">
                  {s.sksTertunggak > 0 ? (
                    <span className="text-orange-600 font-semibold">{s.sksTertunggak} SKS</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${RISK_COLORS[s.riskType] ?? 'bg-gray-100 text-gray-600'}`}>
                    {s.riskType}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {sent.has(s.id) ? (
                    <span className="text-xs text-green-600 font-medium">✓ Terkirim</span>
                  ) : (
                    <button
                      onClick={() => setModal({ student: s })}
                      className="text-xs font-medium text-white bg-[#231F54] hover:bg-indigo-900 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Beri Peringatan
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">
            Tidak ada mahasiswa at-risk untuk prodi ini.
          </div>
        )}
      </div>

      {/* Warning Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Kirim Peringatan</h3>
                <p className="text-sm text-gray-500 mt-0.5">{modal.student.nama} · {modal.student.nim}</p>
              </div>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>

            {/* Jenis */}
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 block">
                Jenis Peringatan
              </label>
              <div className="flex gap-2">
                {['Akademik', 'Kehadiran', 'Administratif'].map((j) => (
                  <button
                    key={j}
                    onClick={() => setJenis(j)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      jenis === j ? 'bg-[#231F54] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {j}
                  </button>
                ))}
              </div>
            </div>

            {/* Pesan */}
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 block">
                Pesan untuk Mahasiswa
              </label>
              <textarea
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder={`Yth. ${modal.student.nama},\n\nKami menginformasikan bahwa...`}
                rows={4}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>

            {/* Channels */}
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 block">
                Kirim via
              </label>
              <div className="flex gap-4">
                {(['email', 'whatsapp'] as const).map((ch) => (
                  <label key={ch} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channels[ch]}
                      onChange={(e) => setChannels((prev) => ({ ...prev, [ch]: e.target.checked }))}
                      className="w-4 h-4 rounded accent-indigo-600"
                    />
                    <span className="text-sm text-gray-700 capitalize">{ch === 'whatsapp' ? 'WhatsApp (Fonnte)' : 'Email (Resend)'}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setModal(null)}
                className="flex-1 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSend}
                disabled={sending || (!channels.email && !channels.whatsapp)}
                className="flex-1 py-2 rounded-xl bg-[#231F54] text-white text-sm font-semibold hover:bg-indigo-900 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Mengirim…
                  </>
                ) : (
                  'Kirim Peringatan'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
