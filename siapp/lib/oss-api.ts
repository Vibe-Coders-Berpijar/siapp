const BASE_URL = 'https://oss.fisipol.ugm.ac.id/siapp/api';
const API_KEY = process.env.OSS_API_KEY ?? '';

async function ossGet<T>(path: string, params?: Record<string, string | number>): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url.toString(), {
    headers: { 'x-api-key': API_KEY },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`OSS API ${path} → ${res.status}`);
  return res.json();
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface OssLecturer {
  staff_id: string;
  nama: string;
  nidn: string | null;
  email: string;
  jabatan_fungsional_pelaksana: string;
  golongan_internal_ugm: string;
  jenis_pegawai: string;
  tipe_pegawai: string;
  status_aktif_pegawai: string;
  tgl_update: string;
}

export interface OssStudent {
  niu: string;
  nim: string;
  nama: string;
  prodi: string;
  angkatan: string;
  ipk: string;
  ips: string;
  sks: string;
  status_mahasiswa: string;
  jalur_masuk: string;
  jenis_kelamin: string;
  agama: string;
  kewarganegaraan: string;
  status_pernikahan: string;
  updated_time: string;
}

export interface OssJurnal {
  jurnal_id: string;
  judul: string;
  judul_jurnal: string;
  author: string;
  co_author: string | null;
  tahun: string;
  volume: string | null;
  nomor: string | null;
  halaman_awal: string | null;
  halaman_akhir: string | null;
  issn: string | null;
  doi: string | null;
  kategori_publikasi: string;
  tingkat_level: string;
  status: string;
  abstrak: string | null;
  kata_kunci: string | null;
  prodi_homebase_penulis: string;
}

export interface OssPenelitian {
  kode_penelitian: string;
  judul: string;
  nama_peneliti: string;
  status_peneliti: string;
  tanggal_penelitian: string;
  tingkat_level: string;
  provinsi: string | null;
  rumpun_ilmu: string;
  prodi_homebase_peneliti: string;
}

// ─── Lecturers ────────────────────────────────────────────────────────────────

export async function getLecturers(params?: { staff_id?: string; name?: string; offset?: number; limit?: number }) {
  return ossGet<{ data: OssLecturer[]; total: number }>('/lecturers', params as Record<string, string | number>);
}

export async function getLecturerById(staff_id: string) {
  return ossGet<{ data: OssLecturer }>(`/lecturers/${staff_id}`);
}

export async function searchLecturers(name: string) {
  return ossGet<{ data: OssLecturer[] }>('/lecturers/search', { name });
}

// ─── Students ─────────────────────────────────────────────────────────────────

export async function getStudents(params?: { niu?: string; name?: string; prodi?: string; angkatan?: string; offset?: number; limit?: number }) {
  return ossGet<{ data: OssStudent[]; total: number }>('/students', params as Record<string, string | number>);
}

export async function getStudentByNiu(niu: string) {
  return ossGet<{ data: OssStudent }>(`/students/${niu}`);
}

export async function searchStudents(name: string) {
  return ossGet<{ data: OssStudent[] }>('/students/search', { name });
}

// ─── P3M ──────────────────────────────────────────────────────────────────────

export type P3mDataset = 'penelitian' | 'pengabdian' | 'jurnal' | 'prosiding' | 'buku' | 'bookchapter' | 'media_karya';

export async function getP3m<T = unknown>(
  dataset: P3mDataset,
  params?: { keyword?: string; tahun?: string; offset?: number; limit?: number }
) {
  return ossGet<{ data: T[]; total: number; dataset: string; offset: number; limit: number }>(
    `/p3m/${dataset}`,
    params as Record<string, string | number>
  );
}

export const getJurnal = (params?: Parameters<typeof getP3m>[1]) =>
  getP3m<OssJurnal>('jurnal', params);

export const getPenelitian = (params?: Parameters<typeof getP3m>[1]) =>
  getP3m<OssPenelitian>('penelitian', params);
