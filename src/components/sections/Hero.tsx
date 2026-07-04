'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { fadeInUp, stagger } from '@/lib/animations';

function MrVector({ className }: { className?: string }) {
  return (
    <svg
      width="2584"
      height="1395"
      viewBox="0 0 2584 1395"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M892.06 150.811C891.649 151.013 891.615 151.03 891.611 151.031C891.611 151.03 891.609 151.028 891.608 151.026C891.606 151.022 891.603 151.015 891.599 151.007C891.59 150.989 891.577 150.963 891.56 150.928C891.524 150.857 891.468 150.751 891.395 150.61C891.247 150.329 891.022 149.909 890.716 149.361C890.103 148.265 889.164 146.652 887.862 144.599C885.259 140.491 881.206 134.617 875.412 127.564C863.825 113.46 845.275 94.6415 817.441 75.8193C761.779 38.1784 668.956 0.5 520.368 0.5C371.77 0.50001 241.786 38.1832 148.966 104.09C56.8807 169.475 1.3715 262.635 0.509766 374.384L0.5 377.027V1281.89C0.5 1303.76 9.74141 1331.9 32.873 1354.58C55.9955 1377.26 93.0316 1394.5 148.677 1394.5C204.322 1394.5 241.358 1377.26 264.48 1354.59C287.612 1331.91 296.853 1303.77 296.854 1281.91V452.409C296.854 376.632 371.551 301.122 520.368 301.122C669.185 301.122 743.883 376.633 743.883 452.433V1281.91C743.883 1303.77 753.124 1331.91 776.256 1354.59C799.378 1377.26 836.415 1394.5 892.06 1394.5C947.705 1394.5 984.741 1377.26 1007.86 1354.59C1030.99 1331.91 1040.24 1303.77 1040.24 1281.91V452.409C1040.24 376.632 1114.93 301.122 1263.75 301.122C1412.57 301.122 1487.27 376.633 1487.27 452.433V1055.68C1487.27 1168.64 1533.66 1253.33 1603.24 1309.79C1672.82 1366.25 1765.63 1394.5 1858.46 1394.5C1951.29 1394.5 2044.09 1366.25 2113.68 1309.79C2183.26 1253.33 2229.65 1168.64 2229.65 1055.68V452.433C2229.65 395.712 2252.97 357.842 2292.62 334.183C2332.22 310.549 2388.09 301.122 2453.17 301.122C2485.69 301.122 2510.04 299.943 2528.28 296.418C2546.52 292.894 2558.59 287.037 2566.62 277.73C2574.65 268.418 2578.7 255.578 2580.73 237.941C2582.76 220.303 2582.76 197.95 2582.76 169.662C2582.76 141.345 2583.92 116.654 2583.34 95.4482C2582.76 74.2557 2580.43 56.6738 2573.52 42.6367C2559.72 14.6493 2527.5 0.500031 2453.17 0.5C2378.87 0.5 2248.86 14.6333 2137.45 68.7861C2026.05 122.928 1933.3 217.039 1933.3 377.027V1093.38C1933.3 1106.03 1929.56 1124.98 1918.34 1140.8C1907.09 1156.63 1888.36 1169.28 1858.46 1169.28C1828.56 1169.28 1809.82 1156.63 1798.58 1140.8C1787.36 1124.98 1783.62 1106.03 1783.62 1093.38V1093.38L1783.76 1055.68V377.027C1783.76 264.104 1728.11 169.99 1635.29 104.09C1542.48 38.1832 1412.49 0.5 1263.89 0.5C1115.31 0.5 1022.45 38.1784 966.749 75.8193C938.898 94.6415 920.33 113.46 908.729 127.564C902.929 134.617 898.87 140.491 896.263 144.599C894.959 146.652 894.019 148.265 893.405 149.361C893.098 149.91 892.874 150.33 892.726 150.611C892.652 150.752 892.597 150.858 892.561 150.929C892.543 150.964 892.529 150.991 892.521 151.008C892.516 151.016 892.513 151.022 892.511 151.026C892.51 151.028 892.509 151.03 892.509 151.031C892.508 151.032 892.507 151.031 892.06 150.811ZM892.06 150.811L892.508 151.032L892.06 151.94L891.611 151.032L892.06 150.811Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hero() {
  const t = useTranslations('hero');

  const headline2 = t('headline_2');
  const [headline2First, ...headline2Rest] = headline2.split(' ');
  const headline2Remainder = headline2Rest.join(' ');

  return (
    <section
      id="home"
      data-label="Início"
      aria-label="Apresentação"
      className="relative min-h-screen flex flex-col bg-bg overflow-hidden pt-12 md:pt-16 2xl:pt-24"
    >
      {/* Background vector — mr monogram at 20% opacity */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <MrVector className="h-screen w-auto opacity-20 text-[#efd4d4] dark:text-navy-800" />
      </div>

      <motion.div
        className="relative max-w-6xl mx-auto px-6 w-full flex flex-col gap-6 pt-6 pb-16"
        variants={stagger}
        initial={false}
        animate="visible"
      >
        {/* Grid: 3fr | 2fr — todos os itens com placement explícito */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 gap-y-6 md:grid-cols-[3fr_2fr] md:gap-x-12 md:gap-y-8"
        >
          {/* Caption — col 1, row 1 */}
          <span className="type-caption text-accent-magenta md:col-start-1 md:row-start-1">
            {t('greeting')}
          </span>

          {/* Headline — col 1, row 2 (spans as colunas p/ caber em 2 linhas no desktop) */}
          <h1 className="text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.05] tracking-[-2px] md:col-start-1 md:col-span-2 md:row-start-2">
            <span className="block font-bold text-navy-600 dark:text-navy-200">
              {t('headline_1')}
            </span>
            <span className="block font-extrabold">
              <span className="text-navy-600 dark:text-navy-200">{headline2First}</span>
              {headline2Remainder && (
                <span className="text-accent-magenta"> {headline2Remainder}</span>
              )}
            </span>
          </h1>

          {/* Description — col 2, row 3 (abaixo do headline, mesmo X) */}
          <p className="type-body text-fg-muted md:col-start-2 md:row-start-3">
            {t('description')}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-fg-subtle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
