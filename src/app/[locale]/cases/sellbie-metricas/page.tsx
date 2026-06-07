import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { CaseImageFrame } from '@/components/case/CaseImageFrame';
import { Link } from '@/i18n/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
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
    title: 'Sellbie — Métricas de Produto · Marcelle Rocha',
    description:
      'Estruturação de métricas de produto na Sellbie com o framework HEART — metas, sinais e objetivos definidos para cinco módulos do produto.',
    openGraph: {
      title: 'Sellbie — Métricas de Produto',
      description: 'Framework HEART aplicado a cinco módulos da Sellbie — metas, sinais e objetivos de produto.',
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

const sidebar = [
  { label: 'Empresa', content: 'Sellbie' },
  { label: 'Período', content: '2024' },
  { label: 'Papel', content: 'Product Designer' },
  { label: 'Plataforma', content: 'B2B · SaaS' },
  { label: 'Métodos', content: 'Framework HEART · OKRs · Documentação de produto' },
  { label: 'Entregas', content: 'Framework HEART · 5 módulos · OKRs' },
];

export default async function SellbieMetricasPage() {
  const { prev, next } = getCaseNav('sellbie-metricas');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'sellbie-metricas.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const detailedContent = (
    <CaseEditorialWrapper sidebar={sidebar}>
      {mdSource ? <MDXRemote source={mdSource} /> : <p>Conteúdo detalhado em breve.</p>}
    </CaseEditorialWrapper>
  );

  return (
    <div className="min-h-screen bg-bg">
      <ScrollProgress />

      <header className="pt-section pb-8 px-6 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/#cases"
            className="inline-flex items-center gap-2 px-5 py-2 type-body-sm border border-fg text-fg rounded-pill bg-transparent hover:bg-fg/5 active:scale-[0.97] transition-all duration-150 mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg"
          >
            ← Todos os cases
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="type-caption rounded-full px-3 py-1.5 leading-none bg-surface-soft text-fg">
              Métricas de Produto
            </span>
            <span className="type-caption text-fg-subtle">2024</span>
            <span className="type-caption text-fg-subtle">Sellbie</span>
          </div>

          <h1 className="type-display-lg text-fg mb-6">
            Métricas<br />de produto
          </h1>

          <p className="type-body-lg text-fg-muted max-w-2xl">
            Estruturação de métricas de produto para cinco módulos da
            Sellbie usando o framework HEART — conectando cada dimensão
            de qualidade a metas de negócio, sinais mensuráveis e
            objetivos de produto rastreáveis.
          </p>
        </div>
      </header>

      <CasePageShell detailedContent={detailedContent} prevCase={prev} nextCase={next}>
        <CaseOverviewLayout sidebar={sidebar}>

          <section className="space-y-8">
            <div>
              <Eyebrow>01 · Framework</Eyebrow>
              <SectionHeading>A estrutura que conecta qualidade a resultado</SectionHeading>
              <Body>
                O HEART organiza a qualidade de experiência em cinco
                dimensões — Happiness, Engagement, Adoption, Retention e
                Task Success. Para cada dimensão de cada módulo, definimos
                uma meta de produto, os sinais observáveis que indicam
                progresso e os objetivos concretos que tornam a meta
                mensurável. Sem essa estrutura, a equipe media o que era
                fácil medir, não o que importava.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/metricas/sellbie-metricas-heart-estrutura-mae.png"
              alt="Framework HEART com cada métrica conectada a meta, sinal e objetivo"
              caption="Framework HEART — cada métrica conectada a meta, sinal e objetivo de produto."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>02 · Aplicação</Eyebrow>
              <SectionHeading>Cinco módulos com a mesma estrutura — resultados comparáveis</SectionHeading>
              <Body>
                Aplicar o HEART a módulos diferentes com estruturas diferentes
                cria um problema de comparabilidade. A decisão foi manter
                exatamente o mesmo template para todos os cinco módulos —
                Campanhas, Jornadas, Contatos, Loja e Relatórios — de modo
                que o time de produto pudesse comparar dimensões equivalentes
                entre áreas distintas e priorizar investimentos com um
                critério comum.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/metricas/sellbie-metricas-heart-modulos-lado-a-lado.png"
              alt="Cinco módulos com a mesma estrutura HEART lado a lado"
              caption="Cinco módulos com a mesma estrutura HEART — resultados comparáveis entre áreas."
            />
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>Resultado</Eyebrow>
            <SectionHeading>Métricas que o time usa — não só documenta</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '5', label: 'Módulos cobertos com a mesma estrutura HEART' },
                { stat: '3', label: 'Dimensões priorizadas no primeiro ciclo de OKRs' },
                { stat: '1 critério', label: 'Comum para priorização entre áreas diferentes' },
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
