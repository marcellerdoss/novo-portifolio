import Link from 'next/link';

export const metadata = { robots: { index: false, follow: false } };

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <header className="border-b border-[var(--border-token)] px-6 py-4 flex items-center gap-3">
        <Link
          href="/"
          className="text-sm text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors"
        >
          ← portfólio
        </Link>
        <span className="text-[var(--border-token)]">/</span>
        <span className="text-sm font-medium text-[var(--fg)]">Job Intelligence</span>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
