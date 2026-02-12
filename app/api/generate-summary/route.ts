import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import {
  formatAnswersForPrompt,
  type Answers,
  type AnswerValue,
} from '@/lib/assistant/questions';
import { getUserFromRequest } from '@/lib/supabase-server';

type GenerateSummaryPayload = {
  answers?: Record<string, unknown>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeAnswers(rawAnswers: Record<string, unknown>): Answers {
  return Object.entries(rawAnswers).reduce<Answers>((acc, [key, value]) => {
    if (typeof value === 'string' || typeof value === 'number') {
      acc[key] = value as AnswerValue;
    }

    return acc;
  }, {});
}

function buildPrompt(answers: Answers): string {
  const formattedAnswers = formatAnswersForPrompt(answers);

  return [
    'Write a professional commercial loan package summary using this borrower data.',
    'Include these sections with clear headings:',
    '1) Executive Summary',
    '2) Borrower Strengths',
    '3) Key Risks and Mitigants',
    '4) Recommended Loan Programs',
    '5) Underwriting Notes',
    '',
    'Borrower data:',
    formattedAnswers,
  ].join('\n');
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const openAIApiKey = process.env.OPENAI_API_KEY;
    if (!openAIApiKey) {
      return NextResponse.json(
        { error: 'Missing OPENAI_API_KEY' },
        { status: 500 }
      );
    }

    const body = (await request.json()) as GenerateSummaryPayload;
    if (!isRecord(body.answers)) {
      return NextResponse.json(
        { error: 'answers must be a valid object' },
        { status: 400 }
      );
    }

    const answers = normalizeAnswers(body.answers);
    if (Object.keys(answers).length === 0) {
      return NextResponse.json(
        { error: 'No valid answers were provided' },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(answers);
    const openai = new OpenAI({ apiKey: openAIApiKey });
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
      temperature: 0.2,
      max_output_tokens: 900,
      input: [
        {
          role: 'system',
          content:
            'You are a senior commercial lending analyst. Write concise, factual, professional summaries only. Do not invent missing facts. If data is missing, state assumptions clearly.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const summaryText = response.output_text?.trim();
    if (!summaryText) {
      return NextResponse.json(
        { error: 'OpenAI did not return summary text' },
        { status: 502 }
      );
    }

    return NextResponse.json({ summary: summaryText });
  } catch (error) {
    console.error('Summary generation failed:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
