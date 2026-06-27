import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';

export async function Footer() {
  const t    = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-[#09081c] border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-10 md:mb-12">

          {/* Col 1 — Brand */}
          <div>
            <p className="type-headline text-white mb-1">Marcelle Rocha</p>
            <p className="type-body-sm text-accent-magenta">Product Designer | UX | CX</p>
          </div>

          {/* Col 2 — Crédito + Card */}
          <div className="flex flex-col items-end">
            <p className="type-caption text-white/50 whitespace-nowrap mb-3">
              {t('credit')} <span className="text-white/70">Marcelle</span>
            </p>

            <Link
              href="/racional"
              className="group w-fit flex items-center gap-2 border border-white/15 hover:border-white/35 rounded-xl px-4 py-2.5 transition-all duration-200 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <p className="type-body-sm text-white/80 group-hover:text-white transition-colors duration-200 font-[440]">
                {t('rationale')}
              </p>
              <ArrowUpRight
                size={14}
                className="text-white/30 group-hover:text-white/70 transition-colors duration-200 shrink-0"
                aria-hidden="true"
              />
            </Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6">
          <p className="type-caption text-white/50">
            © {year} Marcelle. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
