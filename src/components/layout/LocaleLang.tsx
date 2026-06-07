'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

export function LocaleLang() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'pt-BR';
  }, [locale]);

  return null;
}
