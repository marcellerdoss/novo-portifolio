import { Link } from '@/i18n/navigation';
import type { BlogPost } from '@/lib/types';

type Props = {
  posts: BlogPost[];
  locale: string;
  label?: string;
  minRead?: string;
};

export function RelatedPosts({ posts, locale, label = 'Artigos relacionados', minRead = 'min de leitura' }: Props) {
  if (!posts.length) return null;

  return (
    <aside aria-label={label} className="mt-16 pt-10 border-t border-border">
      <h2 className="type-headline text-fg mb-8">{label}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block p-4 rounded-lg bg-bg-secondary border border-border transition-colors hover:border-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg"
            >
              <span className="type-caption text-accent-magenta block mb-1">{post.category}</span>
              <p className="type-body-sm font-[540] text-fg group-hover:underline transition-all duration-150 line-clamp-2">
                {post.title}
              </p>
              <p className="type-caption text-fg-subtle mt-2">
                {post.readingTime} {minRead}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
