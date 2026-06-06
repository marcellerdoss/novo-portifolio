export type CaseNavItem = {
  slug: string;
  title: string;
  company: string;
  href: string;
};

export const casesOrder: CaseNavItem[] = [
  {
    slug: 'sellbie-redesign',
    title: 'Redesign do core de campanhas',
    company: 'Sellbie',
    href: '/cases/sellbie-redesign',
  },
  {
    slug: 'sellbie-jornadas',
    title: 'Jornadas de automação multicanal',
    company: 'Sellbie',
    href: '/cases/sellbie-jornadas',
  },
  {
    slug: 'jg-alfabetizacao',
    title: 'Sistema de alfabetização',
    company: 'Jovens Gênios',
    href: '/cases/jg-alfabetizacao',
  },
  {
    slug: 'jg-central-ajuda',
    title: 'Central de Ajuda por perfil',
    company: 'Jovens Gênios',
    href: '/cases/jg-central-ajuda',
  },
  {
    slug: 'sellbie-arq-info',
    title: 'Arquitetura da informação',
    company: 'Sellbie',
    href: '/cases/sellbie-arq-info',
  },
  {
    slug: 'sellbie-metricas',
    title: 'Métricas e Analytics',
    company: 'Sellbie',
    href: '/cases/sellbie-metricas',
  },
  {
    slug: 'sellbie-crm',
    title: 'CRM e Contatos',
    company: 'Sellbie',
    href: '/cases/sellbie-crm',
  },
  {
    slug: 'sellbie-cashback',
    title: 'Cashback e Fidelidade',
    company: 'Sellbie',
    href: '/cases/sellbie-cashback',
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
