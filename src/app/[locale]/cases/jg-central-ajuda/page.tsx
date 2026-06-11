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
    title: 'Jovens Gênios — Central de Ajuda · Marcelle Rocha',
    description:
      'Design da central de ajuda do Jovens Gênios — navegação por perfil, busca contextualizada e empty states que mantêm o usuário no caminho certo.',
    openGraph: {
      title: 'Jovens Gênios — Central de Ajuda',
      description: 'Central de ajuda com três perfis, busca filtrada e empty states inteligentes.',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'article',
    },
  };
}

const ACCENT_BG   = 'var(--color-project-jg-central-ajuda-bg)';
const ACCENT_TEXT = 'var(--color-project-jg-central-ajuda-text)';

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
function CaseImgPair({ a, b }: { a: { src: string; alt: string; caption?: string }; b: { src: string; alt: string; caption?: string } }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CaseImageFrame src={a.src} alt={a.alt} caption={a.caption} pair />
      <CaseImageFrame src={b.src} alt={b.alt} caption={b.caption} pair />
    </div>
  );
}

const sidebar = [
  { label: 'Empresa', content: 'Jovens Gênios' },
  { label: 'Plataforma', content: 'EdTech · B2C · B2B' },
  { label: 'Métodos', content: 'Arquitetura de Informação · Benchmarking · Personalização por perfil' },
  { label: 'Entregas', content: 'Navegação por perfil · Busca filtrada · Empty states · Handoff' },
];

export default async function JgCentralAjudaPage() {
  const { prev, next } = getCaseNav('jg-central-ajuda');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'jg-central-ajuda.md');
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
            className={buttonVariants({ variant: 'secondary', size: 'xs' }) + ' mb-10'}
          >
            ← Todos os cases
          </Link>

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
              <span key={tag} className="type-caption rounded-full border border-border px-2 py-0.5 leading-none text-fg-subtle">
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
            <CaseImg
              src="/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-pagina-inicial.png"
              alt="Página inicial da central de ajuda com três entradas por perfil"
              caption="Três entradas por perfil logo na página inicial."
            />
          </section>

          <Divider />

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
            <CaseImg
              src="/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-educadores.png"
              alt="Categoria Educadores com filtro pré-aplicado e identidade visual própria"
              caption="Categoria Educadores — filtro pré-aplicado e identidade visual própria"
            />
            <CaseImgPair
              a={{ src: '/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-exploradores.png', alt: 'Categoria Exploradores', caption: 'Exploradores' }}
              b={{ src: '/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-responsaveis.png', alt: 'Categoria Responsáveis', caption: 'Responsáveis' }}
            />
          </section>

          <Divider />

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
            <CaseImg
              src="/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-artigo-nav-lateral.png"
              alt="Artigo com navegação lateral e suporte sempre acessível"
              caption="Artigo com navegação lateral e suporte sempre acessível."
            />
          </section>

          <Divider />

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
            <CaseImg
              src="/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-resultados.png"
              alt="Busca filtrada por perfil com resultados contextualizados"
              caption="Busca filtrada por perfil — resultados contextualizados."
            />
          </section>

          <Divider />

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
            <CaseImgPair
              a={{ src: '/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-empty-states-sugestao.png', alt: 'Empty state com erro de digitação e sugestão de correção', caption: 'Erro de digitação — sistema sugere correção' }}
              b={{ src: '/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-empty-states-sugestao-filtro.png', alt: 'Empty state sem resultado no perfil com sugestão de ampliar', caption: 'Sem resultado no perfil — sugestão de ampliar para base geral' }}
            />
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>Resultado</Eyebrow>
            <SectionHeading>Uma central que entende quem está perguntando</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '3', label: 'Perfis com navegação e conteúdo independentes' },
                { stat: '2', label: 'Empty states distintos — causa diferente, resposta diferente' },
                { stat: '0', label: 'Becos sem saída — toda tela tem próximo passo' },
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
