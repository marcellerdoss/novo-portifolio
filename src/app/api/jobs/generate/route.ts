import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { buildProfileText } from '@/lib/jobs/profile';
import type { GenerateRequest, GenerateResult } from '@/lib/jobs/types';

export const maxDuration = 120;

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_KEY! });

function buildSystemPrompt(profile: string): string {
  return `Você é especialista em candidaturas para vagas de Product Design e UX, com profundo conhecimento de sistemas ATS brasileiros.

${profile}

---

CONHECIMENTO ATS POR PLATAFORMA:

GUPY (sistema Gaia):
- Pontuação 0–100% baseada em 200+ variáveis algorítmicas
- Correspondência de palavras-chave é EXATA — variações não contam
- Primeiros candidatos têm vantagem (boost de pontuação por tempo)
- O algoritmo lê texto puro, não layout do PDF
- Prioridades: título exato da vaga > habilidades técnicas específicas > nível de senioridade > anos de experiência

LINKEDIN:
- Headline: 1–2 palavras-chave primárias da vaga (limite 220 chars)
- Resumo: 2–3 palavras-chave integradas naturalmente nos primeiros parágrafos
- Bullets de experiência: 1 palavra-chave primária por bullet
- Correspondência de frase EXATA tem peso significativamente maior

CATHO / INFOJOBS:
- Filtros sequenciais: faixa salarial → localização → escolaridade mínima → experiência → palavras-chave
- Consistência do cargo entre experiências é valorizada

---

INSTRUÇÕES DE SAÍDA:
Responda APENAS com um objeto JSON válido, sem texto antes ou depois, sem markdown, sem blocos de código.
Use a estrutura exata abaixo, em português brasileiro:

{
  "company_research": {
    "summary": "Resumo da empresa em 2–3 frases",
    "size": "Startup/PME/Médio Porte/Grande Empresa/Corporação",
    "sector": "Setor de atuação",
    "culture": "Cultura e valores percebidos",
    "recent_news": "Notícia ou evento relevante recente",
    "tech_stack": "Stack tecnológico relevante para design (se disponível)",
    "sources": []
  },
  "adherence_score": 85,
  "gaps": ["Gap acionável 1", "Gap acionável 2"],
  "generated_resume": "Currículo completo personalizado em texto estruturado com seções e palavras-chave exatas da vaga",
  "cover_letter": "Carta de apresentação — MÁXIMO 1200 CARACTERES — menciona a empresa pelo nome e conecta experiências à vaga",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "skill_suggestions": ["Sugestão para fechar gap 1", "Sugestão para fechar gap 2"],
  "salary_suggestion": "R$ X.XXX – R$ X.XXX mensais (CLT) · R$ X.XXX – R$ X.XXX mensais (PJ)"
}`;
}

function buildUserPrompt(req: GenerateRequest): string {
  return `Analise a vaga abaixo e gere o conteúdo de candidatura.

EMPRESA: ${req.company}
PLATAFORMA: ${req.platform}
MODALIDADE: ${req.modality}${req.city ? `\nCIDADE: ${req.city}` : ''}${req.job_url ? `\nURL: ${req.job_url}` : ''}

DESCRIÇÃO DA VAGA:
${req.job_scope}

Pesquise a empresa "${req.company}" e gere o JSON conforme especificado. A carta deve ter NO MÁXIMO 1200 caracteres.`;
}

function extractJson(text: string): GenerateResult {
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('JSON não encontrado na resposta');
  return JSON.parse(match[0]) as GenerateResult;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as GenerateRequest;

    if (!body.job_scope || !body.company || !body.platform || !body.modality) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    const profile = buildProfileText();
    const systemPrompt = buildSystemPrompt(profile);
    const userPrompt = buildUserPrompt(body);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 8192,
      },
      contents: userPrompt,
    });

    const text = response.text ?? '';

    if (!text) {
      return NextResponse.json({ error: 'Resposta vazia do modelo' }, { status: 500 });
    }

    const parsed = extractJson(text);

    return NextResponse.json(parsed);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[jobs/generate]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
