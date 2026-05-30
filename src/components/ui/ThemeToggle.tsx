'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = { ariaLabel?: string };

export function ThemeToggle({ ariaLabel = 'Alternar tema' }: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-11 h-11" aria-hidden="true" />;

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={ariaLabel}
      className={cn(
        'w-11 h-11 rounded-full flex items-center justify-center overflow-hidden',
        'text-fg-muted hover:text-fg transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus focus-visible:ring-offset-2',
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
          transition={{ duration: 0.18 }}
          className="flex items-center justify-center"
        >
          {isDark
            ? <Sun size={18} aria-hidden="true" />
            : <Moon size={18} aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
