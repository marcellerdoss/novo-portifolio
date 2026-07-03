import type { Metadata } from 'next';
import { About } from '@/components/sections/About';
import { AboutStats } from '@/components/sections/AboutStats';
import { Racional } from '@/components/sections/Racional';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { BackToTop } from '@/components/ui/BackToTop';
import { getExperience } from '@/lib/experience';

type Props = { params: Promise<{ locale: string }> };

const titles: Record<string, string> = {
  pt: 'Sobre | Marcelle Rocha',
  en: 'About | Marcelle Rocha',
};

const descriptions: Record<string, string> = {
  pt: 'Conheça Marcelle Rocha — Product Designer com foco em comportamento, estratégia e impacto.',
  en: 'Meet Marcelle Rocha — Product Designer focused on behavior, strategy, and impact.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] ?? titles.pt,
    description: descriptions[locale] ?? descriptions.pt,
  };
}

export default async function SobrePage() {
  const experience = await getExperience();

  return (
    <>
      <About />
      <AboutStats />
      <Racional />
      <Experience items={experience} />
      <Skills />
      <BackToTop />
    </>
  );
}
