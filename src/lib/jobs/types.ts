export type Platform = 'Gupy' | 'LinkedIn' | 'Catho' | 'Infojobs' | 'Outro';
export type Modality = 'Remoto' | 'Híbrido' | 'Presencial';
export type EmploymentType = 'CLT' | 'PJ';
export type ApplicationStatus = 'active' | 'deleted';

export interface CompanyResearch {
  summary: string;
  size: string;
  sector: string;
  culture: string;
  recent_news: string;
  tech_stack?: string;
  sources: string[];
}

export interface InterviewQA {
  question: string;
  answer: string;
}

export interface JobApplication {
  id: string;
  created_at: string;
  position_name: string;
  company: string;
  platform: Platform;
  job_url: string | null;
  job_scope: string | null;
  modality: Modality;
  city: string | null;
  employment_type: EmploymentType | null;
  applied_at: string;
  salary_sent: string | null;
  benefits: string | null;
  total_package: string | null;
  company_size: string | null;
  company_research: CompanyResearch | null;
  adherence_score: number | null;
  gaps: string[] | null;
  generated_resume: string | null;
  cover_letter: string | null;
  keywords: string[] | null;
  skill_suggestions: string[] | null;
  salary_suggestion: string | null;
  interview_questions: InterviewQA[] | null;
  status: ApplicationStatus;
}

export interface GenerateRequest {
  job_scope: string;
  platform: Platform;
  company: string;
  modality: Modality;
  city?: string;
  job_url?: string;
}

export interface GenerateResult {
  adherence_score: number;
  gaps: string[];
  generated_resume: string;
  cover_letter: string;
  keywords: string[];
  skill_suggestions: string[];
  salary_suggestion: string;
  company_research: CompanyResearch;
}
