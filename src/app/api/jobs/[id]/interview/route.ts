import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getSupabaseClient } from '@/lib/supabase';
import type { JobApplication, InterviewQA } from '@/lib/jobs/types';

export const maxDuration = 120;

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_KEY! });

type Ctx = { params: Promise<{ id: string }> };

export async function POST(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase não configurado.' }, { status: 503 });
  }

  const { data: job, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !job) {
    return NextResponse.json({ error: 'Candidatura não encontrada.' }, { status: 404 });
  }

  const app = job as JobApplication;

  const prompt = `Você é coach de entrevistas especializado em Product Design e UX.

VAGA: ${app.position_name} em ${app.company}
MODALIDADE: ${app.modality}
${app.job_scope ? `DESCRIÇÃO:\n${app.job_scope}` : ''}
${app.company_research ? `EMPRESA: ${JSON.stringify(app.company_research)}` : ''}
${app.gaps?.length ? `GAPS: ${app.gaps.join(', ')}` : ''}

CANDIDATA: Product Designer com 13+ anos, especialista em UX Strategy, pesquisa de usuários, B2B SaaS e EdTech.

Gere 8 perguntas de entrevista prováveis (comportamentais, técnicas e situacionais) com respostas completas e personalizadas.

Responda APENAS com JSON válido, sem markdown:
[
  { "question": "Pergunta aqui", "answer": "Resposta completa e persuasiva aqui" }
]`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: { maxOutputTokens: 4096 },
      contents: prompt,
    });

    const text = (response.text ?? '').replace(/```json\n?/g, '').replace(/```\n?/g, '');
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('JSON não encontrado');

    const questions = JSON.parse(jsonMatch[0]) as InterviewQA[];

    await supabase
      .from('job_applications')
      .update({ interview_questions: questions })
      .eq('id', id);

    return NextResponse.json(questions);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[interview]', msg);
    return NextResponse.json({ error: 'Erro ao gerar perguntas.' }, { status: 500 });
  }
}
