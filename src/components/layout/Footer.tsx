import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type NavKey = 'about' | 'cases' | 'racional' | 'skills' | 'education' | 'experience' | 'blog' | 'contact';

const navLinks: { key: NavKey; href: { pathname: string; hash: string } }[] = [
  { key: 'about',      href: { pathname: '/', hash: '#sobre' } },
  { key: 'cases',      href: { pathname: '/', hash: '#cases' } },
  { key: 'blog',       href: { pathname: '/', hash: '#blog' } },
  { key: 'racional',   href: { pathname: '/', hash: '#racional' } },
  { key: 'skills',     href: { pathname: '/', hash: '#skills' } },
  { key: 'education',  href: { pathname: '/', hash: '#formacao' } },
  { key: 'experience', href: { pathname: '/', hash: '#experiencia' } },
  { key: 'contact',    href: { pathname: '/', hash: '#contato' } },
];

export async function Footer() {
  const t    = await getTranslations('footer');
  const tNav = await getTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-[#09081c] border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">

          {/* Brand */}
          <div>
            <p className="type-headline text-white mb-1">Marcelle</p>
            <p className="type-body-sm text-white/60">UX &amp; Product Designer</p>
          </div>

          {/* Quick links */}
          <nav aria-label={t('quick_links')}>
            <p className="type-caption text-white/40 mb-4">{t('quick_links')}</p>
            <ul className="space-y-2">
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="type-body-sm text-white/60 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Credit + meta link */}
          <div className="space-y-3">
            <p className="type-body-sm text-white/60">
              {t('credit')}{' '}
              <span className="text-white font-[540]">Marcelle</span>
            </p>
            <Link
              href="/racional"
              className="inline-flex items-center gap-2 type-caption text-white/40 hover:text-white/70 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              {t('rationale')}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6">
          <p className="type-caption text-white/40">
            © {year} Marcelle. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
