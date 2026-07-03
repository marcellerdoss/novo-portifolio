'use client';

import { useEffect, useRef } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function PreloaderTestPage() {
  const startedRef = useRef(false);

  useEffect(() => {
    function initPreloader() {
      if (startedRef.current) return;
      startedRef.current = true;

      document.body.classList.add('loading');

      const svg = document.getElementById('mono-svg') as unknown as SVGSVGElement;
      const fillPath = document.getElementById('fill-path') as unknown as SVGPathElement;
      const revealRect = document.getElementById('reveal-rect') as unknown as SVGRectElement;
      const dot = document.getElementById('dot') as HTMLDivElement;
      const targetIcon = document.getElementById('target-icon') as HTMLDivElement;
      const preloader = document.getElementById('preloader') as HTMLDivElement;

      if (!svg || !fillPath || !revealRect || !dot || !targetIcon || !preloader) return;

      // 1. o preenchimento solido avanca da esquerda pra direita,
      //    revelando o monograma como um caminho unico
      revealRect.getBoundingClientRect();
      revealRect.style.transition = 'width 1.7s ease';
      requestAnimationFrame(() => {
        revealRect.setAttribute('width', '3184');
      });

      // 2. calcula a ponta direita (eixo X) e o ponto mais alto (eixo Y)
      //    do monograma, posiciona o ponto rosa alinhado ao topo das letras
      setTimeout(() => {
        const total = fillPath.getTotalLength();
        let rightTip = fillPath.getPointAtLength(0);
        let topPoint = fillPath.getPointAtLength(0);
        const steps = 300;
        for (let i = 0; i <= steps; i++) {
          const p = fillPath.getPointAtLength((total * i) / steps);
          if (p.x > rightTip.x) rightTip = p;
          if (p.y < topPoint.y) topPoint = p;
        }
        const rightPt = svg.createSVGPoint();
        rightPt.x = rightTip.x;
        rightPt.y = rightTip.y;
        const rightScreenPt = rightPt.matrixTransform(svg.getScreenCTM()!);

        const topPt = svg.createSVGPoint();
        topPt.x = rightTip.x;
        topPt.y = topPoint.y;
        const topScreenPt = topPt.matrixTransform(svg.getScreenCTM()!);

        const preRect = preloader.getBoundingClientRect();
        const tipX = rightScreenPt.x - preRect.left;
        const topY = topScreenPt.y - preRect.top;

        const dotRadius = 17;
        const dotX = tipX + 41;
        const dotY = topY + dotRadius;

        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
        targetIcon.style.left = dotX + 'px';
        targetIcon.style.top = dotY + 'px';

        dot.style.opacity = '1';
        dot.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
        dot.style.transform = 'translate(-50%, -50%) scale(1)';

        // 3. sem pausa: assim que o ponto surge, o alvo ja nasce dali
        //    e comeca a expandir num movimento continuo, cobrindo a tela
        setTimeout(() => {
          dot.style.transition = 'opacity 0.4s ease-out';
          dot.style.opacity = '0';

          targetIcon.style.transition = 'opacity 0.5s ease-out, transform 1.1s cubic-bezier(0.32, 0, 0.4, 1)';
          targetIcon.style.opacity = '1';
          targetIcon.style.transform = 'translate(-50%, -50%) scale(20)';
        }, 200);
      }, 1700);

      // 4. fecha o preloader e revela o site
      setTimeout(() => {
        preloader.classList.add('hide');
        document.body.classList.remove('loading');
        setTimeout(() => preloader.remove(), 600);
      }, 3200);
    }

    // window 'load' ja disparou se a navegacao foi client-side (SPA);
    // nesse caso, dispara na hora em vez de esperar um evento que nao vira
    if (document.readyState === 'complete') {
      initPreloader();
    } else {
      window.addEventListener('load', initPreloader);
    }

    return () => {
      window.removeEventListener('load', initPreloader);
      document.body.classList.remove('loading');
    };
  }, []);

  return (
    <>
      <div id="preloader">
        <svg id="mono-svg" viewBox="0 0 2584 1395" preserveAspectRatio="xMidYMid meet">
          <defs>
            <mask id="reveal-mask" maskUnits="userSpaceOnUse" x="-300" y="-300" width="3184" height="1995">
              <rect id="reveal-rect" x="-300" y="-300" width="0" height="1995" fill="#fff" />
            </mask>
          </defs>
          <path
            id="fill-path"
            d="M892.06 150.811C891.649 151.013 891.615 151.03 891.611 151.031C891.611 151.03 891.609 151.028 891.608 151.026C891.606 151.022 891.603 151.015 891.599 151.007C891.59 150.989 891.577 150.963 891.56 150.928C891.524 150.857 891.468 150.751 891.395 150.61C891.247 150.329 891.022 149.909 890.716 149.361C890.103 148.265 889.164 146.652 887.862 144.599C885.259 140.491 881.206 134.617 875.412 127.564C863.825 113.46 845.275 94.6415 817.441 75.8193C761.779 38.1784 668.956 0.5 520.368 0.5C371.77 0.50001 241.786 38.1832 148.966 104.09C56.8807 169.475 1.3715 262.635 0.509766 374.384L0.5 377.027V1281.89C0.5 1303.76 9.74141 1331.9 32.873 1354.58C55.9955 1377.26 93.0316 1394.5 148.677 1394.5C204.322 1394.5 241.358 1377.26 264.48 1354.59C287.612 1331.91 296.853 1303.77 296.854 1281.91V452.409C296.854 376.632 371.551 301.122 520.368 301.122C669.185 301.122 743.883 376.633 743.883 452.433V1281.91C743.883 1303.77 753.124 1331.91 776.256 1354.59C799.378 1377.26 836.415 1394.5 892.06 1394.5C947.705 1394.5 984.741 1377.26 1007.86 1354.59C1030.99 1331.91 1040.24 1303.77 1040.24 1281.91V452.409C1040.24 376.632 1114.93 301.122 1263.75 301.122C1412.57 301.122 1487.27 376.633 1487.27 452.433V1055.68C1487.27 1168.64 1533.66 1253.33 1603.24 1309.79C1672.82 1366.25 1765.63 1394.5 1858.46 1394.5C1951.29 1394.5 2044.09 1366.25 2113.68 1309.79C2183.26 1253.33 2229.65 1168.64 2229.65 1055.68V452.433C2229.65 395.712 2252.97 357.842 2292.62 334.183C2332.22 310.549 2388.09 301.122 2453.17 301.122C2485.69 301.122 2510.04 299.943 2528.28 296.418C2546.52 292.894 2558.59 287.037 2566.62 277.73C2574.65 268.418 2578.7 255.578 2580.73 237.941C2582.76 220.303 2582.76 197.95 2582.76 169.662C2582.76 141.345 2583.92 116.654 2583.34 95.4482C2582.76 74.2557 2580.43 56.6738 2573.52 42.6367C2559.72 14.6493 2527.5 0.500031 2453.17 0.5C2378.87 0.5 2248.86 14.6333 2137.45 68.7861C2026.05 122.928 1933.3 217.039 1933.3 377.027V1093.38C1933.3 1106.03 1929.56 1124.98 1918.34 1140.8C1907.09 1156.63 1888.36 1169.28 1858.46 1169.28C1828.56 1169.28 1809.82 1156.63 1798.58 1140.8C1787.36 1124.98 1783.62 1106.03 1783.62 1093.38V1093.38L1783.76 1055.68V377.027C1783.76 264.104 1728.11 169.99 1635.29 104.09C1542.48 38.1832 1412.49 0.5 1263.89 0.5C1115.31 0.5 1022.45 38.1784 966.749 75.8193C938.898 94.6415 920.33 113.46 908.729 127.564C902.929 134.617 898.87 140.491 896.263 144.599C894.959 146.652 894.019 148.265 893.405 149.361C893.098 149.91 892.874 150.33 892.726 150.611C892.652 150.752 892.597 150.858 892.561 150.929C892.543 150.964 892.529 150.991 892.521 151.008C892.516 151.016 892.513 151.022 892.511 151.026C892.51 151.028 892.509 151.03 892.509 151.031C892.508 151.032 892.507 151.031 892.06 150.811ZM892.06 150.811L892.508 151.032L892.06 151.94L891.611 151.032L892.06 150.811Z"
            mask="url(#reveal-mask)"
          />
        </svg>

        <div id="dot" />

        <svg id="target-icon" viewBox="0 0 480 480">
          <rect className="target-outer" x="216" y="0" width="48" height="90" rx="24" />
          <rect className="target-outer" x="216" y="390" width="48" height="90" rx="24" />
          <rect className="target-outer" x="0" y="216" width="90" height="48" rx="24" />
          <rect className="target-outer" x="390" y="216" width="90" height="48" rx="24" />
          <circle className="target-outer" cx="240" cy="240" r="240" />
          <circle className="target-mid" cx="240" cy="240" r="170" />
          <circle className="target-inner" cx="240" cy="240" r="130" />
          <circle className="target-mid" cx="240" cy="240" r="90" />
        </svg>
      </div>

      {/* Conteudo simplificado da home real, so pra ver o preloader coordenando com o layout de verdade */}
      <header className="sticky top-0 z-30 bg-bg border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/social/logo-header-marcelle-rocha-navy.svg"
            alt="Marcelle Rocha"
            className="dark:hidden"
            style={{ width: 'auto', height: '28px' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/social/logo-header-marcelle-rocha-light.svg"
            alt="Marcelle Rocha"
            className="hidden dark:block"
            style={{ width: 'auto', height: '28px' }}
          />
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6 text-sm text-fg-muted">
              <span>Cases</span>
              <span>Racional</span>
              <span>Currículo</span>
            </nav>
            <ThemeToggle ariaLabel="Alternar tema" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20 flex flex-col gap-4">
        <span className="text-sm font-medium text-accent-magenta">Oi, eu sou a Marcelle 👋</span>
        <h1 className="text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.05] tracking-[-2px] font-extrabold text-navy-600 dark:text-navy-200">
          Design centrado em comportamento e decisão
        </h1>
        <p className="max-w-[36rem] text-fg-muted">
          Esta é a página de teste do preloader — o conteúdo real da home carrega aqui embaixo assim
          que a animação termina, pra você ver os dois coordenados.
        </p>
        <p className="max-w-[36rem] text-sm text-fg-subtle">
          Use o botão de sol/lua no canto superior direito pra trocar de tema — depois é só recarregar
          a página pra ver o preloader animando na cor escolhida.
        </p>
      </main>

      <style>{`
        :root {
          --preloader-ink: var(--color-primary, #131226);
          --preloader-bg: var(--bg, #FEF4EF);
          --preloader-magenta: var(--color-accent-magenta, #B4225E);
          /* alvo: aneis claros que se confundem com o fundo da pagina ao expandir */
          --preloader-target-outer: #FBEDE9;
          --preloader-target-mid: #FEF4EF;
          --preloader-target-inner: #FCD9E8;
        }

        /* dark mode — monograma na cor do logo bege, ponto magenta inalterado,
           alvo migra do rosa/creme pros azuis da paleta (navy-600 / navy-800) */
        .dark {
          --preloader-ink: #FEF7ED;
          --preloader-target-outer: var(--color-navy-600, #38347E);
          --preloader-target-mid: var(--bg, #121124);
          --preloader-target-inner: var(--color-navy-800, #211F4A);
        }

        body.loading {
          overflow: hidden;
        }

        #preloader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: var(--preloader-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.6s ease;
        }

        #preloader.hide {
          opacity: 0;
          pointer-events: none;
        }

        #mono-svg {
          width: clamp(160px, 55vw, 300px);
          height: auto;
          overflow: visible;
        }

        #fill-path {
          fill: var(--preloader-ink);
        }

        /* ponto magenta que aparece na ponta do monograma antes de
           se transformar no alvo */
        #dot {
          position: absolute;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--preloader-magenta);
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.6);
          pointer-events: none;
        }

        #target-icon {
          position: absolute;
          width: 90px;
          height: 90px;
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.15);
          pointer-events: none;
        }

        #target-icon .target-outer { fill: var(--preloader-target-outer); }
        #target-icon .target-mid { fill: var(--preloader-target-mid); }
        #target-icon .target-inner { fill: var(--preloader-target-inner); }
      `}</style>
    </>
  );
}
