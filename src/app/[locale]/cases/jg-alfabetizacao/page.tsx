import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
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
    title: 'Jovens Gênios — Alfabetização · Marcelle Rocha',
    description:
      'Design do sistema de alfabetização do Jovens Gênios — fases pedagógicas, matriz de proficiência BNCC e modelos de questão para cada fase de transição.',
    openGraph: {
      title: 'Jovens Gênios — Alfabetização',
      description: 'Sistema de fases, matriz de proficiência e modelos de questão para alfabetização no Jovens Gênios.',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'article',
    },
  };
}

const ACCENT_BG   = 'var(--color-project-jg-alfabetizacao-bg)';
const ACCENT_TEXT = 'var(--color-project-jg-alfabetizacao-text)';

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
function CaseImg({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="space-y-2">
      <Image src={src} alt={alt} width={1200} height={800} className="w-full h-auto rounded-xl border border-border" />
      {caption && <figcaption className="type-caption text-fg-subtle mt-1">{caption}</figcaption>}
    </figure>
  );
}
function CaseImgPair({ a, b }: { a: { src: string; alt: string; caption?: string }; b: { src: string; alt: string; caption?: string } }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CaseImg {...a} />
      <CaseImg {...b} />
    </div>
  );
}

const sidebar = [
  { label: 'Empresa', content: 'Jovens Gênios' },
  { label: 'Período', content: 'ago 2022 – jul 2024' },
  { label: 'Papel', content: 'Product Designer · UX Research' },
  { label: 'Contexto', content: 'EdTech · B2B · B2Gov · IA Adaptativa' },
  { label: 'Métodos', content: 'Pesquisa documental (BNCC) · Entrevistas com professoras · Benchmarking' },
  { label: 'Entregas', content: 'Matriz de Proficiência · Sistema de codificação Fase × Modelo · Modelos de questão' },
];

export default async function JgAlfabetizacaoPage() {
  const { prev, next } = getCaseNav('jg-alfabetizacao');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'jg-alfabetizacao.md');
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
            className="inline-flex items-center gap-2 px-5 py-2 type-body-sm border border-accent-magenta text-accent-magenta rounded-pill bg-transparent hover:bg-accent-magenta/10 active:scale-[0.97] transition-all duration-150 mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg"
          >
            ← Todos os cases
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="type-caption rounded-full px-3 py-1.5 leading-none" style={{ backgroundColor: ACCENT_BG, color: ACCENT_TEXT }}>
              Produto Educacional · Alfabetização
            </span>
            <span className="type-caption text-fg-subtle">2024</span>
            <span className="type-caption text-fg-subtle">Jovens Gênios</span>
          </div>

          <h1 className="type-display-lg text-fg mb-6">
            Sistema de<br />alfabetização
          </h1>

          <p className="type-body-lg text-fg-muted max-w-2xl">
            Design do sistema de fases de alfabetização do Jovens Gênios —
            mapeamento pedagógico das quatro fases de transição, matriz de
            proficiência baseada na BNCC e modelos de questão adaptados a
            cada nível de desenvolvimento da escrita.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {['UX Research', 'Arquitetura Pedagógica', 'Testes em Campo', 'Design System'].map(tag => (
              <span key={tag} className="type-caption rounded-full border border-border px-3 py-1.5 leading-none text-fg-subtle">
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
              <Eyebrow>01 · Progressão</Eyebrow>
              <SectionHeading>Alfabetização mapeada por ano escolar — não por suposição</SectionHeading>
              <Body>
                O primeiro trabalho foi tornar visível o que a pedagogia já
                sabia mas o produto ignorava: a alfabetização não é um
                estado binário — é uma progressão com marcos identificáveis.
                A linha do tempo mapeou as fases por ano escolar e definiu
                os critérios de transição que o produto precisaria respeitar
                para não tratar uma criança em fase silábica da mesma forma
                que uma criança em fase alfabética consolidada.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-progressao.png"
              alt="Fases de alfabetização mapeadas por ano escolar"
              caption="Fases de alfabetização mapeadas por ano escolar."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>02 · Fases</Eyebrow>
              <SectionHeading>Quatro fases que estruturaram o produto inteiro</SectionHeading>
              <Body>
                Pré-silábica, Silábica, Silábico-alfabética e Alfabética —
                cada fase tem hipóteses de escrita próprias, habilidades em
                desenvolvimento e tipos de atividade adequados. O mapa
                pedagógico das quatro fases foi o documento que alinhou
                design, pedagogia e tecnologia antes de qualquer wireframe:
                sem ele, qualquer tela seria uma suposição sobre o que a
                criança consegue fazer naquele momento.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-fases.png"
              alt="Quatro fases de alfabetização — mapa pedagógico"
              caption="Quatro fases de alfabetização — mapa pedagógico que estruturou o produto."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>03 · Detalhamento</Eyebrow>
              <SectionHeading>Cada fase com atividades mapeadas e lacunas identificadas</SectionHeading>
              <Body>
                Antes de qualquer tela, cada fase recebeu um slide de
                detalhamento com as atividades que o produto já oferecia,
                as habilidades que precisavam ser cobertas e os tipos de
                questão ainda ausentes. Esse mapeamento foi o que transformou
                a lista de lacunas em backlog de produto — com prioridade
                definida por fase de desenvolvimento, não por preferência
                do time.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-pre-silabico.png"
              alt="Fase Pré-silábica com atividades e lacunas"
              caption="Fase Pré-silábica — atividades e lacunas antes de qualquer tela"
            />
            <CaseImgPair
              a={{ src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-silabico.png', alt: 'Fase Silábica', caption: 'Fase Silábica' }}
              b={{ src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-alfabetico.png', alt: 'Fase Alfabética', caption: 'Fase Alfabética' }}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>04 · Linguagem comum</Eyebrow>
              <SectionHeading>Uma linguagem comum para três times</SectionHeading>
              <Body>
                O maior risco em um projeto interdisciplinar é cada área
                usar termos diferentes para a mesma coisa — e ninguém
                perceber até o produto estar errado. A tabela de código de
                fases criou uma linguagem operacional compartilhada: cada
                fase recebeu um identificador único que design usava nos
                protótipos, pedagogia usava na documentação curricular e
                tecnologia usava no banco de dados. Um código, três contextos,
                zero ambiguidade.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-tabela-codigo-fases.png"
              alt="Tabela de código de fases — linguagem operacional compartilhada"
              caption="Código de fases — linguagem operacional compartilhada entre design, pedagogia e tecnologia."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>05 · Matriz</Eyebrow>
              <SectionHeading>Todas as habilidades da BNCC organizadas por fase de transição</SectionHeading>
              <Body>
                A matriz de proficiência cruzou todas as habilidades de
                língua portuguesa previstas na BNCC com as quatro fases de
                alfabetização. Para cada habilidade, a matriz indica em qual
                fase ela deve ser introduzida, em qual deve estar em
                desenvolvimento e em qual deve estar consolidada. Esse
                cruzamento foi o que garantiu que o produto cobria o
                currículo sem repetir o que já estava aprendido nem exigir
                o que ainda não estava maduro.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-matriz-proficiencia.png"
              alt="Matriz de proficiência com habilidades da BNCC por fase"
              caption="Matriz de proficiência — todas as habilidades da BNCC por fase de transição."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>06 · Arquitetura de modelos</Eyebrow>
              <SectionHeading>O esquema que organizou todos os modelos de questão</SectionHeading>
              <Body>
                Com a matriz definindo o que cobrir, o próximo problema era
                como cobrir. O esquema de modelos mapeou todos os tipos de
                questão possíveis, organizou-os por categoria de habilidade
                e atribuiu um código único a cada modelo. Esse código foi
                o que permitiu à equipe de conteúdo criar atividades e à
                engenharia implementar renderizadores sem precisar de uma
                reunião para cada novo tipo de questão.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-esquema-matriz-modelos.png"
              alt="Esquema de matriz de modelos de questão"
              caption="Esquema de modelos — código único por modelo, organizado por categoria de habilidade."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>07 · Modelos de questão</Eyebrow>
              <SectionHeading>Um modelo, três fases, múltiplas variações</SectionHeading>
              <Body>
                Cada modelo de questão foi desenhado para funcionar em mais
                de uma fase — o que muda é o conteúdo e o nível de
                complexidade, não a mecânica de interação. A Ordenação
                Horizontal aparece em três fases com complexidade crescente:
                sílabas na fase silábica, palavras na silábico-alfabética,
                frases na alfabética. O mesmo padrão de interação cobre
                três estágios de desenvolvimento sem exigir três
                implementações diferentes.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-ordenacao-horizontal.png"
              alt="Modelo de ordenação horizontal em três fases"
              caption="Ordenação Horizontal — um modelo, três fases, múltiplas variações"
            />
            <CaseImgPair
              a={{ src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-multipla-escolha.png', alt: 'Modelo de múltipla escolha', caption: 'Múltipla Escolha' }}
              b={{ src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-correlacao-ordenacao-vertical.png', alt: 'Modelo de correlação e ordenação vertical', caption: 'Correlação / Ordenação Vertical' }}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>08 · Modelos de questão</Eyebrow>
              <SectionHeading>Da motricidade à produção textual — o espectro completo</SectionHeading>
              <Body>
                O sistema de modelos precisava cobrir desde as habilidades
                mais elementares — traçado e motricidade fina — até as mais
                complexas — produção textual estruturada. Cada extremo do
                espectro exigiu uma solução de interação diferente: o modelo
                de motricidade usa rastreamento de traçado; a produção
                textual usa editor com andaime linguístico. Entre os dois,
                o ábaco conecta quantidade e símbolo numérico de forma
                manipulável.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-producao-textual.png"
              alt="Modelo de produção textual como etapa final"
              caption="Produção Textual — escrita estruturada como etapa final"
            />
            <CaseImgPair
              a={{ src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-motricidade.png', alt: 'Modelo de motricidade', caption: 'Motricidade' }}
              b={{ src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-abaco.png', alt: 'Modelo de ábaco', caption: 'Ábaco' }}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>09 · Modelos de questão</Eyebrow>
              <SectionHeading>Ditado — escuta e escrita para diferentes estágios</SectionHeading>
              <Body>
                O ditado é uma das atividades mais tradicionais da
                alfabetização — e uma das mais difíceis de adaptar
                digitalmente sem perder sua natureza. O modelo foi desenhado
                para funcionar em diferentes fases ajustando a unidade
                ditada — sílaba, palavra ou frase — mantendo a mesma
                mecânica de escuta e registro. A organização de atividades
                por fase fecha o sistema mostrando como cada modelo se
                distribui ao longo da progressão.
              </Body>
            </div>
            <CaseImgPair
              a={{ src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-ditado.png', alt: 'Modelo de ditado para diferentes fases', caption: 'Ditado — escuta e escrita para diferentes fases' }}
              b={{ src: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-org-fases.png', alt: 'Organização de atividades por fase', caption: 'Atividades por fase' }}
            />
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>Resultado</Eyebrow>
            <SectionHeading>Um sistema que o produto entende — e a criança também</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '4', label: 'Fases com marcos pedagógicos e critérios de transição' },
                { stat: '9+', label: 'Modelos de questão adaptados por fase de desenvolvimento' },
                { stat: '1 código', label: 'Operacional compartilhado entre design, pedagogia e tecnologia' },
              ].map(({ stat, label }) => (
                <div key={label} className="bg-block-mint border border-border rounded-[16px] p-8">
                  <p className="type-headline text-fg mb-2">{stat}</p>
                  <p className="type-body-sm text-fg-muted">{label}</p>
                </div>
              ))}
            </div>
          </section>

        </CaseOverviewLayout>
      </CasePageShell>
    </div>
  );
}
