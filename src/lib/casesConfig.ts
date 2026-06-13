export type CaseNavItem = {
  slug: string;
  title: { pt: string; en: string };
  company: string;
  href: string;
};

export const casesOrder: CaseNavItem[] = [
  {
    slug: 'sellbie-redesign',
    title: { pt: 'Redesign do core de campanhas', en: 'Campaign core redesign' },
    company: 'Sellbie',
    href: '/cases/sellbie-redesign',
  },
  {
    slug: 'sellbie-jornadas',
    title: { pt: 'Jornadas de automação multicanal', en: 'Multichannel automation journeys' },
    company: 'Sellbie',
    href: '/cases/sellbie-jornadas',
  },
  {
    slug: 'jg-alfabetizacao',
    title: { pt: 'Sistema de alfabetização', en: 'Literacy system' },
    company: 'Jovens Gênios',
    href: '/cases/jg-alfabetizacao',
  },
  {
    slug: 'jg-central-ajuda',
    title: { pt: 'Central de Ajuda por perfil', en: 'Profile-segmented Help Center' },
    company: 'Jovens Gênios',
    href: '/cases/jg-central-ajuda',
  },
  {
    slug: 'sellbie-metricas',
    title: { pt: 'Métricas e Analytics', en: 'Metrics & Analytics' },
    company: 'Sellbie',
    href: '/cases/sellbie-metricas',
  },
  {
    slug: 'sellbie-crm',
    title: { pt: 'CRM e Contatos', en: 'CRM & Contacts' },
    company: 'Sellbie',
    href: '/cases/sellbie-crm',
  },
  {
    slug: 'sellbie-cashback',
    title: { pt: 'Cashback e Fidelidade', en: 'Cashback & Loyalty' },
    company: 'Sellbie',
    href: '/cases/sellbie-cashback',
  },
  {
    slug: 'sellbie-arq-info',
    title: { pt: 'Arquitetura da informação', en: 'Information Architecture' },
    company: 'Sellbie',
    href: '/cases/sellbie-arq-info',
  },
];

export function getCaseNav(slug: string): {
  prev: CaseNavItem | undefined;
  next: CaseNavItem | undefined;
} {
  const idx = casesOrder.findIndex((c) => c.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  return {
    prev: idx > 0 ? casesOrder[idx - 1] : undefined,
    next: idx < casesOrder.length - 1 ? casesOrder[idx + 1] : undefined,
  };
}
