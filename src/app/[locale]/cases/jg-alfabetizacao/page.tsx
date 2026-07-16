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
    title: locale === 'en' ? 'Jovens Gênios — Literacy System · Marcelle Rocha' : 'Jovens Gênios — Alfabetização · Marcelle Rocha',
    description: locale === 'en'
      ? 'Design of Jovens Gênios literacy system — pedagogical phases, BNCC proficiency matrix and question models for each transition phase.'
      : 'Design do sistema de alfabetização do Jovens Gênios — fases pedagógicas, matriz de proficiência BNCC e modelos de questão para cada fase de transição.',
    openGraph: {
      title: locale === 'en' ? 'Jovens Gênios — Literacy System' : 'Jovens Gênios — Alfabetização',
      description: locale === 'en' ? 'Phase system, proficiency matrix and question models for literacy at Jovens Gênios.' : 'Sistema de fases, matriz de proficiência e modelos de questão para alfabetização no Jovens Gênios.',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'article',
    },
  };
}

const ACCENT_BG   = 'var(--color-project-jg-alfabetizacao-bg)';
const ACCENT_TEXT = 'var(--color-project-jg-alfabetizacao-text)';

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

export default async function JgAlfabetizacaoPage({ params }: Props) {
  const { locale } = await params;
  const en = locale === 'en';
  const { prev, next } = getCaseNav('jg-alfabetizacao');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', en ? 'jg-alfabetizacao.en.md' : 'jg-alfabetizacao.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const sidebar = en
    ? [
        { label: 'Company',      content: 'Jovens Gênios' },
        { label: 'Context',      content: 'EdTech · B2B · B2Gov · Adaptive AI' },
        { label: 'Methods',      content: 'Documentary research (BNCC) · Teacher interviews · Benchmarking' },
        { label: 'Deliverables', content: 'Proficiency Matrix · Phase × Model coding system · Question models' },
      ]
    : [
        { label: 'Empresa',   content: 'Jovens Gênios' },
        { label: 'Contexto',  content: 'EdTech · B2B · B2Gov · IA Adaptativa' },
        { label: 'Métodos',   content: 'Pesquisa documental (BNCC) · Entrevistas com professoras · Benchmarking' },
        { label: 'Entregas',  content: 'Matriz de Proficiência · Sistema de codificação Fase × Modelo · Modelos de questão' },
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
            {en ? <>Literacy<br />system</> : <>Sistema de<br />alfabetização</>}
          </h1>

          <p className="type-body-lg text-fg-muted max-w-2xl">
            {en
              ? 'Design of the Jovens Gênios literacy phase system, pedagogical mapping of the four transition phases, proficiency matrix based on BNCC and question models adapted to each writing development level.'
              : 'Design do sistema de fases de alfabetização do Jovens Gênios, mapeamento pedagógico das quatro fases de transição, matriz de proficiência baseada na BNCC e modelos de questão adaptados a cada nível de desenvolvimento da escrita.'}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {(en
              ? ['UX Research', 'Pedagogical Architecture', 'Field Testing', 'Design System']
              : ['UX Research', 'Arquitetura Pedagógica', 'Testes em Campo', 'Design System']
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
              <Eyebrow>{en ? '01 · Progression' : '01 · Progressão'}</Eyebrow>
              <SectionHeading>{en ? 'Literacy mapped by school year — not by assumption' : 'Alfabetização mapeada por ano escolar — não por suposição'}</SectionHeading>
              <Body>
                {en
                  ? 'The first task was to make visible what pedagogy already knew but the product ignored: literacy isn\'t a binary state — it\'s a progression with identifiable milestones. The timeline mapped phases by school year and defined the transition criteria the product needed to respect to avoid treating a child in the syllabic phase the same way as one in the consolidated alphabetic phase.'
                  : 'O primeiro trabalho foi tornar visível o que a pedagogia já sabia mas o produto ignorava: a alfabetização não é um estado binário — é uma progressão com marcos identificáveis. A linha do tempo mapeou as fases por ano escolar e definiu os critérios de transição que o produto precisaria respeitar para não tratar uma criança em fase silábica da mesma forma que uma criança em fase alfabética consolidada.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-progressao.png"
              alt={en ? 'Literacy phases mapped by school year' : 'Fases de alfabetização mapeadas por ano escolar'}
              caption={en ? 'Literacy phases mapped by school year.' : 'Fases de alfabetização mapeadas por ano escolar.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '02 · Phases' : '02 · Fases'}</Eyebrow>
              <SectionHeading>{en ? 'Four phases that structured the entire product' : 'Quatro fases que estruturaram o produto inteiro'}</SectionHeading>
              <Body>
                {en
                  ? 'Pre-syllabic, Syllabic, Syllabic-alphabetic and Alphabetic — each phase has its own writing hypotheses, developing skills and appropriate activity types. The pedagogical map of the four phases was the document that aligned design, pedagogy and technology before any wireframe: without it, any screen would be a guess about what the child can do at that moment.'
                  : 'Pré-silábica, Silábica, Silábico-alfabética e Alfabética — cada fase tem hipóteses de escrita próprias, habilidades em desenvolvimento e tipos de atividade adequados. O mapa pedagógico das quatro fases foi o documento que alinhou design, pedagogia e tecnologia antes de qualquer wireframe: sem ele, qualquer tela seria uma suposição sobre o que a criança consegue fazer naquele momento.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-fases.png"
              alt={en ? 'Four literacy phases — pedagogical map' : 'Quatro fases de alfabetização — mapa pedagógico'}
              caption={en ? 'Four literacy phases — pedagogical map that structured the product.' : 'Quatro fases de alfabetização — mapa pedagógico que estruturou o produto.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '03 · Detailing' : '03 · Detalhamento'}</Eyebrow>
              <SectionHeading>{en ? 'Each phase with mapped activities and identified gaps' : 'Cada fase com atividades mapeadas e lacunas identificadas'}</SectionHeading>
              <Body>
                {en
                  ? 'Before any screen, each phase received a detailed slide with activities the product already offered, skills that needed to be covered and question types still missing. This mapping was what turned the gap list into a product backlog — with priority defined by development phase, not team preference.'
                  : 'Antes de qualquer tela, cada fase recebeu um slide de detalhamento com as atividades que o produto já oferecia, as habilidades que precisavam ser cobertas e os tipos de questão ainda ausentes. Esse mapeamento foi o que transformou a lista de lacunas em backlog de produto — com prioridade definida por fase de desenvolvimento, não por preferência do time.'}
              </Body>
            </div>
            <CaseCarousel
              images={[
                { src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-pre-silabico.png', alt: en ? 'Pre-syllabic phase — activities and gaps' : 'Fase Pré-silábica — atividades e lacunas' },
                { src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-silabico.png', alt: en ? 'Syllabic phase — activities and gaps' : 'Fase Silábica — atividades e lacunas' },
                { src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-alfabetico.png', alt: en ? 'Alphabetic phase — activities and gaps' : 'Fase Alfabética — atividades e lacunas' },
                { src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-ortografico.png', alt: en ? 'Orthographic phase — activities and gaps' : 'Fase Ortográfica — atividades e lacunas' },
              ]}
              caption={en ? 'Pre-syllabic, Syllabic, Orthographic and Alphabetic — mapped activities and identified gaps per phase' : 'Pré-silábica, Silábica, Ortográfica e Alfabética — atividades mapeadas e lacunas identificadas por fase'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '04 · Common language' : '04 · Linguagem comum'}</Eyebrow>
              <SectionHeading>{en ? 'A common language for three teams' : 'Uma linguagem comum para três times'}</SectionHeading>
              <Body>
                {en
                  ? 'The greatest risk in an interdisciplinary project is each area using different terms for the same thing — and nobody noticing until the product is wrong. The phase code table created a shared operational language: each phase received a unique identifier that design used in prototypes, pedagogy used in curriculum documentation and technology used in the database. One code, three contexts, zero ambiguity.'
                  : 'O maior risco em um projeto interdisciplinar é cada área usar termos diferentes para a mesma coisa — e ninguém perceber até o produto estar errado. A tabela de código de fases criou uma linguagem operacional compartilhada: cada fase recebeu um identificador único que design usava nos protótipos, pedagogia usava na documentação curricular e tecnologia usava no banco de dados. Um código, três contextos, zero ambiguidade.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-tabela-codigo-fases.png"
              alt={en ? 'Phase code table — shared operational language' : 'Tabela de código de fases — linguagem operacional compartilhada'}
              caption={en ? 'Phase code — shared operational language between design, pedagogy and technology.' : 'Código de fases — linguagem operacional compartilhada entre design, pedagogia e tecnologia.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '05 · Matrix' : '05 · Matriz'}</Eyebrow>
              <SectionHeading>{en ? 'All BNCC skills organized by transition phase' : 'Todas as habilidades da BNCC organizadas por fase de transição'}</SectionHeading>
              <Body>
                {en
                  ? 'The proficiency matrix crossed all Portuguese language skills provided in the BNCC with the four literacy phases. For each skill, the matrix indicates in which phase it should be introduced, in which it should be developing and in which it should be consolidated. This crossing was what ensured the product covered the curriculum without repeating what was already learned or requiring what wasn\'t yet mature.'
                  : 'A matriz de proficiência cruzou todas as habilidades de língua portuguesa previstas na BNCC com as quatro fases de alfabetização. Para cada habilidade, a matriz indica em qual fase ela deve ser introduzida, em qual deve estar em desenvolvimento e em qual deve estar consolidada. Esse cruzamento foi o que garantiu que o produto cobria o currículo sem repetir o que já estava aprendido nem exigir o que ainda não estava maduro.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-matriz-proficiencia.png"
              alt={en ? 'Proficiency matrix with BNCC skills by phase' : 'Matriz de proficiência com habilidades da BNCC por fase'}
              caption={en ? 'Proficiency matrix — all BNCC skills by transition phase.' : 'Matriz de proficiência — todas as habilidades da BNCC por fase de transição.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '06 · Model architecture' : '06 · Arquitetura de modelos'}</Eyebrow>
              <SectionHeading>{en ? 'The schema that organized all question models' : 'O esquema que organizou todos os modelos de questão'}</SectionHeading>
              <Body>
                {en
                  ? 'With the matrix defining what to cover, the next problem was how to cover it. The model schema mapped all possible question types, organized them by skill category and assigned a unique code to each model. This code was what allowed the content team to create activities and engineering to implement renderers without needing a meeting for each new question type.'
                  : 'Com a matriz definindo o que cobrir, o próximo problema era como cobrir. O esquema de modelos mapeou todos os tipos de questão possíveis, organizou-os por categoria de habilidade e atribuiu um código único a cada modelo. Esse código foi o que permitiu à equipe de conteúdo criar atividades e à engenharia implementar renderizadores sem precisar de uma reunião para cada novo tipo de questão.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-esquema-matriz-modelos.png"
              alt={en ? 'Question model matrix schema' : 'Esquema de matriz de modelos de questão'}
              caption={en ? 'Model schema — unique code per model, organized by skill category.' : 'Esquema de modelos — código único por modelo, organizado por categoria de habilidade.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '07 · Question models' : '07 · Modelos de questão'}</Eyebrow>
              <SectionHeading>{en ? 'One model, three phases, multiple variations' : 'Um modelo, três fases, múltiplas variações'}</SectionHeading>
              <Body>
                {en
                  ? 'Each question model was designed to work across more than one phase — what changes is the content and complexity level, not the interaction mechanic. Horizontal Ordering appears in three phases with increasing complexity: syllables in the syllabic phase, words in the syllabic-alphabetic, sentences in the alphabetic. The same interaction pattern covers three developmental stages without requiring three different implementations.'
                  : 'Cada modelo de questão foi desenhado para funcionar em mais de uma fase — o que muda é o conteúdo e o nível de complexidade, não a mecânica de interação. A Ordenação Horizontal aparece em três fases com complexidade crescente: sílabas na fase silábica, palavras na silábico-alfabética, frases na alfabética. O mesmo padrão de interação cobre três estágios de desenvolvimento sem exigir três implementações diferentes.'}
              </Body>
            </div>
            <CaseCarousel
              images={[
                { src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-ordenacao-horizontal.png', alt: en ? 'Horizontal Ordering — one model, three phases, multiple variations' : 'Ordenação Horizontal — um modelo, três fases, múltiplas variações' },
                { src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-multipla-escolha.png', alt: en ? 'Multiple Choice — variations by phase' : 'Múltipla Escolha — variações por fase' },
                { src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-correlacao-ordenacao-vertical.png', alt: en ? 'Correlation and Vertical Ordering' : 'Correlação e Ordenação Vertical' },
                { src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-ditado.png', alt: en ? 'Dictation model — listening and writing for different progression stages' : 'Modelo Ditado — escuta e escrita para diferentes fases da progressão' },
                { src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-producao-textual.png', alt: en ? 'Text Production — structured writing as final stage' : 'Produção Textual — escrita estruturada como etapa final' },
                { src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-motricidade.png', alt: en ? 'Handwriting — tracing and coordination as writing foundation' : 'Motricidade — traçado e coordenação como base da escrita' },
                { src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-abaco.png', alt: en ? 'Abacus — decimal numbering with visual support' : 'Ábaco — numeração decimal com suporte visual' },
                { src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-org-fases.png', alt: en ? 'Activities by phase — model distribution along the progression' : 'Atividades por fase — distribuição dos modelos ao longo da progressão' },
              ]}
              caption={en ? 'Ordering, Multiple Choice, Correlation, Dictation, Text Production, Handwriting, Abacus and Activities by phase' : 'Ordenação, Múltipla Escolha, Correlação, Ditado, Produção Textual, Motricidade, Ábaco e Atividades por fase'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '08 · Question models' : '08 · Modelos de questão'}</Eyebrow>
              <SectionHeading>{en ? 'From handwriting to text production — the full spectrum' : 'Da motricidade à produção textual — o espectro completo'}</SectionHeading>
              <Body>
                {en
                  ? 'The model system needed to cover from the most elementary skills — tracing and fine motor skills — to the most complex — structured text production. Each end of the spectrum required a different interaction solution: the handwriting model uses stroke tracking; text production uses an editor with linguistic scaffolding. Between the two, the abacus connects quantity and numerical symbol in a manipulable way.'
                  : 'O sistema de modelos precisava cobrir desde as habilidades mais elementares — traçado e motricidade fina — até as mais complexas — produção textual estruturada. Cada extremo do espectro exigiu uma solução de interação diferente: o modelo de motricidade usa rastreamento de traçado; a produção textual usa editor com andaime linguístico. Entre os dois, o ábaco conecta quantidade e símbolo numérico de forma manipulável.'}
              </Body>
            </div>
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '09 · Question models' : '09 · Modelos de questão'}</Eyebrow>
              <SectionHeading>{en ? 'Dictation — listening and writing for different stages' : 'Ditado — escuta e escrita para diferentes estágios'}</SectionHeading>
              <Body>
                {en
                  ? 'Dictation is one of the most traditional literacy activities — and one of the hardest to adapt digitally without losing its nature. The model was designed to work across different phases by adjusting the dictated unit — syllable, word or sentence — maintaining the same listening and recording mechanic. Activity organization by phase closes the system showing how each model is distributed along the progression.'
                  : 'O ditado é uma das atividades mais tradicionais da alfabetização — e uma das mais difíceis de adaptar digitalmente sem perder sua natureza. O modelo foi desenhado para funcionar em diferentes fases ajustando a unidade ditada — sílaba, palavra ou frase — mantendo a mesma mecânica de escuta e registro. A organização de atividades por fase fecha o sistema mostrando como cada modelo se distribui ao longo da progressão.'}
              </Body>
            </div>
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>{en ? 'Outcome' : 'Resultado'}</Eyebrow>
            <SectionHeading>{en ? 'A system the product understands — and children too' : 'Um sistema que o produto entende — e a criança também'}</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '4',       label: { pt: 'Fases com marcos pedagógicos e critérios de transição',                             en: 'Phases with pedagogical milestones and transition criteria' } },
                { stat: '9+',      label: { pt: 'Modelos de questão adaptados por fase de desenvolvimento',                          en: 'Question models adapted by development phase' } },
                { stat: '1 código', label: { pt: 'Operacional compartilhado entre design, pedagogia e tecnologia',                   en: 'Shared operational code between design, pedagogy and technology' } },
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
