import type { Metadata } from 'next';
import { getExperience } from '@/lib/experience';
import { PrintButton } from '@/components/ui/PrintButton';

export const metadata: Metadata = {
  title: 'Currículo — Marcelle Rocha',
  robots: { index: false, follow: false },
};

const summary =
  'Product Designer com mais de 13 anos de atuação em produtos digitais. Especializada em UX Strategy, pesquisa com usuários e design de experiências B2B em SaaS, EdTech e e-commerce de larga escala. Histórico de redesenho de fluxos críticos, estruturação de design systems e validação de hipóteses orientadas a dados e comportamento do usuário.';

const skillSections = [
  {
    label: 'Design & UX',
    items: ['Figma', 'UI Design', 'UX Design', 'Design System', 'Arquitetura da Informação', 'Design de Fluxos', 'Acessibilidade'],
  },
  {
    label: 'Pesquisa',
    items: ['Entrevistas com Usuários', 'Testes de Usabilidade', 'Card Sorting', 'Análise Heurística', 'Benchmarking', 'Tree Testing'],
  },
  {
    label: 'Estratégia',
    items: ['CX Strategy', 'Consumer Insights', 'Estratégia de Produto', 'Facilitação', 'Design Thinking', 'Agile'],
  },
  {
    label: 'IA & Ferramentas',
    items: ['Plataformas com IA', 'Figma Make', 'Framer', 'Dev Mode'],
  },
  {
    label: 'Soft Skills',
    items: ['Comunicação', 'Storytelling', 'Liderança'],
  },
];

const education = [
  { name: 'UX e Design de Produtos Digitais', institution: 'PUC Minas' },
  { name: 'Gestão da Experiência do Consumidor', institution: 'ESPM' },
  { name: 'Consumer Insights e UX', institution: 'COPPEAD UFRJ' },
  { name: 'Comunicação Social', institution: 'Estácio' },
];

const certifications = [
  { name: 'Product Designer', institution: 'Mergo Escola de Design' },
  { name: 'UX Research · UX Metrics · UX Writing', institution: 'Mergo Escola de Design' },
  { name: 'Design de Serviço', institution: 'Mergo Escola de Design' },
  { name: 'Product Manager', institution: 'Product Arena' },
  { name: 'Acessibilidade Digital no CX', institution: 'ESPM' },
  { name: 'Design Thinking', institution: 'B2W Digital' },
  { name: 'Metodologias Ágeis', institution: 'FGV Online' },
  { name: 'Customer Success', institution: 'SEBRAE' },
  { name: 'IA para Gestão de Produtos', institution: 'PRAGMA' },
];

/* ── design tokens ──────────────────────────────────────── */
const C = {
  navy:    '#131226',
  magenta: '#B4225E',
  muted:   '#404040',
  subtle:  '#666666',
  border:  '#e0e0de',
};

/* ── how many experience items to show ─────────────────── */
const EXPERIENCE_LIMIT = 6;

export default async function CurriculoPage() {
  const allExperience = await getExperience();
  const experience = allExperience.slice(0, EXPERIENCE_LIMIT);

  return (
    <>
      <style>{`
        @media print {
          header,
          footer,
          [role="navigation"][aria-label="Barra de acessibilidade"] {
            display: none !important;
          }
          #main-content { padding-top: 0 !important; }
          @page { size: A4 portrait; margin: 12mm 14mm; }
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .cv-root {
            max-width: none !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          .avoid-break { break-inside: avoid; }
        }
        @media screen {
          .cv-root {
            max-width: 880px;
            margin: 2rem auto 4rem;
            padding: 3rem 3.5rem;
            background: #fafafa;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06);
            border-radius: 8px;
          }
        }
      `}</style>

      <PrintButton />
      <div className="cv-root" style={{ color: C.navy, fontFamily: 'var(--font-sans, system-ui)' }}>

        {/* ── Header ────────────────────────────────────────── */}
        <div style={{ borderBottom: `2px solid ${C.navy}`, paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem' }}>

            {/* Name + title + contact */}
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '27px', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.5px', margin: 0, color: C.navy }}>
                Marcelle Rocha
              </h1>
              <p style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '0.8px', textTransform: 'uppercase', color: C.magenta, marginTop: '6px', marginBottom: '10px' }}>
                Product Designer · UX Strategy
              </p>
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '10.5px', color: C.subtle }}>
                <span>marcelle.rdoss@gmail.com</span>
                <span style={{ color: C.border }}>·</span>
                <span>linkedin.com/in/marcelle-rocha-dos-santos</span>
                <span style={{ color: C.border }}>·</span>
                <span>Rio de Janeiro, RJ</span>
              </div>
            </div>

          </div>

          {/* Summary */}
          <p style={{ margin: '14px 0 0', fontSize: '11px', color: C.muted, lineHeight: 1.65, maxWidth: '680px' }}>
            {summary}
          </p>
        </div>

        {/* ── Body: two columns ─────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '195px 1fr', gap: '2.5rem', alignItems: 'start' }}>

          {/* ─── Left column ────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {skillSections.map(({ label, items }) => (
              <div key={label} className="avoid-break">
                <Label>{label}</Label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '7px' }}>
                  {items.map(skill => (
                    <span
                      key={skill}
                      style={{
                        fontSize: '9.5px',
                        color: C.muted,
                        border: `1px solid ${C.border}`,
                        borderRadius: '999px',
                        padding: '2px 8px',
                        lineHeight: 1.6,
                        display: 'inline-block',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="avoid-break">
              <Label>Formação</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '7px' }}>
                {education.map(item => (
                  <div key={item.name}>
                    <p style={{ margin: 0, fontSize: '10px', fontWeight: 520, color: C.navy, lineHeight: 1.4 }}>{item.name}</p>
                    <p style={{ margin: 0, fontSize: '10px', color: C.subtle, lineHeight: 1.3 }}>{item.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="avoid-break">
              <Label>Certificações</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginTop: '7px' }}>
                {certifications.map(item => (
                  <div key={item.name}>
                    <p style={{ margin: 0, fontSize: '10px', fontWeight: 520, color: C.navy, lineHeight: 1.4 }}>{item.name}</p>
                    <p style={{ margin: 0, fontSize: '10px', color: C.subtle, lineHeight: 1.3 }}>{item.institution}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ─── Right column: Experience ────────────────────── */}
          <div>
            <Label>Experiência Profissional</Label>
            <div style={{ marginTop: '10px' }}>
              {experience.map((item, i) => (
                <div
                  key={i}
                  className="avoid-break"
                  style={{
                    paddingTop: i === 0 ? 0 : '13px',
                    paddingBottom: '13px',
                    borderBottom: i < experience.length - 1 ? `1px solid ${C.border}` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '2px' }}>
                    <p style={{ margin: 0, fontSize: '11.5px', fontWeight: 560, color: C.navy, lineHeight: 1.35, letterSpacing: '-0.1px' }}>
                      {item.role.pt}
                    </p>
                    <p style={{ margin: 0, fontSize: '10px', color: C.magenta, whiteSpace: 'nowrap', flexShrink: 0, fontWeight: 400, paddingTop: '1px' }}>
                      {item.period}
                    </p>
                  </div>
                  <p style={{ margin: '0 0 5px', fontSize: '10px', color: C.subtle, fontWeight: 400, letterSpacing: '0.1px' }}>
                    {item.company}
                  </p>
                  <p style={{ margin: 0, fontSize: '10.5px', color: C.muted, lineHeight: 1.55 }}>
                    {item.description.pt}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Footer strip ──────────────────────────────────── */}
        <div style={{ marginTop: '1.75rem', paddingTop: '0.75rem', borderTop: `1px solid ${C.border}` }}>
          <p style={{ margin: 0, fontSize: '9px', color: '#bbbbbb', letterSpacing: '0.5px', textTransform: 'uppercase', textAlign: 'center' }}>
            marcellerocha.com.br · Portfólio completo disponível online
          </p>
        </div>

      </div>
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ margin: 0, fontSize: '9px', fontWeight: 400, letterSpacing: '0.9px', textTransform: 'uppercase', color: '#B4225E' }}>
      {children}
    </p>
  );
}
