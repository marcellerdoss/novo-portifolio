import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { Link } from '@/i18n/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { routing } from '@/i18n/routing';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CaseHero } from '@/components/case/CaseHero';
import { CaseBento } from '@/components/case/CaseBento';
import { CaseEditorial } from '@/components/case/CaseEditorial';
import { CaseBeforeAfter } from '@/components/case/CaseBeforeAfter';
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
    title: 'Jovens Gênios — Central de Ajuda · Marcelle Rocha',
    description:
      'Design da central de ajuda do Jovens Gênios — navegação por perfil, busca contextualizada e empty states que mantêm o usuário no caminho certo.',
    openGraph: {
      title: 'Jovens Gênios — Central de Ajuda',
      description:
        'Central de ajuda com três perfis, busca filtrada e empty states inteligentes.',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'article',
    },
  };
}

const ACCENT_BG   = 'var(--color-project-jg-central-ajuda-bg)';
const ACCENT_TEXT = 'var(--color-project-jg-central-ajuda-text)';

/* ─── Layout helpers ─────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="type-caption text-block-navy mb-4">{children}</p>;
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

export default async function JgCentralAjudaPage() {
  const { prev, next } = getCaseNav('jg-central-ajuda');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'jg-central-ajuda.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const detailedContent = (
    <CaseEditorialWrapper
      sidebar={[
        { label: 'Empresa', content: 'Jovens Gênios' },
        { label: 'Período', content: 'ago 2022 – jul 2024' },
        { label: 'Papel', content: 'Product Designer' },
        { label: 'Plataforma', content: 'EdTech · B2C · B2B' },
        { label: 'Métodos', content: 'Arquitetura de Informação · Benchmarking · Personalização por perfil' },
        { label: 'Entregas', content: 'Navegação por perfil · Busca filtrada · Empty states · Handoff' },
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
        <header className="pt-section pb-8 px-6 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/#cases"
              className="inline-flex items-center gap-2 px-5 py-2 type-body-sm border border-black/15 text-fg-muted rounded-pill bg-transparent hover:border-black/40 hover:text-fg active:scale-[0.97] transition-all duration-150 mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg"
            >
              ← Todos os cases
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span
                className="type-caption rounded-full px-3 py-1.5 leading-none"
                style={{ backgroundColor: ACCENT_BG, color: ACCENT_TEXT }}
              >
                UX · Produto Educacional
              </span>
              <span className="type-caption text-fg-subtle">2024</span>
              <span className="type-caption text-fg-subtle">Jovens Gênios</span>
            </div>

            <h1 className="type-display-lg text-fg mb-6">
              Central<br />de ajuda
            </h1>

            <p className="type-body-lg text-fg-muted max-w-2xl">
              Design da central de ajuda do Jovens Gênios para três perfis
              distintos — Educadores, Exploradores e Responsáveis — com
              navegação contextualizada, busca filtrada por perfil e empty
              states que mantêm o usuário orientado mesmo quando não há
              resultado.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {['Arquitetura de Informação', 'Pesquisa com usuários', 'Personalização'].map(tag => (
                <span key={tag} className="type-caption rounded-full border border-border px-3 py-1.5 leading-none text-fg-subtle">
                  {tag}
                </span>
              ))}
            </div>

          </div>
        </header>

        {/* ── Sections ──────────────────────────────────── */}
        <CaseOverviewLayout
          sidebar={[
            { label: 'Empresa', content: 'Jovens Gênios' },
            { label: 'Período', content: 'ago 2022 – jul 2024' },
            { label: 'Papel', content: 'Product Designer' },
            { label: 'Contexto', content: 'EdTech · B2C · B2B' },
            { label: 'Métodos', content: 'Arquitetura de Informação · Benchmarking · Personalização por perfil' },
            { label: 'Entregas', content: 'Navegação por perfil · Busca filtrada · Empty states · Handoff' },
          ]}
        >

            {/* ── 1. Página inicial ────────────────────── */}
            <section className="space-y-8">
              <div>
                <Eyebrow>01 · Entrada</Eyebrow>
                <SectionHeading>A primeira pergunta que a central responde é "quem é você"</SectionHeading>
                <Body>
                  O Jovens Gênios tem três tipos de usuário com necessidades
                  completamente diferentes — um educador procura como configurar
                  uma turma; um explorador quer saber como acessar uma
                  atividade; um responsável precisa entender a assinatura. Uma
                  central de ajuda genérica obrigaria cada um a filtrar
                  mentalmente o que é relevante para si. A solução foi tornar
                  a escolha de perfil o primeiro gesto — antes de qualquer
                  busca ou categoria.
                </Body>
              </div>

              {/* [imagem: pagina-inicial] */}
              <CaseHero
                imageSrc="/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-pagina-inicial.png"
                imageAlt="Página inicial da central de ajuda com três entradas por perfil"
                caption="Três entradas por perfil logo na página inicial."
                accentBg={ACCENT_BG}
                accentText={ACCENT_TEXT}
              />
            </section>

            <Divider />

            {/* ── 2. Categorias por perfil ─────────────── */}
            <section className="space-y-8">
              <div>
                <Eyebrow>02 · Categorias</Eyebrow>
                <SectionHeading>Cada perfil com identidade visual e conteúdo pré-filtrado</SectionHeading>
                <Body>
                  Ao escolher o perfil, o usuário não vê uma lista genérica de
                  categorias — vê categorias com filtro pré-aplicado e
                  identidade visual que reforça que aquele conteúdo é para ele.
                  Educadores veem categorias de gestão de turma e currículo;
                  Exploradores, de atividades e progresso; Responsáveis, de
                  assinatura e controle parental. O mesmo sistema de categorias,
                  três leituras diferentes.
                </Body>
              </div>

              {/* [imagem: categorias] */}
              <CaseBento
                mainImage="/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-educadores.png"
                mainAlt="Categoria Educadores com filtro pré-aplicado e identidade visual própria"
                mainCaption="Categoria Educadores — filtro pré-aplicado e identidade visual própria"
                images={[
                  {
                    src: '/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-exploradores.png',
                    alt: 'Categoria Exploradores',
                    caption: 'Exploradores',
                  },
                  {
                    src: '/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-responsaveis.png',
                    alt: 'Categoria Responsáveis',
                    caption: 'Responsáveis',
                  },
                ]}
                accentBg={ACCENT_BG}
                accentText={ACCENT_TEXT}
              />
            </section>

            <Divider />

            {/* ── 3. Artigo ────────────────────────────── */}
            <section className="space-y-8">
              <div>
                <Eyebrow>03 · Leitura</Eyebrow>
                <SectionHeading>Leitura sem beco sem saída</SectionHeading>
                <Body>
                  A tela de artigo foi desenhada para manter o usuário
                  orientado durante a leitura e para nunca deixá-lo sem
                  próximo passo. A navegação lateral mantém a estrutura da
                  categoria visível enquanto o conteúdo rola; o suporte
                  contextual fica acessível sem interromper a leitura. Quem
                  chega ao fim do artigo sem resolver vê ações claras — não
                  uma tela vazia.
                </Body>
              </div>

              {/* [imagem: artigo] */}
              <CaseEditorial
                imageSrc="/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-artigo-nav-lateral.png"
                imageAlt="Artigo com navegação lateral e suporte sempre acessível"
                title="Leitura sem beco sem saída"
                body="Artigo com navegação lateral e suporte sempre acessível."
                reverse={false}
                accentBg={ACCENT_BG}
                accentText={ACCENT_TEXT}
              />
            </section>

            <Divider />

            {/* ── 4. Busca ─────────────────────────────── */}
            <section className="space-y-8">
              <div>
                <Eyebrow>04 · Busca</Eyebrow>
                <SectionHeading>Resultados que já sabem para quem são</SectionHeading>
                <Body>
                  A busca herda o perfil selecionado na entrada — quem busca
                  como educador vê resultados filtrados para educadores, com
                  contexto explícito de qual categoria cada artigo pertence.
                  O usuário não precisa re-filtrar mentalmente o que é
                  relevante. O perfil escolhido no início da jornada persiste
                  e trabalha a favor de cada consulta subsequente.
                </Body>
              </div>

              {/* [imagem: busca] */}
              <CaseHero
                imageSrc="/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-resultados.png"
                imageAlt="Busca filtrada por perfil com resultados contextualizados"
                caption="Busca filtrada por perfil — resultados contextualizados."
                accentBg={ACCENT_BG}
                accentText={ACCENT_TEXT}
              />
            </section>

            <Divider />

            {/* ── 5. Empty states ──────────────────────── */}
            <section className="space-y-8">
              <div>
                <Eyebrow>05 · Empty states</Eyebrow>
                <SectionHeading>Sem resultado não é o fim da jornada</SectionHeading>
                <Body>
                  Dois cenários de empty state foram desenhados separadamente
                  porque têm causas diferentes e merecem respostas diferentes.
                  Um erro de digitação pede uma sugestão de correção — o
                  sistema mostra o que provavelmente quis dizer. Uma busca sem
                  resultado no perfil atual pede uma oferta de ampliação —
                  o sistema sugere buscar na base geral antes de encaminhar
                  para o suporte humano.
                </Body>
              </div>

              {/* [imagem: empty-states] */}
              <CaseBeforeAfter
                imageBefore="/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-empty-states-sugestao.png"
                altBefore="Empty state com erro de digitação e sugestão de correção"
                captionBefore="Erro de digitação — sistema sugere correção"
                imageAfter="/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-empty-states-sugestao-filtro.png"
                altAfter="Empty state sem resultado no perfil com sugestão de ampliar"
                captionAfter="Sem resultado no perfil — sugestão de ampliar para base geral"
                accentBg={ACCENT_BG}
                accentText={ACCENT_TEXT}
              />
            </section>

            <Divider />

            {/* ── Resultado ─────────────────────────────── */}
            <section className="space-y-6">
              <Eyebrow>Resultado</Eyebrow>
              <SectionHeading>Uma central que entende quem está perguntando</SectionHeading>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { stat: '3', label: 'Perfis com navegação e conteúdo independentes' },
                  { stat: '2', label: 'Empty states distintos — causa diferente, resposta diferente' },
                  { stat: '0', label: 'Becos sem saída — toda tela tem próximo passo' },
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
