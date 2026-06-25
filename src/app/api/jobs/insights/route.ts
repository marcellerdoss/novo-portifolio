import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { supabase } from '@/lib/supabase';
import type { JobApplication } from '@/lib/jobs/types';

export const maxDuration = 120;

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_KEY! });

export async function GET() {
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .order('applied_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const all = (data ?? []) as JobApplication[];
  const active = all.filter(j => j.status === 'active');
  const deleted = all.filter(j => j.status === 'deleted');

  if (all.length === 0) {
    return NextResponse.json({ total: 0, active: 0, deleted: 0, avg_score: null, recurring_gaps: [], top_keywords: [], analysis: null });
  }

  const gapCount: Record<string, number> = {};
  const kwCount: Record<string, number> = {};

  for (const job of all) {
    for (const g of job.gaps ?? []) gapCount[g] = (gapCount[g] ?? 0) + 1;
    for (const k of job.keywords ?? []) kwCount[k] = (kwCount[k] ?? 0) + 1;
  }

  const recurringGaps = Object.entries(gapCount).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([gap, count]) => ({ gap, count }));
  const topKeywords = Object.entries(kwCount).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([keyword, count]) => ({ keyword, count }));
  const scores = all.filter(j => j.adherence_score != null).map(j => j.adherence_score!);
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

  const prompt = `Você é coach de carreira especializada em Product Design e UX.

Dados de candidatura:
- Total: ${all.length} (${active.length} ativas, ${deleted.length} removidas)
- Score médio: ${avgScore ?? 'N/A'}%
- Plataformas: ${[...new Set(all.map(j => j.platform))].join(', ')}
- Gaps recorrentes: ${recurringGaps.slice(0, 5).map(g => `${g.gap} (${g.count}x)`).join('; ')}
- Keywords frequentes: ${topKeywords.slice(0, 8).map(k => k.keyword).join(', ')}

Responda APENAS com JSON, sem markdown:
{
  "portfolio_suggestions": ["Sugestão 1", "Sugestão 2"],
  "linkedin_suggestions": ["Sugestão 1", "Sugestão 2"],
  "narrative": "Análise em 2–3 parágrafos"
}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: { maxOutputTokens: 2048 },
      contents: prompt,
    });

    const text = (response.text ?? '').replace(/```json\n?/g, '').replace(/```\n?/g, '');
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    return NextResponse.json({ total: all.length, active: active.length, deleted: deleted.length, avg_score: avgScore, recurring_gaps: recurringGaps, top_keywords: topKeywords, analysis });
  } catch {
    return NextResponse.json({ total: all.length, active: active.length, deleted: deleted.length, avg_score: avgScore, recurring_gaps: recurringGaps, top_keywords: topKeywords, analysis: null });
  }
}
