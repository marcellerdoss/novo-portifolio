'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { JobApplication, InterviewQA } from '@/lib/jobs/types';

function scoreColor(score: number) {
  if (score >= 80) return '#1ea64a';
  if (score >= 60) return '#d97706';
  return '#dc2626';
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="text-xs px-3 py-1.5 rounded border border-[var(--border-token)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors">
      {copied ? 'Copiado!' : 'Copiar'}
    </button>
  );
}

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [job, setJob] = useState<JobApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [isGeneratingInterview, setIsGeneratingInterview] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQA[] | null>(null);
  const [interviewError, setInterviewError] = useState<string | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then(async res => {
        if (!res.ok) { setNotFound(true); return; }
        const data = await res.json() as JobApplication;
        setJob(data);
        setInterviewQuestions(data.interview_questions ?? null);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const generateInterview = async () => {
    setIsGeneratingInterview(true);
    setInterviewError(null);
    try {
      const res = await fetch(`/api/jobs/${id}/interview`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro ao gerar perguntas');
      if (!Array.isArray(data)) throw new Error('Resposta inválida do servidor');
      setInterviewQuestions(data as InterviewQA[]);
    } catch (err) {
      setInterviewError(err instanceof Error ? err.message : 'Erro ao gerar perguntas');
    } finally {
      setIsGeneratingInterview(false);
    }
  };

  const deleteJob = async () => {
    if (!confirm('Remover esta candidatura? Ela continuará nos Insights mas não aparecerá no Tracker.')) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      router.push('/jobs');
    } catch {
      setIsDeleting(false);
    }
  };

  const printResume = () => {
    if (!job?.generated_resume) return;
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Currículo — ${job.company}</title>
    <style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:20px;color:#131226;line-height:1.6;}pre{white-space:pre-wrap;font-family:inherit;}@media print{@page{margin:20mm;}}</style>
    </head><body><pre>${job.generated_resume.replace(/</g, '&lt;')}</pre><script>setTimeout(()=>window.print(),300);</script></body></html>`);
    w.document.close();
  };

  /* ── Loading / error states ── */
  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-[var(--fg-subtle)] animate-pulse">Carregando...</div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="py-16 text-center">
        <p className="text-[var(--fg-muted)] mb-4">Candidatura não encontrada.</p>
        <Link href="/jobs" className="text-sm text-accent-magenta underline underline-offset-2">← Voltar ao Tracker</Link>
      </div>
    );
  }

  /* ── Detail view ── */
  return (
    <div className="max-w-4xl space-y-8">
      {/* Back */}
      <div className="flex items-center justify-between">
        <Link href="/jobs" className="text-sm text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors">
          ← Tracker
        </Link>
        <button
          onClick={deleteJob}
          disabled={isDeleting}
          className="text-sm text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
        >
          {isDeleting ? 'Removendo...' : 'Remover candidatura'}
        </button>
      </div>

      {/* Header */}
      <div className="flex items-start gap-5">
        {job.adherence_score != null && (
          <div
            className="w-16 h-16 rounded-full border-[3px] flex items-center justify-center flex-shrink-0"
            style={{ borderColor: scoreColor(job.adherence_score) }}
          >
            <span className="text-base font-bold" style={{ color: scoreColor(job.adherence_score) }}>
              {job.adherence_score}%
            </span>
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold text-[var(--fg)]">{job.position_name}</h1>
          <p className="text-[var(--fg-subtle)] mt-0.5">
            {job.company} · {job.platform} · {job.modality}
            {job.city ? ` · ${job.city}` : ''}
          </p>
          <p className="text-xs text-[var(--fg-subtle)] mt-1">
            Candidatura em {new Date(job.applied_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Contrato', value: job.employment_type ?? '—' },
          { label: 'Salário enviado', value: job.salary_sent ?? '—' },
          { label: 'Benefícios', value: job.benefits ?? '—' },
          { label: 'Porte', value: job.company_size ?? job.company_research?.size ?? '—' },
        ].map(({ label, value }) => (
          <div key={label} className="border border-[var(--border-token)] rounded-lg p-3">
            <p className="text-xs text-[var(--fg-subtle)] mb-0.5">{label}</p>
            <p className="text-sm font-medium text-[var(--fg)]">{value}</p>
          </div>
        ))}
      </div>

      {/* Salary suggestion */}
      {job.salary_suggestion && (
        <div className="rounded-lg border border-[var(--border-token)] p-4">
          <p className="text-xs text-[var(--fg-subtle)] mb-1">Sugestão salarial de mercado</p>
          <p className="text-sm font-medium text-[var(--fg)]">{job.salary_suggestion}</p>
        </div>
      )}

      {/* Job URL */}
      {job.job_url && (
        <a
          href={job.job_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-accent-magenta underline underline-offset-2"
        >
          Ver vaga original ↗
        </a>
      )}

      {/* Company Research */}
      {job.company_research && (
        <details className="border border-[var(--border-token)] rounded-lg" open>
          <summary className="px-4 py-3 text-sm font-medium cursor-pointer text-[var(--fg-muted)] select-none list-none flex items-center justify-between">
            <span>Pesquisa da empresa</span>
            <span className="text-xs text-[var(--fg-subtle)]">▸</span>
          </summary>
          <div className="px-4 pb-4 pt-3 space-y-2 text-sm text-[var(--fg-muted)] border-t border-[var(--border-token)]">
            <p><span className="font-medium text-[var(--fg)]">Resumo: </span>{job.company_research.summary}</p>
            <p><span className="font-medium text-[var(--fg)]">Setor: </span>{job.company_research.sector}</p>
            <p><span className="font-medium text-[var(--fg)]">Cultura: </span>{job.company_research.culture}</p>
            {job.company_research.recent_news && (
              <p><span className="font-medium text-[var(--fg)]">Novidades: </span>{job.company_research.recent_news}</p>
            )}
            {job.company_research.tech_stack && (
              <p><span className="font-medium text-[var(--fg)]">Stack: </span>{job.company_research.tech_stack}</p>
            )}
          </div>
        </details>
      )}

      {/* Gaps */}
      {job.gaps && job.gaps.length > 0 && (
        <div className="rounded-lg border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 p-4">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-2.5">Gaps identificados</p>
          <ul className="space-y-1.5">
            {job.gaps.map((gap, i) => (
              <li key={i} className="text-sm text-amber-700 dark:text-amber-300 flex gap-2">
                <span>⚠</span><span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Keywords */}
      {job.keywords && job.keywords.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-[var(--fg)] mb-2">Keywords ATS</p>
          <div className="flex flex-wrap gap-1.5">
            {job.keywords.map((kw, i) => (
              <span key={i} className="px-2.5 py-1 rounded-full text-xs bg-[var(--bg-secondary,#ececea)] text-[var(--fg-muted)] border border-[var(--border-token)]">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Resume */}
      {job.generated_resume && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-[var(--fg)]">Currículo gerado</p>
            <div className="flex gap-2">
              <CopyButton text={job.generated_resume} />
              <button onClick={printResume} className="text-xs px-3 py-1.5 rounded border border-[var(--border-token)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors">PDF</button>
            </div>
          </div>
          <div className="border border-[var(--border-token)] rounded-lg p-4 max-h-80 overflow-y-auto text-xs font-mono text-[var(--fg-muted)] whitespace-pre-wrap leading-relaxed">
            {job.generated_resume}
          </div>
        </div>
      )}

      {/* Cover Letter */}
      {job.cover_letter && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-[var(--fg)]">Carta de apresentação</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[var(--fg-subtle)]">{job.cover_letter.length}/1200</span>
              <CopyButton text={job.cover_letter} />
            </div>
          </div>
          <div className="border border-[var(--border-token)] rounded-lg p-4 text-sm text-[var(--fg-muted)] whitespace-pre-wrap leading-relaxed">
            {job.cover_letter}
          </div>
        </div>
      )}

      {/* Job Scope */}
      {job.job_scope && (
        <details className="border border-[var(--border-token)] rounded-lg">
          <summary className="px-4 py-3 text-sm font-medium cursor-pointer text-[var(--fg-muted)] select-none list-none flex items-center justify-between">
            <span>Descrição original da vaga</span>
            <span className="text-xs text-[var(--fg-subtle)]">▸</span>
          </summary>
          <div className="px-4 pb-4 pt-3 text-sm text-[var(--fg-subtle)] whitespace-pre-wrap leading-relaxed border-t border-[var(--border-token)]">
            {job.job_scope}
          </div>
        </details>
      )}

      {/* ── Interview Prep ── */}
      <div className="border-t border-[var(--border-token)] pt-8">
        {!interviewQuestions ? (
          <div className="flex items-center gap-4">
            <button
              onClick={generateInterview}
              disabled={isGeneratingInterview}
              className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              {isGeneratingInterview ? 'Gerando perguntas...' : 'Preparar entrevista'}
            </button>
            {isGeneratingInterview && (
              <p className="text-sm text-[var(--fg-subtle)] animate-pulse">
                Gerando 8 perguntas personalizadas para {job.company}...
              </p>
            )}
            {interviewError && (
              <p className="text-sm text-red-500">{interviewError}</p>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--fg)]">Perguntas de entrevista</p>
              <button
                onClick={generateInterview}
                disabled={isGeneratingInterview}
                className="text-xs text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors disabled:opacity-40"
              >
                {isGeneratingInterview ? 'Gerando...' : 'Regenerar'}
              </button>
            </div>
            {interviewQuestions.map((qa, i) => (
              <div key={i} className="border border-[var(--border-token)] rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-[var(--fg)]">
                  <span className="text-accent-magenta mr-2">{i + 1}.</span>
                  {qa.question}
                </p>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{qa.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skill Suggestions */}
      {job.skill_suggestions && job.skill_suggestions.length > 0 && (
        <div className="border-t border-[var(--border-token)] pt-6">
          <p className="text-sm font-semibold text-[var(--fg)] mb-2">Para fechar os gaps</p>
          <ul className="space-y-2">
            {job.skill_suggestions.map((s, i) => (
              <li key={i} className="text-sm text-[var(--fg-muted)] flex gap-2">
                <span className="text-accent-magenta flex-shrink-0">→</span><span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
