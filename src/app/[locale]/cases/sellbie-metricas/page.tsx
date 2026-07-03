import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { CaseImageFrame } from '@/components/case/CaseImageFrame';
import { Link } from '@/i18n/navigation';
import { CaseMdxContent } from '@/components/case/CaseMdxContent';
import { routing } from '@/i18n/routing';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CasePageShell } from '@/components/case/CasePageShell';
import { Contact } from '@/components/sections/Contact';
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
    title: locale === 'en' ? 'Sellbie — Product Metrics · Marcelle Rocha' : 'Sellbie — Métricas de Produto · Marcelle Rocha',
    description: locale === 'en'
      ? 'Structuring product metrics at Sellbie with the HEART framework — goals, signals and objectives defined for five product modules.'
      : 'Estruturação de métricas de produto na Sellbie com o framework HEART — metas, sinais e objetivos definidos para cinco módulos do produto.',
    openGraph: {
      title: locale === 'en' ? 'Sellbie — Product Metrics' : 'Sellbie — Métricas de Produto',
      description: locale === 'en' ? 'HEART framework applied to five Sellbie modules.' : 'Framework HEART aplicado a cinco módulos da Sellbie.',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'article',
    },
  };
}

const ACCENT_BG   = 'var(--color-project-sellbie-metricas-bg)';
const ACCENT_TEXT = 'var(--color-project-sellbie-metricas-text)';

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

export default async function SellbieMetricasPage({ params }: Props) {
  const { locale } = await params;
  const en = locale === 'en';
  const { prev, next } = getCaseNav('sellbie-metricas');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'sellbie-metricas.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const sidebar = en
    ? [
        { label: 'Company',      content: 'Sellbie' },
        { label: 'Platform',     content: 'B2B · SaaS' },
        { label: 'Methods',      content: 'HEART Framework · OKRs · Product documentation' },
        { label: 'Deliverables', content: 'HEART Framework · 5 modules · OKRs' },
      ]
    : [
        { label: 'Empresa',   content: 'Sellbie' },
        { label: 'Plataforma', content: 'B2B · SaaS' },
        { label: 'Métodos',   content: 'Framework HEART · OKRs · Documentação de produto' },
        { label: 'Entregas',  content: 'Framework HEART · 5 módulos · OKRs' },
      ];

  const detailedContent = (
    <CaseEditorialWrapper sidebar={sidebar}>
      {mdSource ? <CaseMdxContent source={mdSource} /> : <p>{en ? 'Detailed content coming soon.' : 'Conteúdo detalhado em breve.'}</p>}
    </CaseEditorialWrapper>
  );

  return (
    <div className="min-h-screen bg-bg">
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
            {en ? <>Product<br />metrics</> : <>Métricas<br />de produto</>}
          </h1>

          <p className="type-body-lg text-fg-muted max-w-2xl">
            {en
              ? 'Structuring product metrics for five Sellbie modules using the HEART framework, connecting each quality dimension to business goals, measurable signals and trackable product objectives.'
              : 'Estruturação de métricas de produto para cinco módulos da Sellbie usando o framework HEART, conectando cada dimensão de qualidade a metas de negócio, sinais mensuráveis e objetivos de produto rastreáveis.'}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {(en
              ? ['Product Design', 'UX Research', 'Product Metrics', 'HEART Framework', 'OKRs']
              : ['Product Design', 'UX Research', 'Métricas de Produto', 'Framework HEART', 'OKRs']
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
              <Eyebrow>{en ? '01 · Framework' : '01 · Framework'}</Eyebrow>
              <SectionHeading>{en ? 'The structure that connects quality to results' : 'A estrutura que conecta qualidade a resultado'}</SectionHeading>
              <Body>
                {en
                  ? 'HEART organizes experience quality into five dimensions — Happiness, Engagement, Adoption, Retention and Task Success. For each dimension of each module, we defined a product goal, the observable signals indicating progress and the concrete objectives that make the goal measurable. Without this structure, the team measured what was easy to measure, not what mattered.'
                  : 'O HEART organiza a qualidade de experiência em cinco dimensões — Happiness, Engagement, Adoption, Retention e Task Success. Para cada dimensão de cada módulo, definimos uma meta de produto, os sinais observáveis que indicam progresso e os objetivos concretos que tornam a meta mensurável. Sem essa estrutura, a equipe media o que era fácil medir, não o que importava.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/metricas/sellbie-metricas-heart-estrutura-mae.png"
              alt={en ? 'HEART framework with each metric connected to goal, signal and objective' : 'Framework HEART com cada métrica conectada a meta, sinal e objetivo'}
              caption={en ? 'HEART Framework — each metric connected to a product goal, signal and objective.' : 'Framework HEART — cada métrica conectada a meta, sinal e objetivo de produto.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '02 · Application' : '02 · Aplicação'}</Eyebrow>
              <SectionHeading>{en ? 'Five modules with the same structure — comparable results' : 'Cinco módulos com a mesma estrutura — resultados comparáveis'}</SectionHeading>
              <Body>
                {en
                  ? 'Applying HEART to different modules with different structures creates a comparability problem. The decision was to keep exactly the same template for all five modules — Campaigns, Journeys, Contacts, Store and Reports — so the product team could compare equivalent dimensions across different areas and prioritize investments with a common criterion.'
                  : 'Aplicar o HEART a módulos diferentes com estruturas diferentes cria um problema de comparabilidade. A decisão foi manter exatamente o mesmo template para todos os cinco módulos — Campanhas, Jornadas, Contatos, Loja e Relatórios — de modo que o time de produto pudesse comparar dimensões equivalentes entre áreas distintas e priorizar investimentos com um critério comum.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/metricas/sellbie-metricas-heart-modulos-lado-a-lado.png"
              alt={en ? 'Five modules with the same HEART structure side by side' : 'Cinco módulos com a mesma estrutura HEART lado a lado'}
              caption={en ? 'Five modules with the same HEART structure — comparable results across areas.' : 'Cinco módulos com a mesma estrutura HEART — resultados comparáveis entre áreas.'}
            />
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>{en ? 'Outcome' : 'Resultado'}</Eyebrow>
            <SectionHeading>{en ? 'Metrics the team uses — not just documents' : 'Métricas que o time usa — não só documenta'}</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '5',          label: { pt: 'Módulos cobertos com a mesma estrutura HEART',           en: 'Modules covered with the same HEART structure' } },
                { stat: '3',          label: { pt: 'Dimensões priorizadas no primeiro ciclo de OKRs',        en: 'Dimensions prioritized in the first OKR cycle' } },
                { stat: '1 critério', label: { pt: 'Comum para priorização entre áreas diferentes',          en: 'Common criterion for prioritization across areas' } },
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

      <Contact />
    </div>
  );
}
