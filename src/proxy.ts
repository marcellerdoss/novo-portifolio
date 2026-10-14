import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { AUTH_COOKIE_NAME, isValidAuthToken } from './lib/auth/site-password';

const intlMiddleware = createIntlMiddleware(routing);

// Rotas sem locale (next-intl não deve rodar aqui)
const NO_INTL_PREFIXES = ['/api', '/jobs', '/preloader-test', '/senha'];
// Rotas acessíveis sem o cookie de autenticação
const PUBLIC_PATHS = ['/senha', '/api/site-password'];

function matchesAny(pathname: string, prefixes: string[]) {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!matchesAny(pathname, PUBLIC_PATHS)) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (!isValidAuthToken(token)) {
      const url = new URL('/senha', request.url);
      url.searchParams.set('from', pathname + request.nextUrl.search);
      return NextResponse.redirect(url);
    }
  }

  if (matchesAny(pathname, NO_INTL_PREFIXES)) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
