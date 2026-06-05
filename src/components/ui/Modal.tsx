'use client';

import {
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion, type Transition } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  closeLabel?: string;
  children: React.ReactNode;
  className?: string;
};

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Modal({
  isOpen,
  onClose,
  title,
  closeLabel = 'Fechar',
  children,
  className,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isOpen) triggerRef.current = document.activeElement;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const first = modalRef.current.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || !modalRef.current) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [isOpen, onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!mounted) return null;

  const transition: Transition = prefersReduced
    ? { duration: 0 }
    : { duration: 0.2, ease: [0, 0, 0.58, 1] };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 md:p-8 md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-inverse-canvas/60 backdrop-blur-sm"
            aria-hidden="true"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            tabIndex={-1}
            className={cn(
              'relative z-10 w-full max-w-3xl my-auto',
              'bg-bg rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]',
              'focus:outline-none',
              className,
            )}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={transition}
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className={cn(
                'absolute top-4 right-4 z-10',
                'w-11 h-11 rounded-full flex items-center justify-center',
                'text-fg-muted hover:text-fg transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg',
              )}
            >
              <X size={20} aria-hidden="true" />
            </button>

            {/* Content */}
            <div className="p-lg md:p-xxl">
              {title && (
                <h2
                  id="modal-title"
                  className="type-headline text-fg pr-12 mb-lg"
                >
                  {title}
                </h2>
              )}
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
