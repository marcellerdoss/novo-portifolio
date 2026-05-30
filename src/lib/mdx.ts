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

export async function getAllPosts(locale: Locale): Promise<BlogPost[]> {
  const dir = blogDir(locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  const posts: BlogPost[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug: file.replace('.mdx', ''),
      title: (data.title as string) ?? '',
      excerpt: (data.excerpt as string) ?? '',
      category: (data.category as string) ?? '',
      date: (data.date as string) ?? '',
      readingTime: Math.ceil(stats.minutes),
      coverImage: (data.coverImage as string) ?? '',
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
  const dir = blogDir(locale);
  const file = path.join(dir, `${slug}.mdx`);
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
