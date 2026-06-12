'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = { ariaLabel?: string };

export function ThemeToggle({ ariaLabel = 'Alternar tema' }: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-[60px] h-9" aria-hidden="true" />;

  const isDark = theme === 'dark';

  return (
    <div role="group" aria-label={ariaLabel} className="flex items-center gap-0.5">
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-label="Modo claro"
        aria-pressed={!isDark}
        className={cn(
          'px-2 py-2 rounded transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg',
          !isDark ? 'text-accent-magenta' : 'text-fg-muted hover:text-fg',
        )}
      >
        <Sun size={20} aria-hidden="true" />
      </button>

      <span className="type-caption text-fg-subtle mx-1" aria-hidden="true">·</span>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-label="Modo escuro"
        aria-pressed={isDark}
        className={cn(
          'px-2 py-2 rounded transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg',
          isDark ? 'text-accent-magenta' : 'text-fg-muted hover:text-fg',
        )}
      >
        <Moon size={20} aria-hidden="true" />
      </button>
    </div>
  );
}
