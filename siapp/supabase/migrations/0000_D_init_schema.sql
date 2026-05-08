-- SIAPP Migration 0000_D_init_schema
-- Dev D owns this migration. Schema only — no INSERTs (those go in seed.sql).
-- RLS enabled on every table — non-negotiable per CLAUDE.md.

-- ─── Profiles ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text UNIQUE NOT NULL,
  primary_role  text NOT NULL DEFAULT 'dosen',
  full_name     text,
  unit_id       uuid,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  deleted_at    timestamptz,
  created_by_ai boolean NOT NULL DEFAULT false,
  ai_draft_id   uuid
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles: users see own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles: users update own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- ─── Lecturers ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lecturers (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id      uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  nidn            text UNIQUE,
  jabatan         text,          -- Lektor / Lektor Kepala / Guru Besar / Asisten Profesor
  bidang_keahlian text[],
  h_index         int DEFAULT 0,
  orcid_id        text,
  sinta_id        text,
  scopus_id       text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  deleted_at      timestamptz,
  created_by_ai   boolean NOT NULL DEFAULT false,
  ai_draft_id     uuid
);

ALTER TABLE lecturers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lecturers: authenticated read" ON lecturers FOR SELECT TO authenticated USING (true);
CREATE POLICY "lecturers: own update" ON lecturers FOR UPDATE USING (
  profile_id = auth.uid()
);

-- ─── Study Programs ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS study_programs (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kode        text UNIQUE NOT NULL,  -- S1, S2, S3
  nama        text NOT NULL,
  kaprodi_id  uuid REFERENCES lecturers(id),
  jenjang     text,                  -- S1, S2, S3
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  deleted_at  timestamptz
);

ALTER TABLE study_programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "study_programs: authenticated read" ON study_programs FOR SELECT TO authenticated USING (true);

-- ─── Students ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS students (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nim             text UNIQUE NOT NULL,
  nama            text NOT NULL,
  prodi_id        uuid NOT NULL REFERENCES study_programs(id),
  angkatan        int NOT NULL,
  ipk             numeric(4,2),
  sks_lulus       int DEFAULT 0,
  status          text DEFAULT 'aktif', -- aktif / cuti / lulus / do
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  deleted_at      timestamptz,
  created_by_ai   boolean NOT NULL DEFAULT false,
  ai_draft_id     uuid
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "students: authenticated read" ON students FOR SELECT TO authenticated USING (true);

-- ─── Publications ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS publications (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lecturer_id     uuid NOT NULL REFERENCES lecturers(id),
  judul           text NOT NULL,
  jurnal          text,
  quartile        text,   -- Q1, Q2, Q3, Q4
  tahun           int,
  doi             text,
  sitasi          int DEFAULT 0,
  status          text DEFAULT 'Draft', -- Draft / Under Review / Published
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  deleted_at      timestamptz,
  created_by_ai   boolean NOT NULL DEFAULT false,
  ai_draft_id     uuid
);

ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "publications: authenticated read" ON publications FOR SELECT TO authenticated USING (true);
CREATE POLICY "publications: own write" ON publications FOR ALL USING (
  lecturer_id IN (SELECT id FROM lecturers WHERE profile_id = auth.uid())
);

-- ─── Letters ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS letters (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nomor           text UNIQUE,
  perihal         text NOT NULL,
  jenis           text NOT NULL,  -- Surat Keluar / SK / Surat Tugas / Nota Dinas
  isi             text,
  status          text DEFAULT 'Draft',  -- Draft / Menunggu / Ditandatangani / Diarsip
  created_by      uuid NOT NULL REFERENCES profiles(id),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  deleted_at      timestamptz,
  created_by_ai   boolean NOT NULL DEFAULT false,
  ai_draft_id     uuid
);

ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "letters: own read" ON letters FOR SELECT USING (created_by = auth.uid());
CREATE POLICY "letters: sekdep/kadep read all" ON letters FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND primary_role IN ('sekdep','kadep','tendik'))
);

-- ─── Grants / Hibah ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS grants (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lecturer_id     uuid NOT NULL REFERENCES lecturers(id),
  judul           text NOT NULL,
  sumber_dana     text,
  nilai           bigint,  -- in IDR
  tahun_mulai     int,
  tahun_selesai   int,
  status          text DEFAULT 'Aktif',  -- Aktif / Selesai / Ditolak
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  deleted_at      timestamptz,
  created_by_ai   boolean NOT NULL DEFAULT false,
  ai_draft_id     uuid
);

ALTER TABLE grants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "grants: authenticated read" ON grants FOR SELECT TO authenticated USING (true);

-- ─── AI Drafts ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_drafts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  target_table  text NOT NULL,
  payload       jsonb NOT NULL,
  confidence    numeric(4,3),
  sources       jsonb,
  rationale     text,
  status        text DEFAULT 'pending',  -- pending / accepted / rejected
  created_by    uuid REFERENCES profiles(id),
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE ai_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ai_drafts: own read" ON ai_drafts FOR SELECT USING (created_by = auth.uid());
CREATE POLICY "ai_drafts: own insert" ON ai_drafts FOR INSERT WITH CHECK (created_by = auth.uid());

-- ─── Audit Log ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_log (
  id          bigserial PRIMARY KEY,
  table_name  text NOT NULL,
  row_id      uuid,
  action      text NOT NULL,  -- INSERT / UPDATE / DELETE
  actor_id    uuid,
  before_data jsonb,
  after_data  jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audit_log: kadep/sekdep read" ON audit_log FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND primary_role IN ('kadep','sekdep'))
);

-- ─── Audit Trigger Function ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION fn_log_audit()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO audit_log (table_name, row_id, action, actor_id, before_data, after_data)
  VALUES (
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    TG_OP,
    auth.uid(),
    CASE WHEN TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN row_to_json(OLD)::jsonb END,
    CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN row_to_json(NEW)::jsonb END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Apply audit trigger to all domain tables
CREATE TRIGGER audit_profiles   AFTER INSERT OR UPDATE OR DELETE ON profiles   FOR EACH ROW EXECUTE FUNCTION fn_log_audit();
CREATE TRIGGER audit_lecturers  AFTER INSERT OR UPDATE OR DELETE ON lecturers  FOR EACH ROW EXECUTE FUNCTION fn_log_audit();
CREATE TRIGGER audit_students   AFTER INSERT OR UPDATE OR DELETE ON students   FOR EACH ROW EXECUTE FUNCTION fn_log_audit();
CREATE TRIGGER audit_letters    AFTER INSERT OR UPDATE OR DELETE ON letters    FOR EACH ROW EXECUTE FUNCTION fn_log_audit();
CREATE TRIGGER audit_publications AFTER INSERT OR UPDATE OR DELETE ON publications FOR EACH ROW EXECUTE FUNCTION fn_log_audit();
CREATE TRIGGER audit_grants     AFTER INSERT OR UPDATE OR DELETE ON grants     FOR EACH ROW EXECUTE FUNCTION fn_log_audit();
