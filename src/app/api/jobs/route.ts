import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import type { JobApplication } from '@/lib/jobs/types';

export async function GET() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase não configurado.' }, { status: 503 });
  }

  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('status', 'active')
    .order('applied_at', { ascending: false });

  if (error) {
    console.error('[jobs GET]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as Partial<JobApplication>;
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase não configurado.' }, { status: 503 });
    }

    const { data, error } = await supabase
      .from('job_applications')
      .insert([{ ...body, status: 'active' }])
      .select()
      .single();

    if (error) {
      console.error('[jobs POST]', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('[jobs POST]', err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
