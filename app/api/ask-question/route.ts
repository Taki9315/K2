import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase-server';

type AskQuestionPayload = {
  question?: string;
};

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

    const body = (await request.json()) as AskQuestionPayload;
    const question = body.question?.trim();

    if (!question) {
      return NextResponse.json(
        { error: 'question is required' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey: openAIApiKey });

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
      temperature: 0.3,
      max_output_tokens: 600,
      input: [
        {
          role: 'system',
          content:
            'You are a knowledgeable commercial lending advisor at K2 Commercial Finance. ' +
            'Answer questions about commercial real estate financing, SBA loans, loan ' +
            'programs, underwriting, and borrower preparation. ' +
            'Be helpful, concise, and professional. Keep answers to 2-4 paragraphs. ' +
            'If the question is outside your expertise, politely say so. ' +
            'Do not use markdown formatting — plain text only.',
        },
        { role: 'user', content: question },
      ],
    });

    const answer = response.output_text?.trim();
    if (!answer) {
      return NextResponse.json(
        { error: 'No response was generated' },
        { status: 502 }
      );
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Ask-question failed:', error);
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    );
  }
}
