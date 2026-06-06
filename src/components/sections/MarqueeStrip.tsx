const ITEMS = [
  'UX Strategy', 'UX Design', 'UX Research', 'Product Design',
  'CX', 'E-commerce', 'Omnichannel', 'IA', 'Vibe Coding',
  'Figma', 'Design System', 'Entrevistas', 'Testes de Usabilidade',
  'Card Sorting', 'Acessibilidade', 'Figma Make',
];

const SEP = '·';

export function MarqueeStrip() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden bg-accent-magenta h-9 flex items-center"
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
