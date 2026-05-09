const draftTemplates: Record<string, string> = {
  undangan: `Dengan hormat,

Sehubungan dengan {perihal}, kami dengan segala hormat mengundang Bapak/Ibu untuk hadir dalam kegiatan yang diselenggarakan oleh Departemen Pendidikan Profesi (DPP) Universitas Gadjah Mada.

Kegiatan ini diselenggarakan dalam rangka peningkatan kualitas akademik dan pengembangan kerjasama institusional di lingkungan UGM. Kehadiran Bapak/Ibu sangat kami harapkan mengingat peran strategis yang dimiliki dalam bidang ini.

Adapun rincian kegiatan adalah sebagai berikut:
- Hari/Tanggal : [Menyusul]
- Waktu         : [Menyusul] WIB
- Tempat        : Gedung DPP UGM, Yogyakarta

Demikian surat undangan ini kami sampaikan. Atas perhatian dan kehadiran Bapak/Ibu, kami ucapkan terima kasih.

Hormat kami,
Sekretariat DPP UGM`,

  permohonan: `Dengan hormat,

Sehubungan dengan {perihal}, kami bermaksud mengajukan permohonan kepada Bapak/Ibu terkait hal tersebut di atas.

Sebagai bahan pertimbangan, kami sampaikan bahwa kegiatan ini merupakan bagian dari program kerja DPP UGM tahun akademik 2025/2026 yang telah direncanakan dan mendapat persetujuan dari pimpinan departemen.

Kami berharap permohonan ini dapat ditindaklanjuti dengan sebaik-baiknya. Besar harapan kami agar Bapak/Ibu dapat memberikan respons positif demi kelancaran program yang telah direncanakan.

Atas perhatian dan kebijaksanaan Bapak/Ibu, kami mengucapkan terima kasih.

Hormat kami,
Sekretariat DPP UGM`,

  default: `Dengan hormat,

Sehubungan dengan {perihal}, bersama surat ini kami menyampaikan informasi penting yang perlu mendapat perhatian Bapak/Ibu.

Departemen Pendidikan Profesi (DPP) Universitas Gadjah Mada senantiasa berkomitmen untuk menjalin komunikasi yang baik dengan seluruh pemangku kepentingan demi tercapainya visi dan misi institusi.

Kami mohon agar hal yang disampaikan dalam surat ini dapat ditindaklanjuti sebagaimana mestinya. Apabila terdapat pertanyaan atau hal yang perlu diklarifikasi, silakan menghubungi sekretariat kami.

Demikian surat ini kami sampaikan. Atas perhatian Bapak/Ibu, kami ucapkan terima kasih.

Hormat kami,
Sekretariat DPP UGM`,
};

export async function* mockAIStream(
  perihal: string,
  type: "undangan" | "permohonan" | "default" = "default"
): AsyncGenerator<string> {
  const template = (draftTemplates[type] ?? draftTemplates.default).replace(
    /\{perihal\}/g,
    perihal || "keperluan yang dimaksud"
  );

  for (const char of template.split("")) {
    yield char;
    const delay =
      char === "." || char === "\n" ? 60 + Math.random() * 80
      : char === ","                ? 30 + Math.random() * 40
      :                               8  + Math.random() * 18;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

export async function* mockAIImprove(original: string): AsyncGenerator<string> {
  const improved = `Dengan hormat,

${original
  .replace(/dengan hormat,?\s*/i, "")
  .replace(/hormat kami,[\s\S]*/i, "")
  .trim()
  .split(". ")
  .map((s) => s.trim())
  .filter(Boolean)
  .join(".\n\n")}

Demikian surat ini kami sampaikan dengan hormat. Atas perhatian serta kerja sama yang baik dari Bapak/Ibu, kami menyampaikan terima kasih yang sebesar-besarnya.

Hormat kami,
Sekretariat
Departemen Pendidikan Profesi
Universitas Gadjah Mada`;

  for (const char of improved.split("")) {
    yield char;
    await new Promise((r) => setTimeout(r, 5 + Math.random() * 15));
  }
}

// ── Notulensi AI Extraction ───────────────────────────────────────────────────

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
