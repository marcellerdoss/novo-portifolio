import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { BlogPost } from './types';
import type { Locale } from './types';

type Frontmatter = {
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  externalUrl?: string;
  readingTime?: number;
};

type PostDetail = {
  frontmatter: Frontmatter;
  content: string;
  readingTime: number;
  headings: Heading[];
};

export type Heading = {
  id: string;
  text: string;
  level: number;
};

function blogDir(locale: Locale) {
  return path.join(process.cwd(), 'content', 'blog', locale);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].trim(),
      id: slugify(match[2].trim()),
    });
  }
  return headings;
}

function resolveFile(locale: Locale, file: string): string {
  const localeFile = path.join(blogDir(locale), file);
  if (fs.existsSync(localeFile)) return localeFile;
  const fallback = path.join(blogDir('pt'), file);
  return fs.existsSync(fallback) ? fallback : localeFile;
}

export async function getAllPosts(locale: Locale): Promise<BlogPost[]> {
  const ptDir = blogDir('pt');
  if (!fs.existsSync(ptDir)) return [];

  const ptFiles = fs.readdirSync(ptDir).filter((f) => f.endsWith('.mdx'));

  const posts: BlogPost[] = ptFiles.map((file) => {
    const filePath = resolveFile(locale, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug: file.replace('.mdx', ''),
      title: (data.title as string) ?? '',
      excerpt: (data.excerpt as string) ?? '',
      category: (data.category as string) ?? '',
      date: (data.date as string) ?? '',
      readingTime: typeof data.readingTime === 'number' ? data.readingTime : Math.ceil(stats.minutes),
      coverImage: (data.coverImage as string) ?? '',
      externalUrl: (data.externalUrl as string) ?? undefined,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPostBySlug(
  slug: string,
  locale: Locale,
): Promise<PostDetail | null> {
  const file = resolveFile(locale, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    frontmatter: {
      title: (data.title as string) ?? '',
      date: (data.date as string) ?? '',
      category: (data.category as string) ?? '',
      tags: ((data.tags as string[]) ?? []),
      excerpt: (data.excerpt as string) ?? '',
      coverImage: (data.coverImage as string) ?? '',
    },
    content,
    readingTime: Math.ceil(stats.minutes),
    headings: extractHeadings(content),
  };
}

export async function getRelatedPosts(
  slug: string,
  category: string,
  locale: Locale,
): Promise<BlogPost[]> {
  const all = await getAllPosts(locale);
  return all.filter((p) => p.slug !== slug && p.category === category).slice(0, 3);
}
