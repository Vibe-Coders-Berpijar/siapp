// ── Types ─────────────────────────────────────────────────────────────────────

export type LetterStatus    = "Draft" | "Menunggu" | "Ditandatangani" | "Diarsipkan";
export type LetterDirection = "masuk" | "keluar";
export type LetterCategory  = "undangan" | "keputusan" | "tugas" | "keterangan" | "permohonan" | "pemberitahuan" | "lainnya";
export type ApprovalStep    = 0 | 1 | 2 | 3 | 4; // 0=draft,1=submitted,2=reviewed,3=signed,4=archived
export type BookingStatus   = "Menunggu" | "Dikonfirmasi" | "Ditolak";

export interface AuditEntry {
  aksi: string;
  oleh: string;
  waktu: string;
}

export interface Letter {
  id: number;
  nomor: string;
  direction: LetterDirection;
  category: LetterCategory;
  perihal: string;
  tujuan: string;
  pengirim: string;
  tanggal: string;
  status: LetterStatus;
  approvalStep: ApprovalStep;
  isi: string;
  auditLog: AuditEntry[];
  workflowInstanceId?: string;
}

export interface LetterTemplate {
  id: number;
  name: string;
  category: LetterCategory;
  subject: string;
  body: string;
}

export interface Publication {
  id: number;
  judul: string;
  penulis: string;
  jurnal: string;
  tahun: number;
  tipe: string;
  doi: string;
  status: string;
}

export interface Student {
  id: number;
  nim: string;
  nama: string;
  program: string;
  angkatan: number;
  ipk: number;
  status: string;
}

export interface Booking {
  id: number;
  ruangan: string;
  pemohon: string;
  tanggal: string;
  waktuMulai: string;
  waktuSelesai: string;
  keperluan: string;
  status: BookingStatus;
}

export type NotulensiLabel = "Departemen" | "Prodi" | "General" | "Lainnya";
export type NotulensiAkses = "anggota" | "publik";

export interface NotulensiItem {
  id: number;
  judul: string;
  tanggal: string;
  tempat: string;
  pimpinanRapat: string;
  peserta: string[];
  anggota: string[];          // who can access this document
  akses: NotulensiAkses;      // "anggota" = members only, "publik" = visible to all
  label: NotulensiLabel;
  agenda: string[];
  keputusan: string[];
  tindakLanjut: { item: string; penanggungJawab: string; tenggat: string }[];
  status: "Draft" | "Disetujui";
}

export interface CalendarEvent {
  id: number;
  judul: string;
  tanggal: string;
  tanggalAkhir?: string;
  waktuMulai: string;
  waktuSelesai: string;
  tipe: "rapat" | "seminar" | "kuliah_umum" | "akreditasi" | "lainnya";
  lokasi: string;
  penyelenggara: string;
  deskripsi?: string;
}

export interface RenstraGoal {
  id: number;
  tujuan: string;
  indikator: string[];
  target2030: string;
  capaian: number;
}

export interface Renstra {
  id: number;
  periodeMulai: number;
  periodeAkhir: number;
  visi: string;
  misi: string[];
  tujuanStrategis: RenstraGoal[];
  isActive: boolean;
}

export interface RenjaKpi {
  indikator: string;
  target: number | string;
  realisasi: number | string;
  satuan: string;
}

export interface RenjaProgram {
  nama: string;
  kpis: RenjaKpi[];
  anggaranJuta: number;
  realisasiJuta: number;
}

export interface Renja {
  id: number;
  renstraId: number;
  tahun: number;
  status: "draft" | "approved" | "active" | "closed";
  program: RenjaProgram[];
}

export interface SopItem {
  id: number;
  judul: string;
  kategori: string;
  nomor: string;
  versi: number;
  tanggalEfektif: string;
  ringkasan: string;
  langkah: string[];
  unitPenanggungJawab: string;
  isActive: boolean;
}

// ── Letters (12 keluar + 4 masuk) ────────────────────────────────────────────

export const letters: Letter[] = [
  {
    id: 1, direction: "keluar", category: "undangan",
    nomor: "B/001/UN1.SIPSO/HM/2026",
    perihal: "Undangan Seminar Internasional Agronomi",
    tujuan: "Prof. Dr. Ahmad Fauzi, M.Si.", pengirim: "Ketua DPP UGM",
    tanggal: "2026-01-15", status: "Diarsipkan", approvalStep: 4,
    isi: "Dengan hormat, kami mengundang Bapak untuk hadir dalam seminar internasional agronomi yang diselenggarakan pada 20 Februari 2026 di Gedung PAU UGM.",
    auditLog: [
      { aksi: "Dibuat", oleh: "Rina Kusuma", waktu: "2026-01-15 08:00" },
      { aksi: "Dikirim ke Sekdep", oleh: "Rina Kusuma", waktu: "2026-01-15 08:05" },
      { aksi: "Direview Sekdep", oleh: "Dr. Hendra Wijaya", waktu: "2026-01-15 10:30" },
      { aksi: "Ditandatangani Kadep", oleh: "Prof. Dr. Sari Indah", waktu: "2026-01-15 14:15" },
      { aksi: "Diarsipkan", oleh: "Sistem", waktu: "2026-01-15 14:20" },
    ],
  },
  {
    id: 2, direction: "keluar", category: "permohonan",
    nomor: "B/002/UN1.SIPSO/HM/2026",
    perihal: "Permohonan Dana Penelitian Tahap II",
    tujuan: "Direktur Riset dan Pengabdian Masyarakat UGM", pengirim: "Ketua DPP UGM",
    tanggal: "2026-01-22", status: "Diarsipkan", approvalStep: 4,
    isi: "Dengan hormat, bersama ini kami mengajukan permohonan pencairan dana penelitian tahap II sesuai kontrak nomor 010/DRPM/2025.",
    auditLog: [
      { aksi: "Dibuat", oleh: "Budi Santoso", waktu: "2026-01-22 09:00" },
      { aksi: "Dikirim ke Sekdep", oleh: "Budi Santoso", waktu: "2026-01-22 09:05" },
      { aksi: "Direview Sekdep", oleh: "Dr. Hendra Wijaya", waktu: "2026-01-23 08:45" },
      { aksi: "Ditandatangani Kadep", oleh: "Prof. Dr. Sari Indah", waktu: "2026-01-23 13:00" },
      { aksi: "Diarsipkan", oleh: "Sistem", waktu: "2026-01-23 13:05" },
    ],
  },
  {
    id: 3, direction: "keluar", category: "pemberitahuan",
    nomor: "B/003/UN1.SIPSO/HM/2026",
    perihal: "Pemberitahuan Jadwal Ujian Komprehensif",
    tujuan: "Seluruh Dosen Penguji DPP UGM", pengirim: "Sekretariat DPP UGM",
    tanggal: "2026-02-01", status: "Ditandatangani", approvalStep: 3,
    isi: "Dengan hormat, diberitahukan bahwa ujian komprehensif untuk mahasiswa semester akhir akan dilaksanakan mulai 15–28 Februari 2026.",
    auditLog: [
      { aksi: "Dibuat", oleh: "Rina Kusuma", waktu: "2026-02-01 08:30" },
      { aksi: "Dikirim ke Sekdep", oleh: "Rina Kusuma", waktu: "2026-02-01 08:35" },
      { aksi: "Direview Sekdep", oleh: "Dr. Hendra Wijaya", waktu: "2026-02-01 11:00" },
      { aksi: "Ditandatangani Kadep", oleh: "Prof. Dr. Sari Indah", waktu: "2026-02-02 09:00" },
    ],
  },
  {
    id: 4, direction: "keluar", category: "undangan",
    nomor: "B/004/UN1.SIPSO/HM/2026",
    perihal: "Undangan Rapat Koordinasi Kurikulum 2026",
    tujuan: "Ketua Program Studi DPP UGM", pengirim: "Wakil Ketua Bidang Akademik",
    tanggal: "2026-02-10", status: "Menunggu", approvalStep: 2,
    isi: "Dengan hormat, mengundang Bapak/Ibu untuk hadir dalam rapat koordinasi penyusunan kurikulum tahun 2026.",
    auditLog: [
      { aksi: "Dibuat", oleh: "Dewi Lestari", waktu: "2026-02-10 14:00" },
      { aksi: "Dikirim ke Sekdep", oleh: "Dewi Lestari", waktu: "2026-02-10 14:05" },
      { aksi: "Direview Sekdep — menunggu Kadep", oleh: "Dr. Hendra Wijaya", waktu: "2026-02-11 09:00" },
    ],
  },
  {
    id: 5, direction: "keluar", category: "keterangan",
    nomor: "B/005/UN1.SIPSO/HM/2026",
    perihal: "Permohonan Cuti Akademik Mahasiswa",
    tujuan: "Wakil Rektor Bidang Akademik UGM", pengirim: "Ketua DPP UGM",
    tanggal: "2026-02-14", status: "Menunggu", approvalStep: 1,
    isi: "Dengan hormat, meneruskan permohonan cuti akademik mahasiswa atas nama Raditya Pratama (NIM: 22/DPP/00045).",
    auditLog: [
      { aksi: "Dibuat", oleh: "Rina Kusuma", waktu: "2026-02-14 09:00" },
      { aksi: "Dikirim ke Sekdep", oleh: "Rina Kusuma", waktu: "2026-02-14 09:05" },
    ],
  },
  {
    id: 6, direction: "keluar", category: "lainnya",
    nomor: "B/006/UN1.SIPSO/HM/2026",
    perihal: "Kerjasama Penelitian dengan BRIN",
    tujuan: "Kepala Badan Riset dan Inovasi Nasional", pengirim: "Ketua DPP UGM",
    tanggal: "2026-02-20", status: "Menunggu", approvalStep: 1,
    isi: "Dengan hormat, dalam rangka penguatan ekosistem penelitian nasional, kami mengusulkan perjanjian kerjasama penelitian.",
    auditLog: [
      { aksi: "Dibuat", oleh: "Dr. Hendra Wijaya", waktu: "2026-02-20 10:00" },
      { aksi: "Dikirim ke Sekdep", oleh: "Rina Kusuma", waktu: "2026-02-20 10:30" },
    ],
  },
  {
    id: 7, direction: "keluar", category: "lainnya",
    nomor: "B/007/UN1.SIPSO/HM/2026",
    perihal: "Laporan Kegiatan Workshop Penulisan Ilmiah",
    tujuan: "Rektor Universitas Gadjah Mada", pengirim: "Ketua DPP UGM",
    tanggal: "2026-03-01", status: "Draft", approvalStep: 0,
    isi: "",
    auditLog: [{ aksi: "Dibuat (Draft)", oleh: "Budi Santoso", waktu: "2026-03-01 08:00" }],
  },
  {
    id: 8, direction: "keluar", category: "pemberitahuan",
    nomor: "B/008/UN1.SIPSO/HM/2026",
    perihal: "Pengumuman Penerimaan Mahasiswa Baru 2026",
    tujuan: "Calon Mahasiswa DPP UGM", pengirim: "Sekretariat DPP UGM",
    tanggal: "2026-03-05", status: "Draft", approvalStep: 0,
    isi: "",
    auditLog: [{ aksi: "Dibuat (Draft)", oleh: "Dewi Lestari", waktu: "2026-03-05 13:00" }],
  },
  {
    id: 9, direction: "keluar", category: "undangan",
    nomor: "B/009/UN1.SIPSO/HM/2026",
    perihal: "Undangan Kuliah Tamu Prof. John Smith",
    tujuan: "Seluruh Mahasiswa dan Dosen DPP UGM", pengirim: "Ketua DPP UGM",
    tanggal: "2026-03-10", status: "Ditandatangani", approvalStep: 3,
    isi: "Dengan hormat, memberitahukan akan diadakannya kuliah tamu oleh Prof. John Smith (Cornell University) pada Kamis, 20 Maret 2026.",
    auditLog: [
      { aksi: "Dibuat", oleh: "Rina Kusuma", waktu: "2026-03-10 09:00" },
      { aksi: "Dikirim ke Sekdep", oleh: "Rina Kusuma", waktu: "2026-03-10 09:05" },
      { aksi: "Direview Sekdep", oleh: "Dr. Hendra Wijaya", waktu: "2026-03-10 11:00" },
      { aksi: "Ditandatangani Kadep", oleh: "Prof. Dr. Sari Indah", waktu: "2026-03-10 14:00" },
    ],
  },
  {
    id: 10, direction: "keluar", category: "permohonan",
    nomor: "B/010/UN1.SIPSO/HM/2026",
    perihal: "Permohonan Fasilitas Laboratorium Terpadu",
    tujuan: "Direktur Sarana dan Prasarana UGM", pengirim: "Ketua DPP UGM",
    tanggal: "2026-03-15", status: "Menunggu", approvalStep: 2,
    isi: "Dengan hormat, mengajukan permohonan peminjaman Laboratorium Terpadu lt. 3 untuk keperluan praktikum mahasiswa semester genap 2025/2026.",
    auditLog: [
      { aksi: "Dibuat", oleh: "Budi Santoso", waktu: "2026-03-15 10:00" },
      { aksi: "Dikirim ke Sekdep", oleh: "Budi Santoso", waktu: "2026-03-15 10:05" },
      { aksi: "Direview Sekdep — menunggu Kadep", oleh: "Dr. Hendra Wijaya", waktu: "2026-03-16 09:00" },
    ],
  },
  {
    id: 11, direction: "keluar", category: "keterangan",
    nomor: "B/011/UN1.SIPSO/HM/2026",
    perihal: "Rekomendasi Beasiswa Pendidikan S3",
    tujuan: "LPDP Kementerian Keuangan RI", pengirim: "Ketua DPP UGM",
    tanggal: "2026-04-01", status: "Draft", approvalStep: 0,
    isi: "",
    auditLog: [{ aksi: "Dibuat (Draft)", oleh: "Dewi Lestari", waktu: "2026-04-01 14:30" }],
  },
  {
    id: 12, direction: "keluar", category: "undangan",
    nomor: "B/012/UN1.SIPSO/HM/2026",
    perihal: "Undangan Peringatan Dies Natalis UGM ke-77",
    tujuan: "Seluruh Civitas Akademika DPP UGM", pengirim: "Rektor UGM",
    tanggal: "2026-04-10", status: "Ditandatangani", approvalStep: 3,
    isi: "Dengan hormat, mengundang seluruh civitas akademika untuk hadir dalam rangkaian acara Dies Natalis UGM ke-77 yang akan diselenggarakan pada 19 Desember 2026.",
    auditLog: [
      { aksi: "Dibuat", oleh: "Rina Kusuma", waktu: "2026-04-10 08:00" },
      { aksi: "Dikirim ke Sekdep", oleh: "Rina Kusuma", waktu: "2026-04-10 08:05" },
      { aksi: "Direview Sekdep", oleh: "Dr. Hendra Wijaya", waktu: "2026-04-10 09:30" },
      { aksi: "Ditandatangani Kadep", oleh: "Prof. Dr. Sari Indah", waktu: "2026-04-10 11:00" },
    ],
  },
  // Surat masuk
  {
    id: 13, direction: "masuk", category: "undangan",
    nomor: "1234/DRPM/2026",
    perihal: "Undangan Sosialisasi Program Penelitian Kolaboratif 2026",
    tujuan: "Ketua DPP UGM", pengirim: "Direktur Riset dan Pengabdian Masyarakat UGM",
    tanggal: "2026-03-20", status: "Diarsipkan", approvalStep: 4,
    isi: "Dengan hormat, mengundang Bapak/Ibu untuk menghadiri sosialisasi program penelitian kolaboratif antar-departemen tahun 2026.",
    auditLog: [
      { aksi: "Diterima", oleh: "Rina Kusuma", waktu: "2026-03-20 10:00" },
      { aksi: "Didisposisikan ke Kadep", oleh: "Dr. Hendra Wijaya", waktu: "2026-03-20 11:00" },
      { aksi: "Diarsipkan", oleh: "Rina Kusuma", waktu: "2026-03-21 08:00" },
    ],
  },
  {
    id: 14, direction: "masuk", category: "permohonan",
    nomor: "445/DIKTI/2026",
    perihal: "Permohonan Data Akreditasi Program Studi",
    tujuan: "Ketua Program Studi Agronomi DPP UGM", pengirim: "BAN-PT",
    tanggal: "2026-04-05", status: "Menunggu", approvalStep: 1,
    isi: "Dengan hormat, dalam rangka proses akreditasi program studi, kami memohon kesediaan untuk mengisi borang akreditasi.",
    auditLog: [
      { aksi: "Diterima", oleh: "Rina Kusuma", waktu: "2026-04-05 09:00" },
      { aksi: "Didisposisikan ke Kaprodi", oleh: "Dr. Hendra Wijaya", waktu: "2026-04-05 10:30" },
    ],
  },
  {
    id: 15, direction: "masuk", category: "keterangan",
    nomor: "B-234/BRIN/HM/2026",
    perihal: "Konfirmasi Kerjasama Penelitian BRIN–DPP UGM",
    tujuan: "Ketua DPP UGM", pengirim: "Kepala BRIN",
    tanggal: "2026-04-18", status: "Menunggu", approvalStep: 1,
    isi: "Dengan hormat, menyampaikan konfirmasi persetujuan atas usulan kerjasama penelitian yang telah disampaikan sebelumnya.",
    auditLog: [
      { aksi: "Diterima", oleh: "Rina Kusuma", waktu: "2026-04-18 14:00" },
    ],
  },
  {
    id: 16, direction: "masuk", category: "lainnya",
    nomor: "006/LPPM-UGM/2026",
    perihal: "Pemberitahuan Batas Waktu Laporan Akhir Penelitian",
    tujuan: "Seluruh PI Penelitian DPP UGM", pengirim: "LPPM UGM",
    tanggal: "2026-05-01", status: "Menunggu", approvalStep: 1,
    isi: "Dengan hormat, diberitahukan bahwa batas akhir pengumpulan laporan akhir penelitian tahun 2025 adalah 31 Mei 2026.",
    auditLog: [
      { aksi: "Diterima", oleh: "Rina Kusuma", waktu: "2026-05-01 08:00" },
    ],
  },
];

// ── Letter Templates (6) ──────────────────────────────────────────────────────

export const letterTemplates: LetterTemplate[] = [
  {
    id: 1, category: "undangan", name: "Undangan Rapat Internal",
    subject: "Undangan Rapat [Nama Rapat]",
    body: `Dengan hormat,

Mengundang Bapak/Ibu untuk hadir dalam rapat yang akan dilaksanakan pada:

Hari/Tanggal : [Hari], [Tanggal]
Waktu         : [Pukul] WIB
Tempat        : [Lokasi Rapat]
Agenda        : [Agenda Rapat]

Mengingat pentingnya rapat ini, kehadiran Bapak/Ibu sangat kami harapkan.

Demikian undangan ini kami sampaikan. Atas perhatian dan kehadiran Bapak/Ibu, kami ucapkan terima kasih.

Hormat kami,
Sekretariat DPP UGM`,
  },
  {
    id: 2, category: "keputusan", name: "Surat Keputusan Kadep",
    subject: "Keputusan Kepala Departemen tentang [Hal]",
    body: `KEPUTUSAN KEPALA DEPARTEMEN PENDIDIKAN PROFESI
UNIVERSITAS GADJAH MADA
NOMOR: [NOMOR SK]

TENTANG
[JUDUL KEPUTUSAN]

KEPALA DEPARTEMEN PENDIDIKAN PROFESI,

Menimbang :  a. bahwa [alasan pertama];
             b. bahwa [alasan kedua];

Mengingat  :  1. Peraturan [peraturan pertama];
              2. Peraturan [peraturan kedua];

MEMUTUSKAN:

Menetapkan : KEPUTUSAN KEPALA DEPARTEMEN TENTANG [HAL].

Pertama    : [Isi keputusan pertama]
Kedua      : [Isi keputusan kedua]
Ketiga     : Keputusan ini berlaku sejak tanggal ditetapkan.

Ditetapkan di Yogyakarta
Pada tanggal [Tanggal]

Kepala Departemen,
Prof. Dr. Sari Indah, M.P.`,
  },
  {
    id: 3, category: "tugas", name: "Surat Tugas",
    subject: "Surat Tugas [Nama Kegiatan]",
    body: `SURAT TUGAS
Nomor: [NOMOR]

Yang bertanda tangan di bawah ini, Kepala Departemen Pendidikan Profesi Universitas Gadjah Mada, menugaskan kepada:

Nama     : [Nama Lengkap]
NIP      : [NIP]
Jabatan  : [Jabatan]
Unit     : Departemen Pendidikan Profesi UGM

Untuk [melaksanakan / menghadiri / mewakili] [nama kegiatan] yang diselenggarakan pada:

Hari/Tanggal : [Tanggal]
Tempat        : [Lokasi]

Demikian surat tugas ini dibuat untuk dapat dipergunakan sebagaimana mestinya.

Yogyakarta, [Tanggal]
Kepala Departemen,

Prof. Dr. Sari Indah, M.P.`,
  },
  {
    id: 4, category: "keterangan", name: "Surat Keterangan Aktif Kuliah",
    subject: "Surat Keterangan Aktif Kuliah atas nama [Nama Mahasiswa]",
    body: `Dengan hormat,

Yang bertanda tangan di bawah ini menerangkan bahwa:

Nama          : [Nama Mahasiswa]
NIM           : [NIM]
Program Studi : [Program Studi]
Semester      : [Semester]
Angkatan      : [Angkatan]

adalah benar mahasiswa aktif di Departemen Pendidikan Profesi, Universitas Gadjah Mada pada Semester [Ganjil/Genap] Tahun Akademik 2025/2026.

Surat keterangan ini dibuat untuk keperluan [tujuan] dan digunakan sebagaimana mestinya.

Yogyakarta, [Tanggal]
Ketua DPP UGM,

Prof. Dr. Sari Indah, M.P.`,
  },
  {
    id: 5, category: "permohonan", name: "Permohonan Dana/Fasilitas",
    subject: "Permohonan [Dana/Fasilitas] untuk [Kegiatan]",
    body: `Dengan hormat,

Dalam rangka [tujuan/konteks kegiatan], Departemen Pendidikan Profesi (DPP) Universitas Gadjah Mada bermaksud mengajukan permohonan [jenis permohonan] kepada Bapak/Ibu.

Adapun rincian permohonan adalah sebagai berikut:
1. [Rincian pertama]
2. [Rincian kedua]
3. [Rincian ketiga]

Sebagai bahan pertimbangan, bersama ini kami lampirkan [dokumen pendukung].

Besar harapan kami permohonan ini dapat dikabulkan demi kelancaran kegiatan tersebut. Atas perhatian dan kebijaksanaan Bapak/Ibu, kami mengucapkan terima kasih.

Hormat kami,
Ketua DPP UGM,

Prof. Dr. Sari Indah, M.P.`,
  },
  {
    id: 6, category: "pemberitahuan", name: "Pemberitahuan Umum",
    subject: "Pemberitahuan [Hal]",
    body: `Dengan hormat,

Diberitahukan kepada seluruh [sasaran] di lingkungan Departemen Pendidikan Profesi UGM bahwa:

[Isi pemberitahuan utama]

Sehubungan dengan hal tersebut, dimohon kepada seluruh pihak yang berkepentingan untuk:
1. [Tindakan yang diperlukan pertama]
2. [Tindakan yang diperlukan kedua]

Informasi lebih lanjut dapat diperoleh melalui Sekretariat DPP UGM.

Demikian pemberitahuan ini kami sampaikan. Atas perhatian dan kerja samanya diucapkan terima kasih.

Hormat kami,
Sekretariat DPP UGM`,
  },
];

// ── Room Bookings ─────────────────────────────────────────────────────────────

export const bookings: Booking[] = [
  { id: 1,  ruangan: "Ruang Rapat Utama",  pemohon: "Dr. Nanang Indra Kurniawan",       tanggal: "2026-05-10", waktuMulai: "09:00", waktuSelesai: "11:00", keperluan: "Rapat Koordinasi Tim Penelitian",    status: "Dikonfirmasi" },
  { id: 2,  ruangan: "Aula Gedung A",       pemohon: "Prof. Dr. Amalinda Savirani",      tanggal: "2026-05-12", waktuMulai: "13:00", waktuSelesai: "16:00", keperluan: "Seminar Departemen",                 status: "Dikonfirmasi" },
  { id: 3,  ruangan: "Lab Komputer",        pemohon: "Dr. Mada Sukmajati",               tanggal: "2026-05-14", waktuMulai: "08:00", waktuSelesai: "10:00", keperluan: "Praktikum Analisis Data Politik",    status: "Menunggu"     },
  { id: 4,  ruangan: "Ruang Rapat Kecil",  pemohon: "Nur Azizah",                       tanggal: "2026-05-15", waktuMulai: "10:00", waktuSelesai: "12:00", keperluan: "Bimbingan Skripsi Kelompok",         status: "Dikonfirmasi" },
  { id: 5,  ruangan: "Aula Gedung A",       pemohon: "Dr. Anak Agung Ari Dwipayana",     tanggal: "2026-05-17", waktuMulai: "09:00", waktuSelesai: "15:00", keperluan: "Workshop Penulisan Ilmiah",          status: "Dikonfirmasi" },
  { id: 6,  ruangan: "Ruang Seminar",       pemohon: "Arie Ruhyanto",                    tanggal: "2026-05-19", waktuMulai: "07:30", waktuSelesai: "11:30", keperluan: "Diskusi Hasil Penelitian Lapangan",  status: "Menunggu"     },
  { id: 7,  ruangan: "Ruang Rapat Utama",  pemohon: "Prof. Dr. Purwo Santoso",           tanggal: "2026-05-21", waktuMulai: "14:00", waktuSelesai: "16:00", keperluan: "Rapat Penyusunan Kurikulum",         status: "Dikonfirmasi" },
  { id: 8,  ruangan: "Ruang Kelas 201",    pemohon: "Hasrul Hanif",                      tanggal: "2026-05-22", waktuMulai: "08:00", waktuSelesai: "10:00", keperluan: "Kuliah Tamu Asing",                  status: "Menunggu"     },
  { id: 9,  ruangan: "Lab Komputer",        pemohon: "Arya Budi",                        tanggal: "2026-05-24", waktuMulai: "13:00", waktuSelesai: "16:00", keperluan: "Pelatihan Analisis Statistika",      status: "Ditolak"      },
  { id: 10, ruangan: "Ruang Rapat Kecil",  pemohon: "Dr. Indah Surya Wardhani",          tanggal: "2026-05-26", waktuMulai: "10:00", waktuSelesai: "11:30", keperluan: "Diskusi Proposal Penelitian",        status: "Menunggu"     },
];

// ── Notulensi (6) ─────────────────────────────────────────────────────────────

export const notulensiList: NotulensiItem[] = [
  {
    id: 1, judul: "Rapat Koordinasi Tim Penelitian Semester Genap 2025/2026",
    tanggal: "2026-04-15", tempat: "Ruang Rapat Utama DPP UGM",
    pimpinanRapat: "Prof. Dr. Sari Indah, M.P.",
    peserta: ["Dr. Hendra Wijaya","Dr. Ahmad Rizky","Dr. Rini Setiawati","Dr. Dewi Rahayu","Dr. Agus Hartono","Budi Santoso, M.Sc."],
    anggota: ["Dr. Hendra Wijaya","Dr. Ahmad Rizky","Dr. Rini Setiawati","Dr. Dewi Rahayu","Dr. Agus Hartono","Budi Santoso, M.Sc."],
    akses: "anggota", label: "Departemen",
    agenda: ["Evaluasi progres penelitian semester ganjil","Pembagian tugas penelitian semester genap","Rencana publikasi 2026"],
    keputusan: [
      "Tim penelitian wajib menyerahkan laporan kemajuan paling lambat 30 April 2026.",
      "Target publikasi: minimal 3 jurnal internasional Q1 sebelum akhir 2026.",
      "Anggaran penelitian semester genap dialokasikan sebesar Rp 150 juta.",
    ],
    tindakLanjut: [
      { item: "Kumpulkan laporan kemajuan penelitian", penanggungJawab: "Semua PI Penelitian", tenggat: "2026-04-30" },
      { item: "Susun roadmap publikasi 2026", penanggungJawab: "Dr. Ahmad Rizky", tenggat: "2026-05-10" },
      { item: "Ajukan revisi anggaran ke DRPM", penanggungJawab: "Dr. Hendra Wijaya", tenggat: "2026-05-05" },
    ],
    status: "Disetujui",
  },
  {
    id: 2, judul: "Rapat Persiapan Akreditasi BAN-PT Program Studi Agronomi",
    tanggal: "2026-04-22", tempat: "Ruang Rapat Kecil DPP UGM",
    pimpinanRapat: "Dr. Hendra Wijaya",
    peserta: ["Prof. Dr. Sari Indah","Dr. Herlan Kusuma","Dewi Lestari","Rina Kusuma","Budi Santoso"],
    anggota: ["Prof. Dr. Sari Indah","Dr. Herlan Kusuma","Dewi Lestari","Rina Kusuma","Budi Santoso"],
    akses: "anggota", label: "Prodi",
    agenda: ["Review borang akreditasi","Pembagian tugas pengisian borang","Jadwal visitasi"],
    keputusan: [
      "Pengisian borang akreditasi harus selesai pada 15 Mei 2026.",
      "Perlu pembaruan data alumni 5 tahun terakhir.",
      "Simulasi visitasi dijadwalkan tanggal 20 Mei 2026.",
    ],
    tindakLanjut: [
      { item: "Isi borang Standar 1–4", penanggungJawab: "Dr. Herlan Kusuma", tenggat: "2026-05-10" },
      { item: "Update data alumni", penanggungJawab: "Rina Kusuma", tenggat: "2026-05-08" },
      { item: "Siapkan dokumen pendukung", penanggungJawab: "Dewi Lestari", tenggat: "2026-05-15" },
    ],
    status: "Disetujui",
  },
  {
    id: 3, judul: "Rapat Penyusunan Kurikulum 2026 Program Studi Ilmu Tanah",
    tanggal: "2026-04-28", tempat: "Ruang Kelas 201 DPP UGM",
    pimpinanRapat: "Prof. Dr. Bambang Sutrisno",
    peserta: ["Dr. Dewi Rahayu","Dr. Agus Hartono","Andi Prasetyo","Budi Santoso"],
    anggota: ["Dr. Dewi Rahayu","Dr. Agus Hartono","Andi Prasetyo","Budi Santoso"],
    akses: "publik", label: "Prodi",
    agenda: ["Evaluasi kurikulum 2022","Usulan mata kuliah baru","Sinkronisasi dengan KKNI"],
    keputusan: [
      "Mata kuliah Precision Agriculture dimasukkan sebagai mata kuliah wajib mulai 2026.",
      "Beban SKS disesuaikan dari 148 SKS menjadi 144 SKS.",
      "Mata kuliah pilihan diperluas dengan 3 mata kuliah baru.",
    ],
    tindakLanjut: [
      { item: "Draft RPS mata kuliah Precision Agriculture", penanggungJawab: "Dr. Ahmad Rizky", tenggat: "2026-05-20" },
      { item: "Revisi dokumen kurikulum", penanggungJawab: "Dr. Dewi Rahayu", tenggat: "2026-05-25" },
    ],
    status: "Disetujui",
  },
  {
    id: 4, judul: "Rapat Evaluasi Kinerja Dosen Semester Ganjil 2025/2026",
    tanggal: "2026-05-02", tempat: "Aula Gedung A DPP UGM",
    pimpinanRapat: "Prof. Dr. Sari Indah, M.P.",
    peserta: ["Dr. Hendra Wijaya","Dr. Ahmad Rizky","Dr. Rini Setiawati","Dr. Dewi Rahayu","Dr. Agus Hartono","Dr. Herlan Kusuma","Prof. Dr. Bambang Sutrisno"],
    anggota: ["Dr. Hendra Wijaya","Dr. Ahmad Rizky","Dr. Rini Setiawati","Dr. Dewi Rahayu","Dr. Agus Hartono","Dr. Herlan Kusuma","Prof. Dr. Bambang Sutrisno"],
    akses: "anggota", label: "Departemen",
    agenda: ["Evaluasi nilai EDOM","Tindak lanjut keluhan mahasiswa","Rencana pengembangan kompetensi dosen"],
    keputusan: [
      "Rata-rata skor EDOM DPP: 4.2/5.0 (meningkat 0.1 dari semester sebelumnya).",
      "Perlu pelatihan metode pengajaran berbasis proyek bagi 3 dosen.",
      "Program mentoring dosen junior akan dimulai Juni 2026.",
    ],
    tindakLanjut: [
      { item: "Daftar dosen untuk pelatihan PBL", penanggungJawab: "Dr. Hendra Wijaya", tenggat: "2026-05-15" },
      { item: "Siapkan program mentoring", penanggungJawab: "Prof. Dr. Bambang", tenggat: "2026-05-30" },
    ],
    status: "Disetujui",
  },
  {
    id: 5, judul: "Rapat Koordinasi Kegiatan Kemahasiswaan Mei 2026",
    tanggal: "2026-05-06", tempat: "Ruang Rapat Kecil DPP UGM",
    pimpinanRapat: "Dr. Hendra Wijaya",
    peserta: ["Rina Kusuma","Dewi Lestari","Ketua BEM DPP","Ketua HIMA Agronomi","Ketua HIMA Ilmu Tanah"],
    anggota: ["Rina Kusuma","Dewi Lestari","Ketua BEM DPP","Ketua HIMA Agronomi","Ketua HIMA Ilmu Tanah"],
    akses: "publik", label: "General",
    agenda: ["Rencana kegiatan dies natalis departemen","Koordinasi PKM mahasiswa","Program KKN 2026"],
    keputusan: [
      "Dies natalis departemen ditetapkan tanggal 15 Juni 2026.",
      "Target pengiriman proposal PKM: 10 proposal dari DPP.",
      "Koordinator KKN tematik akan ditunjuk paling lambat 20 Mei 2026.",
    ],
    tindakLanjut: [
      { item: "Panitia dies natalis departemen", penanggungJawab: "Ketua BEM DPP", tenggat: "2026-05-15" },
      { item: "Workshop penulisan PKM", penanggungJawab: "Dewi Lestari", tenggat: "2026-05-20" },
    ],
    status: "Draft",
  },
  {
    id: 6, judul: "Rapat Tinjauan Anggaran RKAT Triwulan I 2026",
    tanggal: "2026-05-07", tempat: "Ruang Rapat Utama DPP UGM",
    pimpinanRapat: "Prof. Dr. Sari Indah, M.P.",
    peserta: ["Dr. Hendra Wijaya","Budi Santoso","Rina Kusuma","Dewi Lestari"],
    anggota: ["Dr. Hendra Wijaya","Budi Santoso","Rina Kusuma","Dewi Lestari"],
    akses: "anggota", label: "Departemen",
    agenda: ["Realisasi anggaran Januari–Maret 2026","Proyeksi kebutuhan April–Juni","Efisiensi anggaran"],
    keputusan: [
      "Realisasi anggaran Triwulan I: 68% dari target 75% — ada deviasi 7%.",
      "Belanja operasional perlu diefisiensikan 10% untuk Q2.",
      "Pengajuan revisi RKAT paling lambat 31 Mei 2026.",
    ],
    tindakLanjut: [
      { item: "Laporan realisasi anggaran detail", penanggungJawab: "Budi Santoso", tenggat: "2026-05-12" },
      { item: "Dokumen revisi RKAT", penanggungJawab: "Rina Kusuma", tenggat: "2026-05-31" },
    ],
    status: "Draft",
  },
];

// ── Calendar Events (12) ──────────────────────────────────────────────────────

export const calendarEvents: CalendarEvent[] = [
  { id: 1,  judul: "Ujian Akhir Semester Genap",       tanggal: "2026-05-04", tanggalAkhir: "2026-05-22", waktuMulai: "08:00", waktuSelesai: "11:00", tipe: "lainnya",    lokasi: "Gedung DPP UGM",            penyelenggara: "Sekretariat", deskripsi: "UAS seluruh prodi semester genap 2025/2026" },
  { id: 2,  judul: "Workshop Penulisan Ilmiah",         tanggal: "2026-05-06", waktuMulai: "08:00", waktuSelesai: "15:00", tipe: "seminar",    lokasi: "Aula Gedung A",             penyelenggara: "Dr. Rini Setiawati" },
  { id: 3,  judul: "Rapat Koordinasi Kemahasiswaan",   tanggal: "2026-05-06", waktuMulai: "15:30", waktuSelesai: "17:00", tipe: "rapat",      lokasi: "Ruang Rapat Kecil",         penyelenggara: "Dr. Hendra Wijaya" },
  { id: 4,  judul: "Tinjauan Anggaran RKAT Q1",        tanggal: "2026-05-07", waktuMulai: "09:00", waktuSelesai: "11:00", tipe: "rapat",      lokasi: "Ruang Rapat Utama",         penyelenggara: "Prof. Dr. Sari Indah" },
  { id: 5,  judul: "Praktikum Analisis Data Pertanian",tanggal: "2026-05-14", waktuMulai: "08:00", waktuSelesai: "10:00", tipe: "lainnya",    lokasi: "Lab Komputer",              penyelenggara: "Dr. Ahmad Rizky" },
  { id: 6,  judul: "Seminar Nasional Agronomi",        tanggal: "2026-05-16", waktuMulai: "08:00", waktuSelesai: "17:00", tipe: "seminar",    lokasi: "Aula Gedung A",             penyelenggara: "DPP UGM", deskripsi: "Seminar nasional dengan tema Ketahanan Pangan dan Perubahan Iklim" },
  { id: 7,  judul: "Kuliah Umum: Sustainable Farming", tanggal: "2026-05-20", waktuMulai: "09:00", waktuSelesai: "12:00", tipe: "kuliah_umum",lokasi: "Aula Gedung A",             penyelenggara: "Prof. Dr. Bambang Sutrisno" },
  { id: 8,  judul: "Rapat Kurikulum 2026",             tanggal: "2026-05-21", waktuMulai: "14:00", waktuSelesai: "16:00", tipe: "rapat",      lokasi: "Ruang Rapat Utama",         penyelenggara: "Prof. Dr. Bambang Sutrisno" },
  { id: 9,  judul: "Simulasi Visitasi Akreditasi",     tanggal: "2026-05-20", waktuMulai: "13:00", waktuSelesai: "17:00", tipe: "akreditasi", lokasi: "Gedung DPP UGM",            penyelenggara: "Dr. Hendra Wijaya" },
  { id: 10, judul: "Workshop Metode PBL untuk Dosen",  tanggal: "2026-05-28", waktuMulai: "08:00", waktuSelesai: "15:00", tipe: "seminar",    lokasi: "Aula Gedung A",             penyelenggara: "Prof. Dr. Bambang Sutrisno" },
  { id: 11, judul: "Dies Natalis DPP UGM",             tanggal: "2026-06-15", waktuMulai: "08:00", waktuSelesai: "20:00", tipe: "lainnya",    lokasi: "Lapangan DPP UGM",          penyelenggara: "Panitia Dies Natalis" },
  { id: 12, judul: "Rapat Senat Akademik UGM",         tanggal: "2026-05-30", waktuMulai: "10:00", waktuSelesai: "13:00", tipe: "rapat",      lokasi: "Gedung Pusat UGM",          penyelenggara: "Senat UGM" },
];

// ── Renstra 2025–2030 ─────────────────────────────────────────────────────────

export const renstra: Renstra = {
  id: 1, periodeMulai: 2025, periodeAkhir: 2030, isActive: true,
  visi: "Menjadi departemen pendidikan profesi terkemuka di Asia Tenggara yang menghasilkan lulusan berkarakter unggul, inovatif, dan berdaya saing global dalam bidang pertanian berkelanjutan pada tahun 2030.",
  misi: [
    "Menyelenggarakan pendidikan profesi berbasis riset yang relevan dengan kebutuhan industri dan perkembangan IPTEK.",
    "Mengembangkan penelitian inovatif yang berorientasi pada solusi ketahanan pangan dan pertanian berkelanjutan.",
    "Melaksanakan pengabdian kepada masyarakat yang berdampak nyata bagi pengembangan sektor pertanian nasional.",
    "Membangun tata kelola departemen yang transparan, akuntabel, dan berbasis data.",
    "Menjalin kemitraan strategis dengan industri, pemerintah, dan lembaga internasional.",
  ],
  tujuanStrategis: [
    {
      id: 1, capaian: 72,
      tujuan: "Meningkatkan Kualitas dan Relevansi Pendidikan",
      indikator: ["Akreditasi Unggul semua prodi","Rasio dosen:mahasiswa ≤1:20","% lulusan bekerja <6 bulan ≥85%"],
      target2030: "Seluruh prodi terakreditasi Unggul BAN-PT dan AUN-QA",
    },
    {
      id: 2, capaian: 58,
      tujuan: "Mengembangkan Ekosistem Penelitian Kelas Dunia",
      indikator: ["≥15 publikasi jurnal Q1/tahun","≥3 paten terdaftar/tahun","Dana penelitian eksternal ≥Rp 5M/tahun"],
      target2030: "Masuk 50 departemen pertanian terbaik Asia Tenggara (QS Ranking)",
    },
    {
      id: 3, capaian: 45,
      tujuan: "Memperluas Dampak Pengabdian Masyarakat",
      indikator: ["≥10 desa binaan aktif","≥500 petani terdampak/tahun","≥5 inovasi teknologi diterapkan di lapangan"],
      target2030: "Model pengabdian DPP diadopsi oleh ≥5 perguruan tinggi lain",
    },
    {
      id: 4, capaian: 80,
      tujuan: "Mewujudkan Tata Kelola Berbasis Data dan Digital",
      indikator: ["Implementasi SIAPP penuh","Indeks kepuasan layanan ≥4.5/5","100% proses administrasi terdigitalisasi"],
      target2030: "DPP menjadi pilot department paperless administration di UGM",
    },
    {
      id: 5, capaian: 35,
      tujuan: "Membangun Jejaring dan Kemitraan Internasional",
      indikator: ["≥10 MoU internasional aktif","≥5 program joint degree/credit transfer","≥20 dosen tamu asing/tahun"],
      target2030: "DPP menjadi hub kolaborasi riset pertanian ASEAN",
    },
  ],
};

// ── Renja 2026 ────────────────────────────────────────────────────────────────

export const renja: Renja = {
  id: 1, renstraId: 1, tahun: 2026, status: "active",
  program: [
    {
      nama: "Peningkatan Kualitas Pembelajaran",
      anggaranJuta: 450, realisasiJuta: 182,
      kpis: [
        { indikator: "Prodi dengan akreditasi Unggul",       target: 3,     realisasi: 2,   satuan: "prodi"    },
        { indikator: "Rata-rata skor EDOM",                  target: 4.3,   realisasi: 4.2, satuan: "dari 5.0" },
        { indikator: "Lulusan bekerja <6 bulan",             target: "85%", realisasi: "78%", satuan: "%" },
        { indikator: "Mata kuliah ter-update kurikulumnya",  target: 12,    realisasi: 5,   satuan: "MK"       },
      ],
    },
    {
      nama: "Penelitian dan Inovasi",
      anggaranJuta: 800, realisasiJuta: 310,
      kpis: [
        { indikator: "Publikasi jurnal internasional Q1/Q2", target: 12,    realisasi: 6,   satuan: "artikel"  },
        { indikator: "Paten didaftarkan",                    target: 2,     realisasi: 1,   satuan: "paten"    },
        { indikator: "Dana penelitian eksternal",            target: 5000,  realisasi: 2100, satuan: "juta Rp" },
        { indikator: "Mahasiswa terlibat penelitian",        target: 45,    realisasi: 28,  satuan: "orang"    },
      ],
    },
    {
      nama: "Pengabdian Kepada Masyarakat",
      anggaranJuta: 250, realisasiJuta: 95,
      kpis: [
        { indikator: "Desa binaan aktif",                    target: 6,     realisasi: 4,   satuan: "desa"     },
        { indikator: "Petani terdampak langsung",            target: 300,   realisasi: 145, satuan: "orang"    },
        { indikator: "Inovasi teknologi diterapkan",         target: 3,     realisasi: 1,   satuan: "inovasi"  },
      ],
    },
    {
      nama: "Tata Kelola dan Digitalisasi",
      anggaranJuta: 180, realisasiJuta: 120,
      kpis: [
        { indikator: "Modul SIAPP aktif",                    target: 5,     realisasi: 3,   satuan: "modul"    },
        { indikator: "Indeks kepuasan layanan",              target: 4.4,   realisasi: 4.2, satuan: "dari 5.0" },
        { indikator: "Proses administrasi terdigitalisasi",  target: "80%", realisasi: "55%", satuan: "%" },
      ],
    },
    {
      nama: "Kemitraan Internasional",
      anggaranJuta: 120, realisasiJuta: 35,
      kpis: [
        { indikator: "MoU internasional baru",               target: 3,     realisasi: 1,   satuan: "MoU"      },
        { indikator: "Dosen tamu asing",                     target: 8,     realisasi: 2,   satuan: "orang"    },
        { indikator: "Mahasiswa program credit transfer",    target: 10,    realisasi: 3,   satuan: "orang"    },
      ],
    },
  ],
};

// ── SOPs (8) ──────────────────────────────────────────────────────────────────

export const sops: SopItem[] = [
  {
    id: 1, isActive: true, versi: 3, kategori: "Persuratan",
    nomor: "SOP-DPP-001", judul: "Prosedur Pembuatan dan Pengesahan Surat Keluar",
    tanggalEfektif: "2025-01-01", unitPenanggungJawab: "Sekretariat",
    ringkasan: "Mengatur tata cara pembuatan, review, penandatanganan, dan pengarsipan surat keluar departemen.",
    langkah: [
      "Staf sekretariat membuat draft surat menggunakan template yang tersedia di SIAPP.",
      "Draft diperiksa kelengkapan dan kesesuaian format oleh Koordinator Administrasi.",
      "Surat dikirimkan ke Sekretaris Departemen (Sekdep) untuk direview.",
      "Sekdep mereview dan memberikan catatan atau persetujuan.",
      "Jika disetujui Sekdep, surat diteruskan ke Kepala Departemen (Kadep) untuk ditandatangani.",
      "Kadep menandatangani surat secara digital melalui SIAPP.",
      "Surat yang telah ditandatangani dicetak, diberi nomor, dan diarsipkan di sistem.",
      "Surat dikirimkan kepada penerima melalui sarana yang sesuai (email/pos/antar langsung).",
    ],
  },
  {
    id: 2, isActive: true, versi: 2, kategori: "Persuratan",
    nomor: "SOP-DPP-002", judul: "Prosedur Penanganan Surat Masuk",
    tanggalEfektif: "2025-01-01", unitPenanggungJawab: "Sekretariat",
    ringkasan: "Mengatur tata cara penerimaan, pencatatan, disposisi, dan pengarsipan surat masuk.",
    langkah: [
      "Staf sekretariat menerima surat masuk (fisik atau email).",
      "Surat diregistrasi di sistem SIAPP dengan mencatat nomor, pengirim, perihal, dan tanggal.",
      "Staf membuat lembar disposisi dan menyerahkan kepada Sekdep.",
      "Sekdep menentukan penerima disposisi dan instruksi tindak lanjut.",
      "Surat dan disposisi disampaikan kepada pihak yang ditunjuk.",
      "Pihak terkait melakukan tindak lanjut sesuai instruksi disposisi.",
      "Surat diarsipkan setelah tindak lanjut selesai.",
    ],
  },
  {
    id: 3, isActive: true, versi: 1, kategori: "Fasilitas",
    nomor: "SOP-DPP-003", judul: "Prosedur Peminjaman Ruang Departemen",
    tanggalEfektif: "2025-03-01", unitPenanggungJawab: "Sekretariat",
    ringkasan: "Mengatur tata cara pengajuan, persetujuan, dan penggunaan ruang departemen.",
    langkah: [
      "Pemohon mengajukan permintaan peminjaman ruang melalui SIAPP minimal 2 hari kerja sebelum penggunaan.",
      "Sistem memeriksa ketersediaan ruang secara otomatis.",
      "Jika ruang tersedia, permohonan diteruskan ke staf sekretariat untuk dikonfirmasi.",
      "Staf sekretariat mengonfirmasi atau menolak permohonan dalam 1 hari kerja.",
      "Pemohon menerima notifikasi status permohonan melalui SIAPP.",
      "Pada hari penggunaan, pemohon mengambil kunci/akses di sekretariat.",
      "Setelah selesai, pemohon mengembalikan kunci dan memastikan ruang dalam kondisi bersih.",
      "Staf mencatat kondisi ruang pasca-penggunaan di sistem.",
    ],
  },
  {
    id: 4, isActive: true, versi: 2, kategori: "Akademik",
    nomor: "SOP-DPP-004", judul: "Prosedur Pengajuan Cuti Akademik Mahasiswa",
    tanggalEfektif: "2025-01-01", unitPenanggungJawab: "Akademik",
    ringkasan: "Mengatur tata cara pengajuan, persetujuan, dan pencatatan cuti akademik mahasiswa.",
    langkah: [
      "Mahasiswa mengisi formulir permohonan cuti akademik dengan melampirkan dokumen pendukung.",
      "Formulir diserahkan ke sekretariat untuk diregistrasi.",
      "Sekretariat meneruskan permohonan kepada Dosen Pembimbing Akademik (DPA) untuk persetujuan awal.",
      "DPA memberikan rekomendasi tertulis.",
      "Permohonan beserta rekomendasi diteruskan kepada Ketua Program Studi.",
      "Kaprodi mempertimbangkan dan memutuskan.",
      "Jika disetujui, sekretariat menerbitkan surat keterangan cuti.",
      "Data mahasiswa diperbarui di sistem akademik.",
    ],
  },
  {
    id: 5, isActive: true, versi: 1, kategori: "Kepegawaian",
    nomor: "SOP-DPP-005", judul: "Prosedur Pengajuan Perjalanan Dinas",
    tanggalEfektif: "2025-06-01", unitPenanggungJawab: "Keuangan & Kepegawaian",
    ringkasan: "Mengatur tata cara pengajuan, persetujuan, pelaksanaan, dan pelaporan perjalanan dinas.",
    langkah: [
      "Pegawai mengisi formulir permohonan perjalanan dinas minimal 5 hari kerja sebelum keberangkatan.",
      "Permohonan diajukan kepada atasan langsung untuk mendapat persetujuan.",
      "Sekretariat menyiapkan surat tugas berdasarkan persetujuan.",
      "Bendahara memproses uang muka perjalanan dinas.",
      "Pegawai melaksanakan perjalanan dinas sesuai surat tugas.",
      "Dalam 5 hari kerja setelah kembali, pegawai menyerahkan laporan perjalanan dinas dan dokumen pertanggungjawaban.",
      "Bendahara memproses kekurangan atau pengembalian biaya.",
    ],
  },
  {
    id: 6, isActive: true, versi: 2, kategori: "Penelitian",
    nomor: "SOP-DPP-006", judul: "Prosedur Pengajuan dan Pelaporan Penelitian Internal",
    tanggalEfektif: "2025-01-01", unitPenanggungJawab: "Penelitian & PKM",
    ringkasan: "Mengatur tata cara pengajuan proposal, monitoring, dan pelaporan penelitian yang didanai departemen.",
    langkah: [
      "Dosen mengajukan proposal penelitian melalui SIAPP pada periode yang ditentukan.",
      "Proposal direview oleh Tim Reviewer Internal (minimal 2 reviewer).",
      "Hasil review disampaikan kepada pengusul untuk perbaikan.",
      "Proposal final disetujui oleh Koordinator Penelitian.",
      "Kontrak penelitian ditandatangani oleh Kadep dan PI.",
      "Dana dicairkan sesuai termin yang disepakati.",
      "Monitoring kemajuan dilakukan pada bulan ke-3 dan ke-6.",
      "Laporan akhir diserahkan maksimal 30 hari setelah periode penelitian berakhir.",
    ],
  },
  {
    id: 7, isActive: true, versi: 1, kategori: "Akademik",
    nomor: "SOP-DPP-007", judul: "Prosedur Pelaksanaan Ujian Akhir Semester",
    tanggalEfektif: "2025-01-01", unitPenanggungJawab: "Akademik",
    ringkasan: "Mengatur tata cara persiapan, pelaksanaan, dan pasca-pelaksanaan Ujian Akhir Semester (UAS).",
    langkah: [
      "Sekretariat menyusun jadwal UAS berkoordinasi dengan seluruh koordinator mata kuliah.",
      "Jadwal diumumkan kepada mahasiswa minimal 2 minggu sebelum UAS.",
      "Dosen menyerahkan soal ujian ke sekretariat dalam amplop tertutup.",
      "Sekretariat menyiapkan ruang, pengawas, dan kelengkapan ujian.",
      "Pelaksanaan UAS sesuai jadwal dengan pengawas yang ditunjuk.",
      "Lembar jawaban dikembalikan kepada dosen pengampu untuk dinilai.",
      "Nilai diserahkan ke sekretariat maksimal 2 minggu setelah UAS.",
      "Nilai diinputkan ke sistem akademik oleh sekretariat.",
    ],
  },
  {
    id: 8, isActive: false, versi: 1, kategori: "Fasilitas",
    nomor: "SOP-DPP-008", judul: "Prosedur Pengadaan Barang dan Jasa (< Rp 50 Juta)",
    tanggalEfektif: "2024-01-01", unitPenanggungJawab: "Keuangan",
    ringkasan: "Mengatur tata cara pengadaan barang dan jasa dengan nilai di bawah Rp 50 juta (pengadaan langsung).",
    langkah: [
      "Unit kerja mengajukan permintaan pengadaan dengan mengisi formulir kebutuhan.",
      "Formulir disetujui oleh Kepala Unit Kerja.",
      "Sekretariat melakukan survei harga minimal dari 3 supplier.",
      "Dipilih supplier dengan penawaran terbaik (harga, kualitas, waktu).",
      "Surat pesanan (Purchase Order) diterbitkan.",
      "Barang/jasa diterima dan diperiksa kesesuaiannya.",
      "Bukti penerimaan diserahkan ke bagian keuangan untuk proses pembayaran.",
      "Barang dicatat dalam inventaris departemen.",
    ],
  },
];
