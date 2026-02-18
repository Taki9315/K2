'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  RotateCcw,
} from 'lucide-react';
import Link from 'next/link';

type QuizQuestion = {
  id: string;
  question: string;
  options: { label: string; score: number; tag?: string }[];
};

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'business_type',
    question: 'What type of financing are you seeking?',
    options: [
      { label: 'Commercial Real Estate (CRE)', score: 3, tag: 'CRE' },
      { label: 'SBA / Small Business Loan', score: 2, tag: 'SBA' },
      { label: 'Business Line of Credit', score: 2, tag: 'LOC' },
      { label: 'Equipment / Vehicle Financing', score: 2, tag: 'Equipment' },
      { label: "Not sure yet — I'm exploring", score: 1, tag: 'Exploring' },
    ],
  },
  {
    id: 'deal_size',
    question: 'What is your estimated loan amount?',
    options: [
      { label: 'Under $250K', score: 1 },
      { label: '$250K – $1M', score: 2 },
      { label: '$1M – $5M', score: 3 },
      { label: '$5M – $20M', score: 3 },
      { label: '$20M+', score: 3 },
    ],
  },
  {
    id: 'experience',
    question: 'How much borrowing experience do you have?',
    options: [
      { label: 'First-time borrower', score: 1 },
      { label: '1–2 prior loans', score: 2 },
      { label: '3–5 prior loans', score: 3 },
      { label: '5+ loans — experienced borrower', score: 3 },
    ],
  },
  {
    id: 'docs_ready',
    question: 'How prepared are your financials & documents?',
    options: [
      { label: "Haven't started gathering docs", score: 1 },
      { label: 'I have some, but not organized', score: 2 },
      { label: 'Mostly organized — a few gaps', score: 3 },
      { label: 'Fully prepared & up to date', score: 4 },
    ],
  },
  {
    id: 'timeline',
    question: 'When do you plan to apply for financing?',
    options: [
      { label: 'Immediately — I have a deal now', score: 3 },
      { label: 'Within 1–3 months', score: 3 },
      { label: '3–6 months out', score: 2 },
      { label: 'Just researching for the future', score: 1 },
    ],
  },
];

type QuizResult = {
  score: number;
  maxScore: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  headline: string;
  advice: string[];
  recommended: string[];
};

function computeResult(answers: Record<string, number>): QuizResult {
  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = 16;

  if (score <= 7) {
    return {
      score,
      maxScore,
      level: 'beginner',
      headline: 'You Have Great Potential — Start Building Your Foundation',
      advice: [
        'Begin with the free video content to understand the lending landscape.',
        'The Borrower Preparation Workbook will give you a complete roadmap.',
        'Focus on organizing your financials and understanding what lenders need.',
      ],
      recommended: [
        'Borrower Preparation Workbook ($14.95)',
        'Free Educational Videos',
        'Document Vault templates',
      ],
    };
  }

  if (score <= 11) {
    return {
      score,
      maxScore,
      level: 'intermediate',
      headline: "You're On the Right Track — Sharpen Your Edge",
      advice: [
        'You have solid foundations — now refine your borrower presentation.',
        'Use the lender comparison worksheets to identify your best-fit lenders.',
        'Consider joining the Financing Acceleration Program for expert guidance.',
      ],
      recommended: [
        'Borrower Preparation Workbook ($14.95)',
        'Lender Comparison Worksheets',
        'Financing Acceleration Program membership',
      ],
    };
  }

  return {
    score,
    maxScore,
    level: 'advanced',
    headline: "You're Nearly Deal-Ready — Fine-Tune and Execute",
    advice: [
      'Your experience is your advantage — make sure your presentation matches.',
      'Use the workbook templates to ensure zero gaps in your package.',
      'The Financing Acceleration Program gives you access to expert review of your deal.',
    ],
    recommended: [
      'Financing Acceleration Program membership',
      'Deal Intake Assistant (chatbot)',
      'Monthly live Q&A sessions',
    ],
  };
}

export function ReadinessQuiz() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const started = step >= 0;
  const currentQ = step >= 0 && step < QUIZ_QUESTIONS.length ? QUIZ_QUESTIONS[step] : null;
  const progress = started ? Math.round(((step + 1) / QUIZ_QUESTIONS.length) * 100) : 0;

  const handleSelect = (score: number) => {
    if (!currentQ) return;
    const next = { ...answers, [currentQ.id]: score };
    setAnswers(next);

    if (step + 1 < QUIZ_QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setResult(computeResult(next));
      setStep(QUIZ_QUESTIONS.length);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(-1);
    setAnswers({});
    setResult(null);
  };

  if (!started) {
    return (
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          How Ready Are You for Financing?
        </h3>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Answer 5 quick questions and get a personalized readiness score, plus
          recommendations tailored to your situation.
        </p>
        <Button
          size="lg"
          onClick={() => setStep(0)}
          className="text-lg px-8 py-6"
        >
          Take the 2-Minute Quiz
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    );
  }

  if (result) {
    const pct = Math.round((result.score / result.maxScore) * 100);
    const ringColor =
      result.level === 'advanced'
        ? 'text-green-500'
        : result.level === 'intermediate'
          ? 'text-yellow-500'
          : 'text-orange-500';

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center w-28 h-28 mb-4">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-200"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${pct * 3.27} 327`}
                strokeLinecap="round"
                className={ringColor}
              />
            </svg>
            <span className="absolute text-2xl font-bold text-gray-900">
              {pct}%
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {result.headline}
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                {result.level === 'advanced' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                )}
                Personalized Advice
              </h4>
              <ul className="space-y-2">
                {result.advice.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-5">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Recommended For You
              </h4>
              <ul className="space-y-2">
                {result.recommended.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button size="lg" asChild>
            <Link href="/workbook">
              Get the Success Kit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Question {step + 1} of {QUIZ_QUESTIONS.length}
        </span>
        <span>{progress}% complete</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {currentQ && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            {currentQ.question}
          </h3>
          <div className="grid gap-2">
            {currentQ.options.map((option) => (
              <Button
                key={option.label}
                variant="outline"
                className="h-auto min-h-[2.75rem] justify-start whitespace-normal text-left py-3 px-4 text-sm hover:bg-primary/5 hover:border-primary/40"
                onClick={() => handleSelect(option.score)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {step > 0 && (
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Previous question
        </Button>
      )}
    </div>
  );
}
