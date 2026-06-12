import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { CaseImageFrame } from '@/components/case/CaseImageFrame';
import { CaseCarousel } from '@/components/case/CaseCarousel';
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
    title: locale === 'en' ? 'Jovens Gênios — Help Center · Marcelle Rocha' : 'Jovens Gênios — Central de Ajuda · Marcelle Rocha',
    description: locale === 'en'
      ? 'Design of the Jovens Gênios help center — profile navigation, contextualized search and empty states that keep users on track.'
      : 'Design da central de ajuda do Jovens Gênios — navegação por perfil, busca contextualizada e empty states que mantêm o usuário no caminho certo.',
    openGraph: {
      title: locale === 'en' ? 'Jovens Gênios — Help Center' : 'Jovens Gênios — Central de Ajuda',
      description: locale === 'en' ? 'Help center with three profiles, filtered search and smart empty states.' : 'Central de ajuda com três perfis, busca filtrada e empty states inteligentes.',
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

export default async function JgCentralAjudaPage({ params }: Props) {
  const { locale } = await params;
  const en = locale === 'en';
  const { prev, next } = getCaseNav('jg-central-ajuda');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'jg-central-ajuda.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const sidebar = en
    ? [
        { label: 'Company',      content: 'Jovens Gênios' },
        { label: 'Platform',     content: 'EdTech · B2C · B2B' },
        { label: 'Methods',      content: 'Information Architecture · Benchmarking · Profile personalization' },
        { label: 'Deliverables', content: 'Profile navigation · Filtered search · Empty states · Handoff' },
      ]
    : [
        { label: 'Empresa',   content: 'Jovens Gênios' },
        { label: 'Plataforma', content: 'EdTech · B2C · B2B' },
        { label: 'Métodos',   content: 'Arquitetura de Informação · Benchmarking · Personalização por perfil' },
        { label: 'Entregas',  content: 'Navegação por perfil · Busca filtrada · Empty states · Handoff' },
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
            {en ? <>Help<br />center</> : <>Central<br />de ajuda</>}
          </h1>

          <p className="type-body-lg text-fg-muted max-w-2xl">
            {en
              ? 'Design of the Jovens Gênios help center for three distinct profiles: Educators, Explorers and Guardians, with contextualized navigation, profile-filtered search and empty states that keep users oriented even when there\'s no result.'
              : 'Design da central de ajuda do Jovens Gênios para três perfis distintos: Educadores, Exploradores e Responsáveis, com navegação contextualizada, busca filtrada por perfil e empty states que mantêm o usuário orientado mesmo quando não há resultado.'}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {(en
              ? ['Information Architecture', 'User Research', 'Personalization']
              : ['Arquitetura de Informação', 'Pesquisa com usuários', 'Personalização']
            ).map(tag => (
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
              <Eyebrow>{en ? '01 · Entry' : '01 · Entrada'}</Eyebrow>
              <SectionHeading>{en ? 'The first question the center answers is "who are you"' : 'A primeira pergunta que a central responde é "quem é você"'}</SectionHeading>
              <Body>
                {en
                  ? 'Jovens Gênios has three user types with completely different needs — an educator looks for how to set up a class; an explorer wants to know how to access an activity; a guardian needs to understand the subscription. A generic help center would force each to mentally filter what\'s relevant to them. The solution was to make profile selection the first gesture — before any search or category.'
                  : 'O Jovens Gênios tem três tipos de usuário com necessidades completamente diferentes — um educador procura como configurar uma turma; um explorador quer saber como acessar uma atividade; um responsável precisa entender a assinatura. Uma central de ajuda genérica obrigaria cada um a filtrar mentalmente o que é relevante para si. A solução foi tornar a escolha de perfil o primeiro gesto — antes de qualquer busca ou categoria.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-pagina-inicial.png"
              alt={en ? 'Help center home page with three profile entries' : 'Página inicial da central de ajuda com três entradas por perfil'}
              caption={en ? 'Three profile entries right on the home page.' : 'Três entradas por perfil logo na página inicial.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '02 · Categories' : '02 · Categorias'}</Eyebrow>
              <SectionHeading>{en ? 'Each profile with visual identity and pre-filtered content' : 'Cada perfil com identidade visual e conteúdo pré-filtrado'}</SectionHeading>
              <Body>
                {en
                  ? 'When choosing a profile, the user doesn\'t see a generic list of categories — they see categories with pre-applied filter and visual identity that reinforces that content is for them. Educators see class and curriculum management categories; Explorers, activities and progress; Guardians, subscription and parental control. The same category system, three different readings.'
                  : 'Ao escolher o perfil, o usuário não vê uma lista genérica de categorias — vê categorias com filtro pré-aplicado e identidade visual que reforça que aquele conteúdo é para ele. Educadores veem categorias de gestão de turma e currículo; Exploradores, de atividades e progresso; Responsáveis, de assinatura e controle parental. O mesmo sistema de categorias, três leituras diferentes.'}
              </Body>
            </div>
            <CaseCarousel
              images={[
                { src: '/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-educadores.png', alt: en ? 'Educators category — pre-applied filter and own visual identity' : 'Categoria Educadores — filtro pré-aplicado e identidade visual própria' },
                { src: '/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-exploradores.png', alt: en ? 'Explorers category — content filtered for the profile' : 'Categoria Exploradores — conteúdo filtrado para o perfil' },
                { src: '/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-responsaveis.png', alt: en ? 'Guardians category — content filtered for the profile' : 'Categoria Responsáveis — conteúdo filtrado para o perfil' },
              ]}
              caption={en ? 'Educators, Explorers and Guardians — same category system, three different readings' : 'Educadores, Exploradores e Responsáveis — mesmo sistema de categorias, três leituras diferentes'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '03 · Reading' : '03 · Leitura'}</Eyebrow>
              <SectionHeading>{en ? 'Reading without dead ends' : 'Leitura sem beco sem saída'}</SectionHeading>
              <Body>
                {en
                  ? 'The article screen was designed to keep the user oriented during reading and to never leave them without a next step. The side navigation keeps the category structure visible while content scrolls; contextual support remains accessible without interrupting reading. Those who reach the end of the article without resolution see clear actions — not an empty screen.'
                  : 'A tela de artigo foi desenhada para manter o usuário orientado durante a leitura e para nunca deixá-lo sem próximo passo. A navegação lateral mantém a estrutura da categoria visível enquanto o conteúdo rola; o suporte contextual fica acessível sem interromper a leitura. Quem chega ao fim do artigo sem resolver vê ações claras — não uma tela vazia.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-artigo-nav-lateral.png"
              alt={en ? 'Article with side navigation and always-accessible support' : 'Artigo com navegação lateral e suporte sempre acessível'}
              caption={en ? 'Article with side navigation and always-accessible support.' : 'Artigo com navegação lateral e suporte sempre acessível.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '04 · Search' : '04 · Busca'}</Eyebrow>
              <SectionHeading>{en ? 'Results that already know who they\'re for' : 'Resultados que já sabem para quem são'}</SectionHeading>
              <Body>
                {en
                  ? 'The search inherits the profile selected at entry — those searching as an educator see results filtered for educators, with explicit context of which category each article belongs to. The user doesn\'t need to mentally re-filter what\'s relevant. The profile chosen at the start of the journey persists and works in favor of each subsequent query.'
                  : 'A busca herda o perfil selecionado na entrada — quem busca como educador vê resultados filtrados para educadores, com contexto explícito de qual categoria cada artigo pertence. O usuário não precisa re-filtrar mentalmente o que é relevante. O perfil escolhido no início da jornada persiste e trabalha a favor de cada consulta subsequente.'}
              </Body>
            </div>
            <CaseCarousel
              images={[
                { src: '/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-resultados.png', alt: en ? 'Profile-filtered search with contextualized results' : 'Busca filtrada por perfil com resultados contextualizados' },
                { src: '/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-empty-states-sugestao.png', alt: en ? 'Empty state with typo and correction suggestion' : 'Empty state com erro de digitação e sugestão de correção' },
                { src: '/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-empty-states-sugestao-filtro.png', alt: en ? 'Empty state with no result in profile with expansion suggestion' : 'Empty state sem resultado no perfil com sugestão de ampliar' },
              ]}
              caption={en ? 'Profile-filtered results, typo and no result — all search states' : 'Resultados filtrados por perfil, erro de digitação e sem resultado — todos os estados da busca'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '05 · Empty states' : '05 · Empty states'}</Eyebrow>
              <SectionHeading>{en ? 'No result isn\'t the end of the journey' : 'Sem resultado não é o fim da jornada'}</SectionHeading>
              <Body>
                {en
                  ? 'Two empty state scenarios were designed separately because they have different causes and deserve different responses. A typo asks for a correction suggestion — the system shows what was probably meant. A search with no result in the current profile asks for an expansion offer — the system suggests searching the general base before routing to human support.'
                  : 'Dois cenários de empty state foram desenhados separadamente porque têm causas diferentes e merecem respostas diferentes. Um erro de digitação pede uma sugestão de correção — o sistema mostra o que provavelmente quis dizer. Uma busca sem resultado no perfil atual pede uma oferta de ampliação — o sistema sugere buscar na base geral antes de encaminhar para o suporte humano.'}
              </Body>
            </div>
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>{en ? 'Outcome' : 'Resultado'}</Eyebrow>
            <SectionHeading>{en ? 'A center that understands who\'s asking' : 'Uma central que entende quem está perguntando'}</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '3', label: { pt: 'Perfis com navegação e conteúdo independentes',               en: 'Profiles with independent navigation and content' } },
                { stat: '2', label: { pt: 'Empty states distintos — causa diferente, resposta diferente', en: 'Distinct empty states — different cause, different response' } },
                { stat: '0', label: { pt: 'Becos sem saída — toda tela tem próximo passo',               en: 'Dead ends — every screen has a next step' } },
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
