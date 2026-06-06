import { createServiceClient } from '@/lib/supabase/service'
import AkreditasiClient from './AkreditasiClient'

export default async function AkreditasiPage() {
  const supabase = createServiceClient()
  const { data: kadepRow } = await supabase
    .from('lecturers').select('profiles!inner(full_name)').eq('nidn', '0024027203').single()
  const kadepName = kadepRow ? (kadepRow.profiles as unknown as { full_name: string }).full_name : 'Kepala Departemen'

  return <AkreditasiClient userName={kadepName} jabatan="Kepala Departemen" />
}
