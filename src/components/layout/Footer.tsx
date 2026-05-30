import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type NavKey = 'about' | 'cases' | 'skills' | 'experience' | 'blog' | 'contact';

const navLinks: { key: NavKey; href: string }[] = [
  { key: 'about',      href: '/#sobre' },
  { key: 'cases',      href: '/#cases' },
  { key: 'skills',     href: '/#skills' },
  { key: 'experience', href: '/#experiencia' },
  { key: 'blog',       href: '/blog' },
  { key: 'contact',    href: '/#contato' },
];

export async function Footer() {
  const t    = await getTranslations('footer');
  const tNav = await getTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-canvas-parchment dark:bg-surface-tile-1 border-t border-hairline dark:border-white/10 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <p className="type-tagline text-fg mb-1">Marcelle</p>
            <p className="type-caption text-fg-muted">UX &amp; Product Designer</p>
          </div>

          {/* Quick links */}
          <nav aria-label={t('quick_links')}>
            <p className="type-caption-strong text-fg mb-4">{t('quick_links')}</p>
            <ul>
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="type-dense-link text-fg-muted hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus rounded"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Credit */}
          <div>
            <p className="type-caption text-fg-muted">
              {t('credit')}{' '}
              <span className="text-fg font-semibold">Marcelle</span>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-hairline dark:border-white/10 pt-6">
          <p className="type-fine-print text-fg-subtle">
            © {year} Marcelle. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
