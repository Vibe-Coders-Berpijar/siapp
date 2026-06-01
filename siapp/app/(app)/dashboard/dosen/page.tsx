import { createServiceClient } from '@/lib/supabase/service'
import { ProfilSidebar, type DosenProfil } from './components/ProfilSidebar'
import { IkhtisarTab } from './components/IkhtisarTab'
import { PublikasiTable } from './components/PublikasiTable'
import { MataKuliahTab } from './components/MataKuliahTab'
import { PenelitianTab } from './components/PenelitianTab'
import { SuratDokumenTab } from './components/SuratDokumenTab'
import { ProfilPublikTab, type DosenPublik } from './components/ProfilPublikTab'
import { KalenderBookingTab } from './components/KalenderBookingTab'
import { SopTab } from './components/SopTab'
import { DokumenSayaTab } from './components/DokumenSayaTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Demo: use Prof. Dr. Purwo Santoso as the representative dosen profile
const DEMO_NIDN = '0004026309'

export default async function DosenDashboard() {
  const supabase = createServiceClient()

  const [{ data: lecturerRow }, { data: pubRows }] = await Promise.all([
    supabase
      .from('lecturers')
      .select('id, nidn, jabatan, bidang_keahlian, h_index, orcid_id, sinta_id, scopus_id, profiles!inner(full_name)')
      .eq('nidn', DEMO_NIDN)
      .single(),
    supabase
      .from('publications')
      .select('id, judul, jurnal, quartile, tahun, doi, status')
      .order('tahun', { ascending: false })
      .limit(100),
  ])

  const profil = lecturerRow as typeof lecturerRow & { profiles: { full_name: string } }

  const dosenProfil: DosenProfil | undefined = profil ? {
    nama: profil.profiles.full_name ?? '—',
    jabatan: profil.jabatan ?? '—',
    nidn: profil.nidn ?? '—',
    bidangKeahlian: (profil.bidang_keahlian as string[] | null) ?? [],
    hIndex: profil.h_index ?? 0,
    orcid: profil.orcid_id ?? '—',
    sinta: profil.sinta_id ?? '—',
    scopus: profil.scopus_id ?? '—',
  } : undefined

  const publikasiData = (pubRows ?? []).map((r) => ({
    id: String(r.id),
    judul: r.judul ?? '',
    jurnal: r.jurnal ?? '',
    tahun: r.tahun ?? new Date().getFullYear(),
    quartile: (r.quartile ?? 'Q4') as 'Q1' | 'Q2' | 'Q3' | 'Q4',
    status: r.status ?? 'Published',
    doi: r.doi ?? '',
  }))

  const dosenPublik: DosenPublik | undefined = dosenProfil ? {
    nama: dosenProfil.nama,
    jabatan: dosenProfil.jabatan,
    nidn: dosenProfil.nidn,
    bio: `Pengajar dan peneliti di Departemen Politik dan Pemerintahan UGM dengan jabatan ${dosenProfil.jabatan}. Berkontribusi pada penelitian politik, tata kelola, dan pengabdian masyarakat.`,
    bidangKeahlian: dosenProfil.bidangKeahlian,
    publikasiTerverifikasi: publikasiData.slice(0, 5).map((p) => ({
      judul: p.judul,
      jurnal: p.jurnal,
      tahun: p.tahun,
      quartile: p.quartile,
    })),
  } : undefined

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 md:shrink-0">
            <ProfilSidebar initialDosen={dosenProfil} />
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
              <TabsContent value="profil-publik">
                <ProfilPublikTab initialDosen={dosenPublik} />
              </TabsContent>
              <TabsContent value="dokumen"><DokumenSayaTab /></TabsContent>
              <TabsContent value="sop"><SopTab /></TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
