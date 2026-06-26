import type { Metadata } from 'next';
import Image from 'next/image';
import { routing } from '@/i18n/routing';
import { HorizontalScroll } from '@/components/case/HorizontalScroll';
import { BeforeAfterSlider } from '@/components/case/BeforeAfterSlider';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en'
      ? 'Sellbie — Campaign Core Redesign · Marcelle Rocha'
      : 'Sellbie Redesign — Marcelle Rocha',
    description: locale === 'en'
      ? "Campaign core redesign: how we unified three navigation patterns and redesigned the sending flow, reducing abandonment in Sellbie's main module."
      : 'Redesign do core de campanhas: como unificamos três padrões de navegação e redesenhamos o fluxo de criação de envios da Sellbie.',
  };
}

const ACCENT_BG   = 'var(--color-project-sellbie-redesign-bg)';
const ACCENT_TEXT = 'var(--color-project-sellbie-redesign-text)';

// ── Panel layout helpers ──────────────────────────────────────────────────────

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-screen h-screen flex-shrink-0 overflow-hidden flex gap-8 ${className}`}>
      {children}
    </div>
  );
}

function TextCol({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[360px] shrink-0 flex flex-col justify-center gap-5 pl-20 pr-8 pt-20 pb-10">
      {children}
    </div>
  );
}

// flex-col so children use flex-1 to fill height reliably (avoids h-full chain issues)
function VisualCol({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`flex-1 flex flex-col pt-14 pb-6 pr-10 overflow-hidden${center ? ' items-center justify-center' : ''}`}>
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="type-caption text-accent-magenta">{children}</p>;
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="type-headline text-fg">{children}</h2>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="type-body text-fg-muted">{children}</p>;
}

// ── Image helpers — no zoom, no lightbox ─────────────────────────────────────
// All use flex-1 min-h-0 so they fill VisualCol (flex-col) height.
// max-h-full max-w-full w-auto h-auto constrains image to container, preserves ratio.

function PanelImg({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="flex-1 min-h-0 flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          quality={92}
          sizes="(max-width: 1440px) 70vw, 1000px"
          className="max-h-full max-w-full w-auto h-auto block"
        />
      </div>
      {caption && (
        <figcaption className="shrink-0 pt-3 type-body-xs text-fg-subtle text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Full-panel image — container matches VisualCol effective area (~1000px wide, pt-14 pb-6)
// so images render at the same size as in text+image panels
function ImagePanel({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <Panel className="justify-center">
      <div className="w-full max-w-[1000px] mx-10 flex flex-col pt-14 pb-6 overflow-hidden">
        <PanelImg src={src} alt={alt} caption={caption} />
      </div>
    </Panel>
  );
}


// ── Page ─────────────────────────────────────────────────────────────────────

export default async function SellbieRedesignPage({ params }: Props) {
  const { locale } = await params;
  const en = locale === 'en';

  const sidebar = en
    ? [
        { label: 'Company',      content: 'Sellbie' },
        { label: 'Platform',     content: 'B2B · AI-powered multichannel marketing' },
        { label: 'Methods',      content: 'Discovery · User interviews · Competitive benchmarking' },
        { label: 'Deliverables', content: 'Campaign flow redesign · Multichannel flow evolution' },
      ]
    : [
        { label: 'Empresa',    content: 'Sellbie' },
        { label: 'Plataforma', content: 'B2B · Marketing multicanal com IA' },
        { label: 'Métodos',    content: 'Discovery · Entrevistas com usuários · Benchmarking competitivo' },
        { label: 'Entregas',   content: 'Redesign do fluxo de campanhas · Evolução dos fluxos multicanal' },
      ];

  const tags = en
    ? ['Product Design', 'UX Research', 'Multichannel', 'AI & Automation', 'Information Architecture']
    : ['Product Design', 'UX Research', 'Multicanal', 'IA & Automação', 'Arquitetura de Info'];

  return (
    <HorizontalScroll backLabel={en ? 'Back' : 'Voltar'}>

      {/* 00 — Intro */}
      <Panel>
        {/* Text takes 2/3 of panel */}
        <div className="flex-[2] flex flex-col justify-center gap-5 pl-20 pr-16 pt-20 pb-10">
          <Eyebrow>Sellbie · 2024</Eyebrow>
          <h1 className="type-display-lg text-fg">
            {en ? <>Campaign core<br />redesign</> : <>Redesign do core<br />de campanhas</>}
          </h1>
          <p className="type-body text-fg-muted">
            {en
              ? "How we unified three incompatible navigation patterns and redesigned the campaign sending flow, reducing abandonment in the platform's main module."
              : 'Como unificamos três padrões de navegação incompatíveis e redesenhamos o fluxo de criação de envios, reduzindo o abandono no módulo principal da plataforma.'}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(tag => (
              <span key={tag} className="type-caption rounded-full border border-border px-3 py-1 leading-none text-fg-subtle">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card takes 1/3 of panel */}
        <div className="flex-1 flex flex-col items-center justify-center pt-14 pb-6 pr-10 overflow-hidden">
          <div className="rounded-[16px] border border-border overflow-hidden divide-y divide-border w-[280px]">
            {sidebar.map(({ label, content }) => (
              <div key={label} className="px-5 py-4">
                <p className="type-caption text-accent-magenta mb-1">{label}</p>
                <p className="type-body-xs text-fg-muted leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* 01 — Diagnóstico */}
      <Panel>
        <TextCol>
          <Eyebrow>{en ? '01 · Diagnosis' : '01 · Diagnóstico'}</Eyebrow>
          <Heading>{en ? 'Inconsistency was everywhere' : 'A inconsistência estava por toda parte'}</Heading>
          <Body>
            {en
              ? 'Sellbie grew too fast. Each squad added its own navigation logic — and none talked to the others. The audit revealed three incompatible patterns coexisting in the same product, with no clear criterion or hierarchy.'
              : 'A Sellbie cresceu rápido demais. Cada squad adicionou sua própria lógica de navegação — e nenhuma conversava com as outras. A auditoria revelou três padrões incompatíveis coexistindo no mesmo produto, sem critério ou hierarquia clara.'}
          </Body>
        </TextCol>
        <VisualCol>
          <PanelImg src="/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-1.png" alt={en ? 'Top navigation pattern' : 'Padrão de navegação superior'} />
        </VisualCol>
      </Panel>
      <ImagePanel src="/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-2.png" alt={en ? 'Side navigation pattern' : 'Padrão de navegação lateral'} />
      <ImagePanel src="/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-3.png" alt={en ? 'Third coexisting pattern' : 'Terceiro padrão coexistindo'} caption={en ? 'Three navigation patterns coexisting without criterion or hierarchy' : 'Três padrões de navegação coexistindo sem critério ou hierarquia'} />

      {/* 02 — Pesquisa */}
      <Panel>
        <TextCol>
          <Eyebrow>{en ? '02 · Research' : '02 · Pesquisa'}</Eyebrow>
          <Heading>{en ? 'Before redesigning, we needed to listen' : 'Antes de redesenhar, precisávamos ouvir'}</Heading>
          <Body>
            {en
              ? "We conducted 12 interviews with active users across three profiles: marketing managers, campaign operators and administrators. The clusters revealed an unexpected pattern — the biggest abandonment point wasn't navigation, but campaign sending creation."
              : 'Realizamos 12 entrevistas com usuários ativos em três perfis: gestores de marketing, operadores de campanha e administradores. Os clusters revelaram um padrão inesperado — o maior ponto de abandono não era a navegação, mas a criação de envios.'}
          </Body>
        </TextCol>
        <VisualCol>
          <PanelImg src="/images/cases/sellbie/redesign/sellbie-redesign-board-entrevistas.png" alt={en ? 'Interview clustering board' : 'Board de clusterização das entrevistas'} />
        </VisualCol>
      </Panel>
      <ImagePanel src="/images/cases/sellbie/redesign/sellbie-redesign-board-aprendizados.png" alt={en ? 'Research learnings board' : 'Board de aprendizados da pesquisa'} caption={en ? 'Interview clustering and research learnings' : 'Clusterização e aprendizados da pesquisa'} />

      {/* 03 — Diagnóstico focado */}
      <Panel>
        <TextCol>
          <Eyebrow>{en ? '03 · Focused diagnosis' : '03 · Diagnóstico focado'}</Eyebrow>
          <Heading>{en ? 'The campaign listing was the most visible symptom' : 'A listagem de campanhas era o sintoma mais visível'}</Heading>
          <Body>
            {en
              ? "The fixed table doesn't scale for those managing dozens of active campaigns. No alternative view, no quick context, no clear hierarchy — users wasted time searching before even creating. The switch to cards with an alternate view was validated with six users in two days of testing."
              : 'A tabela fixa não escala para quem gerencia dezenas de campanhas ativas. Sem visualização alternativa, sem contexto rápido, sem hierarquia clara — o usuário perdia tempo procurando antes mesmo de criar. A mudança para cards com visualização alternável foi validada com seis usuários em dois dias de teste.'}
          </Body>
        </TextCol>
        <VisualCol>
          <BeforeAfterSlider
            before={{
              src: '/images/cases/sellbie/redesign/sellbie-redesign-campanhas-antes.png',
              alt: en ? 'Campaign listing before — fixed table' : 'Listagem antes — tabela fixa',
              label: en ? 'Before' : 'Antes',
            }}
            after={{
              src: '/images/cases/sellbie/redesign/sellbie-redesign-campanhas-cards-depois.png',
              alt: en ? 'New card listing with alternate view' : 'Nova listagem em cards',
              label: en ? 'After' : 'Depois',
            }}
            caption={en ? 'Fixed table → cards with alternate view' : 'Tabela fixa → cards com visualização alternável'}
          />
        </VisualCol>
      </Panel>

      {/* 04 — Decisão de design */}
      <Panel>
        <TextCol>
          <Eyebrow>{en ? '04 · The design decision' : '04 · A decisão de design'}</Eyebrow>
          <Heading>{en ? 'The decision that changed the flow' : 'A decisão que mudou o fluxo'}</Heading>
          <Body>
            {en
              ? 'All the research pointed to the same problem: the user lost reference of the campaign when creating a send. Four separate pages, zero context. The solution was to bring the send creation into the campaign — in a contextual drawer that keeps the product visible in the background.'
              : 'Toda a pesquisa apontava para o mesmo problema: o usuário perdia a referência da campanha ao criar um envio. Quatro páginas separadas, zero contexto. A solução foi trazer o envio para dentro da campanha — em um drawer contextual que mantém o produto visível ao fundo.'}
          </Body>
        </TextCol>
        <VisualCol>
          <PanelImg
            src="/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio.png"
            alt={en ? 'New contextual drawer with campaign visible' : 'Novo drawer contextual com campanha visível'}
            caption={en ? 'The core redesign decision — creating the send in the campaign context.' : 'A decisão central do redesign — criar o envio no contexto da campanha.'}
          />
        </VisualCol>
      </Panel>

      {/* 05 — Estado anterior */}
      <Panel>
        <TextCol>
          <Eyebrow>{en ? '05 · Previous state' : '05 · Estado anterior'}</Eyebrow>
          <Heading>{en ? 'What was wrong in the old flow' : 'O que estava errado no fluxo antigo'}</Heading>
          <Body>
            {en
              ? 'The old flow dispersed the user across four independent pages. At the base selection stage — the most critical — there was no visual reference to the campaign. Those who got there no longer knew exactly what they were sending.'
              : 'O fluxo antigo dispersava o usuário por quatro páginas independentes. Na etapa de seleção de base — a mais crítica — não havia nenhuma referência visual da campanha. Quem chegava ali não sabia mais exatamente o que estava disparando.'}
          </Body>
        </TextCol>
        <VisualCol>
          <PanelImg src="/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-1.png" alt={en ? 'Old flow — separate page' : 'Fluxo antigo — página separada'} />
        </VisualCol>
      </Panel>
      <ImagePanel src="/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-2.png" alt={en ? 'Old flow step 2' : 'Etapa 2 do fluxo antigo'} />
      <ImagePanel src="/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-3.png" alt={en ? 'Step 3 — dense base' : 'Etapa 3 — base densa'} caption={en ? 'Old flow — four separate pages, zero campaign context' : 'Fluxo antigo — quatro páginas separadas, zero contexto da campanha'} />

      {/* 06 — O redesign */}
      <Panel>
        <TextCol>
          <Eyebrow>{en ? '06 · The redesign' : '06 · O redesign'}</Eyebrow>
          <Heading>{en ? 'The drawer condenses what were previously four pages' : 'O drawer condensa o que antes eram quatro páginas'}</Heading>
          <Body>
            {en
              ? 'Each step of the email drawer was designed to keep the user oriented. Channel, content, base and configuration — all in linear sequence, without losing sight of the campaign visible in the background.'
              : 'Cada etapa do drawer de e-mail foi desenhada para manter o usuário orientado. O canal, o conteúdo, a base e a configuração — tudo em sequência linear, sem perder o contexto da campanha que está visível ao fundo.'}
          </Body>
        </TextCol>
        <VisualCol>
          <PanelImg
            src="/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-1.png"
            alt={en ? 'Email drawer steps' : 'Etapas do drawer de e-mail'}
            caption={en ? 'Drawer steps — Email' : 'Etapas do drawer — E-mail'}
          />
        </VisualCol>
      </Panel>

      {/* 07 — Revisão e aprovação */}
      <Panel>
        <TextCol>
          <Eyebrow>{en ? '07 · Review and approval' : '07 · Revisão e aprovação'}</Eyebrow>
          <Heading>{en ? 'The two steps that close the cycle' : 'As duas etapas que fecham o ciclo'}</Heading>
          <Body>
            {en
              ? 'The summary consolidates everything on one screen before sending — allowing inline editing without going back to previous steps. Approval, when needed, formalizes the review and transfers responsibility to the authorized party.'
              : 'O resumo consolida tudo em uma tela antes do disparo — permitindo edição inline sem voltar às etapas anteriores. A aprovação, quando necessária, formaliza a revisão e transfere a responsabilidade para quem tem autorização.'}
          </Body>
        </TextCol>
        <VisualCol>
          <PanelImg src="/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-resumo.png" alt={en ? 'Consolidated summary' : 'Resumo consolidado'} />
        </VisualCol>
      </Panel>
      <ImagePanel src="/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-aprovacao.png" alt={en ? 'Approval step' : 'Etapa de aprovação'} caption={en ? 'Summary and approval — the two steps that close the creation cycle' : 'Resumo e aprovação — as duas etapas que fecham o ciclo de criação'} />

      {/* 08 — Resultado */}
      <Panel className="flex-col justify-center gap-8 pl-20 pr-16 py-14">
        {/* Heading */}
        <div>
          <Eyebrow>{en ? '08 · Outcome' : '08 · Resultado'}</Eyebrow>
          <h2 className="type-display-lg text-fg mt-1">
            {en ? 'Results' : 'Resultados'}
          </h2>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-3xl">
          {[
            {
              stat: '−43%',
              label: { pt: 'Taxa de abandono', en: 'Abandonment rate' },
              desc:  { pt: 'Na criação de envios após o redesign do fluxo', en: 'In send creation after the flow redesign' },
            },
            {
              stat: '2×',
              label: { pt: 'Campanhas por sessão', en: 'Campaigns per session' },
              desc:  { pt: 'Mais campanhas criadas por sessão de uso', en: 'More campaigns created per session' },
            },
            {
              stat: '4 → 1',
              label: { pt: 'Páginas no fluxo', en: 'Pages in the flow' },
              desc:  { pt: 'Quatro páginas condensadas em um drawer contextual', en: 'Four pages condensed into one contextual drawer' },
            },
          ].map(({ stat, label, desc }) => (
            <div key={stat} className="rounded-[16px] p-6 flex flex-col gap-2" style={{ backgroundColor: ACCENT_BG }}>
              <p className="type-headline" style={{ color: ACCENT_TEXT }}>{stat}</p>
              <p className="type-body-sm font-semibold" style={{ color: ACCENT_TEXT }}>{en ? label.en : label.pt}</p>
              <p className="type-body-xs opacity-60" style={{ color: ACCENT_TEXT }}>{en ? desc.en : desc.pt}</p>
            </div>
          ))}
        </div>

        {/* Qualitative cards */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
          <div className="rounded-[16px] p-6 flex flex-col gap-3" style={{ backgroundColor: `color-mix(in srgb, ${ACCENT_BG} 15%, transparent)`, border: `1px solid color-mix(in srgb, ${ACCENT_BG} 30%, transparent)` }}>
            <p className="type-body-sm font-semibold" style={{ color: ACCENT_TEXT }}>{en ? 'Learnings' : 'Aprendizados'}</p>
            <p className="type-body-sm text-fg-muted">
              {en
                ? 'Redesigning a critical product without losing user productivity requires incremental validation. Quick tests with real users are worth more than weeks of specification — context clarity matters more than feature quantity.'
                : 'Redesenhar um produto crítico sem perder produtividade exige validação incremental. Testes rápidos com usuários reais valem mais do que semanas de especificação — clareza de contexto é mais importante do que quantidade de recursos.'}
            </p>
          </div>
          <div className="rounded-[16px] p-6 flex flex-col gap-3 bg-fg/5 border border-border">
            <p className="type-body-sm font-semibold text-fg">{en ? 'Qualitative Impact' : 'Impacto Qualitativo'}</p>
            <p className="type-body-sm text-fg-muted">
              {en
                ? 'The support team reported a significant drop in campaign-flow tickets. Managers began relying on the card listing to track ongoing campaigns, reducing dependence on manual reports.'
                : 'O time de suporte relatou queda significativa em tickets do fluxo de campanhas. Gestores passaram a confiar na listagem em cards para acompanhar campanhas ativas, reduzindo dependência de relatórios manuais.'}
            </p>
          </div>
        </div>
      </Panel>

    </HorizontalScroll>
  );
}
