import { createServiceClient } from '@/lib/supabase/service'
import { ProfilSidebar } from './components/ProfilSidebar'
import { IkhtisarTab } from './components/IkhtisarTab'
import { PublikasiTable } from './components/PublikasiTable'
import { MataKuliahTab } from './components/MataKuliahTab'
import { PenelitianTab } from './components/PenelitianTab'
import { SuratDokumenTab } from './components/SuratDokumenTab'
import { ProfilPublikTab } from './components/ProfilPublikTab'
import { KalenderBookingTab } from './components/KalenderBookingTab'
import { SopTab } from './components/SopTab'
import { DokumenSayaTab } from './components/DokumenSayaTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default async function DosenDashboard() {
  const supabase = createServiceClient()

  const { data: rows } = await supabase
    .from('publications')
    .select('id, judul, jurnal, quartile, tahun, doi, status')
    .order('tahun', { ascending: false })
    .limit(100)

  const publikasiData = (rows ?? []).map((r) => ({
    id: String(r.id),
    judul: r.judul ?? '',
    jurnal: r.jurnal ?? '',
    tahun: r.tahun ?? new Date().getFullYear(),
    quartile: (r.quartile ?? 'Q4') as 'Q1' | 'Q2' | 'Q3' | 'Q4',
    status: r.status ?? 'Published',
    doi: r.doi ?? '',
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 md:shrink-0">
            <ProfilSidebar />
          </div>

          <div className="flex-1 min-w-0">
            <Tabs defaultValue="ikhtisar">
              <TabsList className="mb-4 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl flex-wrap">
                <TabsTrigger value="ikhtisar">Ikhtisar</TabsTrigger>
                <TabsTrigger value="publikasi">Publikasi</TabsTrigger>
                <TabsTrigger value="matakuliah">Mata Kuliah</TabsTrigger>
                <TabsTrigger value="penelitian">Penelitian & PkM</TabsTrigger>
                <TabsTrigger value="surat">Surat & Dokumen</TabsTrigger>
                <TabsTrigger value="kalender">Kalender & Booking</TabsTrigger>
                <TabsTrigger value="profil-publik">Profil Publik</TabsTrigger>
                <TabsTrigger value="dokumen">Dokumen Saya</TabsTrigger>
                <TabsTrigger value="sop">SOP</TabsTrigger>
              </TabsList>

              <TabsContent value="ikhtisar"><IkhtisarTab /></TabsContent>
              <TabsContent value="publikasi">
                <PublikasiTable initialData={publikasiData} />
              </TabsContent>
              <TabsContent value="matakuliah"><MataKuliahTab /></TabsContent>
              <TabsContent value="penelitian"><PenelitianTab /></TabsContent>
              <TabsContent value="surat"><SuratDokumenTab /></TabsContent>
              <TabsContent value="kalender"><KalenderBookingTab /></TabsContent>
              <TabsContent value="profil-publik"><ProfilPublikTab /></TabsContent>
              <TabsContent value="dokumen"><DokumenSayaTab /></TabsContent>
              <TabsContent value="sop"><SopTab /></TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
