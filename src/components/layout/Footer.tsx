import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';

type NavKey = 'about' | 'cases' | 'racional' | 'skills' | 'education' | 'experience' | 'blog' | 'contact';

const navLinks: { key: NavKey; hash: string }[] = [
  { key: 'about',      hash: '#sobre' },
  { key: 'cases',      hash: '#cases' },
  { key: 'blog',       hash: '#blog' },
  { key: 'racional',   hash: '#racional' },
  { key: 'skills',     hash: '#skills' },
  { key: 'education',  hash: '#formacao' },
  { key: 'experience', hash: '#experiencia' },
  { key: 'contact',    hash: '#contato' },
];

export async function Footer() {
  const t    = await getTranslations('footer');
  const tNav = await getTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-[#09081c] border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-10 md:mb-12">

          {/* Brand */}
          <div>
            <p className="type-headline text-white mb-1">Marcelle Rocha</p>
            <p className="type-body-sm text-white/60">Product Designer | UX | CX</p>
          </div>

          {/* Quick links — plain <a> para evitar navegação completa e flash de light mode */}
          <nav aria-label={t('quick_links')}>
            <p className="type-caption text-white/40 mb-4">{t('quick_links')}</p>
            <ul className="space-y-2.5">
              {navLinks.map(({ key, hash }) => (
                <li key={key}>
                  <a
                    href={hash}
                    className="type-body-xs text-white/50 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    {tNav(key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Crédito + CTA Racional */}
          <div
            className="grid gap-5 justify-self-start"
            style={{ gridTemplateColumns: 'min-content' }}
          >
            <p className="type-caption text-white/35 whitespace-nowrap">
              {t('credit')} <span className="text-white/55">Marcelle</span>
            </p>

            <Link
              href="/racional"
              className="group flex items-start justify-between gap-2 border border-white/15 hover:border-white/35 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <div>
                <p className="type-body-sm text-white/80 group-hover:text-white transition-colors duration-200 font-[440]">
                  {t('rationale')}
                </p>
                <p className="type-body-xs text-white/40 mt-1.5 group-hover:text-white/60 transition-colors duration-200 normal-case tracking-normal leading-snug">
                  {t('rationale_sub')}
                </p>
              </div>
              <ArrowUpRight
                size={14}
                className="text-white/30 group-hover:text-white/70 transition-colors duration-200 shrink-0 mt-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6">
          <p className="type-caption text-white/35">
            © {year} Marcelle. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
