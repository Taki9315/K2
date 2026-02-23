import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase-server';
import { TASK_SYSTEM_PROMPTS } from '@/lib/assistant/tasks';

type AskQuestionPayload = {
  question?: string;
  taskId?: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
};

const DEFAULT_SYSTEM_PROMPT =
  'You are a knowledgeable commercial lending advisor at K2 Commercial Finance. ' +
  'Answer questions about commercial real estate financing, SBA loans, loan ' +
  'programs, underwriting, and borrower preparation. ' +
  'Be helpful, concise, and professional. Keep answers to 2-4 paragraphs. ' +
  'If the question is outside your expertise, politely say so. ' +
  'Do not use markdown formatting — plain text only.';

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
    const taskId = body.taskId;
    const history = body.history;

    if (!question) {
      return NextResponse.json(
        { error: 'question is required' },
        { status: 400 }
      );
    }

    /* ---- Build system prompt ---- */
    const systemContent =
      taskId && TASK_SYSTEM_PROMPTS[taskId]
        ? TASK_SYSTEM_PROMPTS[taskId]
        : DEFAULT_SYSTEM_PROMPT;

    /* ---- Build messages array ---- */
    type InputMsg = { role: 'system' | 'user' | 'assistant'; content: string };
    const input: InputMsg[] = [
      { role: 'system', content: systemContent },
    ];

    // Include conversation history for multi-turn context (cap at 20 turns)
    if (history?.length) {
      const recent = history.slice(-20);
      for (const msg of recent) {
        input.push({ role: msg.role, content: msg.content });
      }
    }

    input.push({ role: 'user', content: question });

    const openai = new OpenAI({ apiKey: openAIApiKey });

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
      temperature: 0.3,
      max_output_tokens: taskId ? 1200 : 600,
      input,
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
