import { Link } from '@/i18n/navigation';
import { ExternalLink } from 'lucide-react';
import type { BlogPost } from '@/lib/types';

type Props = {
  post: BlogPost;
  locale: string;
  minRead: string;
};

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(
    locale === 'pt' ? 'pt-BR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  );
}

const cardClass =
  'group block h-full bg-bg rounded-lg border border-border p-6 transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg';

function CardContent({ post, locale, minRead }: Props) {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <span className="type-caption text-accent-magenta">{post.category}</span>
        {post.externalUrl && (
          <span className="type-caption text-fg-subtle flex items-center gap-1">
            Medium <ExternalLink size={10} aria-hidden="true" />
          </span>
        )}
      </div>
      <h2 className="type-headline text-fg mb-3 group-hover:underline transition-all duration-150 line-clamp-2">
        {post.title}
      </h2>
      <p className="type-body-sm text-fg-muted line-clamp-3 mb-4">{post.excerpt}</p>
      <div className="flex items-center gap-3 type-caption text-fg-subtle">
        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime} {minRead}</span>
      </div>
    </>
  );
}

export function PostCard({ post, locale, minRead }: Props) {
  if (post.externalUrl) {
    return (
      <article>
        <a
          href={post.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
        >
          <CardContent post={post} locale={locale} minRead={minRead} />
        </a>
      </article>
    );
  }

  return (
    <article>
      <Link href={`/blog/${post.slug}`} className={cardClass}>
        <CardContent post={post} locale={locale} minRead={minRead} />
      </Link>
    </article>
  );
}
