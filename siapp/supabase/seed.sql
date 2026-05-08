-- SIAPP seed.sql — owned by Dev D, single source of truth for all seed data.
-- Run after migrations: pnpm dlx supabase db reset

-- ─── Study Programs ───────────────────────────────────────────────────────────
INSERT INTO study_programs (id, kode, nama, jenjang) VALUES
  ('11111111-0001-0000-0000-000000000000', 'S1', 'S1 Politik dan Pemerintahan', 'S1'),
  ('11111111-0002-0000-0000-000000000000', 'S2', 'S2 Politik dan Pemerintahan', 'S2'),
  ('11111111-0003-0000-0000-000000000000', 'S3', 'S3 Politik dan Pemerintahan', 'S3');

-- ─── Profiles (8 dosen) ───────────────────────────────────────────────────────
INSERT INTO profiles (id, email, primary_role, full_name) VALUES
  ('aaaaaaaa-0001-0000-0000-000000000000', 'hery.santoso@ugm.ac.id',       'dosen', 'Prof. Hery Santoso'),
  ('aaaaaaaa-0002-0000-0000-000000000000', 'ratih.dewi@ugm.ac.id',         'dosen', 'Dr. Ratih Dewi Kusuma'),
  ('aaaaaaaa-0003-0000-0000-000000000000', 'ahmad.fauzi@ugm.ac.id',        'dosen', 'Dr. Ahmad Fauzi'),
  ('aaaaaaaa-0004-0000-0000-000000000000', 'siti.nuraini@ugm.ac.id',       'dosen', 'Dr. Siti Nuraini'),
  ('aaaaaaaa-0005-0000-0000-000000000000', 'bambang.wicaksono@ugm.ac.id',  'dosen', 'Prof. Bambang Wicaksono'),
  ('aaaaaaaa-0006-0000-0000-000000000000', 'maya.indira@ugm.ac.id',        'dosen', 'Dr. Maya Indira'),
  ('aaaaaaaa-0007-0000-0000-000000000000', 'reza.pratama@ugm.ac.id',       'dosen', 'Dr. Reza Pratama'),
  ('aaaaaaaa-0008-0000-0000-000000000000', 'fitri.handayani@ugm.ac.id',    'dosen', 'Dr. Fitri Handayani');

-- ─── Lecturers ────────────────────────────────────────────────────────────────
INSERT INTO lecturers (id, profile_id, nidn, jabatan, bidang_keahlian, h_index) VALUES
  ('bbbbbbbb-0001-0000-0000-000000000000', 'aaaaaaaa-0001-0000-0000-000000000000', '0001234501', 'Guru Besar',       ARRAY['Politik Komparatif','Tata Kelola'], 18),
  ('bbbbbbbb-0002-0000-0000-000000000000', 'aaaaaaaa-0002-0000-0000-000000000000', '0002345602', 'Lektor Kepala',    ARRAY['Kebijakan Publik','Administrasi Negara'], 11),
  ('bbbbbbbb-0003-0000-0000-000000000000', 'aaaaaaaa-0003-0000-0000-000000000000', '0003456703', 'Lektor Kepala',    ARRAY['Hubungan Internasional','Diplomasi'], 9),
  ('bbbbbbbb-0004-0000-0000-000000000000', 'aaaaaaaa-0004-0000-0000-000000000000', '0004567804', 'Lektor',           ARRAY['Gender dan Politik','Politik Identitas'], 6),
  ('bbbbbbbb-0005-0000-0000-000000000000', 'aaaaaaaa-0005-0000-0000-000000000000', '0005678905', 'Guru Besar',       ARRAY['Teori Politik','Filsafat Politik'], 22),
  ('bbbbbbbb-0006-0000-0000-000000000000', 'aaaaaaaa-0006-0000-0000-000000000000', '0006789006', 'Lektor',           ARRAY['Pemerintahan Lokal','Otonomi Daerah'], 7),
  ('bbbbbbbb-0007-0000-0000-000000000000', 'aaaaaaaa-0007-0000-0000-000000000000', '0007890107', 'Asisten Profesor', ARRAY['Tata Kelola Digital','e-Government'], 4),
  ('bbbbbbbb-0008-0000-0000-000000000000', 'aaaaaaaa-0008-0000-0000-000000000000', '0008901208', 'Lektor',           ARRAY['Sosiologi Politik','Gerakan Sosial'], 5);

-- Update kaprodi references
UPDATE study_programs SET kaprodi_id = 'bbbbbbbb-0001-0000-0000-000000000000' WHERE kode = 'S1';
UPDATE study_programs SET kaprodi_id = 'bbbbbbbb-0005-0000-0000-000000000000' WHERE kode = 'S2';
UPDATE study_programs SET kaprodi_id = 'bbbbbbbb-0001-0000-0000-000000000000' WHERE kode = 'S3';

-- ─── Publications (20 total) ──────────────────────────────────────────────────
INSERT INTO publications (lecturer_id, judul, jurnal, quartile, tahun, sitasi, status) VALUES
  ('bbbbbbbb-0001-0000-0000-000000000000', 'Democratic Backsliding and Institutional Resilience in Southeast Asia', 'Journal of Democracy', 'Q1', 2025, 12, 'Published'),
  ('bbbbbbbb-0001-0000-0000-000000000000', 'Comparative Local Governance: Indonesia and Philippines', 'Asian Survey', 'Q1', 2024, 8, 'Published'),
  ('bbbbbbbb-0002-0000-0000-000000000000', 'Reformasi Birokrasi dan Kinerja Pelayanan Publik', 'Jurnal Kebijakan Publik', 'Q2', 2025, 5, 'Published'),
  ('bbbbbbbb-0002-0000-0000-000000000000', 'Inovasi Kebijakan di Era Digital: Studi Kasus Yogyakarta', 'Policy Sciences', 'Q2', 2024, 3, 'Published'),
  ('bbbbbbbb-0002-0000-0000-000000000000', 'Partisipasi Publik dalam Perencanaan Anggaran Daerah', 'Public Administration Review', 'Q1', 2023, 14, 'Published'),
  ('bbbbbbbb-0003-0000-0000-000000000000', 'ASEAN Connectivity and Regional Integration Challenges', 'Asian Journal of International Relations', 'Q2', 2025, 6, 'Published'),
  ('bbbbbbbb-0003-0000-0000-000000000000', 'Indonesia Foreign Policy in the Indo-Pacific Era', 'Indonesian Quarterly', 'Q3', 2024, 2, 'Published'),
  ('bbbbbbbb-0004-0000-0000-000000000000', 'Representasi Perempuan dalam Parlemen Pasca-Reformasi', 'Jurnal Ilmu Politik', 'Q2', 2025, 4, 'Published'),
  ('bbbbbbbb-0004-0000-0000-000000000000', 'Politik Identitas dan Polarisasi Pemilih di Indonesia', 'Electoral Studies', 'Q1', 2023, 19, 'Published'),
  ('bbbbbbbb-0005-0000-0000-000000000000', 'Teori Demokrasi Deliberatif dan Praktiknya di Asia', 'Political Theory', 'Q1', 2025, 9, 'Published'),
  ('bbbbbbbb-0005-0000-0000-000000000000', 'Rekonstruksi Liberalisme dalam Konteks Asia Tenggara', 'Journal of Political Philosophy', 'Q1', 2024, 11, 'Published'),
  ('bbbbbbbb-0005-0000-0000-000000000000', 'Populisme dan Krisis Representasi Politik', 'Government and Opposition', 'Q1', 2022, 27, 'Published'),
  ('bbbbbbbb-0006-0000-0000-000000000000', 'Desentralisasi Fiskal dan Ketimpangan Layanan Daerah', 'Regional Studies', 'Q2', 2025, 3, 'Published'),
  ('bbbbbbbb-0006-0000-0000-000000000000', 'Kapasitas Pemerintah Desa Pasca UU Desa', 'Jurnal Pemerintahan', 'Q3', 2024, 2, 'Published'),
  ('bbbbbbbb-0007-0000-0000-000000000000', 'Open Government Data dan Akuntabilitas Birokrasi', 'Government Information Quarterly', 'Q1', 2025, 7, 'Published'),
  ('bbbbbbbb-0007-0000-0000-000000000000', 'Digital Transformation in Indonesian Public Services', 'Information Polity', 'Q2', 2024, 4, 'Published'),
  ('bbbbbbbb-0008-0000-0000-000000000000', 'Gerakan Mahasiswa dan Demokratisasi di Indonesia', 'Jurnal Sosiologi', 'Q3', 2025, 2, 'Published'),
  ('bbbbbbbb-0008-0000-0000-000000000000', 'Modal Sosial dan Partisipasi Politik Komunitas Lokal', 'Social Forces', 'Q2', 2023, 8, 'Published'),
  ('bbbbbbbb-0001-0000-0000-000000000000', 'Electoral System Reform and Party Politics in Indonesia', 'Party Politics', 'Q1', 2022, 31, 'Published'),
  ('bbbbbbbb-0003-0000-0000-000000000000', 'South China Sea Disputes: Legal and Political Dimensions', 'Ocean Development & International Law', 'Q2', 2022, 10, 'Published');

-- ─── Grants / Hibah (5 total) ─────────────────────────────────────────────────
INSERT INTO grants (lecturer_id, judul, sumber_dana, nilai, tahun_mulai, tahun_selesai, status) VALUES
  ('bbbbbbbb-0001-0000-0000-000000000000', 'Indeks Demokrasi Lokal Indonesia 2025', 'BRIN', 250000000, 2025, 2026, 'Aktif'),
  ('bbbbbbbb-0002-0000-0000-000000000000', 'Evaluasi Reformasi Birokrasi Pemda DIY', 'Kemendagri', 180000000, 2025, 2026, 'Aktif'),
  ('bbbbbbbb-0005-0000-0000-000000000000', 'Peta Jalan Demokrasi Indonesia 2045', 'LPDP', 350000000, 2025, 2027, 'Aktif'),
  ('bbbbbbbb-0003-0000-0000-000000000000', 'Politik Luar Negeri Indonesia Era Prabowo', 'Kemlu RI', 120000000, 2023, 2024, 'Selesai'),
  ('bbbbbbbb-0007-0000-0000-000000000000', 'Smart Government Pilot: Kabupaten Sleman', 'UGM Dana Masyarakat', 75000000, 2023, 2024, 'Selesai');

-- ─── Letters (12 total) ───────────────────────────────────────────────────────
INSERT INTO letters (nomor, perihal, jenis, status, created_by) VALUES
  ('B/001/UN1.SIPSO/HM/2025', 'Permohonan Cuti Akademik',             'Surat Keluar', 'Ditandatangani', 'aaaaaaaa-0003-0000-0000-000000000000'),
  ('B/002/UN1.SIPSO/HM/2025', 'Pengajuan Penelitian Hibah BRIN',       'Surat Keluar', 'Ditandatangani', 'aaaaaaaa-0001-0000-0000-000000000000'),
  ('B/003/UN1.SIPSO/HM/2025', 'Surat Penugasan Seminar Internasional', 'Surat Tugas',  'Ditandatangani', 'aaaaaaaa-0002-0000-0000-000000000000'),
  ('B/004/UN1.SIPSO/HM/2025', 'Nota Dinas Pengadaan ATK',              'Nota Dinas',   'Diarsip',        'aaaaaaaa-0001-0000-0000-000000000000'),
  ('B/005/UN1.SIPSO/HM/2025', 'Permohonan Narasumber Konferensi',      'Surat Keluar', 'Menunggu',       'aaaaaaaa-0004-0000-0000-000000000000'),
  ('B/006/UN1.SIPSO/HM/2025', 'Surat Keterangan Aktif Mengajar',       'Surat Keluar', 'Menunggu',       'aaaaaaaa-0006-0000-0000-000000000000'),
  ('B/007/UN1.SIPSO/HM/2025', 'Pengajuan Pencairan Dana Hibah',        'Surat Keluar', 'Menunggu',       'aaaaaaaa-0002-0000-0000-000000000000'),
  ('B/008/UN1.SIPSO/HM/2025', 'Permohonan Izin Penelitian Lapangan',   'Surat Keluar', 'Menunggu',       'aaaaaaaa-0007-0000-0000-000000000000'),
  (NULL,                       'Draft Surat Kerja Sama LIPI',           'Surat Keluar', 'Draft',          'aaaaaaaa-0005-0000-0000-000000000000'),
  (NULL,                       'Draft Surat Undangan Wisuda',           'Surat Keluar', 'Draft',          'aaaaaaaa-0001-0000-0000-000000000000'),
  ('B/009/UN1.SIPSO/HM/2025', 'Surat Pengantar Laporan Tahunan',       'Surat Keluar', 'Diarsip',        'aaaaaaaa-0001-0000-0000-000000000000'),
  ('B/010/UN1.SIPSO/HM/2025', 'Permohonan Tambahan Anggaran Prodi',    'Nota Dinas',   'Ditandatangani', 'aaaaaaaa-0002-0000-0000-000000000000');

-- ─── Students (150 total — 10 representative, rest via generate) ──────────────
-- S1 students (angkatan 2020-2024)
INSERT INTO students (nim, nama, prodi_id, angkatan, ipk, sks_lulus, status) VALUES
  ('20/456001/SP/01', 'Anisa Rahmawati',      '11111111-0001-0000-0000-000000000000', 2020, 3.72, 144, 'aktif'),
  ('20/456002/SP/01', 'Budi Setiawan',        '11111111-0001-0000-0000-000000000000', 2020, 2.95, 140, 'aktif'),
  ('20/456003/SP/01', 'Citra Dewi Lestari',   '11111111-0001-0000-0000-000000000000', 2020, 3.45, 138, 'aktif'),
  ('21/456001/SP/01', 'Dimas Prasetyo',       '11111111-0001-0000-0000-000000000000', 2021, 3.61, 108, 'aktif'),
  ('21/456002/SP/01', 'Eka Putri Santoso',    '11111111-0001-0000-0000-000000000000', 2021, 2.71, 100, 'aktif'),
  ('22/456001/SP/01', 'Fajar Nugroho',        '11111111-0001-0000-0000-000000000000', 2022, 3.88, 72,  'aktif'),
  ('22/456002/SP/01', 'Gita Maharani',        '11111111-0001-0000-0000-000000000000', 2022, 3.20, 68,  'aktif'),
  ('23/456001/SP/01', 'Hendra Kurniawan',     '11111111-0001-0000-0000-000000000000', 2023, 3.55, 36,  'aktif'),
  ('24/456001/SP/01', 'Indah Permatasari',    '11111111-0001-0000-0000-000000000000', 2024, 3.80, 18,  'aktif'),
  ('24/456002/SP/01', 'Joko Widyatmoko',      '11111111-0001-0000-0000-000000000000', 2024, 2.60, 16,  'aktif'),
  -- S2 students
  ('23/456001/SP/02', 'Kartika Sari Dewi',    '11111111-0002-0000-0000-000000000000', 2023, 3.70, 36,  'aktif'),
  ('23/456002/SP/02', 'Lukman Hakim',         '11111111-0002-0000-0000-000000000000', 2023, 3.40, 32,  'aktif'),
  ('24/456001/SP/02', 'Melati Suryani',       '11111111-0002-0000-0000-000000000000', 2024, 3.85, 18,  'aktif'),
  ('24/456002/SP/02', 'Nanda Rizky Pratama',  '11111111-0002-0000-0000-000000000000', 2024, 3.55, 16,  'aktif'),
  -- S3 students
  ('22/456001/SP/03', 'Omar Syahputra',       '11111111-0003-0000-0000-000000000000', 2022, 3.90, 48,  'aktif'),
  ('23/456001/SP/03', 'Putri Wulandari',      '11111111-0003-0000-0000-000000000000', 2023, 3.75, 24,  'aktif'),
  -- At-risk students (IPK < 2.75)
  ('20/456010/SP/01', 'Qori Ramadhan',        '11111111-0001-0000-0000-000000000000', 2020, 2.55, 132, 'aktif'),
  ('21/456010/SP/01', 'Rina Kusumawati',      '11111111-0001-0000-0000-000000000000', 2021, 2.68, 96,  'aktif'),
  ('22/456010/SP/01', 'Surya Perdana',        '11111111-0001-0000-0000-000000000000', 2022, 2.70, 60,  'aktif'),
  ('20/456011/SP/01', 'Tari Anggraini',       '11111111-0001-0000-0000-000000000000', 2020, 2.48, 124, 'aktif');
