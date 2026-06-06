import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { Link } from '@/i18n/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { routing } from '@/i18n/routing';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CaseBento } from '@/components/case/CaseBento';
import { CaseBeforeAfter } from '@/components/case/CaseBeforeAfter';
import { CaseEditorial } from '@/components/case/CaseEditorial';
import { CaseScrollCanvas } from '@/components/case/CaseScrollCanvas';
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
    title: 'Sellbie Redesign — Marcelle Rocha',
    description:
      'Redesign do core de campanhas: como unificamos três padrões de navegação e redesenhamos o fluxo de criação de envios da Sellbie.',
    openGraph: {
      title: 'Sellbie — Redesign do core de campanhas',
      description: 'Redesign do core de campanhas multicanal da Sellbie.',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'article',
    },
  };
}

const ACCENT_BG   = 'var(--color-project-sellbie-redesign-bg)';
const ACCENT_TEXT = 'var(--color-project-sellbie-redesign-text)';

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

export default async function SellbieRedesignPage() {
  const { prev, next } = getCaseNav('sellbie-redesign');

  /* ── Detailed content: read MD + compile ── */
  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'sellbie-redesign.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const detailedContent = (
    <CaseEditorialWrapper
      sidebar={[
        { label: 'Empresa', content: 'Sellbie' },
        { label: 'Período', content: 'jan 2024 – fev 2026' },
        { label: 'Papel', content: 'Product Designer' },
        { label: 'Plataforma', content: 'B2B · Marketing multicanal com IA' },
        { label: 'Métodos', content: 'Discovery · Entrevistas com usuários · Benchmarking competitivo' },
        { label: 'Entregas', content: 'Redesign do fluxo de campanhas · Evolução dos fluxos multicanal · WhatsApp Oficial' },
      ]}
    >
      {mdSource ? <MDXRemote source={mdSource} /> : <p>Conteúdo detalhado em breve.</p>}
    </CaseEditorialWrapper>
  );

  return (
    <>
      <ScrollProgress />

      <CasePageShell
        detailedContent={detailedContent}
        prevCase={prev}
        nextCase={next}
      >
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
                  Product Design
                </span>
                <span className="type-caption text-fg-subtle">2024</span>
                <span className="type-caption text-fg-subtle">Sellbie</span>
              </div>

              <h1 className="type-display-lg text-fg mb-6">
                Redesign do core<br />de campanhas
              </h1>

              <p className="type-body-lg text-fg-muted max-w-2xl">
                Como unificamos três padrões de navegação incompatíveis e
                redesenhamos o fluxo de criação de envios — reduzindo o abandono
                no módulo principal da plataforma.
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                {['Product Design', 'UX Research', 'Multicanal', 'IA & Automação', 'Arquitetura de Info'].map(tag => (
                  <span key={tag} className="type-caption rounded-full border border-border px-3 py-1.5 leading-none text-fg-subtle">
                    {tag}
                  </span>
                ))}
              </div>

              <dl className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
                {[
                  { label: 'Papel', value: 'Product Designer' },
                  { label: 'Plataforma', value: 'Web · SaaS B2B' },
                  { label: 'Entregas', value: 'Discovery · Design · Handoff' },
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
              { label: 'Período', content: 'jan 2024 – fev 2026' },
              { label: 'Papel', content: 'Product Designer' },
              { label: 'Plataforma', content: 'B2B · Marketing multicanal com IA' },
              { label: 'Métodos', content: 'Discovery · Entrevistas com usuários · Benchmarking competitivo' },
              { label: 'Entregas', content: 'Redesign do fluxo de campanhas · Evolução dos fluxos multicanal · WhatsApp Oficial' },
            ]}
          >

              <section className="space-y-8">
                <div>
                  <Eyebrow>01 · Diagnóstico</Eyebrow>
                  <SectionHeading>A inconsistência estava por toda parte</SectionHeading>
                  <Body>
                    A Sellbie cresceu rápido demais. Cada squad adicionou sua
                    própria lógica de navegação — e nenhuma conversava com as
                    outras. A auditoria revelou três padrões incompatíveis
                    coexistindo no mesmo produto, sem critério ou hierarquia clara.
                  </Body>
                </div>
                <CaseBento
                  mainImage="/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-1.png"
                  mainAlt="Três padrões de navegação coexistindo sem critério"
                  mainCaption="Três padrões de navegação coexistindo — o problema de inconsistência"
                  images={[
                    { src: '/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-2.png', alt: 'Padrão superior de navegação', caption: 'Padrão superior' },
                    { src: '/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-3.png', alt: 'Padrão lateral de navegação', caption: 'Padrão lateral' },
                  ]}
                  accentBg={ACCENT_BG}
                  accentText={ACCENT_TEXT}
                />
              </section>

              <Divider />

              <section className="space-y-8">
                <div>
                  <Eyebrow>02 · Pesquisa</Eyebrow>
                  <SectionHeading>Antes de redesenhar, precisávamos ouvir</SectionHeading>
                  <Body>
                    Realizamos 12 entrevistas com usuários ativos em três perfis:
                    gestores de marketing, operadores de campanha e
                    administradores. Os clusters revelaram um padrão inesperado —
                    o maior ponto de abandono não era a navegação, mas a criação
                    de envios.
                  </Body>
                </div>
                <CaseBeforeAfter
                  imageBefore="/images/cases/sellbie/redesign/sellbie-redesign-board-entrevistas.png"
                  altBefore="Board de clusterização das entrevistas"
                  captionBefore="Clusterização das entrevistas — padrões que definiram o foco"
                  imageAfter="/images/cases/sellbie/redesign/sellbie-redesign-board-aprendizados.png"
                  altAfter="Board de aprendizados da pesquisa"
                  captionAfter="Aprendizados da pesquisa — síntese que orientou o redesign"
                  accentBg={ACCENT_BG}
                  accentText={ACCENT_TEXT}
                />
              </section>

              <Divider />

              <section className="space-y-8">
                <div>
                  <Eyebrow>03 · Diagnóstico focado</Eyebrow>
                  <SectionHeading>A listagem de campanhas era o sintoma mais visível</SectionHeading>
                  <Body>
                    A tabela fixa não escala para quem gerencia dezenas de
                    campanhas ativas. Sem visualização alternativa, sem
                    contexto rápido, sem hierarquia clara — o usuário perdia
                    tempo procurando antes mesmo de criar. A mudança para cards
                    com visualização alternável foi validada com seis usuários em
                    dois dias de teste.
                  </Body>
                </div>
                <CaseBeforeAfter
                  imageBefore="/images/cases/sellbie/redesign/sellbie-redesign-campanhas-antes.png"
                  altBefore="Listagem de campanhas antes — tabela fixa"
                  captionBefore="Listagem de campanhas antes — tabela fixa"
                  imageAfter="/images/cases/sellbie/redesign/sellbie-redesign-campanhas-cards-depois.png"
                  altAfter="Nova listagem em cards com visualização alternável"
                  captionAfter="Nova listagem em cards — visualização alternável"
                  accentBg={ACCENT_BG}
                  accentText={ACCENT_TEXT}
                />
              </section>

              <Divider />

              <section className="space-y-8">
                <div>
                  <Eyebrow>04 · A decisão de design</Eyebrow>
                  <SectionHeading>A decisão que mudou o fluxo</SectionHeading>
                  <Body>
                    Toda a pesquisa apontava para o mesmo problema: o usuário
                    perdia a referência da campanha ao criar um envio. Quatro
                    páginas separadas, zero contexto. A solução foi trazer o
                    envio para dentro da campanha — em um drawer contextual
                    que mantém o produto visível ao fundo.
                  </Body>
                </div>
                <CaseEditorial
                  imageSrc="/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio.png"
                  imageAlt="Novo drawer contextual com campanha visível"
                  title="A decisão que mudou o fluxo"
                  body="A decisão central do redesign — criar o envio no contexto da campanha."
                  reverse={false}
                  accentBg={ACCENT_BG}
                  accentText={ACCENT_TEXT}
                />
              </section>

              <Divider />

              <section className="space-y-8">
                <div>
                  <Eyebrow>05 · Estado anterior</Eyebrow>
                  <SectionHeading>O que estava errado no fluxo antigo</SectionHeading>
                  <Body>
                    O fluxo antigo dispersava o usuário por quatro páginas
                    independentes. Na etapa de seleção de base — a mais crítica —
                    não havia nenhuma referência visual da campanha. Quem chegava
                    ali não sabia mais exatamente o que estava disparando.
                  </Body>
                </div>
                <CaseBento
                  mainImage="/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-1.png"
                  mainAlt="Fluxo antigo — página separada sem contexto da campanha"
                  mainCaption="Fluxo antigo — página separada sem contexto da campanha"
                  images={[
                    { src: '/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-2.png', alt: 'Etapa 2 do fluxo antigo', caption: 'Etapa 2 do fluxo antigo' },
                    { src: '/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-3.png', alt: 'Etapa 3 — base densa sem resumo', caption: 'Etapa 3 — base densa sem resumo' },
                  ]}
                  accentBg={ACCENT_BG}
                  accentText={ACCENT_TEXT}
                />
              </section>

              <Divider />

              <section className="space-y-8">
                <div>
                  <Eyebrow>06 · O redesign</Eyebrow>
                  <SectionHeading>O drawer condensa o que antes eram quatro páginas</SectionHeading>
                  <Body>
                    Cada etapa do drawer de e-mail foi desenhada para manter o
                    usuário orientado. O canal, o conteúdo, a base e a
                    configuração — tudo em sequência linear, sem perder o
                    contexto da campanha que está visível ao fundo.
                  </Body>
                </div>
                <CaseScrollCanvas
                  imageSrc="/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-1.png"
                  imageAlt="Etapas do drawer de e-mail"
                  title="Etapas do drawer — E-mail"
                  containerHeight={380}
                  accentBg={ACCENT_BG}
                  accentText={ACCENT_TEXT}
                />
              </section>

              <Divider />

              <section className="space-y-8">
                <div>
                  <Eyebrow>07 · Revisão e aprovação</Eyebrow>
                  <SectionHeading>As duas etapas que fecham o ciclo</SectionHeading>
                  <Body>
                    O resumo consolida tudo em uma tela antes do disparo —
                    permitindo edição inline sem voltar às etapas anteriores.
                    A aprovação, quando necessária, formaliza a revisão e
                    transfere a responsabilidade para quem tem autorização.
                  </Body>
                </div>
                <CaseBeforeAfter
                  imageBefore="/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-resumo.png"
                  altBefore="Resumo consolidado com revisão completa e edição inline"
                  captionBefore="Resumo consolidado — revisão completa com edição inline"
                  imageAfter="/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-aprovacao.png"
                  altAfter="Etapa de aprovação antes do disparo"
                  captionAfter="Aprovação — formaliza a revisão antes do disparo"
                  accentBg={ACCENT_BG}
                  accentText={ACCENT_TEXT}
                />
              </section>

              <Divider />

              <section className="space-y-6">
                <Eyebrow>Resultado</Eyebrow>
                <SectionHeading>O que mudou depois do redesign</SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { stat: '−43%', label: 'Taxa de abandono na criação de envios' },
                    { stat: '2×', label: 'Mais campanhas criadas por sessão' },
                    { stat: '4 → 1', label: 'Páginas no fluxo de criação' },
                  ].map(({ stat, label }) => (
                    <div key={label} className="bg-block-mint border border-border rounded-[16px] p-8">
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
