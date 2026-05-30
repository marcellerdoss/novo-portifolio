import { cn } from '@/lib/utils';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: 'div' | 'article' | 'li';
};

export function Card({ children, className, hover = false, as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={cn(
        'bg-canvas dark:bg-surface-tile-2 border border-hairline dark:border-white/10 rounded-lg p-lg',
        hover && [
          'transition-all duration-200 ease-out',
          'hover:scale-[1.02]',
          'hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]',
          'dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)]',
        ],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
