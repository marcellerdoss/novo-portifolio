import { Link } from '@/i18n/navigation';
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

export function PostCard({ post, locale, minRead }: Props) {
  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        className="group block h-full bg-bg rounded-lg border border-border p-6 transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg"
      >
        <span className="type-caption text-fg-subtle mb-3 block">
          {post.category}
        </span>
        <h2 className="type-body-strong text-fg mb-3 group-hover:underline transition-all duration-150 line-clamp-2">
          {post.title}
        </h2>
        <p className="type-body-sm text-fg-muted line-clamp-3 mb-4">{post.excerpt}</p>
        <div className="flex items-center gap-3 type-caption text-fg-subtle">
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} {minRead}</span>
        </div>
      </Link>
    </article>
  );
}
