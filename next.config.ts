import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const analyzeBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://vercel.live",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://vitals.vercel-insights.com",
      "frame-ancestors 'none'",
    ].join('; '),
  },
  { key: 'X-Frame-Options',        value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default analyzeBundle(withNextIntl(nextConfig));
