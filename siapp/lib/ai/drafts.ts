'use server'

import { createClient } from '@/lib/supabase/server'

// Tables that accept AI-drafted rows. Whitelist prevents injection.
const ALLOWED_TABLES = ['riset_proposals', 'mata_kuliah', 'letters', 'room_bookings'] as const
type AllowedTable = (typeof ALLOWED_TABLES)[number]

function isAllowedTable(t: string): t is AllowedTable {
  return (ALLOWED_TABLES as readonly string[]).includes(t)
}

export interface SaveDraftInput {
  targetTable: string
  payload: Record<string, unknown>
  confidence?: number
  sources?: Record<string, unknown>
  rationale?: string
}

export async function saveAiDraft(input: SaveDraftInput): Promise<string> {
  if (!isAllowedTable(input.targetTable)) {
    throw new Error(`Target table "${input.targetTable}" not allowed for AI drafts`)
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('ai_drafts')
    .insert({
      target_table: input.targetTable,
      payload: input.payload,
      confidence: input.confidence ?? null,
      sources: input.sources ?? null,
      rationale: input.rationale ?? null,
      status: 'pending',
      created_by: user?.id ?? null,
    })
    .select('id')
    .single()

  if (error) throw new Error(`Failed to save AI draft: ${error.message}`)
  return data.id
}

export async function acceptAiDraft(draftId: string): Promise<void> {
  const supabase = createClient()

  const { data: draft, error: fetchError } = await supabase
    .from('ai_drafts')
    .select('*')
    .eq('id', draftId)
    .single()

  if (fetchError || !draft) throw new Error('Draft tidak ditemukan')
  if (draft.status !== 'pending') throw new Error('Draft sudah diproses sebelumnya')
  if (!isAllowedTable(draft.target_table)) throw new Error('Target table tidak valid')

  const row = {
    ...(draft.payload as Record<string, unknown>),
    created_by_ai: true,
    ai_draft_id: draftId,
  }

  const { error: insertError } = await supabase.from(draft.target_table).insert(row)
  if (insertError) throw new Error(`Gagal menyimpan data: ${insertError.message}`)

  await supabase
    .from('ai_drafts')
    .update({ status: 'accepted', updated_at: new Date().toISOString() })
    .eq('id', draftId)
}

export async function rejectAiDraft(draftId: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase
    .from('ai_drafts')
    .update({ status: 'rejected', updated_at: new Date().toISOString() })
    .eq('id', draftId)

  if (error) throw new Error(`Gagal menolak draft: ${error.message}`)
}
