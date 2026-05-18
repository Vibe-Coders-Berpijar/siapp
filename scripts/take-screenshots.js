/**
 * SIAPP — Automated Screenshot Script
 *
 * Mengambil semua screenshot placeholder dari panduan pengguna secara otomatis.
 *
 * CARA PAKAI:
 *   1. Pastikan dev server sudah jalan:
 *        cd siapp && pnpm dev
 *
 *   2. Install playwright (sekali saja):
 *        npm install -g playwright
 *        npx playwright install chromium
 *
 *   3. Jalankan script dari root Integration repo:
 *        node scripts/take-screenshots.js
 *
 *   Output: docs/manual/assets/*.png  (50 file)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs   = require('fs');

const BASE_URL = 'http://localhost:3000';
const ASSETS   = path.resolve(__dirname, '../docs/manual/assets');
const EMAIL    = 'demo@dpp.ugm.ac.id';
const PASSWORD = 'siapp2026';

// ─── helpers ─────────────────────────────────────────────────────────────────

async function ss(page, slug) {
  const file = path.join(ASSETS, `${slug}.png`);
  await page.screenshot({ path: file });
  console.log(`  📸  ${slug}.png`);
}

async function go(page, path) {
  await page.goto(`${BASE_URL}${path}`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);
}

async function scrollTo(page, y) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y);
  await page.waitForTimeout(400);
}

async function clickTab(page, pattern) {
  await page.getByRole('button', { name: pattern }).click();
  await page.waitForTimeout(900);
}

async function tryClick(page, pattern, timeout = 2000) {
  try {
    const btn = page.getByRole('button', { name: pattern }).first();
    await btn.waitFor({ timeout });
    await btn.click();
    await page.waitForTimeout(700);
    return true;
  } catch { return false; }
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main() {
  fs.mkdirSync(ASSETS, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const ctx     = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page    = await ctx.newPage();

  // ── 1. LOGIN PAGE ─────────────────────────────────────────────────────────
  console.log('\n🔐  Login');
  await go(page, '/login');
  await ss(page, 'login-halaman');                              // halaman login kosong

  await page.fill('input[name="email"]',    EMAIL);
  await page.fill('input[name="password"]', PASSWORD);
  await ss(page, 'login-otp-verifikasi');                       // email+password terisi

  await page.click('button[type="submit"]');
  await page.waitForURL(`${BASE_URL}/`, { timeout: 10000 });
  await page.waitForTimeout(1000);

  // ── 2. KADEP ──────────────────────────────────────────────────────────────
  console.log('\n📊  Kadep');

  await go(page, '/dashboard/kadep');
  await ss(page, 'dashboard-kadep-overview');
  await scrollTo(page, 450);
  await ss(page, 'dashboard-banpt-grid');
  await scrollTo(page, 0);

  await go(page, '/dashboard/kadep/akreditasi');
  await ss(page, 'akreditasi-halaman');
  await scrollTo(page, 350);
  await ss(page, 'akreditasi-ai-rekomendasi');

  await go(page, '/dashboard/kadep/kepegawaian');
  await ss(page, 'kepegawaian-tabel-dosen');
  if (await tryClick(page, /tambah dosen/i)) {
    await ss(page, 'kepegawaian-form-tambah');
    await page.keyboard.press('Escape');
  }

  await go(page, '/dashboard/kadep/keuangan');
  await ss(page, 'keuangan-grafik-realisasi');

  await go(page, '/dashboard/kadep/persuratan');
  await ss(page, 'persuratan-tabel-kadep');
  if (await tryClick(page, /buat surat/i)) {
    await ss(page, 'persuratan-form-buat-surat');
    await page.keyboard.press('Escape');
  }
  // Dialog tanda tangan — coba klik tombol aksi di baris pertama
  try {
    const signBtn = page.locator('button:has-text("Tanda Tangan"), button[aria-label*="tanda tangan"]').first();
    if (await signBtn.isVisible({ timeout: 1500 })) {
      await signBtn.click();
      await page.waitForTimeout(700);
      await ss(page, 'persuratan-dialog-tandatangan');
      await page.keyboard.press('Escape');
    }
  } catch {}

  // ── 3. SEKRETARIAT ────────────────────────────────────────────────────────
  console.log('\n📬  Sekretariat');

  await go(page, '/kesekretariatan');
  await ss(page, 'dashboard-sekretariat-overview');
  await ss(page, 'dashboard-banner-notifikasi');               // banner ada di atas jika ada anomali

  await go(page, '/kesekretariatan/persuratan');
  await ss(page, 'persuratan-tabel-surat');
  if (await tryClick(page, /buat surat baru/i)) {
    await ss(page, 'persuratan-form-buat-surat');              // overwrite jika sudah ada — sama kontennya
    await page.keyboard.press('Escape');
  }
  if (await tryClick(page, /lihat detail/i)) {
    await ss(page, 'persuratan-detail-alur');
    await page.keyboard.press('Escape');
  }

  await go(page, '/kesekretariatan/booking-ruang');
  await ss(page, 'booking-ruang-denah');
  if (await tryClick(page, /buat booking/i)) {
    await ss(page, 'booking-ruang-form');
    await page.keyboard.press('Escape');
  }
  await scrollTo(page, 600);
  await ss(page, 'booking-ruang-tabel-konfirmasi');

  await go(page, '/kesekretariatan/kalender');
  await ss(page, 'kalender-tampilan-bulan');

  await go(page, '/kesekretariatan/notulensi');
  await ss(page, 'notulensi-daftar-kartu');
  if (await tryClick(page, /lihat detail/i)) {
    await ss(page, 'notulensi-detail-modal');
    await page.keyboard.press('Escape');
  }

  await go(page, '/kesekretariatan/notulensi/baru');
  await ss(page, 'notulensi-form-baru');

  await go(page, '/kesekretariatan/renja');
  await ss(page, 'renja-ringkasan-anggaran');

  await go(page, '/kesekretariatan/sop');
  // Expand kartu SOP pertama
  try {
    await page.locator('[role="button"]:has-text("SOP"), button.sop-toggle, div.sop-card').first().click();
    await page.waitForTimeout(400);
  } catch {}
  await ss(page, 'sop-kartu-diperluas');

  // ── 4. DOSEN ──────────────────────────────────────────────────────────────
  console.log('\n👩‍🏫  Dosen');

  await go(page, '/dashboard/dosen');
  await ss(page, 'dashboard-dosen-overview');

  // Edit profil
  if (await tryClick(page, /edit profil/i)) {
    await ss(page, 'profil-mode-edit');
    await tryClick(page, /simpan profil/i, 500);
    await page.waitForTimeout(400);
  }

  // Tab Ikhtisar (default aktif)
  await scrollTo(page, 0);
  await ss(page, 'ikhtisar-kpi-cards');
  await scrollTo(page, 350);
  await ss(page, 'ikhtisar-radar-tridharma');
  await scrollTo(page, 650);
  await ss(page, 'ikhtisar-saran-ai');
  await scrollTo(page, 0);

  // Tab Publikasi
  await clickTab(page, /^publikasi$/i);
  await ss(page, 'publikasi-tabel');
  if (await tryClick(page, /tambah publikasi/i)) {
    try {
      await page.fill(
        'input[placeholder*="judul" i], input[name="judul"]',
        'Demokratisasi dan Tata Kelola Pemerintahan di Indonesia'
      );
      await page.waitForTimeout(300);
      await tryClick(page, /isi otomatis/i, 500);
      await page.waitForTimeout(2500);               // tunggu AI response
      await ss(page, 'publikasi-ai-autofill');
    } catch {}
    await page.keyboard.press('Escape');
  }

  // Tab Mata Kuliah
  await clickTab(page, /mata kuliah/i);
  await ss(page, 'matakuliah-tabel');
  if (await tryClick(page, /generate rpkps/i)) {
    await page.waitForTimeout(3500);                 // tunggu AI generate
    await ss(page, 'matakuliah-rpkps-drawer');
    await tryClick(page, /tutup/i, 500);
  }

  // Tab Penelitian & PkM
  await clickTab(page, /penelitian/i);
  await ss(page, 'penelitian-daftar-hibah');

  // Form proposal baru
  await go(page, '/riset-pkm/proposal/baru');
  await ss(page, 'penelitian-form-proposal');

  // Tab Kalender & Booking (dosen)
  await go(page, '/dashboard/dosen');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);
  await clickTab(page, /kalender/i);
  if (await tryClick(page, /booking ruang/i)) {
    await ss(page, 'booking-form-dosen');
    await page.keyboard.press('Escape');
  }

  // ── 5. KAPRODI ────────────────────────────────────────────────────────────
  console.log('\n🎓  Kaprodi');

  await go(page, '/dashboard/kaprodi');
  await ss(page, 'dashboard-kaprodi-prodi-selector');
  await ss(page, 'dashboard-kaprodi-kpi-cards');

  // Tab Ikhtisar (default)
  await ss(page, 'ikhtisar-grafik-kelulusan');
  await scrollTo(page, 350);
  await ss(page, 'ikhtisar-grafik-distribusi-ipk');
  await scrollTo(page, 650);
  await ss(page, 'ikhtisar-wawasan-ai');
  await scrollTo(page, 0);

  // Tab Kurikulum
  await clickTab(page, /^kurikulum$/i);
  await ss(page, 'kurikulum-tabel');
  try {
    await page.locator('table tbody tr').first().click();
    await page.waitForTimeout(500);
    await ss(page, 'kurikulum-baris-diperluas');
  } catch {}

  // Tab Mahasiswa At-Risk
  await clickTab(page, /at.risk/i);
  await ss(page, 'at-risk-tabel');
  if (await tryClick(page, /beri peringatan/i)) {
    await ss(page, 'at-risk-modal-peringatan');
    await page.keyboard.press('Escape');
  }

  // Tab EDOM
  await clickTab(page, /edom/i);
  await ss(page, 'edom-program');

  // Tab AI Asisten
  await clickTab(page, /ai asisten/i);
  await ss(page, 'ai-asisten-tampilan');
  try {
    await page.fill(
      'input[placeholder*="tanyakan" i], textarea[placeholder*="tanyakan" i]',
      'Berapa rata-rata IPK mahasiswa saat ini?'
    );
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);                 // tunggu AI menjawab
    await ss(page, 'ai-asisten-percakapan');
  } catch {}

  // Tab Akreditasi
  await clickTab(page, /^akreditasi$/i);
  await ss(page, 'akreditasi-kaprodi-ringkasan');

  // ── SELESAI ───────────────────────────────────────────────────────────────
  await browser.close();

  const files = fs.readdirSync(ASSETS).filter(f => f.endsWith('.png'));
  console.log(`\n✅  Selesai! ${files.length}/50 screenshot tersimpan di:\n   ${ASSETS}\n`);

  if (files.length < 50) {
    console.log('⚠️  Beberapa screenshot mungkin tidak berhasil (modal tidak terbuka, dsb.)');
    console.log('   Jalankan ulang dengan HEADLESS=false untuk debug:\n');
    console.log('   HEADLESS=false node scripts/take-screenshots.js\n');
  }
}

main().catch(err => {
  console.error('\n❌  Error:', err.message);
  process.exit(1);
});
