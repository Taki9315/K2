import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import {
  formatAnswersForPrompt,
  computeLTV,
  computeDSCR,
  computeLiquidityPercent,
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

function normalizeAnswers(raw: Record<string, unknown>): Answers {
  return Object.entries(raw).reduce<Answers>((acc, [key, value]) => {
    if (typeof value === 'string' || typeof value === 'number') {
      acc[key] = value as AnswerValue;
    }
    return acc;
  }, {});
}

function buildPrompt(answers: Answers): string {
  const formatted = formatAnswersForPrompt(answers);
  const ltv = computeLTV(answers);
  const dscr = computeDSCR(answers);
  const liqPct = computeLiquidityPercent(answers);

  const metrics = [
    ltv !== null ? `LTV: ${ltv}%` : null,
    dscr !== null ? `DSCR: ${dscr.toFixed(2)}x` : null,
    liqPct !== null ? `Liquidity as % of loan: ${liqPct}%` : null,
  ]
    .filter(Boolean)
    .join(', ');

  return [
    'You are reviewing a commercial real estate loan intake. Based on the data below,',
    'produce EXACTLY two sections — nothing else:',
    '',
    'SECTION 1 — PROGRAM FIT (Preliminary)',
    'List 3-5 bullet points of loan programs that may be suitable for this transaction.',
    'For each program, briefly explain why it fits. Examples: CMBS, Agency, Bank/Credit Union,',
    'SBA 504, Bridge, DSCR-Lite, Hard Money, etc.',
    '',
    'SECTION 2 — NOTES FROM K2',
    'Write 2-4 sentences with your overall analyst assessment of this deal:',
    'strengths, concerns, and recommended next steps.',
    'End with: "A K2 analyst will review the full package and follow up with next steps,',
    'including estimated terms, documentation requirements, and timeline expectations."',
    '',
    '--- DEAL DATA ---',
    formatted,
    '',
    metrics ? `Calculated Metrics: ${metrics}` : '',
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
      temperature: 0.25,
      max_output_tokens: 1200,
      input: [
        {
          role: 'system',
          content:
            'You are a senior commercial lending analyst at K2 Commercial Finance. ' +
            'Write concise, factual, professional analysis. Do not invent facts. ' +
            'If data is missing or insufficient, note it and state assumptions clearly. ' +
            'Output plain text only — no markdown, no headers with # symbols.',
        },
        { role: 'user', content: prompt },
      ],
    });

    const raw = response.output_text?.trim() ?? '';
    if (!raw) {
      return NextResponse.json(
        { error: 'OpenAI did not return a response' },
        { status: 502 }
      );
    }

    const splitIdx = raw.indexOf('NOTES FROM K2');
    let programFit: string;
    let k2Notes: string;

    if (splitIdx !== -1) {
      programFit = raw
        .slice(0, splitIdx)
        .replace(/PROGRAM FIT.*?\n/i, '')
        .replace(/SECTION 1.*?\n/i, '')
        .replace(/^[-—]+\n?/gm, '')
        .trim();
      k2Notes = raw
        .slice(splitIdx)
        .replace(/NOTES FROM K2.*?\n/i, '')
        .replace(/SECTION 2.*?\n/i, '')
        .replace(/^[-—]+\n?/gm, '')
        .trim();
    } else {
      programFit = raw;
      k2Notes =
        'A K2 analyst will review the full package and follow up with next steps, ' +
        'including estimated terms, documentation requirements, and timeline expectations.';
    }

    return NextResponse.json({ programFit, k2Notes });
  } catch (error) {
    console.error('Summary generation failed:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
