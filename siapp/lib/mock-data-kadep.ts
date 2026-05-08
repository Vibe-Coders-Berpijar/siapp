export const currentUser = {
  nama: 'Prof. Hery Santoso',
  role: 'kadep' as const,
  jabatan: 'Kepala Departemen',
  email: 'hery.santoso@ugm.ac.id',
}

export const kpiData = {
  totalDosen: 30,
  publikasiTahunIni: 47,
  hibahAktif: 3,
  mahasiswaAktif: 438,
}

export const tridharmaData = [
  { bulan: 'Jun', pendidikan: 42, penelitian: 18, pkm: 8 },
  { bulan: 'Jul', pendidikan: 38, penelitian: 22, pkm: 10 },
  { bulan: 'Agu', pendidikan: 35, penelitian: 25, pkm: 9 },
  { bulan: 'Sep', pendidikan: 45, penelitian: 20, pkm: 12 },
  { bulan: 'Okt', pendidikan: 50, penelitian: 28, pkm: 11 },
  { bulan: 'Nov', pendidikan: 48, penelitian: 30, pkm: 14 },
  { bulan: 'Des', pendidikan: 40, penelitian: 26, pkm: 10 },
  { bulan: 'Jan', pendidikan: 44, penelitian: 24, pkm: 13 },
  { bulan: 'Feb', pendidikan: 52, penelitian: 32, pkm: 15 },
  { bulan: 'Mar', pendidikan: 55, penelitian: 35, pkm: 16 },
  { bulan: 'Apr', pendidikan: 50, penelitian: 38, pkm: 14 },
  { bulan: 'Mei', pendidikan: 58, penelitian: 40, pkm: 18 },
]

export const pendingApprovals = [
  {
    id: 1,
    nomor: 'B/018/UN1.SIPSO/HM/2026',
    perihal: 'Surat Tugas Penelitian Lapangan — Dr. Ahmad Fauzi',
    pengaju: 'Dr. Ahmad Fauzi',
    tanggal: '6 Mei 2026',
    status: 'menunggu',
  },
  {
    id: 2,
    nomor: 'B/019/UN1.SIPSO/HM/2026',
    perihal: 'Undangan Seminar Nasional Tata Kelola Pemerintahan',
    pengaju: 'Dr. Siti Nuraini',
    tanggal: '7 Mei 2026',
    status: 'menunggu',
  },
]

export const dosenData = [
  { id: 1, nama: 'Prof. Hery Santoso', jabatan: 'Guru Besar', nidn: '0012056801', publikasi: 12, sks: 9, hibahAktif: 2 },
  { id: 2, nama: 'Prof. Bambang Wicaksono', jabatan: 'Guru Besar', nidn: '0023047502', publikasi: 10, sks: 8, hibahAktif: 1 },
  { id: 3, nama: 'Dr. Ratih Dewi Kusuma', jabatan: 'Lektor Kepala', nidn: '0014078401', publikasi: 7, sks: 12, hibahAktif: 1 },
  { id: 4, nama: 'Dr. Maya Indira', jabatan: 'Lektor Kepala', nidn: '0031088502', publikasi: 6, sks: 10, hibahAktif: 1 },
  { id: 5, nama: 'Dr. Reza Pratama', jabatan: 'Lektor Kepala', nidn: '0008079101', publikasi: 5, sks: 12, hibahAktif: 0 },
  { id: 6, nama: 'Dr. Ahmad Fauzi', jabatan: 'Lektor', nidn: '0017059301', publikasi: 4, sks: 14, hibahAktif: 0 },
  { id: 7, nama: 'Dr. Siti Nuraini', jabatan: 'Lektor', nidn: '0025089201', publikasi: 3, sks: 14, hibahAktif: 0 },
  { id: 8, nama: 'Dr. Fitri Handayani', jabatan: 'Lektor', nidn: '0009079401', publikasi: 2, sks: 12, hibahAktif: 0 },
  { id: 9, nama: 'Dimas Aryo Wibowo, M.Si.', jabatan: 'Asisten Ahli', nidn: '0015079601', publikasi: 1, sks: 12, hibahAktif: 0 },
  { id: 10, nama: 'Nadia Putri Kusuma, M.A.', jabatan: 'Asisten Ahli', nidn: '0022099701', publikasi: 0, sks: 10, hibahAktif: 0 },
]

export const banPtCriteria = [
  { kode: 'K1', label: 'VMTS', score: 88 },
  { kode: 'K2', label: 'Tata Pamong & Kerja Sama', score: 75 },
  { kode: 'K3', label: 'Mahasiswa', score: 82 },
  { kode: 'K4', label: 'SDM', score: 71 },
  { kode: 'K5', label: 'Keuangan, Sarana & Prasarana', score: 90 },
  { kode: 'K6', label: 'Pendidikan', score: 78 },
  { kode: 'K7', label: 'Penelitian', score: 65 },
  { kode: 'K8', label: 'PkM', score: 70 },
  { kode: 'K9', label: 'Keluaran Tridarma', score: 68 },
]

// Source: Kepmendikbudristek No. 210/M/2023
export const ikuData = [
  { kode: 'IKU 1', label: 'Lulusan Mendapat Pekerjaan Layak', target: 80, actual: 73, unit: '%' },
  { kode: 'IKU 2', label: 'Mahasiswa Pengalaman di Luar Kampus', target: 30, actual: 22, unit: '%' },
  { kode: 'IKU 3', label: 'Dosen Berkegiatan di Luar Kampus', target: 20, actual: 15, unit: '%' },
  { kode: 'IKU 4', label: 'Praktisi Mengajar di Kampus', target: 25, actual: 18, unit: '%' },
  { kode: 'IKU 5', label: 'Karya Dosen Digunakan Masyarakat', target: 15, actual: 8, unit: '%' },
  { kode: 'IKU 6', label: 'Prodi Berkolaborasi Mitra Kelas Dunia', target: 2, actual: 1, unit: 'prodi' },
  { kode: 'IKU 7', label: 'Kelas Kolaboratif & Partisipatif', target: 10, actual: 6, unit: '%' },
  { kode: 'IKU 8', label: 'Prodi Berstandar Internasional', target: 1, actual: 0, unit: 'prodi' },
]

export const decisionAsks = [
  { id: 1, item: 'Persetujuan PRD SIAPP v1.0', batas: '15 Mei 2026', status: 'menunggu', prioritas: 'Tinggi' as const },
  { id: 2, item: 'Validasi Pemetaan Akreditasi LAMSPAK', batas: '20 Mei 2026', status: 'menunggu', prioritas: 'Tinggi' as const },
  { id: 3, item: 'Persetujuan Org Chart Departemen 2026', batas: '25 Mei 2026', status: 'menunggu', prioritas: 'Sedang' as const },
  { id: 4, item: 'Persetujuan Go-Live SIAPP Fase 1', batas: '1 Jun 2026', status: 'menunggu', prioritas: 'Tinggi' as const },
  { id: 5, item: 'Keputusan Anggaran Pengembangan Sistem', batas: '10 Jun 2026', status: 'dalam-review', prioritas: 'Sedang' as const },
]

export const hibahData = [
  { id: 1, judul: 'Riset Tata Kelola Digital Daerah', funder: 'Kemdiktisaintek', nilai: 285, status: 'aktif', periode: '2025–2026', pic: 'Prof. Hery Santoso' },
  { id: 2, judul: 'Ketahanan Birokrasi Pasca-Pandemi', funder: 'LPDP', nilai: 450, status: 'aktif', periode: '2024–2026', pic: 'Prof. Bambang Wicaksono' },
  { id: 3, judul: 'Model Partisipasi Publik Digital', funder: 'Kemdiktisaintek', nilai: 190, status: 'aktif', periode: '2025–2026', pic: 'Dr. Ratih Dewi Kusuma' },
  { id: 4, judul: 'Analisis Kebijakan Fiskal Daerah', funder: 'Kemdiktisaintek', nilai: 120, status: 'pengajuan', periode: '2026–2027', pic: 'Dr. Maya Indira' },
  { id: 5, judul: 'Reformasi Administrasi Publik Digital', funder: 'LPDP', nilai: 380, status: 'pengajuan', periode: '2026–2027', pic: 'Dr. Reza Pratama' },
]

export const aiInsights = [
  {
    id: 1,
    kriteria: 'K4 — SDM',
    pesan: '2 dosen belum upload BKD semester ini',
    severity: 'Tinggi' as const,
    aksi: 'Kirim pengingat ke Dr. Ahmad Fauzi dan Dr. Fitri Handayani',
  },
  {
    id: 2,
    kriteria: 'K9 — Luaran',
    pesan: 'Publikasi Q1 turun 15% dibanding tahun lalu',
    severity: 'Sedang' as const,
    aksi: 'Review target publikasi internasional semester ini',
  },
  {
    id: 3,
    kriteria: 'K6 — Pendidikan',
    pesan: '3 mata kuliah belum memiliki RPKPS',
    severity: 'Sedang' as const,
    aksi: 'Koordinasi dengan Kaprodi S1 untuk penyusunan RPKPS',
  },
]

// ─── Accreditation Evidence System ───────────────────────────────────────────
// Sources: LAMSPAK Instrumen Akreditasi Unggul S1 (2025), BAN-PT IPEPA-PS (2021),
//          Kepmendikbudristek 500/2024 (standar publikasi per jabatan fungsional),
//          PerBAN-PT No. 18/2024 (rasio dosen:mahasiswa)

export interface EvidenceDoc {
  id: string
  nama: string
  tanggal: string
  keterangan: string
}

// Template determines the 3 form-field labels in the metric entry modal
export type MetricTemplate = 'publication' | 'person' | 'document' | 'contract' | 'manual'

// Each concrete item that contributes to a metric's measured value
export interface MetricEntry {
  id: string
  f1: string   // primary field (dosen name, judul, uraian)
  f2: string   // secondary field (judul artikel, no. SK, nomor)
  f3: string   // tertiary field (URL/DOI, keterangan, funder)
  tanggal: string
}

// How to compute current value automatically from entries
export interface AutoCompute {
  mode: 'count' | 'ratio' | 'percent'
  denom?: number  // divisor for ratio/percent modes
}

export interface CriterionMetric {
  id: string
  label: string
  unit: string
  current: number
  target: number
  weight: number
  hint: string
  template: MetricTemplate
  autoCompute?: AutoCompute
  entries: MetricEntry[]
}

export interface CriterionDetail {
  kode: string
  label: string
  metrics: CriterionMetric[]
  docs: EvidenceDoc[]
}

export function effectiveCurrent(m: CriterionMetric): number {
  if (m.entries.length > 0 && m.autoCompute) {
    const n = m.entries.length
    const { mode, denom = 1 } = m.autoCompute
    if (mode === 'count') return n
    if (mode === 'ratio') return Math.round(n / denom * 100) / 100
    if (mode === 'percent') return Math.round(n / denom * 1000) / 10
  }
  return m.current
}

export function computeCriterionScore(metrics: CriterionMetric[]): number {
  return Math.min(100, Math.round(
    metrics.reduce((sum, m) => {
      const cur = effectiveCurrent(m)
      return sum + (Math.min(cur, m.target) / m.target) * m.weight
    }, 0) * 100
  ))
}

export const criteriaDetails: CriterionDetail[] = [
  {
    kode: 'K1', label: 'VMTS',
    metrics: [
      { id: 'k1_alignment', label: 'Kesesuaian VMTS dengan VMTS Universitas & Fakultas', unit: '%', current: 90, target: 100, weight: 0.25, hint: 'Upload dokumen VMTS yang memuat peta kesesuaian dengan VMTS Universitas dan Fakultas', template: 'document', entries: [
        { id: 'k1al1', f1: 'Matriks Kesesuaian VMTS DPP–Universitas', f2: 'Lampiran A — Dok. VMTS 2025–2029', f3: 'Skor kesesuaian: 9 dari 10 poin visi; 8 dari 9 poin misi', tanggal: '10 Jan 2025' },
        { id: 'k1al2', f1: 'Matriks Kesesuaian VMTS DPP–Fakultas ISIPOL', f2: 'Lampiran B — Dok. VMTS 2025–2029', f3: 'Skor kesesuaian: 9 dari 10 poin visi; 9 dari 10 poin misi', tanggal: '10 Jan 2025' },
        { id: 'k1al3', f1: 'Notulen Verifikasi VMTS oleh Senat Departemen', f2: 'Not. Senat No. 03/DPP/I/2025', f3: 'Disetujui 22 dari 25 anggota senat; 2 poin perlu penyelarasan lanjut', tanggal: '15 Jan 2025' },
      ] },
      { id: 'k1_stakeholder', label: 'Kelompok stakeholder terlibat dalam perumusan VMTS', unit: 'kelompok', current: 3, target: 4, weight: 0.25, hint: 'Upload notulen rapat perumusan VMTS dengan daftar hadir tiap kelompok stakeholder (dosen, mahasiswa, alumni, mitra)', template: 'document', autoCompute: { mode: 'count' }, entries: [
        { id: 'k1s1', f1: 'Kelompok Dosen DTPS', f2: 'Notulen Rapat VMTS 14 Nov 2024', f3: 'Daftar hadir 28 dosen', tanggal: '14 Nov 2024' },
        { id: 'k1s2', f1: 'Kelompok Mahasiswa', f2: 'Notulen FGD VMTS 16 Nov 2024', f3: 'Daftar hadir 15 mahasiswa perwakilan', tanggal: '16 Nov 2024' },
        { id: 'k1s3', f1: 'Kelompok Alumni & Pengguna Lulusan', f2: 'Notulen Konsultasi Alumni 20 Nov 2024', f3: 'Daftar hadir 12 alumni & 5 mitra pengguna', tanggal: '20 Nov 2024' },
      ] },
      { id: 'k1_sosialisasi', label: '% civitas akademika yang memahami VMTS (survei)', unit: '%', current: 80, target: 90, weight: 0.30, hint: 'Upload rekap survei pemahaman VMTS yang disebarkan ke seluruh dosen, mahasiswa, dan tenaga kependidikan', template: 'document', entries: [
        { id: 'k1so1', f1: 'Rekap Survei Pemahaman VMTS — Dosen DTPS', f2: 'Form Survei VMTS/Dosen/2025', f3: '28 responden: 84% skor ≥70 (kategori paham)', tanggal: '5 Feb 2025' },
        { id: 'k1so2', f1: 'Rekap Survei Pemahaman VMTS — Mahasiswa', f2: 'Form Survei VMTS/Mhs/2025', f3: '312 responden: 78% skor ≥70; rata-rata skor 74,2', tanggal: '7 Feb 2025' },
        { id: 'k1so3', f1: 'Rekap Survei Pemahaman VMTS — Tenaga Kependidikan', f2: 'Form Survei VMTS/Tendik/2025', f3: '15 responden: 80% skor ≥70; rata-rata gabungan 80,1%', tanggal: '8 Feb 2025' },
      ] },
      { id: 'k1_evaluasi', label: 'Frekuensi evaluasi implementasi VMTS per tahun', unit: 'kali/thn', current: 2, target: 2, weight: 0.20, hint: 'Upload laporan evaluasi/monev implementasi VMTS dengan bukti rencana tindak lanjut', template: 'document', autoCompute: { mode: 'count' }, entries: [
        { id: 'k1e1', f1: 'Monev VMTS Semester Ganjil 2024/2025', f2: 'Laporan Monev No. 12/DPP/2024', f3: 'RTL tersusun, 3 poin perbaikan', tanggal: '20 Des 2024' },
        { id: 'k1e2', f1: 'Monev VMTS Semester Genap 2024/2025', f2: 'Laporan Monev No. 08/DPP/2025', f3: 'RTL tersusun, 2 poin perbaikan', tanggal: '15 Jun 2025' },
      ] },
    ],
    docs: [
      { id: 'd_k1_1', nama: 'Dokumen VMTS DPP 2025–2029', tanggal: '2 Jan 2025', keterangan: 'Dokumen resmi VMTS yang disahkan Kadep dan Dekan' },
    ],
  },
  {
    kode: 'K2', label: 'Tata Pamong & Kerja Sama',
    metrics: [
      { id: 'k2_mou_total', label: 'Jumlah MoU aktif (nasional + internasional)', unit: 'MoU', current: 10, target: 15, weight: 0.30, hint: 'Upload salinan MoU yang masih berlaku dengan ruang lingkup, tanggal, dan tanda tangan kedua pihak', template: 'contract', autoCompute: { mode: 'count' }, entries: [
        { id: 'k2m1', f1: 'MoU Badan Kepegawaian Negara', f2: 'B/234/BKN.01/2024', f3: 'Nasional — penelitian & magang', tanggal: '5 Mar 2024' },
        { id: 'k2m2', f1: 'MoU Kemenpan-RB', f2: 'B/015/M.KT.02/2024', f3: 'Nasional — riset & konsultasi kebijakan', tanggal: '18 Apr 2024' },
        { id: 'k2m3', f1: 'MoU Pemda DIY', f2: '045/PKS/2024', f3: 'Nasional — pengabdian & riset terapan', tanggal: '10 Jan 2024' },
        { id: 'k2m4', f1: 'MoU BPKP Perwakilan DIY', f2: 'SP-23/PW12/4/2024', f3: 'Nasional — tata kelola keuangan', tanggal: '22 Feb 2024' },
        { id: 'k2m5', f1: 'MoU KPK RI', f2: 'B-56/01-15/03/2024', f3: 'Nasional — riset antikorupsi & pendidikan', tanggal: '7 Mar 2024' },
        { id: 'k2m6', f1: 'MoU Kota Yogyakarta', f2: 'PKS/2024/001', f3: 'Nasional — smart city & e-gov', tanggal: '15 Jan 2024' },
        { id: 'k2m7', f1: 'MoU Kabupaten Sleman', f2: 'PKS/2024/002', f3: 'Nasional — tata kelola desa', tanggal: '20 Jan 2024' },
        { id: 'k2m8', f1: 'MoU Kabupaten Bantul', f2: 'PKS/2024/003', f3: 'Nasional — perencanaan pembangunan', tanggal: '25 Jan 2024' },
        { id: 'k2m9', f1: 'MoU Flinders University Australia', f2: 'MoU-FU-UGM/2023/12', f3: 'Internasional — student exchange & joint research', tanggal: '12 Des 2023' },
        { id: 'k2m10', f1: 'MoU National Chengchi University Taiwan', f2: 'MoU-NCCU-UGM/2024/03', f3: 'Internasional — dual degree & research', tanggal: '1 Mar 2024' },
      ] },
      { id: 'k2_mou_intl', label: 'Jumlah MoU dengan mitra internasional', unit: 'MoU', current: 2, target: 4, weight: 0.20, hint: 'Upload MoU dengan institusi luar negeri beserta bukti kegiatan yang telah dilaksanakan', template: 'contract', autoCompute: { mode: 'count' }, entries: [
        { id: 'k2i1', f1: 'Flinders University Australia', f2: 'MoU-FU-UGM/2023/12', f3: 'Joint research 2024, 2 dosen visiting', tanggal: '12 Des 2023' },
        { id: 'k2i2', f1: 'National Chengchi University Taiwan', f2: 'MoU-NCCU-UGM/2024/03', f3: '1 mahasiswa exchange S2, 1 joint paper', tanggal: '1 Mar 2024' },
      ] },
      { id: 'k2_sop', label: '% SOP departemen yang terimplementasi', unit: '%', current: 75, target: 85, weight: 0.25, hint: 'Upload daftar SOP departemen dan bukti implementasi (laporan audit internal atau hasil monev)', template: 'document', entries: [
        { id: 'k2sop1', f1: 'Laporan Audit Internal SOP Layanan Akademik', f2: 'Audit No. AI/DPP/2025/01', f3: '12 dari 16 SOP akademik diimplementasikan (75%)', tanggal: '20 Mar 2025' },
        { id: 'k2sop2', f1: 'Daftar SOP Departemen TA 2024/2025', f2: 'Dok. SOP/DPP/2024-rev3', f3: '32 SOP total: 24 aktif (75%), 5 revisi berjalan, 3 tidak aktif', tanggal: '3 Jan 2025' },
        { id: 'k2sop3', f1: 'Laporan Monev Implementasi SOP Semester Ganjil', f2: 'Monev No. MV/DPP/2024/12', f3: 'SOP keuangan & kepegawaian: 78% sesuai prosedur; gap utama: pelaporan PKS', tanggal: '30 Des 2024' },
      ] },
      { id: 'k2_kerjasama_aktif', label: '% MoU dengan minimal 1 kegiatan nyata terlaksana', unit: '%', current: 72, target: 85, weight: 0.25, hint: 'Upload laporan kegiatan per MoU yang membuktikan kerjasama aktif bukan sekadar dokumen formal', template: 'document', entries: [
        { id: 'k2ka1', f1: 'Rekap Kegiatan PKS Aktif TA 2024/2025', f2: 'Rekap PKS No. RK/DPP/2025/04', f3: '7 dari 10 MoU terbukti aktif: 5 riset bersama, 2 magang/praktek lapangan', tanggal: '15 Apr 2025' },
        { id: 'k2ka2', f1: 'Laporan Implementasi MoU Pemda DIY — Riset Terapan', f2: 'Laporan MoU/DIY/2024', f3: '2 kegiatan FGD, 1 laporan rekomendasi kebijakan diserahkan ke Pemda', tanggal: '10 Des 2024' },
        { id: 'k2ka3', f1: 'Laporan Implementasi MoU BKN — Magang Mahasiswa', f2: 'Laporan MoU/BKN/2025', f3: '8 mahasiswa S2 magang di BKN Jan–Mar 2025; laporan kegiatan dilampirkan', tanggal: '31 Mar 2025' },
      ] },
    ],
    docs: [],
  },
  {
    kode: 'K3', label: 'Mahasiswa',
    metrics: [
      { id: 'k3_ptw', label: 'Kelulusan Tepat Waktu — PTW (target BAN-PT ≥50%)', unit: '%', current: 60, target: 80, weight: 0.25, hint: 'Upload data kelulusan per angkatan dengan tanggal sidang vs. batas waktu studi normal (8 semester)', template: 'document', entries: [
        { id: 'k3ptw1', f1: 'Data Kelulusan Angkatan 2020 (S1)', f2: 'SIAKAD Rekap Sidang 2024', f3: '112 lulus tepat waktu dari 188 mahasiswa angkatan (59,6%)', tanggal: '30 Sep 2024' },
        { id: 'k3ptw2', f1: 'Data Kelulusan Angkatan 2021 (S1)', f2: 'SIAKAD Rekap Sidang 2025', f3: '84 lulus tepat waktu dari 142 mahasiswa angkatan (59,2%)', tanggal: '31 Mar 2025' },
        { id: 'k3ptw3', f1: 'Laporan Monitoring Masa Studi Mhs Aktif 2022–2024', f2: 'Laporan Studi No. LS/DPP/2025/01', f3: 'Rata-rata PTW 3 angkatan terakhir: 60,1%; tren meningkat vs. 54% (2019)', tanggal: '15 Apr 2025' },
      ] },
      { id: 'k3_pps', label: 'Keberhasilan Studi — PPS (target BAN-PT ≥85%)', unit: '%', current: 88, target: 92, weight: 0.20, hint: 'Upload data jumlah mahasiswa aktif vs. yang berhasil menyelesaikan studi per kohort', template: 'document', entries: [
        { id: 'k3pps1', f1: 'Rekap PPS Kohort 2018–2020 (S1)', f2: 'SIAKAD Rekap Kohort/2024', f3: '506 mahasiswa masuk; 446 berhasil lulus (88,1%); 60 DO/mundur', tanggal: '10 Jan 2025' },
        { id: 'k3pps2', f1: 'Rekap PPS Program S2 Kohort 2021–2022', f2: 'SIAKAD Rekap S2/Kohort/2024', f3: '148 mahasiswa masuk; 131 berhasil lulus (88,5%); 17 tidak lulus/mundur', tanggal: '10 Jan 2025' },
      ] },
      { id: 'k3_masa_tunggu', label: '% lulusan dengan masa tunggu kerja pertama ≤6 bulan', unit: '%', current: 50, target: 65, weight: 0.25, hint: 'Upload rekap tracer study DIKTI yang memuat data masa tunggu kerja per angkatan lulusan', template: 'document', entries: [
        { id: 'k3mt1', f1: 'Rekap Tracer Study DIKTI Lulusan 2022', f2: 'TS/DPP/2023 — 201 responden', f3: 'Masa tunggu ≤6 bln: 98 orang (48,8%); rerata masa tunggu 6,8 bulan', tanggal: '30 Jun 2023' },
        { id: 'k3mt2', f1: 'Rekap Tracer Study DIKTI Lulusan 2023', f2: 'TS/DPP/2024 — 218 responden', f3: 'Masa tunggu ≤6 bln: 109 orang (50,0%); rerata masa tunggu 6,5 bulan', tanggal: '30 Jun 2024' },
        { id: 'k3mt3', f1: 'Rekap Tracer Study DIKTI Lulusan 2024', f2: 'TS/DPP/2025 — 194 responden', f3: 'Masa tunggu ≤6 bln: 101 orang (52,1%); sedang divalidasi untuk laporan akhir', tanggal: '28 Feb 2025' },
      ] },
      { id: 'k3_kerja_bidang', label: '% lulusan bekerja di bidang yang relevan dengan prodi', unit: '%', current: 65, target: 80, weight: 0.20, hint: 'Upload laporan tracer study dengan klasifikasi kesesuaian bidang pekerjaan vs. bidang studi', template: 'document', entries: [
        { id: 'k3kb1', f1: 'Klasifikasi Relevansi Pekerjaan — Lulusan 2022', f2: 'TS/DPP/2023 — Lampiran Klasifikasi', f3: '130 dari 201 responden bekerja di sektor pemerintahan/administrasi publik (64,7%)', tanggal: '30 Jun 2023' },
        { id: 'k3kb2', f1: 'Klasifikasi Relevansi Pekerjaan — Lulusan 2023', f2: 'TS/DPP/2024 — Lampiran Klasifikasi', f3: '142 dari 218 responden bekerja di bidang relevan (65,1%); top: PNS, konsultan kebijakan', tanggal: '30 Jun 2024' },
      ] },
      { id: 'k3_kepuasan', label: 'Kepuasan pengguna/employer terhadap lulusan', unit: '%', current: 76, target: 85, weight: 0.10, hint: 'Upload rekap survei kepuasan pengguna yang memuat skor per kompetensi lulusan', template: 'document', entries: [
        { id: 'k3kp1', f1: 'Survei Kepuasan Pengguna Lulusan TA 2023/2024', f2: 'Survei Employer/2024 — 45 pengguna', f3: 'Skor rata-rata 76,2/100; kompetensi analitik tinggi, komunikasi perlu ditingkatkan', tanggal: '15 Okt 2024' },
        { id: 'k3kp2', f1: 'Rekap Penilaian per Kompetensi — Pengguna Lulusan', f2: 'Lampiran C — Survei Employer/2024', f3: 'Integritas 82, Keahlian Teknis 79, Komunikasi 70, Kepemimpinan 74', tanggal: '15 Okt 2024' },
      ] },
    ],
    docs: [
      { id: 'd_k3_1', nama: 'Laporan Tracer Study 2024', tanggal: '15 Mar 2025', keterangan: 'Tracer study lulusan 2022–2023, response rate 38%' },
    ],
  },
  {
    kode: 'K4', label: 'SDM',
    metrics: [
      { id: 'k4_s3', label: '% dosen DTPS bergelar S3 (doktor) — target LAMSPAK ≥60%', unit: '%', current: 60, target: 80, weight: 0.30, hint: 'Upload SK Kepangkatan dan fotokopi ijazah S3 tiap dosen DTPS; verifikasi melalui PDDIKTI', template: 'person', autoCompute: { mode: 'percent', denom: 30 }, entries: [
        { id: 'k4s3_1', f1: 'Prof. Hery Santoso', f2: 'SK Kepangkatan No. 12345/2020', f3: 'S3 Universitas Indonesia — Ilmu Administrasi 2003', tanggal: '1 Mar 2020' },
        { id: 'k4s3_2', f1: 'Prof. Bambang Wicaksono', f2: 'SK Kepangkatan No. 23456/2019', f3: 'S3 Universität Hamburg — Public Administration 2001', tanggal: '1 Apr 2019' },
        { id: 'k4s3_3', f1: 'Dr. Ratih Dewi Kusuma', f2: 'SK Kepangkatan No. 34567/2021', f3: 'S3 UGM — Ilmu Pemerintahan 2015', tanggal: '15 Jun 2021' },
        { id: 'k4s3_4', f1: 'Dr. Maya Indira', f2: 'SK Kepangkatan No. 45678/2022', f3: 'S3 University of Melbourne — Public Policy 2018', tanggal: '1 Jul 2022' },
        { id: 'k4s3_5', f1: 'Dr. Reza Pratama', f2: 'SK Kepangkatan No. 56789/2023', f3: 'S3 UGM — Administrasi Publik 2021', tanggal: '1 Feb 2023' },
        { id: 'k4s3_6', f1: 'Dr. Ahmad Fauzi', f2: 'SK Kepangkatan No. 67890/2023', f3: 'S3 Universitas Airlangga — Administrasi Publik 2022', tanggal: '15 Mar 2023' },
        { id: 'k4s3_7', f1: 'Dr. Siti Nuraini', f2: 'SK Kepangkatan No. 78901/2022', f3: 'S3 UGM — Kebijakan Publik 2020', tanggal: '1 Aug 2022' },
        { id: 'k4s3_8', f1: 'Dr. Fitri Handayani', f2: 'SK Kepangkatan No. 89012/2024', f3: 'S3 Universitas Padjadjaran — Administrasi Publik 2023', tanggal: '1 Jan 2024' },
        { id: 'k4s3_9', f1: 'Dr. Agus Setiawan', f2: 'SK Kepangkatan No. 90123/2021', f3: 'S3 Leiden University — Public Administration 2016', tanggal: '1 Jul 2021' },
        { id: 'k4s3_10', f1: 'Dr. Budi Santoso', f2: 'SK Kepangkatan No. 01234/2020', f3: 'S3 UGM — Ilmu Pemerintahan 2018', tanggal: '15 Sep 2020' },
        { id: 'k4s3_11', f1: 'Dr. Wulandari Putri', f2: 'SK Kepangkatan No. 11234/2022', f3: 'S3 Universitas Indonesia — Kebijakan Publik 2021', tanggal: '1 Jan 2022' },
        { id: 'k4s3_12', f1: 'Dr. Irfan Maulana', f2: 'SK Kepangkatan No. 21234/2023', f3: 'S3 UGM — Administrasi Publik 2022', tanggal: '15 Feb 2023' },
        { id: 'k4s3_13', f1: 'Dr. Nurul Hidayah', f2: 'SK Kepangkatan No. 31234/2021', f3: 'S3 Universitas Diponegoro — Administrasi Publik 2019', tanggal: '1 Mar 2021' },
        { id: 'k4s3_14', f1: 'Dr. Fajar Kurniawan', f2: 'SK Kepangkatan No. 41234/2024', f3: 'S3 Flinders University — Public Policy 2023', tanggal: '1 Feb 2024' },
        { id: 'k4s3_15', f1: 'Dr. Anisa Rahmawati', f2: 'SK Kepangkatan No. 51234/2022', f3: 'S3 UGM — Kebijakan Publik 2020', tanggal: '15 Jun 2022' },
        { id: 'k4s3_16', f1: 'Dr. Dian Permatasari', f2: 'SK Kepangkatan No. 61234/2023', f3: 'S3 Universitas Brawijaya — Administrasi Publik 2022', tanggal: '1 Jul 2023' },
        { id: 'k4s3_17', f1: 'Dr. Hendra Wijaya', f2: 'SK Kepangkatan No. 71234/2021', f3: 'S3 UGM — Ilmu Pemerintahan 2019', tanggal: '15 Jan 2021' },
        { id: 'k4s3_18', f1: 'Dr. Sri Mulyani', f2: 'SK Kepangkatan No. 81234/2020', f3: 'S3 Universitas Indonesia — Administrasi Negara 2017', tanggal: '1 Oct 2020' },
      ] },
      { id: 'k4_lektor_kepala', label: '% dosen dengan jabatan fungsional Lektor Kepala ke atas', unit: '%', current: 40, target: 55, weight: 0.25, hint: 'Upload SK jabatan fungsional dosen yang masih berlaku dari Kemendikbud', template: 'person', autoCompute: { mode: 'percent', denom: 30 }, entries: [
        { id: 'k4lk1', f1: 'Prof. Hery Santoso', f2: 'SK Guru Besar No. 12345/2018', f3: 'Guru Besar — Ilmu Administrasi Publik', tanggal: '1 Sep 2018' },
        { id: 'k4lk2', f1: 'Prof. Bambang Wicaksono', f2: 'SK Guru Besar No. 23456/2016', f3: 'Guru Besar — Ilmu Pemerintahan', tanggal: '1 Mar 2016' },
        { id: 'k4lk3', f1: 'Dr. Ratih Dewi Kusuma', f2: 'SK Lektor Kepala No. 34567/2020', f3: 'Lektor Kepala — Administrasi Publik', tanggal: '1 Apr 2020' },
        { id: 'k4lk4', f1: 'Dr. Maya Indira', f2: 'SK Lektor Kepala No. 45678/2021', f3: 'Lektor Kepala — Kebijakan Publik', tanggal: '15 Jan 2021' },
        { id: 'k4lk5', f1: 'Dr. Reza Pratama', f2: 'SK Lektor Kepala No. 56789/2022', f3: 'Lektor Kepala — Ilmu Pemerintahan', tanggal: '1 Jul 2022' },
        { id: 'k4lk6', f1: 'Dr. Agus Setiawan', f2: 'SK Lektor Kepala No. 67890/2019', f3: 'Lektor Kepala — Administrasi Negara', tanggal: '15 Mar 2019' },
        { id: 'k4lk7', f1: 'Dr. Budi Santoso', f2: 'SK Lektor Kepala No. 78901/2020', f3: 'Lektor Kepala — Tata Kelola Pemerintahan', tanggal: '1 Jan 2020' },
        { id: 'k4lk8', f1: 'Dr. Wulandari Putri', f2: 'SK Lektor Kepala No. 89012/2021', f3: 'Lektor Kepala — Kebijakan Publik', tanggal: '15 Aug 2021' },
        { id: 'k4lk9', f1: 'Dr. Irfan Maulana', f2: 'SK Lektor Kepala No. 90123/2022', f3: 'Lektor Kepala — Administrasi Publik', tanggal: '1 Feb 2022' },
        { id: 'k4lk10', f1: 'Dr. Nurul Hidayah', f2: 'SK Lektor Kepala No. 01234/2020', f3: 'Lektor Kepala — Ilmu Pemerintahan', tanggal: '1 Jun 2020' },
        { id: 'k4lk11', f1: 'Dr. Hendra Wijaya', f2: 'SK Lektor Kepala No. 11234/2023', f3: 'Lektor Kepala — Administrasi Publik', tanggal: '15 Jan 2023' },
        { id: 'k4lk12', f1: 'Dr. Sri Mulyani', f2: 'SK Lektor Kepala No. 21234/2019', f3: 'Lektor Kepala — Administrasi Negara', tanggal: '1 Jul 2019' },
      ] },
      { id: 'k4_serdos', label: '% dosen bersertifikasi pendidik (Serdos/NRD)', unit: '%', current: 50, target: 75, weight: 0.20, hint: 'Upload sertifikat pendidik profesional (NRD) tiap dosen yang telah tersertifikasi', template: 'person', autoCompute: { mode: 'percent', denom: 30 }, entries: [
        { id: 'k4sd1', f1: 'Prof. Hery Santoso', f2: 'NRD 8810126801025001', f3: 'Serdos 2010 — Ilmu Administrasi', tanggal: '15 Des 2010' },
        { id: 'k4sd2', f1: 'Prof. Bambang Wicaksono', f2: 'NRD 8810237502014002', f3: 'Serdos 2008 — Ilmu Pemerintahan', tanggal: '10 Nov 2008' },
        { id: 'k4sd3', f1: 'Dr. Ratih Dewi Kusuma', f2: 'NRD 8810148401023003', f3: 'Serdos 2016 — Administrasi Publik', tanggal: '5 Jan 2016' },
        { id: 'k4sd4', f1: 'Dr. Maya Indira', f2: 'NRD 8810318502012004', f3: 'Serdos 2019 — Kebijakan Publik', tanggal: '20 Mar 2019' },
        { id: 'k4sd5', f1: 'Dr. Reza Pratama', f2: 'NRD 8810087901011005', f3: 'Serdos 2021 — Ilmu Pemerintahan', tanggal: '15 Jun 2021' },
        { id: 'k4sd6', f1: 'Dr. Ahmad Fauzi', f2: 'NRD 8810179301010006', f3: 'Serdos 2022 — Administrasi Publik', tanggal: '10 Jul 2022' },
        { id: 'k4sd7', f1: 'Dr. Siti Nuraini', f2: 'NRD 8810258902009007', f3: 'Serdos 2021 — Kebijakan Publik', tanggal: '25 Feb 2021' },
        { id: 'k4sd8', f1: 'Dr. Agus Setiawan', f2: 'NRD 8810129501008008', f3: 'Serdos 2018 — Administrasi Negara', tanggal: '12 Apr 2018' },
        { id: 'k4sd9', f1: 'Dr. Budi Santoso', f2: 'NRD 8810227801007009', f3: 'Serdos 2017 — Tata Kelola Pemerintahan', tanggal: '8 Aug 2017' },
        { id: 'k4sd10', f1: 'Dr. Wulandari Putri', f2: 'NRD 8810338901006010', f3: 'Serdos 2020 — Kebijakan Publik', tanggal: '20 Sep 2020' },
        { id: 'k4sd11', f1: 'Dr. Irfan Maulana', f2: 'NRD 8810049101005011', f3: 'Serdos 2022 — Administrasi Publik', tanggal: '15 Jan 2022' },
        { id: 'k4sd12', f1: 'Dr. Nurul Hidayah', f2: 'NRD 8810138401004012', f3: 'Serdos 2019 — Ilmu Pemerintahan', tanggal: '18 Mar 2019' },
        { id: 'k4sd13', f1: 'Dr. Fajar Kurniawan', f2: 'NRD 8810268901003013', f3: 'Serdos 2023 — Kebijakan Publik', tanggal: '5 Jul 2023' },
        { id: 'k4sd14', f1: 'Dr. Anisa Rahmawati', f2: 'NRD 8810058801002014', f3: 'Serdos 2021 — Administrasi Publik', tanggal: '22 Aug 2021' },
        { id: 'k4sd15', f1: 'Dr. Sri Mulyani', f2: 'NRD 8810117801001015', f3: 'Serdos 2015 — Administrasi Negara', tanggal: '30 Nov 2015' },
      ] },
      { id: 'k4_guru_besar', label: '% Guru Besar dari total DTPS — target LAMSPAK ≥10%', unit: '%', current: 13, target: 20, weight: 0.15, hint: 'Upload SK Guru Besar/Profesor dari Kemendikbud beserta SK pengangkatan aktif', template: 'person', autoCompute: { mode: 'percent', denom: 30 }, entries: [
        { id: 'k4gb1', f1: 'Prof. Hery Santoso', f2: 'SK Guru Besar No. 12345/M/2018', f3: 'Guru Besar Ilmu Administrasi Publik — NIDN 0012056801', tanggal: '1 Sep 2018' },
        { id: 'k4gb2', f1: 'Prof. Bambang Wicaksono', f2: 'SK Guru Besar No. 23456/M/2016', f3: 'Guru Besar Ilmu Pemerintahan — NIDN 0023047502', tanggal: '1 Mar 2016' },
        { id: 'k4gb3', f1: 'Prof. Dewi Ratnasari', f2: 'SK Guru Besar No. 34567/M/2020', f3: 'Guru Besar Kebijakan Publik — NIDN 0011067201', tanggal: '15 Jun 2020' },
        { id: 'k4gb4', f1: 'Prof. Eko Prasetyo', f2: 'SK Guru Besar No. 45678/M/2022', f3: 'Guru Besar Administrasi Negara — NIDN 0007068101', tanggal: '1 Jan 2022' },
      ] },
      { id: 'k4_bkd', label: '% dosen yang upload BKD tepat waktu semester ini', unit: '%', current: 80, target: 100, weight: 0.10, hint: 'Upload rekap BKD dari SISTER/sistem kepegawaian universitas per semester berjalan', template: 'person', autoCompute: { mode: 'percent', denom: 30 }, entries: [
        { id: 'k4bkd1', f1: 'Prof. Hery Santoso', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 28 Apr 2025', tanggal: '28 Apr 2025' },
        { id: 'k4bkd2', f1: 'Prof. Bambang Wicaksono', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 25 Apr 2025', tanggal: '25 Apr 2025' },
        { id: 'k4bkd3', f1: 'Dr. Ratih Dewi Kusuma', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 30 Apr 2025', tanggal: '30 Apr 2025' },
        { id: 'k4bkd4', f1: 'Dr. Maya Indira', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 29 Apr 2025', tanggal: '29 Apr 2025' },
        { id: 'k4bkd5', f1: 'Dr. Reza Pratama', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 27 Apr 2025', tanggal: '27 Apr 2025' },
        { id: 'k4bkd6', f1: 'Dr. Siti Nuraini', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 26 Apr 2025', tanggal: '26 Apr 2025' },
        { id: 'k4bkd7', f1: 'Dr. Fitri Handayani', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 28 Apr 2025', tanggal: '28 Apr 2025' },
        { id: 'k4bkd8', f1: 'Dr. Agus Setiawan', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 24 Apr 2025', tanggal: '24 Apr 2025' },
        { id: 'k4bkd9', f1: 'Dr. Budi Santoso', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 30 Apr 2025', tanggal: '30 Apr 2025' },
        { id: 'k4bkd10', f1: 'Dr. Wulandari Putri', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 22 Apr 2025', tanggal: '22 Apr 2025' },
        { id: 'k4bkd11', f1: 'Dr. Irfan Maulana', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 29 Apr 2025', tanggal: '29 Apr 2025' },
        { id: 'k4bkd12', f1: 'Dr. Nurul Hidayah', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 27 Apr 2025', tanggal: '27 Apr 2025' },
        { id: 'k4bkd13', f1: 'Dr. Fajar Kurniawan', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 25 Apr 2025', tanggal: '25 Apr 2025' },
        { id: 'k4bkd14', f1: 'Dr. Anisa Rahmawati', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 28 Apr 2025', tanggal: '28 Apr 2025' },
        { id: 'k4bkd15', f1: 'Dimas Aryo Wibowo', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 30 Apr 2025', tanggal: '30 Apr 2025' },
        { id: 'k4bkd16', f1: 'Nadia Putri Kusuma', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 26 Apr 2025', tanggal: '26 Apr 2025' },
        { id: 'k4bkd17', f1: 'Dr. Hendra Wijaya', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 29 Apr 2025', tanggal: '29 Apr 2025' },
        { id: 'k4bkd18', f1: 'Dr. Sri Mulyani', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 27 Apr 2025', tanggal: '27 Apr 2025' },
        { id: 'k4bkd19', f1: 'Dr. Andi Setiawan', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 30 Apr 2025', tanggal: '30 Apr 2025' },
        { id: 'k4bkd20', f1: 'Dr. Lestari Dewi', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 23 Apr 2025', tanggal: '23 Apr 2025' },
        { id: 'k4bkd21', f1: 'Dr. Prasetyo Nugroho', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 28 Apr 2025', tanggal: '28 Apr 2025' },
        { id: 'k4bkd22', f1: 'Dr. Sari Wijayanti', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 25 Apr 2025', tanggal: '25 Apr 2025' },
        { id: 'k4bkd23', f1: 'Prof. Dewi Ratnasari', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 24 Apr 2025', tanggal: '24 Apr 2025' },
        { id: 'k4bkd24', f1: 'Prof. Eko Prasetyo', f2: 'BKD Genap 2024/2025', f3: 'Upload via SISTER — 30 Apr 2025', tanggal: '30 Apr 2025' },
      ] },
    ],
    docs: [],
  },
  {
    kode: 'K5', label: 'Keuangan, Sarana & Prasarana',
    metrics: [
      { id: 'k5_dop', label: 'Dana Operasional Pendidikan (DOP) per mahasiswa/tahun — target BAN-PT ≥Rp20jt', unit: 'juta/mhs', current: 19, target: 20, weight: 0.35, hint: 'Upload laporan realisasi anggaran dengan komponen DOP yang dapat dihitung per mahasiswa aktif', template: 'document', entries: [
        { id: 'k5dop1', f1: 'Laporan Realisasi DIPA TA 2024 — Komponen DOP', f2: 'DIPA-042.01.2.400956/2024', f3: 'Total DOP terealisasi Rp 14,82 M; 780 mahasiswa aktif → Rp 19,0jt/mhs', tanggal: '31 Des 2024' },
        { id: 'k5dop2', f1: 'Rincian Komponen DOP: Honor, ATK, Utilitas, Sistem', f2: 'Lampiran II — DIPA Realisasi 2024', f3: 'Honor pengajar 62%, ATK & bahan ajar 18%, utilitas 12%, sistem informasi 8%', tanggal: '31 Des 2024' },
      ] },
      { id: 'k5_anggaran_riset', label: '% total anggaran departemen untuk penelitian dosen', unit: '%', current: 13, target: 15, weight: 0.25, hint: 'Upload RKA/DIPA yang memuat alokasi anggaran penelitian dengan kode akun terkait', template: 'document', entries: [
        { id: 'k5ar1', f1: 'RKA-KL DPP TA 2025 — Alokasi Penelitian', f2: 'RKA-KL/DPP/2025 — Kode Akun 521219', f3: 'Alokasi penelitian Rp 2,47 M dari total Rp 19 M (13,0%)', tanggal: '5 Jan 2025' },
        { id: 'k5ar2', f1: 'Realisasi Anggaran Penelitian Dosen TA 2024', f2: 'Laporan Realisasi Riset/DPP/2024', f3: 'Terserap Rp 2,3 M dari pagu Rp 2,4 M (95,8%); 12 judul penelitian', tanggal: '31 Des 2024' },
      ] },
      { id: 'k5_anggaran_pkm', label: '% total anggaran departemen untuk PkM dosen', unit: '%', current: 8, target: 10, weight: 0.20, hint: 'Upload RKA/DIPA yang memuat alokasi anggaran pengabdian masyarakat', template: 'document', entries: [
        { id: 'k5ap1', f1: 'RKA-KL DPP TA 2025 — Alokasi PkM', f2: 'RKA-KL/DPP/2025 — Kode Akun 521220', f3: 'Alokasi PkM Rp 1,52 M dari total Rp 19 M (8,0%)', tanggal: '5 Jan 2025' },
        { id: 'k5ap2', f1: 'Realisasi Anggaran PkM TA 2024', f2: 'Laporan Realisasi PkM/DPP/2024', f3: 'Terserap Rp 1,38 M dari pagu Rp 1,5 M (92%); 21 kegiatan PkM', tanggal: '31 Des 2024' },
      ] },
      { id: 'k5_ruang', label: 'Rasio luas ruang kuliah per mahasiswa aktif — standar 1,5 m²/mhs', unit: 'm²/mhs', current: 1.4, target: 1.5, weight: 0.20, hint: 'Upload inventarisasi ruang kuliah (luas, kapasitas) dan data mahasiswa aktif semester berjalan', template: 'document', entries: [
        { id: 'k5r1', f1: 'Inventarisasi Ruang Kuliah Gedung DPP 2025', f2: 'Inventaris Sarana/DPP/2025/01', f3: '8 ruang kuliah; total luas 868 m²; kapasitas rata-rata 45 kursi/ruang', tanggal: '10 Jan 2025' },
        { id: 'k5r2', f1: 'Data Mahasiswa Aktif Semester Genap 2024/2025', f2: 'SIAKAD Rekap Aktif/2025', f3: '620 mahasiswa aktif (S1+S2); rasio 868/620 = 1,40 m²/mhs', tanggal: '3 Feb 2025' },
      ] },
    ],
    docs: [
      { id: 'd_k5_1', nama: 'DIPA DPP TA 2025', tanggal: '5 Jan 2025', keterangan: 'Dokumen anggaran operasional tahun 2025, mencakup DOP, riset, dan PkM' },
    ],
  },
  {
    kode: 'K6', label: 'Pendidikan',
    metrics: [
      { id: 'k6_rps', label: '% mata kuliah dengan RPS/RPKPS lengkap dan disahkan', unit: '%', current: 80, target: 100, weight: 0.30, hint: 'Upload RPS/RPKPS semua mata kuliah yang telah disahkan Kaprodi; satu file per mata kuliah', template: 'document', entries: [
        { id: 'k6rps1', f1: 'Daftar RPS Disahkan — Program S1 TA 2024/2025', f2: 'Rekap RPS/S1/2025 — 40 mata kuliah', f3: '32 dari 40 MK S1 memiliki RPS lengkap & tersahkan (80%); 8 MK dalam proses revisi', tanggal: '25 Jul 2024' },
        { id: 'k6rps2', f1: 'Daftar RPS Disahkan — Program S2 TA 2024/2025', f2: 'Rekap RPS/S2/2025 — 24 mata kuliah', f3: '20 dari 24 MK S2 memiliki RPS lengkap & tersahkan (83%); 4 MK masih draft', tanggal: '25 Jul 2024' },
        { id: 'k6rps3', f1: 'Berita Acara Pengesahan RPS Oleh Kaprodi', f2: 'BA/Kaprodi/DPP/2024-I', f3: '52 RPS disahkan untuk TA 2024/2025; batas upload sistem akademik 31 Jul 2024', tanggal: '31 Jul 2024' },
      ] },
      { id: 'k6_edom', label: 'Rata-rata skor EDOM (Evaluasi Dosen oleh Mahasiswa)', unit: '/4.0', current: 3.0, target: 3.5, weight: 0.30, hint: 'Upload rekap hasil EDOM per semester dari sistem akademik, ditandatangani Kaprodi', template: 'document', entries: [
        { id: 'k6edom1', f1: 'Rekap EDOM Semester Ganjil 2024/2025', f2: 'EDOM/DPP/2024-Ganjil — 28 dosen', f3: 'Rata-rata skor EDOM: 2,95/4,00; terendah 2,60, tertinggi 3,70', tanggal: '15 Jan 2025' },
        { id: 'k6edom2', f1: 'Rekap EDOM Semester Genap 2023/2024', f2: 'EDOM/DPP/2024-Genap — 27 dosen', f3: 'Rata-rata skor EDOM: 3,05/4,00; tren naik 0,1 poin vs semester sebelumnya', tanggal: '30 Jun 2024' },
      ] },
      { id: 'k6_cpl', label: '% Capaian Pembelajaran Lulusan (CPL) terpenuhi per semester', unit: '%', current: 65, target: 90, weight: 0.25, hint: 'Upload matriks peta CPL ke mata kuliah dan bukti asesmen ketercapaian CPL per mata kuliah', template: 'document', entries: [
        { id: 'k6cpl1', f1: 'Matriks CPL → Mata Kuliah Program S1', f2: 'Matriks CPL/S1/DPP/2024', f3: '10 CPL terdefinisi; 6,5 rata-rata MK per CPL; ketercapaian terasesmen 65%', tanggal: '20 Agt 2024' },
        { id: 'k6cpl2', f1: 'Rekap Asesmen Ketercapaian CPL Semester Ganjil 2024/2025', f2: 'Rekap CPL/DPP/2025/01', f3: 'CPL 1–4 (kognitif): 72% terpenuhi; CPL 5–10 (keterampilan & sikap): 60% terpenuhi', tanggal: '25 Jan 2025' },
      ] },
      { id: 'k6_kurikulum', label: 'Keselarasan kurikulum dengan KKNI Level 6 dan profil lulusan', unit: '%', current: 70, target: 95, weight: 0.15, hint: 'Upload dokumen kurikulum lengkap dengan peta KKNI, profil lulusan, dan CPL yang disahkan Dekan', template: 'document', entries: [
        { id: 'k6kur1', f1: 'Dokumen Kurikulum S1 DPP 2022 (Berlaku)', f2: 'Kurikulum S1/DPP/2022 — disahkan Dekan', f3: 'Peta KKNI Level 6: 7 dari 10 poin tersertakan (70%); 3 poin dalam proses revisi kurikulum 2025', tanggal: '1 Sep 2022' },
        { id: 'k6kur2', f1: 'Draft Revisi Kurikulum S1 DPP 2025 — Peta KKNI', f2: 'Draft Kurikulum/DPP/2025 — v1.2', f3: 'Target 95% keselarasan KKNI; peta profil lulusan & CPL telah diperbarui', tanggal: '10 Mar 2025' },
      ] },
    ],
    docs: [],
  },
  {
    kode: 'K7', label: 'Penelitian',
    metrics: [
      { id: 'k7_pub_intl', label: 'Publikasi internasional per dosen DTPS per tahun — target LAMSPAK Unggul ≥0,5', unit: 'pub/dosen/thn', current: 0.38, target: 0.5, weight: 0.35, hint: 'Upload bukti publikasi (URL/DOI Scopus atau WoS) per dosen; sertakan nama dosen dan judul artikel', template: 'publication', autoCompute: { mode: 'ratio', denom: 30 }, entries: [
        { id: 'k7p1', f1: 'Prof. Hery Santoso', f2: 'Digital Governance in Regional Governments of Indonesia', f3: '10.1080/14719037.2025.2001234', tanggal: '15 Mar 2025' },
        { id: 'k7p2', f1: 'Prof. Bambang Wicaksono', f2: 'Bureaucratic Resilience Post-Pandemic: Evidence from Indonesian Cities', f3: '10.1177/0020852325001234', tanggal: '20 Jan 2025' },
        { id: 'k7p3', f1: 'Dr. Ratih Dewi Kusuma', f2: 'Public Participation in Digital Era: A Comparative Study', f3: '10.1016/j.giq.2025.101876', tanggal: '5 Feb 2025' },
        { id: 'k7p4', f1: 'Dr. Maya Indira', f2: 'Local Fiscal Policy and Regional Economic Growth in Java', f3: '10.1007/s11115-025-00601-2', tanggal: '12 Apr 2025' },
        { id: 'k7p5', f1: 'Dr. Reza Pratama', f2: 'Administrative Reform in Indonesian Municipal Governments', f3: '10.1093/jopart/muac025', tanggal: '3 Mar 2025' },
        { id: 'k7p6', f1: 'Prof. Hery Santoso', f2: 'E-Governance Framework Evaluation in Local Governments', f3: '10.1108/IJPSM-2025-0001', tanggal: '22 Feb 2025' },
        { id: 'k7p7', f1: 'Prof. Bambang Wicaksono', f2: 'Public Sector Innovation Diffusion in Developing Countries', f3: '10.1080/09540962.2025.001234', tanggal: '10 Apr 2025' },
        { id: 'k7p8', f1: 'Dr. Ratih Dewi Kusuma', f2: 'Digital Service Quality and Citizen Satisfaction in Public Sector', f3: '10.1177/0095399725001234', tanggal: '28 Jan 2025' },
        { id: 'k7p9', f1: 'Dr. Ahmad Fauzi', f2: 'Grassroots Democracy and Village Governance in Indonesia', f3: '10.1016/j.polsoc.2025.100234', tanggal: '18 Mar 2025' },
        { id: 'k7p10', f1: 'Dr. Maya Indira', f2: 'Tax Revenue Decentralization and Subnational Government Performance', f3: '10.1007/s10611-025-10001-2', tanggal: '7 Apr 2025' },
        { id: 'k7p11', f1: 'Dr. Siti Nuraini', f2: 'Gender Responsive Budgeting Implementation in Indonesian Local Governments', f3: '10.1093/pa/gqad025', tanggal: '25 Mar 2025' },
      ] },
      { id: 'k7_pct_intl', label: '% dosen DTPS dengan minimal 1 publikasi internasional/tahun', unit: '%', current: 50, target: 70, weight: 0.25, hint: 'Upload daftar dosen beserta link publikasi internasionalnya (Scopus/WoS/Google Scholar terverifikasi)', template: 'person', autoCompute: { mode: 'percent', denom: 30 }, entries: [
        { id: 'k7pct1', f1: 'Prof. Hery Santoso', f2: 'Scopus ID: 57196234501', f3: 'scholar.google.com/citations?user=hery_santoso', tanggal: 'Apr 2025' },
        { id: 'k7pct2', f1: 'Prof. Bambang Wicaksono', f2: 'Scopus ID: 57197345612', f3: 'scholar.google.com/citations?user=bambang_w', tanggal: 'Apr 2025' },
        { id: 'k7pct3', f1: 'Dr. Ratih Dewi Kusuma', f2: 'Scopus ID: 57198456723', f3: 'scholar.google.com/citations?user=ratih_dk', tanggal: 'Apr 2025' },
        { id: 'k7pct4', f1: 'Dr. Maya Indira', f2: 'Scopus ID: 57199567834', f3: 'scholar.google.com/citations?user=maya_indira', tanggal: 'Apr 2025' },
        { id: 'k7pct5', f1: 'Dr. Reza Pratama', f2: 'Scopus ID: 57200678945', f3: 'scholar.google.com/citations?user=reza_p', tanggal: 'Apr 2025' },
        { id: 'k7pct6', f1: 'Dr. Ahmad Fauzi', f2: 'Scopus ID: 57201789056', f3: 'scholar.google.com/citations?user=ahmad_fauzi', tanggal: 'Apr 2025' },
        { id: 'k7pct7', f1: 'Dr. Siti Nuraini', f2: 'Scopus ID: 57202890167', f3: 'scholar.google.com/citations?user=siti_n', tanggal: 'Apr 2025' },
        { id: 'k7pct8', f1: 'Dr. Agus Setiawan', f2: 'Scopus ID: 57203901278', f3: 'scholar.google.com/citations?user=agus_s', tanggal: 'Apr 2025' },
        { id: 'k7pct9', f1: 'Dr. Budi Santoso', f2: 'Scopus ID: 57204012389', f3: 'scholar.google.com/citations?user=budi_s', tanggal: 'Apr 2025' },
        { id: 'k7pct10', f1: 'Dr. Wulandari Putri', f2: 'Scopus ID: 57205123490', f3: 'scholar.google.com/citations?user=wulandari_p', tanggal: 'Apr 2025' },
        { id: 'k7pct11', f1: 'Dr. Irfan Maulana', f2: 'Scopus ID: 57206234501', f3: 'scholar.google.com/citations?user=irfan_m', tanggal: 'Apr 2025' },
        { id: 'k7pct12', f1: 'Dr. Nurul Hidayah', f2: 'Scopus ID: 57207345612', f3: 'scholar.google.com/citations?user=nurul_h', tanggal: 'Apr 2025' },
        { id: 'k7pct13', f1: 'Dr. Fajar Kurniawan', f2: 'Scopus ID: 57208456723', f3: 'scholar.google.com/citations?user=fajar_k', tanggal: 'Apr 2025' },
        { id: 'k7pct14', f1: 'Prof. Dewi Ratnasari', f2: 'Scopus ID: 57209567834', f3: 'scholar.google.com/citations?user=dewi_r', tanggal: 'Apr 2025' },
        { id: 'k7pct15', f1: 'Prof. Eko Prasetyo', f2: 'Scopus ID: 57210678945', f3: 'scholar.google.com/citations?user=eko_p', tanggal: 'Apr 2025' },
      ] },
      { id: 'k7_hki', label: 'Jumlah HKI aktif (paten dan hak cipta) 3 tahun terakhir', unit: 'HKI', current: 3, target: 6, weight: 0.20, hint: 'Upload sertifikat HKI dari Kemenkumham beserta nomor registrasi dan tanggal penerbitan', template: 'document', autoCompute: { mode: 'count' }, entries: [
        { id: 'k7hki1', f1: 'Model Tata Kelola Digital Daerah', f2: 'EC00202412345', f3: 'Hak Cipta — Kemenkumham, atas nama Prof. Hery Santoso', tanggal: '15 Jun 2024' },
        { id: 'k7hki2', f1: 'Sistem Monitoring Partisipasi Publik Berbasis Data', f2: 'EC00202398765', f3: 'Hak Cipta — Kemenkumham, atas nama Dr. Ratih Dewi Kusuma', tanggal: '20 Sep 2023' },
        { id: 'k7hki3', f1: 'Metode Evaluasi Kinerja Birokrasi Digital', f2: 'EC00202378901', f3: 'Hak Cipta — Kemenkumham, atas nama Prof. Bambang Wicaksono', tanggal: '5 Jan 2023' },
      ] },
      { id: 'k7_hibah', label: 'Jumlah hibah penelitian eksternal yang sedang berjalan', unit: 'hibah', current: 4, target: 7, weight: 0.20, hint: 'Upload kontrak/SK hibah penelitian aktif dari LPDP, Kemdiktisaintek, LLDIKTI, atau mitra industri', template: 'contract', autoCompute: { mode: 'count' }, entries: [
        { id: 'k7g1', f1: 'Riset Tata Kelola Digital Daerah', f2: '031/E5/PG.02.00.PT/2025', f3: 'Kemdiktisaintek — Rp 285jt, 2025–2026', tanggal: '1 Feb 2025' },
        { id: 'k7g2', f1: 'Ketahanan Birokrasi Pasca-Pandemi', f2: 'LPDP-PD/2024/001234', f3: 'LPDP — Rp 450jt, 2024–2026', tanggal: '15 Jan 2024' },
        { id: 'k7g3', f1: 'Model Partisipasi Publik Digital', f2: '032/E5/PG.02.00.PT/2025', f3: 'Kemdiktisaintek — Rp 190jt, 2025–2026', tanggal: '1 Feb 2025' },
        { id: 'k7g4', f1: 'Reformasi Administrasi Publik Digital', f2: '045/E5/PG.02.00.PT/2024', f3: 'Kemdiktisaintek — Rp 175jt, 2024–2025', tanggal: '10 Mar 2024' },
      ] },
    ],
    docs: [
      { id: 'd_k7_1', nama: 'Rekap Publikasi Dosen Jan–Apr 2025', tanggal: '1 Apr 2025', keterangan: 'Publikasi terindeks Scopus & SINTA, 11 artikel dari 30 dosen DTPS' },
      { id: 'd_k7_2', nama: 'Kontrak Hibah Kemdiktisaintek — Dr. Ratih 2025', tanggal: '10 Feb 2025', keterangan: 'Hibah skema PDP, nilai Rp 190jt, periode 2025–2026' },
    ],
  },
  {
    kode: 'K8', label: 'PkM',
    metrics: [
      { id: 'k8_kegiatan', label: 'Rata-rata kegiatan PkM per dosen DTPS per tahun', unit: 'keg/dosen/thn', current: 0.7, target: 1.0, weight: 0.35, hint: 'Upload laporan kegiatan PkM per dosen (judul, lokasi, tanggal, mitra, output kegiatan)', template: 'document', entries: [
        { id: 'k8kg1', f1: 'Rekap Kegiatan PkM Dosen TA 2024/2025', f2: 'Rekap PkM/DPP/2025/04', f3: '21 kegiatan PkM dari 30 dosen DTPS; rata-rata 0,70 keg/dosen/thn', tanggal: '15 Apr 2025' },
        { id: 'k8kg2', f1: 'Laporan Akhir PkM — Penguatan Tata Kelola Desa Binaan', f2: 'PkM/DPP/2024/KAB-SLM-001', f3: 'Lokasi: Desa Sariharjo, Sleman; mitra: Pemdes; 12 kegiatan workshop', tanggal: '30 Nov 2024' },
        { id: 'k8kg3', f1: 'Laporan Akhir PkM — Pendampingan e-Government Kabupaten', f2: 'PkM/DPP/2024/KAB-BTL-002', f3: 'Lokasi: Kab. Bantul; mitra: Dinkominfo; 3 sesi pelatihan, 120 peserta PNS', tanggal: '15 Des 2024' },
      ] },
      { id: 'k8_pct_dosen', label: '% dosen DTPS yang melaksanakan minimal 1 PkM per tahun', unit: '%', current: 60, target: 80, weight: 0.30, hint: 'Upload daftar dosen yang telah melaksanakan PkM beserta bukti laporan akhir kegiatan', template: 'person', autoCompute: { mode: 'percent', denom: 30 }, entries: [
        { id: 'k8pd1', f1: 'Prof. Hery Santoso', f2: 'SK PkM No. 01/DPP/2024', f3: 'PkM: Penguatan Tata Kelola Digital Pemda DIY', tanggal: 'Mar 2024' },
        { id: 'k8pd2', f1: 'Prof. Bambang Wicaksono', f2: 'SK PkM No. 02/DPP/2024', f3: 'PkM: Reformasi Birokrasi Kabupaten Sleman', tanggal: 'Apr 2024' },
        { id: 'k8pd3', f1: 'Dr. Ratih Dewi Kusuma', f2: 'SK PkM No. 03/DPP/2024', f3: 'PkM: Pelatihan Partisipasi Publik Digital, Kota Yogyakarta', tanggal: 'Mei 2024' },
        { id: 'k8pd4', f1: 'Dr. Maya Indira', f2: 'SK PkM No. 04/DPP/2024', f3: 'PkM: Pendampingan Anggaran Responsif Gender Bantul', tanggal: 'Mar 2024' },
        { id: 'k8pd5', f1: 'Dr. Reza Pratama', f2: 'SK PkM No. 05/DPP/2024', f3: 'PkM: Penguatan Kapasitas DPRD Kabupaten Gunungkidul', tanggal: 'Apr 2024' },
        { id: 'k8pd6', f1: 'Dr. Ahmad Fauzi', f2: 'SK PkM No. 06/DPP/2024', f3: 'PkM: Pendampingan Pemerintah Desa Berbasis Data, Sleman', tanggal: 'Jun 2024' },
        { id: 'k8pd7', f1: 'Dr. Siti Nuraini', f2: 'SK PkM No. 07/DPP/2024', f3: 'PkM: Sosialisasi Gender Responsive Budgeting, Kemenpppa', tanggal: 'Mei 2024' },
        { id: 'k8pd8', f1: 'Dr. Agus Setiawan', f2: 'SK PkM No. 08/DPP/2024', f3: 'PkM: Pelatihan SOP Desa, Kab. Kulon Progo', tanggal: 'Jul 2024' },
        { id: 'k8pd9', f1: 'Dr. Budi Santoso', f2: 'SK PkM No. 09/DPP/2024', f3: 'PkM: Pendampingan e-Gov Kab. Bantul — Dinkominfo', tanggal: 'Agt 2024' },
        { id: 'k8pd10', f1: 'Dr. Wulandari Putri', f2: 'SK PkM No. 10/DPP/2024', f3: 'PkM: Evaluasi Pelayanan Publik RS Pemerintah DIY', tanggal: 'Sep 2024' },
        { id: 'k8pd11', f1: 'Dr. Irfan Maulana', f2: 'SK PkM No. 11/DPP/2024', f3: 'PkM: Monev Program Prioritas Bupati Sleman', tanggal: 'Okt 2024' },
        { id: 'k8pd12', f1: 'Dr. Nurul Hidayah', f2: 'SK PkM No. 12/DPP/2024', f3: 'PkM: Penguatan BUMDES, Kab. Sleman', tanggal: 'Nov 2024' },
        { id: 'k8pd13', f1: 'Dr. Fajar Kurniawan', f2: 'SK PkM No. 13/DPP/2024', f3: 'PkM: Literasi Digital Aparatur Desa, Kab. Bantul', tanggal: 'Okt 2024' },
        { id: 'k8pd14', f1: 'Prof. Dewi Ratnasari', f2: 'SK PkM No. 14/DPP/2024', f3: 'PkM: Konsultasi Kebijakan Pendidikan Kota Yogyakarta', tanggal: 'Mei 2024' },
        { id: 'k8pd15', f1: 'Prof. Eko Prasetyo', f2: 'SK PkM No. 15/DPP/2024', f3: 'PkM: Penguatan Kelembagaan KPID DIY', tanggal: 'Jun 2024' },
        { id: 'k8pd16', f1: 'Dr. Hendra Kusuma', f2: 'SK PkM No. 16/DPP/2024', f3: 'PkM: Pelatihan Manajemen Konflik ASN, BKD Sleman', tanggal: 'Jul 2024' },
        { id: 'k8pd17', f1: 'Dr. Anisa Fitriani', f2: 'SK PkM No. 17/DPP/2024', f3: 'PkM: Advokasi Kebijakan Perlindungan Buruh Migran DIY', tanggal: 'Agt 2024' },
        { id: 'k8pd18', f1: 'Dr. Galih Prasetya', f2: 'SK PkM No. 18/DPP/2024', f3: 'PkM: Monitoring Kinerja OPD Berbasis Aplikasi, Kota Yogya', tanggal: 'Sep 2024' },
      ] },
      { id: 'k8_dana', label: 'Total dana PkM dari sumber eksternal per tahun', unit: 'juta/thn', current: 65, target: 100, weight: 0.20, hint: 'Upload kontrak PkM berbiaya eksternal (LPDP, Kemdiktisaintek, Pemda, BUMN, dll.) beserta nilainya', template: 'contract', entries: [
        { id: 'k8d1', f1: 'PkM Penguatan e-Government Pemda DIY', f2: 'Kontrak PkM/DIY/2024/005', f3: 'Pemda DIY — Rp 25jt, Jan–Des 2024', tanggal: '10 Jan 2024' },
        { id: 'k8d2', f1: 'PkM Pendampingan BUMDES Kabupaten Sleman', f2: 'Kontrak PkM/SLEMAN/2024/012', f3: 'Pemkab Sleman — Rp 20jt, Mar–Nov 2024', tanggal: '1 Mar 2024' },
        { id: 'k8d3', f1: 'PkM Literasi Digital Aparatur Daerah', f2: '033/E5/PkM.02/2024', f3: 'Kemdiktisaintek (PkM Prioritas) — Rp 20jt, Apr–Des 2024', tanggal: '15 Apr 2024' },
      ] },
      { id: 'k8_output', label: 'Output PkM yang dipublikasikan (artikel/prosiding/buku/TTG) per tahun', unit: 'output/thn', current: 8, target: 12, weight: 0.15, hint: 'Upload bukti publikasi output PkM: jurnal pengabdian ber-ISSN, ISBN buku, atau sertifikat TTG', template: 'publication', autoCompute: { mode: 'count' }, entries: [
        { id: 'k8op1', f1: 'Dr. Ratih Dewi Kusuma', f2: 'Penguatan Partisipasi Publik Digital: Pengalaman Kota Yogyakarta', f3: 'Jurnal Pengabdian kepada Masyarakat UGM, Vol.9 No.1 2024, ISSN 2477-5347', tanggal: 'Mar 2024' },
        { id: 'k8op2', f1: 'Dr. Ahmad Fauzi', f2: 'Pendampingan Desa Berbasis Data: Replikasi Model Desa Mandiri Digital', f3: 'Seminar Nasional Administrasi Publik 2024, Prosiding ISBN 978-602-5428-22-1', tanggal: 'Jun 2024' },
        { id: 'k8op3', f1: 'Prof. Hery Santoso', f2: 'Tata Kelola Digital Pemerintah Daerah: Panduan Praktis', f3: 'Penerbit UGM Press, ISBN 978-602-386-210-4', tanggal: 'Agt 2024' },
        { id: 'k8op4', f1: 'Dr. Siti Nuraini', f2: 'Gender Responsive Budgeting di Pemerintah Daerah: Studi Kasus Bantul', f3: 'Jurnal Ilmu Administrasi Publik JISIP, Vol.12 No.2 2024, ISSN 2599-3593', tanggal: 'Sep 2024' },
        { id: 'k8op5', f1: 'Dr. Budi Santoso', f2: 'Evaluasi e-Government: Kasus Implementasi Sistem e-Perizinan Bantul', f3: 'Prosiding Seminar Nasional e-Government 2024, ISBN 978-623-6931-10-5', tanggal: 'Okt 2024' },
        { id: 'k8op6', f1: 'Dr. Wulandari Putri', f2: 'Inovasi Layanan Publik Berbasis Teknologi di Rumah Sakit Pemerintah', f3: 'Jurnal Manajemen Pelayanan Publik, Vol.7 No.3 2024, ISSN 2614-4573', tanggal: 'Nov 2024' },
        { id: 'k8op7', f1: 'Dr. Fajar Kurniawan', f2: 'Peningkatan Literasi Digital Aparatur Desa: Model dan Implementasi', f3: 'Jurnal Ilmu Pemerintahan dan Kebijakan Publik, Vol.5 No.2 2024, ISSN 2657-0025', tanggal: 'Des 2024' },
        { id: 'k8op8', f1: 'Prof. Eko Prasetyo', f2: 'Penguatan Kelembagaan KPID: Regulasi dan Implementasi', f3: 'Jurnal Ilmu Komunikasi dan Kebijakan Publik, Vol.3 No.1 2025, ISSN 2830-4519', tanggal: 'Jan 2025' },
      ] },
    ],
    docs: [],
  },
  {
    kode: 'K9', label: 'Keluaran Tridarma',
    metrics: [
      { id: 'k9_ipk', label: 'IPK rata-rata lulusan 3 tahun terakhir — target ≥3,50', unit: '/4.0', current: 3.42, target: 3.60, weight: 0.20, hint: 'Upload rekap transkrip nilai rata-rata lulusan 3 tahun terakhir dari SIAKAD universitas', template: 'document', entries: [
        { id: 'k9ipk1', f1: 'Rekap IPK Lulusan S1 TA 2022/2023', f2: 'SIAKAD Rekap IPK/S1/2023 — 165 lulusan', f3: 'IPK rata-rata: 3,41; terendah 2,84; tertinggi 3,87', tanggal: '30 Sep 2023' },
        { id: 'k9ipk2', f1: 'Rekap IPK Lulusan S1 TA 2023/2024', f2: 'SIAKAD Rekap IPK/S1/2024 — 178 lulusan', f3: 'IPK rata-rata: 3,43; terendah 2,91; tertinggi 3,94', tanggal: '30 Sep 2024' },
        { id: 'k9ipk3', f1: 'Rekap IPK Lulusan S2 TA 2022–2024', f2: 'SIAKAD Rekap IPK/S2/2024 — 94 lulusan', f3: 'IPK rata-rata: 3,41; rata-rata gabungan S1+S2: 3,42', tanggal: '30 Sep 2024' },
      ] },
      { id: 'k9_ptw', label: 'Kelulusan Tepat Waktu (PTW) — target BAN-PT ≥50%, Unggul ≥80%', unit: '%', current: 55, target: 80, weight: 0.25, hint: 'Upload data kelulusan per angkatan dan bukti monitoring masa studi mahasiswa', template: 'document', entries: [
        { id: 'k9ptw1', f1: 'Data PTW Angkatan S1 2019 (4 tahun studi)', f2: 'SIAKAD Rekap Sidang/2023 — Angkatan 2019', f3: '102 lulus tepat waktu dari 188 mahasiswa (54,3%); batas: 8 semester', tanggal: '30 Sep 2023' },
        { id: 'k9ptw2', f1: 'Data PTW Angkatan S1 2020 (4 tahun studi)', f2: 'SIAKAD Rekap Sidang/2024 — Angkatan 2020', f3: '97 lulus tepat waktu dari 176 mahasiswa (55,1%); tren meningkat', tanggal: '30 Sep 2024' },
        { id: 'k9ptw3', f1: 'Laporan Monitoring Masa Studi dan Faktor Keterlambatan', f2: 'Laporan LS No. LS/DPP/2025/02', f3: 'Faktor utama keterlambatan: tesis/skripsi (60%), cuti akademik (25%), nilai tidak memenuhi (15%)', tanggal: '15 Jan 2025' },
      ] },
      { id: 'k9_masa_tunggu', label: '% lulusan dengan masa tunggu kerja pertama ≤6 bulan (IKU 1)', unit: '%', current: 40, target: 70, weight: 0.25, hint: 'Upload rekap tracer study DIKTI yang memuat data masa tunggu kerja lulusan per angkatan', template: 'document', entries: [
        { id: 'k9mt1', f1: 'Tracer Study DIKTI Lulusan 2022 — Data Masa Tunggu', f2: 'TS/DPP/2023 — Lampiran Masa Tunggu', f3: '77 dari 201 responden mendapat kerja ≤6 bln (38,3%); rerata masa tunggu 7,8 bulan', tanggal: '30 Jun 2023' },
        { id: 'k9mt2', f1: 'Tracer Study DIKTI Lulusan 2023 — Data Masa Tunggu', f2: 'TS/DPP/2024 — Lampiran Masa Tunggu', f3: '87 dari 218 responden mendapat kerja ≤6 bln (39,9%); sudah memasukkan lulusan S2', tanggal: '30 Jun 2024' },
      ] },
      { id: 'k9_kerja_relevan', label: '% lulusan yang bekerja di bidang relevan dengan prodi', unit: '%', current: 60, target: 80, weight: 0.15, hint: 'Upload laporan tracer study dengan klasifikasi kesesuaian pekerjaan dengan bidang ilmu', template: 'document', entries: [
        { id: 'k9kr1', f1: 'Tracer Study DIKTI 2023 — Tabel Klasifikasi Pekerjaan', f2: 'TS/DPP/2023 — Tabel Relevansi', f3: '118 dari 201 responden bekerja di bidang relevan (58,7%); bidang: PNS 45%, konsultan 15%', tanggal: '30 Jun 2023' },
        { id: 'k9kr2', f1: 'Tracer Study DIKTI 2024 — Tabel Klasifikasi Pekerjaan', f2: 'TS/DPP/2024 — Tabel Relevansi', f3: '133 dari 218 responden bekerja di bidang relevan (61,0%); tambah kategori NGO & think tank', tanggal: '30 Jun 2024' },
      ] },
      { id: 'k9_tracer', label: 'Response rate tracer study tahunan — target DIKTI ≥30%, Unggul ≥60%', unit: '%', current: 30, target: 60, weight: 0.15, hint: 'Upload bukti pelaksanaan tracer study (undangan, form digital, rekap responden) per tahun', template: 'document', entries: [
        { id: 'k9ts1', f1: 'Bukti Pelaksanaan Tracer Study 2024 — Undangan & Form Digital', f2: 'TS/DPP/2024 — Bukti Pelaksanaan', f3: '218 responden dari 723 target lulusan 2023 (30,2%); form via IKATEMA UGM', tanggal: '30 Jun 2024' },
        { id: 'k9ts2', f1: 'Rekap Responden Tracer Study 2024 per Program Studi', f2: 'TS/DPP/2024 — Rekap Responden', f3: 'S1: 178 responden (28,4%); S2: 40 responden (42,6%); gabungan 30,2%', tanggal: '30 Jun 2024' },
        { id: 'k9ts3', f1: 'Rencana Peningkatan Response Rate Tracer Study 2025', f2: 'Rencana Aksi TS/DPP/2025', f3: 'Target 45% via WhatsApp blast + alumni ambassador; jadwal: Mei–Jun 2025', tanggal: '20 Jan 2025' },
      ] },
    ],
    docs: [],
  },
]
