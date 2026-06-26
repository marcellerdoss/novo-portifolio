import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { CaseImageFrame } from '@/components/case/CaseImageFrame';
import { Link } from '@/i18n/navigation';
import { CaseMdxContent } from '@/components/case/CaseMdxContent';
import { routing } from '@/i18n/routing';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CasePageShell } from '@/components/case/CasePageShell';
import { CaseEditorialWrapper } from '@/components/case/CaseEditorialWrapper';
import { getCaseNav } from '@/lib/casesConfig';
import { CaseOverviewLayout } from '@/components/case/CaseOverviewLayout';
import { buttonVariants } from '@/components/ui/Button';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Sellbie — Information Architecture · Marcelle Rocha' : 'Sellbie — Arquitetura de Informação · Marcelle Rocha',
    description: locale === 'en'
      ? 'Restructuring Sellbie\'s information architecture — content inventory, card sorting and navigation reorganization based on heuristics.'
      : 'Reestruturação da arquitetura de informação da Sellbie — inventário de conteúdo, card sorting e reorganização da navegação com base em heurísticas.',
    openGraph: {
      title: locale === 'en' ? 'Sellbie — Information Architecture' : 'Sellbie — Arquitetura de Informação',
      description: locale === 'en' ? 'Content inventory, card sorting and navigation restructuring for Sellbie.' : 'Inventário de conteúdo, card sorting e reestruturação da navegação da Sellbie.',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'article',
    },
  };
}

const ACCENT_BG   = 'var(--color-project-sellbie-arq-info-bg)';
const ACCENT_TEXT = 'var(--color-project-sellbie-arq-info-text)';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="type-caption text-accent-magenta mb-4">{children}</p>;
}
function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="type-headline text-fg mb-6">{children}</h2>;
}
function Body({ children }: { children: React.ReactNode }) {
  return <p className="type-body text-fg-muted">{children}</p>;
}
function Divider() {
  return <hr className="border-border" />;
}
function CaseImg({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return <CaseImageFrame src={src} alt={alt} caption={caption} />;
}

export default async function SellbieArqInfoPage({ params }: Props) {
  const { locale } = await params;
  const en = locale === 'en';
  const { prev, next } = getCaseNav('sellbie-arq-info');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'sellbie-arq-info.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const sidebar = en
    ? [
        { label: 'Company',      content: 'Sellbie' },
        { label: 'Platform',     content: 'B2B · SaaS' },
        { label: 'Methods',      content: 'Inventory · Card sorting · Abby Covert\'s heuristics · Sitemap' },
        { label: 'Deliverables', content: 'Content inventory · Card sorting · Approved sitemap' },
      ]
    : [
        { label: 'Empresa',   content: 'Sellbie' },
        { label: 'Plataforma', content: 'B2B · SaaS' },
        { label: 'Métodos',   content: 'Inventário · Card sorting · Heurísticas de Abby Covert · Sitemap' },
        { label: 'Entregas',  content: 'Inventário de conteúdo · Card sorting · Sitemap aprovado' },
      ];

  const detailedContent = (
    <CaseEditorialWrapper sidebar={sidebar}>
      {mdSource ? <CaseMdxContent source={mdSource} /> : <p>{en ? 'Detailed content coming soon.' : 'Conteúdo detalhado em breve.'}</p>}
    </CaseEditorialWrapper>
  );

  return (
    <div>
      <ScrollProgress />

      <header className="pt-section pb-8 px-6 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <Link
            href={{ pathname: '/', hash: '#cases' }}
            className={buttonVariants({ variant: 'secondary', size: 'xs' }) + ' mb-10'}
          >
            {en ? '← All cases' : '← Todos os cases'}
          </Link>

          <h1 className="type-display-lg text-fg mb-6">
            {en ? <>Information<br />architecture</> : <>Arquitetura<br />de informação</>}
          </h1>

          <p className="type-body-lg text-fg-muted max-w-2xl">
            {en
              ? 'Restructuring of Sellbie\'s navigation based on a complete content inventory, card sorting with real users and application of Abby Covert\'s heuristics as a reorganization criterion.'
              : 'Reestruturação da navegação da Sellbie a partir de um inventário completo de conteúdo, card sorting com usuários reais e aplicação das heurísticas de Abby Covert como critério de reorganização.'}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {(en
              ? ['Product Design', 'UX Research', 'Information Architecture', 'Card Sorting', 'Navigation']
              : ['Product Design', 'UX Research', 'Arquitetura de Informação', 'Card Sorting', 'Navegação']
            ).map(tag => (
              <span key={tag} className="type-caption rounded-full border border-border px-3 py-1 leading-none text-fg-subtle">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <CasePageShell detailedContent={detailedContent} prevCase={prev} nextCase={next}>
        <CaseOverviewLayout sidebar={sidebar}>

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '01 · Inventory' : '01 · Inventário'}</Eyebrow>
              <SectionHeading>{en ? 'Map before reorganizing' : 'Mapear antes de reorganizar'}</SectionHeading>
              <Body>
                {en
                  ? 'No navigation restructuring starts with the solution. The content inventory listed every interface item — labels, sections, sub-sections, actions and entities — before any grouping decision. In FigJam, the volume became visible: duplicates, naming inconsistencies and items without a clear place appeared before any questions about the redesign.'
                  : 'Nenhuma reestruturação de navegação começa pela solução. O inventário de conteúdo levantou cada item da interface — labels, seções, sub-seções, ações e entidades — antes de qualquer decisão de agrupamento. No FigJam, o volume ficou visível: duplicidades, inconsistências de nomenclatura e itens sem lugar claro apareceram antes de qualquer pergunta sobre o redesign.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/arquitetura/sellbie-arq-info-inventario-figjam.png"
              alt={en ? 'Content inventory in FigJam' : 'Inventário de conteúdo no FigJam'}
              caption={en ? 'Content inventory in FigJam — starting point before any decision.' : 'Inventário de conteúdo no FigJam — ponto de partida antes de qualquer decisão.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '02 · Criterion' : '02 · Critério'}</Eyebrow>
              <SectionHeading>{en ? 'The criterion before reorganizing' : 'O critério antes de reorganizar'}</SectionHeading>
              <Body>
                {en
                  ? 'Card sorting without a criterion generates results that are hard to interpret. Abby Covert\'s heuristics — findability, accessibility, clarity, communication, usefulness, credibility, controllability — served as a common basis among participants, making grouping choices discussable for objective reasons, not preference.'
                  : 'Card sorting sem critério gera resultados difíceis de interpretar. As heurísticas de Abby Covert — findability, accessibility, clarity, communication, usefulness, credibility, controllability — serviram como base comum entre os participantes, tornando as escolhas de agrupamento discutíveis por razões objetivas, não por preferência.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/arquitetura/sellbie-arq-info-heuristicas-abby-covert.png"
              alt={en ? 'Abby Covert heuristics as basis for card sorting' : 'Heurísticas de Abby Covert como base para o card sorting'}
              caption={en ? 'Abby Covert\'s heuristics as a common basis for card sorting.' : 'Heurísticas de Abby Covert como base comum para o card sorting.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '03 · Card sorting' : '03 · Card sorting'}</Eyebrow>
              <SectionHeading>{en ? 'Consensus and divergences that guided groupings' : 'Consensos e divergências que orientaram os agrupamentos'}</SectionHeading>
              <Body>
                {en
                  ? 'Card sorting revealed where users\' mental models converged and where they diverged from the current product model. Strong consensus became direct groupings in the new sitemap; divergences indicated where the nomenclature was ambiguous — and required design decisions, not just organizational ones.'
                  : 'O card sorting revelou onde os modelos mentais dos usuários convergiam e onde divergiam do modelo atual do produto. Consensos fortes tornaram-se agrupamentos diretos no novo sitemap; divergências indicaram onde a nomenclatura estava ambígua — e exigiram decisões de design, não apenas de organização.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/arquitetura/sellbie-arq-info-card-sorting-resultado.png"
              alt={en ? 'Card sorting result with consensus and divergences' : 'Resultado do card sorting com consensos e divergências'}
              caption={en ? 'Card sorting from two participants — consensus and divergences that guided groupings.' : 'Card sorting de dois participantes — consensos e divergências que orientaram os agrupamentos.'}
            />
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>{en ? 'Outcome' : 'Resultado'}</Eyebrow>
            <SectionHeading>{en ? 'From research to navigable structure' : 'Da pesquisa à estrutura navegável'}</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '100%',     label: { pt: 'Do conteúdo mapeado antes de reorganizar',                      en: 'Of content mapped before reorganizing' } },
                { stat: '7',        label: { pt: 'Heurísticas como critério de agrupamento',                      en: 'Heuristics as grouping criterion' } },
                { stat: '1 sitemap', label: { pt: 'Aprovado pelo time de produto e engenharia',                    en: 'Approved by product and engineering teams' } },
              ].map(({ stat, label }) => (
                <div key={label.pt} className="border border-border rounded-[16px] p-8" style={{ backgroundColor: ACCENT_BG }}>
                  <p className="type-headline mb-2" style={{ color: ACCENT_TEXT }}>{stat}</p>
                  <p className="type-body-sm opacity-70" style={{ color: ACCENT_TEXT }}>{en ? label.en : label.pt}</p>
                </div>
              ))}
            </div>
          </section>

        </CaseOverviewLayout>
      </CasePageShell>
    </div>
  );
}
