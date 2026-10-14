import { NextResponse } from 'next/server';
import {
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAME,
  checkSitePassword,
  createAuthToken,
} from '@/lib/auth/site-password';

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: '' }));

  if (!checkSitePassword(password)) {
    return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, createAuthToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: AUTH_COOKIE_MAX_AGE,
  });
  return response;
}
