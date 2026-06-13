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
import { CaseCarousel } from '@/components/case/CaseCarousel';
import { CaseBeforeAfter } from '@/components/case/CaseBeforeAfter';
import { buttonVariants } from '@/components/ui/Button';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Sellbie — Campaign Core Redesign · Marcelle Rocha' : 'Sellbie Redesign — Marcelle Rocha',
    description: locale === 'en'
      ? 'Campaign core redesign: how we unified three navigation patterns and redesigned the sending flow, reducing abandonment in Sellbie\'s main module.'
      : 'Redesign do core de campanhas: como unificamos três padrões de navegação e redesenhamos o fluxo de criação de envios da Sellbie.',
    openGraph: {
      title: locale === 'en' ? 'Sellbie — Campaign Core Redesign' : 'Sellbie — Redesign do core de campanhas',
      description: locale === 'en' ? 'Redesign of Sellbie\'s multichannel campaign core.' : 'Redesign do core de campanhas multicanal da Sellbie.',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'article',
    },
  };
}

const ACCENT_BG   = 'var(--color-project-sellbie-redesign-bg)';
const ACCENT_TEXT = 'var(--color-project-sellbie-redesign-text)';

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

export default async function SellbieRedesignPage({ params }: Props) {
  const { locale } = await params;
  const en = locale === 'en';
  const { prev, next } = getCaseNav('sellbie-redesign');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'sellbie-redesign.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const sidebar = en
    ? [
        { label: 'Company',      content: 'Sellbie' },
        { label: 'Platform',     content: 'B2B · AI-powered multichannel marketing' },
        { label: 'Methods',      content: 'Discovery · User interviews · Competitive benchmarking' },
        { label: 'Deliverables', content: 'Campaign flow redesign · Multichannel flow evolution' },
      ]
    : [
        { label: 'Empresa',   content: 'Sellbie' },
        { label: 'Plataforma', content: 'B2B · Marketing multicanal com IA' },
        { label: 'Métodos',   content: 'Discovery · Entrevistas com usuários · Benchmarking competitivo' },
        { label: 'Entregas',  content: 'Redesign do fluxo de campanhas · Evolução dos fluxos multicanal' },
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
            {en ? <>Campaign core<br />redesign</> : <>Redesign do core<br />de campanhas</>}
          </h1>

          <p className="type-body-lg text-fg-muted max-w-2xl">
            {en
              ? 'How we unified three incompatible navigation patterns and redesigned the campaign sending flow, reducing abandonment in the platform\'s main module.'
              : 'Como unificamos três padrões de navegação incompatíveis e redesenhamos o fluxo de criação de envios, reduzindo o abandono no módulo principal da plataforma.'}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {(en
              ? ['Product Design', 'UX Research', 'Multichannel', 'AI & Automation', 'Information Architecture']
              : ['Product Design', 'UX Research', 'Multicanal', 'IA & Automação', 'Arquitetura de Info']
            ).map(tag => (
              <span key={tag} className="type-caption rounded-full px-2 py-0.5 leading-none text-fg-subtle">
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
              <Eyebrow>{en ? '01 · Diagnosis' : '01 · Diagnóstico'}</Eyebrow>
              <SectionHeading>{en ? 'Inconsistency was everywhere' : 'A inconsistência estava por toda parte'}</SectionHeading>
              <Body>
                {en
                  ? 'Sellbie grew too fast. Each squad added its own navigation logic — and none talked to the others. The audit revealed three incompatible patterns coexisting in the same product, with no clear criterion or hierarchy.'
                  : 'A Sellbie cresceu rápido demais. Cada squad adicionou sua própria lógica de navegação — e nenhuma conversava com as outras. A auditoria revelou três padrões incompatíveis coexistindo no mesmo produto, sem critério ou hierarquia clara.'}
              </Body>
            </div>
            <CaseCarousel
              images={[
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-1.png', alt: en ? 'Top navigation pattern' : 'Padrão de navegação superior' },
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-2.png', alt: en ? 'Side navigation pattern' : 'Padrão de navegação lateral' },
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-3.png', alt: en ? 'Third coexisting navigation pattern' : 'Terceiro padrão de navegação coexistindo' },
              ]}
              caption={en ? 'Three navigation patterns coexisting without criterion or hierarchy' : 'Três padrões de navegação coexistindo sem critério ou hierarquia'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '02 · Research' : '02 · Pesquisa'}</Eyebrow>
              <SectionHeading>{en ? 'Before redesigning, we needed to listen' : 'Antes de redesenhar, precisávamos ouvir'}</SectionHeading>
              <Body>
                {en
                  ? 'We conducted 12 interviews with active users across three profiles: marketing managers, campaign operators and administrators. The clusters revealed an unexpected pattern — the biggest abandonment point wasn\'t navigation, but campaign sending creation.'
                  : 'Realizamos 12 entrevistas com usuários ativos em três perfis: gestores de marketing, operadores de campanha e administradores. Os clusters revelaram um padrão inesperado — o maior ponto de abandono não era a navegação, mas a criação de envios.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/redesign/sellbie-redesign-board-entrevistas.png"
              alt={en ? 'Interview clustering board' : 'Board de clusterização das entrevistas'}
              caption={en ? 'Interview clustering — patterns that defined the focus' : 'Clusterização das entrevistas — padrões que definiram o foco'}
            />
            <CaseImg
              src="/images/cases/sellbie/redesign/sellbie-redesign-board-aprendizados.png"
              alt={en ? 'Research learnings board' : 'Board de aprendizados da pesquisa'}
              caption={en ? 'Research learnings — synthesis that guided the redesign' : 'Aprendizados da pesquisa — síntese que orientou o redesign'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '03 · Focused diagnosis' : '03 · Diagnóstico focado'}</Eyebrow>
              <SectionHeading>{en ? 'The campaign listing was the most visible symptom' : 'A listagem de campanhas era o sintoma mais visível'}</SectionHeading>
              <Body>
                {en
                  ? 'The fixed table doesn\'t scale for those managing dozens of active campaigns. No alternative view, no quick context, no clear hierarchy — users wasted time searching before even creating. The switch to cards with an alternate view was validated with six users in two days of testing.'
                  : 'A tabela fixa não escala para quem gerencia dezenas de campanhas ativas. Sem visualização alternativa, sem contexto rápido, sem hierarquia clara — o usuário perdia tempo procurando antes mesmo de criar. A mudança para cards com visualização alternável foi validada com seis usuários em dois dias de teste.'}
              </Body>
            </div>
            <CaseBeforeAfter
              imageBefore="/images/cases/sellbie/redesign/sellbie-redesign-campanhas-antes.png"
              imageAfter="/images/cases/sellbie/redesign/sellbie-redesign-campanhas-cards-depois.png"
              altBefore={en ? 'Campaign listing before — fixed table without alternate view' : 'Listagem de campanhas antes — tabela fixa sem visualização alternativa'}
              altAfter={en ? 'New card listing with alternate view' : 'Nova listagem em cards com visualização alternável'}
              captionBefore={en ? 'Fixed table — no alternate view' : 'Tabela fixa — sem visualização alternativa'}
              captionAfter={en ? 'Cards with alternate view' : 'Cards com visualização alternável'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '04 · The design decision' : '04 · A decisão de design'}</Eyebrow>
              <SectionHeading>{en ? 'The decision that changed the flow' : 'A decisão que mudou o fluxo'}</SectionHeading>
              <Body>
                {en
                  ? 'All the research pointed to the same problem: the user lost reference of the campaign when creating a send. Four separate pages, zero context. The solution was to bring the send creation into the campaign — in a contextual drawer that keeps the product visible in the background.'
                  : 'Toda a pesquisa apontava para o mesmo problema: o usuário perdia a referência da campanha ao criar um envio. Quatro páginas separadas, zero contexto. A solução foi trazer o envio para dentro da campanha — em um drawer contextual que mantém o produto visível ao fundo.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio.png"
              alt={en ? 'New contextual drawer with campaign visible' : 'Novo drawer contextual com campanha visível'}
              caption={en ? 'The core redesign decision — creating the send in the campaign context.' : 'A decisão central do redesign — criar o envio no contexto da campanha.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '05 · Previous state' : '05 · Estado anterior'}</Eyebrow>
              <SectionHeading>{en ? 'What was wrong in the old flow' : 'O que estava errado no fluxo antigo'}</SectionHeading>
              <Body>
                {en
                  ? 'The old flow dispersed the user across four independent pages. At the base selection stage — the most critical — there was no visual reference to the campaign. Those who got there no longer knew exactly what they were sending.'
                  : 'O fluxo antigo dispersava o usuário por quatro páginas independentes. Na etapa de seleção de base — a mais crítica — não havia nenhuma referência visual da campanha. Quem chegava ali não sabia mais exatamente o que estava disparando.'}
              </Body>
            </div>
            <CaseCarousel
              images={[
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-1.png', alt: en ? 'Old flow — separate page without campaign context' : 'Fluxo antigo — página separada sem contexto da campanha' },
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-2.png', alt: en ? 'Old flow step 2' : 'Etapa 2 do fluxo antigo' },
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-3.png', alt: en ? 'Step 3 — dense base without consolidated summary' : 'Etapa 3 — base densa sem resumo consolidado' },
              ]}
              caption={en ? 'Old flow — four separate pages, zero campaign context' : 'Fluxo antigo — quatro páginas separadas, zero contexto da campanha'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '06 · The redesign' : '06 · O redesign'}</Eyebrow>
              <SectionHeading>{en ? 'The drawer condenses what were previously four pages' : 'O drawer condensa o que antes eram quatro páginas'}</SectionHeading>
              <Body>
                {en
                  ? 'Each step of the email drawer was designed to keep the user oriented. Channel, content, base and configuration — all in linear sequence, without losing sight of the campaign visible in the background.'
                  : 'Cada etapa do drawer de e-mail foi desenhada para manter o usuário orientado. O canal, o conteúdo, a base e a configuração — tudo em sequência linear, sem perder o contexto da campanha que está visível ao fundo.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-1.png"
              alt={en ? 'Email drawer steps' : 'Etapas do drawer de e-mail'}
              caption={en ? 'Drawer steps — Email' : 'Etapas do drawer — E-mail'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '07 · Review and approval' : '07 · Revisão e aprovação'}</Eyebrow>
              <SectionHeading>{en ? 'The two steps that close the cycle' : 'As duas etapas que fecham o ciclo'}</SectionHeading>
              <Body>
                {en
                  ? 'The summary consolidates everything on one screen before sending — allowing inline editing without going back to previous steps. Approval, when needed, formalizes the review and transfers responsibility to the authorized party.'
                  : 'O resumo consolida tudo em uma tela antes do disparo — permitindo edição inline sem voltar às etapas anteriores. A aprovação, quando necessária, formaliza a revisão e transfere a responsabilidade para quem tem autorização.'}
              </Body>
            </div>
            <CaseCarousel
              images={[
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-resumo.png', alt: en ? 'Consolidated summary — full review with inline editing' : 'Resumo consolidado — revisão completa com edição inline' },
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-aprovacao.png', alt: en ? 'Approval — formalizes review before sending' : 'Aprovação — formaliza a revisão antes do disparo' },
              ]}
              caption={en ? 'Summary and approval — the two steps that close the creation cycle' : 'Resumo e aprovação — as duas etapas que fecham o ciclo de criação'}
            />
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>{en ? 'Outcome' : 'Resultado'}</Eyebrow>
            <SectionHeading>{en ? 'What changed after the redesign' : 'O que mudou depois do redesign'}</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '−43%', label: { pt: 'Taxa de abandono na criação de envios',    en: 'Abandonment rate in send creation' } },
                { stat: '2×',   label: { pt: 'Mais campanhas criadas por sessão',         en: 'More campaigns created per session' } },
                { stat: '4 → 1', label: { pt: 'Páginas no fluxo de criação',              en: 'Pages in the creation flow' } },
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
