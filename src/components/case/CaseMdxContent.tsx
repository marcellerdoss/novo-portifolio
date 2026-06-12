import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { CaseCarousel } from './CaseCarousel';
import { CaseImageFrame } from './CaseImageFrame';

interface CarouselData {
  images: { src: string; alt: string }[];
  caption?: string;
}

interface ImageGroupItem {
  src: string;
  alt: string;
  caption?: string;
  imgWidth?: number;
  imgHeight?: number;
}

interface ImageGroupData {
  images: ImageGroupItem[];
  fixedHeight?: number;
}

type Segment =
  | { type: 'md'; content: string }
  | { type: 'carousel'; data: CarouselData; key: number }
  | { type: 'imagegroup'; data: ImageGroupData; key: number };

function splitSource(source: string): Segment[] {
  const segments: Segment[] = [];
  const re = /<(?:Carousel|ImageGroup)[\s\S]*?\/>/g;
  let last = 0;
  let blockIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(source)) !== null) {
    if (m.index > last) {
      segments.push({ type: 'md', content: source.slice(last, m.index) });
    }

    const block = m[0];
    const imagesMatch = block.match(/images=\{(\[[\s\S]*?\])\}/);

    if (imagesMatch) {
      try {
        if (block.startsWith('<Carousel')) {
          const captionMatch = block.match(/caption="([^"]*)"/);
          const images = JSON.parse(imagesMatch[1]) as { src: string; alt: string }[];
          segments.push({
            type: 'carousel',
            data: { images, caption: captionMatch?.[1] },
            key: blockIndex++,
          });
        } else {
          const fixedHeightMatch = block.match(/fixedHeight=\{(\d+)\}/);
          const images = JSON.parse(imagesMatch[1]) as ImageGroupItem[];
          segments.push({
            type: 'imagegroup',
            data: { images, fixedHeight: fixedHeightMatch ? parseInt(fixedHeightMatch[1]) : undefined },
            key: blockIndex++,
          });
        }
      } catch {
        // skip malformed block
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
    <div className="my-6">
      <CaseImageFrame src={src} alt={alt ?? ''} caption={alt} />
    </div>
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

    if (seg.type === 'imagegroup') {
      nodes.push(
        <div key={`imagegroup-${seg.key}`} className="my-6">
          <div className="flex flex-wrap justify-center gap-6">
            {seg.data.images.map((img, i) => (
              <CaseImageFrame
                key={i}
                src={img.src}
                alt={img.alt}
                caption={img.caption}
                pair
                fixedHeight={seg.data.fixedHeight}
                imgWidth={img.imgWidth}
                imgHeight={img.imgHeight}
              />
            ))}
          </div>
        </div>
      );
    } else if (seg.type === 'carousel') {
      nodes.push(<div key={`carousel-${seg.key}`} className="my-6"><CaseCarousel {...seg.data} /></div>);
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
