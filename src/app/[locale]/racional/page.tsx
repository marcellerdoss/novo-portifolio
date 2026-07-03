import type { Metadata } from 'next';
import { BackToTop } from '@/components/ui/BackToTop';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Contact } from '@/components/sections/Contact';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Download, ArrowUpRight, ChevronUp } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === 'en';
  return {
    title: en ? 'Project Design — Marcelle Rocha' : 'Design do Projeto — Marcelle Rocha',
    description: en
      ? 'How this portfolio was designed and built as a UX product: design system, Nielsen heuristics, accessibility, dark mode, and technical stack.'
      : 'Como este portfólio foi concebido e construído como um produto de UX: design system, heurísticas de Nielsen, acessibilidade, dark mode e stack técnica.',
  };
}

/* ── helpers ──────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="type-caption text-accent-magenta mb-4">{children}</p>
  );
}

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="type-headline text-fg mb-6">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="type-body-strong text-fg mb-3">{children}</h3>;
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
    <span className="inline-block type-caption text-fg-subtle rounded-full border border-border px-3 py-1 leading-none">
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
      <p className="type-caption text-fg break-words leading-tight">{label}</p>
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
              <p className={`hidden sm:block text-[8px] leading-none text-center font-mono tracking-tight ${isBase ? 'text-accent-magenta' : 'text-fg-subtle'}`}>
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
      <p className="type-body-sm text-fg-subtle pt-3 border-t border-fg/10">{example}</p>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────── */

export default async function RacionalPage({ params }: Props) {
  const { locale } = await params;
  const en = locale === 'en';

  const users = en
    ? [
        {
          role: 'Recruiter / HR',
          jtbd: 'Quickly confirm whether the profile has seniority and fit for the role',
          need: 'Clear trajectory, visual hierarchy, short reading time',
        },
        {
          role: 'Head of Product / Design',
          jtbd: 'Assess strategic reasoning ability and problem-solving capacity',
          need: 'Cases with context, process, and outcome. Depth.',
        },
        {
          role: 'Designer / Peer',
          jtbd: 'Calibrate level, see system choices and execution consistency',
          need: 'Coherent design system, attention to detail, dark mode, responsiveness',
        },
      ]
    : [
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
      ];

  const homeSections = en
    ? [
        { section: 'Hero', why: 'Immediate identity. Who I am and what I do in 3 seconds.' },
        { section: 'Marquee', why: 'Skills in motion as a fast repertoire signal, before the work proof.' },
        { section: 'Cases', why: 'Work proof before any text about me. The portfolio shows before it tells.' },
        { section: 'Articles', why: 'Signal of depth. Those who write about the field master the field.' },
        { section: 'Contact', why: 'Fast CTA for whoever is already convinced by the cases alone.' },
      ]
    : [
        { section: 'Hero', why: 'Identidade imediata. Quem sou e o que faço em 3 segundos.' },
        { section: 'Marquee', why: 'Competências em movimento como sinal rápido de repertório, antes da prova de trabalho.' },
        { section: 'Cases', why: 'Prova de trabalho antes de qualquer texto sobre mim. O portfólio mostra antes de contar.' },
        { section: 'Artigos', why: 'Sinal de profundidade. Quem escreve sobre o campo domina o campo.' },
        { section: 'Contato', why: 'CTA rápido para quem já se convenceu só com os cases.' },
      ];

  const sobreSections = en
    ? [
        { section: 'About', why: 'Personal context and purpose. Only makes sense for those who already decided to go deeper.' },
        { section: 'Stats', why: 'Numeric credibility (years, projects, markets) right after the personal intro.' },
        { section: 'Design (Racional)', why: 'Process and thinking behind my work. A signal of product and UX maturity.' },
        { section: 'Experience', why: 'Professional timeline. Builds historical trust and shows scope evolution.' },
        { section: 'Skills & Education', why: 'Technical validation: tools, skills and certifications organized by category.' },
        { section: 'Contact', why: 'Also closes the deep-dive page, for those who decide after reading everything.' },
      ]
    : [
        { section: 'Sobre', why: 'Contexto pessoal e propósito. Só faz sentido para quem já decidiu se aprofundar.' },
        { section: 'Números', why: 'Credibilidade numérica (anos, projetos, mercados) logo após a apresentação pessoal.' },
        { section: 'Racional', why: 'Processo e forma de pensar por trás do trabalho. Sinal de maturidade em produto e UX.' },
        { section: 'Trajetória', why: 'Linha do tempo profissional. Cria confiança histórica e mostra evolução de escopo.' },
        { section: 'Skills & Formação', why: 'Validação técnica: ferramentas, competências e certificações organizadas por categoria.' },
        { section: 'Contato', why: 'Fecha também a página de aprofundamento, para quem decide depois de ler tudo.' },
      ];

  const heuristics = en
    ? [
        {
          num: '01',
          title: 'Visibility of system status',
          description: 'The user always knows where they are and what is happening.',
          example: 'ScrollProgress at the top of blog posts. BackToTop appears after 400px of scroll. Smooth transitions indicate state changes.',
        },
        {
          num: '02',
          title: 'Match between system and the real world',
          description: 'Language and concepts familiar to the user, not the system.',
          example: 'Sections named by meaning ("Experience", "Articles"), not technical convention. Cases with titles describing the problem, not the artifact.',
        },
        {
          num: '03',
          title: 'User control and freedom',
          description: 'The user decides the experience mode.',
          example: 'Dark/light mode toggle. Language selector (PT/EN). Inside cases: "Overview / Detailed" toggles. BackToTop to return to the top without scrolling.',
        },
        {
          num: '04',
          title: 'Consistency and standards',
          description: 'Similar elements behave similarly.',
          example: 'All buttons use .type-btn (16px/480). All sections use py-section (96px). Case cards follow an identical structure. Icons from the same family (Lucide).',
        },
        {
          num: '05',
          title: 'Error prevention',
          description: 'Design that prevents errors from happening.',
          example: 'External links with target="_blank" and rel="noopener noreferrer". TypeScript pre-commit hook blocks commits with type errors. Contact form with explicit sending, success, and error states.',
        },
        {
          num: '06',
          title: 'Recognition rather than recall',
          description: 'Visible objects and options reduce cognitive load.',
          example: 'Logo in the header works as a home link on every page, recognizable without an additional label. Category tags on article and case cards. Hover states reveal additional context.',
        },
        {
          num: '07',
          title: 'Flexibility and efficiency of use',
          description: 'Shortcuts for experienced users, without disadvantaging beginners.',
          example: 'Skip to content (Tab key) for keyboard users. Cases organized by category (Product Design, Metrics Framework, Strategic Report, Navigation Architecture) for direct navigation. Scroll anchor links in the header.',
        },
        {
          num: '08',
          title: 'Aesthetic and minimalist design',
          description: 'Every element present has a purpose. No visual noise.',
          example: 'Absence of unnecessary decorations. Calibrated variable typography, different weights without artificial bolding. Sections with differentiated backgrounds only when there is visual justification.',
        },
        {
          num: '09',
          title: 'Help users recognize, diagnose, and recover from errors',
          description: 'Clear messages and visible exits when something goes wrong.',
          example: "Contact form with distinct states: sending / sent / error. notFound() returns a proper error when an article slug doesn't exist. Posts with external links signal leaving the site.",
        },
        {
          num: '10',
          title: 'Help and documentation',
          description: 'When needed, clear and accessible documentation.',
          example: 'This page gathers the complete project rationale. Each case documents problem, process, and outcome. README in the repository. Open Graph metadata for sharing.',
        },
      ]
    : [
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
          example: 'Seções nomeadas por significado ("Trajetória", "Artigos"), não por convenção técnica. Cases com títulos descritivos do problema, não do artefato.',
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
          example: 'Links externos com target="_blank" e rel="noopener noreferrer". Pre-commit hook de TypeScript bloqueia commits com erros de tipo. Formulário de contato com estados explícitos de envio, sucesso e erro.',
        },
        {
          num: '06',
          title: 'Reconhecimento em vez de memorização',
          description: 'Objetos e opções visíveis reduzem carga cognitiva.',
          example: 'Logotipo no header funciona como link home em toda página, reconhecível sem label adicional. Tags de categoria nos cards de artigo e case. Hover states revelam contexto adicional.',
        },
        {
          num: '07',
          title: 'Flexibilidade e eficiência de uso',
          description: 'Atalhos para usuários experientes, sem prejudicar novatos.',
          example: 'Skip to content (tecla Tab) para usuários de teclado. Cases organizados por categoria (Product Design, Framework de Métricas, Relatório Estratégico, Arquitetura de Navegação) para navegação direta. Scroll anchor links no header.',
        },
        {
          num: '08',
          title: 'Estética e design minimalista',
          description: 'Cada elemento presente tem propósito. Sem ruído visual.',
          example: 'Ausência de decorações desnecessárias. Tipografia variável calibrada, pesos diferentes sem negrito artificial. Seções com background diferenciado apenas quando há justificativa visual.',
        },
        {
          num: '09',
          title: 'Ajudar usuários a reconhecer e recuperar erros',
          description: 'Mensagens claras e saídas visíveis quando algo dá errado.',
          example: 'Formulário de contato com estados distintos: enviando / enviado / erro. notFound() retorna erro adequado quando slug de artigo não existe. Posts com link externo sinalizam saída do site.',
        },
        {
          num: '10',
          title: 'Ajuda e documentação',
          description: 'Quando necessário, documentação clara e acessível.',
          example: 'Esta página reúne o racional completo do projeto. Cada case documenta problema, processo e resultado. README no repositório. Metadados Open Graph para compartilhamento.',
        },
      ];

  const diamonds = en
    ? [
        {
          phase: 'Discover',
          type: 'Diverge',
          content: 'Analysis of senior designer portfolio references. Mapping what recruiters and heads of product report looking for. Technical solution benchmarking (Next.js 16, Tailwind v4).',
        },
        {
          phase: 'Define',
          type: 'Converge',
          content: 'Defining the target user and their jobs-to-be-done. Information hierarchy of sections. Decision for the semantic token design system as the project core.',
        },
        {
          phase: 'Develop',
          type: 'Diverge',
          content: 'Exploration of visual identity, palette and typography. Prototyping of card, navigation, and dark mode components. WCAG contrast and readability testing.',
        },
        {
          phase: 'Deliver',
          type: 'Converge',
          content: 'Iterative implementation with Claude Code. Continuous deploy via Vercel. UX refinements based on real feedback: buttons, spacing, backgrounds, card alignment.',
        },
      ]
    : [
        {
          phase: 'Discover',
          type: 'Divergir',
          content: 'Análise de referências de portfólios de designers sênior. Mapeamento do que recrutadores e heads de produto reportam buscar. Benchmark de soluções técnicas (Next.js 16, Tailwind v4).',
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
          content: 'Implementação iterativa com Claude Code. Deploy contínuo via Vercel. Refinos de UX com base em feedback real: botões, espaçamentos, backgrounds, alinhamento de cards.',
        },
      ];

  const a11yItems = en
    ? [
        { item: 'Accessibility bar', detail: 'Always visible at the top: skip links (content, menu, footer), text size control (A- / A+) and high contrast toggle' },
        { item: 'Focus visible', detail: 'All interactive elements have focus-visible with a 2px ring, never hidden' },
        { item: 'ARIA labels', detail: 'Icon buttons (ThemeToggle, LanguageSwitcher, BackToTop) have a descriptive aria-label' },
        { item: 'HTML semantics', detail: 'main, nav, section, article, header and footer used correctly with aria-labelledby' },
        { item: 'Alt text', detail: 'All images have descriptive alt text. Decorative icons have aria-hidden="true"' },
        { item: 'WCAG AA contrast', detail: 'Minimum 4.5:1 for regular text. fg-muted tokens tested against each section background' },
        { item: 'Keyboard navigation', detail: 'Logical Tab flow. Mobile drawer and modals close with Escape' },
      ]
    : [
        { item: 'Barra de acessibilidade', detail: 'Sempre visível no topo: links de atalho (conteúdo, menu, rodapé), controle de tamanho do texto (A- / A+) e alternância de alto contraste' },
        { item: 'Focus visible', detail: 'Todos os elementos interativos têm focus-visible com ring de 2px, nunca escondido' },
        { item: 'ARIA labels', detail: 'Botões de ícone (ThemeToggle, LanguageSwitcher, BackToTop) têm aria-label descritivo' },
        { item: 'Semântica HTML', detail: 'main, nav, section, article, header e footer usados corretamente com aria-labelledby' },
        { item: 'Alt text', detail: 'Todas as imagens têm alt descritivo. Ícones decorativos têm aria-hidden="true"' },
        { item: 'Contraste WCAG AA', detail: 'Mínimo 4.5:1 para texto normal. Tokens fg-muted testados em cada background de seção' },
        { item: 'Navegação por teclado', detail: 'Fluxo de Tab lógico. Drawer mobile e modais fecham com Escape' },
      ];

  const stack = [
    { category: en ? 'Frontend' : 'Frontend',       name: 'Next.js 16',      desc: en ? 'App Router, RSC, and static generation' : 'App Router, RSC e geração estática' },
    { category: null,                                name: 'Tailwind CSS v4', desc: en ? '@theme inline, native CSS tokens' : '@theme inline, tokens CSS nativos' },
    { category: null,                                name: 'Framer Motion',   desc: en ? 'Purposeful entry animations' : 'Animações de entrada com critério' },
    { category: null,                                name: 'next-intl',       desc: en ? 'PT/EN internationalization' : 'Internacionalização PT/EN' },
    { category: null,                                name: 'next-themes',     desc: en ? 'Persistent dark mode' : 'Dark mode persistente' },
    { category: null,                                name: 'MDX + rehype',    desc: en ? 'Blog with syntax highlighting' : 'Blog com syntax highlighting' },
    { category: en ? 'Infrastructure' : 'Infraestrutura', name: 'Vercel',    desc: en ? 'Automatic deploy, edge network' : 'Deploy automático, edge network' },
    { category: null,                                name: 'GitHub',          desc: en ? 'Version control and TS pre-commit hook' : 'Versionamento e pre-commit hook TS' },
    { category: null,                                name: 'Resend',          desc: en ? 'Transactional email in the form' : 'E-mail transacional no formulário' },
    { category: en ? 'AI in the process' : 'IA no processo', name: 'Claude Code', desc: en ? 'Terminal-based assisted development' : 'Desenvolvimento assistido no terminal' },
    { category: null,                                name: 'Claude Design',   desc: en ? 'Exploration of visual concepts and UI' : 'Exploração de conceitos visuais e UI' },
  ];

  return (
    <>
      <ScrollProgress />
      <BackToTop />

      <div className="min-h-screen bg-bg">

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="py-section bg-bg border-b border-border">
          <div className="max-w-6xl mx-auto px-6">
            <p className="type-caption text-accent-magenta mb-4">
              {en ? 'Project Design' : 'Design do Projeto'}
            </p>
            <h1 className="type-display-lg text-fg mb-6">
              {en
                ? 'This portfolio was treated as a UX product.'
                : 'Este portfólio foi tratado como um produto de UX.'}
            </h1>
            <p className="type-body text-fg-muted">
              {en
                ? 'Every decision around color, typography, hierarchy, accessibility and dark mode was intentional and grounded. This page documents the rationale, the design system, and the tools behind the project.'
                : 'Cada decisão de cor, tipografia, hierarquia, acessibilidade e dark mode foi intencional e embasada. Esta página documenta o racional, o design system e as ferramentas por trás do projeto.'}
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 items-start">

          {/* ══ Col 2/3 — Conteúdo de design system ════════ */}
          <div className="lg:col-span-2 space-y-0">

          {/* ── 1. Contexto ─────────────────────────────────── */}
          <section aria-labelledby="problema-heading" className="mb-16">
            <SectionLabel>{en ? '01 · Context' : '01 · Contexto'}</SectionLabel>
            <H2 id="problema-heading">{en ? 'The problem to solve' : 'O problema a resolver'}</H2>
            <div className="space-y-4">
              <Body>
                {en
                  ? "A designer portfolio is a product. It has a user, a goal, and a context of use. Most portfolios fail because they are conceived as showcases: beautiful, but without narrative. This one was built starting from a different question: what does the user need to conclude by the end of the visit?"
                  : 'Um portfólio de designer é um produto. Tem usuário, tem objetivo, tem contexto de uso. A maioria dos portfólios falha porque é concebido como vitrine: belo, mas sem narrativa. Este foi construído partindo de uma pergunta diferente: o que o usuário precisa concluir ao final da visita?'}
              </Body>
              <Body>
                {en
                  ? 'The answer defines everything: the order of sections, the depth of cases, the tone of content, and even the navigation system.'
                  : 'A resposta define tudo: a ordem das seções, a profundidade dos cases, o tom do conteúdo e até o sistema de navegação.'}
              </Body>
            </div>
          </section>

          {/* ── 2. Pesquisa ─────────────────────────────────── */}
          <Divider />
          <section aria-labelledby="usuario-heading" className="mb-16">
            <SectionLabel>{en ? '02 · Research' : '02 · Pesquisa'}</SectionLabel>
            <H2 id="usuario-heading">{en ? 'Who uses it and what they look for' : 'Quem usa e o que busca'}</H2>
            <Body>
              {en ? 'Three core profiles, with distinct jobs-to-be-done:' : 'Três perfis centrais, com jobs-to-be-done distintos:'}
            </Body>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {users.map(({ role, jtbd, need }) => (
                <Card key={role}>
                  <p className="type-body-strong text-fg mb-3">{role}</p>
                  <p className="type-body-sm text-fg-muted mb-2">
                    <span className="text-fg-subtle">Job-to-be-done:</span> {jtbd}
                  </p>
                  <p className="type-body-sm text-fg-muted">
                    <span className="text-fg-subtle">{en ? 'Need:' : 'Necessidade:'}</span> {need}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 3. Arquitetura de informação ─────────────────── */}
          <Divider />
          <section aria-labelledby="ai-heading" className="mb-16">
            <SectionLabel>{en ? '03 · Information Architecture' : '03 · Arquitetura de Informação'}</SectionLabel>
            <H2 id="ai-heading">{en ? 'The order of sections is not random' : 'A ordem das seções não é aleatória'}</H2>
            <Body>
              {en
                ? "The site's real navigation has two destinations: Cases (a home anchor) and About. Everything else is content within those two pages, not a separate stop — the table below shows what lives in each and why."
                : 'A navegação real do site tem dois destinos: Cases (âncora na home) e Sobre. Todo o resto é conteúdo dentro dessas duas páginas, não uma parada à parte — a tabela abaixo mostra o que vive em cada uma e por quê.'}
            </Body>

            <div className="mt-8 space-y-10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <H3>{en ? 'Homepage' : 'Home'}</H3>
                  <Tag>/</Tag>
                </div>
                <div className="space-y-3">
                  {homeSections.map(({ section, why }) => (
                    <Card key={section}>
                      <p className="type-caption text-accent-magenta mb-2">{section}</p>
                      <p className="type-body-sm text-fg-muted">{why}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <H3>{en ? 'About page' : 'Página Sobre'}</H3>
                  <Tag>/sobre</Tag>
                </div>
                <div className="space-y-3">
                  {sobreSections.map(({ section, why }) => (
                    <Card key={section}>
                      <p className="type-caption text-accent-magenta mb-2">{section}</p>
                      <p className="type-body-sm text-fg-muted">{why}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 4. Design System ─────────────────────────────── */}
          <Divider />
          <section aria-labelledby="ds-heading" className="mb-16">
            <SectionLabel>04 · Design System</SectionLabel>
            <H2 id="ds-heading">{en ? 'Semantic token system' : 'Sistema de tokens semânticos'}</H2>
            <Body>
              {en
                ? <>The design system uses semantic tokens: colors don&apos;t have literal names, but roles. <code className="type-caption bg-surface-soft border border-border px-2 py-1 rounded text-fg">--bg</code>, <code className="type-caption bg-surface-soft border border-border px-2 py-1 rounded text-fg">--fg</code>, <code className="type-caption bg-surface-soft border border-border px-2 py-1 rounded text-fg">--fg-muted</code>. This allows dark mode to be a token swap, not individual style overrides.</>
                : <>O design system usa tokens semânticos: as cores não têm nomes literais, mas papéis. <code className="type-caption bg-surface-soft border border-border px-2 py-1 rounded text-fg">--bg</code>, <code className="type-caption bg-surface-soft border border-border px-2 py-1 rounded text-fg">--fg</code>, <code className="type-caption bg-surface-soft border border-border px-2 py-1 rounded text-fg">--fg-muted</code>. Isso permite que o dark mode seja uma troca de tokens, não de estilos individuais.</>}
            </Body>

            {/* Typography */}
            <div className="mt-10 mb-8">
              <H3>{en ? 'Type scale' : 'Escala tipográfica'}</H3>
              <BodySm>
                {en
                  ? <>Variable typography with fluid font-weight (320–700). All sizes use Inter with letter-spacing and line-height adjustments calibrated for screen reading. Buttons have their own class <code className="type-caption bg-surface-soft border border-border px-1 rounded">.type-btn</code> (16px/480) to avoid specificity conflicts with Tailwind utilities.</>
                  : <>Tipografia variável com font-weight fluido (320–700). Todos os tamanhos usam Inter com ajustes de letter-spacing e line-height calibrados para leitura em tela. Botões têm classe própria <code className="type-caption bg-surface-soft border border-border px-1 rounded">.type-btn</code> (16px/480) para evitar conflito de especificidade com utilitários Tailwind.</>}
              </BodySm>
              <div className="mt-6 rounded-[16px] bg-surface-soft border border-border divide-y divide-fg/10 overflow-hidden">
                {[
                  { cls: 'type-display-xl',  name: 'Display XL',  specs: '80px / 340',            ex: 'Marcelle' },
                  { cls: 'type-display-lg',  name: 'Display LG',  specs: '32px / 700',            ex: 'Cases' },
                  { cls: 'type-headline',    name: 'Headline',    specs: '24px / 540',            ex: en ? 'Platform redesign' : 'Redesign do core' },
                  { cls: 'type-body',        name: 'Body',        specs: '18px / 320',            ex: en ? 'Working with digital products since 2012.' : 'Trabalho com produtos digitais desde 2012.' },
                  { cls: 'type-body-strong', name: 'Body Strong', specs: '18px / 480',            ex: en ? 'See full case' : 'Ver case completo' },
                  { cls: 'type-body-sm',     name: 'Body SM',     specs: '16px / 330',            ex: en ? 'See case' : 'Ver case' },
                  { cls: 'type-caption',     name: 'Caption',     specs: '12px / 400 / Uppercase', ex: 'UX Research' },
                ].map(({ cls, name, specs, ex }) => (
                  <div key={cls} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 px-6 py-4">
                    <p className="type-caption text-fg-subtle whitespace-nowrap sm:w-28 sm:shrink-0">{name}</p>
                    <span className={`${cls} text-fg sm:flex-1 min-w-0`}>{ex}</span>
                    <p className="type-caption text-fg-subtle/50 whitespace-nowrap sm:shrink-0">{specs}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors — semantic tokens */}
            <div className="mt-10">
              <H3>{en ? 'Semantic tokens' : 'Tokens semânticos'}</H3>
              <BodySm>
                {en
                  ? "Colors have roles, not literal names. Dark mode is a token swap, not individual style overrides."
                  : 'As cores têm papéis, não nomes literais. O dark mode é uma troca de tokens, não de estilos individuais.'}
              </BodySm>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ColorSwatch bg="#fafafa"  label="bg"             value="#fafafa" />
                <ColorSwatch bg="#ececea"  label="surface-soft"   value="#ececea" />
                <ColorSwatch bg="#f4ecd6"  label="block-cream"    value="#f4ecd6" />
                <ColorSwatch bg="#131226"  label="fg / primary"   value="#131226" />
                <ColorSwatch bg="#404040"  label="fg-muted"       value="#404040" />
                <ColorSwatch bg="#666666"  label="fg-subtle"      value="#666666" />
                <ColorSwatch bg="#B4225E"  label="accent-magenta" value="#B4225E" />
                <ColorSwatch bg="#211F4A"  label="block-navy"     value="#211F4A" />
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ColorSwatch bg="#121124"  label="bg"             value="#121124" />
                <ColorSwatch bg="#1a1836"  label="surface-soft"   value="#1a1836" />
                <ColorSwatch bg="#1e1c31"  label="block-cream"    value="#1e1c31" />
                <ColorSwatch bg="#ffffff"  label="fg"             value="#ffffff" />
                <ColorSwatch bg="#e4e4e7"  label="fg-muted"       value="#e4e4e7" />
                <ColorSwatch bg="#a1a1aa"  label="fg-subtle"      value="#a1a1aa" />
                <ColorSwatch bg="#B4225E"  label="accent-magenta" value="#B4225E" />
                <ColorSwatch bg="#261724"  label="block-pink"     value="#261724" />
              </div>
            </div>

            {/* Colors — full scales */}
            <div className="mt-10">
              <H3>{en ? 'Color scales (50 → 900)' : 'Escalas de cores (50 → 900)'}</H3>
              <BodySm>
                {en
                  ? 'Each color has a complete scale. Convention: 50–200 = backgrounds and hover; 300–400 = borders and icons; 500–600 = WCAG AA text on white; 700–900 = body and headings. The step marked in magenta is the system\'s base color.'
                  : 'Cada cor possui escala completa. Convenção: 50–200 = fundos e hover; 300–400 = bordas e ícones; 500–600 = texto WCAG AA sobre branco; 700–900 = corpo e headings. O passo marcado em magenta é a cor base do sistema.'}
              </BodySm>
              <div className="mt-6 space-y-6 p-6 rounded-[16px] bg-surface-soft border border-border overflow-x-auto">
                <ColorScaleRow
                  name={en ? 'Magenta · reference scale (token: #B4225E)' : 'Magenta · escala de referência (token: #B4225E)'}
                  brandStep="600"
                  steps={[
                    { stop: '50',  hex: '#FEF0F6' },
                    { stop: '100', hex: '#FCD9E8' },
                    { stop: '200', hex: '#F5B2CF' },
                    { stop: '300', hex: '#EC83B0' },
                    { stop: '400', hex: '#E35492' },
                    { stop: '500', hex: '#DB337C' },
                    { stop: '600', hex: '#B4225E' },
                    { stop: '700', hex: '#931F51' },
                    { stop: '800', hex: '#631738' },
                    { stop: '900', hex: '#380F21' },
                  ]}
                />
                <ColorScaleRow
                  name={en ? 'Navy · text and primary surface (base 900)' : 'Navy · texto e superfície primária (base 900)'}
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
                  name={en ? 'Neutral · warm-neutral scale (base 50)' : 'Neutral · escala quente-neutra (base 50)'}
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
                  name="Cream · color block (base 100)"
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
                  name="Pink · color block (base 100)"
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
                  name="Coral · color block (base 100)"
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
              <H3>{en ? 'Spacing' : 'Espaçamento'}</H3>
              <BodySm>
                {en
                  ? <>{`Base 8px. All spacing is multiples of 8, from 4px (xxs) to 96px (section). `}<code className="type-caption bg-surface-soft border border-border px-1 rounded">py-section</code>{` (96px) delimits homepage sections; components use the smaller scale internally.`}</>
                  : <>Base 8px. Todos os espaços são múltiplos de 8, de 4px (xxs) a 96px (section). O <code className="type-caption bg-surface-soft border border-border px-1 rounded">py-section</code> (96px) delimita seções da homepage; componentes usam a escala menor internamente.</>}
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
              <H3>{en ? 'Button system' : 'Sistema de botões'}</H3>
              <BodySm>
                {en
                  ? <>Four variants (primary, secondary, ghost, icon) × four sizes (xs, sm, md, lg). Unified typography at 16px/480 via <code className="type-caption bg-surface-soft border border-border px-1 rounded">.type-btn</code>. Primary uses navy in light and magenta in dark. Secondary uses current fg borders. All have <code className="type-caption bg-surface-soft border border-border px-1 rounded">focus-visible</code> with ring for keyboard navigation.</>
                  : <>Quatro variantes (primary, secondary, ghost, icon) × quatro tamanhos (xs, sm, md, lg). Tipografia unificada em 16px/480 via <code className="type-caption bg-surface-soft border border-border px-1 rounded">.type-btn</code>. Primary usa navy no light e magenta no dark. Secondary usa bordas do fg atual. Todos têm <code className="type-caption bg-surface-soft border border-border px-1 rounded">focus-visible</code> com ring para navegação por teclado.</>}
              </BodySm>
              <div className="mt-6 space-y-6">

                {/* Sizes */}
                <div>
                  <p className="type-caption text-fg-subtle mb-3">{en ? 'Sizes · primary variant' : 'Tamanhos · variante primary'}</p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
                    <Button size="xs">XS</Button>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                {/* Variants light */}
                <div>
                  <p className="type-caption text-fg-subtle mb-3">{en ? 'Variants · light mode' : 'Variantes · light mode'}</p>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button size="md">Primary</Button>
                    <Button size="md" variant="secondary">Secondary</Button>
                    <Button size="md" variant="ghost">Ghost</Button>
                    <Button size="md" variant="icon" aria-label={en ? 'Back to top' : 'Subir ao topo'}><ChevronUp size={18} aria-hidden="true" /></Button>
                  </div>
                </div>

                {/* Variants dark */}
                <div className="p-5 rounded-xl bg-[#121124]">
                  <p className="type-caption text-white/40 mb-4">{en ? 'Variants · dark mode' : 'Variantes · dark mode'}</p>
                  <div className="flex flex-wrap gap-3 items-center">
                    <button type="button" className="px-5 py-3 type-btn bg-[#B4225E] text-white rounded-pill hover:opacity-85 active:scale-[0.97] transition-all">{en ? 'Primary (rose)' : 'Primary (rosa)'}</button>
                    <button type="button" className="px-5 py-3 type-btn border border-white text-white rounded-pill bg-transparent hover:bg-white/10 active:scale-[0.97] transition-all">Secondary</button>
                    <button type="button" className="px-5 py-3 type-btn text-white bg-transparent rounded-full hover:underline underline-offset-4 transition-all">Ghost</button>
                    <button type="button" aria-label={en ? 'Back to top' : 'Subir ao topo'} className="w-10 h-10 rounded-full bg-[#B4225E] text-white flex items-center justify-center hover:opacity-85 transition-all">
                      <ChevronUp size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* With arrows and icons */}
                <div>
                  <p className="type-caption text-fg-subtle mb-3">{en ? 'With arrows and icons' : 'Com setas e ícones'}</p>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button size="md">{en ? 'See cases' : 'Ver cases'} <ArrowRight size={16} aria-hidden="true" /></Button>
                    <Button size="md" variant="secondary">Download CV <Download size={16} aria-hidden="true" /></Button>
                    <button type="button" className="group flex items-center gap-2 border border-fg/20 rounded-xl px-4 py-2.5 type-body-sm text-fg/80 hover:text-fg hover:border-fg/40 transition-all duration-200">
                      {en ? 'Project design' : 'Design do projeto'} <ArrowUpRight size={14} className="text-fg/30 group-hover:text-fg/60 shrink-0" aria-hidden="true" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ── 5. Heurísticas de Nielsen ────────────────────── */}
          <Divider />
          <section aria-labelledby="heuristicas-heading" className="mb-16">
            <SectionLabel>{en ? "05 · Nielsen's Heuristics" : '05 · Heurísticas de Nielsen'}</SectionLabel>
            <H2 id="heuristicas-heading">{en ? '10 heuristics applied to the project' : '10 heurísticas aplicadas ao projeto'}</H2>
            <Body>
              {en
                ? 'Each heuristic was considered in the design and implementation. Below, how each one manifests in this portfolio.'
                : 'Cada heurística foi considerada no design e na implementação. Abaixo, como cada uma se manifesta neste portfólio.'}
            </Body>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {heuristics.map((h) => (
                <HeuristicCard key={h.num} {...h} />
              ))}
            </div>
          </section>

          {/* ── 6. Design Thinking ───────────────────────────── */}
          <Divider />
          <section aria-labelledby="dt-heading" className="mb-16">
            <SectionLabel>06 · Design Thinking</SectionLabel>
            <H2 id="dt-heading">{en ? 'Double Diamond applied to the portfolio' : 'Double Diamond aplicado ao portfólio'}</H2>
            <Body>
              {en
                ? 'The Double Diamond (Discover → Define → Develop → Deliver) structured the process, even in a solo project.'
                : 'O Double Diamond (Discover → Define → Develop → Deliver) estruturou o processo, mesmo em um projeto solo.'}
            </Body>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {diamonds.map(({ phase, type, content }) => (
                <Card key={phase}>
                  <p className="type-caption text-fg-subtle mb-1">{type}</p>
                  <p className="type-body-strong text-fg mb-4">{phase}</p>
                  <BodySm>{content}</BodySm>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 7. Acessibilidade + Dark Mode ────────────────── */}
          <Divider />
          <section aria-labelledby="a11y-heading" className="mb-16">
            <SectionLabel>{en ? '07 · Accessibility & Dark Mode' : '07 · Acessibilidade & Dark Mode'}</SectionLabel>
            <H2 id="a11y-heading">{en ? 'Accessibility as a requirement, not a checklist' : 'Acessibilidade como requisito, não como checklist'}</H2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <H3>{en ? 'Accessibility' : 'Acessibilidade'}</H3>
                <div className="space-y-3">
                  {a11yItems.map(({ item, detail }) => (
                    <Card key={item}>
                      <p className="type-caption text-accent-magenta mb-2">{item}</p>
                      <p className="type-body-sm text-fg-muted">{detail}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <H3>Dark mode</H3>
                <BodySm>
                  {en
                    ? <>Implemented via <strong>next-themes</strong> with class strategy (<code>.dark</code> on html). Semantic tokens in CSS ensure a single toggle changes all surfaces, without manual component-level overrides.</>
                    : <>Implementado via <strong>next-themes</strong> com estratégia de classe (<code>.dark</code> no html). Tokens semânticos no CSS garantem que um único toggle muda todas as superfícies, sem overrides manuais por componente.</>}
                </BodySm>
                <div className="mt-4 space-y-3">
                  {[
                    { token: '--bg',                    light: '#fafafa',  dark: '#121124' },
                    { token: '--fg',                    light: '#131226',  dark: '#ffffff' },
                    { token: '--color-surface-soft',    light: '#ececea',  dark: '#1a1836' },
                    { token: '--color-block-cream',     light: '#f4ecd6',  dark: '#1e1c31' },
                    { token: '--color-accent-magenta',  light: '#B4225E',  dark: '#B4225E' },
                  ].map(({ token, light, dark }) => (
                    <div key={token} className="flex flex-col gap-2 p-3 rounded-lg bg-surface-soft border border-border">
                      <code className="type-caption text-fg-subtle font-mono">{token}</code>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded border border-black/20 shrink-0" style={{ backgroundColor: light }} />
                          <span className="type-caption text-fg-subtle font-mono">{light}</span>
                        </div>
                        <span className="type-caption text-fg-subtle">→</span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded border border-white/20 shrink-0" style={{ backgroundColor: dark }} />
                          <span className="type-caption text-fg-subtle font-mono">{dark}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <BodySm>
                  {en
                    ? <>Dark mode respects the system preference (<code>prefers-color-scheme</code>) by default and persists the user&apos;s choice in localStorage via next-themes.</>
                    : <>O modo escuro respeita a preferência do sistema (<code>prefers-color-scheme</code>) por padrão e persiste a escolha do usuário no localStorage via next-themes.</>}
                </BodySm>
              </div>
            </div>
          </section>

          {/* ── 8. Aprendizados ──────────────────────────────── */}
          <Divider />
          <section aria-labelledby="final-heading" className="mb-16">
            <SectionLabel>{en ? '08 · Learnings' : '08 · Aprendizados'}</SectionLabel>
            <H2 id="final-heading">{en ? 'Treating your own portfolio as a product' : 'Tratar o próprio portfólio como produto'}</H2>
            <div className="space-y-4">
              <Body>
                {en
                  ? 'The biggest lesson from this project: designers tend to treat their own portfolio as a visual exercise. When treated as a product — with a defined user, hypotheses, grounded decisions, and iterations — the result is more coherent and harder to question.'
                  : 'A maior lição deste projeto: designers tendem a tratar o próprio portfólio como um exercício visual. Quando tratado como produto, com usuário definido, hipóteses, decisões embasadas e iterações, o resultado é mais coerente e mais difícil de questionar.'}
              </Body>
              <Body>
                {en
                  ? 'The design system was the most important decision. Without it, each component would be a local, inconsistent decision. With it, dark mode, accessibility, and responsiveness are a consequence of the system, not extra effort.'
                  : 'O design system foi a decisão mais importante. Sem ele, cada componente seria uma decisão local e inconsistente. Com ele, dark mode, acessibilidade e responsividade são consequência do sistema, não esforço extra.'}
              </Body>
              <Body>
                {en
                  ? 'This portfolio is a product in evolution, as any product should be.'
                  : 'Este portfólio é um produto em evolução, como qualquer produto deveria ser.'}
              </Body>
            </div>
          </section>

          </div>{/* fim col 2/3 */}

          {/* ══ Col 1/3 — Stack técnica (sidebar) ══════════ */}
          <aside aria-labelledby="stack-heading" className="lg:col-span-1 order-last">
            <div className="sticky top-24">
              <div className="rounded-[16px] border border-border overflow-hidden divide-y divide-border">
                <div className="px-5 py-4 bg-block-pink dark:bg-block-pink">
                  <p className="type-caption text-accent-magenta" id="stack-heading">
                    {en ? 'Stack & Tools' : 'Stack & Ferramentas'}
                  </p>
                </div>
                {stack.map(({ category, name, desc }) => (
                  <div key={name}>
                    {category && (
                      <div className="px-5 py-2 bg-surface-soft">
                        <p className="type-caption text-fg-subtle">{category}</p>
                      </div>
                    )}
                    <div className="px-5 py-4">
                      <p className="type-caption text-accent-magenta mb-1">{name}</p>
                      <p className="type-body-xs text-fg-muted leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          </div>{/* fim grid */}
        </div>

        <Contact />
      </div>
    </>
  );
}
