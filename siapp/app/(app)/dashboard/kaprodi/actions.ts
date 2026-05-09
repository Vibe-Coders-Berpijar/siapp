'use server'

import { aiRoute, type ChatMessage } from '@/lib/ai/route'

export async function askKaprodiAI(
  question: string,
  history: ChatMessage[]
): Promise<string> {
  return aiRoute('kaprodi.qa', question, history)
}
