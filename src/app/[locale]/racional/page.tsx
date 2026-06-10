import type { Metadata } from 'next';
import { BackToTop } from '@/components/ui/BackToTop';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

export const metadata: Metadata = {
  title: 'Racional do Projeto — Marcelle Rocha',
  description:
    'Como este portfólio foi concebido e construído como um produto de UX: design system, heurísticas de Nielsen, acessibilidade, dark mode e stack técnica.',
};

/* ── helpers ──────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="type-caption text-accent-magenta mb-3">{children}</p>
  );
}

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="type-display-lg text-fg mb-6">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="type-headline text-fg mb-3">{children}</h3>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="type-body text-fg-muted">{children}</p>;
}

function BodySm({ children }: { children: React.ReactNode }) {
  return <p className="type-body-sm text-fg-muted leading-relaxed">{children}</p>;
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[16px] border border-black/10 dark:border-white/10 p-6 bg-surface-soft ${className}`}>
      {children}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block type-caption text-fg-subtle border border-border rounded-full px-3 py-2 leading-none">
      {children}
    </span>
  );
}

function Divider() {
  return <hr className="border-border my-12" />;
}

/* ── Swatch ───────────────────────────────────────────────── */
function ColorSwatch({ bg, label, value }: { bg: string; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-14 rounded-lg border border-black/10 dark:border-white/10"
        style={{ backgroundColor: bg }}
        aria-hidden="true"
      />
      <p className="type-caption text-fg">{label}</p>
      <p className="type-caption text-fg-subtle font-mono">{value}</p>
    </div>
  );
}

/* ── Color Scale Row ─────────────────────────────────────── */
function ColorScaleRow({
  name,
  steps,
  brandStep,
}: {
  name: string;
  steps: { stop: string; hex: string }[];
  brandStep?: string;
}) {
  return (
    <div className="space-y-2">
      <p className="type-caption text-fg-subtle">{name}</p>
      <div className="flex gap-1">
        {steps.map(({ stop, hex }) => {
          const isBase = stop === brandStep;
          return (
            <div key={stop} className="flex flex-col gap-1 min-w-0 flex-1">
              <div
                className="h-9 rounded border border-black/10 dark:border-white/10"
                style={{ backgroundColor: hex }}
              />
              <p className={`text-[9px] leading-none text-center font-mono ${isBase ? 'text-accent-magenta font-bold' : 'text-fg-subtle'}`}>
                {stop}
              </p>
              <p className={`text-[8px] leading-none text-center font-mono tracking-tight ${isBase ? 'text-accent-magenta' : 'text-fg-subtle'}`}>
                {hex.slice(1)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Heuristic card ───────────────────────────────────────── */
function HeuristicCard({
  num,
  title,
  description,
  example,
}: {
  num: string;
  title: string;
  description: string;
  example: string;
}) {
  return (
    <Card>
      <div className="flex items-start gap-3 mb-4">
        <span
          className="w-7 h-7 rounded-sm bg-block-navy dark:bg-white/10 text-white flex items-center justify-center type-caption shrink-0"
          aria-hidden="true"
        >
          {num}
        </span>
        <h3 className="type-body-strong text-fg leading-snug">{title}</h3>
      </div>
      <p className="type-body-sm text-fg-muted mb-3">{description}</p>
      <p className="type-caption text-accent-magenta border-l-2 border-accent-magenta pl-3">{example}</p>
    </Card>
  );
}

/* ── Tool card ────────────────────────────────────────────── */
function ToolCard({
  name,
  role,
  tags,
}: {
  name: string;
  role: string;
  tags: string[];
}) {
  return (
    <Card className="flex flex-col gap-3">
      <p className="type-body-strong text-fg">{name}</p>
      <p className="type-body-sm text-fg-muted">{role}</p>
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────── */

export default function RacionalPage() {
  return (
    <>
      <ScrollProgress />
      <BackToTop />

      <main id="main-content" className="min-h-screen bg-bg">

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="py-section px-6 bg-bg border-b border-border">
          <div className="max-w-4xl mx-auto">
            <p className="type-caption text-accent-magenta mb-6">Racional do Projeto</p>
            <h1 className="type-display-xl text-fg mb-8" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-1.5px', fontWeight: 340 }}>
              Este portfólio foi tratado<br className="hidden md:block" /> como um produto de UX.
            </h1>
            <p className="type-body-lg text-fg-muted max-w-2xl">
              Cada decisão — de cor, tipografia e hierarquia a acessibilidade e dark mode — foi intencional e embasada. Esta página documenta o racional, o design system e as ferramentas por trás do projeto.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 py-section space-y-0">

          {/* ── 1. Problema e contexto ──────────────────────── */}
          <section aria-labelledby="problema-heading" className="mb-16">
            <SectionLabel>01 — Contexto</SectionLabel>
            <H2 id="problema-heading">O problema a resolver</H2>
            <div className="space-y-4">
              <Body>
                Um portfólio de designer é um produto. Tem usuário, tem objetivo, tem contexto de uso. A maioria dos portfólios falha porque é concebido como vitrine — belo, mas sem narrativa. Este foi construído partindo de uma pergunta diferente: o que o usuário precisa concluir ao final da visita?
              </Body>
              <Body>
                A resposta define tudo: a ordem das seções, a profundidade dos cases, o tom do conteúdo e até o sistema de navegação.
              </Body>
            </div>
          </section>

          {/* ── 2. Usuário ──────────────────────────────────── */}
          <Divider />
          <section aria-labelledby="usuario-heading" className="mb-16">
            <SectionLabel>02 — Pesquisa</SectionLabel>
            <H2 id="usuario-heading">Quem usa e o que busca</H2>
            <Body>
              Três perfis centrais, com jobs-to-be-done distintos:
            </Body>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                {
                  role: 'Recrutador / RH',
                  jtbd: 'Confirmar rapidamente se o perfil tem senioridade e fit com a vaga',
                  need: 'Clareza de trajetória, hierarquia visual, tempo de leitura curto',
                },
                {
                  role: 'Head de Produto / Design',
                  jtbd: 'Avaliar capacidade de raciocínio estratégico e resolução de problemas',
                  need: 'Cases com contexto, processo e resultado. Profundidade.',
                },
                {
                  role: 'Designer / Par',
                  jtbd: 'Calibrar nível, ver escolhas de sistema e consistência de execução',
                  need: 'Design system coerente, atenção a detalhes, dark mode, responsividade',
                },
              ].map(({ role, jtbd, need }) => (
                <Card key={role}>
                  <p className="type-body-strong text-fg mb-3">{role}</p>
                  <p className="type-body-sm text-fg-muted mb-2"><span className="text-fg-subtle">Job-to-be-done:</span> {jtbd}</p>
                  <p className="type-body-sm text-fg-muted"><span className="text-fg-subtle">Necessidade:</span> {need}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 3. Arquitetura de informação ─────────────────── */}
          <Divider />
          <section aria-labelledby="ai-heading" className="mb-16">
            <SectionLabel>03 — Arquitetura de Informação</SectionLabel>
            <H2 id="ai-heading">A ordem das seções não é aleatória</H2>
            <Body>
              A sequência da homepage segue um funil de confiança: apresentação rápida → prova de trabalho → profundidade de trajetória → pensamento escrito → contato. Cada seção qualifica o usuário antes de pedir mais atenção dele.
            </Body>
            <div className="mt-8 space-y-3">
              {[
                { section: 'Hero', why: 'Identidade imediata — quem sou e o que faço em 3 segundos' },
                { section: 'Cases', why: 'Prova de trabalho antes de qualquer texto sobre mim. O portfólio mostra antes de contar.' },
                { section: 'Sobre', why: 'Contexto pessoal e trajetória — só faz sentido depois de ver o trabalho' },
                { section: 'Skills & Trajetória', why: 'Validação técnica e temporal — linhas do tempo criam confiança' },
                { section: 'Artigos', why: 'Sinal de profundidade — quem escreve sobre o campo domina o campo' },
                { section: 'Contato', why: 'CTA final — depois que o usuário já foi convencido' },
              ].map(({ section, why }) => (
                <div key={section} className="flex gap-4 items-start p-4 rounded-lg border border-border">
                  <span className="type-caption text-accent-magenta shrink-0 w-28">{section}</span>
                  <span className="type-body-sm text-fg-muted">{why}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── 4. Design System ─────────────────────────────── */}
          <Divider />
          <section aria-labelledby="ds-heading" className="mb-16">
            <SectionLabel>04 — Design System</SectionLabel>
            <H2 id="ds-heading">Sistema de tokens semânticos</H2>
            <Body>
              O design system usa tokens semânticos — as cores não têm nomes literais, mas papéis. <code className="type-caption bg-surface-soft border border-border px-2 py-1 rounded text-fg">--bg</code>, <code className="type-caption bg-surface-soft border border-border px-2 py-1 rounded text-fg">--fg</code>, <code className="type-caption bg-surface-soft border border-border px-2 py-1 rounded text-fg">--fg-muted</code>. Isso permite que o dark mode seja uma troca de tokens — não de estilos individuais.
            </Body>

            {/* Typography */}
            <div className="mt-10 mb-8">
              <H3>Escala tipográfica</H3>
              <BodySm>
                Tipografia variável com font-weight fluido (320–700). Todos os tamanhos usam Inter com ajustes de letter-spacing e line-height calibrados para leitura em tela. Botões têm classe própria <code className="type-caption bg-surface-soft border border-border px-1 rounded">.type-btn</code> (16px/480) para evitar conflito de especificidade com utilitários Tailwind.
              </BodySm>
              <div className="mt-6 space-y-3 p-6 rounded-[16px] bg-surface-soft border border-border">
                {[
                  { cls: 'type-display-xl', label: 'Display XL — 86px / 340', ex: 'Marcelle' },
                  { cls: 'type-display-lg', label: 'Display LG — 36px / 700', ex: 'Cases' },
                  { cls: 'type-headline',   label: 'Headline — 26px / 540',   ex: 'Redesign do core' },
                  { cls: 'type-body',       label: 'Body — 18px / 320',       ex: 'Trabalho com produtos digitais desde 2012.' },
                  { cls: 'type-body-sm',    label: 'Body SM — 16px / 330',    ex: 'Ver case' },
                  { cls: 'type-caption',    label: 'Caption — 12px / 400 / UPPERCASE', ex: 'UX RESEARCH' },
                ].map(({ cls, label, ex }) => (
                  <div key={cls} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                    <span className="type-caption text-fg-subtle w-56 shrink-0">{label}</span>
                    <span className={`${cls} text-fg`}>{ex}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors — semantic tokens */}
            <div className="mt-10">
              <H3>Tokens semânticos</H3>
              <BodySm>
                As cores têm papéis, não nomes literais. O dark mode é uma troca de tokens — não de estilos individuais.
              </BodySm>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ColorSwatch bg="#fafafa"  label="bg"             value="#fafafa" />
                <ColorSwatch bg="#ececea"  label="surface-soft"   value="#ececea" />
                <ColorSwatch bg="#f4ecd6"  label="block-cream"    value="#f4ecd6" />
                <ColorSwatch bg="#131226"  label="fg / primary"   value="#131226" />
                <ColorSwatch bg="#404040"  label="fg-muted"       value="#404040" />
                <ColorSwatch bg="#666666"  label="fg-subtle"      value="#666666" />
                <ColorSwatch bg="#C8236A"  label="accent-magenta" value="#C8236A" />
                <ColorSwatch bg="#131226"  label="block-navy"     value="#131226" />
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ColorSwatch bg="#121124"  label="bg (dark)"             value="#121124" />
                <ColorSwatch bg="#1a1836"  label="surface-soft (dark)"   value="#1a1836" />
                <ColorSwatch bg="#1e1c31"  label="block-cream (dark)"    value="#1e1c31" />
                <ColorSwatch bg="#ffffff"  label="fg (dark)"             value="#ffffff" />
                <ColorSwatch bg="#e4e4e7"  label="fg-muted (dark)"       value="#e4e4e7" />
                <ColorSwatch bg="#a1a1aa"  label="fg-subtle (dark)"      value="#a1a1aa" />
                <ColorSwatch bg="#C8236A"  label="accent-magenta (dark)" value="#C8236A" />
                <ColorSwatch bg="#261724"  label="block-pink (dark)"     value="#261724" />
              </div>
            </div>

            {/* Colors — full scales */}
            <div className="mt-10">
              <H3>Escalas de cores (50 → 900)</H3>
              <BodySm>
                Cada cor possui escala completa. Convenção: 50–200 = fundos e hover; 300–400 = bordas e ícones; 500–600 = texto WCAG AA sobre branco; 700–900 = corpo e headings. O passo marcado em magenta é a cor base do sistema.
              </BodySm>
              <div className="mt-6 space-y-6 p-6 rounded-[16px] bg-surface-soft border border-border overflow-x-auto">
                <ColorScaleRow
                  name="Magenta — cor de marca primária (base 600)"
                  brandStep="600"
                  steps={[
                    { stop: '50',  hex: '#FEF0F6' },
                    { stop: '100', hex: '#FCD9E8' },
                    { stop: '200', hex: '#F5B2CF' },
                    { stop: '300', hex: '#EC83B0' },
                    { stop: '400', hex: '#E35492' },
                    { stop: '500', hex: '#DB337C' },
                    { stop: '600', hex: '#C8236A' },
                    { stop: '700', hex: '#931F51' },
                    { stop: '800', hex: '#631738' },
                    { stop: '900', hex: '#380F21' },
                  ]}
                />
                <ColorScaleRow
                  name="Navy — texto e superfície primária (base 900)"
                  brandStep="900"
                  steps={[
                    { stop: '50',  hex: '#F2F2FA' },
                    { stop: '100', hex: '#E2E1F4' },
                    { stop: '200', hex: '#C0BEEA' },
                    { stop: '300', hex: '#9593D8' },
                    { stop: '400', hex: '#6B67C0' },
                    { stop: '500', hex: '#4B469F' },
                    { stop: '600', hex: '#38347E' },
                    { stop: '700', hex: '#2B2861' },
                    { stop: '800', hex: '#211F4A' },
                    { stop: '900', hex: '#131226' },
                  ]}
                />
                <ColorScaleRow
                  name="Neutral — escala quente-neutra (base 50)"
                  brandStep="50"
                  steps={[
                    { stop: '50',  hex: '#FAFAFA' },
                    { stop: '100', hex: '#ECECEA' },
                    { stop: '200', hex: '#DDDDDA' },
                    { stop: '300', hex: '#D4D4D2' },
                    { stop: '400', hex: '#ABABAA' },
                    { stop: '500', hex: '#808080' },
                    { stop: '600', hex: '#666666' },
                    { stop: '700', hex: '#404040' },
                    { stop: '800', hex: '#282828' },
                    { stop: '900', hex: '#1A1A1A' },
                  ]}
                />
                <ColorScaleRow
                  name="Cream — color block (base 100)"
                  brandStep="100"
                  steps={[
                    { stop: '50',  hex: '#FDFAF4' },
                    { stop: '100', hex: '#F4ECD6' },
                    { stop: '200', hex: '#E5D3A4' },
                    { stop: '300', hex: '#CFB268' },
                    { stop: '400', hex: '#AF8E41' },
                    { stop: '500', hex: '#816937' },
                    { stop: '600', hex: '#5C4D2D' },
                    { stop: '700', hex: '#3B3221' },
                    { stop: '800', hex: '#28241A' },
                  ]}
                />
                <ColorScaleRow
                  name="Pink — color block (base 100)"
                  brandStep="100"
                  steps={[
                    { stop: '50',  hex: '#FDF5F5' },
                    { stop: '100', hex: '#EFD4D4' },
                    { stop: '200', hex: '#DEAAAA' },
                    { stop: '300', hex: '#CA7878' },
                    { stop: '400', hex: '#AF4B4B' },
                    { stop: '500', hex: '#803C3C' },
                    { stop: '600', hex: '#5E3131' },
                    { stop: '700', hex: '#412525' },
                    { stop: '800', hex: '#281A1A' },
                  ]}
                />
                <ColorScaleRow
                  name="Coral — color block (base 100)"
                  brandStep="100"
                  steps={[
                    { stop: '50',  hex: '#FEF4EF' },
                    { stop: '100', hex: '#F3C9B6' },
                    { stop: '200', hex: '#ECAA8A' },
                    { stop: '300', hex: '#E27E55' },
                    { stop: '400', hex: '#CA5B2B' },
                    { stop: '500', hex: '#954728' },
                    { stop: '600', hex: '#6B3724' },
                    { stop: '700', hex: '#45271C' },
                    { stop: '800', hex: '#2C1C16' },
                  ]}
                />
              </div>
            </div>

            {/* Spacing */}
            <div className="mt-10">
              <H3>Espaçamento</H3>
              <BodySm>
                Base 8px. Todos os espaços são múltiplos de 8 — de 4px (xxs) a 96px (section). O <code className="type-caption bg-surface-soft border border-border px-1 rounded">py-section</code> (96px) delimita seções da homepage; componentes usam a escala menor internamente.
              </BodySm>
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  { token: 'xxs', px: '4px' },
                  { token: 'xs', px: '8px' },
                  { token: 'sm', px: '12px' },
                  { token: 'md', px: '16px' },
                  { token: 'lg', px: '24px' },
                  { token: 'xl', px: '32px' },
                  { token: 'xxl', px: '48px' },
                  { token: 'section', px: '96px' },
                ].map(({ token, px }) => (
                  <div key={token} className="flex flex-col items-center gap-1 p-3 rounded-lg bg-surface-soft border border-border min-w-[72px]">
                    <span className="type-caption text-fg-subtle">{token}</span>
                    <span className="type-body-sm text-fg font-mono">{px}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10">
              <H3>Sistema de botões</H3>
              <BodySm>
                Quatro variantes (primary, secondary, ghost, icon) × três tamanhos (sm, md, lg). Tipografia unificada em 16px/480 via <code className="type-caption bg-surface-soft border border-border px-1 rounded">.type-btn</code>. Primary usa navy no light e magenta no dark. Secondary usa bordas do fg atual. Todos têm <code className="type-caption bg-surface-soft border border-border px-1 rounded">focus-visible</code> com ring para navegação por teclado.
              </BodySm>
              <div className="mt-4 flex flex-wrap gap-3 items-center">
                <button className="px-6 py-3 type-btn bg-primary text-on-primary rounded-pill hover:opacity-85 active:scale-[0.97] transition-all">Primary</button>
                <button className="px-6 py-3 type-btn border border-fg text-fg rounded-pill bg-transparent hover:bg-fg/10 transition-all">Secondary</button>
                <button className="px-6 py-3 type-btn text-fg bg-transparent rounded-full hover:underline underline-offset-4 transition-all">Ghost</button>
              </div>
            </div>
          </section>

          {/* ── 5. Heurísticas de Nielsen ────────────────────── */}
          <Divider />
          <section aria-labelledby="heuristicas-heading" className="mb-16">
            <SectionLabel>05 — Heurísticas de Nielsen</SectionLabel>
            <H2 id="heuristicas-heading">10 heurísticas aplicadas ao projeto</H2>
            <Body>
              Cada heurística foi considerada no design e na implementação. Abaixo, como cada uma se manifesta neste portfólio.
            </Body>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[
                {
                  num: '01',
                  title: 'Visibilidade do status do sistema',
                  description: 'O usuário sempre sabe onde está e o que está acontecendo.',
                  example: 'ScrollProgress no topo dos artigos do blog. BackToTop aparece depois de 400px de scroll. Transições suaves indicam mudança de estado.',
                },
                {
                  num: '02',
                  title: 'Compatibilidade com o mundo real',
                  description: 'Linguagem e conceitos familiares ao usuário, não ao sistema.',
                  example: 'Seções nomeadas por significado ("Trajetória", "Artigos") — não por convenção técnica. Cases com títulos descritivos do problema, não do artefato.',
                },
                {
                  num: '03',
                  title: 'Controle e liberdade do usuário',
                  description: 'O usuário decide o modo de experiência.',
                  example: 'Toggle de dark/light mode. Seletor de idioma (PT/EN). Dentro dos cases: toggles "Simplificada / Detalhada". BackToTop para retornar ao topo sem rolar.',
                },
                {
                  num: '04',
                  title: 'Consistência e padrões',
                  description: 'Elementos semelhantes se comportam de forma semelhante.',
                  example: 'Todos os botões usam .type-btn (16px/480). Todas as seções usam py-section (96px). Cards de case seguem estrutura idêntica. Ícones da mesma família (Lucide).',
                },
                {
                  num: '05',
                  title: 'Prevenção de erros',
                  description: 'Design que evita que o erro aconteça.',
                  example: 'Links externos com target="_blank" e rel="noopener noreferrer". Pre-commit hook de TypeScript bloqueia commits com erros de tipo. Formulário de contato com validação HTML nativa.',
                },
                {
                  num: '06',
                  title: 'Reconhecimento em vez de memorização',
                  description: 'Objetos e opções visíveis reduzem carga cognitiva.',
                  example: 'Ícone de casa (House) no header em páginas internas — reconhecível sem label. Tags de categoria nos cards de artigo e case. Hover states revelam contexto adicional.',
                },
                {
                  num: '07',
                  title: 'Flexibilidade e eficiência de uso',
                  description: 'Atalhos para usuários experientes, sem prejudicar novatos.',
                  example: 'Skip to content (tecla Tab) para usuários de teclado. Cases organizados por categoria (Product Design, Strategy, Foundations) para navegação direta. Scroll anchor links no header.',
                },
                {
                  num: '08',
                  title: 'Estética e design minimalista',
                  description: 'Cada elemento presente tem propósito. Sem ruído visual.',
                  example: 'Ausência de decorações desnecessárias. Tipografia variável calibrada — pesos diferentes sem negrito artificial. Seções com background diferenciado apenas quando há justificativa visual.',
                },
                {
                  num: '09',
                  title: 'Ajudar usuários a reconhecer e recuperar erros',
                  description: 'Mensagens claras e saídas visíveis quando algo dá errado.',
                  example: 'Página 404 com navegação de retorno. Posts de blog com externalUrl sinalizam saída do site. notFound() retorna erro adequado quando slug não existe.',
                },
                {
                  num: '10',
                  title: 'Ajuda e documentação',
                  description: 'Quando necessário, documentação clara e acessível.',
                  example: 'Esta página — racional completo do projeto. Cada case documenta problema, processo e resultado. README no repositório. Metadados Open Graph para compartilhamento.',
                },
              ].map((h) => (
                <HeuristicCard key={h.num} {...h} />
              ))}
            </div>
          </section>

          {/* ── 6. Design Thinking ───────────────────────────── */}
          <Divider />
          <section aria-labelledby="dt-heading" className="mb-16">
            <SectionLabel>06 — Design Thinking</SectionLabel>
            <H2 id="dt-heading">Double Diamond aplicado ao portfólio</H2>
            <Body>
              O Double Diamond (Discover → Define → Develop → Deliver) estruturou o processo — mesmo em um projeto solo.
            </Body>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                {
                  phase: 'Discover',
                  type: 'Divergir',
                  content: 'Análise de referências de portfólios de designers sênior. Mapeamento do que recrutadores e heads de produto reportam buscar. Benchmark de soluções técnicas (Next.js 15, Tailwind v4).',
                },
                {
                  phase: 'Define',
                  type: 'Convergir',
                  content: 'Definição do usuário-alvo e seus jobs-to-be-done. Hierarquia de informação das seções. Decisão pelo design system de tokens semânticos como núcleo do projeto.',
                },
                {
                  phase: 'Develop',
                  type: 'Divergir',
                  content: 'Exploração da identidade visual, paleta e tipografia. Prototipação dos componentes de card, navegação e dark mode. Testes de contraste WCAG e legibilidade.',
                },
                {
                  phase: 'Deliver',
                  type: 'Convergir',
                  content: 'Implementação iterativa com Claude Code. Deploy contínuo via Vercel. Refinos de UX com base em feedback real — botões, espaçamentos, backgrounds, alinhamento de cards.',
                },
              ].map(({ phase, type, content }) => (
                <Card key={phase}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-7 h-7 rounded-sm bg-block-navy dark:bg-white/10 text-white flex items-center justify-center type-caption shrink-0" aria-hidden="true">
                      {phase[0]}
                    </span>
                    <div>
                      <p className="type-caption text-fg-subtle">{type}</p>
                      <p className="type-body-strong text-fg">{phase}</p>
                    </div>
                  </div>
                  <BodySm>{content}</BodySm>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 7. Acessibilidade + Dark Mode ────────────────── */}
          <Divider />
          <section aria-labelledby="a11y-heading" className="mb-16">
            <SectionLabel>07 — Acessibilidade & Dark Mode</SectionLabel>
            <H2 id="a11y-heading">Acessibilidade como requisito, não como checklist</H2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <H3>Acessibilidade</H3>
                <ul className="space-y-3">
                  {[
                    { item: 'Skip to content', detail: 'Link oculto no header, visível ao focar por Tab — permite saltar o menu e ir direto ao conteúdo' },
                    { item: 'Focus visible', detail: 'Todos os elementos interativos têm focus-visible com ring de 2px — nunca escondido' },
                    { item: 'ARIA labels', detail: 'Botões de ícone (ThemeToggle, LanguageSwitcher, BackToTop) têm aria-label descritivo' },
                    { item: 'Semântica HTML', detail: '<main>, <nav>, <section>, <article>, <header>, <footer> usados corretamente com aria-labelledby' },
                    { item: 'Alt text', detail: 'Todas as imagens têm alt descritivo. Ícones decorativos têm aria-hidden="true"' },
                    { item: 'Contraste WCAG AA', detail: 'Mínimo 4.5:1 para texto normal. Tokens de fg-muted testados em cada background de seção' },
                    { item: 'Navegação por teclado', detail: 'Fluxo de Tab lógico. Drawer mobile fecha com Escape. Modal fecha com Escape' },
                  ].map(({ item, detail }) => (
                    <li key={item} className="flex flex-col gap-1">
                      <span className="type-body-sm text-fg font-[480]">{item}</span>
                      <span className="type-body-sm text-fg-muted">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <H3>Dark mode</H3>
                <BodySm>
                  Implementado via <strong>next-themes</strong> com estratégia de classe (<code>.dark</code> no html). Tokens semânticos no CSS garantem que um único toggle muda todas as superfícies — sem overrides manuais por componente.
                </BodySm>
                <div className="mt-4 space-y-3">
                  {[
                    { token: '--bg',           light: '#fafafa',  dark: '#121124' },
                    { token: '--fg',           light: '#131226',  dark: '#ffffff' },
                    { token: '--color-surface-soft', light: '#ececea',  dark: '#1a1836' },
                    { token: '--color-block-cream', light: '#f4ecd6',  dark: '#1e1c31' },
                    { token: '--color-accent-magenta', light: '#C8236A',  dark: '#C8236A' },
                  ].map(({ token, light, dark }) => (
                    <div key={token} className="flex items-center gap-3 p-3 rounded-lg bg-surface-soft border border-border">
                      <code className="type-caption text-fg-subtle font-mono w-44 shrink-0">{token}</code>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded border border-black/20" style={{ backgroundColor: light }} />
                        <span className="type-caption text-fg-subtle">{light}</span>
                      </div>
                      <span className="type-caption text-fg-subtle">→</span>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded border border-white/20" style={{ backgroundColor: dark }} />
                        <span className="type-caption text-fg-subtle">{dark}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <BodySm>
                  O modo escuro respeita a preferência do sistema (<code>prefers-color-scheme</code>) por padrão e persiste a escolha do usuário no localStorage via next-themes.
                </BodySm>
              </div>
            </div>
          </section>

          {/* ── 8. Stack e Ferramentas ───────────────────────── */}
          <Divider />
          <section aria-labelledby="stack-heading" className="mb-16">
            <SectionLabel>08 — Stack & Ferramentas</SectionLabel>
            <H2 id="stack-heading">O que foi usado e por quê</H2>

            <div className="space-y-12">
              {/* Frontend */}
              <div>
                <p className="type-caption text-fg-subtle mb-4">Frontend</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ToolCard
                    name="Next.js 15 — App Router"
                    role="Framework React com RSC (React Server Components), Turbopack e geração estática. Páginas de cases e blog renderizam no servidor — sem JS desnecessário no cliente."
                    tags={['SSG', 'RSC', 'Turbopack', 'next-intl']}
                  />
                  <ToolCard
                    name="Tailwind CSS v4"
                    role="Utility-first com @theme inline, tokens CSS nativos e @custom-variant dark. Sem configuração JS — tudo em CSS. Permite coexistência com classes tipográficas customizadas."
                    tags={['@theme', 'Design tokens', 'CSS vars']}
                  />
                  <ToolCard
                    name="Framer Motion"
                    role="Animações de entrada suaves (fadeInUp, stagger) em componentes client. Usado com critério — só onde o movimento agrega percepção de qualidade, nunca como decoração."
                    tags={['Animation', 'Stagger', 'Viewport']}
                  />
                  <ToolCard
                    name="next-intl"
                    role="Internacionalização com suporte a PT e EN. Arquivos de mensagens JSON, routing por locale (as-needed prefix), traduções server-side via getTranslations."
                    tags={['i18n', 'PT / EN', 'Server']}
                  />
                  <ToolCard
                    name="next-themes"
                    role="Dark mode com persistência em localStorage e respeito ao prefers-color-scheme do sistema. Estratégia de classe (.dark) alinhada ao @custom-variant dark do Tailwind."
                    tags={['Dark mode', 'localStorage', 'System pref']}
                  />
                  <ToolCard
                    name="MDX + rehype"
                    role="Blog renderizado via MDX com syntax highlighting (rehype-pretty-code, tema github-light/dark), links com slug, tabelas e listas via remark-gfm."
                    tags={['MDX', 'Blog', 'Syntax highlight']}
                  />
                </div>
              </div>

              {/* Infraestrutura */}
              <div>
                <p className="type-caption text-fg-subtle mb-4">Infraestrutura</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ToolCard
                    name="Vercel"
                    role="Deploy automático conectado ao GitHub. Preview URLs para cada PR/branch. Edge network global. Variáveis de ambiente e domínio configurados no dashboard."
                    tags={['Deploy', 'Edge', 'Preview URLs']}
                  />
                  <ToolCard
                    name="GitHub"
                    role="Controle de versão com branch main. Pre-commit hook de TypeScript (tsc --noEmit) bloqueia commits com erros de tipo antes de chegarem ao repositório."
                    tags={['Git', 'Pre-commit hook', 'CI']}
                  />
                </div>
              </div>

              {/* IA */}
              <div>
                <p className="type-caption text-fg-subtle mb-4">Inteligência Artificial no processo</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ToolCard
                    name="Claude Code (CLI)"
                    role="Desenvolvimento assistido por IA diretamente no terminal. Leitura, edição e criação de arquivos; execução de comandos git; TypeScript check integrado. Todo o código foi revisado e direcionado pela designer — a IA executa, a designer decide."
                    tags={['CLI', 'Code generation', 'Git integration']}
                  />
                  <ToolCard
                    name="Claude Chat (claude.ai)"
                    role="Exploração de conceitos de UX, racional de decisões de design, revisão de copy e estruturação de conteúdo para casos e artigos antes da implementação."
                    tags={['UX research', 'Copy', 'Ideação']}
                  />
                </div>
                <Card className="mt-4 bg-block-cream dark:bg-block-cream border-accent-magenta/20">
                  <p className="type-body-sm text-fg-muted">
                    <strong className="text-fg">Nota sobre IA e autoria:</strong> O uso de IA neste projeto é intencional e transparente — não como substituto de competência, mas como ferramenta de aceleração. Cada decisão de design, estrutura de informação e escolha de UX é da designer. Claude executa — como um programador júnior que recebe direção clara. A qualidade do output reflete a qualidade do input.
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* ── 9. Considerações finais ──────────────────────── */}
          <Divider />
          <section aria-labelledby="final-heading" className="mb-16">
            <SectionLabel>09 — Aprendizados</SectionLabel>
            <H2 id="final-heading">Tratar o próprio portfólio como produto</H2>
            <div className="space-y-4">
              <Body>
                A maior lição deste projeto: designers tendem a tratar o próprio portfólio como um exercício visual. Quando tratado como produto — com usuário definido, hipóteses, decisões embasadas e iterações —, o resultado é mais coerente e mais difícil de questionar.
              </Body>
              <Body>
                O design system foi a decisão mais importante. Sem ele, cada componente seria uma decisão local e inconsistente. Com ele, dark mode, acessibilidade e responsividade são consequência do sistema — não esforço extra.
              </Body>
              <Body>
                Este portfólio é um produto em evolução — como qualquer produto deveria ser.
              </Body>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
