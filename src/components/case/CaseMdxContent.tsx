import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { CaseCarousel } from './CaseCarousel';

interface MdxImgProps {
  src?: string;
  alt?: string;
  title?: string;
}

function MdxImg({ src, alt, title }: MdxImgProps) {
  if (!src) return null;
  const caption = title || alt;
  return (
    <figure className="my-6">
      <div className="rounded-[12px] overflow-hidden">
        <Image
          src={src}
          alt={alt ?? ''}
          width={1200}
          height={800}
          sizes="(max-width: 1024px) 100vw, 736px"
          quality={92}
          className="w-full h-auto block"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 type-body-xs text-fg-subtle px-1">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const components = { img: MdxImg, Carousel: CaseCarousel };

interface Props {
  source: string;
}

export function CaseMdxContent({ source }: Props) {
  return <MDXRemote source={source} components={components} />;
}
