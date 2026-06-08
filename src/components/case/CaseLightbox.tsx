'use client';

import { useEffect, useId, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

export interface CaseLightboxProps {
  imageSrc: string;
  imageFull?: string;
  imageAlt: string;
  caption?: string;
  height?: number;
  accentBg: string;
  accentText: string;
  unoptimized?: boolean;
}

export function CaseLightbox({
  imageSrc,
  imageFull,
  imageAlt,
  caption,
  height = 360,
  accentBg,
  unoptimized,
}: CaseLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogId = useId();
  const fullSrc = imageFull ?? imageSrc;

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <>
      {/* Thumbnail */}
      <figure>
        <button
          type="button"
          className="group relative block w-full rounded-[12px] overflow-hidden bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2"
          style={{ height }}
          aria-label={`Ampliar: ${imageAlt}`}
          aria-haspopup="dialog"
          onClick={() => setIsOpen(true)}
        >
          <div className="absolute inset-6">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
              sizes="100vw"
              unoptimized={unoptimized}
            />
          </div>

          {/* Expand icon — appears on hover */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="bg-bg/80 backdrop-blur-sm rounded-full p-1.5">
              <Maximize2 size={14} className="text-fg" aria-hidden="true" />
            </div>
          </div>
        </button>

        {caption && (
          <figcaption className="mt-3 type-caption text-fg-subtle">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            id={dialogId}
            aria-modal="true"
            aria-label={imageAlt}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85" aria-hidden="true" />

            {/* Content */}
            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar"
              >
                <X size={20} aria-hidden="true" />
              </button>

              {/* Full image in accent container */}
              <div
                className="relative rounded-[16px] overflow-hidden bg-surface-soft"
                style={{
                  maxWidth: '90vw',
                  maxHeight: '75vh',
                  width: 'min(900px, 90vw)',
                  height: 'min(600px, 75vh)',
                }}
              >
                <div className="absolute inset-8">
                  <Image
                    src={fullSrc}
                    alt={imageAlt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    unoptimized={unoptimized}
                  />
                </div>
              </div>

              {/* Lightbox caption */}
              {caption && (
                <p className="mt-3 type-caption text-white/50 text-center max-w-lg">
                  {caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
