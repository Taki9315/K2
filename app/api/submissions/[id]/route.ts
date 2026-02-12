import { NextResponse } from 'next/server';
import { createServiceRoleClient, getUserFromRequest } from '@/lib/supabase-server';

type UpdateSubmissionPayload = {
  answersJson?: Record<string, unknown>;
  summaryText?: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as UpdateSubmissionPayload;
    const updatePayload: Record<string, unknown> = {};

    if ('answersJson' in body) {
      if (!isRecord(body.answersJson)) {
        return NextResponse.json(
          { error: 'answersJson must be a valid object' },
          { status: 400 }
        );
      }

      updatePayload.answers_json = body.answersJson;
    }

    if ('summaryText' in body) {
      if (body.summaryText !== null && typeof body.summaryText !== 'string') {
        return NextResponse.json(
          { error: 'summaryText must be a string or null' },
          { status: 400 }
        );
      }

      updatePayload.summary_text = body.summaryText ?? null;
    }

    if (Object.keys(updatePayload).length === 0) {
      return NextResponse.json(
        { error: 'No fields provided for update' },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from('submissions')
      .update(updatePayload)
      .eq('id', id)
      .eq('user_id', user.id)
      .select('id, answers_json, summary_text, created_at')
      .single();

    if (error || !data) {
      console.error('Failed to update submission:', error);
      return NextResponse.json(
        { error: 'Submission not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({ submission: data });
  } catch (error) {
    console.error('Unexpected submissions PATCH error:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
