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

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Sellbie — Arquitetura de Informação · Marcelle Rocha',
    description:
      'Reestruturação da arquitetura de informação da Sellbie — inventário de conteúdo, card sorting e reorganização da navegação com base em heurísticas.',
    openGraph: {
      title: 'Sellbie — Arquitetura de Informação',
      description: 'Inventário de conteúdo, card sorting e reestruturação da navegação da Sellbie.',
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

const sidebar = [
  { label: 'Empresa', content: 'Sellbie' },
  { label: 'Período', content: '2024' },
  { label: 'Papel', content: 'Product Designer' },
  { label: 'Plataforma', content: 'B2B · SaaS' },
  { label: 'Métodos', content: 'Inventário · Card sorting · Heurísticas de Abby Covert · Sitemap' },
  { label: 'Entregas', content: 'Inventário de conteúdo · Card sorting · Sitemap aprovado' },
];

export default async function SellbieArqInfoPage() {
  const { prev, next } = getCaseNav('sellbie-arq-info');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'sellbie-arq-info.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const detailedContent = (
    <CaseEditorialWrapper sidebar={sidebar}>
      {mdSource ? <CaseMdxContent source={mdSource} /> : <p>Conteúdo detalhado em breve.</p>}
    </CaseEditorialWrapper>
  );

  return (
    <div className="min-h-screen bg-bg">
      <ScrollProgress />

      <header className="pt-section pb-8 px-6 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/#cases"
            className="inline-flex items-center gap-2 px-5 py-2 type-btn border border-fg text-fg rounded-pill bg-transparent hover:bg-fg/10 dark:hover:bg-white/10 active:scale-[0.97] transition-all duration-150 mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg"
          >
            ← Todos os cases
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="type-caption rounded-full px-3 py-2 leading-none bg-surface-soft text-fg">
              Arquitetura de Informação
            </span>
            <span className="type-caption text-fg-subtle">2024</span>
            <span className="type-caption text-fg-subtle">Sellbie</span>
          </div>

          <h1 className="type-display-lg text-fg mb-6">
            Arquitetura<br />de informação
          </h1>

          <p className="type-body-lg text-fg-muted max-w-2xl">
            Reestruturação da navegação da Sellbie a partir de um inventário
            completo de conteúdo, card sorting com usuários reais e
            aplicação das heurísticas de Abby Covert como critério de
            reorganização.
          </p>
        </div>
      </header>

      <CasePageShell detailedContent={detailedContent} prevCase={prev} nextCase={next}>
        <CaseOverviewLayout sidebar={sidebar}>

          <section className="space-y-8">
            <div>
              <Eyebrow>01 · Inventário</Eyebrow>
              <SectionHeading>Mapear antes de reorganizar</SectionHeading>
              <Body>
                Nenhuma reestruturação de navegação começa pela solução.
                O inventário de conteúdo levantou cada item da interface —
                labels, seções, sub-seções, ações e entidades — antes de
                qualquer decisão de agrupamento. No FigJam, o volume ficou
                visível: duplicidades, inconsistências de nomenclatura e
                itens sem lugar claro apareceram antes de qualquer
                pergunta sobre o redesign.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/arquitetura/sellbie-arq-info-inventario-figjam.png"
              alt="Inventário de conteúdo no FigJam"
              caption="Inventário de conteúdo no FigJam — ponto de partida antes de qualquer decisão."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>02 · Critério</Eyebrow>
              <SectionHeading>O critério antes de reorganizar</SectionHeading>
              <Body>
                Card sorting sem critério gera resultados difíceis de
                interpretar. As heurísticas de Abby Covert — findability,
                accessibility, clarity, communication, usefulness,
                credibility, controllability — serviram como base comum
                entre os participantes, tornando as escolhas de agrupamento
                discutíveis por razões objetivas, não por preferência.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/arquitetura/sellbie-arq-info-heuristicas-abby-covert.png"
              alt="Heurísticas de Abby Covert como base para o card sorting"
              caption="Heurísticas de Abby Covert como base comum para o card sorting."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>03 · Card sorting</Eyebrow>
              <SectionHeading>Consensos e divergências que orientaram os agrupamentos</SectionHeading>
              <Body>
                O card sorting revelou onde os modelos mentais dos usuários
                convergiam e onde divergiam do modelo atual do produto.
                Consensos fortes tornaram-se agrupamentos diretos no novo
                sitemap; divergências indicaram onde a nomenclatura estava
                ambígua — e exigiram decisões de design, não apenas de
                organização.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/arquitetura/sellbie-arq-info-card-sorting-resultado.png"
              alt="Resultado do card sorting com consensos e divergências"
              caption="Card sorting de dois participantes — consensos e divergências que orientaram os agrupamentos."
            />
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>Resultado</Eyebrow>
            <SectionHeading>Da pesquisa à estrutura navegável</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '100%', label: 'Do conteúdo mapeado antes de reorganizar' },
                { stat: '7', label: 'Heurísticas como critério de agrupamento' },
                { stat: '1 sitemap', label: 'Aprovado pelo time de produto e engenharia' },
              ].map(({ stat, label }) => (
                <div key={label} className="border border-border rounded-[16px] p-8" style={{ backgroundColor: ACCENT_BG }}>
                  <p className="type-headline mb-2" style={{ color: ACCENT_TEXT }}>{stat}</p>
                  <p className="type-body-sm opacity-70" style={{ color: ACCENT_TEXT }}>{label}</p>
                </div>
              ))}
            </div>
          </section>

        </CaseOverviewLayout>
      </CasePageShell>
    </div>
  );
}
