import { NextResponse } from 'next/server';
import { createServiceRoleClient, getUserFromRequest } from '@/lib/supabase-server';

type CreateSubmissionPayload = {
  answersJson?: Record<string, unknown>;
  summaryText?: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
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
