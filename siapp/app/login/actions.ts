'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

export async function logout() {
  cookies().delete('siapp_session');
  redirect('/login');
}
