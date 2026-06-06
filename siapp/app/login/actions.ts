'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServiceClient } from '@/lib/supabase/service';

const DEMO_EMAIL    = 'demo@dpp.ugm.ac.id';
const DEMO_PASSWORD = 'siapp2026';

export async function login(formData: FormData) {
  const email    = (formData.get('email')    as string ?? '').trim().toLowerCase();
  const password = (formData.get('password') as string ?? '');

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return { error: 'Email atau password salah.' };
  }

  cookies().set('siapp_session', JSON.stringify({ email }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  });

  redirect('/');
}

export async function ssoLogin(formData: FormData) {
  const username = (formData.get('username') as string ?? '').trim().toLowerCase();
  const password = (formData.get('password') as string ?? '');

  if (!username || !password) {
    return { error: 'Username dan password wajib diisi.' };
  }

  // ── 1. Validate with UGM SSO gateway ──────────────────────────────────────
  // Gateway is only reachable from within UGM network.
  // Configure UGM_SSO_URL in .env.local when deploying on campus.
  const ssoBase = process.env.UGM_SSO_URL ?? 'http://10.9.11.129:7717';

  // Try known endpoint shapes; adjust UGM_SSO_ENDPOINT once Fisipol confirms.
  const ssoEndpoint = process.env.UGM_SSO_ENDPOINT ?? '/auth';

  let ssoOk = false;
  try {
    const res = await fetch(`${ssoBase}${ssoEndpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      signal: AbortSignal.timeout(10_000),
    });

    if (res.ok) {
      const data = await res.json();
      // Handle multiple possible response shapes from the gateway
      ssoOk =
        data.status === true ||
        data.status === 'success' ||
        data.success === true ||
        data.valid === true ||
        data.authenticated === true;
    }
  } catch {
    return {
      error:
        'Tidak dapat terhubung ke server SSO UGM. Pastikan Anda berada di jaringan UGM atau VPN UGM aktif.',
    };
  }

  if (!ssoOk) {
    return { error: 'Username atau password UGM salah.' };
  }

  // ── 2. Look up the user in SIAPP ──────────────────────────────────────────
  // UGM emails follow the pattern username@ugm.ac.id
  const email = username.includes('@') ? username : `${username}@ugm.ac.id`;

  const supabase = createServiceClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('email, primary_role, full_name')
    .eq('email', email)
    .single();

  if (!profile) {
    return {
      error:
        'Login SSO berhasil, tetapi akun belum terdaftar di SIAPP. Hubungi admin jika perlu.',
    };
  }

  // ── 3. Create session ─────────────────────────────────────────────────────
  cookies().set('siapp_session', JSON.stringify({ email: profile.email }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  });

  redirect('/');
}

export async function logout() {
  cookies().delete('siapp_session');
  redirect('/login');
}
