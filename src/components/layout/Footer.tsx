import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type NavKey = 'about' | 'cases' | 'skills' | 'experience' | 'blog' | 'contact';

const navLinks: { key: NavKey; href: string }[] = [
  { key: 'about',      href: '/#sobre' },
  { key: 'cases',      href: '/#cases' },
  { key: 'skills',     href: '/#skills' },
  { key: 'experience', href: '/#experiencia' },
  { key: 'blog',       href: '/#blog' },
  { key: 'contact',    href: '/#contato' },
];

export async function Footer() {
  const t    = await getTranslations('footer');
  const tNav = await getTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <p className="type-headline text-fg mb-1">Marcelle</p>
            <p className="type-body-sm text-fg-muted">UX &amp; Product Designer</p>
          </div>

          {/* Quick links */}
          <nav aria-label={t('quick_links')}>
            <p className="type-caption text-fg mb-4">{t('quick_links')}</p>
            <ul className="space-y-2">
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="type-body-sm text-fg-muted hover:text-fg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Credit */}
          <div>
            <p className="type-body-sm text-fg-muted">
              {t('credit')}{' '}
              <span className="text-fg font-[540]">Marcelle</span>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6">
          <p className="type-caption text-fg-subtle">
            © {year} Marcelle. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
