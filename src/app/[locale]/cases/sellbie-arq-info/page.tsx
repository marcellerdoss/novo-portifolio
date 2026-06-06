import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { Link } from '@/i18n/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { routing } from '@/i18n/routing';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CaseHero } from '@/components/case/CaseHero';
import { CaseEditorial } from '@/components/case/CaseEditorial';
import { CaseLightbox } from '@/components/case/CaseLightbox';
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
      description:
        'Inventário de conteúdo, card sorting e reestruturação da navegação da Sellbie.',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'article',
    },
  };
}

const ACCENT_BG   = 'var(--color-project-sellbie-arq-info-bg)';
const ACCENT_TEXT = 'var(--color-project-sellbie-arq-info-text)';

/* ─── Layout helpers ─────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="type-caption text-fg-subtle mb-4">{children}</p>;
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

/* ─── Page ───────────────────────────────────────────────── */

export default async function SellbieArqInfoPage() {
  const { prev, next } = getCaseNav('sellbie-arq-info');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'sellbie-arq-info.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const detailedContent = (
    <CaseEditorialWrapper
      sidebar={[
        { label: 'Empresa', content: 'Sellbie' },
        { label: 'Período', content: '2024' },
        { label: 'Papel', content: 'Product Designer' },
        { label: 'Plataforma', content: 'B2B · SaaS' },
        { label: 'Métodos', content: 'Inventário · Card sorting · Heurísticas de Abby Covert · Sitemap' },
        { label: 'Entregas', content: 'Inventário de conteúdo · Card sorting · Sitemap aprovado' },
      ]}
    >
      {mdSource ? <MDXRemote source={mdSource} /> : <p>Conteúdo detalhado em breve.</p>}
    </CaseEditorialWrapper>
  );

  return (
    <>
      <ScrollProgress />

      <CasePageShell detailedContent={detailedContent} prevCase={prev} nextCase={next}>
        <div className="min-h-screen bg-bg">
        {/* ── Case header ───────────────────────────────── */}
        <header className="py-section px-6 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/#cases"
              className="type-caption text-fg-subtle hover:text-fg transition-colors mb-10 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded"
            >
              ← Todos os cases
            </Link>

            <div className="flex flex-wrap items-start gap-3 mb-8">
              <span
                className="type-caption rounded-full px-3 py-1.5 leading-none"
                style={{ backgroundColor: ACCENT_BG, color: ACCENT_TEXT }}
              >
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

            <dl className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              {[
                { label: 'Papel', value: 'Product Designer' },
                { label: 'Plataforma', value: 'Web · SaaS B2B' },
                { label: 'Entregas', value: 'Inventário · Sorting · Sitemap' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="type-caption text-fg-subtle mb-1">{label}</dt>
                  <dd className="type-body-sm text-fg font-[480]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* ── Sections ──────────────────────────────────── */}
        <CaseOverviewLayout
          sidebar={[
            { label: 'Empresa', content: 'Sellbie' },
            { label: 'Período', content: '2024' },
            { label: 'Papel', content: 'Product Designer' },
            { label: 'Plataforma', content: 'B2B · SaaS' },
            { label: 'Métodos', content: 'Inventário · Card sorting · Heurísticas de Abby Covert · Sitemap' },
            { label: 'Entregas', content: 'Inventário de conteúdo · Card sorting · Sitemap aprovado' },
          ]}
        >

            {/* ── 1. Inventário ────────────────────────── */}
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

              {/* [imagem: inventario] */}
              <CaseHero
                imageSrc="/images/cases/sellbie/arquitetura/sellbie-arq-info-inventario-figjam.png"
                imageAlt="Inventário de conteúdo no FigJam"
                caption="Inventário de conteúdo no FigJam — ponto de partida antes de qualquer decisão."
                accentBg={ACCENT_BG}
                accentText={ACCENT_TEXT}
              />
            </section>

            <Divider />

            {/* ── 2. Heurísticas ───────────────────────── */}
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

              {/* [imagem: heuristicas] */}
              <CaseEditorial
                imageSrc="/images/cases/sellbie/arquitetura/sellbie-arq-info-heuristicas-abby-covert.png"
                imageAlt="Heurísticas de Abby Covert como base para o card sorting"
                title="O critério antes de reorganizar"
                body="Heurísticas de Abby Covert como base comum para o card sorting."
                reverse={false}
                accentBg={ACCENT_BG}
                accentText={ACCENT_TEXT}
              />
            </section>

            <Divider />

            {/* ── 3. Card sorting ──────────────────────── */}
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

              {/* [imagem: card-sorting] */}
              <CaseLightbox
                imageSrc="/images/cases/sellbie/arquitetura/sellbie-arq-info-card-sorting-resultado.png"
                imageAlt="Resultado do card sorting com consensos e divergências"
                caption="Card sorting de dois participantes — consensos e divergências que orientaram os agrupamentos."
                height={360}
                accentBg={ACCENT_BG}
                accentText={ACCENT_TEXT}
              />
            </section>

            <Divider />

            {/* ── Resultado ─────────────────────────────── */}
            <section className="space-y-6">
              <Eyebrow>Resultado</Eyebrow>
              <SectionHeading>Da pesquisa à estrutura navegável</SectionHeading>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { stat: '100%', label: 'Do conteúdo mapeado antes de reorganizar' },
                  { stat: '7', label: 'Heurísticas como critério de agrupamento' },
                  { stat: '1 sitemap', label: 'Aprovado pelo time de produto e engenharia' },
                ].map(({ stat, label }) => (
                  <div
                    key={label}
                    className="bg-block-mint border border-border rounded-[16px] p-8"
                  >
                    <p className="type-headline text-fg mb-2">{stat}</p>
                    <p className="type-body-sm text-fg-muted">{label}</p>
                  </div>
                ))}
              </div>
            </section>

        </CaseOverviewLayout>
      </div>
      </CasePageShell>
    </>
  );
}
