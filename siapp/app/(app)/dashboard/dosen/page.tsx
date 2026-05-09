'use client';

import { ProfilSidebar } from './components/ProfilSidebar';
import { IkhtisarTab } from './components/IkhtisarTab';
import { PublikasiTable } from './components/PublikasiTable';
import { MataKuliahTab } from './components/MataKuliahTab';
import { PenelitianTab } from './components/PenelitianTab';
import { SuratDokumenTab } from './components/SuratDokumenTab';
import { ProfilPublikTab } from './components/ProfilPublikTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DosenDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT: Profil sidebar */}
          <div className="w-full md:w-1/3 md:shrink-0">
            <ProfilSidebar />
          </div>

          {/* RIGHT: 6-tab main content */}
          <div className="flex-1 min-w-0">
            <Tabs defaultValue="ikhtisar">
              <TabsList className="mb-4 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl flex-wrap">
                <TabsTrigger value="ikhtisar">Ikhtisar</TabsTrigger>
                <TabsTrigger value="publikasi">Publikasi</TabsTrigger>
                <TabsTrigger value="matakuliah">Mata Kuliah</TabsTrigger>
                <TabsTrigger value="penelitian">Penelitian & PkM</TabsTrigger>
                <TabsTrigger value="surat">Surat & Dokumen</TabsTrigger>
                <TabsTrigger value="profil-publik">Profil Publik</TabsTrigger>
              </TabsList>

              <TabsContent value="ikhtisar">
                <IkhtisarTab />
              </TabsContent>
              <TabsContent value="publikasi">
                <PublikasiTable />
              </TabsContent>
              <TabsContent value="matakuliah">
                <MataKuliahTab />
              </TabsContent>
              <TabsContent value="penelitian">
                <PenelitianTab />
              </TabsContent>
              <TabsContent value="surat">
                <SuratDokumenTab />
              </TabsContent>
              <TabsContent value="profil-publik">
                <ProfilPublikTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
