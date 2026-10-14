import { createHmac, timingSafeEqual } from 'node:crypto';

export const AUTH_COOKIE_NAME = 'portfolio_auth';
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

const TOKEN_VALUE = 'granted';

function sign(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('hex');
}

function safeEqual(a: string, b: string) {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

export function createAuthToken() {
  const secret = process.env.SITE_AUTH_SECRET;
  if (!secret) throw new Error('SITE_AUTH_SECRET não está configurado.');
  return `${TOKEN_VALUE}.${sign(TOKEN_VALUE, secret)}`;
}

export function isValidAuthToken(token: string | undefined | null) {
  const secret = process.env.SITE_AUTH_SECRET;
  if (!secret || !token) return false;

  const [value, signature] = token.split('.');
  if (value !== TOKEN_VALUE || !signature) return false;

  return safeEqual(signature, sign(value, secret));
}

export function checkSitePassword(input: string) {
  const password = process.env.SITE_PASSWORD;
  if (!password || typeof input !== 'string' || !input) return false;
  return safeEqual(input, password);
}
