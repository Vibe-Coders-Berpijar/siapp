# SIAPP — Sistem Informasi Departemen Politik Pemerintahan

Academic Intelligence Operating System for **Departemen Politik dan Pemerintahan (DPP), Universitas Gadjah Mada**.

Built by **Pijar Foundation** vibe coding pod (4 devs, 24-hour MVP sprint).

---

## Overview

SIAPP is a web-based information system that centralizes academic data for DPP UGM — covering lecturers, students, publications, grants, correspondence, and curriculum management. It integrates live data from the UGM OSS SIAPP API and uses AI (Anthropic Claude) as a draft-assist mechanism for letter writing and academic reporting.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.4+ strict |
| Database | Supabase Postgres 15 (Singapore) |
| Auth | Supabase Auth — OTP, `@ugm.ac.id` only |
| Styling | Tailwind CSS 3.4 |
| Components | shadcn/ui |
| Tables | TanStack Table v8 |
| Charts | Recharts |
| AI | Anthropic Claude (Haiku → Sonnet → Opus) |
| Data source | OSS SIAPP API (`oss.fisipol.ugm.ac.id`) |
| Email | Resend |
| WhatsApp | Fonnte |
| Hosting | Vercel (Singapore) |
| Package manager | pnpm 9+ |

---

## Roles & Dashboards

| Role | Route | Description |
|---|---|---|
| Kepala Departemen | `/dashboard/kadep` | KPI overview, tridharma chart, BAN-PT criteria, approval queue |
| Sekretariat / Tendik | `/dashboard/sekretariat` → `/kesekretariatan` | Letter inbox, surat keluar, room booking, notulensi |
| Dosen | `/dashboard/dosen` | Profil, publikasi, mata kuliah, penelitian, surat & dokumen |
| Kaprodi | `/dashboard/kaprodi` | Mahasiswa KPIs, at-risk monitoring, kurikulum, EDOM, akreditasi |

---

## Live Data Sources

Data is fetched from the **OSS SIAPP API** (`oss.fisipol.ugm.ac.id`) and stored in Supabase:

| Table | Records | Source |
|---|---|---|
| `lecturers` + `profiles` | 28 dosen | OSS `/siapp/api/lecturers` |
| `students` | 433 mahasiswa | OSS `/siapp/api/students` |
| `publications` | 187 jurnal | OSS `/siapp/api/p3m/jurnal` |
| `grants` | 5 hibah | Sample data |
| `letters` | 12 surat | Sample data |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- A [Supabase](https://supabase.com) project (Singapore region recommended)

### 1. Clone & install

```bash
git clone https://github.com/Vibe-Coders-Berpijar/siapp.git
cd siapp
pnpm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
ANTHROPIC_API_KEY=<your-anthropic-key>
OSS_API_KEY=<siapp-oss-api-key>
```

### 3. Set up database

Push schema and seed to your Supabase project using psql:

```bash
psql "<your-supabase-connection-string>" -f supabase/migrations/0000_D_init_schema.sql
psql "<your-supabase-connection-string>" -f supabase/migrations/0001_D_expand_schema.sql
psql "<your-supabase-connection-string>" -f supabase/seed.sql
```

Connection string format:
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### 4. Run dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo login

| Field | Value |
|---|---|
| Email | `demo@dpp.ugm.ac.id` |
| Password | `siapp2026` |

After login, select a role (Kadep / Sekretariat / Dosen / Kaprodi) to enter the corresponding dashboard.

---

## Project Structure

```
siapp/
├── app/
│   ├── (auth)/login/            # OTP login + demo login
│   ├── (app)/dashboard/
│   │   ├── kadep/               # Kepala Departemen dashboard
│   │   ├── sekretariat/         # Redirects to /kesekretariatan
│   │   ├── dosen/               # Dosen dashboard (tabs)
│   │   └── kaprodi/             # Kaprodi dashboard (tabs)
│   └── (app)/kesekretariatan/   # Sekretariat pages
├── components/
│   ├── shared/                  # StatusBadge, StatCard, AiDraftBanner
│   ├── kadep/                   # Kadep-specific components
│   ├── sekretariat/             # Sekretariat-specific components
│   └── ui/                      # shadcn/ui primitives
├── lib/
│   ├── supabase/                # Supabase client (browser + server + service)
│   ├── ai/route.ts              # All AI calls go through here
│   ├── oss-api.ts               # OSS SIAPP API typed client
│   ├── mock-ai.ts               # Mock AI stream for Phase 1
│   └── audit.ts                 # Audit log helpers
└── supabase/
    ├── migrations/              # Schema migrations
    └── seed.sql                 # Real data from OSS API
```

---

## Architecture Notes

- **RLS everywhere** — Row-Level Security enabled on all tables, no exceptions.
- **AI as draft only** — Claude never writes directly to domain tables. All AI output goes to `ai_drafts`, user must Accept before data is written.
- **Server actions for mutations** — All form submissions use Next.js server actions. API routes only for webhooks and external callbacks.
- **Service client for server reads** — Server components use `createServiceClient()` (service role key) which bypasses RLS for safe server-side data fetching.
- **OSS API integration** — `lib/oss-api.ts` provides a typed fetch wrapper for all OSS SIAPP endpoints with 1-hour cache revalidation.

---

## Dev Ownership

| Dev | Area | Migration prefix |
|---|---|---|
| Dev A | Kadep dashboard | `0001_A_*` |
| Dev B | Sekretariat + Kesekretariatan | `0002_B_*` |
| Dev C | Dosen dashboard | `0003_C_*` |
| Dev D | Kaprodi + Shared setup | `0000_D_*`, `0004_D_*` |

---

## License

Internal use — Departemen Politik dan Pemerintahan, Universitas Gadjah Mada.
