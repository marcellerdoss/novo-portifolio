const ITEMS = [
  'UX Research', 'Product Design', 'Design System', 'Figma',
  'Entrevistas', 'Testes de Usabilidade', 'Prototipação',
  'IA Adaptativa', 'SaaS B2B', 'Card Sorting', 'Estratégia de Produto',
  'EdTech', 'E-commerce', 'Dev Mode', 'Framer', 'Acessibilidade',
];

const SEP = '·';

export function MarqueeStrip() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden bg-primary h-9 flex items-center"
    >
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: 'marquee 32s linear infinite' }}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-8 type-caption text-on-primary/70 shrink-0">
            {item}
            <span className="text-on-primary/30">{SEP}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
