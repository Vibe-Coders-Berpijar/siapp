import Link from 'next/link';
import { StatusBadge } from '@/components/shared/StatusBadge';

type Jenis = 'Penelitian' | 'PkM';

interface Proposal {
  id: string;
  judul: string;
  jenis: Jenis;
  abstrak: string;
  anggaran: string;
  durasi: string;
  status: string;
  tanggal: string;
  stage: number;
  anggota: string[];
}

const MOCK_PROPOSALS: Record<string, Proposal> = {
  '1': {
    id: '1',
    judul: 'Dinamika Kebijakan Desentralisasi Fiskal di Era Pasca-COVID: Studi Komparatif Kabupaten/Kota di DIY',
    jenis: 'Penelitian',
    abstrak:
      'Penelitian ini mengkaji perubahan kebijakan desentralisasi fiskal di daerah-daerah yang terdampak pandemi COVID-19, dengan fokus pada kapasitas fiskal dan efektivitas belanja daerah. Studi komparatif akan dilakukan terhadap 5 kabupaten/kota di Daerah Istimewa Yogyakarta dalam kurun waktu 2019–2024.',
    anggaran: 'Rp 85.000.000',
    durasi: '12 bulan',
    status: 'Menunggu',
    tanggal: '15 Jan 2025',
    stage: 1,
    anggota: ['Dr. Ahmad Fauzi (Ketua)', 'Dr. Siti Nuraini', 'Budi Santoso, S.IP (Asisten Peneliti)'],
  },
  '2': {
    id: '2',
    judul: 'Pelatihan Literasi Digital bagi Aparatur Desa di Kawasan Perbatasan Kalbar',
    jenis: 'PkM',
    abstrak:
      'Kegiatan pengabdian ini bertujuan meningkatkan kapasitas digital aparatur desa di 12 desa perbatasan Kalimantan Barat, meliputi penggunaan sistem informasi desa, e-government, dan literasi media sosial untuk keperluan pemerintahan.',
    anggaran: 'Rp 45.000.000',
    durasi: '6 bulan',
    status: 'Aktif',
    tanggal: '3 Feb 2025',
    stage: 3,
    anggota: ['Dr. Ahmad Fauzi (Ketua)', 'Dr. Maya Indira', 'Reza Firmansyah, M.IP'],
  },
  '3': {
    id: '3',
    judul: 'Partisipasi Perempuan dalam Musrenbang Kelurahan: Studi Kasus Kota Yogyakarta',
    jenis: 'Penelitian',
    abstrak:
      'Studi ini mengeksplorasi tingkat dan kualitas partisipasi perempuan dalam forum Musyawarah Perencanaan Pembangunan (Musrenbang) tingkat kelurahan di Kota Yogyakarta, serta hambatan struktural yang dihadapi.',
    anggaran: 'Rp 60.000.000',
    durasi: '10 bulan',
    status: 'Draft',
    tanggal: '20 Mar 2025',
    stage: 0,
    anggota: ['Dr. Ahmad Fauzi (Ketua)', 'Dr. Ratih Dewi Kusuma'],
  },
};

const STAGES = [
  { label: 'Dosen', desc: 'Pengaju proposal' },
  { label: 'Koor Riset', desc: 'Tinjauan awal & kelengkapan' },
  { label: 'Kaprodi', desc: 'Persetujuan program studi' },
  { label: 'Kadep', desc: 'Persetujuan final departemen' },
];

const JENIS_COLOR: Record<Jenis, string> = {
  Penelitian: 'bg-indigo-50 text-indigo-700',
  PkM: 'bg-teal-50 text-teal-700',
};

export default function ProposalDetailPage({ params }: { params: { id: string } }) {
  const proposal = MOCK_PROPOSALS[params.id];

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <p className="text-gray-500">Proposal tidak ditemukan.</p>
          <Link href="/riset-pkm" className="text-indigo-600 hover:underline text-sm">
            &larr; Kembali ke daftar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/dashboard/dosen" className="hover:text-gray-800 transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/riset-pkm" className="hover:text-gray-800 transition-colors">Riset &amp; PkM</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate max-w-[260px]">
            {proposal.judul.slice(0, 45)}&hellip;
          </span>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Main content */}
          <div className="col-span-2 space-y-5">
            {/* Header card */}
            <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${JENIS_COLOR[proposal.jenis]}`}>
                      {proposal.jenis}
                    </span>
                    <span className="text-xs text-gray-400">{proposal.tanggal}</span>
                  </div>
                  <h1 className="text-base font-bold text-gray-900 leading-snug">{proposal.judul}</h1>
                </div>
                <div className="shrink-0">
                  <StatusBadge status={proposal.status} size="sm" />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  {proposal.jenis === 'Penelitian' ? 'Abstrak' : 'Deskripsi Kegiatan'}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{proposal.abstrak}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Anggaran</p>
                  <p className="text-sm font-semibold text-green-700 mt-0.5">{proposal.anggaran}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Durasi</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">{proposal.durasi}</p>
                </div>
              </div>
            </div>

            {/* Tim */}
            <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">
                Tim {proposal.jenis === 'Penelitian' ? 'Peneliti' : 'Pelaksana'}
              </h3>
              <div className="space-y-2.5">
                {proposal.anggota.map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0">
                      {a.split(' ').find((w) => w.length > 1)?.[0] ?? '?'}
                    </div>
                    <span className="text-sm text-gray-700">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Workflow sidebar */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-4">Alur Persetujuan</h3>
              <div>
                {STAGES.map((stage, idx) => {
                  const done = idx < proposal.stage;
                  const active = idx === proposal.stage;
                  return (
                    <div key={stage.label} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 ${
                            done
                              ? 'bg-[#231F54] border-[#231F54] text-white'
                              : active
                              ? 'bg-white border-[#231F54] text-[#231F54]'
                              : 'bg-gray-50 border-gray-200 text-gray-300'
                          }`}
                        >
                          {done ? '✓' : idx + 1}
                        </div>
                        {idx < STAGES.length - 1 && (
                          <div className={`w-0.5 h-8 mt-0.5 ${done ? 'bg-[#231F54]' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      <div className="pb-5">
                        <p
                          className={`text-sm font-semibold ${
                            done || active ? 'text-gray-900' : 'text-gray-300'
                          }`}
                        >
                          {stage.label}
                        </p>
                        <p
                          className={`text-xs ${
                            done || active ? 'text-gray-500' : 'text-gray-300'
                          }`}
                        >
                          {stage.desc}
                        </p>
                        {active && (
                          <span className="mt-1 inline-block text-[10px] font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                            Sedang Ditinjau
                          </span>
                        )}
                        {done && (
                          <span className="mt-1 inline-block text-[10px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Disetujui
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button className="w-full py-2.5 rounded-xl bg-[#231F54] text-white text-sm font-semibold hover:bg-indigo-900 transition-colors">
                Unduh Proposal (PDF)
              </button>
              <Link
                href="/riset-pkm"
                className="block w-full py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors text-center"
              >
                &larr; Kembali ke Daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
