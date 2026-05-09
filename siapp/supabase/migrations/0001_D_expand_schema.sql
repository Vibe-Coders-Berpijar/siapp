-- SIAPP Migration 0001_D_expand_schema
-- Dev D: additional tables needed by Dev C (mata_kuliah, riset_proposals)
-- and Dev B (room_bookings), plus letters table column expansion.
-- Depends on 0000_D_init_schema (fn_log_audit, ai_drafts must exist).

-- ─── Mata Kuliah ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mata_kuliah (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kode            text UNIQUE NOT NULL,
  nama            text NOT NULL,
  sks             int NOT NULL DEFAULT 3,
  kelas           text,              -- A, B, C
  peserta         int DEFAULT 0,
  rpkps_status    text DEFAULT 'Draft',   -- Draft / Menunggu / Disetujui
  edom_score      numeric(3,2),
  semester        text,              -- e.g. Ganjil 2025/2026
  lecturer_id     uuid NOT NULL REFERENCES lecturers(id) ON DELETE CASCADE,
  prodi_id        uuid REFERENCES study_programs(id),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  deleted_at      timestamptz,
  created_by_ai   boolean NOT NULL DEFAULT false,
  ai_draft_id     uuid REFERENCES ai_drafts(id)
);

ALTER TABLE mata_kuliah ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mata_kuliah: authenticated read" ON mata_kuliah
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "mata_kuliah: own write" ON mata_kuliah
  FOR ALL USING (
    lecturer_id IN (SELECT id FROM lecturers WHERE profile_id = auth.uid())
  );

CREATE TRIGGER audit_mata_kuliah
  AFTER INSERT OR UPDATE OR DELETE ON mata_kuliah
  FOR EACH ROW EXECUTE FUNCTION fn_log_audit();

-- ─── Riset Proposals ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS riset_proposals (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  judul           text NOT NULL,
  jenis           text NOT NULL,   -- Penelitian / PkM
  status          text DEFAULT 'Draft',  -- Draft / Diajukan / Ditinjau / Disetujui / Ditolak
  tahun           int,
  abstrak         text,
  outline         text,
  anggaran        bigint,          -- IDR
  lama_kegiatan   int,             -- months
  mitra           text,
  luaran           text,           -- expected output
  lecturer_id     uuid NOT NULL REFERENCES lecturers(id) ON DELETE CASCADE,
  submitted_at    timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  deleted_at      timestamptz,
  created_by_ai   boolean NOT NULL DEFAULT false,
  ai_draft_id     uuid REFERENCES ai_drafts(id)
);

ALTER TABLE riset_proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "riset_proposals: own read" ON riset_proposals
  FOR SELECT USING (
    lecturer_id IN (SELECT id FROM lecturers WHERE profile_id = auth.uid())
  );
CREATE POLICY "riset_proposals: kaprodi/kadep read all" ON riset_proposals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND primary_role IN ('kadep', 'kaprodi_s1', 'kaprodi_s2', 'kaprodi_s3')
    )
  );
CREATE POLICY "riset_proposals: own write" ON riset_proposals
  FOR ALL USING (
    lecturer_id IN (SELECT id FROM lecturers WHERE profile_id = auth.uid())
  );

CREATE TRIGGER audit_riset_proposals
  AFTER INSERT OR UPDATE OR DELETE ON riset_proposals
  FOR EACH ROW EXECUTE FUNCTION fn_log_audit();

-- ─── Room Bookings ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS room_bookings (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_ruang      text NOT NULL,
  tanggal         date NOT NULL,
  waktu_mulai     time NOT NULL,
  waktu_selesai   time NOT NULL,
  keperluan       text NOT NULL,
  pemohon_id      uuid NOT NULL REFERENCES profiles(id),
  status          text DEFAULT 'Menunggu',  -- Menunggu / Dikonfirmasi / Ditolak
  catatan         text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  deleted_at      timestamptz,
  created_by_ai   boolean NOT NULL DEFAULT false,
  ai_draft_id     uuid REFERENCES ai_drafts(id)
);

ALTER TABLE room_bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "room_bookings: own read" ON room_bookings
  FOR SELECT USING (pemohon_id = auth.uid());
CREATE POLICY "room_bookings: sekdep/tendik read all" ON room_bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND primary_role IN ('sekdep', 'tendik', 'kadep')
    )
  );
CREATE POLICY "room_bookings: authenticated insert" ON room_bookings
  FOR INSERT TO authenticated WITH CHECK (pemohon_id = auth.uid());
CREATE POLICY "room_bookings: sekdep update status" ON room_bookings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND primary_role IN ('sekdep', 'tendik')
    )
  );

CREATE TRIGGER audit_room_bookings
  AFTER INSERT OR UPDATE OR DELETE ON room_bookings
  FOR EACH ROW EXECUTE FUNCTION fn_log_audit();

-- ─── Letters — expand columns ─────────────────────────────────────────────────
-- Original letters table only had: id, nomor, perihal, jenis, isi, status,
-- created_by, timestamps. Dev B's data model requires additional fields.
ALTER TABLE letters
  ADD COLUMN IF NOT EXISTS direction     text DEFAULT 'keluar',   -- keluar / masuk
  ADD COLUMN IF NOT EXISTS pengirim      text,
  ADD COLUMN IF NOT EXISTS tujuan        text,
  ADD COLUMN IF NOT EXISTS tanggal       date DEFAULT CURRENT_DATE,
  ADD COLUMN IF NOT EXISTS approval_step int DEFAULT 0,           -- 0-4
  ADD COLUMN IF NOT EXISTS approval_catatan text;
