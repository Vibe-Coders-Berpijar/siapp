# Status Data SIAPP — Real vs Dummy

**Dokumen ini mencatat data mana yang sudah menggunakan data nyata dari API/database, mana yang masih dummy, dan apa yang masih diperlukan.**

Terakhir diperbarui: 1 Juni 2026

---

## Ringkasan Cepat

| Kategori | Status |
|---|---|
| Data Dosen (nama, jabatan, NIDN) | REAL |
| Data Mahasiswa (nama, NIM, IPK, status) | REAL |
| Data Publikasi (judul, jurnal, tahun) | REAL |
| Data Surat Keluar | REAL |
| Data Hibah/Grant | Sebagian real |
| Booking Ruang (pemohon) | REAL (nama) / Dummy (detail) |
| Kurikulum / Mata Kuliah | Struktur dummy, nama dosen REAL |
| BKD / Beban Kerja Dosen | DUMMY |
| EDOM / Evaluasi Dosen | DUMMY |
| Keuangan / Anggaran | DUMMY |
| Akreditasi BAN-PT | DUMMY |
| IKU Kemendikbud | DUMMY |

---

## Detail per Halaman

### Dashboard Kadep

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| KPI: Total Dosen | 28 dosen | **REAL** | Supabase `lecturers` |
| KPI: Publikasi Tahun Ini | Dihitung dari DB | **REAL** | Supabase `publications` WHERE tahun >= 2025 |
| KPI: Hibah Aktif | 3 hibah | **REAL** | Supabase `grants` WHERE status='Aktif' |
| KPI: Mahasiswa Aktif | 423 mahasiswa | **REAL** | Supabase `students` WHERE status='aktif' |
| Menunggu Tanda Tangan | Surat dari DB | **REAL** | Supabase `letters` WHERE status='Menunggu' |
| Tridharma Chart | Data grafik | **DUMMY** | `lib/mock-data-kadep.ts` |
| IKU Panel | Target & capaian | **DUMMY** | `lib/mock-data-kadep.ts` |
| Nama Kadep di sidebar | Prof. Dr. Purwo Santoso | **REAL** | Supabase `lecturers` (Guru Besar pertama) |

### Dashboard Kadep — Kepegawaian

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| Daftar dosen (nama, jabatan, NIDN) | 28 dosen | **REAL** | Supabase `lecturers` JOIN `profiles` |
| Jumlah publikasi per dosen | Dihitung dari DB | **REAL** | COUNT dari `publications` |
| Hibah aktif per dosen | Dihitung dari DB | **REAL** | COUNT dari `grants` WHERE status='Aktif' |
| SKS per dosen | 0 (tidak tersedia) | **DUMMY** | Belum ada data BKD |

### Dashboard Kadep — Persuratan

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| Daftar surat (perihal, nomor, status) | 12 surat | **REAL** | Supabase `letters` |
| Nama pengaju surat | Nama dosen nyata | **REAL** | Supabase `profiles.full_name` |
| Isi/body surat | Teks sample | **DUMMY** | Seed data |

### Dashboard Kadep — Keuangan

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| Seluruh halaman keuangan | Anggaran, realisasi | **DUMMY** | `lib/mock-data-kadep.ts` |
| Belum terhubung ke sistem keuangan UGM | — | Perlu integrasi SIMKEU/SAP |

### Dashboard Kadep — Akreditasi

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| BAN-PT 9 Kriteria (skor %) | Hardcoded | **DUMMY** | `lib/mock-data-kadep.ts` |
| Dokumen akreditasi | Placeholder | **DUMMY** | Perlu integrasi SAPTO BAN-PT |

---

### Dashboard Kaprodi

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| KPI: Mahasiswa Aktif (S1/S2/S3/Semua) | Dihitung dari DB | **REAL** | Supabase `students` |
| KPI: Rata-rata IPK (S1/S2/S3/Semua) | Dihitung dari DB | **REAL** | Supabase `students.ipk` |
| KPI: Mahasiswa At-Risk (count) | Dihitung dari DB | **REAL** | Supabase WHERE ipk < 2.75 |
| KPI: Lulusan Tahun Ini | Tampil "—" | **BELUM TERSEDIA** | Tidak ada data kelulusan di DB |
| Tabel At-Risk (nama, NIM, IPK) | Data nyata | **REAL** | Supabase `students` WHERE ipk < 2.75 |
| At-Risk: SKS Tertunggak | 0 (tidak tersedia) | **DUMMY** | Perlu integrasi SIMASTER |
| At-Risk: Semester (estimasi) | Dihitung dari angkatan | **Estimasi** | (tahun sekarang - angkatan) × 2 |
| Graduation Chart | Data grafik | **DUMMY** | Hardcoded di komponen |
| IPK Distribution Chart | Data grafik | **DUMMY** | Hardcoded di komponen |
| Kurikulum — Mata Kuliah (kode, nama, SKS) | Struktur | **DUMMY** | Hardcoded di `KurikulumTab.tsx` |
| Kurikulum — Dosen Pengampu | Nama dosen nyata | **REAL** (nama saja) | Diupdate manual dari OSS API |
| EDOM Program | Skor evaluasi | **DUMMY** | Hardcoded di `EdomProgramTab.tsx` |
| AI Asisten | Respons AI | Aktif (Claude API) | `lib/ai/route.ts` |
| Akreditasi | Dokumen & skor | **DUMMY** | Hardcoded |

---

### Dashboard Dosen

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| Profil sidebar (nama, jabatan, NIDN) | Prof. Dr. Purwo Santoso | **REAL** | Supabase `lecturers` + `profiles` |
| Bidang keahlian, H-Index | Kosong / 0 | **BELUM TERISI** | Field ada di DB tapi belum diisi dari API |
| ORCID, SINTA, Scopus | "—" | **BELUM TERISI** | Field ada di DB tapi belum diisi dari API |
| Ikhtisar — KPI Cards (SKS, tridharma) | Hardcoded | **DUMMY** | Hardcoded di `IkhtisarTab.tsx` |
| Publikasi (judul, jurnal, tahun) | 100 publikasi nyata | **REAL** | Supabase `publications` |
| Publikasi — Quartile | Sebagian ada | **Parsial** | Hanya ada di data P3M jurnal yang terindex |
| Mata Kuliah tab | 3 MK sample | **DUMMY** | Hardcoded di `MataKuliahTab.tsx` |
| Penelitian & PkM | Data penelitian | **DUMMY** | Hardcoded di `PenelitianTab.tsx` |
| Surat & Dokumen | Daftar surat | **DUMMY** | Hardcoded di `SuratDokumenTab.tsx` |
| Kalender & Booking | Jadwal booking | **DUMMY** | Hardcoded di `KalenderBookingTab.tsx` |
| Profil Publik (nama, jabatan, bio) | Nama nyata | **REAL** | Dari `profiles` + `lecturers` |
| Profil Publik — Publikasi | 5 publikasi teratas | **REAL** | Dari Supabase `publications` |
| Dokumen Saya | Daftar dokumen | **DUMMY** | Hardcoded di `DokumenSayaTab.tsx` |
| SOP | Daftar SOP | **DUMMY** | Hardcoded di `SopTab.tsx` |

---

### Dashboard Sekretariat / Kesekretariatan

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| Inbox Persuratan (nomor, perihal, status) | 6 surat sample | **Parsial REAL** | `lib/seed.ts` — perihal nyata, nama pengaju belum dari DB |
| Buat Surat + AI Draft | Fungsi aktif | Fungsional | `lib/ai/route.ts` |
| Booking Ruang (pemohon) | Nama dosen nyata | **REAL** (nama) | Diupdate dari OSS API |
| Booking Ruang (detail ruangan) | Sample ruangan | Representatif | Nama ruang DPP UGM |
| Notulensi | Sample notulensi | **DUMMY** | `lib/seed.ts` |
| Kalender | Event kalender | **DUMMY** | `lib/seed.ts` |
| Renja / Renstra | Dokumen perencanaan | **DUMMY** | Hardcoded |

---

## Data dari OSS SIAPP API

**Base URL:** `https://oss.fisipol.ugm.ac.id`
**Autentikasi:** Header `x-api-key`

| Endpoint | Total Data | Terpakai di SIAPP |
|---|---|---|
| `GET /siapp/api/lecturers` | 28 dosen | Ya — di-seed ke Supabase, ditampilkan di semua dashboard |
| `GET /siapp/api/students` | 433 mahasiswa | Ya — di-seed ke Supabase, ditampilkan di Kaprodi |
| `GET /siapp/api/p3m/jurnal` | 187 jurnal | Ya — di-seed ke Supabase, ditampilkan di Dosen & Kadep |
| `GET /siapp/api/p3m/penelitian` | 197 penelitian | Belum — tersedia di API, belum di-seed |
| `GET /siapp/api/p3m/pengabdian` | 338 data | Belum — tersedia di API, belum di-seed |
| `GET /siapp/api/p3m/prosiding` | 40 prosiding | Belum — tersedia di API, belum di-seed |
| `GET /siapp/api/p3m/buku` | 61 buku | Belum — tersedia di API, belum di-seed |
| `GET /siapp/api/p3m/bookchapter` | 124 book chapter | Belum — tersedia di API, belum di-seed |
| `GET /siapp/api/p3m/media_karya` | 49 media/karya | Belum — tersedia di API, belum di-seed |

---

## Data yang Masih Perlu Diisi / Diintegrasi

### Prioritas Tinggi
- **BKD (Beban Kerja Dosen)** — SKS mengajar per semester, diperlukan untuk Ikhtisar Dosen dan Kepegawaian
- **Data Kelulusan** — jumlah lulusan per tahun per prodi, diperlukan untuk Kaprodi KPI dan Graduation Chart
- **SKS Tertunggak Mahasiswa** — diperlukan untuk klasifikasi at-risk yang akurat
- **Bidang Keahlian & H-Index Dosen** — field sudah ada di DB tapi belum diisi (perlu dari SINTA/ORCID)

### Prioritas Menengah
- **Data P3M Penelitian & Pengabdian** — sudah tersedia di OSS API, tinggal seed ke tabel baru
- **Data Prosiding & Buku** — tersedia di OSS API, tampilkan di tab Penelitian & PkM dosen
- **EDOM (Evaluasi Dosen Mengajar)** — perlu integrasi dengan sistem EDOM UGM
- **Mata Kuliah (kurikulum nyata)** — perlu integrasi dengan SIMASTER atau input manual

### Prioritas Rendah / Integrasi Eksternal
- **SIMASTER** — untuk data akademik mahasiswa (nilai, transkrip, SKS aktual)
- **SIMKEU/SAP UGM** — untuk data keuangan departemen
- **SAPTO BAN-PT** — untuk data akreditasi resmi
- **SINTA** — untuk H-Index dan skor publikasi dosen
- **Scopus** — untuk verifikasi quartile publikasi (Q1–Q4)
- **PrivyID** — untuk e-signature surat (saat ini placeholder "DRAFT")

---

## Catatan Teknis

- Semua data real diambil dari OSS SIAPP API pada **30 Mei 2026** dan disimpan ke Supabase
- Tabel Supabase: `profiles`, `lecturers`, `students`, `publications`, `grants`, `letters`, `study_programs`
- RLS (Row-Level Security) aktif di semua tabel
- AI menggunakan mode demo (`mockAIStream`) untuk Phase 1; Phase 2 akan pakai Claude API langsung
- Demo login: `demo@dpp.ugm.ac.id` / `siapp2026` (tidak menggunakan Supabase Auth session nyata)
