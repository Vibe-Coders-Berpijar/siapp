export { mockAIStream } from './mock-ai';

// NotulensiExtracted type and mockNotulensiExtract are only used by the notulensi/baru page.
// They are defined here since lib/mock-ai.ts does not export them.

export interface NotulensiExtracted {
  judul: string;
  pimpinanRapat: string;
  peserta: string[];
  agenda: string[];
  keputusan: string[];
  tindakLanjut: { item: string; penanggungJawab: string; tenggat: string }[];
}

export async function mockNotulensiExtract(
  transcript: string
): Promise<NotulensiExtracted> {
  await new Promise((r) => setTimeout(r, 1800));

  const lower = transcript.toLowerCase();
  const isAkreditasi = lower.includes("akreditasi");
  const isAnggaran   = lower.includes("anggaran") || lower.includes("rkat");
  const isPenelitian = lower.includes("penelitian");

  if (isAkreditasi) {
    return {
      judul: "Rapat Persiapan Akreditasi Program Studi",
      pimpinanRapat: "Dr. Hendra Wijaya",
      peserta: ["Prof. Dr. Sari Indah","Dr. Herlan Kusuma","Rina Kusuma","Dewi Lestari"],
      agenda: ["Review dokumen akreditasi","Pembagian tugas pengisian borang","Jadwal simulasi visitasi"],
      keputusan: [
        "Borang akreditasi harus selesai pada 15 Mei 2026.",
        "Data alumni perlu diperbarui sebelum 8 Mei 2026.",
        "Simulasi visitasi dijadwalkan 20 Mei 2026.",
      ],
      tindakLanjut: [
        { item: "Isi borang Standar 1–4", penanggungJawab: "Dr. Herlan Kusuma", tenggat: "2026-05-10" },
        { item: "Update data alumni", penanggungJawab: "Rina Kusuma", tenggat: "2026-05-08" },
        { item: "Koordinasi jadwal simulasi", penanggungJawab: "Dewi Lestari", tenggat: "2026-05-15" },
      ],
    };
  }

  if (isAnggaran) {
    return {
      judul: "Rapat Tinjauan Anggaran RKAT",
      pimpinanRapat: "Prof. Dr. Sari Indah",
      peserta: ["Dr. Hendra Wijaya","Budi Santoso","Rina Kusuma"],
      agenda: ["Realisasi anggaran berjalan","Proyeksi kebutuhan","Efisiensi belanja"],
      keputusan: [
        "Realisasi anggaran masih di bawah target — perlu akselerasi.",
        "Belanja operasional diefisiensikan 10% untuk kuartal berikutnya.",
        "Pengajuan revisi RKAT paling lambat akhir bulan.",
      ],
      tindakLanjut: [
        { item: "Laporan realisasi anggaran detail", penanggungJawab: "Budi Santoso", tenggat: "2026-05-15" },
        { item: "Dokumen revisi RKAT", penanggungJawab: "Rina Kusuma", tenggat: "2026-05-31" },
      ],
    };
  }

  if (isPenelitian) {
    return {
      judul: "Rapat Koordinasi Tim Penelitian",
      pimpinanRapat: "Prof. Dr. Sari Indah",
      peserta: ["Dr. Hendra Wijaya","Dr. Ahmad Rizky","Dr. Rini Setiawati","Dr. Dewi Rahayu"],
      agenda: ["Evaluasi progres penelitian","Rencana publikasi","Kendala di lapangan"],
      keputusan: [
        "Laporan kemajuan wajib diserahkan akhir bulan ini.",
        "Target publikasi: 2 jurnal Q1 sebelum akhir semester.",
        "Alokasi anggaran penelitian lapangan disetujui.",
      ],
      tindakLanjut: [
        { item: "Kumpulkan laporan kemajuan", penanggungJawab: "Semua PI", tenggat: "2026-05-31" },
        { item: "Submit draft ke jurnal", penanggungJawab: "Dr. Ahmad Rizky", tenggat: "2026-06-15" },
      ],
    };
  }

  return {
    judul: "Rapat Koordinasi Departemen",
    pimpinanRapat: "Prof. Dr. Sari Indah, M.P.",
    peserta: ["Dr. Hendra Wijaya","Rina Kusuma","Dewi Lestari","Budi Santoso"],
    agenda: ["Evaluasi kegiatan berjalan","Rencana tindak lanjut","Informasi dan lain-lain"],
    keputusan: [
      "Seluruh kegiatan yang telah direncanakan agar dilaksanakan sesuai jadwal.",
      "Pelaporan kegiatan dilakukan secara berkala setiap dua minggu.",
      "Koordinasi antar unit perlu ditingkatkan untuk efektivitas kerja.",
    ],
    tindakLanjut: [
      { item: "Penyusunan laporan kegiatan", penanggungJawab: "Rina Kusuma", tenggat: "2026-05-20" },
      { item: "Koordinasi jadwal unit", penanggungJawab: "Dewi Lestari", tenggat: "2026-05-15" },
    ],
  };
}
