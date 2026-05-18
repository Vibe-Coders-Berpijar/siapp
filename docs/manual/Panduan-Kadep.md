# Panduan Pengguna SIAPP
## Kepala Departemen (Kadep)
**Sistem Informasi Departemen Politik Pemerintahan — UGM**

---

> Dokumen ini ditujukan khusus untuk **Kepala Departemen**. Panduan ini ditulis dalam bahasa yang mudah dipahami tanpa perlu pengetahuan teknis.

---

## Daftar Isi

1. [Masuk ke Sistem](#1-masuk-ke-sistem)
2. [Halaman Utama (Dashboard)](#2-halaman-utama-dashboard)
3. [Modul Akreditasi](#3-modul-akreditasi)
4. [Modul Kepegawaian](#4-modul-kepegawaian)
5. [Modul Keuangan](#5-modul-keuangan)
6. [Modul Persuratan](#6-modul-persuratan)
7. [Keluar dari Sistem](#7-keluar-dari-sistem)

---

## 1. Masuk ke Sistem

1. Buka browser (Chrome atau Firefox dianjurkan) dan masuk ke alamat SIAPP yang diberikan.
2. Pada halaman login, masukkan **alamat email UGM** Anda (contoh: `namadosen@ugm.ac.id`).

![Tampilan halaman login — kolom email UGM dan tombol "Kirim Kode OTP"](../assets/login-halaman.png)

3. Klik tombol **Kirim Kode OTP**.
4. Buka email Anda — Anda akan menerima kode 6 angka dalam beberapa detik.
5. Masukkan kode tersebut pada halaman verifikasi, lalu klik **Verifikasi**.

![Tampilan halaman verifikasi OTP — kotak isian 6 digit dan tombol "Verifikasi"](../assets/login-otp-verifikasi.png)

6. Sistem akan otomatis membawa Anda ke **Dashboard Kepala Departemen**.

> **Catatan:** Kode OTP hanya berlaku selama 10 menit. Jika kode kedaluwarsa, klik "Kirim ulang kode".

---

## 2. Halaman Utama (Dashboard)

Setelah masuk, Anda akan melihat halaman utama yang berisi ringkasan kondisi departemen secara keseluruhan.

![Tampilan penuh Dashboard Kadep — KPI cards, grafik Tridharma, grid BAN-PT, dan panel persetujuan menunggu](../assets/dashboard-kadep-overview.png)

### 2.1 Kartu Ringkasan (KPI)

Di bagian atas halaman terdapat **4 kartu angka** yang menampilkan:

| Kartu | Keterangan |
|---|---|
| **Jumlah Dosen** | Total dosen aktif di departemen |
| **Jumlah Publikasi** | Publikasi ilmiah tahun berjalan |
| **Hibah Aktif** | Hibah penelitian yang sedang berjalan |
| **Jumlah Mahasiswa** | Total mahasiswa aktif seluruh program |

### 2.2 Grafik Tridharma

Grafik batang/garis di tengah halaman menampilkan kinerja departemen dalam tiga pilar utama:
- **Pendidikan** — aktivitas pengajaran
- **Penelitian** — publikasi dan hibah
- **Pengabdian** — kegiatan pengabdian masyarakat

### 2.3 Panel Akreditasi BAN-PT

Grid 9 kotak menampilkan skor per kriteria akreditasi (K1–K9). Warna kotak menunjukkan kondisi:
- **Hijau** — baik (skor ≥ 80%)
- **Kuning** — perlu perhatian (50–79%)
- **Merah** — kritis (di bawah 50%)

![Grid 9 kriteria BAN-PT dengan warna hijau/kuning/merah sesuai skor masing-masing](../assets/dashboard-banpt-grid.png)

### 2.4 Widget Persetujuan Menunggu

Daftar surat dan dokumen yang **menunggu tanda tangan atau keputusan** Anda. Klik item untuk melihat detail dan mengambil tindakan.

### 2.5 Panel Wawasan AI

Tiga rekomendasi otomatis dari sistem berdasarkan data departemen terkini. Gunakan ini sebagai bahan pertimbangan dalam pengambilan keputusan.

---

## 3. Modul Akreditasi

Untuk membuka modul ini, klik **Akreditasi** pada menu samping kiri.

![Tampilan penuh halaman Akreditasi — kartu ringkasan skor, panel 9 kriteria, dan panel rekomendasi AI di sisi kanan](../assets/akreditasi-halaman.png)

### 3.1 Kartu Ringkasan Akreditasi

Di bagian atas terdapat 4 kartu:
- **Skor Rata-rata** — rata-rata skor seluruh kriteria
- **Kriteria Baik** — jumlah kriteria dengan skor ≥ 80%
- **Perlu Perhatian** — jumlah kriteria dengan skor 50–79%
- **Kritis** — jumlah kriteria dengan skor di bawah 50%

### 3.2 Panel 9 Kriteria (BAN-PT / LAMSPAK)

Setiap baris menampilkan satu kriteria (K1 hingga K9) beserta:
- Nama kriteria
- Skor saat ini
- Indikator status (warna)
- Detail metrik pendukung

Klik pada salah satu kriteria untuk melihat rincian indikator dan bukti yang sudah terekam.

### 3.3 Rekomendasi AI

Panel di sisi kanan memberikan saran berbasis data untuk meningkatkan skor kriteria yang masih rendah. Saran ini bersifat informatif dan tidak mengubah data apapun secara otomatis.

![Panel rekomendasi AI — daftar saran dengan ikon warna sesuai tingkat urgensi](../assets/akreditasi-ai-rekomendasi.png)

### 3.4 Bukti Hibah

Menampilkan daftar hibah penelitian aktif yang menjadi bukti pendukung akreditasi. Data ini berasal dari modul Penelitian dan hanya dapat dibaca di sini.

---

## 4. Modul Kepegawaian

Untuk membuka modul ini, klik **Kepegawaian** pada menu samping kiri.

### 4.1 Kartu Ringkasan Dosen

Lima kartu di bagian atas menampilkan jumlah dosen berdasarkan jabatan fungsional:
- Guru Besar
- Lektor Kepala
- Lektor
- Asisten Ahli
- Total Seluruh Dosen

### 4.2 Tabel Data Dosen

Tabel ini menampilkan seluruh dosen aktif dengan informasi:
- Nama lengkap
- NIDN
- Jabatan fungsional
- Kinerja

![Tabel data dosen — kolom nama, NIDN, jabatan, dan tombol aksi edit/hapus di setiap baris](../assets/kepegawaian-tabel-dosen.png)

**Cara menambah dosen baru:**
1. Klik tombol **+ Tambah Dosen** di pojok kanan atas tabel.
2. Isi formulir yang muncul: nama, NIDN, jabatan, dan data lainnya.
3. Klik **Simpan**.

![Modal formulir tambah dosen — kolom nama, NIDN, jabatan, dan tombol Simpan](../assets/kepegawaian-form-tambah.png)

**Cara mengubah data dosen:**
1. Pada baris dosen yang ingin diubah, klik ikon pensil (edit).
2. Ubah data yang diperlukan.
3. Klik **Simpan**.

**Cara menghapus data dosen:**
1. Pada baris dosen yang ingin dihapus, klik ikon tempat sampah.
2. Konfirmasi penghapusan pada dialog yang muncul.

> **Perhatian:** Penghapusan data bersifat permanen. Pastikan data yang dihapus sudah benar.

### 4.3 Galeri Profil Dosen

Di bawah tabel terdapat tampilan kartu foto seluruh dosen. Klik nama dosen untuk melihat profil lengkapnya.

---

## 5. Modul Keuangan

Untuk membuka modul ini, klik **Keuangan** pada menu samping kiri.

### 5.1 Kartu Ringkasan Anggaran

Empat kartu menampilkan kondisi anggaran departemen:

| Kartu | Keterangan |
|---|---|
| **Pagu Anggaran** | Total anggaran yang dialokasikan |
| **Terealisasi** | Jumlah anggaran yang sudah digunakan |
| **Sisa Anggaran** | Anggaran yang belum digunakan |
| **Terserap (%)** | Persentase penyerapan anggaran |

### 5.2 Grafik Realisasi Bulanan

Grafik batang yang membandingkan **anggaran yang direncanakan** (warna biru) vs. **yang sudah terealisasi** (warna hijau) per bulan (Januari–Desember). Gunakan grafik ini untuk memantau apakah penyerapan anggaran berjalan sesuai rencana.

![Grafik batang realisasi anggaran bulanan — batang biru (rencana) vs. hijau (realisasi) per bulan](../assets/keuangan-grafik-realisasi.png)

### 5.3 Tabel Rincian per Jenis Belanja

Tabel ini merinci penggunaan anggaran berdasarkan kategori:
- Belanja Pegawai
- Belanja Barang
- Belanja Perjalanan Dinas
- Belanja Penelitian & PkM
- Belanja Modal

Setiap baris menampilkan anggaran, realisasi, dan persentase penyerapan untuk masing-masing kategori.

---

## 6. Modul Persuratan

Untuk membuka modul ini, klik **Persuratan** pada menu samping kiri.

### 6.1 Kartu Ringkasan Surat

Empat kartu menampilkan jumlah surat berdasarkan status:
- **Total Surat** — seluruh surat yang ada
- **Menunggu** — surat menunggu tanda tangan Anda
- **Ditandatangani** — surat yang sudah ditandatangani
- **Diarsip** — surat yang sudah diarsipkan

### 6.2 Tabel Surat

Tabel menampilkan daftar surat dengan kolom:
- Nomor surat
- Perihal (judul/subjek surat)
- Pengaju
- Tanggal
- Status (dengan warna sesuai kondisi)

![Tabel daftar surat — tab filter di atas, baris surat dengan badge status berwarna](../assets/persuratan-tabel-kadep.png)

**Cara menyaring surat:**
Gunakan tab di atas tabel untuk menyaring tampilan:
- **Semua** — tampilkan seluruh surat
- **Menunggu** — hanya surat yang perlu persetujuan
- **Ditandatangani** — surat yang sudah selesai
- **Diarsip** — surat yang sudah diarsipkan

### 6.3 Menandatangani Surat

1. Klik tab **Menunggu** untuk melihat surat yang perlu tanda tangan.
2. Klik tombol tanda tangan pada baris surat yang ingin disetujui.
3. Konfirmasi tindakan pada dialog yang muncul.
4. Status surat akan berubah menjadi **Ditandatangani**.

> 📸 *[Screenshot belum tersedia: Dialog konfirmasi tanda tangan surat — nama surat, tombol Konfirmasi dan Batal]*

### 6.4 Membuat Surat Baru

1. Klik tombol **+ Buat Surat** di pojok kanan atas.
2. Isi formulir:
   - **Nomor Surat** — dapat diisi otomatis atau manual
   - **Perihal** — judul/subjek surat
   - **Pengaju** — nama pemohon
   - **Tanggal** — tanggal surat
   - **Status** — pilih status awal (Draft atau Menunggu)
3. Klik **Simpan**.

![Modal formulir buat surat baru — kolom nomor, perihal, pengaju, tanggal, dropdown status, dan tombol Simpan](../assets/persuratan-form-buat-surat.png)

---

## 7. Keluar dari Sistem

1. Klik nama atau foto profil Anda di pojok kanan atas layar.
2. Klik **Keluar** (Logout).
3. Anda akan diarahkan kembali ke halaman login.

> **Tips keamanan:** Selalu keluar dari sistem setelah selesai menggunakannya, terutama jika menggunakan komputer bersama.

---

*Versi dokumen: 1.0 — Mei 2026*
*Untuk pertanyaan teknis, hubungi tim Pijar Foundation.*
