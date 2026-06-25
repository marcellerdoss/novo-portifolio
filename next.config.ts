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
      `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://vercel.live https://www.googletagmanager.com https://www.google.com https://www.gstatic.com`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://vitals.vercel-insights.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://region1.google-analytics.com https://www.google.com https://*.supabase.co https://*.supabase.com",
      "frame-src https://www.google.com",
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
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 828, 1080, 1200, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768],
  },

  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default analyzeBundle(withNextIntl(nextConfig));
