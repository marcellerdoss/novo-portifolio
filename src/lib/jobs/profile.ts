import experienceData from '../../../content/experience.json';
import type { ExperienceItem } from '@/lib/types';

export function buildProfileText(): string {
  const skills: Record<string, string[]> = {
    'Design & UX': ['Figma', 'UI Design', 'UX Design', 'Design System', 'Arquitetura da Informação', 'Design de Fluxos', 'Acessibilidade'],
    'Pesquisa': ['Entrevistas com Usuários', 'Testes de Usabilidade', 'Card Sorting', 'Análise Heurística', 'Benchmarking', 'Tree Testing'],
    'Estratégia': ['CX Strategy', 'Consumer Insights', 'Estratégia de Produto', 'Facilitação', 'Design Thinking', 'Agile'],
    'IA & Ferramentas': ['Plataformas com IA', 'Figma Make', 'Claude Code', 'Claude Design'],
    'Soft Skills': ['Comunicação', 'Storytelling', 'Liderança'],
  };

  const education = [
    'UX e Design de Produtos Digitais — PUC Minas',
    'Gestão da Experiência do Consumidor — ESPM',
    'Consumer Insights e UX — COPPEAD UFRJ',
    'Comunicação Social — Estácio',
  ];

  const certifications = [
    'Product Designer — Mergo Escola de Design',
    'UX Research · UX Metrics · UX Writing — Mergo Escola de Design',
    'Design de Serviço — Mergo Escola de Design',
    'Product Manager — Product Arena',
    'Acessibilidade Digital no CX — ESPM',
    'Design Thinking — B2W Digital',
    'Metodologias Ágeis — FGV Online',
    'Customer Success — SEBRAE',
    'IA para Gestão de Produtos — PRAGMA',
  ];

  const exp = experienceData as ExperienceItem[];

  const experienceLines = exp
    .map((e: ExperienceItem) => `- ${e.role.pt} @ ${e.company} (${e.period}): ${e.description.pt}`)
    .join('\n');

  const skillLines = Object.entries(skills)
    .map(([cat, items]) => `${cat}: ${items.join(', ')}`)
    .join('\n');

  return `# Perfil Profissional: Marcelle Rocha

## Resumo
Product Designer com mais de 13 anos de atuação em produtos digitais. Especializada em UX Strategy, pesquisa com usuários e design de experiências B2B em SaaS, EdTech e e-commerce de larga escala. Histórico de redesenho de fluxos críticos, estruturação de design systems e validação de hipóteses orientadas a dados e comportamento do usuário.
Localização: Rio de Janeiro, RJ

## Competências
${skillLines}

## Experiência Profissional
${experienceLines}

## Formação
${education.join('\n')}

## Certificações
${certifications.join('\n')}`;
}
