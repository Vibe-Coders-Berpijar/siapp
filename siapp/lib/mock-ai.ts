/** Mock AI response. TODO: replace with aiRoute() in Phase 2 */
export async function mockAIStream(content: string, delayMs = 1500): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(content), delayMs));
}
