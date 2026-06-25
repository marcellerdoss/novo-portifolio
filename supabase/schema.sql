-- Job Intelligence Tool — Supabase Schema
-- Run this in your Supabase project's SQL Editor

CREATE TABLE IF NOT EXISTS job_applications (
  id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at       timestamptz DEFAULT now() NOT NULL,

  -- Job info
  position_name    text NOT NULL,
  company          text NOT NULL,
  platform         text NOT NULL,
  job_url          text,
  job_scope        text,
  modality         text NOT NULL,
  city             text,
  employment_type  text,
  applied_at       timestamptz DEFAULT now() NOT NULL,

  -- Financial
  salary_sent      text,
  benefits         text,
  total_package    text,
  company_size     text,

  -- AI-generated content
  company_research  jsonb,
  adherence_score   integer CHECK (adherence_score >= 0 AND adherence_score <= 100),
  gaps              jsonb,
  generated_resume  text,
  cover_letter      text,
  keywords          jsonb,
  skill_suggestions jsonb,
  salary_suggestion text,

  -- Interview prep (generated on demand from detail page)
  interview_questions jsonb,

  -- Soft delete: 'active' | 'deleted'
  status text DEFAULT 'active' NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_job_applications_status     ON job_applications (status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications (created_at DESC);
