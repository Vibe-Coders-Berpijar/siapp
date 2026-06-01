# Status Data SIAPP — Real vs Dummy

**Dokumen ini mencatat data mana yang sudah menggunakan data nyata dari API/database, mana yang masih dummy, dan apa yang masih diperlukan.**

Terakhir diperbarui: 1 Juni 2026

---

## Pimpinan Departemen (Terverifikasi dari dpp.fisipol.ugm.ac.id)

| Jabatan | Nama | Sumber | Status |
|---|---|---|---|
| **Kepala Departemen** | Dr. Anak Agung Gde Ngurah Ari Dwipayana, S.IP., M.Si. | Sambutan Pengelola di dpp.fisipol.ugm.ac.id | **TERKONFIRMASI** |
| **Sekretaris Departemen** | Belum ditemukan | Website tidak mencantumkan | Perlu konfirmasi |
| **Kaprodi S1** | Belum ditemukan | Website tidak mencantumkan nama | Perlu konfirmasi |
| **Kaprodi S2** | Belum ditemukan | Website tidak mencantumkan nama | Perlu konfirmasi |
| **Kaprodi S3** | Belum ditemukan | Website tidak mencantumkan nama | Perlu konfirmasi |

> Struktur organisasi tersedia di `/struktur/` namun hanya berupa gambar diagram tanpa nama. Kaprodi perlu dikonfirmasi langsung ke departemen.

---

## Ringkasan Cepat

| Kategori | Status |
|---|---|
| Data Dosen — Nama, Jabatan, NIDN | **REAL** |
| Data Dosen — Bidang Keahlian | **REAL** (dari dpp.fisipol.ugm.ac.id/dosen/) |
| Identitas Kepala Departemen | **REAL** (Dr. Anak Agung Gde Ngurah Ari Dwipayana) |
| Identitas Kaprodi S1/S2/S3 | Belum ditemukan — perlu konfirmasi |
| Data Mahasiswa — Nama, NIM, IPK, Status | **REAL** |
| Data Mahasiswa At-Risk | **REAL** (filter IPK < 2.75 dari DB) |
| Data Publikasi — Judul, Jurnal, Tahun | **REAL** |
| Data Surat Keluar | **REAL** |
| Data Hibah/Grant | Sebagian real (3 aktif dari DB) |
| Booking Ruang — Nama Pemohon | **REAL** |
| Notulensi | Representatif (nama real, konten sample) |
| Kurikulum / Mata Kuliah | Struktur dummy, nama dosen REAL |
| Tanda Tangan Surat | **REAL** (nama Kadep asli) |
| BKD / Beban Kerja Dosen | DUMMY |
| EDOM / Evaluasi Dosen | DUMMY (skor representatif) |
| Keuangan / Anggaran | DUMMY |
| Akreditasi BAN-PT | DUMMY (skor representatif) |
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
| Nama Kadep di sidebar | Dr. Anak Agung Gde Ngurah Ari Dwipayana | **REAL** | Supabase `lecturers` WHERE nidn='0024027203' |
| Tridharma Chart | Data grafik bulanan | DUMMY | Hardcoded di `TridharmaChart.tsx` |
| IKU Panel | Target & capaian | DUMMY | Hardcoded di `IkuPanel.tsx` |

### Dashboard Kadep — Kepegawaian

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| Daftar dosen (nama, jabatan, NIDN) | 28 dosen | **REAL** | Supabase `lecturers` JOIN `profiles` |
| Bidang keahlian per dosen | Semua 28 terisi | **REAL** | Diambil dari dpp.fisipol.ugm.ac.id/dosen/ |
| Jumlah publikasi per dosen | Dihitung dari DB | **REAL** | COUNT dari `publications` |
| Hibah aktif per dosen | Dihitung dari DB | **REAL** | COUNT dari `grants` WHERE status='Aktif' |
| SKS per dosen | 0 (tidak tersedia) | DUMMY | Belum ada data BKD |

### Dashboard Kadep — Persuratan

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| Daftar surat (perihal, nomor, status) | 12 surat | **REAL** | Supabase `letters` |
| Nama pengaju surat | Nama dosen nyata | **REAL** | Supabase `profiles.full_name` |
| Tanda tangan Kadep | Dr. Anak Agung Gde Ngurah Ari Dwipayana | **REAL** | Fetched by NIDN from DB |

### Dashboard Kadep — Akreditasi

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| BAN-PT 9 Kriteria (skor %) | Skor representatif | DUMMY | Hardcoded di `criteriaDetails` |
| Nama dosen dalam bukti akreditasi | Nama dosen nyata | **REAL** | Diupdate manual dari OSS API |
| Dokumen akreditasi | Placeholder | DUMMY | Perlu integrasi SAPTO BAN-PT |

### Dashboard Kadep — Keuangan

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| Seluruh halaman keuangan | Anggaran, realisasi | DUMMY | Hardcoded di `keuangan/page.tsx` |
| Nama Kadep di sidebar | Nama nyata | **REAL** | Fetched from Supabase |

---

### Dashboard Kaprodi

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| KPI: Mahasiswa Aktif (S1/S2/S3/Semua) | Dihitung dari DB | **REAL** | Supabase `students` |
| KPI: Rata-rata IPK (S1/S2/S3/Semua) | Dihitung dari DB | **REAL** | Supabase `students.ipk` |
| KPI: Mahasiswa At-Risk (count) | Dihitung dari DB | **REAL** | WHERE ipk < 2.75 |
| KPI: Lulusan Tahun Ini | Tampil "—" | BELUM TERSEDIA | Tidak ada data kelulusan |
| Tabel At-Risk (nama, NIM, IPK) | Data nyata | **REAL** | Supabase `students` WHERE ipk < 2.75 |
| At-Risk: Semester (estimasi) | Dihitung dari angkatan | Estimasi | (tahun sekarang − angkatan) × 2 |
| At-Risk: SKS Tertunggak | 0 | DUMMY | Perlu integrasi SIMASTER |
| Graduation Chart | Data grafik | DUMMY | Hardcoded di `GraduationChart.tsx` |
| IPK Distribution Chart | Data grafik | DUMMY | Hardcoded di `IpkDistributionChart.tsx` |
| Kurikulum — Mata Kuliah (kode, nama, SKS) | Struktur dummy | DUMMY | Hardcoded di `KurikulumTab.tsx` |
| Kurikulum — Dosen Pengampu | Nama dosen nyata | **REAL** | Diupdate dari OSS API |
| EDOM Program — Skor | Skor representatif | DUMMY | Hardcoded di `EdomProgramTab.tsx` |
| EDOM Program — Nama dosen | Nama dosen nyata | **REAL** | Diupdate dari OSS API |
| AI Asisten | Respons Claude API | Aktif | `lib/ai/route.ts` |

---

### Dashboard Dosen

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| Profil sidebar (nama, jabatan, NIDN) | Prof. Dr. Purwo Santoso (demo) | **REAL** | Supabase `lecturers` + `profiles` |
| Bidang keahlian | Terisi untuk semua dosen | **REAL** | Dari dpp.fisipol.ugm.ac.id/dosen/ |
| H-Index | 0 | BELUM TERISI | Perlu integrasi SINTA/Scopus |
| ORCID, SINTA, Scopus ID | "—" | BELUM TERISI | Perlu input manual atau integrasi |
| Ikhtisar — KPI Cards (SKS, tridharma) | Hardcoded | DUMMY | Hardcoded di `IkhtisarTab.tsx` |
| Publikasi (judul, jurnal, tahun) | 187 publikasi nyata | **REAL** | Supabase `publications` |
| Profil Publik (nama, jabatan, bio) | Nama nyata | **REAL** | Dari `profiles` + `lecturers` |
| Profil Publik — Publikasi | 5 publikasi teratas | **REAL** | Dari Supabase `publications` |
| Mata Kuliah tab | 3 MK sample | DUMMY | Hardcoded di `MataKuliahTab.tsx` |
| Penelitian & PkM tab | Data sample | DUMMY | Hardcoded di `PenelitianTab.tsx` |
| Surat & Dokumen tab | Daftar surat | DUMMY | Hardcoded di `SuratDokumenTab.tsx` |
| Kalender & Booking tab | Jadwal sample | DUMMY | Hardcoded di `KalenderBookingTab.tsx` |
| Dokumen Saya | Daftar dokumen | DUMMY | Hardcoded di `DokumenSayaTab.tsx` |
| SOP | Daftar SOP | DUMMY | Dari `lib/seed.ts` |

---

### Dashboard Sekretariat / Kesekretariatan

| Komponen | Data | Status | Sumber |
|---|---|---|---|
| Inbox Persuratan (nomor, perihal, status) | 6 surat sample | Representatif | `lib/seed.ts` |
| Nama penanda tangan surat | Dr. Anak Agung Gde Ngurah Ari Dwipayana | **REAL** | `LetterPreview.tsx` |
| Buat Surat + AI Draft | Fungsi aktif | Fungsional | `lib/ai/route.ts` |
| Booking Ruang — Pemohon | Nama dosen nyata | **REAL** | Diupdate dari OSS API |
| Notulensi — Pimpinan & Peserta | Nama dosen nyata | **REAL** | Diupdate dari OSS API |
| Notulensi — Konten (agenda, keputusan) | Konten representatif | Representatif | `lib/seed.ts` |
| AI Notulensi Generator | Output nama real | **REAL** | `lib/mockAIStream.ts` diupdate |
| Kalender — Penyelenggara | Nama dosen nyata | **REAL** | Diupdate dari OSS API |
| Renja / Renstra | Dokumen perencanaan | DUMMY | `lib/seed.ts` |

---

## Data dari OSS SIAPP API

**Base URL:** `https://oss.fisipol.ugm.ac.id`
**Autentikasi:** Header `x-api-key`

| Endpoint | Total Data | Status |
|---|---|---|
| `GET /siapp/api/lecturers` | 28 dosen | **TERPAKAI** — di-seed ke Supabase, ditampilkan di semua dashboard |
| `GET /siapp/api/students` | 433 mahasiswa | **TERPAKAI** — di-seed ke Supabase, At-Risk real dari DB |
| `GET /siapp/api/p3m/jurnal` | 187 jurnal | **TERPAKAI** — di-seed ke Supabase, ditampilkan di Dosen & Kadep |
| `GET /siapp/api/p3m/penelitian` | 197 penelitian | Belum — tersedia, belum di-seed |
| `GET /siapp/api/p3m/pengabdian` | 338 data | Belum — tersedia, belum di-seed |
| `GET /siapp/api/p3m/prosiding` | 40 prosiding | Belum — tersedia, belum di-seed |
| `GET /siapp/api/p3m/buku` | 61 buku | Belum — tersedia, belum di-seed |
| `GET /siapp/api/p3m/bookchapter` | 124 book chapter | Belum — tersedia, belum di-seed |
| `GET /siapp/api/p3m/media_karya` | 49 media/karya | Belum — tersedia, belum di-seed |

### Distribusi Mahasiswa Real (433 total)

| Prodi | Jumlah | Status |
|---|---|---|
| S1 Politik dan Pemerintahan | 314 | Aktif, Kampus Merdeka, Cuti |
| Magister Politik dan Pemerintahan | 69 | Aktif, Cuti |
| Doktor Ilmu Politik | 50 | Aktif |

| Status | Jumlah |
|---|---|
| Aktif (termasuk Kampus Merdeka) | 423 |
| Cuti | 9 |
| Mengundurkan Diri | 1 |

---

## Data yang Masih Perlu Diisi / Diintegrasi

### Prioritas Tinggi
- **Kaprodi S1/S2/S3** — nama belum ditemukan di website, perlu konfirmasi ke departemen
- **Sekretaris Departemen** — nama belum diketahui
- **BKD (Beban Kerja Dosen)** — SKS mengajar per semester, diperlukan untuk Ikhtisar Dosen dan Kepegawaian
- **Data Kelulusan** — jumlah lulusan per tahun per prodi, diperlukan untuk KPI Kaprodi dan Graduation Chart

### Prioritas Menengah
- **H-Index, ORCID, SINTA, Scopus ID dosen** — field tersedia di DB tapi belum terisi
- **SKS Tertunggak Mahasiswa** — diperlukan untuk klasifikasi at-risk yang lebih akurat
- **Data P3M lengkap** — penelitian (197), pengabdian (338), prosiding (40), buku (61) sudah tersedia di OSS API
- **EDOM aktual** — perlu integrasi dengan sistem EDOM UGM
- **Mata Kuliah (kurikulum nyata)** — perlu integrasi SIMASTER atau input manual

### Prioritas Rendah / Integrasi Eksternal
- **SIMASTER** — data akademik mahasiswa (nilai, transkrip, SKS aktual)
- **SIMKEU/SAP UGM** — data keuangan departemen
- **SAPTO BAN-PT** — data akreditasi resmi
- **SINTA / Scopus** — H-Index dan skor publikasi dosen
- **PrivyID** — e-signature surat (saat ini placeholder "DRAFT")

---

## Catatan Teknis

| Item | Detail |
|---|---|
| Supabase Project | `xiucbtwwjokjxkseldbl.supabase.co` (Singapore region) |
| Data OSS API diambil | 30 Mei 2026 |
| Total tabel di Supabase | 7 (profiles, lecturers, students, publications, grants, letters, study_programs) |
| RLS | Aktif di semua tabel |
| Auth mode | Demo login (cookie-based), bukan Supabase Auth real |
| Demo login | `demo@dpp.ugm.ac.id` / `siapp2026` |
| AI mode | Phase 1 — mockAIStream untuk notulensi; Claude API aktif untuk surat draft & RPKPS |
| Nama palsu yang telah dihapus | 0 — seluruh file `.ts`/`.tsx` sudah bersih (verified via grep) |
