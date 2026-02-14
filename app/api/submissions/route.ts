import { NextResponse } from 'next/server';
import { createServiceRoleClient, getUserFromRequest } from '@/lib/supabase-server';

type CreateSubmissionPayload = {
  answersJson?: Record<string, unknown>;
  summaryText?: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isMissingSubmissionsTableError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const maybeError = error as { code?: string; message?: string };
  return (
    maybeError.code === 'PGRST205' &&
    maybeError.message?.includes("public.submissions") === true
  );
}

export async function GET(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from('submissions')
      .select('id, answers_json, summary_text, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      if (isMissingSubmissionsTableError(error)) {
        return NextResponse.json({ submissions: [] });
      }

      console.error('Failed to fetch submissions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch submissions' },
        { status: 500 }
      );
    }

    return NextResponse.json({ submissions: data ?? [] });
  } catch (error) {
    console.error('Unexpected submissions GET error:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as CreateSubmissionPayload;
    if (!isRecord(body.answersJson)) {
      return NextResponse.json(
        { error: 'answersJson must be a valid object' },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from('submissions')
      .insert({
        user_id: user.id,
        answers_json: body.answersJson,
        summary_text: body.summaryText ?? null,
      })
      .select('id, answers_json, summary_text, created_at')
      .single();

    if (error || !data) {
      if (isMissingSubmissionsTableError(error)) {
        return NextResponse.json(
          {
            error:
              'Submissions storage is not initialized. Apply Supabase migration 20260212070000_create_submissions.sql.',
          },
          { status: 503 }
        );
      }

      console.error('Failed to create submission:', error);
      return NextResponse.json(
        { error: 'Failed to create submission' },
        { status: 500 }
      );
    }

    return NextResponse.json({ submission: data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected submissions POST error:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
