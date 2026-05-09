export function mockSendWhatsApp(to: string, message: string) {
  console.log(`[Fonnte Mock] WA → ${to}: ${message}`)
  showToast(`📱 WhatsApp terkirim ke ${to}`, 'success')
}

export function mockSendEmail(to: string, subject: string) {
  console.log(`[Resend Mock] Email → ${to}: ${subject}`)
  showToast(`📧 Email terkirim ke ${to}`, 'success')
}

function showToast(message: string, type: 'success' | 'info') {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('show-toast', { detail: { message, type } }))
}
