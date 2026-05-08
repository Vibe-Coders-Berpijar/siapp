# SIAPP — Claude Code Project Memory

**Sistem Informasi Departemen Politik Pemerintahan**
Academic Intelligence Operating System for DPP UGM
Build partner: Pijar Foundation (4-person vibe coding pod)

---

## Non-Negotiables (confirm these before writing any code)

1. **RLS first** — every table gets Row-Level Security enabled in the same migration commit. Never push a migration that disables RLS to "make testing easier."
2. **AI is a draft mechanism, not a write mechanism** — AI never inserts or updates a row directly. It returns proposed content to `ai_drafts` table; the user clicks "Accept," then a server action writes the row with `created_by_ai = true`.
3. **Audit log is non-negotiable** — every mutation (INSERT, UPDATE, DELETE) on every domain table fires `fn_log_audit()`. No exceptions.
4. **Server actions over API routes** — use server actions for all mutations triggered from forms. API routes only for webhooks, cron jobs, and third-party integration callbacks.
5. **Bahasa Indonesia on all user-facing strings** — UI labels, error messages, empty states, button text. English is allowed in code, comments, and variable names.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.4+ strict mode |
| Database | Supabase Postgres 15 (Singapore region) |
| Auth | Supabase Auth — OTP-only, `@ugm.ac.id` emails |
| Styling | Tailwind CSS 3.4 |
| Components | shadcn/ui (customized via CSS vars) |
| Tables | TanStack Table v8 |
| Charts | Recharts |
| AI | Anthropic Claude API — Haiku 4.5 default, Sonnet 4.6 escalate, Opus 4.6 reserved |
| Vectors | pgvector (built into Supabase) |
| Email | Resend |
| WhatsApp | Fonnte |
| Hosting | Vercel (Singapore region) |
| Package manager | pnpm 9+ |

---

## Project Structure

```
siapp/
├── CLAUDE.md                    ← this file
├── app/
│   ├── (auth)/login/            ← OTP login page
│   ├── (auth)/verify/           ← OTP verify page
│   ├── (app)/dashboard/
│   │   ├── kadep/               ← Dev A owns this
│   │   ├── sekretariat/         ← Dev B owns this
│   │   ├── dosen/               ← Dev C owns this
│   │   └── kaprodi/             ← Dev D owns this
│   └── (app)/kesekretariatan/   ← Dev B owns this
├── components/
│   ├── shared/
│   │   ├── StatusBadge.tsx      ← Dev D provides, everyone imports
│   │   ├── StatCard.tsx         ← Dev D provides, everyone imports
│   │   └── AiDraftBanner.tsx
│   └── ui/                      ← shadcn/ui primitives
├── lib/
│   ├── supabase/client.ts
│   ├── supabase/server.ts
│   ├── ai/route.ts              ← ALL AI calls go through here, no exceptions
│   ├── mock-ai.ts               ← Dev D provides mockAIStream() helper
│   ├── audit.ts
│   └── auth/rbac.ts
└── supabase/
    ├── migrations/              ← numbered by dev (see below)
    └── seed.sql                 ← Dev D owns, single source of truth for all seed data
```

---

## 4-Dev Ownership Map

| Dev | Dashboard | Route folders | Migration prefix |
|---|---|---|---|
| Dev A | Kadep (Kepala Departemen) | `app/(app)/dashboard/kadep` | `0001_A_*` |
| Dev B | Sekretariat (Admin) | `app/(app)/dashboard/sekretariat`, `app/(app)/kesekretariatan` | `0002_B_*` |
| Dev C | Dosen | `app/(app)/dashboard/dosen` | `0003_C_*` |
| Dev D | Kaprodi + Shared Setup | `app/(app)/dashboard/kaprodi`, `components/shared`, `lib/mock-ai.ts`, `supabase/seed.sql` | `0000_D_*`, `0004_D_*` |

**Cross-ownership rule:** changes to `components/shared/`, `lib/supabase/`, `lib/audit.ts`, `package.json` require at least 1 approval from a different dev.

---

## Auth & Role Routing

OTP-only. Allowed email domain: `@ugm.ac.id`.

After OTP verify, read `profiles.primary_role` and redirect:

```
kadep        → /dashboard/kadep
sekdep       → /dashboard/sekretariat
dosen        → /dashboard/dosen
kaprodi_s1   → /dashboard/kaprodi
kaprodi_s2   → /dashboard/kaprodi
kaprodi_s3   → /dashboard/kaprodi
tendik       → /dashboard/sekretariat
```

---

## Database Conventions

- Table names: `snake_case`, plural (`lecturers`, `letters`)
- PKs: `id uuid default gen_random_uuid()` — never integer
- Every table has: `created_at timestamptz default now()`, `updated_at timestamptz default now()`, `deleted_at timestamptz` (soft delete)
- Every domain table has: `created_by_ai boolean default false`, `ai_draft_id uuid references ai_drafts(id)`
- RLS enabled on every table — no exceptions

### Audit trigger (apply to every domain table)

```sql
create trigger audit_<tablename>
after insert or update or delete on <tablename>
for each row execute function fn_log_audit();
```

### AI drafts pattern (ADR-006)

AI **never** writes to domain tables directly. Flow:
1. AI call → write to `ai_drafts` with `target_table`, `payload`, `confidence`, `sources`
2. User sees `AiDraftBanner` with Accept / Edit / Reject
3. On Accept → server action moves payload to domain table, marks draft `accepted`

---

## AI Architecture

All AI calls go through `lib/ai/route.ts`. Never call Anthropic SDK directly from a feature file.

### Model routing

| Feature | Model |
|---|---|
| Classification, tagging, dedup | Haiku 4.5 |
| Letter drafting, RPKPS, report generation | Sonnet 4.6 |
| Accreditation gap analysis, borang draft | Opus 4.6 (Phase 3 only) |

### Mock AI pattern (Phase 1)

All AI features use `mockAIStream()` from `@/lib/mock-ai` during the 24-hour MVP sprint. Add the TODO comment so it's easy to find and replace:

```ts
// TODO: replace with aiRoute('module.feature_name') in Phase 2
const result = await mockAIStream('...draft content...', 1500);
```

### Data classification rule

- `public` data → can be sent to AI API
- `internal` data → redact PII fields before sending
- `confidential` data (NIK, gaji, NPWP) → **never** send to AI API

---

## Seed Data (managed by Dev D)

All INSERT statements live only in `supabase/seed.sql`. Other devs write schema-only migrations (no INSERTs).

Seed includes:
- 8 dosen: Prof. Hery Santoso, Dr. Ratih Dewi Kusuma, Dr. Ahmad Fauzi, Dr. Siti Nuraini, Prof. Bambang Wicaksono, Dr. Maya Indira, Dr. Reza Pratama, Dr. Fitri Handayani
- 3 prodi: S1, S2, S3 Politik dan Pemerintahan
- 12 surat: mix of Draft / Menunggu / Ditandatangani / Diarsip
- 20 publikasi: mix Q1–Q4, years 2022–2025
- 5 hibah: 3 active, 2 completed
- 150 mahasiswa: intake 2020–2024, varied IPK

---

## Shared Components (provided by Dev D, imported by all)

```ts
// StatusBadge — colored pill for status values
import { StatusBadge } from '@/components/shared/StatusBadge';
// status values: draft|belum→gray, menunggu|pending→amber, aktif|selesai|ditandatangani→green, ditolak→red

// StatCard — metric display card
import { StatCard } from '@/components/shared/StatCard';
// props: label, value, trend?, hint?

// mockAIStream — simulates AI response delay for mock features
import { mockAIStream } from '@/lib/mock-ai';
// usage: const result = await mockAIStream('draft content here', 1500);
```

**If Dev D hasn't merged yet**, define these inline at the top of your file and add:
```ts
// TODO: replace with import from @/components/shared once Dev D merges
```

---

## Workflow Engine

All approval flows (surat, cuti, booking, hibah) go through the workflow engine in `lib/workflow/engine.ts`. Never build ad-hoc approval logic in a feature.

Workflow codes in use:
- `surat.keluar` — Drafter → Sekdep → Kadep (e-sign)
- `room_booking` — auto-approve if no conflict, else Tendik approves
- `cuti.pegawai` — Kasubag TU → Sekdep → Kadep

---

## Design System

Glassmorphic card style (use consistently):
```tsx
<div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow p-6">
```

Status colors:
- Green (selesai/aktif/ditandatangani): `bg-green-100 text-green-800`
- Amber (menunggu/pending): `bg-amber-100 text-amber-800`
- Red (ditolak/kritis): `bg-red-100 text-red-800`
- Gray (draft/belum): `bg-gray-100 text-gray-600`
- Blue (diarsip/info): `bg-blue-100 text-blue-800`

Typography: Bahasa Indonesia formal-akademis. Buttons: imperative verbs (Simpan, Kirim, Setujui, Tolak). Errors: friendly, not blaming ("Form belum lengkap. Periksa kolom yang ditandai.").

---

## 24-Hour MVP Scope (what to build NOW)

### Dev A — Kadep Dashboard (~7 hrs)
- [ ] Auth + role-aware redirect
- [ ] 4 KPI stat cards (dosen, publikasi, hibah, mahasiswa)
- [ ] Tridharma area chart (Recharts, hardcoded data)
- [ ] BAN-PT 9 criteria grid (hardcoded %)
- [ ] AI insight panel (3 hardcoded insights, mock style)
- [ ] Pending approvals widget

### Dev B — Sekretariat Dashboard (~7 hrs)
- [ ] Inbox surat with status badges + TanStack Table filters
- [ ] Buat surat form + AI draft mock + AiDraftBanner
- [ ] Auto-generate nomor surat (B/{seq}/UN1.SIPSO/HM/{year})
- [ ] 3-step approval stepper + workflow timeline
- [ ] Booking ruang weekly calendar

### Dev C — Dosen Dashboard (~5 hrs)
- [ ] Profil card (editable inline fields)
- [ ] Publikasi table + Tambah modal + AI auto-fill mock
- [ ] Mata kuliah tab with RPKPS status + EDOM score
- [ ] Surat & dokumen tab

### Dev D — Kaprodi Dashboard + Shared (~5 hrs)
- [ ] **HOUR 0–1 FIRST:** seed.sql + StatusBadge + StatCard + mockAIStream → push to main
- [ ] 4 KPI cards (mahasiswa S1/S2/S3 + rata-rata IPK)
- [ ] Graduation bar chart (Recharts, stacked S1/S2/S3)
- [ ] Kurikulum table with silabus status
- [ ] Mahasiswa at-risk table
- [ ] EDOM horizontal bar chart

---

## Out of Scope for 24-Hour MVP

- Native iOS/Android (PWA only)
- Real AI API calls (all mocked with mockAIStream)
- SIMASTER / Scopus live integration (placeholder only)
- e-Signature (PrivyID placeholder with "DRAFT" watermark)
- Dark mode
- Accreditation Engine full implementation
- Knowledge System / semantic search

---

## Key Commands

```bash
# Install
pnpm install

# Dev server
pnpm dev

# Supabase local
pnpm dlx supabase start
pnpm dlx supabase db reset   # applies migrations + seed

# Type check
pnpm typecheck

# Lint
pnpm lint
```

---

## References

- Full technical PRD: `docs/PRD-VibeCoding.md`
- C-Level PRD: `docs/PRD-CLevel.docx`
- Anthropic API docs: https://docs.anthropic.com
- Supabase docs: https://supabase.com/docs
