import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import Image from 'next/image';
import { CaseMdxCarousel } from './CaseMdxCarousel';

interface CarouselData {
  images: { src: string; alt: string }[];
  caption?: string;
}

type Segment =
  | { type: 'md'; content: string }
  | { type: 'carousel'; data: CarouselData; key: number };

function splitSource(source: string): Segment[] {
  const segments: Segment[] = [];
  const re = /<Carousel[\s\S]*?\/>/g;
  let last = 0;
  let carouselIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(source)) !== null) {
    if (m.index > last) {
      segments.push({ type: 'md', content: source.slice(last, m.index) });
    }

    const block = m[0];
    const imagesMatch = block.match(/images=\{(\[[\s\S]*?\])\}/);
    const captionMatch = block.match(/caption="([^"]*)"/);

    if (imagesMatch) {
      try {
        const images = JSON.parse(imagesMatch[1]) as { src: string; alt: string }[];
        segments.push({
          type: 'carousel',
          data: { images, caption: captionMatch?.[1] },
          key: carouselIndex++,
        });
      } catch {
        // skip malformed carousel
      }
    }

    last = m.index + m[0].length;
  }

  if (last < source.length) {
    segments.push({ type: 'md', content: source.slice(last) });
  }

  return segments;
}

function MdxImg({ src, alt }: { src?: string; alt?: string; [key: string]: unknown }) {
  if (!src) return null;
  return (
    <figure className="my-6 space-y-2 max-w-[552px] mx-auto">
      <div className="bg-white rounded-2xl p-2 shadow-sm ring-1 ring-black/5">
        <div className="rounded-[8px] overflow-hidden">
          <Image
            src={src}
            alt={alt ?? ''}
            width={1200}
            height={800}
            sizes="(max-width: 1024px) 100vw, 552px"
            quality={92}
            className="w-full h-auto block"
          />
        </div>
      </div>
    </figure>
  );
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true });

const mdxComponents = { img: MdxImg };

interface Props {
  source: string;
}

export async function CaseMdxContent({ source }: Props) {
  const segments = splitSource(source);
  const nodes: React.ReactNode[] = [];

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];

    if (seg.type === 'carousel') {
      nodes.push(<CaseMdxCarousel key={`carousel-${seg.key}`} {...seg.data} />);
    } else {
      const mdast = processor.parse(seg.content);
      const hast = await processor.run(mdast);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const node = toJsxRuntime(hast as any, {
        Fragment,
        jsx: jsx as any,
        jsxs: jsxs as any,
        development: false,
        components: mdxComponents as any,
      });
      nodes.push(<Fragment key={`md-${i}`}>{node}</Fragment>);
    }
  }

  return <>{nodes}</>;
}
