export type Locale = 'pt' | 'en';

export type LocalizedString = {
  pt: string;
  en: string;
};

export type CaseMetric = {
  label: string;
  value: string;
  description: string;
};

export type Case = {
  slug: string;
  title: LocalizedString;
  category: string;
  tags: string[];
  coverImage: string;
  summary: LocalizedString;
  problem: LocalizedString;
  process: LocalizedString;
  outcome: LocalizedString;
  metrics: CaseMetric[];
  images: string[];
  year: number;
  featured: boolean;
};

export type ExperienceItem = {
  company: string;
  role: LocalizedString;
  period: string;
  description: LocalizedString;
  logo?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: number;
  coverImage?: string;
  externalUrl?: string;
};
