import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { routing } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000');

  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,          lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/en`,  lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/blog`,    lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/en/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Blog post routes per locale
  const postRoutes: MetadataRoute.Sitemap = (
    await Promise.all(
      routing.locales.map(async (locale) => {
        const posts = await getAllPosts(locale);
        const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
        return posts.map((p) => ({
          url: `${base}${prefix}/blog/${p.slug}`,
          lastModified: new Date(p.date),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }));
      }),
    )
  ).flat();

  return [...staticRoutes, ...postRoutes];
}
