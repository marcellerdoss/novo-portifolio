'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import type {
  GenerateRequest,
  GenerateResult,
  JobApplication,
  Platform,
  Modality,
  EmploymentType,
} from '@/lib/jobs/types';

type Tab = 'generator' | 'tracker' | 'insights';

interface SaveExtra {
  position_name: string;
  employment_type: EmploymentType | '';
  salary_sent: string;
  benefits: string;
}

interface InsightsData {
  total: number;
  active: number;
  deleted: number;
  avg_score: number | null;
  recurring_gaps: Array<{ gap: string; count: number }>;
  top_keywords: Array<{ keyword: string; count: number }>;
  analysis: {
    portfolio_suggestions: string[];
    linkedin_suggestions: string[];
    narrative: string;
  } | null;
}

const PLATFORMS: Platform[] = ['Gupy', 'LinkedIn', 'Catho', 'Infojobs', 'Outro'];
const MODALITIES: Modality[] = ['Remoto', 'Híbrido', 'Presencial'];

function scoreColor(score: number) {
  if (score >= 80) return '#1ea64a';
  if (score >= 60) return '#d97706';
  return '#dc2626';
}

function CopyButton({ text, label = 'Copiar' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="text-xs px-3 py-1.5 rounded border border-[var(--border-token)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--fg-subtle)] transition-colors"
    >
      {copied ? 'Copiado!' : label}
    </button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-token)] bg-[var(--bg)] text-[var(--fg)] placeholder:text-[var(--fg-subtle)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/30';

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('generator');

  /* ── Generator ── */
  const [company, setCompany] = useState('');
  const [platform, setPlatform] = useState<Platform>('LinkedIn');
  const [modality, setModality] = useState<Modality>('Remoto');
  const [city, setCity] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [jobScope, setJobScope] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResult | null>(null);

  /* ── Save ── */
  const [saveExtra, setSaveExtra] = useState<SaveExtra>({
    position_name: '',
    employment_type: '',
    salary_sent: '',
    benefits: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  /* ── Tracker ── */
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoadingTracker, setIsLoadingTracker] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeletingSelected, setIsDeletingSelected] = useState(false);

  /* ── Insights ── */
  const [insights, setInsights] = useState<InsightsData | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  const loadTracker = useCallback(async () => {
    setIsLoadingTracker(true);
    try {
      const res = await fetch('/api/jobs');
      setApplications(await res.json());
    } finally {
      setIsLoadingTracker(false);
    }
  }, []);

  const loadInsights = useCallback(async () => {
    setIsLoadingInsights(true);
    try {
      const res = await fetch('/api/jobs/insights');
      setInsights(await res.json());
    } finally {
      setIsLoadingInsights(false);
    }
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === applications.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(applications.map(a => a.id)));
    }
  };

  const deleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Remover ${selectedIds.size} candidatura(s)? Elas continuarão nos Insights.`)) return;
    setIsDeletingSelected(true);
    try {
      await Promise.all([...selectedIds].map(id => fetch(`/api/jobs/${id}`, { method: 'DELETE' })));
      setApplications(prev => prev.filter(a => !selectedIds.has(a.id)));
      setSelectedIds(new Set());
    } finally {
      setIsDeletingSelected(false);
    }
  };

  const deleteSingle = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Remover esta candidatura?')) return;
    await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
    setApplications(prev => prev.filter(a => a.id !== id));
    setSelectedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'tracker') { loadTracker(); setSelectedIds(new Set()); }
    if (tab === 'insights') loadInsights();
  };

  const handleGenerate = async () => {
    if (!jobScope.trim() || !company.trim()) return;
    setIsGenerating(true);
    setGenerateError(null);
    setResult(null);
    setSavedId(null);
    setSaveExtra({ position_name: '', employment_type: '', salary_sent: '', benefits: '' });

    try {
      const req: GenerateRequest = { job_scope: jobScope, platform, company, modality, city: city || undefined, job_url: jobUrl || undefined };
      const res = await fetch('/api/jobs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro desconhecido');
      setResult(data);
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : 'Erro ao gerar');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!result || !saveExtra.position_name.trim()) return;
    setIsSaving(true);
    try {
      const payload = {
        position_name: saveExtra.position_name,
        company,
        platform,
        job_url: jobUrl || null,
        job_scope: jobScope,
        modality,
        city: city || null,
        employment_type: saveExtra.employment_type || null,
        salary_sent: saveExtra.salary_sent || null,
        benefits: saveExtra.benefits || null,
        company_size: result.company_research.size,
        company_research: result.company_research,
        adherence_score: result.adherence_score,
        gaps: result.gaps,
        generated_resume: result.generated_resume,
        cover_letter: result.cover_letter,
        keywords: result.keywords,
        skill_suggestions: result.skill_suggestions,
        salary_suggestion: result.salary_suggestion,
        applied_at: new Date().toISOString(),
      };
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro ao salvar');
      setSavedId(data.id);
    } catch (err) {
      console.error('[save]', err);
    } finally {
      setIsSaving(false);
    }
  };

  const printResume = () => {
    if (!result) return;
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Currículo — ${company}</title>
    <style>
      body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:20px;color:#131226;line-height:1.6;}
      pre{white-space:pre-wrap;font-family:inherit;}
      @media print{@page{margin:20mm;}}
    </style></head><body><pre>${result.generated_resume.replace(/</g, '&lt;')}</pre>
    <script>setTimeout(()=>window.print(),300);</script></body></html>`);
    w.document.close();
  };

  /* ══════════════════════════════════════════════════════════ */
  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 mb-8 border-b border-[var(--border-token)]">
        {(['generator', 'tracker', 'insights'] as Tab[]).map(tab => {
          const labels: Record<Tab, string> = { generator: 'Gerador', tracker: 'Tracker', insights: 'Insights' };
          return (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === tab
                  ? 'border-accent-magenta text-[var(--fg)]'
                  : 'border-transparent text-[var(--fg-subtle)] hover:text-[var(--fg-muted)]'
              }`}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* ── GENERATOR TAB ─────────────────────────────────── */}
      {activeTab === 'generator' && (
        <div className="space-y-8">

          {/* Form + Score/Research (2 colunas) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Coluna esquerda — Formulário */}
            <div className="space-y-5">
              {!result && (
                <>
                  <Field label="Empresa *">
                    <input type="text" value={company} onChange={e => setCompany(e.target.value)}
                      placeholder="Ex: Nubank, iFood, VTEX" className={inputCls} />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Plataforma *">
                      <select value={platform} onChange={e => setPlatform(e.target.value as Platform)} className={inputCls}>
                        {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                      </select>
                    </Field>
                    <Field label="Modalidade *">
                      <select value={modality} onChange={e => setModality(e.target.value as Modality)} className={inputCls}>
                        {MODALITIES.map(m => <option key={m}>{m}</option>)}
                      </select>
                    </Field>
                  </div>

                  {modality !== 'Remoto' && (
                    <Field label="Cidade">
                      <input type="text" value={city} onChange={e => setCity(e.target.value)}
                        placeholder="Ex: São Paulo, SP" className={inputCls} />
                    </Field>
                  )}

                  <Field label="URL da vaga">
                    <input type="url" value={jobUrl} onChange={e => setJobUrl(e.target.value)}
                      placeholder="https://..." className={inputCls} />
                  </Field>

                  <Field label="Descrição / escopo da vaga *">
                    <textarea
                      value={jobScope}
                      onChange={e => setJobScope(e.target.value)}
                      placeholder="Cole aqui o texto completo da vaga..."
                      rows={10}
                      className={`${inputCls} resize-y`}
                    />
                  </Field>
                </>
              )}

              {result && (
                <div className="space-y-1">
                  <p className="font-semibold text-[var(--fg)]">{company}</p>
                  <p className="text-sm text-[var(--fg-subtle)]">{platform} · {modality}{city ? ` · ${city}` : ''}</p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !jobScope.trim() || !company.trim()}
                  className="flex-1 py-3 rounded-lg bg-primary text-white font-medium text-sm disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                  {isGenerating ? 'Avaliando candidatura...' : 'Avaliar candidatura'}
                </button>
                {result && (
                  <button
                    onClick={() => { setResult(null); setSavedId(null); setSaveExtra({ position_name: '', employment_type: '', salary_sent: '', benefits: '' }); }}
                    className="py-3 px-4 rounded-lg border border-[var(--border-token)] text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                  >
                    Nova vaga
                  </button>
                )}
              </div>

              {isGenerating && (
                <p className="text-sm text-[var(--fg-subtle)] text-center animate-pulse">
                  Analisando {company || 'a empresa'} e gerando conteúdo...
                </p>
              )}
              {generateError && (
                <p className="text-sm text-red-500">{generateError}</p>
              )}
            </div>

            {/* Coluna direita — Score + Pesquisa */}
            <div>
              {!result && !isGenerating && (
                <div className="flex flex-col items-center justify-center h-full min-h-[260px] text-center text-[var(--fg-subtle)] text-sm gap-3 border border-dashed border-[var(--border-token)] rounded-xl">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity={0.4}>
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Preencha o formulário e clique<br />em "Avaliar candidatura"</span>
                </div>
              )}

              {result && (
                <div className="space-y-4">
                  {/* Score */}
                  <div className="flex items-center gap-4 p-4 border border-[var(--border-token)] rounded-xl">
                    <div
                      className="w-16 h-16 rounded-full border-[3px] flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: scoreColor(result.adherence_score) }}
                    >
                      <span className="text-lg font-bold" style={{ color: scoreColor(result.adherence_score) }}>
                        {result.adherence_score}%
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--fg)]">Aderência à vaga</p>
                      <p className="text-sm text-[var(--fg-subtle)]">{company} · {platform}</p>
                    </div>
                  </div>

                  {/* Company Research */}
                  <details className="border border-[var(--border-token)] rounded-lg">
                    <summary className="px-4 py-3 text-sm font-medium cursor-pointer text-[var(--fg-muted)] select-none list-none flex items-center justify-between">
                      <span>Pesquisa da empresa</span>
                      <span className="text-xs text-[var(--fg-subtle)]">▸</span>
                    </summary>
                    <div className="px-4 pb-4 space-y-2 text-sm text-[var(--fg-muted)] border-t border-[var(--border-token)] pt-3">
                      <p><span className="text-[var(--fg)] font-medium">Resumo: </span>{result.company_research.summary}</p>
                      <p><span className="text-[var(--fg)] font-medium">Porte: </span>{result.company_research.size}</p>
                      <p><span className="text-[var(--fg)] font-medium">Setor: </span>{result.company_research.sector}</p>
                      <p><span className="text-[var(--fg)] font-medium">Cultura: </span>{result.company_research.culture}</p>
                      {result.company_research.recent_news && (
                        <p><span className="text-[var(--fg)] font-medium">Novidades: </span>{result.company_research.recent_news}</p>
                      )}
                      {result.company_research.tech_stack && (
                        <p><span className="text-[var(--fg)] font-medium">Stack: </span>{result.company_research.tech_stack}</p>
                      )}
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>

          {/* ── Conteúdo abaixo (largura total) ── */}
          {result && (
            <div className="space-y-6 border-t border-[var(--border-token)] pt-8">

              {/* Gaps + Para fechar os gaps (lado a lado) */}
              {(result.gaps.length > 0 || result.skill_suggestions.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.gaps.length > 0 && (
                    <div className="rounded-lg border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 p-4">
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-2.5">Gaps identificados</p>
                      <ul className="space-y-1.5">
                        {result.gaps.map((gap, i) => (
                          <li key={i} className="text-sm text-amber-700 dark:text-amber-300 flex gap-2">
                            <span aria-hidden>⚠</span><span>{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.skill_suggestions.length > 0 && (
                    <div className="rounded-lg border border-[var(--border-token)] p-4">
                      <p className="text-sm font-medium text-[var(--fg)] mb-2.5">Para fechar os gaps</p>
                      <ul className="space-y-1.5">
                        {result.skill_suggestions.map((s, i) => (
                          <li key={i} className="text-sm text-[var(--fg-muted)] flex gap-2">
                            <span className="text-accent-magenta flex-shrink-0">→</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Currículo — recolhido por padrão */}
              <details className="border border-[var(--border-token)] rounded-lg">
                <summary className="px-4 py-3 cursor-pointer select-none list-none flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--fg)]">Currículo gerado</span>
                  <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                    <CopyButton text={result.generated_resume} />
                    <button
                      onClick={printResume}
                      className="text-xs px-3 py-1.5 rounded border border-[var(--border-token)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                    >
                      PDF
                    </button>
                  </div>
                </summary>
                <div className="border-t border-[var(--border-token)] p-4 text-xs font-mono text-[var(--fg-muted)] whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
                  {result.generated_resume}
                </div>
              </details>

              {/* Carta + Keywords (lado a lado) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Carta */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-[var(--fg)]">Carta de apresentação</p>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs ${result.cover_letter.length > 1200 ? 'text-red-500' : 'text-[var(--fg-subtle)]'}`}>
                        {result.cover_letter.length}/1200
                      </span>
                      <CopyButton text={result.cover_letter} />
                    </div>
                  </div>
                  <div className="border border-[var(--border-token)] rounded-lg p-4 h-52 overflow-y-auto text-sm text-[var(--fg-muted)] whitespace-pre-wrap leading-relaxed">
                    {result.cover_letter}
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <p className="text-sm font-medium text-[var(--fg)] mb-2">Keywords ATS</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.keywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full text-xs bg-[var(--bg-secondary,#ececea)] text-[var(--fg-muted)] border border-[var(--border-token)]">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sugestão salarial */}
              <div className="rounded-lg border border-[var(--border-token)] p-4">
                <p className="text-xs text-[var(--fg-subtle)] mb-1">Sugestão salarial</p>
                <p className="text-sm font-medium text-[var(--fg)]">{result.salary_suggestion}</p>
              </div>

              {/* ── Salvar candidatura ── */}
              {!savedId ? (
                <div className="border-t border-[var(--border-token)] pt-6 space-y-4">
                  <p className="text-sm font-semibold text-[var(--fg)]">Me candidatei</p>

                  <div>
                    <label className="block text-xs text-[var(--fg-subtle)] mb-1">Título do cargo *</label>
                    <input
                      type="text"
                      value={saveExtra.position_name}
                      onChange={e => setSaveExtra(s => ({ ...s, position_name: e.target.value }))}
                      placeholder="Ex: Product Designer Senior"
                      className={inputCls}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-[var(--fg-subtle)] mb-1">Contrato</label>
                      <select
                        value={saveExtra.employment_type}
                        onChange={e => setSaveExtra(s => ({ ...s, employment_type: e.target.value as EmploymentType | '' }))}
                        className={inputCls}
                      >
                        <option value="">—</option>
                        <option value="CLT">CLT</option>
                        <option value="PJ">PJ</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--fg-subtle)] mb-1">Salário enviado</label>
                      <input
                        type="text"
                        value={saveExtra.salary_sent}
                        onChange={e => setSaveExtra(s => ({ ...s, salary_sent: e.target.value }))}
                        placeholder="R$ 0.000"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--fg-subtle)] mb-1">Benefícios</label>
                      <input
                        type="text"
                        value={saveExtra.benefits}
                        onChange={e => setSaveExtra(s => ({ ...s, benefits: e.target.value }))}
                        placeholder="VR, plano..."
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSave}
                    disabled={isSaving || !saveExtra.position_name.trim()}
                    className="w-full py-3 rounded-lg bg-accent-magenta text-white font-medium text-sm disabled:opacity-40 hover:opacity-90 transition-opacity"
                  >
                    {isSaving ? 'Salvando...' : 'Me candidatei ✓'}
                  </button>
                </div>
              ) : (
                <div className="border border-green-500/30 rounded-lg p-4 flex items-center justify-between bg-green-500/5">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Candidatura salva!</p>
                  <Link href={`/jobs/${savedId}`} className="text-sm text-[var(--fg-muted)] underline underline-offset-2 hover:text-[var(--fg)]">
                    Ver detalhes →
                  </Link>
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* ── TRACKER TAB ───────────────────────────────────── */}
      {activeTab === 'tracker' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-[var(--fg)]">Candidaturas ativas</h2>
              {selectedIds.size > 0 && (
                <button
                  onClick={deleteSelected}
                  disabled={isDeletingSelected}
                  className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
                  </svg>
                  Excluir {selectedIds.size} selecionada{selectedIds.size > 1 ? 's' : ''}
                </button>
              )}
            </div>
            <button
              onClick={loadTracker}
              className="text-sm text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors"
            >
              Atualizar
            </button>
          </div>

          {isLoadingTracker && (
            <p className="text-sm text-[var(--fg-subtle)] animate-pulse py-8 text-center">Carregando...</p>
          )}

          {!isLoadingTracker && applications.length === 0 && (
            <div className="py-16 text-center text-[var(--fg-subtle)] text-sm">
              <p>Nenhuma candidatura salva.</p>
              <button
                onClick={() => setActiveTab('generator')}
                className="mt-3 text-accent-magenta underline underline-offset-2"
              >
                Ir para o Gerador
              </button>
            </div>
          )}

          {!isLoadingTracker && applications.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-token)]">
                    <th className="pb-3 pr-3 w-8">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === applications.length}
                        onChange={toggleSelectAll}
                        className="rounded border-[var(--border-token)] accent-[var(--color-primary,#131226)] cursor-pointer"
                      />
                    </th>
                    {['Cargo', 'Empresa', 'Plataforma', 'Modalidade', 'Score', 'Data', ''].map(h => (
                      <th key={h} className="pb-3 pr-4 last:pr-0 text-xs font-medium text-[var(--fg-subtle)] uppercase tracking-wide text-left">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr
                      key={app.id}
                      onClick={() => (window.location.href = `/jobs/${app.id}`)}
                      className={`border-b border-[var(--border-token)] hover:bg-[var(--bg-secondary,#ececea)] cursor-pointer transition-colors group ${selectedIds.has(app.id) ? 'bg-[var(--bg-secondary,#ececea)]' : ''}`}
                    >
                      <td className="py-3 pr-3" onClick={e => { e.stopPropagation(); toggleSelect(app.id); }}>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(app.id)}
                          onChange={() => toggleSelect(app.id)}
                          className="rounded border-[var(--border-token)] accent-[var(--color-primary,#131226)] cursor-pointer"
                        />
                      </td>
                      <td className="py-3 pr-4 font-medium text-[var(--fg)] max-w-[180px] truncate">{app.position_name}</td>
                      <td className="py-3 pr-4 text-[var(--fg-muted)]">{app.company}</td>
                      <td className="py-3 pr-4 text-[var(--fg-muted)]">{app.platform}</td>
                      <td className="py-3 pr-4 text-[var(--fg-muted)]">{app.modality}</td>
                      <td className="py-3 pr-4">
                        {app.adherence_score != null && (
                          <span className="font-semibold text-sm" style={{ color: scoreColor(app.adherence_score) }}>
                            {app.adherence_score}%
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-[var(--fg-subtle)]">
                        {new Date(app.applied_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 text-right" onClick={e => deleteSingle(app.id, e)}>
                        <button
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--fg-subtle)] hover:text-red-500 p-1 rounded"
                          title="Excluir"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── INSIGHTS TAB ──────────────────────────────────── */}
      {activeTab === 'insights' && (
        <div>
          {isLoadingInsights && (
            <p className="text-sm text-[var(--fg-subtle)] animate-pulse py-8 text-center">Analisando candidaturas...</p>
          )}

          {insights && (
            <div className="space-y-8">
              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Total', value: String(insights.total) },
                  { label: 'Ativas', value: String(insights.active) },
                  {
                    label: 'Score médio',
                    value: insights.avg_score != null ? `${insights.avg_score}%` : '—',
                    color: insights.avg_score != null ? scoreColor(insights.avg_score) : undefined,
                  },
                ].map(({ label, value, color }) => (
                  <div key={label} className="border border-[var(--border-token)] rounded-xl p-5 text-center">
                    <p className="text-3xl font-bold text-[var(--fg)]" style={{ color }}>{value}</p>
                    <p className="text-xs text-[var(--fg-subtle)] mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {insights.total === 0 ? (
                <p className="text-sm text-[var(--fg-subtle)] text-center py-8">
                  Nenhuma candidatura ainda — comece pelo Gerador.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Recurring Gaps */}
                    {insights.recurring_gaps.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-[var(--fg)] mb-3">Gaps recorrentes</p>
                        <ul className="space-y-2.5">
                          {insights.recurring_gaps.map(({ gap, count }, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs flex items-center justify-center font-medium">
                                {count}
                              </span>
                              <span className="text-sm text-[var(--fg-muted)] leading-snug">{gap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Top Keywords */}
                    {insights.top_keywords.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-[var(--fg)] mb-3">Keywords mais frequentes</p>
                        <div className="flex flex-wrap gap-2">
                          {insights.top_keywords.map(({ keyword, count }, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-full text-xs border border-[var(--border-token)] text-[var(--fg-muted)]"
                              style={{ opacity: Math.max(0.45, count / (insights.top_keywords[0]?.count ?? 1)) }}
                            >
                              {keyword} <span className="opacity-60">({count})</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AI Analysis */}
                  {insights.analysis && (
                    <div className="space-y-6 border-t border-[var(--border-token)] pt-6">
                      {insights.analysis.portfolio_suggestions.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-[var(--fg)] mb-2">Portfólio</p>
                          <ul className="space-y-2">
                            {insights.analysis.portfolio_suggestions.map((s, i) => (
                              <li key={i} className="text-sm text-[var(--fg-muted)] flex gap-2">
                                <span className="text-accent-magenta flex-shrink-0">→</span><span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {insights.analysis.linkedin_suggestions.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-[var(--fg)] mb-2">LinkedIn</p>
                          <ul className="space-y-2">
                            {insights.analysis.linkedin_suggestions.map((s, i) => (
                              <li key={i} className="text-sm text-[var(--fg-muted)] flex gap-2">
                                <span className="text-accent-magenta flex-shrink-0">→</span><span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {insights.analysis.narrative && (
                        <div className="border-l-2 border-accent-magenta pl-4">
                          <p className="text-sm text-[var(--fg-muted)] leading-relaxed whitespace-pre-wrap">
                            {insights.analysis.narrative}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
